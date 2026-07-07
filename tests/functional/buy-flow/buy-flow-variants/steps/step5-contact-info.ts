import { Page } from "@playwright/test";

export async function step5ContactInfo(page: Page) {
  await page.getByRole("textbox", { name: "First Name" }).click();
  await page
    .getByRole("textbox", { name: "First Name" })
    .fill("Test paymentDetails");
  await page
    .getByRole("textbox", { name: "Last Name" })
    .fill("AddressPerisists");

  await page
    .getByRole("textbox", { name: "Phone Number Phone* Phone*" })
    .click();
  await page
    .getByRole("textbox", { name: "Phone Number Phone* Phone*" })
    .fill("(816)-820-0853");
  await page
    .locator("#choose-payment-opt")
    .getByRole("button", { name: "Continue" })
    .click();
}
