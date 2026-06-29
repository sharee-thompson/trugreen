export type LinkRecord = {
  sourcePage: string;
  url: string;
  isInternal: boolean;
  status: number | null;
  ok: boolean;
  error?: string;
};

export type CrawlOptions = {
  baseUrl: string;
  maxDepth: number;
  maxLinks: number;
};

export type CrawlSummary = {
  results: LinkRecord[];
  crawledPageCount: number;
  passed: number;
  failed: LinkRecord[];
};
