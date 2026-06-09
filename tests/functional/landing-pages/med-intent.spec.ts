import { test, expect } from "@playwright/test";
import { landingPagePaths } from "../../../utils/paths";
import {
  components,
  medComponents,
  resolve
} from "../../../utils/landing-page-components";

for (const [pageName, url] of Object.entries(landingPagePaths)) {
  test.describe(
    `Test Case 80849: ${pageName}`,
    { tag: ["@deep", "@landing-pages"] },
    () => {
      for (const comp of medComponents) {
        test(`Medium Intent - ${comp}`, async ({ page }) => {
          await page.goto(url);
          await expect(resolve(page, components[comp])).toBeVisible();
        });
      }
    },
  );
}
