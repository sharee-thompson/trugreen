import { Page, expect } from "@playwright/test";

export async function step6ReviewOrder(page: Page) {
    await page.waitForLoadState("domcontentloaded");
  await expect(page.getByText("Review Your Order")).toBeVisible();
}
