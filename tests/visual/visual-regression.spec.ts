// @ts-nocheck
import { test, expect } from "@playwright/test";
import { getBaseUrl } from "../../utils/config";
import paths from "../../utils/paths";
import { emulateLazyLoadScroll } from "../../utils";
import {
  selectorsToRemove,
  selectorsToMask,
  elementScreenshotItems,
  expectElementScreenshot,
  waitForPageContent,
  removeElementIfExists,
} from "../../utils/visualAssistance";

test.describe("Visual Regression Tests @visual-regression", () => {
  test.beforeAll(() => {
    console.log(
      `\nVisual Regression Tests - Environment: ${process.env.ENV || "prod"}\n`,
    );
  });

  for (const item of elementScreenshotItems) {
    test(`should match screenshot for removed selector ${item.name}`, async ({
      page,
    }) => {
      await expectElementScreenshot(page, item);
    });
  }

  for (const path of paths) {
    test(`should match screenshot for ${path}`, async ({ page }) => {
      const url = getBaseUrl(path);
      await page.goto(url);

      await waitForPageContent(page, path);

      await emulateLazyLoadScroll(page);
      await page.waitForTimeout(5000);

      for (const item of selectorsToRemove) {
        await removeElementIfExists(page, item.selector, item.name);
      }

      await expect(page).toHaveScreenshot({
        fullPage: true,
        mask: selectorsToMask.map((item) => page.locator(item.selector)),
        maxDiffPixelRatio: 0.03,
      });
    });
  }
});
