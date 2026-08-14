import { getBaseUrl } from "../config";
import type { SeoAuditConfig } from "./types";
import { normalizeHttpUrl } from "./url";

const DEFAULT_SITEMAP_PATH = "/sitemap.xml";
const DEFAULT_CONCURRENCY = 4;
const DEFAULT_REQUEST_TIMEOUT_MS = 20000;
const DEFAULT_NAVIGATION_TIMEOUT_MS = 45000;

function parsePositiveInteger(
  value: string | undefined,
  fallback: number,
): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.floor(parsed);
}

function parseMaxPages(value: string | undefined): number | null {
  if (!value || !value.trim()) {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return null;
  }

  return Math.floor(parsed);
}

function resolveBaseUrl(): string {
  const configuredBase =
    process.env.SEO_BASE_URL || getBaseUrl({ automation: false });
  const normalized = normalizeHttpUrl(configuredBase, configuredBase);
  if (!normalized) {
    throw new Error(`Invalid SEO_BASE_URL/base URL: ${configuredBase}`);
  }

  return normalized;
}

export function getSeoAuditConfig(): SeoAuditConfig {
  const baseUrl = resolveBaseUrl();
  const configuredSitemap =
    process.env.SEO_SITEMAP_URL ||
    new URL(DEFAULT_SITEMAP_PATH, baseUrl).toString();
  const sitemapUrl = normalizeHttpUrl(configuredSitemap, baseUrl);

  if (!sitemapUrl) {
    throw new Error(`Invalid SEO_SITEMAP_URL: ${configuredSitemap}`);
  }

  return {
    baseUrl,
    sitemapUrl,
    concurrency: parsePositiveInteger(
      process.env.SEO_AUDIT_CONCURRENCY,
      DEFAULT_CONCURRENCY,
    ),
    requestTimeoutMs: parsePositiveInteger(
      process.env.SEO_REQUEST_TIMEOUT_MS,
      DEFAULT_REQUEST_TIMEOUT_MS,
    ),
    navigationTimeoutMs: parsePositiveInteger(
      process.env.SEO_NAVIGATION_TIMEOUT_MS,
      DEFAULT_NAVIGATION_TIMEOUT_MS,
    ),
    maxPages: parseMaxPages(process.env.SEO_MAX_PAGES),
  };
}
