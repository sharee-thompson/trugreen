import type { APIRequestContext, Page } from "@playwright/test";
import { closeCookieBanner } from "../helpers";
import type {
  CanonicalTargetValidation,
  HeadTagSnapshot,
  H1Snapshot,
  LandmarkSummary,
  PageAuditRecord,
  RedirectHop,
  SeoAuditConfig,
  SeoIssue,
  StructuredDataSummary,
} from "./types";
import { isInternalUrl, normalizeCrawlUrl, normalizeHttpUrl } from "./url";

const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);
const TITLE_PATTERN = /TruGreen/i;

type AuditPageOptions = {
  sitemapUrls?: string[];
  compareInternalLinksToSitemap?: boolean;
};

function firstMatch(text: string, pattern: RegExp): string | null {
  const match = pattern.exec(text);
  return match?.[1]?.trim() || null;
}

function extractHeadHtml(rawHtml: string): string {
  return firstMatch(rawHtml, /<head\b[^>]*>([\s\S]*?)<\/head>/i) || "";
}

function extractRawHeadSnapshot(rawHtml: string): HeadTagSnapshot {
  const headHtml = extractHeadHtml(rawHtml);
  const canonicalMatches = headHtml.match(
    /<link\b[^>]*rel=(?:"[^"]*canonical[^"]*"|'[^']*canonical[^']*')[^>]*>/gi,
  );

  return {
    title: firstMatch(headHtml, /<title\b[^>]*>([\s\S]*?)<\/title>/i),
    canonical:
      firstMatch(
        headHtml,
        /<link\b[^>]*rel=(?:"[^"]*canonical[^"]*"|'[^']*canonical[^']*')[^>]*href=(?:"([^"]*)"|'([^']*)')[^>]*>/i,
      ) ||
      firstMatch(
        headHtml,
        /<link\b[^>]*href=(?:"([^"]*)"|'([^']*)')[^>]*rel=(?:"[^"]*canonical[^"]*"|'[^']*canonical[^']*')[^>]*>/i,
      ),
    canonicalCount: canonicalMatches?.length || 0,
    metaRobots:
      firstMatch(
        headHtml,
        /<meta\b[^>]*name=(?:"robots"|'robots')[^>]*content=(?:"([^"]*)"|'([^']*)')[^>]*>/i,
      ) ||
      firstMatch(
        headHtml,
        /<meta\b[^>]*content=(?:"([^"]*)"|'([^']*)')[^>]*name=(?:"robots"|'robots')[^>]*>/i,
      ),
  };
}

function normalizeOptionalUrl(
  url: string | null,
  baseUrl: string,
): string | null {
  if (!url) {
    return null;
  }

  return normalizeHttpUrl(url, baseUrl) || url.trim() || null;
}

function extractCanonicalFromLinkHeader(
  linkHeader: string | null,
  baseUrl: string,
): string | null {
  if (!linkHeader) {
    return null;
  }

  const entries = linkHeader.split(",").map((entry) => entry.trim());
  for (const entry of entries) {
    const canonicalMatch = entry.match(/<([^>]+)>\s*;\s*rel="?canonical"?/i);
    if (canonicalMatch?.[1]) {
      return normalizeOptionalUrl(canonicalMatch[1], baseUrl);
    }
  }

  return null;
}

function normalizeTextContent(value: string | null | undefined): string | null {
  const trimmed = value?.replace(/\s+/g, " ").trim();
  return trimmed ? trimmed : null;
}

function flattenStructuredDataItems(
  input: unknown,
): Array<Record<string, unknown>> {
  if (Array.isArray(input)) {
    return input.flatMap((item) => flattenStructuredDataItems(item));
  }

  if (!input || typeof input !== "object") {
    return [];
  }

  const record = input as Record<string, unknown>;
  const graph = record["@graph"];
  if (Array.isArray(graph)) {
    return graph.flatMap((item) => flattenStructuredDataItems(item));
  }

  return [record];
}

function getStructuredDataTypes(item: Record<string, unknown>): string[] {
  const typeValue = item["@type"];
  if (typeof typeValue === "string") {
    return [typeValue];
  }

  if (Array.isArray(typeValue)) {
    return typeValue.filter(
      (value): value is string => typeof value === "string",
    );
  }

  return [];
}

