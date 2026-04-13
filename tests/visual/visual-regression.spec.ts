// @ts-nocheck
import { test, expect } from "@playwright/test";
import { getBaseUrl } from "../../utils/config";
import paths from "../../utils/paths";
import { emulateLazyLoadScroll } from "../../utils/helpers";

const BASE_URL = getBaseUrl();

async function gotoHomePage(page: any, useCacheBust = false) {
  const url = useCacheBust ? `${BASE_URL}?cache_bust=${Date.now()}` : BASE_URL;
  await page.goto(url, { waitUntil: "domcontentloaded" });
}

async function getHomePageSelector(page: any, item: any) {
  await gotoHomePage(page);

  let element = page.locator(item.selector).first();
  const errorMessage = `${item.name} selector should exist on the home page: ${item.selector}`;

  try {
    await expect(element, errorMessage).toBeVisible({ timeout: 5000 });
  } catch (error) {
    if (!item.retryWithCacheBust) {
      throw error;
    }

    await page.context().clearCookies();
    await page.evaluate(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });
    await gotoHomePage(page, true);
    await page.waitForTimeout(3000);

    element = page.locator(item.selector).first();
    await expect(element, errorMessage).toBeVisible({ timeout: 5000 });
  }

  await element.scrollIntoViewIfNeeded();
  return element;
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

const selectorsToRemove = [
  { selector: "#chatBotloader", name: "Chat" },
  {
    selector: "#onetrust-banner-sdk",
    name: "Cookie Banner",
    retryWithCacheBust: true,
  },

  // Chat
  //    locator('#chatBotloader')
  // Cookie banner
  //    locator('#onetrust-banner-sdk')
];

test.describe("Visual Regression Tests @visual-regression", () => {
  for (const item of selectorsToRemove) {
    test.only(`should match screenshot for removed selector ${item.name}`, async ({
      page,
    }) => {
      const element = await getHomePageSelector(page, item);

      await expect(element).toHaveScreenshot();
    });
  }

  for (const path of paths) {
    test(`should match screenshot for ${path}`, async ({ page }) => {
      const url = `${BASE_URL}${path}`;
      console.log(`[VISUAL-TEST-START] Testing visual regression for: ${url}`);

      await page.goto(url);
      console.log(`[VISUAL-TEST-LOADED] Page loaded: ${url}`);

      // Check if h1 text is included in "See how a career as an" text
      // If not, reload cache until it matches
      let cacheReloadAttempts = 0;
      const maxReloadAttempts = 5;

      console.log(`[VISUAL-TEST-H1-CHECK] Starting H1 validation check...`);

      while (cacheReloadAttempts < maxReloadAttempts) {
        // Check if h1 exists first (with timeout to avoid hanging)
        const h1Element = page.locator("h1").first();
        const h1Count = await h1Element.count();
        console.log(`[VISUAL-TEST-H1-CHECK] H1 count: ${h1Count}`);

        if (h1Count === 0) {
          console.log("ℹ No h1 element found on this page, skipping check");
          break;
        }

        const h1Text = await h1Element.textContent({ timeout: 5000 });
        console.log(`H1 Text: ${h1Text}`);

        // const careerTextLocator = page.getByText("See how a career as an");
        const careerTextLocator = page.locator(
          ".compare-section-wrapper p:first-of-type",
        );
        if ((await careerTextLocator.count()) > 0) {
          const careerText = await careerTextLocator.textContent();
          console.log(`Career Text: ${careerText}`);

          // Check if h1 text is included in career text
          if (careerText && h1Text && careerText.includes(h1Text.trim())) {
            console.log(`✅ H1 text "${h1Text.trim()}" found in career text`);
            break;
          } else {
            console.log(
              `❌ H1 text "${h1Text?.trim()}" not found in career text. Reloading cache (attempt ${
                cacheReloadAttempts + 1
              }/${maxReloadAttempts})...`,
            );

            // Trigger cache reload with cache-busting parameter
            const cacheBustUrl = `${url}?cache_bust=${Date.now()}`;
            await page.goto(cacheBustUrl, { waitUntil: "networkidle" });
            cacheReloadAttempts++;

            await page.waitForTimeout(3000);
          }
        } else {
          // If the locator doesn't exist on this page, skip the check
          console.log(
            '"See how a career as an" text not found on this page, skipping check',
          );
          break;
        }
      }

      if (cacheReloadAttempts >= maxReloadAttempts) {
        console.warn(`‼️ Max reload attempts reached. Continuing with test...`);
      }

      console.log(
        `[VISUAL-TEST-H1-CHECK] H1 validation complete, starting lazy load scroll...`,
      );
      await emulateLazyLoadScroll(page);
      console.log(`[VISUAL-TEST-SCROLL] Lazy load scroll complete`);

      console.log(`[VISUAL-TEST-CLEANUP] Removing unwanted elements...`);
      for (const item of selectorsToRemove) {
        await removeElementIfExists(page, item.selector, item.name);
      }

      console.log(`[VISUAL-TEST-SCREENSHOT] Taking screenshot...`);
      await expect(page).toHaveScreenshot({
        fullPage: true,
      });
      console.log(
        `[VISUAL-TEST-COMPLETE] Test completed successfully for: ${url}`,
      );
    });
  }
});
