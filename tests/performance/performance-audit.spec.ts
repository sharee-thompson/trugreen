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

const CSV_PATH = path.join(
  process.cwd(),
  "performance-report",
  "performance-history-seconds.csv",
);

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

  const chrome = await chromeLauncher.launch({
    chromePath: chromium.executablePath(),
    chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"],
  });

  try {
    for (const deviceProfile of DEVICE_PROFILES) {
      for (const pageToAudit of PAGES_TO_AUDIT) {
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
            },
          },
        );

        const lhr = lighthouseResult?.lhr;
        expect(lhr).toBeTruthy();

        const row: LighthouseMetricRow = {
          runId,
          timestampIso: new Date().toISOString(),
          project: testInfo.project.name,
          deviceProfile: deviceProfile.key,
          pageKey: pageToAudit.key,
          url: pageToAudit.url,
          performanceScore: roundToTwoDecimals(
            (lhr?.categories.performance.score ?? 0) * 100,
          ),
          firstContentfulPaintSeconds: millisecondsToSeconds(
            lhr?.audits["first-contentful-paint"].numericValue ?? 0,
          ),
          largestContentfulPaintSeconds: millisecondsToSeconds(
            lhr?.audits["largest-contentful-paint"].numericValue ?? 0,
          ),
          interactiveSeconds: millisecondsToSeconds(
            lhr?.audits.interactive.numericValue ?? 0,
          ),
          totalBlockingTimeSeconds: millisecondsToSeconds(
            lhr?.audits["total-blocking-time"].numericValue ?? 0,
          ),
          cumulativeLayoutShift: roundToTwoDecimals(
            lhr?.audits["cumulative-layout-shift"].numericValue ?? 0,
          ),
        };

        await appendMetricRow(CSV_PATH, row);
      }
    }
  } finally {
    await chrome.kill();
  }
});
