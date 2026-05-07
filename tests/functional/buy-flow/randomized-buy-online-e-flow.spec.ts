import { test, expect } from "@playwright/test";
import { getRandomAddress } from "../../../utils";

test.describe("Full E Buy Flow Test for Rando Address Generation", () => {
  test(
    "Regular Flow to chunk out later",
    { tag: "@experiment" },
    async ({ page }) => {
      //const address = getRandomAddress();
      let address;
      let addressAccepted = false;
      const maxAttempts = 5;

      // Retry address entry until we get one in a serviceable area
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        address = getRandomAddress();
        console.log(
          `🏠 Attempt ${attempt}: Trying ${address.address1}, ${address.city}, ${address.state}`,
        );

        await page.goto("https://qa-trugreen.com/buy-online-e");
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

        await page.locator("#svcEmail").fill("cheeseburger@burger.com");
        await page.getByRole("button", { name: "Next" }).click();

        // Check if address is serviceable
        const notServiceable = page.getByText(
          "Unfortunately, we are unable to provide an online quote",
        );
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
      await page.getByText("Select TruBasic℠").click();
      await page.getByRole("button", { name: "Select & Continue" }).click();

      //Step 3
      await page.getByRole("radio", { name: "Pay Later", exact: true }).click();
      await page.getByRole("button", { name: "Continue to Payment" }).click();
      //Step 4
      await page.getByRole("textbox", { name: "First Name" }).click();
      await page
        .getByRole("textbox", { name: "First Name" })
        .fill("Test paymentDetails");
      await page
        .getByRole("textbox", { name: "Last Name" })
        .fill("AddressPerisists");
      //Update for persistence assertion
      await page
        .getByRole("textbox", { name: "Phone Number Phone* Phone*" })
        .click();

      //Negative assertion
      /*await page
        .getByRole("textbox", { name: "Phone Number Phone* Phone*" })
        .fill("(913)-100-1234");
      await page
        .locator("#choose-payment-opt")
        .getByRole("button", { name: "Continue" })
        .click();
      await expect(page.locator("body")).toHaveText("Invalid Phone Number");

      await page
        .getByRole("textbox", { name: "Phone Number Phone* Phone*" })
        .click();*/
      await page
        .getByRole("textbox", { name: "Phone Number Phone* Phone*" })
        .fill("(816)-820-0853");
      await page
        .locator("#choose-payment-opt")
        .getByRole("button", { name: "Continue" })
        .click();

      //Step 5
      await page
        .locator("#paymetric")
        .contentFrame()
        .getByRole("textbox", { name: "Cardholder Name" })
        .click();
      await page
        .locator("#paymetric")
        .contentFrame()
        .getByRole("textbox", { name: "Cardholder Name" })
        .fill("Test Credit Card Field");

      //Negative assertion
      await page
        .locator("#paymetric")
        .contentFrame()
        .getByRole("textbox", { name: "Card Number" })
        .fill("8888888888888888");

      await expect(page.locator("#paymetric")).toHaveText(
        "Invalid Card Number",
      );

      await page
        .locator("#paymetric")
        .contentFrame()
        .getByRole("textbox", { name: "Card Number" })
        .fill("4111111111111111");
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
      /*await page.getByText("Subtotal").click();
      await page.getByText("Taxes").click();
      await page.getByText("Due Today").click();*/
    },
  );

  test.skip("Step 2", { tag: "@step1" }, async ({ page }) => {
    //
  });
});

/* CODEGEN FOR SKELETION TEST

await page.goto('https://qa-trugreen.com/buy-online-e');
await page.getByRole('searchbox', { name: 'Enter your home address' }).click();
await page.getByRole('searchbox', { name: 'Enter your home address' }).fill('5621 foxr');
await page.getByRole('searchbox', { name: 'Enter your home address' }).press('ArrowDown');
await page.getByRole('searchbox', { name: 'Enter your home address' }).press('Enter');
await page.getByRole('searchbox', { name: 'Enter your home address' }).press('Tab');
await page.locator('#svcEmail').fill('cheeseburger@burger.com');
await page.getByRole('button', { name: 'Next' }).click();

await page.getByRole('button', { name: 'Build My Plan' }).click();
await page.getByText('Select TruBasic℠').click();
await page.getByRole('button', { name: 'Select & Continue' }).click();

await page.getByRole('radio', { name: 'Pay Later', exact: true }).click();
await page.getByRole('button', { name: 'Continue to Payment' }).click();

await page.getByRole('textbox', { name: 'First Name' }).click();
await page.getByRole('textbox', { name: 'First Name' }).fill('Test paymentDetails');
await page.getByRole('textbox', { name: 'First Name' }).press('Tab');
await page.getByRole('textbox', { name: 'Last Name' }).fill('AddressPerisists');
await page.getByRole('textbox', { name: 'Phone Number Phone* Phone*' }).click();

//Negative assertion
await page.getByRole('textbox', { name: 'Phone Number Phone* Phone*' }).fill('(913)-100-1234');
await page.locator('#choose-payment-opt').getByRole('button', { name: 'Continue' }).click();
await page.getByRole('textbox', { name: 'Phone Number Phone* Phone*' }).click();
await page.locator('#choose-payment-opt').getByText('Invalid Phone Number').click();

await page.getByRole('textbox', { name: 'Phone Number Phone* Phone*' }).click();
await page.getByRole('textbox', { name: 'Phone Number Phone* Phone*' }).fill('(913)-285-5730');
await page.getByRole('textbox', { name: 'Phone Number Phone* Phone*' }).press('Tab');
await page.locator('#choose-payment-opt').getByRole('button', { name: 'Continue' }).click();

await page.locator('#paymetric').contentFrame().getByRole('textbox', { name: 'Cardholder Name' }).click();
await page.locator('#paymetric').contentFrame().getByRole('textbox', { name: 'Cardholder Name' }).fill('Test Credit Card Field');

//Negative assertion
await page.locator('#paymetric').contentFrame().getByRole('textbox', { name: 'Card Number' }).fill('8888888888888888');
await page.locator('#paymetric').contentFrame().getByRole('textbox', { name: 'Card Number' }).press('Tab');

await page.locator('#paymetric').contentFrame().getByRole('textbox', { name: 'Card Number' }).fill('4111111111111111');
await page.locator('#paymetric').contentFrame().getByRole('textbox', { name: 'Card Number' }).press('Tab');
await page.locator('#paymetric').contentFrame().getByLabel('Expiration Month').press('ArrowDown');
await page.locator('#paymetric').contentFrame().getByLabel('Expiration Month').selectOption('1');
await page.locator('#paymetric').contentFrame().getByLabel('Expiration Month').press('Tab');
await page.locator('#paymetric').contentFrame().getByLabel('Expiration Year').press('ArrowDown');
await page.locator('#paymetric').contentFrame().getByLabel('Expiration Year').selectOption('2028');
await page.getByRole('button', { name: 'Continue' }).nth(1).click();

await page.getByText('Review Your Order').click();
await page.getByText('Subtotal').click();
await page.getByText('Taxes').click();
await page.getByText('Due Today').click();*/
