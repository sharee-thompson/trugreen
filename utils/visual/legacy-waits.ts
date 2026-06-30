import { Page, expect } from "@playwright/test";
import { getBaseUrl } from "../config";
import { VisualElement } from "./selectors";


export async function gotoHomePage(page: Page, useCacheBust = false) {
  const url = useCacheBust
    ? getBaseUrl("/?cache_bust=" + Date.now())
    : getBaseUrl("/");
  await page.goto(url, { waitUntil: "domcontentloaded" });
}

//This function may no longer be used by adding a "screenshot: false" param in the VisualElements object in selectors
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
  page: Page,
  item: VisualElement,
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

export async function waitForPageContent(page: Page, path: string) {
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
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    )
    .catch(() => {});
}






