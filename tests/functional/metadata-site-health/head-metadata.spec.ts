import { expect, test, type APIRequestContext } from "@playwright/test";
import { getBaseUrl } from "../../../utils/config";

type RouteCheck = {
  route: string;
  expectedPath: string;
  titleContains?: string;
  descriptionContains?: string;
  requireTitle?: boolean;
  requireDescription?: boolean;
};

type HeadData = {
  title: string;
  description: string;
  canonical: string;
};

type RouteResult = {
  route: string;
  status: number;
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

const strictMetadataAssertions = process.env.HEAD_METADATA_STRICT === "1";

const routeChecks: RouteCheck[] = [
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

function parseHead(html: string): HeadData {
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const descriptionMatch = html.match(
    /<meta\b[^>]*\bname=["']description["'][^>]*\bcontent=["']([^"']*)["'][^>]*>/i,
  );
  const canonicalMatch = html.match(
    /<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']*)["'][^>]*>/i,
  );

  return {
    title: titleMatch?.[1]?.trim() || "",
    description: descriptionMatch?.[1]?.trim() || "",
    canonical: canonicalMatch?.[1]?.trim() || "",
  };
}

function getCanonicalPath(canonical: string): string {
  try {
    return new URL(canonical).pathname;
  } catch {
    return "";
  }
}

async function checkRoute(
  request: APIRequestContext,
  check: RouteCheck,
): Promise<RouteResult> {
  const response = await request.get(getBaseUrl(check.route), {
    timeout: 60000,
  });
  const html = await response.text();
  const head = parseHead(html);
  const canonicalPath = getCanonicalPath(head.canonical);
  const pathPass = strictMetadataAssertions
    ? canonicalPath === check.expectedPath
    : canonicalPath.length > 0;
  const titlePass = strictMetadataAssertions
    ? check.titleContains
      ? head.title.includes(check.titleContains)
      : check.requireTitle
        ? head.title.length > 0
        : true
    : head.title.length > 0;
  const descriptionPass = strictMetadataAssertions
    ? check.descriptionContains
      ? head.description.includes(check.descriptionContains)
      : check.requireDescription
        ? head.description.length > 0
        : true
    : head.description.length > 0;

  return {
    route: check.route,
    status: response.status(),
    title: head.title,
    description: head.description,
    canonical: head.canonical,
    canonicalPath,
    expectedPath: check.expectedPath,
    pathPass,
    titlePass,
    descriptionPass,
    pass: response.ok() && pathPass && titlePass && descriptionPass,
  };
}

function buildReport(results: RouteResult[]): string {
  const passed = results.filter((result) => result.pass).length;
  const failed = results.length - passed;

  return [
    "# Head Metadata Regression",
    "",
    `Base URL: ${getBaseUrl()}`,
    `Generated: ${new Date().toISOString()}`,
    `Mode: ${strictMetadataAssertions ? "strict" : "presence"}`,
    "",
    `Passed: ${passed}`,
    `Failed: ${failed}`,
    "",
    "| Route | Status | Expected Path | Canonical Path | Pass |",
    "| --- | --- | --- | --- | --- |",
    ...results.map(
      (result) =>
        `| ${result.route} | ${result.status} | ${result.expectedPath} | ${result.canonicalPath || "MISSING"} | ${result.pass ? "PASS" : "FAIL"} |`,
    ),
  ].join("\n");
}

test.describe(
  "Head metadata regression",
  {
    tag: ["@functional", "@seo", "@regression"],
  },
  () => {
    test("critical routes return expected title, description, and canonical tags", async ({
      request,
    }, testInfo) => {
      test.skip(
        testInfo.project.name !== "chromium",
        "Metadata regression only needs to run once in Chromium.",
      );

      const results: RouteResult[] = [];

      for (const routeCheck of routeChecks) {
        results.push(await checkRoute(request, routeCheck));
      }

      const report = buildReport(results);

      await testInfo.attach("head-metadata-report", {
        body: Buffer.from(report, "utf8"),
        contentType: "text/markdown",
      });

      const failures = results.filter((result) => !result.pass);
      expect(
        failures,
        failures
          .map(
            (result) =>
              `${result.route}: canonical=${result.canonicalPath || "MISSING"}, titlePass=${result.titlePass}, descriptionPass=${result.descriptionPass}`,
          )
          .join("\n"),
      ).toEqual([]);
    });
  },
);
