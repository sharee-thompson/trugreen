/// <reference types="node" />

import { expect, test, type Browser } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import type {
  PageAuditRecord,
  SeoAuditAggregateReport,
  SeoAuditSummary,
} from "../../utils/seo/types";
import { getSeoAuditConfig } from "../../utils/seo/config";
import {
  buildPageAuditCsv,
  buildSitemapInventoryCsv,
} from "../../utils/seo/report";
import { auditPage, enrichPageAudits } from "../../utils/seo/page-audit";
import { collectSitemapInventory } from "../../utils/seo/sitemap";

const PROGRESS_LOG_INTERVAL = 25;

async function auditSitemapPages(
  browser: Browser,
  request: Parameters<typeof collectSitemapInventory>[0],
  config: ReturnType<typeof getSeoAuditConfig>,
  pageUrls: string[],
  sitemapUrlsForComparison: string[],
): Promise<PageAuditRecord[]> {
  const results: PageAuditRecord[] = new Array(pageUrls.length);
  let nextIndex = 0;
  let completedCount = 0;
  const workerCount = Math.min(config.concurrency, pageUrls.length || 1);

  console.log(
    `[SEO Audit] Starting page audits: ${pageUrls.length} URLs with concurrency ${workerCount}`,
  );

  const workers = Array.from({ length: workerCount }, async () => {
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      while (true) {
        const currentIndex = nextIndex;
        nextIndex += 1;

        if (currentIndex >= pageUrls.length) {
          break;
        }

        results[currentIndex] = await auditPage(
          page,
          request,
          config,
          pageUrls[currentIndex],
          {
            sitemapUrls: sitemapUrlsForComparison,
            compareInternalLinksToSitemap: true,
          },
        );

        completedCount += 1;

        if (
          completedCount === pageUrls.length ||
          completedCount % PROGRESS_LOG_INTERVAL === 0
        ) {
          console.log(
            `[SEO Audit] Progress: ${completedCount}/${pageUrls.length} pages audited`,
          );
        }
      }
    } finally {
      await context.close();
    }
  });

  await Promise.all(workers);
  return results;
}

function buildAuditSummary(pageAudits: PageAuditRecord[]): SeoAuditSummary {
  const crawlErrorCount = pageAudits.filter(
    (pageAudit) => pageAudit.crawlError,
  ).length;
  const pagesWithIssuesCount = pageAudits.filter(
    (pageAudit) => pageAudit.issueSummary.length > 0,
  ).length;
  const duplicateTitlePageCount = pageAudits.filter((pageAudit) =>
    pageAudit.issueSummary.includes("duplicate-title"),
  ).length;
  const uniqueDuplicateTitles = new Set(
    pageAudits
      .filter((pageAudit) => pageAudit.issueSummary.includes("duplicate-title"))
      .map((pageAudit) =>
        (pageAudit.rendered.title || pageAudit.raw.title || "").trim(),
      )
      .filter(Boolean),
  );

  return {
    requestedPageCount: pageAudits.length,
    auditedPageCount: pageAudits.length,
    crawlErrorCount,
    pagesWithIssuesCount,
    duplicateTitleGroupCount: uniqueDuplicateTitles.size,
    duplicateTitlePageCount,
    pagesWithCanonicalCountIssues: pageAudits.filter(
      (pageAudit) =>
        pageAudit.issueSummary.includes("raw-canonical-count-invalid") ||
        pageAudit.issueSummary.includes("rendered-canonical-count-invalid"),
    ).length,
    pagesWithCanonicalTargetIssues: pageAudits.filter(
      (pageAudit) =>
        pageAudit.issueSummary.includes("canonical-target-invalid") ||
        pageAudit.issueSummary.includes("canonical-target-redirects"),
    ).length,
  };
}

