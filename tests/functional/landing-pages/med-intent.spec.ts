import { test, expect } from "@playwright/test";
import { urls } from "./landing-page-paths";

test.describe("Test Case ID", () => {
    test("Medium Intent Landing Page Full Test", async ({ page }) => {
        //Update forNow to med when url available
        await page.goto(urls.forNow);
    });
})