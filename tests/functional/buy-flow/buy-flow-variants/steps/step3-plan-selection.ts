import { Page } from "@playwright/test";

export async function step3SelectPlan(page: Page) {
  await page.getByRole("button", { name: "Build My Plan" }).click();
  await page
    .getByText(/Select Tru(Pro|Core|Basic)℠/)
    .first()
    .click();
  await page.getByRole("button", { name: "Select & Continue" }).click();
}
