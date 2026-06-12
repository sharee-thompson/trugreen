import { Page, expect } from "@playwright/test";

//This was a suggestion from Christian for the other project. I haven't imported yours or this one, just adding stuff. JZ

async function emulateLazyLoadScrollV2(page: Page): Promise<void> {
  const scrollDistance: number = 90;
  const scrollInterval: number = 200;
  interface ScrollOptions {
    scrollDistance: number;
    scrollInterval: number;
  }

  await page.evaluate(
    async ({ scrollDistance, scrollInterval }: ScrollOptions) => {
      await new Promise<boolean>((resolve) => {
        let totalHeight = 0;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, scrollDistance);
          totalHeight += scrollDistance;

          if (totalHeight >= scrollHeight - window.innerHeight) {
            clearInterval(timer);
            resolve(true);
          }
        }, scrollInterval);
      });
    },
    { scrollDistance, scrollInterval },
  );
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(3000);
}

export { emulateLazyLoadScrollV2 };

export async function forceFonts(page: Page) {
  await page.evaluate(() => {
    // Force complete rendering
    window.scrollTo(0, document.body.scrollHeight);
    window.scrollTo(0, 0);
  });
}

// Visual regression test helpers
export const selectorsToRemove = [
  { selector: ".changeimgsrc", name: "Sticky Chat Button" },
  { selector: "#onetrust-banner-sdk", name: "Cookie Banner" },
];

export const selectorsToMask = [
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

export const elementScreenshotItems = [
  ...selectorsToRemove,
  ...selectorsToMask,
].filter(
  (item) =>
    item.name !== "Sticky Chat Button" && item.name !== "Dynamic Phone Number",
);

export async function gotoHomePage(page: any, useCacheBust = false) {
  const { getBaseUrl } = await import("./config");
  const url = useCacheBust
    ? getBaseUrl("/?cache_bust=" + Date.now())
    : getBaseUrl("/");
  await page.goto(url, { waitUntil: "domcontentloaded" });
}

export async function waitForStickyChat(page: any) {
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

export async function getHomePageElement(
  page: any,
  item: any,
  useCacheBust = false,
) {
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

export async function waitForPageContent(page: any, path: string) {
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

export async function removeElementIfExists(
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

export async function takeFullPageScreenshot(page: any) {
  await expect(page).toHaveScreenshot({
    fullPage: true,
    mask: selectorsToMask.map((item) => page.locator(item.selector)),
    maxDiffPixelRatio: 0.03,
  });
}
