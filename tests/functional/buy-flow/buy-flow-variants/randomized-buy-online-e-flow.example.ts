import { test, expect } from "@playwright/test";
import { closeCookieBanner } from "../../../../utils";
import { getBaseUrl } from "../../../../utils/config";
import { credentials } from "../assets/env";
import { getRandomAddress } from "../../../../utils";
import { step1EnterAddress, step1Components } from "./steps/step1-randomAddress";
import {
  step2LawnMeasurement,
  step2Components,
} from "./steps/step2-lawnMeasurement";
import { step3SelectPlan, step3Components } from "./steps/step3-plan-selection";
import {
  step4PaymentOption,
  step4Components,
} from "./steps/step4-payment-option";
import { step5ContactInfo, step5Components } from "./steps/step5-contact-info";
import { step6CreditCard, step6Components } from "./steps/step6-credit-card";
import { step7ReviewOrder, step7Components } from "./steps/step7-review";

const urls = [
  {name: "eBase", path: getBaseUrl("/buy-online-e")},
  {name: "e1", path: getBaseUrl("/buy-online-e1")},
  ];
  
  
  for (const {name, path} of urls) {
  test(`Buy-flow Variant ${name} Full @regression @buy-flow-e @buy-flow-variants`, async ({ page }) => {

  test.step("Step 1: Enter Address", async () => {
    await page.goto(path);
    console.log(`Navigated to: ${getBaseUrl()}`);
    await step1EnterAddress(page);
    for (const [name, getLocator] of Object.entries(step1Components)) {
      await expect(
        getLocator(page),
        `Expected "${name}" to be visible`,
      ).toBeVisible();
    }
  });

  test.step("Step 2: Lawn Measurement", async () => {
    await step2LawnMeasurement(page);

    for (const [name, getLocator] of Object.entries(step2Components)) {
      await expect(
        getLocator(page),
        `Expected "${name}" to be visible`,
      ).toBeVisible();
    }
  });

  test.step("Step 3: Plan Selection", async () => {
    await step3SelectPlan(page);

    for (const [name, getLocator] of Object.entries(step3Components)) {
      await expect(
        getLocator(page),
        `Expected "${name}" to be visible`,
      ).toBeVisible();
    }
  });

  test.step("Step 4: Payment Option", async () => {
    await step4PaymentOption(page);

    for (const [name, getLocator] of Object.entries(step4Components)) {
      await expect(
        getLocator(page),
        `Expected "${name}" to be visible`,
      ).toBeVisible();
    }
  });

  test.step("Step 5: Contact Info", async () => {
    await step5ContactInfo(page);

    for (const [name, getLocator] of Object.entries(step5Components)) {
      await expect(
        getLocator(page),
        `Expected "${name}" to be visible`,
      ).toBeVisible();
    }
  });

  test.step("Step 6: Credit Card", async () => {
    await step6CreditCard(page);

    for (const [name, getLocator] of Object.entries(step6Components)) {
      await expect(
        getLocator(page),
        `Expected "${name}" to be visible`,
      ).toBeVisible();
    }
  });

  test.step("Step 7: Review Order", async () => {
    await step7ReviewOrder(page);

    for (const [name, getLocator] of Object.entries(step7Components)) {
      await expect(
        getLocator(page),
        `Expected "${name}" to be visible`,
      ).toBeVisible();
    }
  });
});
}