import { test, expect } from "@playwright/test";
import { landingPagePaths } from "../../../utils/paths";
import {
  components,
  smokeComponents,
  resolve
} from "../../../utils/landing-page-components";

for (const [pageName, url] of Object.entries(landingPagePaths)) {
  test.describe(
    `smoke: ${pageName}`,
    { tag: ["@smoke", "@landing-pages"] },
    () => {
      for (const comp of smokeComponents) {
        test(`has ${comp}`, async ({ page }) => {
          await page.goto(url);
          await expect(resolve(page, components[comp])).toBeVisible();
          await expect(page).not.toHaveTitle("Error");
        });
      }
    },
  );
}
