// import { test, expect } from "@playwright/test";

// const urls: string[] = [
//   //   "https://qa-trugreen.com/buy-online",
//   "https://qa-trugreen.com/buy-online-e",
//   //   "https://qa-trugreen.com/buy-online-e1",
// ];

// for (const url of urls) {
//   const pathName = new URL(url).pathname.replace(/\//g, "-").replace(/^-/, "");

//   test(`purchase option selection button on arrow click (${pathName})`, async ({
//     page,
//   }, testInfo) => {
//     test.setTimeout(120000); // 2 minutes

//     await page.goto(url);
//     await page.getByRole("button", { name: "Accept All Cookies" }).click();
//     await page
//       .getByRole("searchbox", { name: "Enter your home address" })
//       .click();
//     await page
//       .getByRole("searchbox", { name: "Enter your home address" })
//       .fill("6864 Carnell Way, Chattanooga, TN 37421");
//     await page.getByText("Carnell Way, Chattanooga TN 37421").click();
//     // Scroll #svcEmail into view before interacting
//     await page.locator("#svcEmail").scrollIntoViewIfNeeded();
//     await page.locator("#svcEmail").click();
//     await page.locator("#svcEmail").fill("vml.aq.tester@gmail.com");
//     await page.getByRole("button", { name: "Next" }).click();
//     if (url.includes("buy-online-e")) {
//       await page.getByRole("button", { name: "Build My Plan" }).click();
//     } else {
//       await page.getByRole("button", { name: "Next" }).click();
//     }
//     // Wait for the quote plans row to be visible before clicking
//     // Increase timeout to handle slow loading
//     await page
//       .locator(".quote-plans > .row")
//       .waitFor({ state: "visible", timeout: 120000 }); // 2 minutes
//     // Remove the bottom-panel element
//     await page.evaluate(() => {
//       const el = document.querySelector(".bottom-panel");
//       if (el) el.remove();
//     });
//     await page.pause();

//     // Array of selectors for the plan labels
//     const selectLabelLocators = [
//       page.locator("label").filter({ hasText: "Select TruPro℠" }),
//       page.locator("label").filter({ hasText: "Select TruCore℠" }),
//       page.locator("label").filter({ hasText: "Select TruBasic℠" }),
//     ];
//     const selectedLabelLocators = [
//       page.locator("label").filter({ hasText: "TruPro℠ Selected" }),
//       page.locator("label").filter({ hasText: "TruCore℠ Selected" }),
//       page.locator("label").filter({ hasText: "TruBasic℠ Selected" }),
//     ];
//     // Take 3 full page screenshots at different steps, save with unique names, and attach to report
//     const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
//     const browserName =
//       page.context().browser()?.browserType().name() || "unknown-browser";
//     const deviceName = testInfo.project.name || "unknown-device";
//     const screenshotDir = `screenshots/${browserName}/${deviceName}/${timestamp}/${pathName}`;
//     // Ensure directory exists (Playwright will create parent dirs as needed)

//     // Screenshot 1: Before assertions
//     const screenshotPath1 = `${screenshotDir}/01-before-assertion.png`;
//     const screenshotBuffer1 = await page.screenshot({
//       path: screenshotPath1,
//       fullPage: true,
//     });
//     await testInfo.attach(`Screenshot 1 - Before assertion (${pathName})`, {
//       body: screenshotBuffer1,
//       contentType: "image/png",
//     });

//     // Screenshot 2: After first .owl-next click
//     await page.locator(".owl-next").nth(0).scrollIntoViewIfNeeded();
//     await page.locator(".owl-next").nth(0).click();
//     const screenshotPath2 = `${screenshotDir}/02-after-owl-next-1.png`;
//     const screenshotBuffer2 = await page.screenshot({
//       path: screenshotPath2,
//       fullPage: true,
//     });
//     await testInfo.attach(
//       `Screenshot 2 - After first .owl-next (${pathName})`,
//       {
//         body: screenshotBuffer2,
//         contentType: "image/png",
//       },
//     );

//     // Screenshot 3: After second .owl-next click
//     await page.locator(".owl-next").nth(0).scrollIntoViewIfNeeded();
//     await page.locator(".owl-next").nth(0).click();
//     const screenshotPath3 = `${screenshotDir}/03-after-owl-next-2.png`;
//     const screenshotBuffer3 = await page.screenshot({
//       path: screenshotPath3,
//       fullPage: true,
//     });
//     await testInfo.attach(
//       `Screenshot 3 - After second .owl-next (${pathName})`,
//       {
//         body: screenshotBuffer3,
//         contentType: "image/png",
//       },
//     );

//     // Assert none of the plan radio buttons are selected
//     const planRadioSelectors = [
//       'label:has-text("Select TruPro℠") input[type="radio"]',
//       'label:has-text("Select TruCore℠") input[type="radio"]',
//       'label:has-text("Select TruBasic℠") input[type="radio"]',
//     ];
//     for (const selector of planRadioSelectors) {
//       await expect(page.locator(selector)).not.toBeChecked();
//     }
//   });
// }
