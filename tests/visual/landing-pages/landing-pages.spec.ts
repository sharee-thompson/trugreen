// @ts-nocheck
import { test } from "@playwright/test";
import { landingPagePaths } from "../../../utils/paths";
import { getLandingPageUrl } from "../../../utils/config";
import { emulateLazyLoadScroll } from "../../../utils";
import {
  selectorsToRemove,
  selectorsToMask,
  removeElementIfExists,
  takeFullPageScreenshot,
} from "../../../utils/visualAssistance";

test.describe("Landing Page Visual Regression Tests @landing-pages", () => {
  test.beforeAll(() => {
    console.log(
      `\nLanding Page Visual Tests - Environment: ${process.env.LANDING_PAGE_ENV || process.env.ENV || "prod"}\n`,
    );
  });

  for (const [key, landingPath] of Object.entries(landingPagePaths)) {
    test(`should match screenshot for landing page ${key}`, async ({
      page,
    }) => {
      const url = getLandingPageUrl(landingPath);
      await page.goto(url);

      await emulateLazyLoadScroll(page);
      await page.waitForTimeout(5000);

      for (const item of selectorsToRemove) {
        await removeElementIfExists(page, item.selector, item.name);
      }

      await takeFullPageScreenshot(page);
    });
  }
});
