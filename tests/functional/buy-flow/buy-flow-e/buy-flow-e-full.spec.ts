import { test, expect, type Page } from "@playwright/test";
import { step1EnterAddress } from "../steps/step1-address";
import { step2SelectPlan } from "../steps/step2-plan-selection";
import { step3PaymentOption } from "../steps/step3-payment-option";
import { step4ContactInfo } from "../steps/step4-contact-info";
import { step5CreditCard } from "../steps/step5-credit-card";
import { step6ReviewOrder } from "../steps/step6-review";

test.describe("E Buy Flow", { tag: "@buy-flow-all" }, () => {
  // Serial mode: tests share state and run in order
  test.describe.configure({ mode: "serial" });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("Step 1: Enter Address", { tag: "@buy-flow-1" }, async () => {
    await step1EnterAddress(page);
  });

  test("Step 2: Select Plan", { tag: "@buy-flow-2" }, async () => {
    await step2SelectPlan(page);
  });

  test("Step 3: Payment Option", { tag: "@buy-flow-3" }, async () => {
    await step3PaymentOption(page);
  });

  test("Step 4: Contact Info", { tag: "@buy-flow-4" }, async () => {
    await step4ContactInfo(page);
  });

  test("Step 5: Credit Card", { tag: "@buy-flow-5" }, async () => {
    await step5CreditCard(page);
  });

  test("Step 6: Review Order", { tag: "@buy-flow-6" }, async () => {
    await step6ReviewOrder(page);
  });
});
