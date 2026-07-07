import { test, expect } from "@playwright/test";
import { getRandomAddress } from "../../../../utils";
import { getBaseUrl } from "../../../../utils";
import { credentials } from "../assets/env";

test.describe("Full Default Buy Flow Test for Random Address Generation", () => {
  test.skip(
    "Full Default Buy Online Flow using Random Address",
    { tag: "@experiment" },
    async ({ page }) => {
      const url = getBaseUrl("/buy-online");
      let address;
      let addressAccepted = false;
      const maxAttempts = 5;

      // Retry address entry until we get one in a serviceable area
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        address = getRandomAddress();
        console.log(
          `🏠 Attempt ${attempt}: Trying ${address.address1}, ${address.city}, ${address.state}`,
        );

        await page.goto(url);
        //Step 1
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

        await page.locator("#svcEmail").fill(credentials.email);
        await page.getByRole("button", { name: "Next" }).click();

        // Check if address is serviceable
        const notServiceable = page.getByText(
          "Unfortunately, we are unable to provide an online quote"
        )
        .or(page.getByText("large lawns like yours need personal attention"));

        const buildMyPlan = page.getByRole("button", { name: "Build My Plan" });

        // Wait for either outcome
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

      //Step 2
      await page.getByRole("button", { name: "Build My Plan" }).click();
      await page
        .getByText(/Select Tru(Pro|Core|Basic)℠/)
        .first()
        .click();
      await page.getByRole("button", { name: "Select & Continue" }).click();

      //Step 3
      await page.getByRole("radio", { name: "Pay Later", exact: true }).click();
      await page.getByRole("button", { name: "Continue to Payment" }).click();
      
      //Step 4
      await page.getByRole("textbox", { name: "First Name" }).click();
      await page
        .getByRole("textbox", { name: "First Name" })
        .fill(credentials.firstName);
      await page
        .getByRole("textbox", { name: "Last Name" })
        .fill(credentials.lastName);
      
        //Update for persistence assertion
      await page
        .getByRole("textbox", { name: "Phone Number Phone* Phone*" })
        .click();

      await page
        .getByRole("textbox", { name: "Phone Number Phone* Phone*" })
        .fill(credentials.phone);
      await page
        .locator("#choose-payment-opt")
        .getByRole("button", { name: "Continue" })
        .click();

      //Step 5
      await page
        .locator("#paymetric")
        .contentFrame()
        .getByRole("textbox", { name: "Cardholder Name" })
        .fill(credentials.cardHolderName);

      await page
        .locator("#paymetric")
        .contentFrame()
        .getByRole("textbox", { name: "Card Number" })
        .fill(credentials.creditCard);
      await page
        .locator("#paymetric")
        .contentFrame()
        .getByLabel("Expiration Month")
        .press("ArrowDown");
      await page
        .locator("#paymetric")
        .contentFrame()
        .getByLabel("Expiration Month")
        .selectOption("1");

      await page
        .locator("#paymetric")
        .contentFrame()
        .getByLabel("Expiration Year")
        .press("ArrowDown");
      await page
        .locator("#paymetric")
        .contentFrame()
        .getByLabel("Expiration Year")
        .selectOption("2028");
      await page.getByRole("button", { name: "Continue" }).nth(1).click();

      //Step 6
      await expect(page.getByText("Review Your Order")).toBeVisible();
    },
  );
});

