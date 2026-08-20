import { test } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { performance } from "node:perf_hooks";

test.setTimeout(600000);

const BEFORE_URL = (process.env.BEFORE_URL || "http://localhost:3000").replace(
  /\/$/,
  ""
);
const AFTER_URL = (process.env.AFTER_URL || "http://localhost:3001").replace(
  /\/$/,
  ""
);
const SAMPLES = parseInt(process.env.TTFB_SAMPLES || "3", 10);

type Route = {
  route: string;
  note?: string;
};

const ROUTES: Route[] = [
  { route: "/about/california-privacy-policy", note: "da9c8af" },
  { route: "/about/privacy-policy", note: "2bc56835" },
  { route: "/about/sms-terms", note: "pre-existing" },
  { route: "/about/terms", note: "da9c8af" },
  { route: "/aftercare", note: "pre-existing" },
  { route: "/appointment-scheduler", note: "efa52654e" },
  { route: "/customer-support", note: "2bc56835" },
  { route: "/lawn-care-101", note: "pre-existing" },
  { route: "/lawn-care-101/blog", note: "pre-existing" },
  { route: "/lawn-care-101/faqs", note: "pre-existing" },
  { route: "/lawn-care-101/learning-center", note: "da9c8af" },
  { route: "/lawn-care-101/learning-center/grasses/brown-patch", note: "pre-existing" },
  { route: "/lawn-care-101/learning-center/search", note: "efa52654e" },
  { route: "/local-lawn-care", note: "pre-existing" },
  { route: "/local-lawn-care/alabama", note: "pre-existing" },
  { route: "/myservicesummary", note: "efa52654e" },
  { route: "/my-account/globalError", note: "efa52654e" },
  { route: "/my-account/reset-password", note: "efa52654e" },
  { route: "/newsroom", note: "da9c8af" },
  { route: "/newsroom/executive-staff", note: "da9c8af" },
  { route: "/newsroom/executive-staff/kurt-kane", note: "pre-existing" },
  { route: "/pay-your-bill", note: "efa52654e" },
  { route: "/pests-products-and-services", note: "pre-existing" },
  { route: "/products-and-services", note: "pre-existing" },
  { route: "/products-and-services/trupro", note: "pre-existing" },
  { route: "/searchResult", note: "efa52654e" },
  { route: "/service-terms-and-conditions", note: "pre-existing" },
  { route: "/why-choose-trugreen/testimonials-and-ratings", note: "efa52654e" },
];

type TtfbSample = {
  route: string;
  beforeMs: number;
  afterMs: number;
  deltaMs: number;
  percentChange: number;
};

async function getTtfb(baseUrl: string, route: string): Promise<number> {
  const url = `${baseUrl}${route}`;
  const times: number[] = [];

  for (let i = 0; i < SAMPLES; i++) {
    const start = performance.now();
    let res: Response;
    try {
      res = await fetch(url, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
      });
    } catch (err) {
      console.warn(`Fetch failed for ${url}:`, err);
      return NaN;
    }
    const end = performance.now();
    if (!res.ok) {
      console.warn(`Non-OK response ${res.status} ${res.statusText} for ${url}`);
      return NaN;
    }
    // We don't need the body, but reading at least the start of it ensures the
    // headers have been fully received, so the timing is closer to true TTFB.
    await res.text();
    times.push(end - start);
  }

  times.sort((a, b) => a - b);
  return times[Math.floor(times.length / 2)];
}

function escapeMd(s: string): string {
  return s.replace(/\|/g, "\\|");
}

function formatMs(n: number): string {
  return Number.isNaN(n) ? "N/A" : n.toFixed(1);
}

function formatPercent(n: number): string {
  if (Number.isNaN(n)) return "N/A";
  return `${n > 0 ? "+" : ""}${n.toFixed(1)}%`;
}

