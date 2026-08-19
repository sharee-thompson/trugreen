import { test, expect, type APIRequestContext } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const BEFORE_BASE =
  process.env.BEFORE_BASE?.replace(/\/$/, "") || "http://localhost:8080";
const AFTER_BASE =
  process.env.AFTER_BASE?.replace(/\/$/, "") || "http://localhost:3000";
const SAMPLES = Math.max(Number(process.env.SAMPLES ?? "3"), 1);

const AFFECTED_PATHS = [
  "/",
  "/pay-your-bill",
  "/searchResult",
  "/myservicesummary",
  "/appointment-scheduler",
  "/my-account/reset-password",
  "/my-account/globalError",
  "/lawn-care-101/learning-center/search",
  "/aftercare",
  "/why-choose-trugreen/testimonials-and-ratings",
  "/home-a",
  "/home-b",
  "/home-c",
];

type RequestSample = {
  totalMs: number;
  status: number;
};

type AveragedMetrics = {
  totalMs: number;
  status: number;
};

type Comparison = {
  before: AveragedMetrics;
  after: AveragedMetrics;
  diff: {
    totalMs: number;
  };
};

async function collectSample(
  request: APIRequestContext,
  url: string
): Promise<RequestSample> {
  const start = Date.now();
  const res = await request.get(url, { timeout: 60000 });
  await res.text();
  const totalMs = Date.now() - start;

  return {
    totalMs,
    status: res.status(),
  };
}

function average(samples: RequestSample[]): AveragedMetrics {
  return {
    totalMs: Math.round(
      samples.reduce((sum, s) => sum + s.totalMs, 0) / samples.length
    ),
    status: Math.round(
      samples.reduce((sum, s) => sum + s.status, 0) / samples.length
    ),
  };
}

function diff(before: AveragedMetrics, after: AveragedMetrics) {
  return {
    totalMs: after.totalMs - before.totalMs,
  };
}

test("compare before and after performance of affected metadata routes", async ({
  request,
}) => {
  const results: Record<string, Comparison> = {};

  for (const route of AFFECTED_PATHS) {
    const beforeSamples: RequestSample[] = [];
    const afterSamples: RequestSample[] = [];

    for (let i = 0; i < SAMPLES; i++) {
      beforeSamples.push(
        await collectSample(request, `${BEFORE_BASE}${route}`)
      );
    }

    for (let i = 0; i < SAMPLES; i++) {
      afterSamples.push(await collectSample(request, `${AFTER_BASE}${route}`));
    }

    const before = average(beforeSamples);
    const after = average(afterSamples);
    results[route] = { before, after, diff: diff(before, after) };

    expect(after.totalMs).toBeGreaterThan(0);
  }

  const reportPath = path.join(
    process.cwd(),
    "metatag-update-tests",
    "before-after-performance.json"
  );
  await writeFile(reportPath, JSON.stringify(results, null, 2));

  const table = Object.entries(results).map(([route, { before, after, diff }]) => ({
    route,
    "before total (ms)": before.totalMs,
    "after total (ms)": after.totalMs,
    "diff total (ms)": diff.totalMs,
    "before status": before.status,
    "after status": after.status,
  }));

  console.table(table);
});
