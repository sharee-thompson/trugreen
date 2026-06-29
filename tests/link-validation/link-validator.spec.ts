import { test, expect } from "@playwright/test";
import { getBaseUrl } from "../../utils/config";
import { crawlAndValidate } from "../../utils/crawler/crawl";
import { writeReports } from "../../utils/crawler/report";

const MAX_DEPTH = 1;
const MAX_LINKS = 100;

test(
  "homepage crawl with external status checks",
  { tag: ["@link-validator", "@regression", "@links"] },
  async ({ page, request }, testInfo) => {
    test.setTimeout(180_000);
    const baseUrl = getBaseUrl();

    const summary = await crawlAndValidate(page, request, {
      baseUrl,
      maxDepth: MAX_DEPTH,
      maxLinks: MAX_LINKS,
    });

    await writeReports(summary, {
      baseUrl,
      maxDepth: MAX_DEPTH,
      maxLinks: MAX_LINKS,
      testInfo,
    });

    expect
      .soft(summary.results.length, "Expected at least one link to be checked")
      .toBeGreaterThan(0);
    expect(
      summary.failed.length,
      `Broken links found (${summary.failed.length}). See attached reports.`,
    ).toBe(0);
  },
);
