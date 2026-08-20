import { test, type APIRequestContext } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import path from "node:path";

test.setTimeout(600000);

const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(
  /\/$/,
  ""
);

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

type LocalResult = {
  route: string;
  note?: string;
  local: HeadResult;
  placementOk: boolean;
  metadataGood: boolean;
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

async function fetchLocal(
  request: APIRequestContext,
  route: string
): Promise<HeadResult> {
  const url = `${BASE_URL}${route}`;
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
    canonicalPath: canonicalPath(headCanonical, BASE_URL),
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

function metadataGood(r: HeadResult, expectedPath: string): boolean {
  const canonical = r.canonicalPath || canonicalPath(r.canonical, BASE_URL);
  return (
    placementOk(r) &&
    titleLooksGood(r.title) &&
    descriptionLooksGood(r.description) &&
    !!canonical &&
    canonical === expectedPath
  );
}

test("check local metadata placement for branch-affected routes", async ({
  request,
}) => {
  const results: LocalResult[] = [];

  for (const route of ROUTES) {
    const local = await fetchLocal(request, route.route);
    results.push({
      route: route.route,
      note: route.note,
      local,
      placementOk: placementOk(local),
      metadataGood: metadataGood(local, route.route),
    });
  }

  const broken = results.filter((r) => !r.metadataGood);

  const report = [
    "# Local Metadata Check",
    "",
    `**Base URL:** ${BASE_URL}`,
    `**Date:** ${new Date().toISOString().split("T")[0]}`,
    "",
    "## Summary",
    "",
    `- **Total routes:** ${results.length}`,
    `- **Metadata good (head + title + description + canonical):** ${
      results.filter((r) => r.metadataGood).length
    }`,
    `- **Placement in <head> OK:** ${
      results.filter((r) => r.placementOk).length
    }`,
    `- **Broken:** ${broken.length}`,
    "",
    "## Results",
    "",
    "| Route | Title | Description | Canonical | Title in body? | Desc in body? | Canon in body? | Good? |",
    "|---|---|---|---|---|---|---|---|---|",
    ...results.map((r) =>
      [
        `| ${r.route} |`,
        ` ${escapeMd(r.local.title)} |`,
        ` ${escapeMd(
          r.local.description.slice(0, 60) +
            (r.local.description.length > 60 ? "..." : "")
        )} |`,
        ` ${r.local.canonicalPath} |`,
        ` ${r.local.titleInBody ? "yes" : "no"} |`,
        ` ${r.local.descriptionInBody ? "yes" : "no"} |`,
        ` ${r.local.canonicalInBody ? "yes" : "no"} |`,
        ` ${r.metadataGood ? "yes" : "no"} |`,
      ].join("")
    ),
    "",
    "## Broken routes",
    "",
    ...(broken.length > 0
      ? broken.map((r) => `- **${r.route}** (commit ${r.note})`)
      : ["None"]),
    "",
    "## Notes",
    "",
    "- Title, description, and canonical are read from the first occurrence in the HTML.",
    "- `Title in body?`, `Desc in body?`, and `Canon in body?` indicate whether any of these tags were found inside the `<body>` element rather than `<head>`.",
    "- `Good?` is true only when metadata is in `<head>`, title/description are not homepage defaults, and the canonical matches the route path exactly.",
    "",
  ].join("\n");

  const reportPath = path.resolve(process.cwd(), "local-metadata-report.md");
  await writeFile(reportPath, report, "utf8");

  console.table(
    results.map((r) => ({
      route: r.route,
      title: r.local.title,
      placementOk: r.placementOk,
      metadataGood: r.metadataGood,
    }))
  );

  console.log(`\nReport written to: ${reportPath}`);
});
