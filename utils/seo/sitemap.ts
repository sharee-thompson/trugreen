import type { APIRequestContext } from "@playwright/test";
import type {
  RobotsDiscovery,
  SeoAuditConfig,
  SeoIssue,
  SitemapDocumentRecord,
  SitemapInventory,
  SkippedUrlRecord,
} from "./types";
import {
  getSkipReason,
  isInternalUrl,
  normalizeCrawlUrl,
  normalizeHttpUrl,
} from "./url";

function decodeXmlText(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .trim();
}

function extractLocValues(xml: string): string[] {
  const values: string[] = [];
  const pattern = /<loc\b[^>]*>([\s\S]*?)<\/loc>/gi;

  let match = pattern.exec(xml);
  while (match) {
    const value = decodeXmlText(match[1] || "");
    if (value) {
      values.push(value);
    }
    match = pattern.exec(xml);
  }

  return values;
}

function buildPlaceholderIssue(code: string, message: string): SeoIssue {
  return {
    code,
    severity: "info",
    reviewBucket:
      code === "manual-h1-meaning" ? "manual-review" : "developer-review",
    message,
  };
}

async function fetchText(
  request: APIRequestContext,
  url: string,
  timeout: number,
): Promise<{
  ok: boolean;
  status: number | null;
  body?: string;
  error?: string;
}> {
  try {
    const response = await request.fetch(url, {
      method: "GET",
      failOnStatusCode: false,
      timeout,
    });

    return {
      ok: response.ok(),
      status: response.status(),
      body: await response.text(),
    };
  } catch (error) {
    return {
      ok: false,
      status: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function parseRobotsSitemapUrls(robotsBody: string, baseUrl: string): string[] {
  return robotsBody
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => /^sitemap\s*:/i.test(line))
    .map((line) => line.replace(/^sitemap\s*:/i, "").trim())
    .map((value) => normalizeHttpUrl(value, baseUrl))
    .filter((value): value is string => Boolean(value));
}

async function discoverRobots(
  request: APIRequestContext,
  config: SeoAuditConfig,
): Promise<RobotsDiscovery> {
  const robotsUrl = new URL("/robots.txt", config.baseUrl).toString();
  const response = await fetchText(request, robotsUrl, config.requestTimeoutMs);

  if (!response.body) {
    return {
      robotsUrl,
      status: response.status,
      ok: response.ok,
      sitemapUrls: [],
      error: response.error,
    };
  }

  return {
    robotsUrl,
    status: response.status,
    ok: response.ok,
    sitemapUrls: parseRobotsSitemapUrls(response.body, config.baseUrl),
    error: response.error,
  };
}

export async function collectSitemapInventory(
  request: APIRequestContext,
  config: SeoAuditConfig,
  project: string,
): Promise<SitemapInventory> {
  const robots = await discoverRobots(request, config);
  const queuedSitemaps = new Set<string>();
  const pageUrls = new Set<string>();
  const skippedUrls: SkippedUrlRecord[] = [];
  const sitemapRecords: SitemapDocumentRecord[] = [];
  const sitemapQueue: Array<{ sitemapUrl: string; discoveredFrom: string }> =
    [];

  const pushSitemap = (candidate: string, discoveredFrom: string): void => {
    const normalized = normalizeHttpUrl(candidate, config.baseUrl);
    if (!normalized || queuedSitemaps.has(normalized)) {
      return;
    }

    if (!isInternalUrl(normalized, config.baseUrl)) {
      skippedUrls.push({
        url: normalized,
        reason: "external-sitemap-url",
        source: discoveredFrom,
      });
      return;
    }

    queuedSitemaps.add(normalized);
    sitemapQueue.push({ sitemapUrl: normalized, discoveredFrom });
  };

  pushSitemap(config.sitemapUrl, "configured-sitemap-url");
  for (const robotsSitemapUrl of robots.sitemapUrls) {
    pushSitemap(robotsSitemapUrl, robots.robotsUrl);
  }

  while (sitemapQueue.length > 0) {
    const current = sitemapQueue.shift();
    if (!current) {
      break;
    }

    const response = await fetchText(
      request,
      current.sitemapUrl,
      config.requestTimeoutMs,
    );

    if (!response.body) {
      sitemapRecords.push({
        sitemapUrl: current.sitemapUrl,
        discoveredFrom: current.discoveredFrom,
        type: "error",
        status: response.status,
        ok: false,
        nestedSitemapUrls: [],
        pageUrls: [],
        error: response.error || "Empty sitemap response body",
      });
      continue;
    }

    const xml = response.body;
    const locValues = extractLocValues(xml);
    const isIndex = /<sitemapindex\b/i.test(xml);
    const isUrlset = /<urlset\b/i.test(xml);
    const nestedSitemapUrls: string[] = [];
    const documentPageUrls: string[] = [];

    if (isIndex) {
      for (const locValue of locValues) {
        const normalizedSitemap = normalizeHttpUrl(locValue, config.baseUrl);
        if (!normalizedSitemap) {
          skippedUrls.push({
            url: locValue,
            reason: "invalid-sitemap-url",
            source: current.sitemapUrl,
          });
          continue;
        }

        nestedSitemapUrls.push(normalizedSitemap);
        pushSitemap(normalizedSitemap, current.sitemapUrl);
      }
    }

    if (isUrlset) {
      for (const locValue of locValues) {
        const normalizedPageUrl = normalizeCrawlUrl(locValue, config.baseUrl);
        if (!normalizedPageUrl) {
          const normalizedHttp = normalizeHttpUrl(locValue, config.baseUrl);
          skippedUrls.push({
            url: normalizedHttp || locValue,
            reason: normalizedHttp
              ? getSkipReason(normalizedHttp) || "non-crawlable-url"
              : "invalid-page-url",
            source: current.sitemapUrl,
          });
          continue;
        }

        if (!isInternalUrl(normalizedPageUrl, config.baseUrl)) {
          skippedUrls.push({
            url: normalizedPageUrl,
            reason: "external-page-url",
            source: current.sitemapUrl,
          });
          continue;
        }

        documentPageUrls.push(normalizedPageUrl);
        pageUrls.add(normalizedPageUrl);
      }
    }

    sitemapRecords.push({
      sitemapUrl: current.sitemapUrl,
      discoveredFrom: current.discoveredFrom,
      type: isIndex ? "index" : isUrlset ? "urlset" : "unknown",
      status: response.status,
      ok: response.ok,
      nestedSitemapUrls,
      pageUrls: documentPageUrls,
      error:
        isIndex || isUrlset ? undefined : "Unrecognized sitemap XML structure",
    });
  }

  const allPageUrls = Array.from(pageUrls).sort((left, right) =>
    left.localeCompare(right),
  );

  const cappedPageUrls =
    config.maxPages === null
      ? allPageUrls
      : allPageUrls.slice(0, config.maxPages);

  return {
    config,
    project,
    generatedAt: new Date().toISOString(),
    robots,
    sitemaps: sitemapRecords,
    allPageUrls,
    pageUrls: cappedPageUrls,
    skippedUrls,
    placeholders: {
      googleSearchConsole: buildPlaceholderIssue(
        "gsc-import-required",
        "Import Google Search Console exports separately; Playwright cannot retrieve them directly.",
      ),
      serverLogs: buildPlaceholderIssue(
        "server-log-import-required",
        "Import server-log exports separately; Playwright cannot inspect crawler log files directly.",
      ),
      h1Meaning: buildPlaceholderIssue(
        "manual-h1-meaning",
        "Assess whether the H1 is meaningful during manual SEO/content review.",
      ),
      drupalMetadataContract: buildPlaceholderIssue(
        "drupal-metadata-contract-review",
        "Validate any internal Drupal metadata contract with developers; the audit can only check observable output.",
      ),
    },
  };
}