test("collects sitemap inventory and audits sitemap pages for the technical SEO audit @seo", async ({
  browser,
  request,
}, testInfo) => {
  test.setTimeout(180000);

  const config = getSeoAuditConfig();
  const inventory = await collectSitemapInventory(
    request,
    config,
    testInfo.project.name,
  );

  const reportDir = path.join(process.cwd(), "seo-audit-reports");
  fs.mkdirSync(reportDir, { recursive: true });

  const generatedAt = new Date().toISOString();
  const safeTimestamp = generatedAt.replace(/[:.]/g, "-");
  const safeProjectName = testInfo.project.name
    .replace(/\s+/g, "-")
    .toLowerCase();
  const jsonPath = path.join(
    reportDir,
    `seo-sitemap-inventory-${safeProjectName}-latest.json`,
  );
  const csvPath = path.join(
    reportDir,
    `seo-sitemap-inventory-${safeProjectName}-latest.csv`,
  );
  const homepageJsonPath = path.join(
    reportDir,
    `seo-page-audit-${safeProjectName}-latest.json`,
  );
  const homepageCsvPath = path.join(
    reportDir,
    `seo-page-audit-${safeProjectName}-latest.csv`,
  );
  const timestampedPageAuditJsonPath = path.join(
    reportDir,
    `seo-page-audit-${safeProjectName}-${safeTimestamp}.json`,
  );
  const timestampedPageAuditCsvPath = path.join(
    reportDir,
    `seo-page-audit-${safeProjectName}-${safeTimestamp}.csv`,
  );

  const estimatedTimeoutMs = Math.max(
    180000,
    Math.ceil(inventory.pageUrls.length / Math.max(config.concurrency, 1)) *
      5000 +
      120000,
  );
  test.setTimeout(estimatedTimeoutMs);

  const pageAudits = await auditSitemapPages(
    browser,
    request,
    config,
    inventory.pageUrls,
    inventory.allPageUrls,
  );
  await enrichPageAudits(request, config, pageAudits);

  const auditReport: SeoAuditAggregateReport = {
    config,
    project: testInfo.project.name,
    generatedAt,
    inventory,
    summary: buildAuditSummary(pageAudits),
    pageAudits,
  };

  fs.writeFileSync(jsonPath, JSON.stringify(inventory, null, 2), "utf8");
  fs.writeFileSync(csvPath, buildSitemapInventoryCsv(inventory), "utf8");
  fs.writeFileSync(
    homepageJsonPath,
    JSON.stringify(auditReport, null, 2),
    "utf8",
  );
  fs.writeFileSync(homepageCsvPath, buildPageAuditCsv(auditReport), "utf8");
  fs.writeFileSync(
    timestampedPageAuditJsonPath,
    JSON.stringify(auditReport, null, 2),
    "utf8",
  );
  fs.writeFileSync(
    timestampedPageAuditCsvPath,
    buildPageAuditCsv(auditReport),
    "utf8",
  );

  await testInfo.attach("seo-sitemap-inventory-json", {
    contentType: "application/json",
    body: Buffer.from(JSON.stringify(inventory, null, 2), "utf8"),
  });

  await testInfo.attach("seo-sitemap-inventory-csv", {
    contentType: "text/csv",
    body: Buffer.from(buildSitemapInventoryCsv(inventory), "utf8"),
  });

  await testInfo.attach("seo-homepage-audit-json", {
    contentType: "application/json",
    body: Buffer.from(JSON.stringify(auditReport, null, 2), "utf8"),
  });

  await testInfo.attach("seo-homepage-audit-csv", {
    contentType: "text/csv",
    body: Buffer.from(buildPageAuditCsv(auditReport), "utf8"),
  });

  console.log(`\n[SEO Audit] Base URL: ${config.baseUrl}`);
  console.log(`[SEO Audit] Configured sitemap: ${config.sitemapUrl}`);
  console.log(
    `[SEO Audit] Robots status: ${inventory.robots.status ?? "NO_RESPONSE"}`,
  );
  console.log(`[SEO Audit] Discovered sitemaps: ${inventory.sitemaps.length}`);
  console.log(
    `[SEO Audit] Sitemap URLs collected: ${inventory.pageUrls.length}`,
  );
  if (config.pageRange) {
    console.log(
      `[SEO Audit] Page range applied: ${config.pageRange.start}-${config.pageRange.end}`,
    );
  }
  if (config.baselineLabel) {
    console.log(`[SEO Audit] Baseline label: ${config.baselineLabel}`);
  }
  console.log(`[SEO Audit] Skipped URLs: ${inventory.skippedUrls.length}`);
  console.log(
    `[SEO Audit] Audited sitemap pages: ${auditReport.summary.auditedPageCount}`,
  );
  console.log(
    `[SEO Audit] Pages with issues: ${auditReport.summary.pagesWithIssuesCount}`,
  );
  console.log(
    `[SEO Audit] Crawl errors: ${auditReport.summary.crawlErrorCount}`,
  );
  console.log(
    `[SEO Audit] Duplicate title groups: ${auditReport.summary.duplicateTitleGroupCount}`,
  );
  console.log(`[SEO Audit] JSON Report: ${jsonPath}`);
  console.log(`[SEO Audit] CSV Report: ${csvPath}`);
  console.log(`[SEO Audit] Page Audit JSON Report: ${homepageJsonPath}`);
  console.log(`[SEO Audit] Page Audit CSV Report: ${homepageCsvPath}`);
  console.log(
    `[SEO Audit] Timestamped Page Audit JSON Report: ${timestampedPageAuditJsonPath}`,
  );
  console.log(
    `[SEO Audit] Timestamped Page Audit CSV Report: ${timestampedPageAuditCsvPath}`,
  );

  expect
    .soft(inventory.sitemaps.length, "Expected at least one sitemap document")
    .toBeGreaterThan(0);
  expect(
    inventory.pageUrls.length,
    "Expected at least one crawlable sitemap URL for the SEO audit inventory.",
  ).toBeGreaterThan(0);
  expect(
    auditReport.pageAudits.length,
    "Expected at least one page to be audited.",
  ).toBeGreaterThan(0);
});
