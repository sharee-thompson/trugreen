import { test, expect } from "@playwright/test";

const urls = [
  "https://dev-trugreen.com/buy-online",
  "https://dev-trugreen.com/buy-online-e",
  "https://dev-trugreen.com/buy-online-e1",
];

for (const url of urls) {
  const pathName = new URL(url).pathname.replace(/\//g, "-").replace(/^-/, "");

  test.only(`carousel swipe and plan selection test (${pathName})`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(120000);

    await page.goto(url);

    await page.getByRole("button", { name: "Accept All Cookies" }).click();

    await page
      .getByRole("searchbox", { name: "Enter your home address" })
      .fill("6864 Carnell Way, Chattanooga, TN 37421");

    await page.getByText("Carnell Way, Chattanooga TN 37421").click();

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

    const activeCard = () =>
      page.locator(".quote-plans .swiper-slide.swiper-slide-active").first();

    function planCard(planName: string) {
      return page
        .locator(".quote-plans .swiper-slide")
        .filter({ hasText: planName })
        .first();
    }

    function planLabel(planName: string) {
      return planCard(planName).locator("label").first();
    }

    async function expectPlanSelected(planName: string) {
      await expect(planLabel(planName)).toContainText("Selected");
    }

    async function expectPlanNotSelected(planName: string) {
      await expect(planLabel(planName)).toContainText("Select");
      await expect(planLabel(planName)).not.toContainText("Selected");
    }

    async function logActive(label: string) {
      const title = await activeCard()
        .locator("h3")
        .innerText()
        .catch(async () => {
          const text = await activeCard().innerText();
          return (
            text.split("\n").find((line) => line.trim()) || "NO TITLE FOUND"
          );
        });

      console.log(`\n${pathName} | ${label}: ${title}`);
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

    async function swipeLeft() {
      const card = activeCard();

      await card.evaluate((el) => {
        el.scrollIntoView({ block: "center", inline: "center" });
      });

      await expect(card).toBeVisible();

      const box = await card.boundingBox();
      if (!box) throw new Error("No bounding box for active card");

      const startX = box.x + box.width / 2;
      const startY = box.y + box.height / 2;
      const endX = startX - 250;

      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(endX, startY, { steps: 12 });
      await page.mouse.up();

      await page.waitForTimeout(1000);
    }

    async function clickPlanSelection(planName: string) {
      const card = planCard(planName);

      await card.evaluate((el) => {
        el.scrollIntoView({ block: "center", inline: "center" });
      });

      const label = card.locator("label").first();
      const radio = card.locator('input[type="radio"]').first();

      if ((await label.count()) > 0) {
        await label.click();
      } else if ((await radio.count()) > 0) {
        await radio.click({ force: true });
      } else {
        await card.click();
      }

      await page.waitForTimeout(1000);
    }

    await takeScreenshot("01-before-swipe", "Before swipe");
    await logActive("Card 1");
    await expect(activeCard()).toContainText("TruPro");

    await expectPlanNotSelected("TruPro");
    await expectPlanNotSelected("TruCore");
    await expectPlanNotSelected("TruBasic");

    await clickPlanSelection("TruPro");

    await takeScreenshot("02-after-trupro-click", "After TruPro click");
    await expectPlanSelected("TruPro");
    await expectPlanNotSelected("TruCore");
    await expectPlanNotSelected("TruBasic");

    await swipeLeft();

    await takeScreenshot("03-after-swipe-1", "After first swipe");
    await logActive("Card 2");
    await expect(activeCard()).toContainText("TruCore");

    await clickPlanSelection("TruCore");

    await takeScreenshot("04-after-trucore-click", "After TruCore click");
    await expectPlanNotSelected("TruPro");
    await expectPlanSelected("TruCore");
    await expectPlanNotSelected("TruBasic");

    await swipeLeft();

    await takeScreenshot("05-after-swipe-2", "After second swipe");
    await logActive("Card 3");
    await expect(activeCard()).toContainText("TruBasic");

    await clickPlanSelection("TruBasic");

    await takeScreenshot("06-after-trubasic-click", "After TruBasic click");
    await expectPlanNotSelected("TruPro");
    await expectPlanNotSelected("TruCore");
    await expectPlanSelected("TruBasic");
  });
}
