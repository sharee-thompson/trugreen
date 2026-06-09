import { test, expect } from "@playwright/test";
import { landingPagePaths } from "../../../utils/paths";
import {
  components,
  lowComponents,
} from "../../../utils/landing-page-components";

for (const [pageName, url] of Object.entries(landingPagePaths)) {
  test.describe(
    `Test Case 80848: ${pageName}`,
    { tag: ["@deep", "@landing-pages"] },
    () => {
      for (const comp of lowComponents) {
        test(`Low Intent - ${comp}`, async ({ page }) => {
          await page.goto(url);
          await expect(page.locator(components[comp])).toBeVisible();
        });
      }
    },
  );
}
