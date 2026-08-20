import { test, expect, type APIRequestContext } from "@playwright/test";

const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(
  /\/$/,
  ""
);

const HOMEPAGE_TITLE = "TruGreen | America's #1 Name in Lawn Care";
const HOMEPAGE_DESCRIPTION =
  "Get a pro-worthy lawn with expert, local lawn care services from TruGreen, and spend your extra time doing what you love.";

type RouteCheck = {
  route: string;
  expectedPath: string;
};

// All concrete, testable routes with async generateMetadata that return both
// alternates.canonical and openGraph.url (the Next.js 15 streaming-metadata
// trigger). Dynamic catch-all/slug routes are listed in the audit but need a
// real slug to be tested here.
const ROUTES: RouteCheck[] = [
  { route: "/about/privacy-policy", expectedPath: "/about/privacy-policy" },
  {
    route: "/about/california-privacy-policy",
    expectedPath: "/about/california-privacy-policy",
  },
  { route: "/about/sms-terms", expectedPath: "/about/sms-terms" },
  { route: "/about/terms", expectedPath: "/about/terms" },
  { route: "/aftercare", expectedPath: "/aftercare" },
  { route: "/customer-support", expectedPath: "/customer-support" },
  { route: "/lawn-care-101/blog", expectedPath: "/lawn-care-101/blog" },
  { route: "/lawn-care-101/faqs", expectedPath: "/lawn-care-101/faqs" },
  { route: "/lawn-care-101", expectedPath: "/lawn-care-101" },
  {
    route: "/lawn-care-101/learning-center",
    expectedPath: "/lawn-care-101/learning-center",
  },
  {
    route: "/lawn-care-101/learning-center/grasses/brown-patch",
    expectedPath: "/lawn-care-101/learning-center/grasses/brown-patch",
  },
  { route: "/local-lawn-care", expectedPath: "/local-lawn-care" },
  { route: "/newsroom", expectedPath: "/newsroom" },
  {
    route: "/newsroom/executive-staff",
    expectedPath: "/newsroom/executive-staff",
  },
  {
    route: "/pests-products-and-services",
    expectedPath: "/pests-products-and-services",
  },
  { route: "/products-and-services", expectedPath: "/products-and-services" },
  {
    route: "/service-terms-and-conditions",
    expectedPath: "/service-terms-and-conditions",
  },
  {
    route: "/why-choose-trugreen/testimonials-and-ratings",
    expectedPath: "/why-choose-trugreen/testimonials-and-ratings",
  },
];

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

async function checkRoute(
  request: APIRequestContext,
  check: RouteCheck
) {
  const res = await request.get(`${BASE_URL}${check.route}`, {
    timeout: 60000,
  });
  const html = await res.text();
  const { head, body } = extractHtmlParts(html);

  const headTitle = getTitle(head);
  const bodyTitle = getTitle(body);
  const headDescription = getDescription(head);
  const bodyDescription = getDescription(body);
  const headCanonical = getCanonical(head);
  const bodyCanonical = getCanonical(body);

  const failures: string[] = [];

  if (!headTitle) {
    failures.push("no <title> in <head>");
  } else if (headTitle === HOMEPAGE_TITLE) {
    failures.push("<head> <title> is the homepage default");
  }
  if (bodyTitle) {
    failures.push(`<title> found in <body>: "${bodyTitle}"`);
  }

  if (!headDescription) {
    failures.push('no <meta name="description"> in <head>');
  } else if (headDescription === HOMEPAGE_DESCRIPTION) {
    failures.push('<head> <meta name="description"> is the homepage default');
  }
  if (bodyDescription) {
    failures.push(
      `<meta name="description"> found in <body>: "${bodyDescription}"`
    );
  }

  if (!headCanonical) {
    failures.push('no <link rel="canonical"> in <head>');
  } else {
    const headCanonicalPath = (() => {
      try {
        return new URL(headCanonical, BASE_URL).pathname;
      } catch {
        return "";
      }
    })();
    if (headCanonicalPath !== check.expectedPath) {
      failures.push(
        `<head> canonical is "${headCanonicalPath}", expected "${check.expectedPath}"`
      );
    }
  }
  if (bodyCanonical) {
    failures.push(`<link rel="canonical"> found in <body>: "${bodyCanonical}"`);
  }

  return {
    ...check,
    headTitle,
    bodyTitle,
    headDescription,
    bodyDescription,
    headCanonical,
    bodyCanonical,
    failures,
  };
}

for (const check of ROUTES) {
  test(`metadata placement for ${check.route}`, async ({ request }) => {
    const result = await checkRoute(request, check);

    expect(result.failures, result.failures.join("; ")).toEqual([]);
  });
}
