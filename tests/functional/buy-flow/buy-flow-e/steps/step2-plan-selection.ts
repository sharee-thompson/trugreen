import { Page } from "@playwright/test";

//E Variant has the button Build my Plan, where the original does not

export async function step2SelectPlan(page: Page) {
  await page.getByRole("button", { name: "Build My Plan" }).click();
  //Technically the next step, in common with original variant
  await page
    .getByText(/Select Tru(Pro|Core|Basic)℠/)
    .first()
    .click();
  await page.getByRole("button", { name: "Select & Continue" }).click();
}
