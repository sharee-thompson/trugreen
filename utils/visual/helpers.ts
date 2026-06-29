import { Page, expect } from "@playwright/test";
import { selectorsToMask, VisualElement } from "./selectors";
import { getHomePageElement } from "./legacy-waits";

export async function takeFullPageScreenshot(page: Page) {
  await expect(page).toHaveScreenshot({
    fullPage: true,
    mask: selectorsToMask.map((item) => page.locator(item.selector)),
    maskColor: "#FF7F50",
    maxDiffPixelRatio: 0.03,
  });
}

export async function stabilizeElementForScreenshot(
  page: Page,
  item: VisualElement,
) {
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
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    );
  }
}

export function getElementScreenshotOptions(item: VisualElement) {
  return item.selector === "#onetrust-banner-sdk"
    ? {
        animations: "disabled" as const,
        caret: "hide" as const,
        scale: "css" as const,
        maxDiffPixelRatio: 0.03,
      }
    : {};
}
  

export function getElementScreenshotName(item: VisualElement): string {
  const allowed = "abcdefghijklmnopqrstuvwxyz0123456789";
  const slug = Array.from(item.name.toLowerCase())
    .map((char) => (allowed.includes(char) ? char : " "))
    .join("")
    .split(" ")
    .filter(Boolean)
    .join("-");
  return `${slug}.png`;
}

export async function expectElementScreenshot(page: Page, item: VisualElement) {
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
