import { Page, expect, Locator } from "@playwright/test";

export async function step7ReviewOrder(page: Page) {
    await page.waitForLoadState("domcontentloaded");
  await expect(page.getByText("Review Your Order")).toBeVisible();
}

export const step7Components = {
  buyVariantHeader: (page: Page): Locator => page.locator("#header-buy-flow"),
  stepSevenDisclaimer: (page: Page): Locator =>
    page.locator(
      ".disclaimers_disclaimers__6zVfW.disclaimers_disclaimers--buy-online__BSnz5",
    ),
  buyVariantFooter: (page: Page): Locator =>
    page.locator(".footer_footer__hXK8w"),
  buyVariantFooterCallCta: (page: Page): Locator =>
    page.locator(".call-now.InfinityNumber"),
  buyVariantFooterBackButton: (page: Page): Locator =>
    page.locator(
      ".footer_btn-back__rcIx4.cta_cta--buy-online-footer__fSyLE.cta_cta--outline__L3bsY.cta_cta__klq2F.typography_button-text__ubQWS.typography_body-text-1-base___iCQd.typography_body-text-base__7XZyV",
    ),
  stepSevenFooterButton: (page: Page): Locator =>
    page.getByRole("button", { name: "Place Order" }),
} as const;
