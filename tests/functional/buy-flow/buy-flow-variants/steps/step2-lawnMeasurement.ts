import { Page } from "@playwright/test";
/*Assert
Header
Title
Progress Ribbon
Disclaimer
Email error message
Footer*/

export async function step2LawnMeasurement(page: Page) {
  await page.getByRole("button", { name: "Build My Plan" }).click();
  await page
    .getByText(/Select Tru(Pro|Core|Basic)℠/)
    .first()
    .click();
  await page.getByRole("button", { name: "Select & Continue" }).click();
}
