import { test, expect } from "@playwright/test";
import { landingPagePaths } from "../../../utils/paths";
import {
  components,
  medComponents,
} from "../../../utils/landing-page-components";

test.describe("Test Case 80849", { tag: ["@deep", "@landing-pages"] }, () => {
  for (const comp of medComponents) {
    test("Medium Intent Landing Page Full Test", async ({ page }) => {
      //Update forNow to med when url available
      await page.goto(landingPagePaths.forNow);

      await expect(page.locator(components[comp])).toBeVisible();
    });
  }
});
