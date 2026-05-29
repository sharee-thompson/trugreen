import { test, expect } from "@playwright/test";
import { landingPagePaths } from "../../../utils/paths";
import {
  components,
  lowComponents,
} from "../../../utils/landing-page-components";

test.describe("Test Case 80848", { tag: ["@deep", "@landing-pages"] }, () => {
  for (const comp of lowComponents) {
    test("Low Intent Landing Page Full Test", async ({ page }) => {
      //Update forNow to low when url available
      await page.goto(landingPagePaths.forNow);

      await expect(page.locator(components[comp])).toBeVisible();
    });
  }
});
