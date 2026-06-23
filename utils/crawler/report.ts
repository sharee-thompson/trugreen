import fs from "fs";
import path from "path";
import type { TestInfo } from "@playwright/test";
import type { CrawlSummary } from "./types";
import { buildHtmlReport, shortError } from "./html-report";

type ReportCtx = {
  baseUrl: string;
  maxDepth: number;
  maxLinks: number;
  testInfo: TestInfo;
};

export async function writeReports(summary: CrawlSummary, ctx: ReportCtx) {
  const { baseUrl, maxDepth, maxLinks, testInfo } = ctx;
  const project = testInfo.project.name;

  const summaryJson = {
    baseUrl,
    maxDepth,
    maxLinks,
    crawledPageCount: summary.crawledPageCount,
    checkedLinkCount: summary.results.length,
    passed: summary.passed,
    failed: summary.failed.length,
    failures: summary.failed,
    allResults: summary.results,
    project,
    generatedAt: new Date().toISOString(),
  };

  // Build the HTML once (the original built it twice).
  const html = buildHtmlReport(summary.results, baseUrl, project);

  const reportDir = path.join(process.cwd(), "link-validation-reports");
  fs.mkdirSync(reportDir, { recursive: true });
  const safe = project.replace(/\s+/g, "-").toLowerCase();
  const stamp = new Date().toISOString().replace(/[.:]/g, "-");
  const jsonPath = path.join(
    reportDir,
    `link-validation-${safe}-${stamp}.json`,
  );
  const htmlPath = path.join(
    reportDir,
    `link-validation-${safe}-${stamp}.html`,
  );

  fs.writeFileSync(jsonPath, JSON.stringify(summaryJson, null, 2), "utf8");
  fs.writeFileSync(htmlPath, html, "utf8");

  await testInfo.attach("link-validation-summary", {
    contentType: "application/json",
    body: Buffer.from(JSON.stringify(summaryJson, null, 2), "utf8"),
  });
  await testInfo.attach("link-validation-report", {
    contentType: "text/html",
    body: Buffer.from(html, "utf8"),
  });

  logSummary(summary, baseUrl, jsonPath, htmlPath);
}

function logSummary(
  summary: CrawlSummary,
  baseUrl: string,
  jsonPath: string,
  htmlPath: string,
) {
  console.log(`\n[Link Validator] Base URL: ${baseUrl}`);
  console.log(`[Link Validator] Crawled Pages: ${summary.crawledPageCount}`);
  console.log(`[Link Validator] Checked Links: ${summary.results.length}`);
  console.log(`[Link Validator] Passed: ${summary.passed}`);
  console.log(`[Link Validator] Failed: ${summary.failed.length}`);

  if (summary.failed.length > 0) {
    const unique = Array.from(
      new Map(summary.failed.map((f) => [f.url, f])).values(),
    );
    console.log("\n[Link Validator] Broken Links:");
    unique.forEach((link, i) => {
      const statusLabel =
        link.status === null ? "NO_RESPONSE" : String(link.status);
      const type = link.isInternal ? "internal" : "external";
      const err = shortError(link.error);
      console.log(
        `${i + 1}. [${statusLabel}] (${type}) ${link.url}\n      Found on: ${link.sourcePage}${err ? `\n      Error: ${err}` : ""}`,
      );
    });
    console.log(`[Link Validator] Unique Broken URLs: ${unique.length}`);
  } else {
    console.log("\n[Link Validator] No broken links found.");
  }

  console.log(`[Link Validator] JSON Report: ${jsonPath}`);
  console.log(`[Link Validator] HTML Report: ${htmlPath}`);
}
