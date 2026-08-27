import { expect, test, type APIRequestContext } from "@playwright/test";
import { getBaseUrl } from "../../../utils/config";

type RouteCheck = {
  route: string;
  expectedPath: string;
  titleExact?: string;
  titleContainsAny?: string[];
  indexable?: boolean;
};

type HeadData = {
  title: string;
  description: string;
  canonical: string;
  canonicalCount: number;
  canonicalInHeadCount: number;
  robots: string;
  titleInHead: boolean;
  descriptionInHead: boolean;
  canonicalInHead: boolean;
  robotsInHead: boolean;
};

type RouteResult = {
  route: string;
  url: string;
  status: number;
  title: string;
  description: string;
  canonical: string;
  canonicalPath: string;
  canonicalCount: number;
  canonicalInHeadCount: number;
  robots: string;
  expectedTitle: string;
  expectedPath: string;
  indexable: boolean;
  titleValuePass: boolean;
  descriptionValuePass: boolean;
  canonicalValuePass: boolean;
  canonicalCountPass: boolean;
  robotsPass: boolean;
  titlePass: boolean;
  descriptionPass: boolean;
  canonicalPass: boolean;
  titleInHead: boolean;
  descriptionInHead: boolean;
  canonicalInHead: boolean;
  robotsInHead: boolean;
  pass: boolean;
};

type FailureDetail = {
  parameter: string;
  expected: string;
  actual: string;
};

const rootTitle = "TruGreen | America’s #1 Name in Lawn Care";
const rootDescription =
  "Get a pro-worthy lawn with expert, local lawn care services from TruGreen, and spend your extra time doing what you love.";

const htmlEntityMap: Record<string, string> = {
  amp: "&",
  apos: "'",
  quot: '"',
  lt: "<",
  gt: ">",
  nbsp: " ",
};

const routeChecks: RouteCheck[] = [
  {
    route: "/",
    expectedPath: "/",
    titleExact: "TruGreen | America’s #1 Name in Lawn Care",
    indexable: true,
  },
  {
    route: "/pay-your-bill",
    expectedPath: "/pay-your-bill",
    titleExact: "Pay Your Bill | TruGreen",
    indexable: true,
  },
  {
    route: "/searchResult",
    expectedPath: "/searchResult",
    titleExact: "Search Results | TruGreen",
    indexable: true,
  },
  {
    route: "/myservicesummary",
    expectedPath: "/myservicesummary",
    titleExact: "My Service Summary | TruGreen",
    indexable: true,
  },
  {
    route: "/appointment-scheduler",
    expectedPath: "/appointment-scheduler",
    titleExact: "Schedule an Appointment | TruGreen",
    indexable: true,
  },
  {
    route: "/my-account/reset-password",
    expectedPath: "/my-account/reset-password",
    titleExact: "Reset Password | TruGreen",
    indexable: true,
  },
  {
    route: "/my-account/globalError",
    expectedPath: "/my-account/globalError",
    titleExact: "Error | TruGreen",
    indexable: true,
  },
  {
    route: "/lawn-care-101/learning-center/search",
    expectedPath: "/lawn-care-101/learning-center/search",
    titleExact: "Search | TruGreen Learning Center",
    indexable: true,
  },
  {
    route: "/aftercare",
    expectedPath: "/aftercare",
    titleExact: "AfterCare Page | TruGreen",
    indexable: true,
  },
  {
    route: "/why-choose-trugreen/testimonials-and-ratings",
    expectedPath: "/why-choose-trugreen/testimonials-and-ratings",
    titleExact: "TruGreen Testimonials & Reviews | TruGreen",
    indexable: true,
  },
  {
    route: "/home-a",
    expectedPath: "/",
    titleExact: "TruGreen | America’s #1 Name in Lawn Care",
    indexable: true,
  },
  {
    route: "/home-b",
    expectedPath: "/",
    titleExact: "TruGreen | America’s #1 Name in Lawn Care",
    indexable: true,
  },
  {
    route: "/home-c",
    expectedPath: "/",
    titleExact: "TruGreen | America’s #1 Name in Lawn Care",
    indexable: true,
  },
  {
    route: "/about/privacy-policy",
    expectedPath: "/about/privacy-policy",
    titleExact: "TruGreen Privacy Policy | TruGreen",
    indexable: true,
  },
  {
    route: "/customer-support",
    expectedPath: "/customer-support",
    titleExact: "Customer support | TruGreen",
    indexable: true,
  },
  {
    route: "/ppc/landing-page",
    expectedPath: "/ppc/landing-page",
    titleExact: "PPC Landing Page - Low Intent",
    indexable: true,
  },
  {
    route: "/nb/ppc/landing-page",
    expectedPath: "/nb/ppc/landing-page",
    titleExact: "PPC Landing Page - Mid Intent",
    indexable: true,
  },
  {
    route: "/b/ppc/landing-page",
    expectedPath: "/b/ppc/landing-page",
    titleExact: "PPC Landing Page - High Intent",
    indexable: true,
  },
  {
    route: "/about/california-privacy-policy",
    expectedPath: "/about/california-privacy-policy",
    titleExact: "TruGreen California Privacy Notice | TruGreen",
    indexable: true,
  },
  {
    route: "/about/terms",
    expectedPath: "/about/terms",
    titleExact: "TruGreen Terms & Conditions | TruGreen",
    indexable: true,
  },
  {
    route: "/lawn-care-101/learning-center",
    expectedPath: "/lawn-care-101/learning-center",
    titleExact: "Guide to Garden Weeds, Pests, & Diseases | TruGreen",
    indexable: true,
  },
  {
    route: "/newsroom",
    expectedPath: "/newsroom",
    titleExact: "Lawn Care Newsroom| TruGreen",
    indexable: true,
  },
  {
    route: "/newsroom/executive-staff",
    expectedPath: "/newsroom/executive-staff",
    titleExact: "TruGreen Executive Team | TruGreen",
    indexable: true,
  },
];

