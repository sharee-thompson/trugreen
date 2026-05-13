import { test, expect } from "@playwright/test";
import { urls } from "./landing-page-paths";

for (const [name, url] of Object.entries(urls)) {
  test(`smoke: ${name} should load`, { tag: ['@smoke', '@landing-pages'] }, async ({ page }) => {
    await page.goto(url);
    await expect(page).not.toHaveTitle("Error");
    //Remaining smoke level assertions
    /*Common components
    Nav
    Logo
Hero with a CTA (any)
Section "See the TruGreen difference."
    non-video variant: Card Wrapper 
        Card - Before / After
        Card - Before / After
        Card - Before / After
    video variant: Video Embed 
Pre-Footer, at least one CTA
Footer
*/
  });
}
