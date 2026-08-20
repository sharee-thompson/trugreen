import { test, type APIRequestContext } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import path from "node:path";

test.setTimeout(600000);

const QA_BASE_URL = (process.env.QA_BASE_URL || "https://qa-trugreen.com").replace(
  /\/$/,
  ""
);
const PROD_BASE_URL = (
  process.env.PROD_BASE_URL || "https://www.trugreen.com"
).replace(/\/$/, "");

const HOMEPAGE_TITLE = "TruGreen | America’s #1 Name in Lawn Care";
const HOMEPAGE_DESCRIPTION =
  "Get a pro-worthy lawn with expert, local lawn care services from TruGreen, and spend your extra time doing what you love.";

type Route = {
  route: string;
  note?: string;
};

const ROUTES: Route[] = [
  { route: "/about/california-privacy-policy", note: "da9c8af" },
  { route: "/about/privacy-policy", note: "2bc56835" },
  { route: "/about/sms-terms", note: "pre-existing" },
  { route: "/about/terms", note: "da9c8af" },
  { route: "/aftercare", note: "pre-existing" },
  { route: "/appointment-scheduler", note: "efa52654e" },
  { route: "/customer-support", note: "2bc56835" },
  { route: "/lawn-care-101", note: "pre-existing" },
  { route: "/lawn-care-101/blog", note: "pre-existing" },
  { route: "/lawn-care-101/faqs", note: "pre-existing" },
  { route: "/lawn-care-101/learning-center", note: "da9c8af" },
  { route: "/lawn-care-101/learning-center/grasses/brown-patch", note: "pre-existing" },
  { route: "/lawn-care-101/learning-center/search", note: "efa52654e" },
  { route: "/local-lawn-care", note: "pre-existing" },
  { route: "/local-lawn-care/alabama", note: "pre-existing" },
  { route: "/myservicesummary", note: "efa52654e" },
  { route: "/my-account/globalError", note: "efa52654e" },
  { route: "/my-account/reset-password", note: "efa52654e" },
  { route: "/newsroom", note: "da9c8af" },
  { route: "/newsroom/executive-staff", note: "da9c8af" },
  { route: "/newsroom/executive-staff/kurt-kane", note: "pre-existing" },
  { route: "/pay-your-bill", note: "efa52654e" },
  { route: "/pests-products-and-services", note: "pre-existing" },
  { route: "/products-and-services", note: "pre-existing" },
  { route: "/products-and-services/trupro", note: "pre-existing" },
  { route: "/searchResult", note: "efa52654e" },
  { route: "/service-terms-and-conditions", note: "pre-existing" },
  { route: "/why-choose-trugreen/testimonials-and-ratings", note: "efa52654e" },
];

type HeadResult = {
  title: string;
  description: string;
  canonical: string;
  canonicalPath: string;
  titleInBody: boolean;
  descriptionInBody: boolean;
  canonicalInBody: boolean;
  error?: string;
};

type Comparison = {
  route: string;
  note?: string;
  qa: HeadResult;
  prod: HeadResult;
  titleChanged: boolean;
  descriptionChanged: boolean;
  canonicalChanged: boolean;
  qaPlacementOk: boolean;
  prodPlacementOk: boolean;
  status:
    | "qa-regression"
    | "qa-update"
    | "qa-fix"
    | "no-change"
    | "both-broken"
    | "fetch-error";
};

function extractHtmlParts(html: string) {
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head\s*>/i);
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body\s*>/i);
  return {
    head: headMatch?.[1] ?? "",
    body: bodyMatch?.[1] ?? "",
  };
}

function getTitle(html: string): string {
  return html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? "";
}

