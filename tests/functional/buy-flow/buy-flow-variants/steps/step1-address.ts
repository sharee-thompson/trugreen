import { Page, expect } from "@playwright/test";
import { credentials } from "../../assets/env";

export async function step1EnterAddress(page: Page) {

    await page
      .getByRole("searchbox", { name: "Enter your home address" })
      .click();
    await page
      .getByRole("searchbox", { name: "Enter your home address" })
      .fill(credentials.optionalAddress
      );
    await page.waitForTimeout(1500);
    await page
      .getByRole("searchbox", { name: "Enter your home address" })
      .press("ArrowDown");
    await page
      .getByRole("searchbox", { name: "Enter your home address" })
      .press("Enter");

    await page.locator("#svcEmail").fill(credentials.email);
    await page.waitForLoadState("domcontentloaded");
    await page.getByRole("button", { name: "Next" }).click();
    }
