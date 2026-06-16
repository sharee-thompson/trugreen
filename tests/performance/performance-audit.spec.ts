import { test, expect, chromium } from "@playwright/test";
import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { landingPagePaths } from "../../utils/paths";
import { getBaseUrl, getLandingPageUrl } from "../../utils/config";

const PAGES_TO_AUDIT = [
  { key: "home", url: getBaseUrl("/", { automation: false }) },
  {
    key: "products-and-services",
    url: getBaseUrl("/products-and-services", { automation: false }),
  },
  {
    key: "customer-support",
    url: getBaseUrl("/customer-support", { automation: false }),
  },
  {
    key: "lp-high",
    url: getLandingPageUrl(landingPagePaths.high, { automation: false }),
  },
  {
    key: "lp-medium",
    url: getLandingPageUrl(landingPagePaths.medium, { automation: false }),
  },
  {
    key: "lp-low",
    url: getLandingPageUrl(landingPagePaths.low, { automation: false }),
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

  return "simulate";
}

const LIGHTHOUSE_THROTTLING_METHOD = parseThrottlingMethod(
  process.env.LIGHTHOUSE_THROTTLING_METHOD,
);

const DEFAULT_LIGHTHOUSE_AUDIT_SAMPLES = process.env.CI ? 2 : 1;

const LIGHTHOUSE_AUDIT_SAMPLES = Math.max(
  Number(
    process.env.LIGHTHOUSE_AUDIT_SAMPLES ?? DEFAULT_LIGHTHOUSE_AUDIT_SAMPLES,
  ),
  1,
);

const LIGHTHOUSE_TEST_TIMEOUT_MS = Math.max(
  Number(process.env.LIGHTHOUSE_TEST_TIMEOUT_MS ?? 1200000),
  60000,
);

const ZERO_SCORE_RETRY_ATTEMPTS = Math.max(
  Number(process.env.LIGHTHOUSE_ZERO_SCORE_RETRY_ATTEMPTS ?? 1),
  0,
);

const CSV_PATH = path.join(
  process.cwd(),
  "performance-report",
  "performance-history-seconds.csv",
);

const INSIGHTS_DIR = path.join(
  process.cwd(),
  "performance-report",
  "performance-insights",
);

// Avoid duplicate rows from retry attempts in CI; this file should produce one deterministic run.
test.describe.configure({ retries: 0 });

type LighthouseAudit = {
  id: string;
  title: string;
  numericValue?: number;
  score: number | null;
  scoreDisplayMode: string;
  description?: string;
  displayValue?: string;
  errorMessage?: string;
  details?: {
    overallSavingsMs?: number;
  };
  group?: string;
};

type LighthouseReport = {
  runWarnings?: string[];
  runtimeError?: {
    code?: string;
    message?: string;
  };
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

function isLikelyZeroScoreAnomaly({
  calculatedScore,
  fcpMs,
  lcpMs,
  interactiveMs,
  tbtMs,
  interactiveAudit,
  tbtAudit,
}: {
  calculatedScore: number;
  fcpMs: number;
  lcpMs: number;
  interactiveMs: number;
  tbtMs: number;
  interactiveAudit?: LighthouseAudit;
  tbtAudit?: LighthouseAudit;
}): boolean {
  if (calculatedScore !== 0) {
    return false;
  }

  const hasPaintMetrics = fcpMs > 0 && lcpMs > 0;
  const hasZeroInteractivityMetrics = interactiveMs === 0 && tbtMs === 0;
  const hasAuditErrorSignals =
    interactiveAudit?.scoreDisplayMode === "error" ||
    tbtAudit?.scoreDisplayMode === "error" ||
    Boolean(interactiveAudit?.errorMessage) ||
    Boolean(tbtAudit?.errorMessage);

  return (
    (hasPaintMetrics && hasZeroInteractivityMetrics) || hasAuditErrorSignals
  );
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

for (const pageToAudit of PAGES_TO_AUDIT) {
  test(`tracks Lighthouse performance for ${pageToAudit.key} @performance`, async ({
    browserName,
  }, testInfo) => {
    test.skip(
      browserName !== "chromium",
      "Lighthouse audits require Chromium.",
    );
    test.setTimeout(LIGHTHOUSE_TEST_TIMEOUT_MS);

    const outputDir = path.dirname(CSV_PATH);
    await mkdir(outputDir, { recursive: true });
    await mkdir(INSIGHTS_DIR, { recursive: true });
    await ensureCsvHeader(CSV_PATH);

    const runId = new Date().toISOString();
    const insightSnapshots: InsightSnapshot[] = [];

    const chrome = await chromeLauncher.launch({
      chromePath: chromium.executablePath(),
      chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"],
    });

    try {
      for (const deviceProfile of DEVICE_PROFILES) {
        const sampleResults: SampleResult[] = [];

        for (
          let sampleIndex = 0;
          sampleIndex < LIGHTHOUSE_AUDIT_SAMPLES;
          sampleIndex += 1
        ) {
          let acceptedSample: SampleResult | null = null;

          for (
            let attempt = 0;
            attempt <= ZERO_SCORE_RETRY_ATTEMPTS;
            attempt += 1
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

            const rawPerformanceScore = lhr.categories?.performance?.score ?? 0;
            const calculatedScore = roundToTwoDecimals(
              rawPerformanceScore * 100,
            );

            const fcpMs =
              lhr.audits?.["first-contentful-paint"]?.numericValue ?? 0;
            const lcpMs =
              lhr.audits?.["largest-contentful-paint"]?.numericValue ?? 0;
            const interactiveMs = lhr.audits?.interactive?.numericValue ?? 0;
            const tbtMs =
              lhr.audits?.["total-blocking-time"]?.numericValue ?? 0;
            const clsValue =
              lhr.audits?.["cumulative-layout-shift"]?.numericValue ?? 0;
            const interactiveAudit = lhr.audits?.interactive;
            const tbtAudit = lhr.audits?.["total-blocking-time"];
            const maxPotentialFidAudit = lhr.audits?.["max-potential-fid"];

            const likelyAnomaly = isLikelyZeroScoreAnomaly({
              calculatedScore,
              fcpMs,
              lcpMs,
              interactiveMs,
              tbtMs,
              interactiveAudit,
              tbtAudit,
            });

            if (calculatedScore === 0) {
              console.log(
                `[DEBUG] Zero score detected for ${pageToAudit.key} (${deviceProfile.key}):`,
                {
                  url: pageToAudit.url,
                  rawScore: rawPerformanceScore,
                  calculatedScore,
                  hasPerformanceCategory: !!lhr.categories?.performance,
                  performanceCategoryAuditCount:
                    lhr.categories?.performance?.auditRefs?.length ?? 0,
                  topLevelAuditsCount: Object.keys(lhr.audits ?? {}).length,
                  throttlingMethod: LIGHTHOUSE_THROTTLING_METHOD,
                  sampleIndex,
                  attempt,
                  likelyAnomaly,
                  runtimeError: lhr.runtimeError,
                  runWarnings: lhr.runWarnings ?? [],
                  interactiveAudit: {
                    score: interactiveAudit?.score ?? null,
                    scoreDisplayMode:
                      interactiveAudit?.scoreDisplayMode ?? null,
                    numericValue: interactiveAudit?.numericValue ?? null,
                    displayValue: interactiveAudit?.displayValue ?? null,
                    errorMessage: interactiveAudit?.errorMessage ?? null,
                  },
                  totalBlockingTimeAudit: {
                    score: tbtAudit?.score ?? null,
                    scoreDisplayMode: tbtAudit?.scoreDisplayMode ?? null,
                    numericValue: tbtAudit?.numericValue ?? null,
                    displayValue: tbtAudit?.displayValue ?? null,
                    errorMessage: tbtAudit?.errorMessage ?? null,
                  },
                  maxPotentialFidAudit: {
                    score: maxPotentialFidAudit?.score ?? null,
                    scoreDisplayMode:
                      maxPotentialFidAudit?.scoreDisplayMode ?? null,
                    numericValue: maxPotentialFidAudit?.numericValue ?? null,
                    displayValue: maxPotentialFidAudit?.displayValue ?? null,
                    errorMessage: maxPotentialFidAudit?.errorMessage ?? null,
                  },
                  metrics: {
                    firstContentfulPaintMs: fcpMs,
                    largestContentfulPaintMs: lcpMs,
                    interactiveMs,
                    totalBlockingTimeMs: tbtMs,
                    cumulativeLayoutShift: clsValue,
                  },
                },
              );
            }

            if (likelyAnomaly) {
              if (attempt < ZERO_SCORE_RETRY_ATTEMPTS) {
                console.warn(
                  `[WARN] Suspected Lighthouse anomaly for ${pageToAudit.key} (${deviceProfile.key}) sample ${sampleIndex + 1}; retrying (${attempt + 1}/${ZERO_SCORE_RETRY_ATTEMPTS}).`,
                );
                continue;
              }

              console.warn(
                `[WARN] Excluding suspected Lighthouse anomaly for ${pageToAudit.key} (${deviceProfile.key}) sample ${sampleIndex + 1}; score will not be written to dashboard data.`,
              );
              break;
            }

            const sampleRow: LighthouseMetricRow = {
              runId,
              timestampIso: new Date().toISOString(),
              project: testInfo.project.name,
              deviceProfile: deviceProfile.key,
              pageKey: pageToAudit.key,
              url: pageToAudit.url,
              performanceScore: calculatedScore,
              firstContentfulPaintSeconds: millisecondsToSeconds(fcpMs),
              largestContentfulPaintSeconds: millisecondsToSeconds(lcpMs),
              interactiveSeconds: millisecondsToSeconds(interactiveMs),
              totalBlockingTimeSeconds: millisecondsToSeconds(tbtMs),
              cumulativeLayoutShift: roundToTwoDecimals(clsValue),
            };

            acceptedSample = { row: sampleRow, lhr };
            break;
          }

          if (acceptedSample) {
            sampleResults.push(acceptedSample);
          }
        }

        if (sampleResults.length === 0) {
          console.warn(
            `[WARN] No valid Lighthouse samples for ${pageToAudit.key} (${deviceProfile.key}); skipping CSV and insights row for this device to avoid inaccurate dashboard data.`,
          );
          continue;
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

      const insightFilePath = path.join(
        INSIGHTS_DIR,
        `${pageToAudit.key}.json`,
      );
      await writeFile(
        insightFilePath,
        JSON.stringify(insightSnapshots, null, 2),
        "utf8",
      );
    } finally {
      await chrome.kill();
    }
  });
}
