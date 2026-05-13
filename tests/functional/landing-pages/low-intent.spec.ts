import { test, expect } from "@playwright/test";
import { urls } from "./landing-page-paths";

test.describe("Test Case 80848", { tag: ["@deep", "@landing-pages"] }, () => {
  test("Low Intent Landing Page Full Test", async ({ page }) => {
    //Update forNow to low when url available
    await page.goto(urls.forNow);
  });
});