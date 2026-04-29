import { test, expect } from "@playwright/test";

test("buy-flow-e working @buy-flow-e", async ({ page }) => {
  await page.goto("https://www.trugreen.com/buy-online-e");

  //   Step 1/5
  await expect(page.locator(".stepIntro_title__2ayoT")).toHaveText(
    "Your golf course quality lawn starts here.",
  );

  const cookieBanner = page.getByRole("button", { name: "Accept All Cookies" });
  if ((await cookieBanner.count()) > 0) {
    await cookieBanner.click();
  }

  const address = "3500 Cobble St, Nashville TN 37211";
  await page
    .getByRole("searchbox", { name: "Enter your home address" })
    .fill(address);
  await page.locator("#svcEmail").fill("asdf.com");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByText("*Invalid Email").click();
  //   await page.getByText('Cobble St, Nashville TN 37211').click();
  //   await page.locator('#svcEmail').click();
  await page.locator("#svcEmail").fill("vml.aq.tester@gmil.com");

  await page.getByRole("button", { name: "Next" }).click();

  //   Step 2/5

  await expect(page.locator(".stepIntro_title__2ayoT")).toHaveText(
    "Is this your property?",
  );

  await expect(page.locator(".address-bar__text")).toContainText(
    "3500 Cobble St",
    {
      timeout: 10000,
    },
  );
  await page.locator("#lawnMeasure_0_chk").uncheck();
  await expect(page.locator("#lawnMeasure_0_chk")).toHaveValue("false");

  await page.locator("#lawnMeasure_0_chk").check();
  await expect(page.locator("#lawnMeasure_0_chk")).toHaveValue("1");

  await page.locator("#lawnMeasure_1_chk").uncheck();
  await expect(page.locator("#lawnMeasure_1_chk")).toHaveValue("false");

  await page.locator("#lawnMeasure_1_chk").check();
  await expect(page.locator("#lawnMeasure_1_chk")).toHaveValue("2");

  await page.locator("#lawnMeasure_2_chk").uncheck();
  await expect(page.locator("#lawnMeasure_2_chk")).toHaveValue("false");

  await page.locator("#lawnMeasure_2_chk").check();
  await expect(page.locator("#lawnMeasure_2_chk")).toHaveValue("3");

  await page.locator("#lawnMeasure_3_chk").uncheck();
  await expect(page.locator("#lawnMeasure_3_chk")).toHaveValue("false");

  await page.locator("#lawnMeasure_3_chk").check();
  await expect(page.locator("#lawnMeasure_3_chk")).toHaveValue("4");

  await expect(page.getByText("Front lawn")).toBeVisible();
  await expect(page.getByText("Back lawn")).toBeVisible();
  await expect(page.getByText("Side lawn (left)")).toBeVisible();
  await expect(page.getByText("Side lawn (right)")).toBeVisible();

  await page.getByRole("button", { name: "Build My Plan" }).click();

  //   Step 3/5

  await expect(page.locator(".stepIntro_title__2ayoT")).toHaveText(
    "Now, choose a lawn care plan.",
  );

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

  await page.pause();
  await expect(truPro).toBeVisible();
  await expect(truCore).toBeVisible();
  await expect(truBasic).toBeVisible();

  // await page.getByRole("group", { name: "2 /" }).locator("label").click();
  await page.locator("label").filter({ hasText: "Select TruPro℠" }).click();
  await page.getByRole("button", { name: "Select & Continue" }).click();

  //   Step 4/5

  await expect(
    page.locator(".stepIntro_title__2ayoT.stepIntro_step5Title__icyxy.pl-0"),
  ).toHaveText("The final step to a pro-level lawn.");

  await page.getByRole("radio", { name: "Pay Later", exact: true }).click();
  //   await page.getByRole("searchbox").click();
  await page.getByRole("searchbox").fill("asdf");
  await page.getByRole("button", { name: "Apply" }).click();

  await expect(page.getByText("Invalid Coupon Code")).toBeVisible();

  await page.getByRole("button", { name: "Continue to Payment" }).click();

  //   Step 5/5

  await expect(page.getByText("Enter Payment Info")).toHaveText(
    "Enter Payment Info",
  );
  // Service Address
  //   await expect(
  //     page.locator(
  //       ".payment_service-addr__CV4T7.payment-e_service-address__moK6q div",
  //     ),
  //   ).toHaveText("1. Service Address");
  //   await page.getByRole("textbox", { name: "First Name" }).click();
  //   await page.getByRole("textbox", { name: "First Name" }).fill("Test");
  //   await page.getByRole("textbox", { name: "First Name" }).press("Tab");
  //   await page.getByRole("textbox", { name: "Last Name" }).fill("Test");
  //   await page.getByRole("textbox", { name: "Last Name" }).press("Tab");
  //   await page
  //     .getByRole("textbox", { name: "Phone Number Phone* Phone*" })
  //     .fill("(435)-765-8976");
  //   await page
  //     .getByRole("textbox", { name: "Phone Number Phone* Phone*" })
  //     .press("Tab");
  //   await page
  //     .locator("#choose-payment-opt")
  //     .getByRole("button", { name: "Continue" })
  //     .click();

  // Payment Information
  //   await expect(
  //     page.locator(
  //       ".payment_payment-plan__I7QQe.payment_payment-info__YBlMo.payment-e_payment-block__iF5wJ.payment-e_payment-block--iframe__S7N5D",
  //     ),
  //   ).toHaveText("2. Payment Information");
  //   await page
  //     .locator("#paymetric")
  //     .contentFrame()
  //     .getByRole("textbox", { name: "Cardholder Name" })
  //     .click();
  //   await page
  //     .locator("#paymetric")
  //     .contentFrame()
  //     .getByRole("textbox", { name: "Cardholder Name" })
  //     .fill("Test");
  //   await page
  //     .locator("#paymetric")
  //     .contentFrame()
  //     .getByRole("textbox", { name: "Cardholder Name" })
  //     .press("Tab");
  //   await page
  //     .locator("#paymetric")
  //     .contentFrame()
  //     .getByRole("textbox", { name: "Card Number" })
  //     .click();
  //   await page
  //     .locator("#paymetric")
  //     .contentFrame()
  //     .getByRole("textbox", { name: "Card Number" })
  //     .fill("4111111111111111");
  //   await page
  //     .locator("#paymetric")
  //     .contentFrame()
  //     .getByLabel("Expiration Month")
  //     .selectOption("5");
  //   await page
  //     .locator("#paymetric")
  //     .contentFrame()
  //     .getByLabel("Expiration Year")
  //     .selectOption("2030");
  //   await page.getByRole("button", { name: "Continue" }).nth(1).click();

  await page.getByRole("button", { name: "Back" }).click();
  await page.getByRole("button", { name: "Back" }).click();
  await page.getByRole("button", { name: "Back" }).click();
  await page.getByRole("button", { name: "Back" }).click();
  await expect(page.locator(".stepIntro_title__2ayoT")).toHaveText(
    "Your golf course quality lawn starts here.",
  );
});

