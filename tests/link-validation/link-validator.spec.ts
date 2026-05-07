/// <reference types="node" />

import { expect, test, type APIRequestContext } from "@playwright/test";
import fs from "fs";
import path from "path";

type LinkRecord = {
  sourcePage: string;
  url: string;
  isInternal: boolean;
  status: number | null;
  ok: boolean;
  error?: string;
};

const BASE_URL = process.env.BASE_URL ?? "https://www.trugreen.com";
const MAX_DEPTH = 1;
const MAX_LINKS = 100;

const SKIP_PROTOCOL_PREFIXES = [
  "mailto:",
  "tel:",
  "sms:",
  "javascript:",
  "data:",
  "blob:",
  "about:",
];

const SKIP_EXTENSION_REGEX =
  /\.(pdf|jpg|jpeg|png|gif|webp|svg|zip|doc|docx|xls|xlsx|ppt|pptx)(\?.*)?$/i;
const SKIP_HOST_PATTERNS = [
  /(^|\.)facebook\.com$/i,
  /(^|\.)instagram\.com$/i,
  /(^|\.)x\.com$/i,
  /(^|\.)twitter\.com$/i,
  /(^|\.)yelp\.com$/i,
  /(^|\.)bbb\.org$/i,
];

function shouldSkipHost(url: URL): boolean {
  return SKIP_HOST_PATTERNS.some((pattern) => pattern.test(url.hostname));
}

function normalizeUrl(rawUrl: string, baseOrigin: string): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return null;
  }

  const lower = trimmed.toLowerCase();
  if (SKIP_PROTOCOL_PREFIXES.some((prefix) => lower.startsWith(prefix))) {
    return null;
  }

  if (trimmed.startsWith("#")) {
    return null;
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed, baseOrigin);
  } catch {
    return null;
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    return null;
  }

  if (shouldSkipHost(parsed)) {
    return null;
  }

  parsed.hash = "";

  const normalized = parsed.toString();
  if (SKIP_EXTENSION_REGEX.test(normalized)) {
    return null;
  }

  return normalized;
}

function isInternalUrl(url: string, baseOrigin: string): boolean {
  try {
    return new URL(url).origin === new URL(baseOrigin).origin;
  } catch {
    return false;
  }
}

