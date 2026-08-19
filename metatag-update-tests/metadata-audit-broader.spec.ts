import { test, expect, type APIRequestContext } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(
  /\/$/,
  ""
);

const REPORT_DIR = "Trugreen Resources";
const REPORT_NAME = "broader-metadata-audit-report.md";

const HOMEPAGE_TITLE = "TruGreen | America's #1 Name in Lawn Care";
const HOMEPAGE_DESCRIPTION =
  "Get a pro-worthy lawn with expert, local lawn care services from TruGreen, and spend your extra time doing what you love.";

type RouteCheck = {
  route: string;
  expectedPath: string;
};

const ROUTES: RouteCheck[] = [
  // Recently fixed routes (regression checks)
  { route: "/about/privacy-policy", expectedPath: "/about/privacy-policy" },
  { route: "/customer-support", expectedPath: "/customer-support" },
  { route: "/ppc/landing-page", expectedPath: "/ppc/landing-page" },
  { route: "/nb/ppc/landing-page", expectedPath: "/nb/ppc/landing-page" },
  { route: "/b/ppc/landing-page", expectedPath: "/b/ppc/landing-page" },
  // Affected routes with generateMetadata that currently return {} on missing/empty CMS data
  { route: "/about/california-privacy-policy", expectedPath: "/about/california-privacy-policy" },
  { route: "/about/sms-terms", expectedPath: "/about/sms-terms" },
  { route: "/about/terms", expectedPath: "/about/terms" },
  { route: "/lawn-care-101/faqs", expectedPath: "/lawn-care-101/faqs" },
  { route: "/lawn-care-101/learning-center", expectedPath: "/lawn-care-101/learning-center" },
  { route: "/local-lawn-care", expectedPath: "/local-lawn-care" },
  { route: "/newsroom", expectedPath: "/newsroom" },
  { route: "/newsroom/executive-staff", expectedPath: "/newsroom/executive-staff" },
  { route: "/pests-products-and-services", expectedPath: "/pests-products-and-services" },
  { route: "/products-and-services", expectedPath: "/products-and-services" },
  { route: "/service-terms-and-conditions", expectedPath: "/service-terms-and-conditions" },
];

type HeadData = {
  title: string;
  description: string;
  canonical: string;
};

function parseHead(html: string): HeadData {
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch?.[1]?.trim() || "";

  const descRegex =
    /<meta\b[^>]*\bname=["']description["'][^>]*\bcontent=["']([^"']*)["'][^>]*>/i;
  const description = html.match(descRegex)?.[1]?.trim() || "";

  const canonRegex =
    /<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']*)["'][^>]*>/i;
  const canonical = html.match(canonRegex)?.[1]?.trim() || "";

  return { title, description, canonical };
}

function getCanonicalPath(canonical: string): string {
  try {
    return new URL(canonical).pathname;
  } catch {
    return "";
  }
}

type Result = {
  route: string;
  title: string;
  description: string;
  canonical: string;
  canonicalPath: string;
  expectedPath: string;
  pass: boolean;
  failures: string[];
};

async function checkRoute(
  request: APIRequestContext,
  check: RouteCheck
): Promise<Result> {
  const res = await request.get(`${BASE_URL}${check.route}`, {
    timeout: 60000,
  });
  const html = await res.text();
  const head = parseHead(html);

  const canonicalPath = getCanonicalPath(head.canonical);
  const failures: string[] = [];

  if (!head.title) {
    failures.push("title is missing");
  } else if (head.title === HOMEPAGE_TITLE) {
    failures.push("title is homepage default");
  }

  if (!head.description) {
    failures.push("description is missing");
  } else if (head.description === HOMEPAGE_DESCRIPTION) {
    failures.push("description is homepage default");
  }

  if (!canonicalPath) {
    failures.push("canonical is missing");
  } else if (canonicalPath !== check.expectedPath) {
    failures.push(`canonical path is ${canonicalPath}, expected ${check.expectedPath}`);
  }

  return {
    route: check.route,
    title: head.title,
    description: head.description,
    canonical: head.canonical,
    canonicalPath,
    expectedPath: check.expectedPath,
    failures,
    pass: failures.length === 0,
  };
}

test("broader metadata audit for routes with suspicious generateMetadata", async ({
  request,
}) => {
  const results: Result[] = [];

  for (const check of ROUTES) {
    const result = await checkRoute(request, check);
    results.push(result);
  }

  const passed = results.filter((r) => r.pass).length;
  const failed = results.length - passed;

  const reportBody = [
    "# Broader Metadata Audit",
    "",
    `**Date:** ${new Date().toISOString().split("T")[0]}`,
    `**Base URL:** ${BASE_URL}`,
    "",
    "## Summary",
    "",
    `- **Total:** ${results.length}`,
    `- **Passed:** ${passed}`,
    `- **Failed:** ${failed}`,
    "",
    "## Results",
    "",
    "| Route | Title | Description | Canonical | Pass | Failures |",
    "|---|---|---|---|---|---|",
    ...results.map((r) =>
      [
        `| ${r.route} |`,
        ` ${r.title} |`,
        ` ${r.description} |`,
        ` ${r.canonical} |`,
        ` ${r.pass ? "PASS" : "FAIL"} |`,
        ` ${r.failures.join("; ")} |`,
      ].join("")
    ),
    "",
    failed === 0
      ? "All checks passed."
      : `${failed} route(s) failed. See the table above for routes to fix.`,
    "",
  ].join("\n");

  const reportPath = path.resolve(
    process.cwd(),
    "..",
    REPORT_DIR,
    REPORT_NAME
  );
  await writeFile(reportPath, reportBody, "utf8");

  console.table(
    results.map((r) => ({
      route: r.route,
      title: r.title,
      canonical: r.canonical,
      failures: r.failures.join("; "),
      pass: r.pass,
    }))
  );

  expect(failed, `${failed} route(s) failed metadata checks`).toBe(0);
});