// import { test, expect } from "@playwright/test";

// const urls = [
//   "https://dev-trugreen.com/buy-online",
//   "https://dev-trugreen.com/buy-online-e",
//   "https://dev-trugreen.com/buy-online-e1",
// ];

// for (const url of urls) {
//   const pathName = new URL(url).pathname.replace(/\//g, "-").replace(/^-/, "");

//   test.only(`carousel swipe and plan selection test (${pathName})`, async ({
//     page,
//   }, testInfo) => {
//     test.setTimeout(120000);

//     await page.goto(url);

//     await page.getByRole("button", { name: "Accept All Cookies" }).click();

//     await page
//       .getByRole("searchbox", { name: "Enter your home address" })
//       .fill("6864 Carnell Way, Chattanooga, TN 37421");

//     await page.getByText("Carnell Way, Chattanooga TN 37421").click();

//     await page.locator("#svcEmail").fill("vml.aq.tester@gmail.com");

//     await page.getByRole("button", { name: "Next" }).click();

//     if (url.includes("buy-online-e")) {
//       await page.getByRole("button", { name: "Build My Plan" }).click();
//     } else {
//       await page.getByRole("button", { name: "Next" }).click();
//     }

//     await page
//       .locator(".quote-plans > .row")
//       .waitFor({ state: "visible", timeout: 120000 });

//     await page.evaluate(() => {
//       const el = document.querySelector(".bottom-panel");
//       if (el) el.remove();
//     });

