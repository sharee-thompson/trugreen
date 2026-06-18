import { test, expect } from "@playwright/test";
import { landingPagePaths } from "../../../utils/paths";
import { getLandingPageUrl } from "../../../utils/config";
import {
  components,
  smokeComponents,
  resolve,
} from "../../../utils/landing-page-components";
import { closeCookieBanner} from "../../../utils";

for (const [pageName, url] of Object.entries(landingPagePaths)) {
  const resolvedUrl = getLandingPageUrl(url);
  test.describe(
    `smoke: ${pageName}`,
    { tag: ["@smoke", "@landing-pages", "@functional"] },
    () => {
      for (const comp of smokeComponents) {
        test(`has ${comp}`, async ({ page }) => {
          await page.goto(resolvedUrl);
          await closeCookieBanner(page);
          
          await expect(resolve(page, components[comp])).toBeVisible();
          await expect(page).not.toHaveTitle("Error");
        });
      }
    },
  );
}
