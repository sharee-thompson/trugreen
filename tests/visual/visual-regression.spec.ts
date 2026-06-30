import { test, expect, type Page } from "@playwright/test";
import { getBaseUrl } from "../../utils/config";
import { visualDrupalPaths, visualNextPaths } from "../../utils/paths";
import {
  selectorsToRemove,
  selectorsToMask,
  elementScreenshotItems,
  expectElementScreenshot,
  settleDrupalPage,
  settleNextPage,
} from "../../utils/index";
import fs from "fs";
import path from "path";

const hideCssPath = path.join(__dirname, "visual-hide.css");

async function runFullPageVisualCheck(
  page: Page,
  name: string,
  visualPath: string,
  prefix: "drupal" | "next",
  settle: (page: Page) => Promise<void>,
) {
  const targetUrl = getBaseUrl(visualPath);
  await page.goto(targetUrl, { waitUntil: "domcontentloaded" });

  await settle(page);

  await expect(page).toHaveScreenshot(`fullpage-${prefix}-${name}.png`, {
    fullPage: true,
    stylePath: hideCssPath,
    mask: selectorsToMask.map((item) => page.locator(item.selector)),
    maskColor: "#FF7F50",
    maxDiffPixelRatio: 0.03,
  });
}

test.describe("Visual Regression Tests @visual-regression", () => {

  test.beforeAll(() => {
    const css =
      selectorsToRemove.map((item) => item.selector).join(", ") +
      " { display: none !important; }";
    fs.writeFileSync(hideCssPath, css);
    console.log(
      `\nVisual Regression Tests - Environment: ${process.env.ENV || "prod"}\n`,
    );
  });

  // STEP 1 — element screenshots of removable selectors, once each (home page).
  for (const item of elementScreenshotItems) {
    test(`element: ${item.name}`, async ({ page }) => {
      await expectElementScreenshot(page, item);
    });
  }

  // STEP 2 — Drupal full pages (lazy-image settle).
  for (const [name, visualPath] of Object.entries(visualDrupalPaths)) {
    test(`Drupal: ${name}`, async ({ page }) => {
      await runFullPageVisualCheck(
        page,
        name,
        visualPath,
        "drupal",
        settleDrupalPage,
      );
    });
  }

  // STEP 3 — Next.js full pages (hydration settle).
  for (const [name, visualPath] of Object.entries(visualNextPaths)) {
    test(`Next: ${name}`, async ({ page }) => {
      await runFullPageVisualCheck(
        page,
        name,
        visualPath,
        "next",
        settleNextPage,
      );
    });
  }
});
