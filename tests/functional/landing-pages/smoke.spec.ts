import { test, expect } from "@playwright/test";
import { landingPagePaths } from "../../../utils/paths";
import { getLandingPageUrl } from "../../../utils/config";
import {
  expectComponentsVisible,
  smokeComponents,
  loadLandingPage,
} from "../../../utils/landing-page-components";

for (const [pageName, url] of Object.entries(landingPagePaths)) {
  const resolvedUrl = getLandingPageUrl(url);
  test.describe(
    `smoke: ${pageName}`,
    { tag: ["@smoke", "@landing-pages", "@functional"] },
    () => {
      test("has required components", async ({ page }) => {
        await loadLandingPage(page, resolvedUrl);
        await expect(page).not.toHaveTitle("Error");
        await expectComponentsVisible(page, smokeComponents);
      });
    },
  );
}
