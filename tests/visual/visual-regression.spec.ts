import { test, expect, type Page } from "@playwright/test";
import { getBaseUrl, getLandingPageUrl } from "../../utils/config";
import { landingPagePaths, visualPaths } from "../../utils/paths";
import {
  selectorsToRemove,
  selectorsToMask,
  elementScreenshotItems,
  expectElementScreenshot,
  getVisualHideCss,
  removeElementIfExists,
  settleVisualPage,
  visualMaxDiffPixelRatio,
  waitForStableScrollHeight,
} from "../../utils/index";
import fs from "fs";
import path from "path";

const hideCssPath = path.join(__dirname, "visual-hide.css");
const landingHeaderLogoSelector =
  '[class*="landingPageHeader_logo__"], header img[alt="TruGreen Logo"]';

async function runFullPageVisualCheck(
  page: Page,
  screenshotName: string,
  visualPath: string,
  getUrl: (path: string) => string,
) {
  const targetUrl = getUrl(visualPath);
  await page.goto(targetUrl, { waitUntil: "domcontentloaded" });

  await settleVisualPage(page, visualPath);

  for (const item of selectorsToRemove) {
    await removeElementIfExists(page, item.selector, item.name);
  }

  if (visualPath.endsWith("/ppc/landing-page")) {
    await waitForStableScrollHeight(page);
  }

  await expect(page).toHaveScreenshot(`${screenshotName}.png`, {
    fullPage: true,
    scale: "css",
    stylePath: hideCssPath,
    mask: selectorsToMask.map((item) => page.locator(item.selector)),
    maskColor: "#FF7F50",
    maxDiffPixelRatio: visualMaxDiffPixelRatio,
  });
}

async function expectLandingLogoScreenshot(page: Page) {
  const landingPath = landingPagePaths.high;

  await page.goto(getLandingPageUrl(landingPath), {
    waitUntil: "domcontentloaded",
  });
  await settleVisualPage(page, landingPath);

  const logo = page.locator(landingHeaderLogoSelector).first();
  await expect(logo).toBeVisible({ timeout: 15000 });
  await logo.scrollIntoViewIfNeeded();

  await expect(logo).toHaveScreenshot("landing-header-logo.png", {
    animations: "disabled",
    caret: "hide",
    scale: "css",
    maxDiffPixelRatio: visualMaxDiffPixelRatio,
  });
}

test.describe(
  "Visual Regression Tests",
  { tag: ["@visual-regression", "@visual"] },
  () => {
    test.beforeAll(() => {
      const css = getVisualHideCss();
      fs.writeFileSync(hideCssPath, css);
      console.log(
        `\nVisual Regression Tests - Environment: ${process.env.ENV || "prod"}\n`,
      );
      console.log(`Visual maxDiffPixelRatio: ${visualMaxDiffPixelRatio}`);
    });

    // STEP 1 — element screenshots of removable selectors, once each (home page).
    for (const item of elementScreenshotItems) {
      test(`element: ${item.name}`, async ({ page }) => {
        await expectElementScreenshot(page, item);
      });
    }

    // STEP 2 — full-page sitewide smoke coverage.
    for (const [name, visualPath] of Object.entries(visualPaths)) {
      test(`page: ${name}`, async ({ page }) => {
        await runFullPageVisualCheck(
          page,
          `fullpage-${name}`,
          visualPath,
          getBaseUrl,
        );
      });
    }
  },
);

test.describe(
  "Landing Page Visual Regression Tests",
  { tag: ["@landing-pages", "@visual"] },
  () => {
    test.beforeAll(() => {
      const css = getVisualHideCss();
      fs.writeFileSync(hideCssPath, css);
      console.log(
        `\nLanding Page Visual Tests - Environment: ${process.env.LANDING_PAGE_ENV || process.env.ENV || "prod"}\n`,
      );
      console.log(`Visual maxDiffPixelRatio: ${visualMaxDiffPixelRatio}`);
    });

    test("element: Landing Header Logo", async ({ page }) => {
      await expectLandingLogoScreenshot(page);
    });

    for (const [name, landingPath] of Object.entries(landingPagePaths)) {
      test(`page: landing ${name}`, async ({ page }) => {
        await runFullPageVisualCheck(
          page,
          `fullpage-landing-${name}`,
          landingPath,
          getLandingPageUrl,
        );
      });
    }
  },
);
