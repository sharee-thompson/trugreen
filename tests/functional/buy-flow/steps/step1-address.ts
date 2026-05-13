import { Page, expect } from "@playwright/test";
import { getRandomAddress } from "../../../../utils";

export async function step1EnterAddress(page: Page) {
  let address;
  let addressAccepted = false;
  const maxAttempts = 5;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    address = getRandomAddress();
    console.log(
      `🏠 Attempt ${attempt}: Trying ${address.address1}, ${address.city}, ${address.state}`,
    );

    await page.goto("https://qa-trugreen.com/buy-online-e");

    await page
      .getByRole("searchbox", { name: "Enter your home address" })
      .click();
    await page
      .getByRole("searchbox", { name: "Enter your home address" })
      .fill(
        `${address.address1}, ${address.city}, ${address.state} ${address.postalCode}`,
      );
    await page.waitForTimeout(1500);
    await page
      .getByRole("searchbox", { name: "Enter your home address" })
      .press("ArrowDown");
    await page
      .getByRole("searchbox", { name: "Enter your home address" })
      .press("Enter");

    await page.locator("#svcEmail").fill("cheeseburger@burger.com");
    await page.waitForLoadState("domcontentloaded");
    await page.getByRole("button", { name: "Next" }).click();

    // Check if address is serviceable
    const notServiceable = page
      .getByText("Unfortunately, we are unable to provide an online quote")
      .or(page.getByText("large lawns like yours need personal attention"));
    const buildMyPlan = page.getByRole("button", { name: "Build My Plan" });

    await expect(notServiceable.or(buildMyPlan).first()).toBeVisible({
      timeout: 10000,
    });

    if (await buildMyPlan.isVisible()) {
      addressAccepted = true;
      console.log(`✅ Address accepted on attempt ${attempt}`);
      break;
    }

    console.warn(`⚠️ Address not serviceable, trying another...`);
  }

  if (!addressAccepted) {
    throw new Error(
      `Failed to find a serviceable address after ${maxAttempts} attempts`,
    );
  }
}
