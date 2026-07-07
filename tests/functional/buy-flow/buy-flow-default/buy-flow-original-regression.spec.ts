import { test, expect } from "@playwright/test";
import { closeCookieBanner } from "../../../../utils";
import { getBaseUrl } from "../../../../utils/config";
import { credentials } from "../assets/env";

const url = getBaseUrl("/buy-online");

test(`buy-flow (buy-online) @buy-flow-original @functional @regression`, async ({
  page,
}) => {
  test.slow();
  const logPrefix = `[buy-flow][buy-online]`;

  const criticalCheck = async (label: string, check: () => Promise<void>) => {
    try {
      await check();
    } catch (error) {
      console.error(`${logPrefix} critical assertion failed: ${label}`);
      throw error;
    }
  };

  await page.goto(url);
  console.log(`Navigated to: ${url}`);

  // Step 1 - Property Details
  await criticalCheck("Step 1 title", async () => {
    await expect(
      page.locator('[class*="propertyDetails_card-title"]'),
    ).toHaveText("Your golf course quality lawn starts here.");
  });

  await closeCookieBanner(page);
  await page
    .getByRole("searchbox", { name: "Enter your home address" })
    .fill(credentials.originalAddress);

  // Wait for autocomplete suggestion and select first result
     const suggestion = page.locator(".mt-1.addressAutoComplete").first();
     await suggestion.waitFor({ state: "visible", timeout: 8000 });
     await suggestion.click();

  //Error text validation step
  await page.locator("#svcEmail").fill("asdf.com");


  const nextButton = page.getByRole("button", { name: "Next" });
  await nextButton.waitFor({ state: "attached" });
  await nextButton.waitFor({ state: "visible" });
  await nextButton.scrollIntoViewIfNeeded();
  await nextButton.click();

  await criticalCheck("Invalid email validation", async () => {
    await expect(page.getByText("*Invalid Email")).toBeVisible();
  });

  await page.locator("#svcEmail").fill(credentials.email);

  await page.getByRole("button", { name: "Next" }).click();

  // Step 2 - Lawn Measurement
  await criticalCheck("Step 2 title", async () => {
    await expect(page.locator(".card-title").first()).toHaveText(
      "Is this your property?",
    );
  });

  //Strict assertion for using originalAddress

  await expect(page.locator(".address-info")).toContainText("3500 Cobble St", {
    timeout: 10000,
  });

  await page.waitForTimeout(3000);
  for (let i = 0; i < 4; i++) {
    const checkbox = page.locator(`#lawnMeasure_${i}_chk`);
    await checkbox.uncheck();
    await expect(checkbox).toHaveValue("false");

    await checkbox.check();
    await expect(checkbox).toHaveValue(String(i + 1));
  }

  await expect(page.getByText("Front lawn")).toBeVisible();
  await expect(page.getByText("Back lawn")).toBeVisible();
  await expect(page.getByText("Side lawn (left)")).toBeVisible();
  await expect(page.getByText("Side lawn (right)")).toBeVisible();


  await page.getByRole("button", { name: "Next" }).click();

  // Step 3 - Choose Plan
  await criticalCheck("Step 3 title", async () => {
    await expect(page.locator(".card-title").first()).toHaveText(
      "Now, choose a lawn care plan to lock in your online savings.",
    );
  });

  const truPro = page.locator("h3", { hasText: "TruPro" });
  const truCore = page.locator("h3", { hasText: "TruCore" });
  const truBasic = page.locator("h3", { hasText: "TruBasic" });

  await expect(truPro).toBeVisible();
  await expect(truCore).toBeVisible();
  await expect(truBasic).toBeVisible();

  await page
    .locator("label.form-check-label")
    .filter({ hasText: "TruPro" })
    .click();

  await page.getByRole("button", { name: "See Payment Options" }).click();

  // Add-ons step
  await criticalCheck("Add-ons title", async () => {
    await expect(page.locator(".card-title").first()).toHaveText(
      "Take your Pro treatment to the next level.",
    );
  });

  await page.getByRole("button", { name: "See Payment Options" }).click();

  // Step 4 - Payment Details
  await criticalCheck("Step 4 title", async () => {
    await expect(page.locator(".card-title").first()).toHaveText(
      "The final step to a pro-level lawn.",
    );
  });

  //Coupon code error text validation
  await page.locator("#easypay").click();
  await page.getByRole("searchbox").fill("asdf");
  await page.getByRole("button", { name: "Apply" }).click();


  await criticalCheck("Invalid coupon validation", async () => {
    await expect(page.getByText("Invalid Coupon Code").first()).toBeVisible({
      timeout: 10000,
    });
  });

  await page.getByRole("button", { name: "Continue To Payment" }).click();

  await criticalCheck("Checkout form validation reached", async () => {
    await expect(
      page
        .locator(".errorMsg.bg-danger")
        .filter({ hasText: "First Name" })
        .first(),
    ).toBeVisible();
  });

  await page.getByRole("button", { name: "Back" }).click();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Back" }).click();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Back" }).click();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Back" }).click();
  await page.waitForTimeout(1000);

  await criticalCheck("Return to Step 1 title", async () => {
    await expect(
      page.locator('[class*="propertyDetails_card-title"]'),
    ).toHaveText("Your golf course quality lawn starts here.");
  });
});
