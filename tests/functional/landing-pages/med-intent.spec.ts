import { test, expect } from "@playwright/test";
import { urls } from "./landing-page-paths";

test.describe("Test Case 80849", { tag: ["@deep", "@landing-pages"] }, () => {
  test("Medium Intent Landing Page Full Test", async ({ page }) => {
    //Update forNow to med when url available
    await page.goto(urls.forNow);

    /* From 80536
    The page must display all approved copy, headlines, body content, CTAs, and supporting content as provided in the parent feature.

    Any CTA included on the page must be functional and route users to the correct next step.
    The page must support responsive behavior and display correctly across desktop and mobile breakpoints as defined in Figma.

Each component must render with the correct content, styling, spacing, and behavior according to the design specifications.

Nav 
Hero 
    CTA - to call
Section  "The clear choice for a great looking lawn."
    Card Wrapper
        Card - Icon
        Card - Icon
        Card - Icon
Section "How it works."
    Card Wrapper - list and timeline
        Card - Numbered
        Card - Numbered
        Card - Numbered
        Card - Numbered
Section "Get a free quote."
    Lead Form - In Page
Ribbon
    CTA
Section "See the TruGreen difference."
    non-video variant: Card Wrapper 
        Card - Before / After
        Card - Before / After
        Card - Before / After
    video variant: Video Embed 
Ribbon - Logo
    Logo
    Logo
    Logo
Section "Questions? Glad you asked."
    FAQs 
        Category
            FAQ 
            FAQ 
            FAQ 
        Category
            FAQ 
            FAQ 
            FAQ 
        Category
            FAQ 
            FAQ 
            FAQ 
        Category
            FAQ 
            FAQ 
            FAQ 
        Category
            FAQ 
            FAQ 
            FAQ 
Pre-Footer
Footer

    */
  });
});