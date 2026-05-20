import { test, expect } from "@playwright/test";

import { getBaseUrl } from "../../../utils/config";
const urls = [
  // getBaseUrl("/buy-online-e"),
  getBaseUrl("/buy-online-e1"),
];

for (const url of urls) {
  const pathName = new URL(url).pathname.replace(/\//g, "-").replace(/^-/, "");

  test(`buy-flow (${pathName}) @buy-flow-e`, async ({ page }) => {
    test.slow();
    const logPrefix = `[buy-flow][${pathName}]`;

    const criticalCheck = async (label: string, check: () => Promise<void>) => {
      try {
        await check();
      } catch (error) {
        console.error(`${logPrefix} critical assertion failed: ${label}`);
        throw error;
      }
    };

    await page.goto(url);
    console.log(`Navigated to: ${getBaseUrl()}`);

    //   Step 1/5
    await criticalCheck("Step 1 title", async () => {
      await expect(page.locator(".stepIntro_title__2ayoT")).toHaveText(
        "Your golf course quality lawn starts here.",
      );
    });

    const cookieBanner = page.getByRole("button", {
      name: "Accept All Cookies",
    });
    if ((await cookieBanner.count()) > 0) {
      await cookieBanner.click();
    }

    const address = "3500 Cobble St, Nashville TN 37211";
    await page
      .getByRole("searchbox", { name: "Enter your home address" })
      .fill(address);
    await page.locator("#svcEmail").fill("asdf.com");

    if ((await cookieBanner.count()) > 0) {
      await cookieBanner.click();
    }
    const nextButton = page.getByRole("button", { name: "Next" });
    await nextButton.waitFor({ state: "attached" });
    await nextButton.waitFor({ state: "visible" });
    if ((await cookieBanner.count()) > 0) {
      await cookieBanner.click();
    }
    await nextButton.scrollIntoViewIfNeeded();
    await nextButton.click();
    await criticalCheck("Invalid email validation", async () => {
      await expect(page.getByText("*Invalid Email")).toBeVisible();
    });
    //   await page.getByText('Cobble St, Nashville TN 37211').click();
    //   await page.locator('#svcEmail').click();
    await page.locator("#svcEmail").fill("vml.aq.tester@gmil.com");

    if ((await cookieBanner.count()) > 0) {
      await cookieBanner.click();
    }

    await page.getByRole("button", { name: "Next" }).click();

    //   Step 2/5

    await criticalCheck("Step 2 title", async () => {
      await expect(page.locator(".stepIntro_title__2ayoT")).toHaveText(
        "Is this your property?",
      );
    });

    await expect(page.locator(".address-bar__text")).toContainText(
      "3500 Cobble St",
      {
        timeout: 10000,
      },
    );
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

    if ((await cookieBanner.count()) > 0) {
      await cookieBanner.click();
    }

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

    if ((await cookieBanner.count()) > 0) {
      await cookieBanner.click();
    }
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
    if ((await cookieBanner.count()) > 0) {
      await cookieBanner.click();
    }

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
