import { expect, test } from "@playwright/test";
import { getBaseUrl } from "../../../utils/config";

type NetworkIssue = {
  url: string;
  status?: number;
  statusText?: string;
  failure?: string;
};

type RuntimeIssue = {
  category: string;
  detail: string;
  url?: string;
};

type RouteAuditResult = {
  route: string;
  status: number | null;
  navigationError: string | null;
  blockingIssues: RuntimeIssue[];
  observedIssues: RuntimeIssue[];
  ignoredIssueCount: number;
};

const trackingHosts = new Set([
  "googletagmanager.com",
  "google-analytics.com",
  "analytics.google.com",
  "mouseflow.com",
  "facebook.com",
  "connect.facebook.net",
  "bing.com",
  "bat.bing.com",
  "doubleclick.net",
  "googleads.g.doubleclick.net",
  "ad.doubleclick.net",
  "cm.g.doubleclick.net",
  "trkn.us",
  "ict.infinity-tracking.net",
  "infinity-tracking.net",
  "nas.lon.infinity-tracking.net",
  "optimizely.com",
  "cdn.optimizely.com",
  "logx.optimizely.com",
  "pinterest.com",
  "ct.pinterest.com",
  "qualtrics.com",
  "siteintercept.qualtrics.com",
  "wisepops.net",
  "micpn.com",
  "zoominfo.com",
  "ws.zoominfo.com",
  "airpr.com",
  "px.airpr.com",
  "aria.microsoft.com",
  "browser.pipe.aria.microsoft.com",
]);

const trackingTextKeywords = [
  "googletagmanager",
  "gtm-",
  "google-analytics",
  "analytics.js",
  "gtag/js",
  "mouseflow",
  "fbevents",
  "bat.bing",
  "googleads",
  "doubleclick",
  "trkn.us",
  "ict.infinity",
  "infinity-tracking",
  "infinitytrack",
  "optimizely",
  "qualtrics",
  "wisepops",
  "micpn",
  "zoominfo",
  "pinterest",
  "aria.microsoft",
  "airpr",
];

const auditedRoutes = [
  "/",
  "/home-a",
  "/home-b",
  "/home-c",
  "/local-lawn-care",
  "/lawn-care",
  "/why-choose-trugreen/testimonials-and-ratings",
  "/aftercare",
  "/lawn-care-101",
  "/lawn-care-101/learning-center",
  "/lawn-care-101/faqs",
  "/lawn-care-101/learning-center/grasses/brown-patch",
  "/about/terms",
  "/about/privacy-policy",
  "/about/sms-terms",
  "/about/california-privacy-policy",
  "/service-terms-and-conditions",
];

