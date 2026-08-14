import type { SeoAuditAggregateReport, SitemapInventory } from "./types";

function escapeCsv(value: string | number): string {
  return `"${String(value).replace(/"/g, '""')}"`;
}

function toCsvLine(values: Array<string | number>): string {
  return `${values.map((value) => escapeCsv(value)).join(",")}\n`;
}

export function buildSitemapInventoryCsv(inventory: SitemapInventory): string {
  const lines = [
    toCsvLine([
      "project",
      "generated_at",
      "base_url",
      "configured_sitemap_url",
      "source_sitemap_url",
      "source_type",
      "url",
      "issue_summary",
      "review_bucket",
    ]),
  ];

  for (const sitemap of inventory.sitemaps) {
    for (const url of sitemap.pageUrls) {
      lines.push(
        toCsvLine([
          inventory.project,
          inventory.generatedAt,
          inventory.config.baseUrl,
          inventory.config.sitemapUrl,
          sitemap.sitemapUrl,
          sitemap.type,
          url,
          "",
          "automated",
        ]),
      );
    }
  }

  return lines.join("");
}

export function buildPageAuditCsv(report: SeoAuditAggregateReport): string {
  const lines = [
    toCsvLine([
      "project",
      "generated_at",
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
        pageAudit.requestedUrl,
        pageAudit.finalUrl,
        pageAudit.httpStatus ?? "",
        pageAudit.redirectChain
          .map((hop) => `${hop.status ?? "NO_RESPONSE"}:${hop.url}`)
          .join(" -> "),
        pageAudit.raw.title || "",
        pageAudit.rendered.title || "",
        pageAudit.raw.canonical || "",
        pageAudit.raw.canonicalCount,
        pageAudit.rendered.canonical || "",
        pageAudit.rendered.canonicalCount,
        pageAudit.canonicalHeader || "",
        pageAudit.canonicalTargetValidation?.httpStatus ?? "",
        pageAudit.canonicalTargetValidation?.finalUrl || "",
        pageAudit.raw.metaRobots || "",
        pageAudit.rendered.metaRobots || "",
        pageAudit.xRobotsTag || "",
        pageAudit.hreflangCount,
        pageAudit.h1.count,
        pageAudit.h1.texts.join(" | "),
        pageAudit.h1.hiddenCount,
        [
          pageAudit.landmarks.hasMain ? "main" : "",
          pageAudit.landmarks.hasHeader ? "header" : "",
          pageAudit.landmarks.hasNav ? "nav" : "",
          pageAudit.landmarks.hasFooter ? "footer" : "",
        ]
          .filter(Boolean)
          .join("|"),
        `jsonld:${pageAudit.structuredData.jsonLdCount};types:${pageAudit.structuredData.detectedTypes.join("|")};invalid:${pageAudit.structuredData.invalidJsonLdCount};missing:${pageAudit.structuredData.missingFieldWarnings.join("|")}`,
        pageAudit.addressCount,
        pageAudit.timeDatetimeCount,
        pageAudit.internalLinkCount,
        pageAudit.linkedInternalUrlsMissingFromSitemap.length,
        pageAudit.linkedInternalUrlsMissingFromSitemap.join(" | "),
        pageAudit.jsOnlyMetadata.join("|"),
        pageAudit.issueSummary.join("|"),
        pageAudit.crawlError || "",
      ]),
    );
  }

  return lines.join("");
}
