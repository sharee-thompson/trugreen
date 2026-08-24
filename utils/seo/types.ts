export type SeoIssueSeverity = "error" | "warning" | "info";

export type SeoReviewBucket =
  | "automated"
  | "manual-review"
  | "developer-review";

export type RedirectHop = {
  url: string;
  status: number | null;
  location?: string | null;
};

export type SeoIssue = {
  code: string;
  severity: SeoIssueSeverity;
  reviewBucket: SeoReviewBucket;
  message: string;
  details?: string[];
};

export type SeoAuditConfig = {
  baseUrl: string;
  sitemapUrl: string;
  concurrency: number;
  requestTimeoutMs: number;
  navigationTimeoutMs: number;
  maxPages: number | null;
  pageRange: {
    start: number;
    end: number;
  } | null;
  baselineLabel: string | null;
};

export type SkippedUrlRecord = {
  url: string;
  reason: string;
  source: string;
};

export type RobotsDiscovery = {
  robotsUrl: string;
  status: number | null;
  ok: boolean;
  sitemapUrls: string[];
  error?: string;
};

export type SitemapDocumentType = "urlset" | "index" | "unknown" | "error";

export type SitemapDocumentRecord = {
  sitemapUrl: string;
  discoveredFrom: string;
  type: SitemapDocumentType;
  status: number | null;
  ok: boolean;
  nestedSitemapUrls: string[];
  pageUrls: string[];
  error?: string;
};

export type SitemapInventory = {
  config: SeoAuditConfig;
  project: string;
  generatedAt: string;
  robots: RobotsDiscovery;
  sitemaps: SitemapDocumentRecord[];
  allPageUrls: string[];
  pageUrls: string[];
  skippedUrls: SkippedUrlRecord[];
  placeholders: {
    googleSearchConsole: SeoIssue;
    serverLogs: SeoIssue;
    h1Meaning: SeoIssue;
    drupalMetadataContract: SeoIssue;
  };
};

export type LandmarkSummary = {
  hasMain: boolean;
  hasHeader: boolean;
  hasNav: boolean;
  hasFooter: boolean;
};

export type HeadTagSnapshot = {
  title: string | null;
  canonical: string | null;
  canonicalCount: number;
  metaRobots: string | null;
};

export type H1Snapshot = {
  count: number;
  texts: string[];
  emptyCount: number;
  hiddenCount: number;
};

export type StructuredDataSummary = {
  jsonLdCount: number;
  invalidJsonLdCount: number;
  detectedTypes: string[];
  missingFieldWarnings: string[];
};

export type CanonicalTargetValidation = {
  targetUrl: string;
  finalUrl: string;
  httpStatus: number | null;
  redirectChain: RedirectHop[];
  ok: boolean;
  error?: string;
};

export type PageAuditRecord = {
  requestedUrl: string;
  finalUrl: string;
  httpStatus: number | null;
  redirectChain: RedirectHop[];
  raw: HeadTagSnapshot;
  rendered: HeadTagSnapshot;
  canonicalHeader: string | null;
  canonicalTargetValidation: CanonicalTargetValidation | null;
  xRobotsTag: string | null;
  hreflangCount: number;
  h1: H1Snapshot;
  landmarks: LandmarkSummary;
  structuredData: StructuredDataSummary;
  addressCount: number;
  timeDatetimeCount: number;
  jsOnlyMetadata: string[];
  internalLinkCount: number;
  linkedInternalUrlsMissingFromSitemap: string[];
  issueSummary: string[];
  issues: SeoIssue[];
  crawlError?: string;
};

export type SeoAuditSummary = {
  requestedPageCount: number;
  auditedPageCount: number;
  crawlErrorCount: number;
  pagesWithIssuesCount: number;
  duplicateTitleGroupCount: number;
  duplicateTitlePageCount: number;
  pagesWithCanonicalCountIssues: number;
  pagesWithCanonicalTargetIssues: number;
};

export type SeoAuditAggregateReport = {
  config: SeoAuditConfig;
  project: string;
  generatedAt: string;
  inventory: SitemapInventory;
  summary: SeoAuditSummary;
  pageAudits: PageAuditRecord[];
};