function isTrackingUrl(url: string): boolean {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    if (trackingHosts.has(hostname)) {
      return true;
    }

    for (const trackingHost of trackingHosts) {
      if (hostname.endsWith(`.${trackingHost}`)) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}

function isTrackingText(text: string): boolean {
  const normalized = text.toLowerCase();
  return trackingTextKeywords.some((keyword) => normalized.includes(keyword));
}

function formatNetworkIssue(issue: NetworkIssue): string {
  if (typeof issue.status === "number") {
    return (
      `${issue.status} ${issue.statusText || ""}`.trim() + `: ${issue.url}`
    );
  }

  return `${issue.failure || "request failed"}: ${issue.url}`;
}

function isFirstPartyUrl(url: string): boolean {
  try {
    return new URL(url).hostname === new URL(getBaseUrl()).hostname;
  } catch {
    return false;
  }
}

function isBrowserAbortedRequest(issue: NetworkIssue): boolean {
  return issue.failure === "net::ERR_ABORTED";
}

function makeNetworkIssue(category: string, issue: NetworkIssue): RuntimeIssue {
  return {
    category,
    detail: formatNetworkIssue(issue),
    url: issue.url,
  };
}

async function auditRoute(
  page: import("@playwright/test").Page,
  route: string,
): Promise<RouteAuditResult> {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const blockingNetworkIssues: NetworkIssue[] = [];
  const observedNetworkIssues: NetworkIssue[] = [];
  const ignoredNetworkIssues: NetworkIssue[] = [];

  const onConsole = (message: import("@playwright/test").ConsoleMessage) => {
    if (message.type() !== "error") {
      return;
    }

    const text = message.text();
    const matchedUrl = text.match(/https?:\/\/[^\s'"<>]+/)?.[0];
    if (isTrackingText(text) || (matchedUrl && isTrackingUrl(matchedUrl))) {
      return;
    }

    consoleErrors.push(text);
  };

  const onPageError = (error: Error) => {
    const text = String(error.stack || error.message || error);
    if (!isTrackingText(text)) {
      pageErrors.push(text);
    }
  };

  const onResponse = (response: import("@playwright/test").Response) => {
    if (response.status() < 400) {
      return;
    }

    const issue = {
      url: response.url(),
      status: response.status(),
      statusText: response.statusText(),
    };

    if (isTrackingUrl(issue.url)) {
      ignoredNetworkIssues.push(issue);
      return;
    }

    if (isFirstPartyUrl(issue.url)) {
      blockingNetworkIssues.push(issue);
      return;
    }

    observedNetworkIssues.push(issue);
  };

  const onRequestFailed = (request: import("@playwright/test").Request) => {
    const issue = {
      url: request.url(),
      failure: request.failure()?.errorText || "request failed",
    };

    if (isBrowserAbortedRequest(issue)) {
      return;
    }

    if (isTrackingUrl(issue.url)) {
      ignoredNetworkIssues.push(issue);
      return;
    }

    if (isFirstPartyUrl(issue.url)) {
      blockingNetworkIssues.push(issue);
      return;
    }

    observedNetworkIssues.push(issue);
  };

  page.on("console", onConsole);
  page.on("pageerror", onPageError);
  page.on("response", onResponse);
  page.on("requestfailed", onRequestFailed);

  let status: number | null = null;
  let navigationError: string | null = null;

  try {
    const response = await page.goto(getBaseUrl(route), {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForLoadState("load");
    await page.waitForTimeout(1000);
    status = response?.status() ?? null;
  } catch (error) {
    navigationError = error instanceof Error ? error.message : String(error);
  } finally {
    page.off("console", onConsole);
    page.off("pageerror", onPageError);
    page.off("response", onResponse);
    page.off("requestfailed", onRequestFailed);
  }

  const blockingIssues: RuntimeIssue[] = [
    ...(navigationError
      ? [{ category: "Navigation", detail: navigationError }]
      : []),
    ...(typeof status === "number" && status >= 400
      ? [{ category: "Document", detail: `HTTP ${status}` }]
      : []),
    ...blockingNetworkIssues.map((issue) =>
      makeNetworkIssue("First-party network", issue),
    ),
    ...pageErrors.map((error) => ({
      category: "Page error",
      detail: error,
    })),
  ];
  const observedIssues: RuntimeIssue[] = [
    ...observedNetworkIssues.map((issue) =>
      makeNetworkIssue("Third-party network", issue),
    ),
    ...consoleErrors.map((error) => ({
      category: "Console error",
      detail: error,
    })),
  ];

  return {
    route,
    status,
    navigationError,
    blockingIssues,
    observedIssues,
    ignoredIssueCount: ignoredNetworkIssues.length,
  };
}

function formatMarkdownCell(value: string): string {
  return value.replace(/\s+/g, " ").replace(/\|/g, "\\|").slice(0, 500);
}

function buildIssueRows(
  results: RouteAuditResult[],
  issueType: "blockingIssues" | "observedIssues",
): string[] {
  return results.flatMap((result) =>
    result[issueType].map(
      (issue) =>
        `| ${result.route} | ${issue.category} | ${formatMarkdownCell(issue.detail)} |`,
    ),
  );
}

function buildReport(results: RouteAuditResult[]): string {
  const blockingRows = buildIssueRows(results, "blockingIssues");
  const observedRows = buildIssueRows(results, "observedIssues");

  return [
    "# Runtime Site Health Regression",
    "",
    `Base URL: ${getBaseUrl()}`,
    `Generated: ${new Date().toISOString()}`,
    "",
    "| Route | Status | Blocking Issues | Observed Issues | Ignored Tracking Issues |",
    "| --- | --- | --- | --- | --- |",
    ...results.map(
      (result) =>
        `| ${result.route} | ${result.status ?? "NAV_FAIL"} | ${result.blockingIssues.length} | ${result.observedIssues.length} | ${result.ignoredIssueCount} |`,
    ),
    "",
    "## Blocking Issues",
    "",
    blockingRows.length > 0 ? "| Route | Category | Detail |" : "None",
    ...(blockingRows.length > 0
      ? ["| --- | --- | --- |", ...blockingRows]
      : []),
    "",
    "## Observed Issues",
    "",
    observedRows.length > 0 ? "| Route | Category | Detail |" : "None",
    ...(observedRows.length > 0
      ? ["| --- | --- | --- |", ...observedRows]
      : []),
  ].join("\n");
}

test.describe(
  "Runtime site health regression",
  {
    tag: ["@runtime", "@regression"],
  },
  () => {
    test("critical routes load without blocking runtime errors", async ({
      page,
    }, testInfo) => {
      const results: RouteAuditResult[] = [];

      for (const route of auditedRoutes) {
        results.push(await auditRoute(page, route));
      }

      await testInfo.attach("runtime-site-health-report", {
        body: Buffer.from(buildReport(results), "utf8"),
        contentType: "text/markdown",
      });

      const failures = results.filter(
        (result) => result.blockingIssues.length > 0,
      );
      if (failures.length > 0) {
        console.error(
          "Runtime site health blocking issues:\n" +
            failures
              .map(
                (result) =>
                  `${result.route}: ${result.blockingIssues.map((issue) => `${issue.category}: ${issue.detail}`).join(" | ")}`,
              )
              .join("\n"),
        );
      }
      expect(
        failures,
        failures
          .map(
            (result) =>
              `${result.route}: ${result.blockingIssues.map((issue) => `${issue.category}: ${issue.detail}`).join(" | ")}`,
          )
          .join("\n"),
      ).toEqual([]);
    });
  },
);