function parseHead(html: string): HeadData {
  const headMatch = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  const headHtml = headMatch?.[1] || "";
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const descriptionTag = getFirstTagByAttribute(
    html,
    "meta",
    "name",
    "description",
  );
  const canonicalTags = getTagsByAttribute(html, "link", "rel", "canonical");
  const canonicalInHeadTags = getTagsByAttribute(
    headHtml,
    "link",
    "rel",
    "canonical",
  );
  const robotsTag = getFirstTagByAttribute(html, "meta", "name", "robots");
  const robotsInHeadTag = getFirstTagByAttribute(
    headHtml,
    "meta",
    "name",
    "robots",
  );
  const titleInHeadMatch = headHtml.match(/<title>([^<]*)<\/title>/i);
  const descriptionInHeadTag = getFirstTagByAttribute(
    headHtml,
    "meta",
    "name",
    "description",
  );

  return {
    title: decodeHtmlEntities(titleMatch?.[1]?.trim() || ""),
    description: decodeHtmlEntities(
      getTagAttribute(descriptionTag, "content")?.trim() || "",
    ),
    canonical: decodeHtmlEntities(
      getTagAttribute(canonicalTags[0], "href")?.trim() || "",
    ),
    canonicalCount: canonicalTags.length,
    canonicalInHeadCount: canonicalInHeadTags.length,
    robots: decodeHtmlEntities(getTagAttribute(robotsTag, "content") || ""),
    titleInHead: !!titleInHeadMatch,
    descriptionInHead: !!descriptionInHeadTag,
    canonicalInHead: canonicalInHeadTags.length > 0,
    robotsInHead: !!robotsInHeadTag,
  };
}

function getTagsByAttribute(
  html: string,
  tagName: "link" | "meta",
  attributeName: string,
  attributeValue: string,
): string[] {
  const tagRegex = new RegExp(`<${tagName}\\b[^>]*>`, "gi");
  return [...html.matchAll(tagRegex)]
    .map((match) => match[0])
    .filter(
      (tag) =>
        getTagAttribute(tag, attributeName)?.toLowerCase() === attributeValue,
    );
}

function getFirstTagByAttribute(
  html: string,
  tagName: "link" | "meta",
  attributeName: string,
  attributeValue: string,
): string | undefined {
  return getTagsByAttribute(html, tagName, attributeName, attributeValue)[0];
}

function getTagAttribute(tag: string | undefined, attributeName: string) {
  return tag?.match(
    new RegExp(`\\b${attributeName}=["']([^"']*)["']`, "i"),
  )?.[1];
}

function decodeHtmlEntities(value: string): string {
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity) => {
    const normalized = String(entity).toLowerCase();

    if (normalized.startsWith("#x")) {
      const codePoint = Number.parseInt(normalized.slice(2), 16);
      return Number.isNaN(codePoint) ? match : String.fromCodePoint(codePoint);
    }

    if (normalized.startsWith("#")) {
      const codePoint = Number.parseInt(normalized.slice(1), 10);
      return Number.isNaN(codePoint) ? match : String.fromCodePoint(codePoint);
    }

    return htmlEntityMap[normalized] ?? match;
  });
}

function getCanonicalPath(canonical: string): string {
  try {
    return new URL(canonical).pathname;
  } catch {
    return canonical.startsWith("/") ? canonical : "";
  }
}

function getExpectedTitle(check: RouteCheck): string {
  if (check.titleExact) {
    return check.titleExact;
  }

  return `contains any of: ${check.titleContainsAny?.join(", ") || "N/A"}`;
}

