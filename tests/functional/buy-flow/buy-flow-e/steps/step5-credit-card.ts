import { Page } from "@playwright/test";

export async function step5CreditCard(page: Page) {
  await page
    .locator("#paymetric")
    .contentFrame()
    .getByRole("textbox", { name: "Cardholder Name" })
    .fill("Test Credit Card Field");

  await page
    .locator("#paymetric")
    .contentFrame()
    .getByRole("textbox", { name: "Card Number" })
    .fill("4111111111111111");

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
