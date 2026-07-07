import { Page, Locator, expect } from "@playwright/test";
import { credentials } from "../../assets/env";


export async function step5ContactInfo(page: Page) {
  //Make error messages pop
  await page.getByRole("textbox", { name: "First Name" }).click();
  await page.getByRole("textbox", { name: "Last Name" }).click();
  await page
    .getByRole("textbox", { name: "Phone Number Phone* Phone*" })
    .click();
  await page
    .locator("#choose-payment-opt")
    .getByRole("button", { name: "Continue" })
    .click();  

  const firstNameError = page.getByText("First Name is required");  
  const lastNameError = page.getByText("Last Name is required");  
  const phoneError = page.getByText("Invalid Phone Number");  

  await expect (firstNameError).toBeVisible();
  await expect (lastNameError).toBeVisible();  
  await expect (phoneError).toBeVisible();
  
    await page
      .getByRole("textbox", { name: "First Name" })
      .fill(credentials.firstName);
    await page
      .getByRole("textbox", { name: "Last Name" })
      .fill(credentials.lastName);
    await page
        .getByRole("textbox", { name: "Phone Number Phone* Phone*" })
        .fill(credentials.phone);

}
export const step5Components = {
  buyVariantHeader: (page: Page): Locator => page.locator("#header-buy-flow"),
  stepFiveProgress: (page: Page): Locator =>
    page.getByText("Enter Payment Info"),
  stepFiveTitle: (page: Page): Locator =>
    page.getByText("Service Address"),
  buyVariantFooter: (page: Page): Locator =>
    page.locator(".footer_footer__hXK8w"),
  buyVariantFooterCallCta: (page: Page): Locator =>
    page.locator(".call-now.InfinityNumber"),
  buyVariantFooterBackButton: (page: Page): Locator =>
    page.locator(
      ".footer_btn-back__rcIx4.cta_cta--buy-online-footer__fSyLE.cta_cta--outline__L3bsY.cta_cta__klq2F.typography_button-text__ubQWS.typography_body-text-1-base___iCQd.typography_body-text-base__7XZyV",
    )
} as const;

