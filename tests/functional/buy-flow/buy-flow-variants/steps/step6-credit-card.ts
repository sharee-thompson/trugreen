import { Page, Locator } from "@playwright/test";
import { credentials } from "../../assets/env";

export async function step6CreditCard(page: Page) {
  await page
    .locator("#paymetric")
    .contentFrame()
    .getByRole("textbox", { name: "Cardholder Name" })
    .fill(credentials.cardHolderName);

  await page
    .locator("#paymetric")
    .contentFrame()
    .getByRole("textbox", { name: "Card Number" })
    .fill(credentials.creditCard);

  await page
    .locator("#paymetric")
    .contentFrame()
    .getByLabel("Expiration Month")
    .selectOption("1");

  await page
    .locator("#paymetric")
    .contentFrame()
    .getByLabel("Expiration Year")
    .selectOption("2028");

  await page.getByRole("button", { name: "Continue" }).nth(1).click();
}

export const step6Components = {
  buyVariantHeader: (page: Page): Locator => page.locator("#header-buy-flow"),
  buyVariantFooter: (page: Page): Locator =>
    page.locator(".footer_footer__hXK8w"),
  buyVariantFooterCallCta: (page: Page): Locator =>
    page.locator(".call-now.InfinityNumber"),
  buyVariantFooterBackButton: (page: Page): Locator =>
    page.locator(
      ".footer_btn-back__rcIx4.cta_cta--buy-online-footer__fSyLE.cta_cta--outline__L3bsY.cta_cta__klq2F.typography_button-text__ubQWS.typography_body-text-1-base___iCQd.typography_body-text-base__7XZyV",
    )
} as const;
