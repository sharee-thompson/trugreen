import { test, expect } from "@playwright/test";
import { getBaseUrl } from "../../utils/config";
import { visualPaths } from "../../utils/paths";
import {
  selectorsToRemove,
  selectorsToMask,
  elementScreenshotItems,
  expectElementScreenshot,
  waitForPageContent,
  removeElementIfExists,
  emulateLazyLoadScroll,
} from "../../utils/index";

const baseUrl = getBaseUrl();

test.describe("Visual Regression Tests @visual-regression", () => {
  test.beforeAll(() => {
    console.log(
      `\nVisual Regression Tests - Environment: ${process.env.ENV || "prod"}\n`,
    );
  });

  //First test should take screenshots of the selectors to remove to make sure they find no regression
  for (const item of elementScreenshotItems) {
    test(`should match screenshot for removed selector ${item.name}`, async ({
      page
    }) => {
      await page.goto(baseUrl);
      await waitForPageContent(page, "/");
      await expectElementScreenshot(page, item);
    });
  }

  for (const [name, visualPath] of Object.entries(visualPaths)) {
    test(`should match screenshot for ${name}`, async ({ page }) => {
      await page.goto(`${baseUrl}${visualPath}`, { waitUntil: "domcontentloaded" });
      await page.waitForURL(`${baseUrl}${visualPath}`);
      await waitForPageContent(page, visualPath);
      await emulateLazyLoadScroll(page);
      await expect(page.locator("footer")).toBeVisible();

      // Persistent hide — beats async re-injection (OneTrust, chat widget, etc.)
      const hideCss =
        selectorsToRemove.map((item) => item.selector).join(", ") +
        " { display: none !important; }";
      await page.addStyleTag({ content: hideCss });

      await expect(page).toHaveScreenshot(`fullpage-${name}.png`, {
        fullPage: true,
        mask: selectorsToMask.map((item) => page.locator(item.selector)),
        maskColor: "#FF7F50",
        maxDiffPixelRatio: 0.03,
      });
    });
  }
});
