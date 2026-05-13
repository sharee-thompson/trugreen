import { test, expect } from "@playwright/test";
import { urls } from "./landing-page-paths";
import { components, medComponents } from "./components";


test.describe("Test Case 80849", { tag: ["@deep", "@landing-pages"] }, () => {
    for (const comp of medComponents) {
  test("Medium Intent Landing Page Full Test", async ({ page }) => {
    //Update forNow to med when url available
    await page.goto(urls.forNow);

    await expect(page.locator(components[comp])).toBeVisible();
  });
}
});