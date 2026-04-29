import { test, expect } from "@playwright/test";
import { getBaseUrl } from "../../utils/config";

test.describe("TruGreen GA4 Analytics Validation @analytics", () => {
  test("home page sends GA4 page_view event with correct property ID", async ({
    page,
  }) => {
    const ga4Events: { url: string; params: URLSearchParams }[] = [];

    // Listen for GA4 collect requests
    page.on("request", (request) => {
      const url = request.url();
      if (
        url.includes("analytics.google.com/g/collect") ||
        url.includes("stats.g.doubleclick.net/g/collect")
      ) {
        const params = new URL(url).searchParams;
        ga4Events.push({ url, params });
        console.log(`GA4 event captured: ${params.get("en")}`);
      }
    });

    // Navigate to home page
    await page.goto(getBaseUrl(), { waitUntil: "domcontentloaded" });
    console.log(`Navigated to: ${getBaseUrl()}`);

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
    expect(tid).toBe("G-V7W66KBH3J");

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
});
