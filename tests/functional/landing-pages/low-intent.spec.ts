import { test, expect } from "@playwright/test";
import { landingPagePaths } from "../../../utils/paths";
import { getLandingPageUrl } from "../../../utils/config";
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
          const url = getLandingPageUrl(landingPagePaths.low);
          await page.goto(url);
          await expect(resolve(page, components[comp])).toBeVisible();
        });
      }
    },
  );
}
