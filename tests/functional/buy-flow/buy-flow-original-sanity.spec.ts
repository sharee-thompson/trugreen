import { test, expect } from "@playwright/test";

import { getBaseUrl } from "../../../utils/config";
import { closeCookieBanner } from "../../../utils/helpers";

const url = getBaseUrl("/buy-online");

test(`buy-flow (buy-online) @buy-flow-original @functional`, async ({
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

  const cookieBanner = page.getByRole("button", {
    name: "Accept All Cookies",
  });
  const isEVariant = () => /\/buy-online-e/.test(page.url());
  const dismissCookies = async () => {
    await closeCookieBanner(page);

    if ((await cookieBanner.count()) > 0) {
      await cookieBanner.click({ timeout: 2000 }).catch(() => {});
    }
  };

  await page.goto(url);
  console.log(`Navigated to: ${url}`);

  // Step 1 - Property Details
  await criticalCheck("Step 1 title", async () => {
    await expect(
      // page.locator('[class*="propertyDetails_card-title"]'),
      page.locator(".propertyDetails_card-title__Wc3uQ h4"),
    ).toHaveText("Your golf course quality lawn starts here.");
  });

  await dismissCookies();

  const address = "3500 Cobble St, Nashville TN 37211";
  const addressInput = page.getByRole("searchbox", {
    name: "Enter your home address",
  });
  const emailInput = page.locator("#svcEmail");
  const addressSuggestion = page.locator(".addressAutoComplete div").first();
  const nextButton = page.locator("#next");

  await addressInput.fill(address);

  // Keep the original fill-only behavior for comparison until mobile is re-tested.
  // await page
  //   .getByRole("searchbox", { name: "Enter your home address" })
  //   .fill(address);

  await addressSuggestion.waitFor({ state: "visible", timeout: 8000 });
  await addressSuggestion.click();

  await page
    .waitForURL(/\/buy-online-e(?:\?|$)/, { timeout: 5000 })
    .catch(() => {});
  await page.waitForLoadState("domcontentloaded").catch(() => {});

  if (isEVariant()) {
    await criticalCheck("Redirected E Step 1 title", async () => {
      await expect(page.locator(".stepIntro_title__2ayoT")).toHaveText(
        "Your golf course quality lawn starts here.",
      );
    });

    const redirectedAddressInput = page.getByRole("searchbox", {
      name: "Enter your home address",
    });
    await redirectedAddressInput.fill(address);

    const redirectedAddressSuggestion = page
      .locator(".addressAutoComplete div")
      .first();
    if (await redirectedAddressSuggestion.isVisible().catch(() => false)) {
      await redirectedAddressSuggestion.click();
    }
  }

  // Keep the original keyboard-only selection path for comparison until mobile is re-tested.
  // await addressInput.press("ArrowDown").catch(() => {});
  // await addressInput.press("Enter").catch(() => {});

  // Wait for autocomplete suggestion and select first result
  //   const suggestion = page.locator(".mt-1 addressAutoComplete").first();
  //   await suggestion.waitFor({ state: "visible", timeout: 8000 });
  //   await suggestion.click();

  await emailInput.fill("asdf.com");

  await page
    .waitForURL(/\/buy-online-e(?:\?|$)/, { timeout: 3000 })
    .catch(() => {});
  await page.waitForLoadState("domcontentloaded").catch(() => {});

  if (isEVariant()) {
    const redirectedAddressInput = page.getByRole("searchbox", {
      name: "Enter your home address",
    });
    const redirectedEmailInput = page.locator("#svcEmail");
    if ((await redirectedAddressInput.inputValue()) !== address) {
      await redirectedAddressInput.fill(address);
      const redirectedAddressSuggestion = page
        .locator(".addressAutoComplete div")
        .first();
      if (await redirectedAddressSuggestion.isVisible().catch(() => false)) {
        await redirectedAddressSuggestion.click();
      }
    }
    if ((await redirectedEmailInput.inputValue()) !== "asdf.com") {
      await redirectedEmailInput.fill("asdf.com");
    }
  }

  await dismissCookies();

  await nextButton.waitFor({ state: "attached" });
  await nextButton.waitFor({ state: "visible" });
  await dismissCookies();
  await expect(nextButton).toBeEnabled({ timeout: 15000 });
  await nextButton.click();

  await criticalCheck("Invalid email validation", async () => {
    await expect(page.getByText("*Invalid Email")).toBeVisible();
  });

  await emailInput.fill("vml.aq.tester@gmil.com");
  await emailInput.blur();

  await dismissCookies();

  // Keep the original immediate click behavior for comparison until mobile is re-tested.
  // await page.getByRole("button", { name: "Next" }).click();

  await expect(page.getByText("*Invalid Email")).toBeHidden();
  await dismissCookies();
  await expect(nextButton).toBeEnabled({ timeout: 15000 });
  await nextButton.click();

  // Step 2 - Lawn Measurement
  await criticalCheck("Step 2 title", async () => {
    const step2Title = isEVariant()
      ? page.locator(".stepIntro_title__2ayoT")
      : page.locator(".card-title").first();

    await expect(step2Title).toHaveText("Is this your property?");
  });

  await expect(
    isEVariant()
      ? page.locator(".address-bar__text")
      : page.locator(".address-info"),
  ).toContainText("3500 Cobble St", {
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

  await dismissCookies();

  if (isEVariant()) {
    const buildMyPlanButton = page.getByRole("button", {
      name: "Build My Plan",
    });
    await expect(buildMyPlanButton).toBeEnabled({ timeout: 15000 });
    await buildMyPlanButton.click();
  } else {
    const step2NextButton = page.locator("#next");
    await expect(step2NextButton).toBeEnabled({ timeout: 15000 });
    await step2NextButton.click();
    await expect(page.locator(".card-title").first()).not.toHaveText(
      "Is this your property?",
      { timeout: 15000 },
    );
  }

  // Step 3 - Choose Plan
  await criticalCheck("Step 3 title", async () => {
    if (isEVariant()) {
      await expect(page.locator(".stepIntro_title__2ayoT")).toHaveText(
        "Now, choose a lawn care plan.",
        { timeout: 15000 },
      );
      return;
    }

    await expect(page.locator(".card-title").first()).toHaveText(
      "Now, choose a lawn care plan to lock in your online savings.",
      { timeout: 15000 },
    );
  });

  const truPro = isEVariant()
    ? page.locator('[class*="planCard_title"]', { hasText: "TruPro" })
    : page.locator("h3", { hasText: "TruPro" });
  const truCore = isEVariant()
    ? page.locator('[class*="planCard_title"]', { hasText: "TruCore" })
    : page.locator("h3", { hasText: "TruCore" });
  const truBasic = isEVariant()
    ? page.locator('[class*="planCard_title"]', { hasText: "TruBasic" })
    : page.locator("h3", { hasText: "TruBasic" });

  await expect(truPro).toBeVisible();
  await expect(truCore).toBeVisible();
  await expect(truBasic).toBeVisible();

  if (isEVariant()) {
    await page.locator("label").filter({ hasText: "Select TruPro℠" }).click();
  } else {
    await page
      .locator("label.form-check-label")
      .filter({ hasText: "TruPro" })
      .click();
  }

  await dismissCookies();
  await page
    .getByRole("button", {
      name: isEVariant() ? "Select & Continue" : "See Payment Options",
    })
    .click();

  // Add-ons step
  if (!isEVariant()) {
    await criticalCheck("Add-ons title", async () => {
      await expect(page.locator(".card-title").first()).toHaveText(
        "Take your Pro treatment to the next level.",
      );
    });

    // await page.locator("#serviceItem903399 .form-check-input").click();

    await page.getByRole("button", { name: "See Payment Options" }).click();
  }

  // Step 4 - Payment Details
  await criticalCheck("Step 4 title", async () => {
    if (isEVariant()) {
      await expect(
        page.locator(
          ".stepIntro_title__2ayoT.stepIntro_step5Title__icyxy.pl-0",
        ),
      ).toHaveText("The final step to a pro-level lawn.");
      return;
    }

    await expect(page.locator(".card-title").first()).toHaveText(
      "The final step to a pro-level lawn.",
    );
  });

  if (isEVariant()) {
    await page.getByRole("radio", { name: "Pay Later", exact: true }).click();
  } else {
    await page.locator("#easypay").click();
  }
  await page.getByRole("searchbox").fill("asdf");
  await page.getByRole("button", { name: "Apply" }).click();
  await dismissCookies();

  await criticalCheck("Invalid coupon validation", async () => {
    await expect(page.getByText("Invalid Coupon Code").first()).toBeVisible({
      timeout: 10000,
    });
  });

  await page
    .getByRole("button", {
      name: isEVariant() ? "Continue to Payment" : "Continue To Payment",
    })
    .click();

  if (isEVariant()) {
    await criticalCheck("Step 5 payment header", async () => {
      await expect(page.getByText("Enter Payment Info")).toHaveText(
        "Enter Payment Info",
      );
    });
  } else {
    await criticalCheck("Checkout form validation reached", async () => {
      await expect(
        page
          .locator(".errorMsg.bg-danger")
          .filter({ hasText: "First Name" })
          .first(),
      ).toBeVisible();
    });
  }

  await page.getByRole("button", { name: "Back" }).click();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Back" }).click();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Back" }).click();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Back" }).click();
  await page.waitForTimeout(1000);

  await criticalCheck("Return to Step 1 title", async () => {
    if (isEVariant()) {
      await expect(page.locator(".stepIntro_title__2ayoT")).toHaveText(
        "Your golf course quality lawn starts here.",
      );
      return;
    }

    await expect(
      page.locator('[class*="propertyDetails_card-title"]'),
    ).toHaveText("Your golf course quality lawn starts here.");
  });
});