function pushStructuredDataWarnings(
  item: Record<string, unknown>,
  index: number,
  warnings: string[],
): void {
  const hasField = (field: string): boolean => field in item;
  const types = getStructuredDataTypes(item);

  if (!hasField("@context")) {
    warnings.push(`jsonld_${index}_missing_@context`);
  }

  if (types.length === 0) {
    warnings.push(`jsonld_${index}_missing_@type`);
    return;
  }

  const typeSet = new Set(types);
  const requiresName = [
    "Organization",
    "WebSite",
    "LocalBusiness",
    "Corporation",
    "Service",
    "Product",
  ].some((type) => typeSet.has(type));

  if (requiresName && !hasField("name")) {
    warnings.push(`jsonld_${index}_missing_name`);
  }

  if (
    ["Organization", "WebSite", "LocalBusiness", "Corporation"].some((type) =>
      typeSet.has(type),
    ) &&
    !hasField("url")
  ) {
    warnings.push(`jsonld_${index}_missing_url`);
  }

  if (
    ["Article", "BlogPosting", "NewsArticle"].some((type) => typeSet.has(type))
  ) {
    if (!hasField("headline")) {
      warnings.push(`jsonld_${index}_missing_headline`);
    }
    if (!hasField("datePublished")) {
      warnings.push(`jsonld_${index}_missing_datePublished`);
    }
    if (!hasField("author")) {
      warnings.push(`jsonld_${index}_missing_author`);
    }
  }

  if (typeSet.has("BreadcrumbList") && !hasField("itemListElement")) {
    warnings.push(`jsonld_${index}_missing_itemListElement`);
  }

  if (typeSet.has("FAQPage") && !hasField("mainEntity")) {
    warnings.push(`jsonld_${index}_missing_mainEntity`);
  }
}

async function resolveRedirectChain(
  request: APIRequestContext,
  requestedUrl: string,
  config: SeoAuditConfig,
): Promise<{
  finalUrl: string;
  httpStatus: number | null;
  redirectChain: RedirectHop[];
  rawHtml: string;
  canonicalHeader: string | null;
  xRobotsTag: string | null;
}> {
  const redirectChain: RedirectHop[] = [];
  let currentUrl = requestedUrl;
  let finalHtml = "";
  let finalStatus: number | null = null;
  let finalCanonicalHeader: string | null = null;
  let finalXRobotsTag: string | null = null;

  for (let hop = 0; hop < 10; hop += 1) {
    const response = await request.fetch(currentUrl, {
      method: "GET",
      failOnStatusCode: false,
      timeout: config.requestTimeoutMs,
      maxRedirects: 0,
    });

    const headers = response.headers();
    const location = headers.location || headers.Location || null;
    finalStatus = response.status();
    redirectChain.push({
      url: currentUrl,
      status: finalStatus,
      location,
    });

    if (REDIRECT_STATUSES.has(finalStatus) && location) {
      currentUrl = new URL(location, currentUrl).toString();
      continue;
    }

    finalHtml = await response.text();
    finalCanonicalHeader = extractCanonicalFromLinkHeader(
      headers.link || headers.Link || null,
      currentUrl,
    );
    finalXRobotsTag =
      headers["x-robots-tag"] || headers["X-Robots-Tag"] || null;
    return {
      finalUrl: currentUrl,
      httpStatus: finalStatus,
      redirectChain,
      rawHtml: finalHtml,
      canonicalHeader: finalCanonicalHeader,
      xRobotsTag: finalXRobotsTag,
    };
  }

  throw new Error("Redirect chain exceeded 10 hops.");
}

