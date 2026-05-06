import { test, expect, chromium } from "@playwright/test";
import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const PAGES_TO_AUDIT = [
  { key: "home", url: "https://www.trugreen.com/" },
  {
    key: "products-and-services",
    url: "https://www.trugreen.com/products-and-services",
  },
  {
    key: "customer-support",
    url: "https://www.trugreen.com/customer-support",
  },
] as const;

const DEVICE_PROFILES = [
  {
    key: "desktop",
    settings: {
      formFactor: "desktop" as const,
      screenEmulation: {
        mobile: false,
        width: 1350,
        height: 940,
        deviceScaleFactor: 1,
        disabled: false,
      },
    },
  },
  {
    key: "mobile",
    settings: {
      formFactor: "mobile" as const,
      screenEmulation: {
        mobile: true,
        width: 390,
        height: 844,
        deviceScaleFactor: 3,
        disabled: false,
      },
    },
  },
] as const;

type LighthouseThrottlingMethod = "provided" | "devtools" | "simulate";

function parseThrottlingMethod(
  value: string | undefined,
): LighthouseThrottlingMethod {
  if (value === "devtools" || value === "simulate" || value === "provided") {
    return value;
  }

  return "provided";
}

const LIGHTHOUSE_THROTTLING_METHOD = parseThrottlingMethod(
  process.env.LIGHTHOUSE_THROTTLING_METHOD,
);

const LIGHTHOUSE_AUDIT_SAMPLES = Math.max(
  Number(process.env.LIGHTHOUSE_AUDIT_SAMPLES ?? 3),
  1,
);

const CSV_PATH = path.join(
  process.cwd(),
  "performance-report",
  "performance-history-seconds.csv",
);

const INSIGHTS_PATH = path.join(
  process.cwd(),
  "performance-report",
  "performance-insights-latest.json",
);

type LighthouseAudit = {
  id: string;
  title: string;
  numericValue?: number;
  score: number | null;
  scoreDisplayMode: string;
  description?: string;
  displayValue?: string;
  details?: {
    overallSavingsMs?: number;
  };
  group?: string;
};

type LighthouseReport = {
  categories?: {
    performance?: {
      score?: number | null;
      auditRefs?: Array<{
        id: string;
        group?: string;
      }>;
    };
  };
  audits?: Record<string, LighthouseAudit>;
};

type SampleResult = {
  row: LighthouseMetricRow;
  lhr: LighthouseReport;
};

type PerformanceInsight = {
  auditId: string;
  title: string;
  savingsMs: number;
  description: string;
};

type DiagnosticInsight = {
  auditId: string;
  title: string;
  score: number | null;
  displayValue: string;
  description: string;
};

type InsightSnapshot = {
  runId: string;
  timestampIso: string;
  pageKey: string;
  deviceProfile: string;
  url: string;
  performanceScore: number;
  opportunities: PerformanceInsight[];
  diagnostics: DiagnosticInsight[];
};

type LighthouseMetricRow = {
  runId: string;
  timestampIso: string;
  project: string;
  deviceProfile: string;
  pageKey: string;
  url: string;
  performanceScore: number;
  firstContentfulPaintSeconds: number;
  largestContentfulPaintSeconds: number;
  interactiveSeconds: number;
  totalBlockingTimeSeconds: number;
  cumulativeLayoutShift: number;
};

function roundToTwoDecimals(value: number): number {
  return Number(value.toFixed(2));
}

function millisecondsToSeconds(value: number): number {
  return roundToTwoDecimals(value / 1000);
}

function median(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }

  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return roundToTwoDecimals((sorted[middle - 1] + sorted[middle]) / 2);
  }

  return roundToTwoDecimals(sorted[middle]);
}

function extractTopOpportunities(lhr: LighthouseReport): PerformanceInsight[] {
  const audits = Object.values(lhr.audits ?? {});

  return audits
    .map((audit) => ({
      auditId: audit.id,
      title: audit.title,
      savingsMs: Number(audit.details?.overallSavingsMs ?? 0),
      description: audit.description ?? "",
    }))
    .filter((audit) => Number.isFinite(audit.savingsMs) && audit.savingsMs > 0)
    .sort((a, b) => b.savingsMs - a.savingsMs)
    .slice(0, 5);
}

function extractTopDiagnostics(lhr: LighthouseReport): DiagnosticInsight[] {
  const auditsById = lhr.audits ?? {};
  const diagnosticAuditIds = (lhr.categories?.performance?.auditRefs ?? [])
    .filter((auditRef) => auditRef.group === "diagnostics")
    .map((auditRef) => auditRef.id);

  return diagnosticAuditIds
    .map((auditId) => auditsById[auditId])
    .filter(Boolean)
    .filter((audit) => {
      const mode = audit.scoreDisplayMode;
      const score = audit.score;
      const isScored = typeof score === "number";
      const isRelevantMode = mode !== "notApplicable" && mode !== "manual";
      return isRelevantMode && (!isScored || score < 1);
    })
    .map((audit) => ({
      auditId: audit.id,
      title: audit.title,
      score: audit.score,
      displayValue: audit.displayValue ?? "",
      description: audit.description ?? "",
    }))
    .slice(0, 8);
}

