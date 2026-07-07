import { Page, Locator } from "@playwright/test";

export async function step3SelectPlan(page: Page) {
  await page
    .getByText(/Select Tru(Pro|Core|Basic)℠/)
    .first()
    .click();
  await page.getByRole("button", { name: "Select & Continue" }).click();
}

export const step3Components = {
  buyVariantHeader: (page: Page): Locator => page.locator("#header-buy-flow"),
  stepThreeProgress: (page: Page): Locator => page.getByText("Choose Plan"),
  stepThreeTitle: (page: Page): Locator =>
    page.getByText("Now, choose a lawn care plan"),
  stepThreeAddOns: (page: Page): Locator =>
    page.getByText("Popular add-ons recommended by your local pros"),
  stepThreeDisclaimer: (page: Page): Locator =>
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
  stepThreeFooterButton: (page: Page): Locator =>
    page.getByRole("button", { name: "Select & Continue" }),
} as const;