function summarizeStructuredData(rawHtml: string): StructuredDataSummary {
  const matches = rawHtml.match(
    /<script\b[^>]*type=(?:"application\/ld\+json"|'application\/ld\+json')[^>]*>([\s\S]*?)<\/script>/gi,
  );
  const scripts = matches || [];
  let invalidJsonLdCount = 0;
  const detectedTypes = new Set<string>();
  const missingFieldWarnings: string[] = [];

  let itemIndex = 0;

  for (const scriptTag of scripts) {
    const payload = firstMatch(
      scriptTag,
      /<script\b[^>]*>([\s\S]*?)<\/script>/i,
    );

    if (!payload) {
      invalidJsonLdCount += 1;
      continue;
    }

    try {
      const parsed = JSON.parse(payload);
      const items = flattenStructuredDataItems(parsed);
      items.forEach((item) => {
        if (!item || typeof item !== "object") {
          missingFieldWarnings.push(`jsonld_${itemIndex}_not_object`);
          itemIndex += 1;
          return;
        }

        getStructuredDataTypes(item).forEach((type) => detectedTypes.add(type));
        pushStructuredDataWarnings(item, itemIndex, missingFieldWarnings);
        itemIndex += 1;
      });
    } catch {
      invalidJsonLdCount += 1;
    }
  }

  return {
    jsonLdCount: scripts.length,
    invalidJsonLdCount,
    detectedTypes: Array.from(detectedTypes).sort((left, right) =>
      left.localeCompare(right),
    ),
    missingFieldWarnings,
  };
}

function pushIssue(
  issues: SeoIssue[],
  code: string,
  severity: SeoIssue["severity"],
  message: string,
): void {
  issues.push({
    code,
    severity,
    reviewBucket: "automated",
    message,
  });
}

function addIssueIfMissing(
  record: PageAuditRecord,
  code: string,
  severity: SeoIssue["severity"],
  message: string,
  details?: string[],
): void {
  if (record.issues.some((issue) => issue.code === code)) {
    return;
  }

  record.issues.push({
    code,
    severity,
    reviewBucket: "automated",
    message,
    details,
  });
  record.issueSummary = record.issues.map((issue) => issue.code);
}

function getPreferredCanonical(record: PageAuditRecord): string | null {
  return (
    record.rendered.canonical || record.raw.canonical || record.canonicalHeader
  );
}

function buildCanonicalCountMessage(
  scope: "raw" | "rendered",
  count: number,
): string {
  if (count === 0) {
    return `No canonical tag was found in the ${scope} head.`;
  }

  return `Expected exactly one canonical tag in the ${scope} head, found ${count}.`;
}

