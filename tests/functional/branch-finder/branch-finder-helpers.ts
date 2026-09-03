import { expect, type BrowserContext, type Page } from "@playwright/test";

export type BranchFinderSelectors = {
  trigger: string;
  zipInput: string;
  searchButton: string;
  dialog: string;
};

export const REACT_HEADER_SELECTORS: BranchFinderSelectors = {
  trigger: "#react-header-zipcode-data",
  zipInput: ".zipcode.d-s",
  searchButton: ".d-search-zip-click",
  dialog: ".zip-section",
};

export const DRUPAL_HEADER_SELECTORS: BranchFinderSelectors = {
  trigger: "#header-zipcode-data, #react-header-zipcode-data",
  zipInput: ".zipcode.d-s",
  searchButton: ".d-search-zip-click",
  dialog: ".zip-section",
};

type SubmitMethod = "click" | "enter";

export const openBranchFinder = async (
  page: Page,
  selectors: BranchFinderSelectors,
) => {
  const trigger = page.locator(selectors.trigger).first();
  await trigger.waitFor({ state: "visible" });
  await page.waitForFunction(
    ({ triggerSelector, dialogSelector }) => {
      const triggerElement = document.querySelector(triggerSelector);
      const dialogElement = document.querySelector(dialogSelector);
      if (!triggerElement || !dialogElement) return false;

      (triggerElement as HTMLElement).click();
      const dialogStyle = window.getComputedStyle(dialogElement);
      return (
        dialogStyle.display !== "none" &&
        dialogStyle.visibility !== "hidden" &&
        dialogElement.getBoundingClientRect().height > 0
      );
    },
    { triggerSelector: selectors.trigger, dialogSelector: selectors.dialog },
    { polling: 100, timeout: 15_000 },
  );
};

export const submitZip = async (
  page: Page,
  selectors: BranchFinderSelectors,
  zip: string,
  expectedBranchPath: string,
  submitMethod: SubmitMethod,
) => {
  await openBranchFinder(page, selectors);

  const zipInput = page.locator(selectors.zipInput).first();
  await zipInput.fill(zip);

  if (submitMethod === "enter") {
    await zipInput.press("Enter");
  } else {
    await page
      .locator(selectors.searchButton)
      .first()
      .evaluate((element) => {
        (element as HTMLElement).click();
      });
  }
  await expect(page).toHaveURL(
    new RegExp(`${escapeRegExp(expectedBranchPath)}(?:\\?.*)?$`),
    { timeout: 20_000 },
  );
};

export const expectPersistedZip = async (
  page: Page,
  selectors: BranchFinderSelectors,
  zip: string,
) => {
  await expect
    .poll(async () => {
      const trigger = page.locator(selectors.trigger).first();
      return trigger.evaluate((element) => {
        const input = element as HTMLInputElement;
        return `${element.textContent ?? ""} ${input.value ?? ""}`;
      });
    })
    .toContain(zip);

  await expect
    .poll(() =>
      page.evaluate((expectedZip) => {
        return Array.from({ length: localStorage.length }, (_, index) => {
          const key = localStorage.key(index);
          return key ? (localStorage.getItem(key) ?? "") : "";
        }).some((value) => value.includes(expectedZip));
      }, zip),
    )
    .toBe(true);
};

export const expectZipInNewTab = async (
  context: BrowserContext,
  route: string,
  selectors: BranchFinderSelectors,
  zip: string,
) => {
  const newTab = await context.newPage();
  await newTab.goto(route, { waitUntil: "domcontentloaded" });
  await expectPersistedZip(newTab, selectors, zip);
  await newTab.close();
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
