import { test, expect } from "@playwright/test";
import { landingPagePaths } from "../../../utils/paths";
import {
  components,
  highComponents,
} from "../../../utils/landing-page-components";

for (const [pageName, url] of Object.entries(landingPagePaths)) {
  test.describe(
    `Test Case 80847: ${pageName}`, // 👈 unique describe per page
    { tag: ["@deep", "@landing-pages"] },
    () => {
      for (const comp of highComponents) {
        test(`High Intent - ${comp}`, async ({ page }) => {
          await page.goto(url);
          await expect(page.locator(components[comp])).toBeVisible();
        });
      }
    },
  );
}
