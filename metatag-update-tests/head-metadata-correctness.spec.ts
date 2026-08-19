import { test, expect, type APIRequestContext } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(
  /\/$/,
  ""
);

const REPORT_DIR = "Trugreen Resources";
const REPORT_NAME = "head-metadata-correctness-report.md";

type RouteCheck = {
  route: string;
  expectedPath: string;
  titleContains?: string;
  descriptionContains?: string;
  requireTitle?: boolean;
  requireDescription?: boolean;
};

const ROUTES: RouteCheck[] = [
  {
    route: "/",
    expectedPath: "/",
    titleContains: "TruGreen",
    descriptionContains: "pro-worthy lawn",
  },
  {
    route: "/pay-your-bill",
    expectedPath: "/pay-your-bill",
    titleContains: "Pay Your Bill",
    descriptionContains: "Pay your TruGreen",
  },
  {
    route: "/searchResult",
    expectedPath: "/searchResult",
    titleContains: "Search Results",
    descriptionContains: "Search TruGreen",
  },
  {
    route: "/myservicesummary",
    expectedPath: "/myservicesummary",
    titleContains: "My Service Summary",
    descriptionContains: "View and manage",
  },
  {
    route: "/appointment-scheduler",
    expectedPath: "/appointment-scheduler",
    titleContains: "Schedule an Appointment",
    descriptionContains: "Schedule your",
  },
  {
    route: "/my-account/reset-password",
    expectedPath: "/my-account/reset-password",
    titleContains: "Reset Password",
    descriptionContains: "Reset your",
  },
  {
    route: "/my-account/globalError",
    expectedPath: "/my-account/globalError",
    titleContains: "Error",
    descriptionContains: "TruGreen account error",
  },
  {
    route: "/lawn-care-101/learning-center/search",
    expectedPath: "/lawn-care-101/learning-center/search",
    titleContains: "Search",
    descriptionContains: "Learning Center",
  },
  {
    route: "/aftercare",
    expectedPath: "/aftercare",
    titleContains: "AfterCare Page",
    descriptionContains: "After we service",
  },
  {
    route: "/why-choose-trugreen/testimonials-and-ratings",
    expectedPath: "/why-choose-trugreen/testimonials-and-ratings",
    requireTitle: true,
    requireDescription: true,
  },
  { route: "/home-a", expectedPath: "/", titleContains: "TruGreen" },
  { route: "/home-b", expectedPath: "/", titleContains: "TruGreen" },
  { route: "/home-c", expectedPath: "/", titleContains: "TruGreen" },
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
  pathPass: boolean;
  titlePass: boolean;
  descriptionPass: boolean;
  pass: boolean;
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
  const pathPass = canonicalPath === check.expectedPath;

  const titlePass = check.titleContains
    ? head.title.includes(check.titleContains)
    : check.requireTitle
    ? head.title.length > 0
    : true;

  const descriptionPass = check.descriptionContains
    ? head.description.includes(check.descriptionContains)
    : check.requireDescription
    ? head.description.length > 0
    : true;

  return {
    route: check.route,
    title: head.title,
    description: head.description,
    canonical: head.canonical,
    canonicalPath,
    expectedPath: check.expectedPath,
    pathPass,
    titlePass,
    descriptionPass,
    pass: pathPass && titlePass && descriptionPass,
  };
}

test("verify head metadata and canonicals for affected routes", async ({
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
    "# Head Metadata Correctness Verification",
    "",
    `**Date:** ${new Date().toISOString().split("T")[0]}`,
    `**Branch:** bugfix/84598_meta-tag-updates`,
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
    "| Route | Title | Description | Canonical | Pass |",
    "|---|---|---|---|---|",
    ...results.map((r) =>
      [
        `| ${r.route} |`,
        ` ${r.title} |`,
        ` ${r.description} |`,
        ` ${r.canonical} |`,
        ` ${r.pass ? "PASS" : "FAIL"} |`,
      ].join("")
    ),
    "",
    "## Notes",
    "",
    "- `title` and `description` are pulled from the server-rendered HTML.",
    "- `canonical` is compared as a path only, ignoring the origin (e.g., `https://qa-trugreen.com/pay-your-bill` matches expected path `/pay-your-bill`).",
    "- Routes with CMS-driven metadata (`/why-choose-trugreen/testimonials-and-ratings`) are checked for non-empty title and description rather than exact values.",
    "",
    failed === 0
      ? "All checks passed."
      : `${failed} route(s) failed. See the table above for details.`,
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
      pass: r.pass,
    }))
  );

  expect(failed, `${failed} route(s) failed metadata checks`).toBe(0);
});
