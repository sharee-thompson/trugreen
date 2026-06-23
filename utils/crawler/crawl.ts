import type { APIRequestContext } from "@playwright/test";
import type { CrawlOptions, CrawlSummary, LinkRecord } from "./types";
import { fetchPageHtml, checkUrl } from "./http";
import { extractAnchorHrefs } from "./html";
import { normalizeUrl, isInternalUrl } from "./url-utils";

export async function crawlAndValidate(
  request: APIRequestContext,
  { baseUrl, maxDepth, maxLinks }: CrawlOptions,
): Promise<CrawlSummary> {
  const queue: Array<{ url: string; depth: number }> = [
    { url: baseUrl, depth: 0 },
  ];
  const crawledPages = new Set<string>();
  const seenLinks = new Set<string>();
  const results: LinkRecord[] = [];

  while (queue.length > 0 && seenLinks.size < maxLinks) {
    const current = queue.shift()!;
    if (crawledPages.has(current.url)) continue;
    crawledPages.add(current.url);

    const pageResult = await fetchPageHtml(request, current.url);
    if (!pageResult.ok || !pageResult.html) {
      results.push({
        sourcePage: current.url,
        url: current.url,
        isInternal: true,
        status: pageResult.status,
        ok: false,
        error: pageResult.error,
      });
      continue;
    }

    for (const rawLink of extractAnchorHrefs(pageResult.html)) {
      if (seenLinks.size >= maxLinks) break;

      const normalized = normalizeUrl(rawLink, current.url);
      if (!normalized || seenLinks.has(normalized)) continue;
      seenLinks.add(normalized);

      const internal = isInternalUrl(normalized, baseUrl);
      const status = await checkUrl(request, normalized);
      results.push({
        sourcePage: current.url,
        url: normalized,
        isInternal: internal,
        status: status.status,
        ok: status.ok,
        error: status.error,
      });

      if (internal && current.depth < maxDepth) {
        queue.push({ url: normalized, depth: current.depth + 1 });
      }
    }
  }

  const failed = results.filter((r) => !r.ok);
  return {
    results,
    crawledPageCount: crawledPages.size,
    passed: results.length - failed.length,
    failed,
  };
}
