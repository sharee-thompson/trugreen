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
  const waitForDoubleAnimationFrame = () =>
    page
      .evaluate(
        () =>
          new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          ),
      )
      .catch(() => {});
  const shortWait = { timeout: 10000 };

  if (path === "/") {
    await page
      .waitForFunction(
        () => {
          const main = document.querySelector("main");
          const hasMainContent = Boolean(main && main.textContent?.trim());
          const pageIsTallerThanViewport =
            document.documentElement.scrollHeight > window.innerHeight + 200;

          return hasMainContent || pageIsTallerThanViewport;
        },
        undefined,
        shortWait,
      )
      .catch(() => {});

    await waitForDoubleAnimationFrame();
    return;
  }

  if (path.endsWith("/ppc/landing-page")) {
    await page
      .waitForFunction(
        () => {
          const heroHeading = document.querySelector("h1")?.textContent?.trim();
          const pageIsTallerThanViewport =
            document.documentElement.scrollHeight > window.innerHeight * 4;

          return Boolean(heroHeading) && pageIsTallerThanViewport;
        },
        undefined,
        shortWait,
      )
      .catch(() => {});

    await waitForDoubleAnimationFrame();
    return;
  }

  if (path === "/products-and-services/trubasic") {
    await page
      .waitForFunction(
        () => {
          const heroHeading = document.querySelector("h1")?.textContent?.trim();
          const sectionHeading = Array.from(
            document.querySelectorAll("h2"),
          ).some((heading) =>
            heading.textContent?.includes("What's included with TruBasic."),
          );
          const pageIsTallerThanViewport =
            document.documentElement.scrollHeight > window.innerHeight * 4;

          return (
            Boolean(heroHeading) && sectionHeading && pageIsTallerThanViewport
          );
        },
        undefined,
        shortWait,
      )
      .catch(() => {});

    await waitForDoubleAnimationFrame();
    return;
  }

  if (path === "/about/privacy-policy") {
    await page
      .waitForFunction(
        () => {
          const pageText = document.body?.innerText ?? "";
          const hasPolicyHeading = pageText.includes("TruGreen Privacy Policy");
          const hasEffectiveDate = pageText.includes("Effective December");
          const pageIsTallerThanViewport =
            document.documentElement.scrollHeight > window.innerHeight * 6;

          return (
            hasPolicyHeading && hasEffectiveDate && pageIsTallerThanViewport
          );
        },
        undefined,
        shortWait,
      )
      .catch(() => {});

    await waitForDoubleAnimationFrame();
    return;
  }

  if (path === "/products-and-services") {
    await page
      .waitForFunction(
        () =>
          Array.from(document.querySelectorAll("p")).some((paragraph) =>
            paragraph.textContent?.includes(
              "take the guesswork out of getting a great-looking lawn",
            ),
          ),
        undefined,
        { timeout: 10000 },
      )
      .catch(() => {});

    await waitForDoubleAnimationFrame();
  }
}
