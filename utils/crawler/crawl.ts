import type { APIRequestContext, Page } from "@playwright/test";
import type { CrawlOptions, CrawlSummary, LinkRecord } from "./types";
import { checkUrl } from "./http";
import { normalizeUrl, isInternalUrl } from "./url-utils";

export async function crawlAndValidate(
  page: Page,
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

    // --- Render the page and pull links from the live DOM ---
    let hrefs: string[] = [];
    try {
      const response = await page.goto(current.url, {
        waitUntil: "domcontentloaded",
      });
      if (!response || !response.ok()) {
        results.push({
          sourcePage: current.url,
          url: current.url,
          isInternal: true,
          status: response?.status() ?? null,
          ok: false,
          error: response ? undefined : "No response",
        });
        continue;
      }

      // Wait for at least one anchor to render (SPAs hydrate after load).
      await page
        .locator("a[href]")
        .first()
        .waitFor({ state: "attached", timeout: 10_000 })
        .catch(() => {}); // a page with genuinely no links is allowed

      hrefs = await page
        .locator("a[href]")
        .evaluateAll((anchors) =>
          anchors.map((a) => a.getAttribute("href") ?? ""),
        );
    } catch (error) {
      results.push({
        sourcePage: current.url,
        url: current.url,
        isInternal: true,
        status: null,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      });
      continue;
    }

    // --- Normalize + validate (unchanged) ---
    for (const rawLink of hrefs) {
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
