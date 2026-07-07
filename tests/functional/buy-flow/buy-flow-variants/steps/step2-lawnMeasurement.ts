import { Page, Locator } from "@playwright/test";

export async function step2LawnMeasurement(page: Page) {
  await page.getByRole("button", { name: "Build My Plan" }).click();
}
    export const step2Components = {
      buyVariantHeader: (page: Page): Locator =>
        page.locator("#header-buy-flow"),
      stepTwoProgress: (page: Page): Locator =>
        page.getByText("Confirm Property"),
      stepTwoTitle: (page: Page): Locator =>
        page.getByText("Is this your property"),
      stepTwoEditAddress: (page: Page): Locator =>
        page.locator(".address-bar__link.green-link"),
      stepTwoMapWrong: (page: Page): Locator =>
        page.locator(".lawn-card-contact__link.green-link gfw-6"),
      buyVariantFooter: (page: Page): Locator =>
        page.locator(".footer_footer__hXK8w"),
      buyVariantFooterCallCta: (page: Page): Locator =>
        page.locator(".call-now.InfinityNumber"),
      buyVariantFooterBackButton: (page: Page): Locator =>
        page.locator(
          ".footer_btn-back__rcIx4.cta_cta--buy-online-footer__fSyLE.cta_cta--outline__L3bsY.cta_cta__klq2F.typography_button-text__ubQWS.typography_body-text-1-base___iCQd.typography_body-text-base__7XZyV",
        ),
      stepTwoFooterButton: (page: Page): Locator =>
        page.getByRole("button", { name: "Build My Plan" }),
    } as const;
