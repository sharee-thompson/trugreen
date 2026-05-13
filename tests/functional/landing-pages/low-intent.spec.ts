import { test, expect } from "@playwright/test";
import { urls } from "./landing-page-paths";
import { components, lowComponents } from './components';


test.describe("Test Case 80848", { tag: ["@deep", "@landing-pages"] }, () => {
    for (const comp of lowComponents) {
  test("Low Intent Landing Page Full Test", async ({ page }) => {
    //Update forNow to low when url available
    await page.goto(urls.forNow);
    
  });
}
});