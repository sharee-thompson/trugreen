// @ts-nocheck
import { test, expect } from "@playwright/test";
import { getBaseUrl } from "../../utils/config";
import paths from "../../utils/paths";
import { emulateLazyLoadScroll } from "../../utils/helpers";

const BASE_URL = getBaseUrl();

const selectorsToRemove = [
  { selector: ".changeimgsrc", name: "Sticky Chat Button" },
  { selector: "#onetrust-banner-sdk", name: "Cookie Banner" },
];

const selectorsToMask = [
  {
    selector: ".InfinityNumber.contact_btn",
    name: "Dynamic Phone Number",
  },
  {
    selector:
      ".d-inline-block.g-font-size-16.mb-5.text-white.InfinityNumber.clickable",
    name: "Dynamic Phone Number",
  },
  {
    selector: ".d-inline-block.footer_phone_no.InfinityNumber.clickable",
    name: "Dynamic Phone Number",
  },
];

const elementScreenshotItems = [
  ...selectorsToRemove,
  ...selectorsToMask,
].filter(
  (item) =>
    item.name !== "Sticky Chat Button" && item.name !== "Dynamic Phone Number",
);

async function gotoHomePage(page: any, useCacheBust = false) {
  const url = useCacheBust ? `${BASE_URL}?cache_bust=${Date.now()}` : BASE_URL;
  await page.goto(url, { waitUntil: "domcontentloaded" });
}

async function waitForStickyChat(page: any) {
  await page
    .waitForFunction(
      () => {
        const chatLoaded = document.querySelector("#isChatLoaded");
        const stickyChatButton = document.querySelector(".changeimgsrc");

        return (
          Boolean(stickyChatButton) ||
          (!!chatLoaded && chatLoaded.getAttribute("value") === "1")
        );
      },
      { timeout: 15000 },
    )
    .catch(() => {});
}

async function getHomePageElement(page: any, item: any, useCacheBust = false) {
  await gotoHomePage(page, useCacheBust);
  if (item.name === "Sticky Chat Button") {
    await waitForStickyChat(page);
  }

  const element = page.locator(item.selector).first();
  await expect(
    element,
    `${item.name} selector should exist on the home page: ${item.selector}`,
  ).toBeVisible({ timeout: 15000 });

  await element.scrollIntoViewIfNeeded();
  return element;
}

async function stabilizeElementForScreenshot(page: any, item: any) {
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

function getElementScreenshotOptions(item: any) {
  return item.selector === "#onetrust-banner-sdk"
    ? {
        animations: "disabled" as const,
        caret: "hide" as const,
        scale: "css" as const,
        maxDiffPixelRatio: 0.03,
      }
    : {};
}

async function waitForPageContent(page: any, path: string) {
  if (path !== "/") {
    return;
  }

  await page
    .waitForFunction(
      () => {
        const main = document.querySelector("main");
        const hasMainContent = Boolean(main && main.textContent?.trim());
        const pageIsTallerThanViewport =
          document.documentElement.scrollHeight > window.innerHeight + 200;

        return hasMainContent || pageIsTallerThanViewport;
      },
      { timeout: 10000 },
    )
    .catch(() => {});

  await page
    .evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    )
    .catch(() => {});
}

function getElementScreenshotName(item: any) {
  return `${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
}

async function expectElementScreenshot(page: any, item: any) {
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

async function removeElementIfExists(
  page: any,
  selector: string,
  name: string,
) {
  const element = page.locator(selector);
  if ((await element.count()) > 0) {
    console.log(`Removing ${name} element...`);
    await element.evaluate((node: any) => node.remove());
  }
}

test.describe("Visual Regression Tests @visual-regression", () => {
  for (const item of elementScreenshotItems) {
    test(`should match screenshot for removed selector ${item.name}`, async ({
      page,
    }) => {
      await expectElementScreenshot(page, item);
    });
  }

  for (const path of paths) {
    test(`should match screenshot for ${path}`, async ({ page }) => {
      const url = `${BASE_URL}${path}`;

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