test("compare TTFB before and after htmlLimitedBots", async () => {
  const results: TtfbSample[] = [];

  for (const route of ROUTES) {
    const beforeMs = await getTtfb(BEFORE_URL, route.route);
    const afterMs = await getTtfb(AFTER_URL, route.route);
    const deltaMs =
      Number.isNaN(beforeMs) || Number.isNaN(afterMs)
        ? NaN
        : afterMs - beforeMs;
    const percentChange =
      !Number.isNaN(beforeMs) && beforeMs > 0 && !Number.isNaN(deltaMs)
        ? (deltaMs / beforeMs) * 100
        : NaN;

    results.push({
      route: route.route,
      beforeMs,
      afterMs,
      deltaMs,
      percentChange,
    });
  }

  const beforeValues = results.filter((r) => !Number.isNaN(r.beforeMs));
  const afterValues = results.filter((r) => !Number.isNaN(r.afterMs));

  const avgBefore =
    beforeValues.reduce((sum, r) => sum + r.beforeMs, 0) / beforeValues.length;
  const avgAfter =
    afterValues.reduce((sum, r) => sum + r.afterMs, 0) / afterValues.length;
  const avgDelta =
    beforeValues.length > 0 && afterValues.length > 0
      ? avgAfter - avgBefore
      : NaN;
  const avgPercent =
    !Number.isNaN(avgDelta) && avgBefore > 0
      ? (avgDelta / avgBefore) * 100
      : NaN;

  const successfulCount = results.filter(
    (r) => !Number.isNaN(r.beforeMs) && !Number.isNaN(r.afterMs)
  ).length;

  const report = [
    "# TTFB Comparison: Before vs After `htmlLimitedBots: /.*/`",
    "",
    `**Before:** ${BEFORE_URL}`,
    `**After:** ${AFTER_URL}`,
    `**Date:** ${new Date().toISOString().split("T")[0]}`,
    `**Samples per route:** ${SAMPLES}`,
    "",
    "## Summary",
    "",
    `- **Routes tested:** ${results.length}`,
    `- **Routes with both before and after measurements:** ${successfulCount}`,
    `- **Average TTFB before:** ${formatMs(avgBefore)} ms`,
    `- **Average TTFB after:** ${formatMs(avgAfter)} ms`,
    `- **Average delta:** ${Number.isNaN(avgDelta) ? "" : avgDelta > 0 ? "+" : ""}${formatMs(avgDelta)} ms`,
    `- **Average change:** ${formatPercent(avgPercent)}`,
    "",
    "## Results",
    "",
    "| Route | Before (ms) | After (ms) | Delta (ms) | Change (%) |",
    "|---|---|---|---|---|",
    ...results.map((r) =>
      [
        `| ${escapeMd(r.route)} |`,
        ` ${formatMs(r.beforeMs)} |`,
        ` ${formatMs(r.afterMs)} |`,
        ` ${Number.isNaN(r.deltaMs) ? "" : r.deltaMs > 0 ? "+" : ""}${formatMs(r.deltaMs)} |`,
        ` ${formatPercent(r.percentChange)} |`,
      ].join("")
    ),
    "",
    "## Notes",
    "",
    "- TTFB is measured as the time from `fetch()` start until response headers and initial body are received.",
    "- Each route is sampled multiple times; the reported value is the median.",
    "- `Cache-Control: no-cache, no-store` is sent to avoid cached responses.",
    "- `N/A` means the request failed or returned a non-2xx response.",
    "",
  ].join("\n");

  const reportPath = path.resolve(process.cwd(), "ttfb-comparison-report.md");
  await writeFile(reportPath, report, "utf8");

  console.table(
    results.map((r) => ({
      route: r.route,
      before: `${formatMs(r.beforeMs)} ms`,
      after: `${formatMs(r.afterMs)} ms`,
      delta: `${Number.isNaN(r.deltaMs) ? "" : r.deltaMs > 0 ? "+" : ""}${formatMs(r.deltaMs)} ms`,
      change: formatPercent(r.percentChange),
    }))
  );

  console.log(`\nReport written to: ${reportPath}`);
});
