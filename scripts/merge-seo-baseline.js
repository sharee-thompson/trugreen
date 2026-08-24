const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const latestReportPath = path.join(
  projectRoot,
  "seo-audit-reports",
  "seo-page-audit-chromium-latest.json",
);
const localBaselineDir = path.join(
  projectRoot,
  "seo-audit-reports",
  "baseline",
);
const dashboardBaselineDir = path.join(
  projectRoot,
  "dashboard",
  "seo",
  "baseline",
);

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function escapeCsv(value) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

function toCsvLine(values) {
  return `${values.map((value) => escapeCsv(value)).join(",")}\n`;
}

function pageRangeLabel(config) {
  if (!config || !config.pageRange) {
    return "";
  }

  return `${config.pageRange.start}-${config.pageRange.end}`;
}

function buildSummary(pageAudits) {
  const crawlErrorCount = pageAudits.filter(
    (pageAudit) => pageAudit.crawlError,
  ).length;
  const pagesWithIssuesCount = pageAudits.filter(
    (pageAudit) =>
      Array.isArray(pageAudit.issueSummary) &&
      pageAudit.issueSummary.length > 0,
  ).length;
  const duplicateTitlePageCount = pageAudits.filter(
    (pageAudit) =>
      Array.isArray(pageAudit.issueSummary) &&
      pageAudit.issueSummary.includes("duplicate-title"),
  ).length;
  const uniqueDuplicateTitles = new Set(
    pageAudits
      .filter(
        (pageAudit) =>
          Array.isArray(pageAudit.issueSummary) &&
          pageAudit.issueSummary.includes("duplicate-title"),
      )
      .map((pageAudit) =>
        (pageAudit.rendered?.title || pageAudit.raw?.title || "").trim(),
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
        Array.isArray(pageAudit.issueSummary) &&
        (pageAudit.issueSummary.includes("raw-canonical-count-invalid") ||
          pageAudit.issueSummary.includes("rendered-canonical-count-invalid")),
    ).length,
    pagesWithCanonicalTargetIssues: pageAudits.filter(
      (pageAudit) =>
        Array.isArray(pageAudit.issueSummary) &&
        (pageAudit.issueSummary.includes("canonical-target-invalid") ||
          pageAudit.issueSummary.includes("canonical-target-redirects")),
    ).length,
  };
}

