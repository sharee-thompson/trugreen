import { Page } from "@playwright/test";

export async function step3PaymentOption(page: Page) {
  await page.getByRole("radio", { name: "Pay Later", exact: true }).click();
  await page.getByRole("button", { name: "Continue to Payment" }).click();
}
