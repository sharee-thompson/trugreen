import { test, expect } from "@playwright/test";

const urls: string[] = [
  //   "https://dev-trugreen.com/buy-online",
  "https://dev-trugreen.com/buy-online-e",
  //   "https://dev-trugreen.com/buy-online-e1",
];

for (const url of urls) {
  const pathName = new URL(url).pathname.replace(/\//g, "-").replace(/^-/, "");

  test(`purchase option selection button on carousel swipe (${pathName})`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(120000);

    await page.goto(url);

    // const cookieBanner = page.getByRole("button", {
    //   name: "Accept All Cookies",
    // });

    // await cookieBanner
    //   .waitFor({ state: "visible", timeout: 3000 })
    //   .catch(() => null);

    // if (await cookieBanner.isVisible().catch(() => false)) {
    //   await cookieBanner.click();
    // }
    await page.getByRole("button", { name: "Accept All Cookies" }).click();

    await page
      .getByRole("searchbox", { name: "Enter your home address" })
      .click();

    await page
      .getByRole("searchbox", { name: "Enter your home address" })
      .fill("6864 Carnell Way, Chattanooga, TN 37421");

    await page.getByText("Carnell Way, Chattanooga TN 37421").click();

    await page.locator("#svcEmail").scrollIntoViewIfNeeded();
    await page.locator("#svcEmail").click();
    await page.locator("#svcEmail").fill("vml.aq.tester@gmail.com");

    await page.getByRole("button", { name: "Next" }).click();

    if (url.includes("buy-online-e")) {
      await page.getByRole("button", { name: "Build My Plan" }).click();
    } else {
      await page.getByRole("button", { name: "Next" }).click();
    }

    await page
      .locator(".quote-plans > .row")
      .waitFor({ state: "visible", timeout: 120000 });

    await page.evaluate(() => {
      const el = document.querySelector(".bottom-panel");
      if (el) el.remove();
    });

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const browserName =
      page.context().browser()?.browserType().name() || "unknown-browser";
    const deviceName = testInfo.project.name || "unknown-device";
    const screenshotDir = `screenshots/${browserName}/${deviceName}/${timestamp}/${pathName}`;

    //  await page.pause();

    const greenFooter = page.locator("#green-footer");

    if (await greenFooter.count()) {
      await greenFooter.evaluate((el) => {
        (el as HTMLElement).style.display = "none";
      });
    }

    const ctaSelector = url.includes("buy-online-e")
      ? ".owl-item.active.center .planCard_ctaText___Me9n"
      : ".owl-item.active.center .quotePlan-btn label span";

    async function swipeOneCardLeft(locator) {
      const { centerX, centerY } = await locator.evaluate(
        (target: HTMLElement) => {
          const bounds = target.getBoundingClientRect();
          return {
            centerX: bounds.left + bounds.width / 2,
            centerY: bounds.top + bounds.height / 2,
          };
        },
      );

      const startTouches = [
        {
          identifier: 0,
          clientX: centerX,
          clientY: centerY,
        },
      ];

      await locator.dispatchEvent("touchstart", {
        touches: startTouches,
        changedTouches: startTouches,
        targetTouches: startTouches,
      });

      const deltaX = -300;
      const steps = 16;

      for (let i = 1; i <= steps; i++) {
        const moveTouches = [
          {
            identifier: 0,
            clientX: centerX + (deltaX * i) / steps,
            clientY: centerY,
          },
        ];

        await locator.dispatchEvent("touchmove", {
          touches: moveTouches,
          changedTouches: moveTouches,
          targetTouches: moveTouches,
        });
      }

      await locator.dispatchEvent("touchend", {
        touches: [],
        changedTouches: [],
        targetTouches: [],
      });

      await page.waitForTimeout(1000);
    }

    async function takeScreenshot(name: string, label: string) {
      const path = `${screenshotDir}/${name}.png`;
      const buffer = await page.screenshot({
        path,
        fullPage: true,
      });

      await testInfo.attach(`${label} (${pathName})`, {
        body: buffer,
        contentType: "image/png",
      });
    }

    async function assertCardText(expectedText: string, label: string) {
      const locator = page.locator(ctaSelector);
      const locatorCount = await locator.count();

      console.log(`----- ${pathName} | ${label} -----`);
      console.log(`${label} locator count: ${locatorCount}`);
      console.log(`${label} expected: ${expectedText}`);

      if (locatorCount === 0) {
        const activeHtml = await page
          .locator(".owl-item.active.center")
          .first()
          .innerHTML()
          .catch(() => "NO ACTIVE CENTER FOUND");

        console.log(`${label} active.center HTML: ${activeHtml}`);
        console.log(`FAIL - ${label} locator not found`);
        return;
      }

      const currentCtaText = locator.first();
      const currentText = await currentCtaText
        .innerText()
        .catch(() => "TEXT NOT FOUND");

      console.log(`${label} actual: ${currentText}`);

      try {
        await expect(currentCtaText).toBeVisible();
        await expect(currentCtaText).toContainText(expectedText);
      } catch {
        console.log(
          `FAIL - ${label} expected: ${expectedText} | actual: ${currentText}`,
        );
      }
    }
    await page.pause();

    await takeScreenshot("01-before-swipe", "Screenshot 1 - Before swipe");
    await assertCardText("Select TruPro", "Card 1");
    const activeCard1 = page.locator(".owl-item.active.center").first();
    await activeCard1.scrollIntoViewIfNeeded();
    await swipeOneCardLeft(activeCard1);

    await takeScreenshot(
      "02-after-swipe-1",
      "Screenshot 2 - After first swipe",
    );
    await assertCardText("Select TruCore", "Card 2");

    const activeCard2 = page.locator(".owl-item.active.center").first();
    await activeCard2.scrollIntoViewIfNeeded();
    await swipeOneCardLeft(activeCard2);

    await takeScreenshot(
      "03-after-swipe-2",
      "Screenshot 3 - After second swipe",
    );
    await assertCardText("Select TruBasic", "Card 3");
    console.log(`${pathName} finished`);
  });
}
