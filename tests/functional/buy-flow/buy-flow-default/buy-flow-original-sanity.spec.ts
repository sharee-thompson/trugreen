import { test, expect } from "@playwright/test";
import { credentials } from "../assets/env";
import { getBaseUrl } from "../../../../utils/config";
import { closeCookieBanner } from "../../../../utils";

const url = getBaseUrl("/buy-online");

test(`buy-flow (buy-online) @buy-flow-original @functional @sanity`, async ({
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

  await page.locator("#svcEmail").fill(credentials.email);

  const nextButton = page.getByRole("button", { name: "Next" });
  await nextButton.waitFor({ state: "attached" });
  await nextButton.waitFor({ state: "visible" });
  await nextButton.scrollIntoViewIfNeeded();
  await nextButton.click();

  await page.getByRole("button", { name: "Next" }).click();

  // Step 2 - Lawn Measurement
  await criticalCheck("Step 2 title", async () => {
    await expect(page.locator(".card-title").first()).toHaveText(
      "Is this your property?",
    );
  });

  await expect(page.locator(".address-info")).toHaveCount(1);

  await page.getByRole("button", { name: "Next" }).click();

  // Step 3 - Choose Plan
  await criticalCheck("Step 3 title", async () => {
    await page.waitForSelector(".card-title");
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
