import { test, expect } from "@playwright/test";
import { urls } from "./landing-page-paths";

test.describe("Test Case 80847", { tag: ["@deep", "@landing-pages"] }, () => {
  test("High Intent Landing Page Full Test", async ({ page }) => {
    //Update forNow to high when url available
    await page.goto(urls.forNow);
  });
});