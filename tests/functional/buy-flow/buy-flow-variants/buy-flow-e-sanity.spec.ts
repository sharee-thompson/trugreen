import { test, expect } from "@playwright/test";
import { closeCookieBanner } from "../../../../utils";
import { getBaseUrl } from "../../../../utils/config";
import { credentials } from "../assets/env";

const urls = [
{name: "eBase", path: getBaseUrl("/buy-online-e")},
{name: "e1", path: getBaseUrl("/buy-online-e1")},
];


for (const {name, path} of urls) {

  test(`Buy-flow Varaint ${name} Sanity @sanity @buy-flow-e`, async ({ page }) => {

    const criticalCheck = async (label: string, check: () => Promise<void>) => {
      try {
        await check();
      } catch (error) {
        console.error(`${name} critical assertion failed: ${label}`);
        throw error;
      }
    };

    await page.goto(path);
    console.log(`Navigated to: ${getBaseUrl()}`);

    //   Step 1/5
    await criticalCheck("Step 1 title", async () => {
      await expect(page.locator(".stepIntro_title__2ayoT")).toHaveText(
        "Your golf course quality lawn starts here.",
      );
    });

    await closeCookieBanner(page);
    await page
      .getByRole("searchbox", { name: "Enter your home address" })
      .fill(credentials.optionalAddress);

    await page.locator("#svcEmail").fill(credentials.email);
    await page.getByRole("button", { name: "Next" }).click();

    //   Step 2/5

    await criticalCheck("Step 2 title", async () => {
      await expect(page.locator(".stepIntro_title__2ayoT")).toHaveText(
        "Is this your property?",
      );
    });

    await expect(page.locator(".address-bar__text")).toContainText(
      credentials.optionalAddress,
      {
        timeout: 10000,
      },
    );
    await page.waitForTimeout(3000);

    await expect(page.getByText("Front lawn")).toBeVisible();
    await expect(page.getByText("Back lawn")).toBeVisible();
    await expect(page.getByText("Side lawn (left)")).toBeVisible();
    await expect(page.getByText("Side lawn (right)")).toBeVisible();

    await page.getByRole("button", { name: "Build My Plan" }).click();

    //   Step 3/5

    await criticalCheck("Step 3 title", async () => {
      await expect(page.locator(".stepIntro_title__2ayoT")).toHaveText(
        "Now, choose a lawn care plan.",
      );
    });

    //   await page.locator('[name="value"]').fill('myUser');
    const truPro = page.locator('[class*="planCard_title"]', {
      hasText: "TruPro",
    });
    const truCore = page.locator('[class*="planCard_title"]', {
      hasText: "TruCore",
    });
    const truBasic = page.locator('[class*="planCard_title"]', {
      hasText: "TruBasic",
    });

    await expect(truPro).toBeVisible();
    await expect(truCore).toBeVisible();
    await expect(truBasic).toBeVisible();

    // await page.getByRole("group", { name: "2 /" }).locator("label").click();
    await page.locator("label").filter({ hasText: "Select TruPro℠" }).click();

    await page.getByRole("button", { name: "Select & Continue" }).click();

    //   Step 4/5

    await criticalCheck("Step 4 title", async () => {
      await expect(
        page.locator(
          ".stepIntro_title__2ayoT.stepIntro_step5Title__icyxy.pl-0",
        ),
      ).toHaveText("The final step to a pro-level lawn.");
    });

    await page.getByRole("radio", { name: "Pay Later", exact: true }).click();
    //   await page.getByRole("searchbox").click();
    await page.getByRole("searchbox").fill("asdf");
    await page.getByRole("button", { name: "Apply" }).click();
  

    await criticalCheck("Invalid coupon validation", async () => {
      await expect(page.getByText("Invalid Coupon Code")).toBeVisible();
    });

    await page.getByRole("button", { name: "Continue to Payment" }).click();

    //   Step 5/5

    await criticalCheck("Step 5 payment header", async () => {
      await expect(page.getByText("Enter Payment Info")).toHaveText(
        "Enter Payment Info",
      );
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
      await expect(page.locator(".stepIntro_title__2ayoT")).toHaveText(
        "Your golf course quality lawn starts here.",
      );
    });
  });
}
