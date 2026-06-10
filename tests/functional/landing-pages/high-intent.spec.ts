import { test, expect } from "@playwright/test";
import { landingPagePaths } from "../../../utils/paths";
import {
  components,
  highComponents,
  resolve
} from "../../../utils/landing-page-components";

for (const [pageName, url] of Object.entries(landingPagePaths)) {
  test.describe(
    `Test Case 80847: ${pageName}`,
    { tag: ["@deep", "@landing-pages"] },
    () => {
      for (const comp of highComponents) {
        test(`High Intent - ${comp}`, async ({ page }) => {
          //Update to high
          await page.goto(landingPagePaths.storybookHigh);
          await expect(resolve(page, components[comp])).toBeVisible();
        });
      }
    },
  );
}
