import { Page, expect } from "@playwright/test";
import { selectorsToMask, VisualElement } from "./selectors";
import { getHomePageElement } from "./legacy-waits";

const DEFAULT_VISUAL_MAX_DIFF_PIXEL_RATIO = 0.05;

function parseVisualMaxDiffPixelRatio() {
  if (process.env.CI) {
    return DEFAULT_VISUAL_MAX_DIFF_PIXEL_RATIO;
  }

  const rawValue = process.env.VISUAL_MAX_DIFF_PIXEL_RATIO?.trim();

  if (!rawValue) {
    return DEFAULT_VISUAL_MAX_DIFF_PIXEL_RATIO;
  }

  const parsedValue = Number(rawValue);

  if (!Number.isFinite(parsedValue) || parsedValue < 0 || parsedValue > 1) {
    return DEFAULT_VISUAL_MAX_DIFF_PIXEL_RATIO;
  }

  return parsedValue;
}

export const visualMaxDiffPixelRatio = parseVisualMaxDiffPixelRatio();

export async function takeFullPageScreenshot(page: Page, stylePath?: string) {
  await expect(page).toHaveScreenshot({
    fullPage: true,
    scale: "css",
    stylePath,
    mask: selectorsToMask.map((item) => page.locator(item.selector)),
    maskColor: "#FF7F50",
    maxDiffPixelRatio: visualMaxDiffPixelRatio,
  });
}

export async function stabilizeElementForScreenshot(
  page: Page,
  item: VisualElement,
) {
  //This is just special treatment for the cookie banner
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
        maxDiffPixelRatio: visualMaxDiffPixelRatio,
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
