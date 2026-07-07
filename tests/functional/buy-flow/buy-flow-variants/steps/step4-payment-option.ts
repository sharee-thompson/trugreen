import { Page, Locator } from "@playwright/test";

export async function step4PaymentOption(page: Page) {
  await page.getByRole("radio", { name: "Pay Later", exact: true }).click();
  await page.getByRole("button", { name: "Continue to Payment" }).click();
}

export const step4Components = {
  buyVariantHeader: (page: Page): Locator => page.locator("#header-buy-flow"),
  stepFourProgress: (page: Page): Locator =>
    page.getByText("Select Payment Plan"),
  stepFourTitle: (page: Page): Locator =>
    page.getByText("The final step to a pro-level lawn"),
  buyVariantFooter: (page: Page): Locator =>
    page.locator(".footer_footer__hXK8w"),
  buyVariantFooterCallCta: (page: Page): Locator =>
    page.locator(".call-now.InfinityNumber"),
  buyVariantFooterBackButton: (page: Page): Locator =>
    page.locator(
      ".footer_btn-back__rcIx4.cta_cta--buy-online-footer__fSyLE.cta_cta--outline__L3bsY.cta_cta__klq2F.typography_button-text__ubQWS.typography_body-text-1-base___iCQd.typography_body-text-base__7XZyV",
    ),
  stepFourFooterButton: (page: Page): Locator =>
    page.getByRole("button", { name: "Continue to Payment" }),
} as const;