function getDescription(html: string): string {
  const match = html.match(
    /<meta\b[^>]*\bname=["']description["'][^>]*\bcontent=["']([^"']*)["'][^>]*>/i
  );
  return match?.[1]?.trim() ?? "";
}

function getCanonical(html: string): string {
  const match = html.match(
    /<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']*)["'][^>]*>/i
  );
  return match?.[1]?.trim() ?? "";
}

function canonicalPath(canonical: string, baseUrl: string): string {
  try {
    return new URL(canonical, baseUrl).pathname;
  } catch {
    return "";
  }
}

function escapeMd(s: string): string {
  return s.replace(/\|/g, "\\|");
}

async function fetchSite(
  request: APIRequestContext,
  baseUrl: string,
  route: string
): Promise<HeadResult> {
  const url = `${baseUrl}${route}`;
  let html = "";
  let error: string | undefined;

  try {
    const res = await request.get(url, {
      timeout: 60000,
      failOnStatusCode: false,
    });
    if (!res.ok()) {
      error = `HTTP ${res.status()} ${res.statusText()}`;
    } else {
      html = await res.text();
    }
  } catch (err: any) {
    error = err?.message || String(err);
  }

  if (error) {
    return {
      title: "",
      description: "",
      canonical: "",
      canonicalPath: "",
      titleInBody: false,
      descriptionInBody: false,
      canonicalInBody: false,
      error,
    };
  }

  const { head, body } = extractHtmlParts(html);

  const headTitle = getTitle(head);
  const bodyTitle = getTitle(body);
  const headDescription = getDescription(head);
  const bodyDescription = getDescription(body);
  const headCanonical = getCanonical(head);
  const bodyCanonical = getCanonical(body);

  return {
    title: headTitle,
    description: headDescription,
    canonical: headCanonical,
    canonicalPath: canonicalPath(headCanonical, baseUrl),
    titleInBody: !!bodyTitle,
    descriptionInBody: !!bodyDescription,
    canonicalInBody: !!bodyCanonical,
  };
}

function placementOk(r: HeadResult): boolean {
  return !r.titleInBody && !r.descriptionInBody && !r.canonicalInBody;
}

function titleLooksGood(title: string): boolean {
  return !!title && title !== HOMEPAGE_TITLE;
}

function descriptionLooksGood(description: string): boolean {
  return !!description && description !== HOMEPAGE_DESCRIPTION;
}

function metadataGood(r: HeadResult, baseUrl: string): boolean {
  const canonical = r.canonicalPath || canonicalPath(r.canonical, baseUrl);
  return (
    placementOk(r) &&
    titleLooksGood(r.title) &&
    descriptionLooksGood(r.description) &&
    !!canonical
  );
}

function analyze(qa: HeadResult, prod: HeadResult, route: Route): Comparison {
  const titleChanged = qa.title !== prod.title;
  const descriptionChanged = qa.description !== prod.description;
  const canonicalChanged = qa.canonicalPath !== prod.canonicalPath;

  const qaGood = metadataGood(qa, QA_BASE_URL);
  const prodGood = metadataGood(prod, PROD_BASE_URL);

  let status: Comparison["status"];

  if (qa.error || prod.error) {
    status = "fetch-error";
  } else if (!qaGood && !prodGood) {
    status = "both-broken";
  } else if (!qaGood && prodGood) {
    status = "qa-regression";
  } else if (qaGood && !prodGood) {
    status = "qa-fix";
  } else if (titleChanged || descriptionChanged || canonicalChanged) {
    status = "qa-update";
  } else {
    status = "no-change";
  }

  return {
    route: route.route,
    note: route.note,
    qa,
    prod,
    titleChanged,
    descriptionChanged,
    canonicalChanged,
    qaPlacementOk: placementOk(qa),
    prodPlacementOk: placementOk(prod),
    status,
  };
}

test("compare QA and Production metadata for branch-affected routes", async ({
  request,
}) => {
  const comparisons: Comparison[] = [];

  for (const route of ROUTES) {
    const [qa, prod] = await Promise.all([
      fetchSite(request, QA_BASE_URL, route.route),
      fetchSite(request, PROD_BASE_URL, route.route),
    ]);
    comparisons.push(analyze(qa, prod, route));
  }

  const byStatus = (s: Comparison["status"]) =>
    comparisons.filter((c) => c.status === s);

  const report = [
    "# QA vs Production Metadata Comparison",
    "",
    `**Date:** ${new Date().toISOString().split("T")[0]}`,
    `**QA:** ${QA_BASE_URL}`,
    `**Production:** ${PROD_BASE_URL}`,
    "",
    "## Summary",
    "",
    `- **Total routes:** ${comparisons.length}`,
    `- **QA has a working metadata update (Prod is stale/broken):** ${
      byStatus("qa-update").length
    }`,
    `- **QA is broken but Prod is fine (regression):** ${
      byStatus("qa-regression").length
    }`,
    `- **Both QA and Prod are broken:** ${byStatus("both-broken").length}`,
    `- **QA fixes a broken Prod:** ${byStatus("qa-fix").length}`,
    `- **No change between environments:** ${byStatus("no-change").length}`,
    `- **Fetch error on one or both:** ${byStatus("fetch-error").length}`,
    "",
    "## Quick verdict",
    "",
    "Routes where the branch is doing more **good** than harm are marked `qa-update`",
    "(new, correct metadata in QA head that differs from/ is missing in Prod) or",
    "`qa-fix` (QA is correctly in `<head>` while Prod is in `<body>`).",
    "",
    "Routes where the branch is doing **harm** are marked `qa-regression`:",
    "QA has title / description / canonical in `<body>` while Prod has them in `<head>`.",
    "",
    "## Results",
    "",
    "| Route | QA title | Prod title | QA desc | Prod desc | QA canon | Prod canon | QA body tags? | Prod body tags? | Status |",
    "|---|---|---|---|---|---|---|---|---|---|",
    ...comparisons.map((c) =>
      [
        `| ${c.route} |`,
        ` ${escapeMd(c.qa.title)} |`,
        ` ${escapeMd(c.prod.title)} |`,
        ` ${escapeMd(
          c.qa.description.slice(0, 60) +
          (c.qa.description.length > 60 ? "..." : "")
        )} |`,
        ` ${escapeMd(
          c.prod.description.slice(0, 60) +
          (c.prod.description.length > 60 ? "..." : "")
        )} |`,
        ` ${c.qa.canonicalPath} |`,
        ` ${c.prod.canonicalPath} |`,
        ` ${!c.qaPlacementOk ? "yes" : "no"} |`,
        ` ${!c.prodPlacementOk ? "yes" : "no"} |`,
        ` ${c.status} |`,
      ].join("")
    ),
    "",
    "## Detail by status",
    "",
    ...[
      ["qa-update", "Working QA metadata updates"],
      ["qa-regression", "QA metadata in <body> (regression)"],
      ["both-broken", "Both in <body>"],
      ["qa-fix", "QA fixed a broken Prod"],
      ["no-change", "No change"],
      ["fetch-error", "Fetch errors"],
    ].flatMap(([status, header]) => {
      const items = byStatus(status as Comparison["status"]);
      if (items.length === 0) return [];
      return [
        `### ${header} (${items.length})`,
        "",
        ...items.map((c) => `- **${c.route}** (commit ${c.note})`),
        "",
      ];
    }),
    "## Notes",
    "",
    "- Title, description, and canonical are read from the first occurrence in the HTML.",
    "- `QA body tags?` and `Prod body tags?` indicate whether any of these tags were found inside the `<body>` element rather than `<head>`.",
    "- Canonical is compared as a path only.",
    "",
  ].join("\n");

  const reportPath = path.resolve(
    process.cwd(),
    "qa-vs-prod-metadata-report.md"
  );
  await writeFile(reportPath, report, "utf8");

  console.table(
    comparisons.map((c) => ({
      route: c.route,
      qaTitle: c.qa.title,
      prodTitle: c.prod.title,
      qaBody: !c.qaPlacementOk,
      prodBody: !c.prodPlacementOk,
      status: c.status,
    }))
  );

  console.log(`\nReport written to: ${reportPath}`);
});
