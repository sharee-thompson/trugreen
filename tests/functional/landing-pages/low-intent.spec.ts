import { test, expect } from "@playwright/test";
import { landingPagePaths } from "../../../utils/paths";
import {
  components,
  lowComponents,
  resolve
} from "../../../utils/landing-page-components";

for (const [pageName, url] of Object.entries(landingPagePaths)) {
  test.describe(
    `Test Case 80848: ${pageName}`,
    { tag: ["@deep", "@landing-pages"] },
    () => {
      for (const comp of lowComponents) {
        test(`Low Intent - ${comp}`, async ({ page }) => {
          //Update to low
          await page.goto(landingPagePaths.storybookLow);
          await expect(resolve(page, components[comp])).toBeVisible();
        });
      }
    },
  );
}
