import { Page, expect } from "@playwright/test";
import { selectorsToMask } from "./selectors";
import { getHomePageElement } from "./legacy-waits";

export async function takeFullPageScreenshot(page: any) {
  await expect(page).toHaveScreenshot({
    fullPage: true,
    mask: selectorsToMask.map((item) => page.locator(item.selector)),
    maxDiffPixelRatio: 0.03,
  });
}

export async function stabilizeElementForScreenshot(page: any, item: any) {
  if (item.selector === "#onetrust-banner-sdk") {
    await page
      .evaluate(async () => {
        if (document.fonts?.ready) {
          await document.fonts.ready;
        }
      })
      .catch(() => {});

    await page.evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    );
  }
}

export function getElementScreenshotOptions(item: any) {
  return item.selector === "#onetrust-banner-sdk"
    ? {
        animations: "disabled" as const,
        caret: "hide" as const,
        scale: "css" as const,
        maxDiffPixelRatio: 0.03,
      }
    : {};
}

export function getElementScreenshotName(item: any) {
  return `${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
}

export async function expectElementScreenshot(page: any, item: any) {
  for (const useCacheBust of [false, true]) {
    try {
      const element = await getHomePageElement(page, item, useCacheBust);

      await stabilizeElementForScreenshot(page, item);

      await expect(element).toHaveScreenshot(
        getElementScreenshotName(item),
        getElementScreenshotOptions(item),
      );
      return;
    } catch (error) {
      if (useCacheBust) {
        throw error;
      }

      await page.context().clearCookies();
      await page
        .evaluate(() => {
          window.localStorage.clear();
          window.sessionStorage.clear();
        })
        .catch(() => {});
    }
  }
}