function titleMatches(check: RouteCheck, actualTitle: string): boolean {
  if (check.titleExact) {
    return actualTitle === check.titleExact;
  }

  return (
    !!check.titleContainsAny &&
    check.titleContainsAny.some((value) => actualTitle.includes(value))
  );
}

function hasNonIndexableRobots(robots: string): boolean {
  return robots
    .toLowerCase()
    .split(",")
    .map((directive) => directive.trim())
    .some((directive) => ["noindex", "nofollow", "none"].includes(directive));
}

async function checkRoute(
  request: APIRequestContext,
  check: RouteCheck,
): Promise<RouteResult> {
  const url = getBaseUrl(check.route, { automation: false });
  const response = await request.get(url, { timeout: 60000 });
  const html = await response.text();
  const head = parseHead(html);
  const canonicalPath = getCanonicalPath(head.canonical);
  const allowsRootFallback = check.expectedPath === "/";
  const titleValuePass = titleMatches(check, head.title);
  const descriptionValuePass =
    head.description.length > 0 &&
    (allowsRootFallback || head.description !== rootDescription);
  const canonicalValuePass = canonicalPath === check.expectedPath;
  const canonicalCountPass =
    head.canonicalCount === 1 && head.canonicalInHeadCount === 1;
  const indexable = check.indexable === true;
  const robotsPass = !indexable || !hasNonIndexableRobots(head.robots);
  const titlePass = head.titleInHead && titleValuePass;
  const descriptionPass = head.descriptionInHead && descriptionValuePass;
  const canonicalPass =
    head.canonicalInHead && canonicalValuePass && canonicalCountPass;

  return {
    route: check.route,
    url,
    status: response.status(),
    title: head.title,
    description: head.description,
    canonical: head.canonical,
    canonicalPath,
    canonicalCount: head.canonicalCount,
    canonicalInHeadCount: head.canonicalInHeadCount,
    robots: head.robots,
    expectedTitle: getExpectedTitle(check),
    expectedPath: check.expectedPath,
    indexable,
    titleValuePass,
    descriptionValuePass,
    canonicalValuePass,
    canonicalCountPass,
    robotsPass,
    titlePass,
    descriptionPass,
    canonicalPass,
    titleInHead: head.titleInHead,
    descriptionInHead: head.descriptionInHead,
    canonicalInHead: head.canonicalInHead,
    robotsInHead: head.robotsInHead,
    pass:
      response.ok() &&
      titlePass &&
      descriptionPass &&
      canonicalPass &&
      robotsPass,
  };
}

function buildRouteReport(result: RouteResult): string {
  return [
    "# Broader Head Metadata Result",
    "",
    `Base URL: ${getBaseUrl({ automation: false })}`,
    `Generated: ${new Date().toISOString()}`,
    "",
    `Route: ${result.route}`,
    `URL: ${result.url}`,
    `Status: ${result.status}`,
    `Expected Title: ${result.expectedTitle}`,
    `Actual Title: ${result.title || "MISSING"}`,
    `Expected Canonical Path: ${result.expectedPath}`,
    `Actual Canonical: ${result.canonical || "MISSING"}`,
    `Actual Canonical Path: ${result.canonicalPath || "MISSING"}`,
    `Canonical Count: ${result.canonicalCount}`,
    `Canonical Count In Head: ${result.canonicalInHeadCount}`,
    `Actual Description: ${result.description || "MISSING"}`,
    `Robots: ${result.robots || "ABSENT"}`,
    `Robots In Head: ${result.robotsInHead}`,
    `Indexable Route: ${result.indexable}`,
    `Title In Head: ${result.titleInHead}`,
    `Title Value Pass: ${result.titleValuePass}`,
    `Description In Head: ${result.descriptionInHead}`,
    `Description Value Pass: ${result.descriptionValuePass}`,
    `Canonical In Head: ${result.canonicalInHead}`,
    `Canonical Value Pass: ${result.canonicalValuePass}`,
    `Canonical Count Pass: ${result.canonicalCountPass}`,
    `Robots Pass: ${result.robotsPass}`,
    `Overall Pass: ${result.pass}`,
    ...buildFailureSummary(result),
  ].join("\n");
}

function buildFailureSummary(result: RouteResult): string[] {
  if (result.pass) {
    return [];
  }

  return [
    "",
    "## Failure Summary",
    "",
    `URL: ${result.url}`,
    ...getFailureDetails(result).flatMap(formatFailureDetail),
  ];
}

