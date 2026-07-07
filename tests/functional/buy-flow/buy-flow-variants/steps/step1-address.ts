import { Page, expect, Locator } from "@playwright/test";
import { credentials } from "../../assets/env";

export async function step1EnterAddress(page: Page) {

  await expect
    await page
      .getByRole("searchbox", { name: "Enter your home address" })
      .click();
    await page
      .getByRole("searchbox", { name: "Enter your home address" })
      .fill(credentials.optionalAddress
      );
    await page.waitForTimeout(1500);
    await page
      .getByRole("searchbox", { name: "Enter your home address" })
      .press("ArrowDown");
    await page
      .getByRole("searchbox", { name: "Enter your home address" })
      .press("Enter");

    await page.locator("#svcEmail").fill(credentials.email);
    await page.waitForLoadState("domcontentloaded");
    await page.getByRole("button", { name: "Next" }).click();
    }

    export const step1Components = {
      buyVariantHeader: (page: Page): Locator =>
        page.locator("#header-buy-flow"),
      stepOneProgress: (page: Page): Locator =>
        page.getByText("Your Information"),
      stepOneTitle: (page: Page): Locator =>
        page.getByText("Your golf course quality lawn starts here"),
      stepOneDisclaimer: (page: Page): Locator =>
        page.locator(
          ".disclaimers_disclaimers__6zVfW.disclaimers_disclaimers--buy-online__BSnz5",
        ),
      buyVariantFooter: (page: Page): Locator =>
        page.locator(".footer_footer__hXK8w"),
      buyVariantFooterCallCta: (page: Page): Locator =>
        page.locator(".call-now.InfinityNumber"),
      stepOneFooterButton: (page: Page): Locator =>
        page.getByRole("button", { name: "Next" }),
    } as const;
