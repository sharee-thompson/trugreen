import { test, expect } from "@playwright/test";
import { getBaseUrl } from "../../utils/config";

const GA4_PROPERTY_ID = "G-V7W66KBH3J";

function isGa4CollectUrl(url: string): boolean {
  return (
    url.includes("analytics.google.com/g/collect") ||
    url.includes("stats.g.doubleclick.net/g/collect")
  );
}

function getGa4EventName(params: URLSearchParams): string {
  return params.get("en") ?? "unknown";
}

test.describe("TruGreen GA4 Analytics Validation @analytics", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      const win = window as Window & {
        __qaAnalytics?: {
          requests: string[];
          dataLayerPushes: unknown[];
        };
        dataLayer?: Array<unknown> & {
          push?: (...args: unknown[]) => number;
        };
      };

      win.__qaAnalytics = { requests: [], dataLayerPushes: [] };

      const trackRequest = (url: string) => {
        if (
          url.includes("analytics.google.com/g/collect") ||
          url.includes("stats.g.doubleclick.net/g/collect")
        ) {
          win.__qaAnalytics?.requests.push(url);
        }
      };

      const originalSendBeacon = navigator.sendBeacon.bind(navigator);
      navigator.sendBeacon = function sendBeacon(url, data) {
        trackRequest(String(url));
        return originalSendBeacon(url, data);
      };

      const originalFetch = window.fetch.bind(window);
      window.fetch = async function fetch(input, init) {
        const url =
          typeof input === "string"
            ? input
            : input instanceof Request
              ? input.url
              : String(input);
        trackRequest(url);
        return originalFetch(input, init);
      };

      const currentDataLayer = win.dataLayer;
      const originalPush = Array.isArray(currentDataLayer)
        ? currentDataLayer.push?.bind(currentDataLayer)
        : undefined;

      if (currentDataLayer && originalPush) {
        currentDataLayer.push = (...args: unknown[]) => {
          win.__qaAnalytics?.dataLayerPushes.push(...args);
          return originalPush(...args);
        };
      }
    });
  });

  test("home page sends GA4 page_view event with correct property ID", async ({
    page,
  }) => {
    const ga4Events: { url: string; params: URLSearchParams }[] = [];

    // Listen for GA4 collect requests
    page.on("request", (request) => {
      const url = request.url();
      if (isGa4CollectUrl(url)) {
        const params = new URL(url).searchParams;
        ga4Events.push({ url, params });
        console.log(`GA4 event captured: ${getGa4EventName(params)}`);
      }
    });

    // Navigate to home page
    await page.goto(getBaseUrl({ automation: false }), {
      waitUntil: "domcontentloaded",
    });
    console.log(`Navigated to: ${getBaseUrl({ automation: false })}`);

    // Wait for GA4 events to fire
    await page.waitForTimeout(2000);

    // Verify at least one GA4 event was captured
    console.log(`Total GA4 events captured: ${ga4Events.length}`);
    expect(ga4Events.length).toBeGreaterThan(0);

    // Find page_view or user_engagement event
    const pageViewOrEngagement = ga4Events.find((event) => {
      const en = event.params.get("en");
      return en === "page_view" || en === "user_engagement";
    });

    if (pageViewOrEngagement) {
      console.log(`Found page_view or user_engagement event`);
    } else {
      console.log(
        `No page_view/user_engagement event found. Events: ${ga4Events.map((e) => e.params.get("en")).join(", ")}`,
      );
    }
    expect(pageViewOrEngagement).toBeDefined();

    // Verify GA4 property ID is present and correct
    const tid = pageViewOrEngagement?.params.get("tid");
    console.log(`GA4 Property ID: ${tid}`);
    expect(tid).toBe(GA4_PROPERTY_ID);

    // Verify basic GA4 parameters are present
    const v = pageViewOrEngagement?.params.get("v");
    const cid = pageViewOrEngagement?.params.get("cid");
    const dl = pageViewOrEngagement?.params.get("dl");

    console.log(`GA4 API version: ${v}`);
    console.log(`Client ID present: ${!!cid}`);
    console.log(`Document location: ${dl}`);

    expect(v).toBe("2");
    expect(cid).toBeTruthy();
    expect(dl).toContain("trugreen.com");

    console.log(`GA4 analytics validation passed!`);
  });

  test("home page preserves baseline GA4 and dataLayer signals through CTA navigation", async ({
    page,
  }) => {
    await page.goto(getBaseUrl({ automation: false }), {
      waitUntil: "domcontentloaded",
    });

    await page.waitForTimeout(3000);

    const homepageBaseline = await page.evaluate(() => {
      const win = window as Window & {
        __qaAnalytics?: {
          requests: string[];
        };
        dataLayer?: unknown[];
      };

      const dataLayerEvents = Array.isArray(win.dataLayer)
        ? win.dataLayer
            .filter(
              (item): item is { event: string } =>
                !!item && typeof item === "object" && "event" in item,
            )
            .map((item) => item.event)
        : [];

      return {
        title: document.title,
        ga4Requests: win.__qaAnalytics?.requests ?? [],
        dataLayerEvents,
      };
    });

    const homepageGa4Events = homepageBaseline.ga4Requests.map((url) => {
      const params = new URL(url).searchParams;
      return {
        event: params.get("en"),
        tid: params.get("tid"),
        dl: params.get("dl"),
        dt: params.get("dt"),
      };
    });

    const homepageEventNames = new Set(
      homepageGa4Events
        .map((entry) => entry.event)
        .filter((value): value is string => Boolean(value)),
    );

    const homepageDataLayerEvents = new Set(homepageBaseline.dataLayerEvents);

    expect(homepageBaseline.title).toBe(
      "TruGreen | America’s #1 Name in Lawn Care",
    );
    expect(homepageGa4Events.length).toBeGreaterThan(0);
    expect(homepageEventNames.has("page_view")).toBe(true);

    const homepagePageView = homepageGa4Events.find(
      (entry) => entry.event === "page_view",
    );

    expect(homepagePageView?.tid).toBe(GA4_PROPERTY_ID);
    expect(homepagePageView?.dl).toContain("trugreen.com/");

    expect(homepageDataLayerEvents.has("gtm.js")).toBe(true);
    expect(homepageDataLayerEvents.has("gtm.dom")).toBe(true);
    expect(homepageDataLayerEvents.has("gtm.load")).toBe(true);
    expect(homepageDataLayerEvents.has("gtm.scrollDepth")).toBe(true);
    expect(homepageDataLayerEvents.has("OneTrustLoaded")).toBe(true);
    expect(homepageDataLayerEvents.has("OptanonLoaded")).toBe(true);
    expect(homepageDataLayerEvents.has("OneTrustGroupsUpdated")).toBe(true);
    expect(homepageDataLayerEvents.has("gtm.triggerGroup")).toBe(true);

    await page.evaluate(() => {
      const win = window as Window & {
        __qaAnalytics?: {
          requests: string[];
          dataLayerPushes: unknown[];
        };
      };

      if (win.__qaAnalytics) {
        win.__qaAnalytics.requests = [];
        win.__qaAnalytics.dataLayerPushes = [];
      }
    });

    await page.locator("a[href='/buy-online']:visible").first().click();
    await page.waitForURL(/\/buy-online/, { timeout: 15000 });
    await page.waitForTimeout(3000);

    const destinationBaseline = await page.evaluate(() => {
      const win = window as Window & {
        __qaAnalytics?: {
          requests: string[];
        };
      };

      return {
        url: location.href,
        title: document.title,
        ga4Requests: win.__qaAnalytics?.requests ?? [],
      };
    });

    const destinationGa4Events = destinationBaseline.ga4Requests.map((url) => {
      const params = new URL(url).searchParams;
      return {
        event: params.get("en"),
        tid: params.get("tid"),
        dl: params.get("dl"),
        dt: params.get("dt"),
      };
    });

    const destinationPageView = destinationGa4Events.find(
      (entry) => entry.event === "page_view",
    );

    expect(destinationBaseline.url).toContain("/buy-online");
    expect(destinationBaseline.title).toMatch(/Customized Lawn Care Pricing/i);
    expect(destinationPageView).toBeDefined();
    expect(destinationPageView?.tid).toBe(GA4_PROPERTY_ID);
    expect(destinationPageView?.dl).toContain("/buy-online");
  });
});
