// @ts-nocheck
import { test } from "@playwright/test";
import { landingPagePaths } from "../../../utils/paths";
import { getLandingPageUrl } from "../../../utils/config";
import {
  selectorsToRemove,
  selectorsToMask,
  removeElementIfExists,
  takeFullPageScreenshot,
  emulateLazyLoadScroll,
} from "../../../utils/index";

test.describe("Landing Page Visual Regression Tests @landing-pages", () => {
  test.beforeAll(() => {
    console.log(
      `\nLanding Page Visual Tests - Environment: ${process.env.ENV || "dev"}\n`,
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
