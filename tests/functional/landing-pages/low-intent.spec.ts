import { test, expect } from "@playwright/test";
import { urls } from "./landing-page-paths";

test.describe("Test Case ID", () => {
    test("Low Intent Landing Page Full Test", async ({ page }) => {
        //Update forNow to low when url available
        await page.goto(urls.forNow);
    });
})