import { test, expect } from "@playwright/test";
import { urls } from "./landing-page-paths";

for (const [name, url] of Object.entries(urls)) {
  test(`smoke: ${name} should load`, async ({ page }) => {
    await page.goto(url);
    await expect(page).not.toHaveTitle("Error");
    //Remaining smoke level assertions
  });
}