async function checkUrl(
  request: APIRequestContext,
  url: string,
): Promise<{ status: number | null; ok: boolean; error?: string }> {
  try {
    const headResponse = await request.fetch(url, {
      method: "HEAD",
      failOnStatusCode: false,
      timeout: 15000,
    });

    // Many sites block or mis-handle HEAD, so fall back to GET when needed.
    if (headResponse.status() >= 400 || headResponse.status() === 405) {
      const getResponse = await request.fetch(url, {
        method: "GET",
        failOnStatusCode: false,
        timeout: 20000,
      });
      return {
        status: getResponse.status(),
        ok: getResponse.status() < 400,
      };
    }

    return {
      status: headResponse.status(),
      ok: headResponse.status() < 400,
    };
  } catch (error) {
    return {
      status: null,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function fetchPageHtml(
  request: APIRequestContext,
  url: string,
): Promise<{
  ok: boolean;
  status: number | null;
  html?: string;
  error?: string;
}> {
  let lastError: string | undefined;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await request.fetch(url, {
        method: "GET",
        failOnStatusCode: false,
        timeout: 45000,
      });

      const status = response.status();
      if (status >= 400) {
        return { ok: false, status };
      }

      const contentType = response.headers()["content-type"] || "";
      if (!contentType.includes("text/html")) {
        return {
          ok: false,
          status,
          error: `Non-HTML content-type: ${contentType}`,
        };
      }

      const html = await response.text();
      return { ok: true, status, html };
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
  }

  return { ok: false, status: null, error: lastError };
}

function extractAnchorHrefs(html: string): string[] {
  const hrefs: string[] = [];
  const anchorHrefRegex = /<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1/gi;

  let match: RegExpExecArray | null = anchorHrefRegex.exec(html);
  while (match) {
    const href = match[2]?.trim();
    if (href) {
      hrefs.push(href);
    }
    match = anchorHrefRegex.exec(html);
  }

  return hrefs;
}

function buildHtmlReport(
  records: LinkRecord[],
  baseUrl: string,
  projectName: string,
): string {
  const failed = records.filter((r) => !r.ok);
  const passed = records.length - failed.length;

  const rows = records
    .map((record) => {
      const statusLabel =
        record.status === null ? "NO_RESPONSE" : String(record.status);
      const state = record.ok ? "PASS" : "FAIL";
      const rowClass = record.ok ? "ok" : "fail";
      const err = record.error ? ` - ${record.error}` : "";
      return `<tr class="${rowClass}"><td>${state}</td><td>${statusLabel}</td><td><a href="${record.url}">${record.url}</a>${err}</td><td>${record.sourcePage}</td><td>${record.isInternal ? "internal" : "external"}</td></tr>`;
    })
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>Link Validation Report</title>
	<style>
		body { font-family: -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif; margin: 24px; color: #202124; }
		h1 { margin-bottom: 8px; }
		.meta { margin-bottom: 20px; }
		.chips { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
		.chip { padding: 6px 10px; border-radius: 999px; font-weight: 600; font-size: 13px; }
		.chip.all { background: #e8f0fe; color: #1a73e8; }
		.chip.pass { background: #e6f4ea; color: #188038; }
		.chip.fail { background: #fce8e6; color: #d93025; }
		table { width: 100%; border-collapse: collapse; margin-top: 12px; }
		th, td { border: 1px solid #dadce0; padding: 8px; text-align: left; vertical-align: top; font-size: 13px; }
		th { background: #f8f9fa; }
		tr.ok td:first-child { color: #188038; font-weight: 700; }
		tr.fail td:first-child { color: #d93025; font-weight: 700; }
		a { color: #1a73e8; word-break: break-all; }
		code { background: #f1f3f4; padding: 2px 4px; border-radius: 4px; }
	</style>
</head>
<body>
	<h1>Link Validation Report</h1>
	<div class="meta">
		<div><strong>Base URL:</strong> <code>${baseUrl}</code></div>
		<div><strong>Project:</strong> <code>${projectName}</code></div>
		<div class="chips">
			<span class="chip all">Total: ${records.length}</span>
			<span class="chip pass">Passed: ${passed}</span>
			<span class="chip fail">Failed: ${failed.length}</span>
		</div>
	</div>

	<table>
		<thead>
			<tr>
				<th>Result</th>
				<th>Status</th>
				<th>URL</th>
				<th>Found On</th>
				<th>Type</th>
			</tr>
		</thead>
		<tbody>
			${rows}
		</tbody>
	</table>
</body>
</html>`;
}

function shortError(error?: string): string | undefined {
  if (!error) {
    return undefined;
  }

  const firstLine = error.split("\n")[0]?.trim();
  return firstLine || undefined;
}

test("homepage crawl with external status checks @link-validator", async ({
  request,
}, testInfo) => {
  test.setTimeout(180000);

  const queue: Array<{ url: string; depth: number }> = [
    {
      url: BASE_URL,
      depth: 0,
    },
  ];
  const crawledPages = new Set<string>();
  const seenLinks = new Set<string>();
  const results: LinkRecord[] = [];

  while (queue.length > 0 && seenLinks.size < MAX_LINKS) {
    const current = queue.shift();
    if (!current) {
      break;
    }

    if (crawledPages.has(current.url)) {
      continue;
    }

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

    const rawLinks = extractAnchorHrefs(pageResult.html);

    for (const rawLink of rawLinks) {
      if (seenLinks.size >= MAX_LINKS) {
        break;
      }

      const normalized = normalizeUrl(rawLink, current.url);
      if (!normalized || seenLinks.has(normalized)) {
        continue;
      }

      seenLinks.add(normalized);
      const internal = isInternalUrl(normalized, BASE_URL);
      const status = await checkUrl(request, normalized);

      results.push({
        sourcePage: current.url,
        url: normalized,
        isInternal: internal,
        status: status.status,
        ok: status.ok,
        error: status.error,
      });

      if (internal && current.depth < MAX_DEPTH) {
        queue.push({ url: normalized, depth: current.depth + 1 });
      }
    }
  }

  const failed = results.filter((r) => !r.ok);
  const passed = results.length - failed.length;

  const summary = {
    baseUrl: BASE_URL,
    maxDepth: MAX_DEPTH,
    maxLinks: MAX_LINKS,
    crawledPageCount: crawledPages.size,
    checkedLinkCount: results.length,
    passed,
    failed: failed.length,
    failures: failed,
    allResults: results,
    project: testInfo.project.name,
    generatedAt: new Date().toISOString(),
  };

  const reportDir = path.join(process.cwd(), "link-validation-reports");
  fs.mkdirSync(reportDir, { recursive: true });

  const safeProjectName = testInfo.project.name
    .replace(/\s+/g, "-")
    .toLowerCase();
  const runStamp = new Date().toISOString().replace(/[.:]/g, "-");
  const jsonPath = path.join(
    reportDir,
    `link-validation-${safeProjectName}-${runStamp}.json`,
  );
  const htmlPath = path.join(
    reportDir,
    `link-validation-${safeProjectName}-${runStamp}.html`,
  );

  fs.writeFileSync(jsonPath, JSON.stringify(summary, null, 2), "utf8");
  fs.writeFileSync(
    htmlPath,
    buildHtmlReport(results, BASE_URL, testInfo.project.name),
    "utf8",
  );

  await testInfo.attach("link-validation-summary", {
    contentType: "application/json",
    body: Buffer.from(JSON.stringify(summary, null, 2), "utf8"),
  });

  await testInfo.attach("link-validation-report", {
    contentType: "text/html",
    body: Buffer.from(
      buildHtmlReport(results, BASE_URL, testInfo.project.name),
      "utf8",
    ),
  });

  console.log(`\n[Link Validator] Base URL: ${BASE_URL}`);
  console.log(`[Link Validator] Crawled Pages: ${crawledPages.size}`);
  console.log(`[Link Validator] Checked Links: ${results.length}`);
  console.log(`[Link Validator] Passed: ${passed}`);
  console.log(`[Link Validator] Failed: ${failed.length}`);

  if (failed.length > 0) {
    const uniqueFailures = Array.from(
      failed.reduce((map, current) => {
        if (!map.has(current.url)) {
          map.set(current.url, current);
        }
        return map;
      }, new Map<string, LinkRecord>()),
    ).map(([, value]) => value);

    console.log("\n[Link Validator] Broken Links:");
    uniqueFailures.forEach((link, index) => {
      const statusLabel =
        link.status === null ? "NO_RESPONSE" : String(link.status);
      const typeLabel = link.isInternal ? "internal" : "external";
      const conciseError = shortError(link.error);
      const errorText = conciseError ? `\n      Error: ${conciseError}` : "";

      console.log(
        `${index + 1}. [${statusLabel}] (${typeLabel}) ${link.url}\n      Found on: ${link.sourcePage}${errorText}`,
      );
    });
    console.log(
      `[Link Validator] Unique Broken URLs: ${uniqueFailures.length}`,
    );
  }

  if (failed.length === 0) {
    console.log("\n[Link Validator] No broken links found.");
  }

  console.log(`[Link Validator] JSON Report: ${jsonPath}`);
  console.log(`[Link Validator] HTML Report: ${htmlPath}`);

  expect
    .soft(results.length, "Expected at least one link to be checked")
    .toBeGreaterThan(0);
  expect(
    failed.length,
    `Broken links found (${failed.length}). See JSON/HTML reports in ${reportDir}.`,
  ).toBe(0);
});