function pickRepresentativeSample(samples: SampleResult[]): SampleResult {
  const medianScore = median(
    samples.map((sample) => sample.row.performanceScore),
  );

  return samples.reduce((best, current) => {
    const bestDiff = Math.abs(best.row.performanceScore - medianScore);
    const currentDiff = Math.abs(current.row.performanceScore - medianScore);
    return currentDiff < bestDiff ? current : best;
  });
}

function toCsvLine(values: Array<string | number>): string {
  return `${values
    .map((value) => `"${String(value).replace(/"/g, '""')}"`)
    .join(",")}\n`;
}

async function ensureCsvHeader(filePath: string): Promise<void> {
  let existsWithContent = false;

  try {
    const fileStats = await stat(filePath);
    existsWithContent = fileStats.size > 0;
  } catch {
    existsWithContent = false;
  }

  if (existsWithContent) {
    return;
  }

  const header = toCsvLine([
    "run_id",
    "timestamp_iso",
    "project",
    "device_profile",
    "page_key",
    "url",
    "performance_score",
    "first_contentful_paint_seconds",
    "largest_contentful_paint_seconds",
    "interactive_seconds",
    "total_blocking_time_seconds",
    "cumulative_layout_shift",
  ]);

  await writeFile(filePath, header, "utf8");
}

async function appendMetricRow(
  filePath: string,
  row: LighthouseMetricRow,
): Promise<void> {
  const line = toCsvLine([
    row.runId,
    row.timestampIso,
    row.project,
    row.deviceProfile,
    row.pageKey,
    row.url,
    row.performanceScore,
    row.firstContentfulPaintSeconds,
    row.largestContentfulPaintSeconds,
    row.interactiveSeconds,
    row.totalBlockingTimeSeconds,
    row.cumulativeLayoutShift,
  ]);

  await writeFile(filePath, line, { encoding: "utf8", flag: "a" });
}

test("tracks desktop and mobile Lighthouse performance across key pages", async ({
  browserName,
}, testInfo) => {
  test.skip(browserName !== "chromium", "Lighthouse audits require Chromium.");
  test.setTimeout(600000);

  const outputDir = path.dirname(CSV_PATH);
  await mkdir(outputDir, { recursive: true });
  await ensureCsvHeader(CSV_PATH);
  const runId = new Date().toISOString();
  const insightSnapshots: InsightSnapshot[] = [];

  const chrome = await chromeLauncher.launch({
    chromePath: chromium.executablePath(),
    chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"],
  });

  try {
    for (const deviceProfile of DEVICE_PROFILES) {
      for (const pageToAudit of PAGES_TO_AUDIT) {
        const sampleResults: SampleResult[] = [];

        for (
          let sampleIndex = 0;
          sampleIndex < LIGHTHOUSE_AUDIT_SAMPLES;
          sampleIndex += 1
        ) {
          const lighthouseResult = await lighthouse(
            pageToAudit.url,
            {
              port: chrome.port,
              output: "json",
              logLevel: "error",
              onlyCategories: ["performance"],
            },
            {
              extends: "lighthouse:default",
              settings: {
                ...deviceProfile.settings,
                throttlingMethod: LIGHTHOUSE_THROTTLING_METHOD,
              },
            },
          );

          const lhr = lighthouseResult?.lhr as LighthouseReport | undefined;
          expect(lhr).toBeTruthy();
          if (!lhr) {
            throw new Error("Lighthouse did not return an LHR payload.");
          }

          const sampleRow: LighthouseMetricRow = {
            runId,
            timestampIso: new Date().toISOString(),
            project: testInfo.project.name,
            deviceProfile: deviceProfile.key,
            pageKey: pageToAudit.key,
            url: pageToAudit.url,
            performanceScore: roundToTwoDecimals(
              (lhr.categories?.performance?.score ?? 0) * 100,
            ),
            firstContentfulPaintSeconds: millisecondsToSeconds(
              lhr.audits?.["first-contentful-paint"]?.numericValue ?? 0,
            ),
            largestContentfulPaintSeconds: millisecondsToSeconds(
              lhr.audits?.["largest-contentful-paint"]?.numericValue ?? 0,
            ),
            interactiveSeconds: millisecondsToSeconds(
              lhr.audits?.interactive?.numericValue ?? 0,
            ),
            totalBlockingTimeSeconds: millisecondsToSeconds(
              lhr.audits?.["total-blocking-time"]?.numericValue ?? 0,
            ),
            cumulativeLayoutShift: roundToTwoDecimals(
              lhr.audits?.["cumulative-layout-shift"]?.numericValue ?? 0,
            ),
          };

          sampleResults.push({ row: sampleRow, lhr });
        }

        const representativeSample = pickRepresentativeSample(sampleResults);
        const representativeRow = representativeSample.row;

        await appendMetricRow(CSV_PATH, representativeRow);

        insightSnapshots.push({
          runId,
          timestampIso: representativeRow.timestampIso,
          pageKey: representativeRow.pageKey,
          deviceProfile: representativeRow.deviceProfile,
          url: representativeRow.url,
          performanceScore: representativeRow.performanceScore,
          opportunities: extractTopOpportunities(representativeSample.lhr),
          diagnostics: extractTopDiagnostics(representativeSample.lhr),
        });
      }
    }

    await writeFile(
      INSIGHTS_PATH,
      JSON.stringify(insightSnapshots, null, 2),
      "utf8",
    );
  } finally {
    await chrome.kill();
  }
});
