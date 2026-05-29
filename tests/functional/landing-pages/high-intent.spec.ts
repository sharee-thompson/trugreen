import { test, expect } from "@playwright/test";
import { landingPagePaths } from "../../../utils/paths";
import {
  components,
  highComponents,
} from "../../../utils/landing-page-components";

test.describe("Test Case 80847", { tag: ["@deep", "@landing-pages"] }, () => {
  for (const comp of highComponents) {
    test("High Intent Landing Page Full Test", async ({ page }) => {
      //Update forNow to high when url available
      await page.goto(landingPagePaths.forNow);

      await expect(page.locator(components[comp])).toBeVisible();
    });
  }
});