//     const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
//     const browserName =
//       page.context().browser()?.browserType().name() || "unknown-browser";
//     const deviceName = testInfo.project.name || "unknown-device";
//     const screenshotDir = `screenshots/${browserName}/${deviceName}/${timestamp}/${pathName}`;

//     const activeCard = () =>
//       page.locator(".quote-plans .swiper-slide.swiper-slide-active").first();

//     function planCard(planName: string) {
//       return page
//         .locator(".quote-plans .swiper-slide")
//         .filter({ hasText: planName })
//         .first();
//     }

//     function planLabel(planName: string) {
//       return planCard(planName).locator("label").first();
//     }

//     async function expectPlanSelected(planName: string) {
//       await expect(planLabel(planName)).toContainText("Selected");
//     }

//     async function expectPlanNotSelected(planName: string) {
//       await expect(planLabel(planName)).toContainText("Select");
//       await expect(planLabel(planName)).not.toContainText("Selected");
//     }

//     async function logActive(label: string) {
//       const title = await activeCard()
//         .locator("h3")
//         .innerText()
//         .catch(async () => {
//           const text = await activeCard().innerText();
//           return (
//             text.split("\n").find((line) => line.trim()) || "NO TITLE FOUND"
//           );
//         });

//       console.log(`\n${pathName} | ${label}: ${title}`);
//     }

//     async function takeScreenshot(name: string, label: string) {
//       const path = `${screenshotDir}/${name}.png`;
//       const buffer = await page.screenshot({
//         path,
//         fullPage: true,
//       });

//       await testInfo.attach(`${label} (${pathName})`, {
//         body: buffer,
//         contentType: "image/png",
//       });
//     }

//     async function swipeLeft() {
//       const card = activeCard();

//       await card.evaluate((el) => {
//         el.scrollIntoView({ block: "center", inline: "center" });
//       });

//       await expect(card).toBeVisible();

//       const box = await card.boundingBox();
//       if (!box) throw new Error("No bounding box for active card");

//       const startX = box.x + box.width / 2;
//       const startY = box.y + box.height / 2;
//       const endX = startX - 250;

//       await page.mouse.move(startX, startY);
//       await page.mouse.down();
//       await page.mouse.move(endX, startY, { steps: 12 });
//       await page.mouse.up();

//       await page.waitForTimeout(1000);
//     }

//     async function clickPlanSelection(planName: string) {
//       const card = planCard(planName);

//       await card.evaluate((el) => {
//         el.scrollIntoView({ block: "center", inline: "center" });
//       });

//       const label = card.locator("label").first();
//       const radio = card.locator('input[type="radio"]').first();

//       if ((await label.count()) > 0) {
//         await label.click();
//       } else if ((await radio.count()) > 0) {
//         await radio.click({ force: true });
//       } else {
//         await card.click();
//       }

//       await page.waitForTimeout(1000);
//     }

//     await takeScreenshot("01-before-swipe", "Before swipe");
//     await logActive("Card 1");
//     await expect(activeCard()).toContainText("TruPro");

//     await expectPlanNotSelected("TruPro");
//     await expectPlanNotSelected("TruCore");
//     await expectPlanNotSelected("TruBasic");

//     await clickPlanSelection("TruPro");

//     await takeScreenshot("02-after-trupro-click", "After TruPro click");
//     await expectPlanSelected("TruPro");
//     await expectPlanNotSelected("TruCore");
//     await expectPlanNotSelected("TruBasic");

//     await swipeLeft();

//     await takeScreenshot("03-after-swipe-1", "After first swipe");
//     await logActive("Card 2");
//     await expect(activeCard()).toContainText("TruCore");

//     await clickPlanSelection("TruCore");

//     await takeScreenshot("04-after-trucore-click", "After TruCore click");
//     await expectPlanNotSelected("TruPro");
//     await expectPlanSelected("TruCore");
//     await expectPlanNotSelected("TruBasic");

//     await swipeLeft();

//     await takeScreenshot("05-after-swipe-2", "After second swipe");
//     await logActive("Card 3");
//     await expect(activeCard()).toContainText("TruBasic");

//     await clickPlanSelection("TruBasic");

//     await takeScreenshot("06-after-trubasic-click", "After TruBasic click");
//     await expectPlanNotSelected("TruPro");
//     await expectPlanNotSelected("TruCore");
//     await expectPlanSelected("TruBasic");
//   });
// }