function buildPageAuditCsv(report) {
  const lines = [
    toCsvLine([
      "project",
      "generated_at",
      "baseline_label",
      "page_range",
      "max_pages",
      "requested_url",
      "final_url",
      "http_status",
      "redirect_chain",
      "raw_title",
      "rendered_title",
      "raw_canonical",
      "raw_canonical_count",
      "rendered_canonical",
      "rendered_canonical_count",
      "canonical_header",
      "canonical_target_status",
      "canonical_target_final_url",
      "meta_robots_raw",
      "meta_robots_rendered",
      "x_robots_tag",
      "hreflang_count",
      "h1_count",
      "h1_text",
      "hidden_h1_count",
      "landmarks",
      "structured_data",
      "address_count",
      "time_datetime_count",
      "internal_link_count",
      "linked_internal_urls_missing_from_sitemap_count",
      "linked_internal_urls_missing_from_sitemap",
      "js_only_metadata",
      "issue_summary",
      "crawl_error",
    ]),
  ];

  for (const pageAudit of report.pageAudits) {
    lines.push(
      toCsvLine([
        report.project,
        report.generatedAt,
        report.baselineLabel || "",
        report.pageRange || "",
        report.maxPages ?? "",
        pageAudit.requestedUrl,
        pageAudit.finalUrl,
        pageAudit.httpStatus ?? "",
        (pageAudit.redirectChain || [])
          .map((hop) => `${hop.status ?? "NO_RESPONSE"}:${hop.url}`)
          .join(" -> "),
        pageAudit.raw?.title || "",
        pageAudit.rendered?.title || "",
        pageAudit.raw?.canonical || "",
        pageAudit.raw?.canonicalCount ?? "",
        pageAudit.rendered?.canonical || "",
        pageAudit.rendered?.canonicalCount ?? "",
        pageAudit.canonicalHeader || "",
        pageAudit.canonicalTargetValidation?.httpStatus ?? "",
        pageAudit.canonicalTargetValidation?.finalUrl || "",
        pageAudit.raw?.metaRobots || "",
        pageAudit.rendered?.metaRobots || "",
        pageAudit.xRobotsTag || "",
        pageAudit.hreflangCount ?? "",
        pageAudit.h1?.count ?? "",
        Array.isArray(pageAudit.h1?.texts)
          ? pageAudit.h1.texts.join(" | ")
          : "",
        pageAudit.h1?.hiddenCount ?? "",
        [
          pageAudit.landmarks?.hasMain ? "main" : "",
          pageAudit.landmarks?.hasHeader ? "header" : "",
          pageAudit.landmarks?.hasNav ? "nav" : "",
          pageAudit.landmarks?.hasFooter ? "footer" : "",
        ]
          .filter(Boolean)
          .join("|"),
        `jsonld:${pageAudit.structuredData?.jsonLdCount ?? 0};types:${(pageAudit.structuredData?.detectedTypes || []).join("|")};invalid:${pageAudit.structuredData?.invalidJsonLdCount ?? 0};missing:${(pageAudit.structuredData?.missingFieldWarnings || []).join("|")}`,
        pageAudit.addressCount ?? "",
        pageAudit.timeDatetimeCount ?? "",
        pageAudit.internalLinkCount ?? "",
        (pageAudit.linkedInternalUrlsMissingFromSitemap || []).length,
        (pageAudit.linkedInternalUrlsMissingFromSitemap || []).join(" | "),
        (pageAudit.jsOnlyMetadata || []).join("|"),
        (pageAudit.issueSummary || []).join("|"),
        pageAudit.crawlError || "",
      ]),
    );
  }

  return lines.join("");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function getBaselineFileNames(baselineLabel) {
  const baselineSlug = slugify(baselineLabel || "default") || "default";

  return {
    baselineSlug,
    jsonName: `seo-baseline-${baselineSlug}-latest.json`,
    csvName: `seo-baseline-${baselineSlug}-latest.csv`,
  };
}

function getExistingBaselinePathForLabel(baselineLabel) {
  const { jsonName } = getBaselineFileNames(baselineLabel);
  const dashboardPath = path.join(dashboardBaselineDir, jsonName);
  if (fileExists(dashboardPath)) {
    return dashboardPath;
  }

  const localPath = path.join(localBaselineDir, jsonName);
  if (fileExists(localPath)) {
    return localPath;
  }

  return null;
}

function mergeSourceRuns(existingRuns, currentRun) {
  const merged = [...(Array.isArray(existingRuns) ? existingRuns : [])];
  const key = `${currentRun.generatedAt}|${currentRun.pageRange || ""}|${currentRun.pageCount}`;
  if (
    !merged.some(
      (run) =>
        `${run.generatedAt}|${run.pageRange || ""}|${run.pageCount}` === key,
    )
  ) {
    merged.push(currentRun);
  }

  return merged.sort((left, right) =>
    left.generatedAt.localeCompare(right.generatedAt),
  );
}

function sortPageAudits(pageAudits) {
  return [...pageAudits].sort((left, right) =>
    left.requestedUrl.localeCompare(right.requestedUrl),
  );
}

if (!fileExists(latestReportPath)) {
  console.log("No latest SEO page audit JSON found. Skipping baseline merge.");
  process.exit(0);
}

const currentReport = readJson(latestReportPath);
const configuredBaselineLabel = (process.env.SEO_BASELINE_LABEL || "").trim();
const currentBaselineLabel =
  configuredBaselineLabel || currentReport.config?.baselineLabel || "default";
const existingBaselinePath =
  getExistingBaselinePathForLabel(currentBaselineLabel);
const existingBaseline = existingBaselinePath
  ? readJson(existingBaselinePath)
  : null;

const pageAuditMap = new Map();
for (const pageAudit of existingBaseline?.pageAudits || []) {
  pageAuditMap.set(pageAudit.requestedUrl, pageAudit);
}
for (const pageAudit of currentReport.pageAudits || []) {
  pageAuditMap.set(pageAudit.requestedUrl, pageAudit);
}

const mergedPageAudits = sortPageAudits(Array.from(pageAuditMap.values()));
const totalKnownSitemapUrls =
  currentReport.inventory?.allPageUrls?.length ||
  existingBaseline?.coverage?.totalKnownSitemapUrls ||
  null;
const baselineReport = {
  kind: "seo-baseline",
  baselineLabel: currentBaselineLabel,
  generatedAt: new Date().toISOString(),
  project: currentReport.project,
  baseUrl: currentReport.config?.baseUrl || null,
  sitemapUrl: currentReport.config?.sitemapUrl || null,
  pageRange: pageRangeLabel(currentReport.config),
  maxPages: currentReport.config?.maxPages ?? null,
  coverage: {
    totalKnownSitemapUrls,
    mergedAuditedUrls: mergedPageAudits.length,
    percent:
      typeof totalKnownSitemapUrls === "number" && totalKnownSitemapUrls > 0
        ? Number(
            ((mergedPageAudits.length / totalKnownSitemapUrls) * 100).toFixed(
              2,
            ),
          )
        : null,
  },
  sourceRuns: mergeSourceRuns(existingBaseline?.sourceRuns, {
    generatedAt: currentReport.generatedAt,
    pageRange: pageRangeLabel(currentReport.config),
    maxPages: currentReport.config?.maxPages ?? null,
    pageCount: currentReport.pageAudits?.length || 0,
    crawlErrorCount: currentReport.summary?.crawlErrorCount ?? 0,
    pagesWithIssuesCount: currentReport.summary?.pagesWithIssuesCount ?? 0,
  }),
  summary: buildSummary(mergedPageAudits),
  pageAudits: mergedPageAudits,
};

const { jsonName: baselineJsonName, csvName: baselineCsvName } =
  getBaselineFileNames(currentBaselineLabel);
const baselineJson = JSON.stringify(baselineReport, null, 2);
const baselineCsv = buildPageAuditCsv(baselineReport);

for (const dirPath of [localBaselineDir, dashboardBaselineDir]) {
  ensureDir(dirPath);
  fs.writeFileSync(path.join(dirPath, baselineJsonName), baselineJson, "utf8");
  fs.writeFileSync(path.join(dirPath, baselineCsvName), baselineCsv, "utf8");
  fs.writeFileSync(
    path.join(dirPath, "seo-baseline-latest.json"),
    baselineJson,
    "utf8",
  );
  fs.writeFileSync(
    path.join(dirPath, "seo-baseline-latest.csv"),
    baselineCsv,
    "utf8",
  );
}

console.log(
  `SEO baseline merged for '${currentBaselineLabel}' with ${mergedPageAudits.length} unique URLs.`,
);
