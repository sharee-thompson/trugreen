import { test, expect } from "@playwright/test";
import { urls } from "./landing-page-paths";

test.describe("Test Case 80847", { tag: ["@deep", "@landing-pages"] }, () => {
  test("High Intent Landing Page Full Test", async ({ page }) => {
    //Update forNow to high when url available
    await page.goto(urls.forNow);
    /*From 80535
    The page must display all approved copy, headlines, body content, CTAs, and supporting content as provided in the parent feature.

    Any CTA included on the page must be functional and route users to the correct next step.
    The page must support responsive behavior and display correctly across desktop and mobile breakpoints as defined in Figma.

Each component must render with the correct content, styling, spacing, and behavior according to the design specifications.

Nav 80538
Hero 80539
    CTA - to call
Section "See the TruGreen difference."
    non-video variant: Card Wrapper 80542 
        Card - Before / After 80544
    video variant: Video Embed 80546
Ribbon
    CTA 80562 OR 80578 OR 80579
Ribbon - Guarantee 80566
Section "Get a free quote." See CTA Suggestions
    Lead Form - In Page 80580
Pre-Footer 80583
    CTA 
Footer - LEGACY
    */
  });
});