export async function validateCanonicalTarget(
  request: APIRequestContext,
  config: SeoAuditConfig,
  targetUrl: string,
): Promise<CanonicalTargetValidation> {
  const redirectChain: RedirectHop[] = [];
  let currentUrl = targetUrl;

  try {
    for (let hop = 0; hop < 10; hop += 1) {
      const response = await request.fetch(currentUrl, {
        method: "HEAD",
        failOnStatusCode: false,
        timeout: config.requestTimeoutMs,
        maxRedirects: 0,
      });

      const headers = response.headers();
      const location = headers.location || headers.Location || null;
      const status = response.status();

      redirectChain.push({
        url: currentUrl,
        status,
        location,
      });

      if (REDIRECT_STATUSES.has(status) && location) {
        currentUrl = new URL(location, currentUrl).toString();
        continue;
      }

      if (status === 405) {
        const fallbackResponse = await request.fetch(currentUrl, {
          method: "GET",
          failOnStatusCode: false,
          timeout: config.requestTimeoutMs,
          maxRedirects: 0,
        });

        return {
          targetUrl,
          finalUrl: currentUrl,
          httpStatus: fallbackResponse.status(),
          redirectChain,
          ok: fallbackResponse.status() < 400,
        };
      }

      return {
        targetUrl,
        finalUrl: currentUrl,
        httpStatus: status,
        redirectChain,
        ok: status < 400,
      };
    }

    return {
      targetUrl,
      finalUrl: currentUrl,
      httpStatus: null,
      redirectChain,
      ok: false,
      error: "Canonical target exceeded 10 redirect hops.",
    };
  } catch (error) {
    return {
      targetUrl,
      finalUrl: currentUrl,
      httpStatus: null,
      redirectChain,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function enrichPageAudits(
  request: APIRequestContext,
  config: SeoAuditConfig,
  pageAudits: PageAuditRecord[],
): Promise<void> {
  const titleToPages = new Map<string, number[]>();

  pageAudits.forEach((record, index) => {
    const title = normalizeTextContent(
      record.rendered.title || record.raw.title,
    );
    if (!title) {
      return;
    }

    const key = title.toLowerCase();
    const pages = titleToPages.get(key) || [];
    pages.push(index);
    titleToPages.set(key, pages);
  });

  for (const indexes of titleToPages.values()) {
    if (indexes.length < 2) {
      continue;
    }

    const duplicateUrls = indexes.map((index) => pageAudits[index].finalUrl);
    indexes.forEach((index) => {
      addIssueIfMissing(
        pageAudits[index],
        "duplicate-title",
        "warning",
        "Rendered title is duplicated on more than one audited page.",
        duplicateUrls,
      );
    });
  }

  const validationMap = new Map<string, CanonicalTargetValidation>();
  const pageByFinalUrl = new Map<string, PageAuditRecord>();
  pageAudits.forEach((record) => {
    pageByFinalUrl.set(record.finalUrl, record);
  });

  for (const record of pageAudits) {
    const canonicalTarget = getPreferredCanonical(record);
    if (!canonicalTarget) {
      record.canonicalTargetValidation = null;
      continue;
    }

    const matchingPage = pageByFinalUrl.get(canonicalTarget);
    if (matchingPage) {
      record.canonicalTargetValidation = {
        targetUrl: canonicalTarget,
        finalUrl: matchingPage.finalUrl,
        httpStatus: matchingPage.httpStatus,
        redirectChain: matchingPage.redirectChain,
        ok:
          typeof matchingPage.httpStatus === "number"
            ? matchingPage.httpStatus < 400
            : false,
      };
    } else {
      let validation = validationMap.get(canonicalTarget);
      if (!validation) {
        validation = await validateCanonicalTarget(
          request,
          config,
          canonicalTarget,
        );
        validationMap.set(canonicalTarget, validation);
      }

      record.canonicalTargetValidation = validation;
    }

    const validation = record.canonicalTargetValidation;
    if (!validation) {
      continue;
    }

    if (!validation.ok) {
      addIssueIfMissing(
        record,
        "canonical-target-invalid",
        "warning",
        "Canonical target did not resolve successfully.",
        [
          validation.error ||
            `${validation.httpStatus ?? "NO_RESPONSE"}:${validation.targetUrl}`,
        ],
      );
      continue;
    }

    if (validation.finalUrl !== validation.targetUrl) {
      addIssueIfMissing(
        record,
        "canonical-target-redirects",
        "warning",
        "Canonical target resolves through a redirect instead of the declared canonical URL.",
        [validation.finalUrl],
      );
    }
  }
}

export async function auditPage(
  page: Page,
  request: APIRequestContext,
  config: SeoAuditConfig,
  requestedUrl: string,
  options?: AuditPageOptions,
): Promise<PageAuditRecord> {
  try {
    const rawResponse = await resolveRedirectChain(
      request,
      requestedUrl,
      config,
    );
    const rawSnapshot = extractRawHeadSnapshot(rawResponse.rawHtml);

    await page.goto(requestedUrl, {
      waitUntil: "domcontentloaded",
      timeout: config.navigationTimeoutMs,
    });
    await closeCookieBanner(page);

    const domSummary = await page.evaluate(() => {
      const normalizeText = (
        value: string | null | undefined,
      ): string | null => {
        const trimmed = value?.replace(/\s+/g, " ").trim();
        return trimmed ? trimmed : null;
      };

      const h1Elements = Array.from(document.querySelectorAll("h1"));
      const h1Texts = h1Elements
        .map((element) => normalizeText(element.textContent))
        .filter((value): value is string => Boolean(value));
      const hiddenCount = h1Elements.filter((element) => {
        const htmlElement = element as HTMLElement;
        const style = window.getComputedStyle(htmlElement);
        return (
          style.display === "none" ||
          style.visibility === "hidden" ||
          htmlElement.hidden ||
          htmlElement.getClientRects().length === 0
        );
      }).length;

      const canonicalHref = document
        .querySelector('head link[rel~="canonical"]')
        ?.getAttribute("href");
      const robotsContent = document
        .querySelector('head meta[name="robots"]')
        ?.getAttribute("content");
      const hreflangCount = document.querySelectorAll(
        'head link[rel="alternate"][hreflang]',
      ).length;

      const internalLinks = Array.from(document.querySelectorAll("a[href]"))
        .map((anchor) => anchor.getAttribute("href"))
        .filter((href): href is string => Boolean(href));

      return {
        title: normalizeText(document.title),
        canonical: normalizeText(canonicalHref),
        canonicalCount: document.querySelectorAll('head link[rel~="canonical"]')
          .length,
        metaRobots: normalizeText(robotsContent),
        hreflangCount,
        h1: {
          count: h1Elements.length,
          texts: h1Texts,
          emptyCount: h1Elements.length - h1Texts.length,
          hiddenCount,
        },
        landmarks: {
          hasMain: Boolean(document.querySelector("main")),
          hasHeader: Boolean(document.querySelector("header")),
          hasNav: Boolean(document.querySelector("nav")),
          hasFooter: Boolean(document.querySelector("footer")),
        },
        addressCount: document.querySelectorAll("address").length,
        timeDatetimeCount: document.querySelectorAll("time[datetime]").length,
        internalLinks,
      };
    });

    const rendered: HeadTagSnapshot = {
      title: domSummary.title,
      canonical: normalizeOptionalUrl(
        domSummary.canonical,
        rawResponse.finalUrl,
      ),
      canonicalCount: domSummary.canonicalCount,
      metaRobots: domSummary.metaRobots,
    };
    const raw: HeadTagSnapshot = {
      title: rawSnapshot.title,
      canonical: normalizeOptionalUrl(
        rawSnapshot.canonical,
        rawResponse.finalUrl,
      ),
      canonicalCount: rawSnapshot.canonicalCount,
      metaRobots: rawSnapshot.metaRobots,
    };

    const normalizedInternalLinks = new Set(
      domSummary.internalLinks
        .map((href) => normalizeCrawlUrl(href, rawResponse.finalUrl))
        .filter((href): href is string => Boolean(href))
        .filter((href) => isInternalUrl(href, config.baseUrl)),
    );
    const linkedInternalUrlsMissingFromSitemap =
      options?.compareInternalLinksToSitemap && options.sitemapUrls
        ? Array.from(normalizedInternalLinks)
            .filter((href) => !new Set(options.sitemapUrls).has(href))
            .sort((left, right) => left.localeCompare(right))
        : [];

    const jsOnlyMetadata: string[] = [];
    if (!raw.title && rendered.title) {
      jsOnlyMetadata.push("title");
    }
    if (!raw.canonical && rendered.canonical) {
      jsOnlyMetadata.push("canonical");
    }
    if (!raw.metaRobots && rendered.metaRobots) {
      jsOnlyMetadata.push("meta-robots");
    }

    const issues: SeoIssue[] = [];

    if (!raw.title && !rendered.title) {
      pushIssue(issues, "missing-title", "error", "Page title is missing.");
    }
    if (rendered.title && !TITLE_PATTERN.test(rendered.title)) {
      pushIssue(
        issues,
        "title-pattern-review",
        "warning",
        "Rendered title does not match the current TruGreen naming pattern heuristic.",
      );
    }
    if (!raw.canonical && !rendered.canonical) {
      pushIssue(
        issues,
        "missing-canonical",
        "warning",
        "Canonical tag is missing.",
      );
    }
    if (raw.canonicalCount !== 1) {
      pushIssue(
        issues,
        "raw-canonical-count-invalid",
        "warning",
        buildCanonicalCountMessage("raw", raw.canonicalCount),
      );
    }
    if (rendered.canonicalCount !== 1) {
      pushIssue(
        issues,
        "rendered-canonical-count-invalid",
        "warning",
        buildCanonicalCountMessage("rendered", rendered.canonicalCount),
      );
    }
    if (
      raw.canonical &&
      rendered.canonical &&
      raw.canonical !== rendered.canonical
    ) {
      pushIssue(
        issues,
        "canonical-raw-dom-conflict",
        "warning",
        "Raw HTML canonical and rendered DOM canonical do not match.",
      );
    }
    if (
      rawResponse.canonicalHeader &&
      raw.canonical &&
      rawResponse.canonicalHeader !== raw.canonical
    ) {
      pushIssue(
        issues,
        "canonical-header-raw-conflict",
        "warning",
        "HTTP Link canonical header and raw HTML canonical do not match.",
      );
    }
    if (
      rawResponse.canonicalHeader &&
      rendered.canonical &&
      rawResponse.canonicalHeader !== rendered.canonical
    ) {
      pushIssue(
        issues,
        "canonical-header-dom-conflict",
        "warning",
        "HTTP Link canonical header and rendered DOM canonical do not match.",
      );
    }
    if (domSummary.h1.count === 0) {
      pushIssue(issues, "missing-h1", "error", "No H1 was found.");
    }
    if (domSummary.h1.count > 1) {
      pushIssue(
        issues,
        "multiple-h1",
        "warning",
        "Multiple H1 elements were found.",
      );
    }
    if (domSummary.h1.emptyCount > 0) {
      pushIssue(
        issues,
        "empty-h1",
        "warning",
        "One or more H1 elements are empty.",
      );
    }
    if (domSummary.h1.hiddenCount > 0) {
      pushIssue(
        issues,
        "hidden-h1",
        "warning",
        "One or more H1 elements are hidden.",
      );
    }
    if (!domSummary.landmarks.hasMain) {
      pushIssue(issues, "missing-main", "warning", "Main landmark is missing.");
    }
    if (summarizeStructuredData(rawResponse.rawHtml).invalidJsonLdCount > 0) {
      pushIssue(
        issues,
        "invalid-jsonld",
        "warning",
        "One or more JSON-LD blocks could not be parsed.",
      );
    }
    if (linkedInternalUrlsMissingFromSitemap.length > 0) {
      pushIssue(
        issues,
        "internal-links-missing-from-sitemap",
        "warning",
        `Found ${linkedInternalUrlsMissingFromSitemap.length} internal links on the page that are not present in the sitemap inventory.`,
      );
    }

    const structuredData = summarizeStructuredData(rawResponse.rawHtml);

    return {
      requestedUrl,
      finalUrl: normalizeHttpUrl(page.url(), config.baseUrl) || page.url(),
      httpStatus: rawResponse.httpStatus,
      redirectChain: rawResponse.redirectChain,
      raw,
      rendered,
      canonicalHeader: rawResponse.canonicalHeader,
      canonicalTargetValidation: null,
      xRobotsTag: rawResponse.xRobotsTag,
      hreflangCount: domSummary.hreflangCount,
      h1: domSummary.h1 as H1Snapshot,
      landmarks: domSummary.landmarks as LandmarkSummary,
      structuredData,
      addressCount: domSummary.addressCount,
      timeDatetimeCount: domSummary.timeDatetimeCount,
      jsOnlyMetadata,
      internalLinkCount: normalizedInternalLinks.size,
      linkedInternalUrlsMissingFromSitemap,
      issueSummary: issues.map((issue) => issue.code),
      issues,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      requestedUrl,
      finalUrl: requestedUrl,
      httpStatus: null,
      redirectChain: [],
      raw: {
        title: null,
        canonical: null,
        canonicalCount: 0,
        metaRobots: null,
      },
      rendered: {
        title: null,
        canonical: null,
        canonicalCount: 0,
        metaRobots: null,
      },
      canonicalHeader: null,
      canonicalTargetValidation: null,
      xRobotsTag: null,
      hreflangCount: 0,
      h1: { count: 0, texts: [], emptyCount: 0, hiddenCount: 0 },
      landmarks: {
        hasMain: false,
        hasHeader: false,
        hasNav: false,
        hasFooter: false,
      },
      structuredData: {
        jsonLdCount: 0,
        invalidJsonLdCount: 0,
        detectedTypes: [],
        missingFieldWarnings: [],
      },
      addressCount: 0,
      timeDatetimeCount: 0,
      jsOnlyMetadata: [],
      internalLinkCount: 0,
      linkedInternalUrlsMissingFromSitemap: [],
      issueSummary: ["crawl-error"],
      issues: [
        {
          code: "crawl-error",
          severity: "error",
          reviewBucket: "automated",
          message,
        },
      ],
      crawlError: message,
    };
  }
}

export async function auditHomepage(
  page: Page,
  request: APIRequestContext,
  config: SeoAuditConfig,
  sitemapUrls: string[],
): Promise<PageAuditRecord> {
  return auditPage(page, request, config, config.baseUrl, {
    sitemapUrls,
    compareInternalLinksToSitemap: true,
  });
}
