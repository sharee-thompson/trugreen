import { test, expect } from "@playwright/test";
import { urls } from "./landing-page-paths";
import { components, highComponents } from "./components";

test.describe("Test Case 80847", { tag: ["@deep", "@landing-pages"] }, () => {
    for (const comp of highComponents) {
  test("High Intent Landing Page Full Test", async ({ page }) => {
    //Update forNow to high when url available
    await page.goto(urls.forNow);
    
    await expect(page.locator(components[comp])).toBeVisible();
  
    
  });
}
});