function formatFailureDetail(failure: FailureDetail): string[] {
  switch (failure.parameter) {
    case "titleInHead":
      return ["Title not found in `<head>`"];
    case "descriptionInHead":
      return ["Description not found in `<head>`"];
    case "canonicalInHead":
      return ["Canonical not found in `<head>`"];
    case "title":
      return [
        "Title:",
        `- Expected: ${failure.expected}`,
        `- Actual: ${failure.actual}`,
      ];
    case "description":
      return [
        "Description:",
        `- Expected: ${failure.expected}`,
        `- Actual: ${failure.actual}`,
      ];
    case "canonicalPath":
      return [
        "Canonical Path:",
        `- Expected: ${failure.expected}`,
        `- Actual: ${failure.actual}`,
      ];
    case "canonicalCount":
      return [
        "Canonical Count:",
        `- Expected: ${failure.expected}`,
        `- Actual: ${failure.actual}`,
      ];
    case "robots":
      return [
        "Robots:",
        `- Expected: ${failure.expected}`,
        `- Actual: ${failure.actual}`,
      ];
    default:
      return [
        `${failure.parameter}:`,
        `- Expected: ${failure.expected}`,
        `- Actual: ${failure.actual}`,
      ];
  }
}

function getFailureDetails(result: RouteResult): FailureDetail[] {
  const failures: FailureDetail[] = [];

  if (result.status < 200 || result.status >= 300) {
    failures.push({
      parameter: "status",
      expected: "2xx",
      actual: String(result.status),
    });
  }

  if (!result.titleInHead) {
    failures.push({
      parameter: "titleInHead",
      expected: "true",
      actual: String(result.titleInHead),
    });
  }

  if (!result.titleValuePass) {
    failures.push({
      parameter: "title",
      expected: result.expectedTitle,
      actual: result.title || "MISSING",
    });
  }

  if (!result.descriptionInHead) {
    failures.push({
      parameter: "descriptionInHead",
      expected: "true",
      actual: String(result.descriptionInHead),
    });
  }

  if (!result.descriptionValuePass) {
    failures.push({
      parameter: "description",
      expected: "present and not root fallback",
      actual: result.description || "MISSING",
    });
  }

  if (!result.canonicalInHead) {
    failures.push({
      parameter: "canonicalInHead",
      expected: "true",
      actual: String(result.canonicalInHead),
    });
  }

  if (!result.canonicalValuePass) {
    failures.push({
      parameter: "canonicalPath",
      expected: result.expectedPath,
      actual: result.canonicalPath || "MISSING",
    });
  }

  if (!result.canonicalCountPass) {
    failures.push({
      parameter: "canonicalCount",
      expected: "exactly 1 canonical in <head> and exactly 1 canonical total",
      actual: `${result.canonicalInHeadCount} in <head>, ${result.canonicalCount} total`,
    });
  }

  if (!result.robotsPass) {
    failures.push({
      parameter: "robots",
      expected: "absent or indexable robots directives",
      actual: result.robots || "ABSENT",
    });
  }

  return failures;
}

test.describe(
  "Broader head metadata regression",
  {
    tag: ["@seo", "@regression", "@metadata", "@functional"],
  },
  () => {
    for (const routeCheck of routeChecks) {
      test(`metadata for ${routeCheck.route}`, async ({
        request,
      }, testInfo) => {
        const result = await checkRoute(request, routeCheck);

        if (!result.pass) {
          console.log(buildFailureSummary(result).join("\n"));
        }

        await testInfo.attach("head-metadata-broader-report", {
          body: Buffer.from(buildRouteReport(result), "utf8"),
          contentType: "text/markdown",
        });

        expect(
          result.pass,
          [
            `route=${result.route}`,
            `url=${result.url}`,
            `status=${result.status}`,
            `expectedTitle=${result.expectedTitle}`,
            `actualTitle=${result.title || "MISSING"}`,
            `expectedDescription=present and not root fallback`,
            `actualDescription=${result.description || "MISSING"}`,
            `expectedCanonicalPath=${result.expectedPath}`,
            `actualCanonical=${result.canonical || "MISSING"}`,
            `actualCanonicalPath=${result.canonicalPath || "MISSING"}`,
            `canonicalCount=${result.canonicalCount}`,
            `canonicalInHeadCount=${result.canonicalInHeadCount}`,
            `robots=${result.robots || "ABSENT"}`,
            `indexable=${result.indexable}`,
            `titleInHead=${result.titleInHead}`,
            `titleValuePass=${result.titleValuePass}`,
            `descriptionInHead=${result.descriptionInHead}`,
            `descriptionValuePass=${result.descriptionValuePass}`,
            `canonicalInHead=${result.canonicalInHead}`,
            `canonicalValuePass=${result.canonicalValuePass}`,
            `canonicalCountPass=${result.canonicalCountPass}`,
            `robotsPass=${result.robotsPass}`,
            `titlePass=${result.titlePass}`,
            `descriptionPass=${result.descriptionPass}`,
            `canonicalPass=${result.canonicalPass}`,
          ].join(" | "),
        ).toBe(true);
      });
    }
  },
);
