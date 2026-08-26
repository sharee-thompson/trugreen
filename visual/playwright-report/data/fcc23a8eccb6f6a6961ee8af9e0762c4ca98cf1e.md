# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual/visual-regression.spec.ts >> Visual Regression Tests >> page: payYourBill
- Location: tests/visual/visual-regression.spec.ts:93:11

# Error details

```
Error: A snapshot doesn't exist at /home/runner/work/trugreen/trugreen/snaps/visual/prod/chromium/fullpage-payYourBill.png, writing actual.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e3]:
      - heading "Pay My Bill" [level=1] [ref=e8]
      - generic [ref=e10]:
        - generic [ref=e13]:
          - heading "Find your bill" [level=5] [ref=e14]
          - paragraph [ref=e15]: Provide us with this information so we can confirm your account
          - generic [ref=e16]:
            - generic [ref=e17]:
              - generic [ref=e18]: Last Name *
              - textbox "Last Name" [ref=e19]
            - paragraph [ref=e20]:
              - text: We also need
              - strong [ref=e21]: either your phone number and zip code, or your customer number
            - generic [ref=e22]:
              - generic [ref=e23]:
                - generic [ref=e24]: Phone Number *
                - textbox "(___)-___-____" [ref=e25]
              - generic [ref=e26]:
                - generic [ref=e27]: Zip Code *
                - spinbutton [ref=e28]
            - paragraph [ref=e30]: OR
            - generic [ref=e31]:
              - generic [ref=e32]: Customer Number *
              - spinbutton [ref=e33]
              - generic [ref=e34]: Zip Code *
              - textbox "12345" [ref=e35]
            - button "Find my bill" [ref=e36] [cursor=pointer]
        - generic [ref=e37]:
          - generic [ref=e39]:
            - heading "Benefits of creating an online account" [level=5] [ref=e40]
            - generic [ref=e41]:
              - img "check" [ref=e42]
              - text: Pay a bill, billing history, prepay for services, enroll in EasyPay.
            - generic [ref=e43]:
              - img "check" [ref=e44]
              - text: See Service History and remaining services.
            - generic [ref=e45]:
              - img "check" [ref=e46]
              - text: Update Account Settings.
            - generic [ref=e47]:
              - img "check" [ref=e48]
              - text: Review documents including Service Summaries, Invoices, Prepay Letters.
          - generic [ref=e50]:
            - heading "Need help with your billing ?" [level=5] [ref=e51]
            - paragraph [ref=e52]: Try our TruGreen Virtual Assistant
            - link "Chat with us" [ref=e53] [cursor=pointer]:
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
            - paragraph [ref=e54]: Or call us to pay by phone
            - link "Call us" [ref=e55] [cursor=pointer]:
              - /url: tel:1-844-384-4424
  - contentinfo [ref=e56]:
    - generic [ref=e57]:
      - generic [ref=e58]:
        - generic [ref=e60]:
          - heading "About US" [level=5] [ref=e61]
          - list [ref=e62]:
            - listitem [ref=e63]:
              - link "About TruGreen" [ref=e64] [cursor=pointer]:
                - /url: /newsroom/executive-staff#about
            - listitem [ref=e65]:
              - link "Executive Staff" [ref=e66] [cursor=pointer]:
                - /url: /newsroom/executive-staff
            - listitem [ref=e67]:
              - link "Newsroom" [ref=e68] [cursor=pointer]:
                - /url: /newsroom
            - listitem [ref=e69]:
              - link "Careers" [ref=e70] [cursor=pointer]:
                - /url: https://www.trugreenjobs.com
        - generic [ref=e72]:
          - heading "Our Services" [level=5] [ref=e73]
          - list [ref=e74]:
            - listitem [ref=e75]:
              - link "Lawn Care Plan Comparison" [ref=e76] [cursor=pointer]:
                - /url: /products-and-services
            - listitem [ref=e77]:
              - link "Tree & Shrub Plan Overview" [ref=e78] [cursor=pointer]:
                - /url: /products-and-services/trushrub-tree-and-shrub-care
            - listitem [ref=e79]:
              - link "Pest Control Plan Comparison" [ref=e80] [cursor=pointer]:
                - /url: /pests-products-and-services
            - listitem [ref=e81]:
              - link "Branch Finder" [ref=e82] [cursor=pointer]:
                - /url: /local-lawn-care
        - generic [ref=e84]:
          - heading "Resources" [level=5] [ref=e85]
          - list [ref=e86]:
            - listitem [ref=e87]:
              - link "FAQs" [ref=e88] [cursor=pointer]:
                - /url: /lawn-care-101/faqs
            - listitem [ref=e89]:
              - link "Military Discount" [ref=e90] [cursor=pointer]:
                - /url: /military-discount
            - listitem [ref=e91]:
              - link "Learning Center" [ref=e92] [cursor=pointer]:
                - /url: /lawn-care-101/learning-center
            - listitem [ref=e93]:
              - link "Blogs" [ref=e94] [cursor=pointer]:
                - /url: /lawn-care-101/blog
            - listitem [ref=e95]:
              - link "Service Terms and Conditions" [ref=e96] [cursor=pointer]:
                - /url: /service-terms-and-conditions
        - generic [ref=e99]:
          - heading "For new service" [level=5] [ref=e100]
          - list [ref=e101]:
            - listitem [ref=e102]:
              - link "1-844-276-7741" [ref=e103] [cursor=pointer]:
                - /url: tel:18442767741
            - listitem [ref=e104]:
              - link "Get a Call Back" [ref=e105] [cursor=pointer]:
                - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        - generic [ref=e108]:
          - heading "For our Customer" [level=5] [ref=e109]
          - list [ref=e110]:
            - listitem [ref=e111]:
              - link "Account Login & Register" [ref=e112] [cursor=pointer]:
                - /url: /my-account/login
            - listitem [ref=e113]:
              - generic [ref=e114]: "Call:"
              - link "1-844-217-7310" [ref=e115] [cursor=pointer]:
                - /url: tel:18442177310
            - listitem [ref=e116]:
              - 'link "Text: MYLAWN (695296)" [ref=e117] [cursor=pointer]':
                - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
            - listitem [ref=e118]:
              - link "Customer Support" [ref=e119] [cursor=pointer]:
                - /url: /customer-support
            - listitem [ref=e120]:
              - link "Pay My Bill" [ref=e121] [cursor=pointer]:
                - /url: /pay-your-bill
      - generic [ref=e124]:
        - paragraph [ref=e125]: We may apply a surcharge not to exceed 3% to cover all or part of our costs of accepting your credit card. For Oklahoma-based consumers, the fee will be 2%.
        - paragraph [ref=e126]: "**Available to residential customers for Lawn, TruDefense Mosquito,TruBarrier Perimeter Pest, Flea, Tick & Outdoor Nuisance Pest Control and/or TruShrub Tree & Shrub services only. Requires purchase of annual plan using PrePay or EasyPay. Guarantee based on a matching quote from a Qualified Provider. Parameters include matching service address, number of applications, application price, services to be performed and areas to be treated. Not valid on quotes older than 120 days or one-day sales/seasonal promotions. TruGreen reserves the right to verify. For first year of service only. Limited time offer. Not to be combined with or used in conjunction with any other offer or discount. Valid at participating TruGreen locations. Additional restrictions may apply. Consumer responsible for all sales tax."
        - paragraph [ref=e127]: ◆ TruGreen will gladly visit your property as needed between scheduled visits to ensure your satisfaction. Guarantee applies to full program customers only. Excludes TruBasic and partial programs. Additional restrictions may apply.
        - paragraph [ref=e128]: ✦ Purchase of full lawn plan required for Healthy Lawn Analysis, which is performed at the first visit.
        - paragraph [ref=e129]: ★ Requires purchase of annual plan. Special price is for first application only. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount.
        - paragraph [ref=e130]: ✢ Requires purchase of annual plan. Special price is for first Tree & Shrub application only, for new residential EasyPay or PrePay customers only. TruGreen® Tree & Shrub includes fertilization of common trees and shrubs, and controls common foliar insects and diseases. It does not include treatment of specialty trees such as fruit or certain ornamentals, or assessment and treatment of trees over 25 ft. in height. For more details, go to TruGreen FAQs at TruGreen.com/FAQTREE. Not to be combined with or used in conjunction with any other offer or discount for the same service. Consumer responsible for all sales tax.
        - paragraph [ref=e131]: ★★ Requires purchase of full mosquito plan. Special price is for first mosquito application only, for new EasyPay or PrePay residential customers only. Valid at participating TruGreen locations. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax. ✧ Guarantee applies to full plan customers only.
        - paragraph [ref=e132]: ◆◆ Service does not include removal of webs higher than 10 ft. and application does not protect against termites and other wood-destroying organisms, bedbugs, bees, fleas, German cockroaches, hornets, pharaoh ants, rodents, or ticks. Valid at participating TruGreen locations. Not to be combined with or used in conjunction with any other oﬀer or discount. Additional restrictions may apply. Consumer responsible for all sales tax.
        - paragraph [ref=e133]:
          - text: "America’s #1 lawn care company based on U.S. market share of professional lawn care companies. 2023 MMR Brand Health Tracker."
          - link "PGATOUR.COM" [ref=e134] [cursor=pointer]:
            - /url: https://pgatour.com/
          - text: ", PGA TOUR, TPC, SHOTLINK and the SWINGING GOLFER LOGO are trademarks of PGA TOUR, Inc. BBB accredited since 7/01/2012."
      - generic [ref=e135]:
        - generic [ref=e137]:
          - generic [ref=e138]:
            - link "Facebook Icon" [ref=e139] [cursor=pointer]:
              - /url: https://www.facebook.com/trugreen
              - img "Facebook Icon" [ref=e140]
            - link "X.com Icon" [ref=e141] [cursor=pointer]:
              - /url: https://x.com/trugreen
              - img "X.com Icon" [ref=e142]
            - link "Instagram Icon" [ref=e143] [cursor=pointer]:
              - /url: https://www.instagram.com/trugreen/
              - img "Instagram Icon" [ref=e144]
            - link "Youtube Icon" [ref=e145] [cursor=pointer]:
              - /url: https://www.youtube.com/trugreen
              - img "Youtube Icon" [ref=e146]
            - link "TikTok Icon" [ref=e147] [cursor=pointer]:
              - /url: https://www.tiktok.com/@trugreen_lawn?lang=en
              - img "TikTok Icon" [ref=e148]
            - link "Yelp Icon" [ref=e149] [cursor=pointer]:
              - /url: https://www.yelp.com/
              - img "Yelp Icon" [ref=e150]
          - generic [ref=e151]:
            - 'link "BBB: Better Business Bureau, Accredited Business Badge" [ref=e152] [cursor=pointer]':
              - /url: https://www.bbb.org/us/tn/memphis/profile/lawn-maintenance/trugreen-0543-1000545#bbbseal
              - 'img "BBB: Better Business Bureau, Accredited Business Badge" [ref=e153]'
            - 'link "NALP: National Association of Landscape Professionals Logo" [ref=e154]':
              - /url: "#"
              - 'img "NALP: National Association of Landscape Professionals Logo" [ref=e155]'
            - 'link "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e156] [cursor=pointer]':
              - /url: /pga-tour
              - 'img "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e157]'
            - 'link "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e158] [cursor=pointer]':
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
              - 'img "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e159]'
        - separator [ref=e160]
      - generic [ref=e163]:
        - paragraph [ref=e165]:
          - img "TruGreen Leaf Logo" [ref=e166]
          - text: © 2026 TruGreen Limited Partnership. All rights reserved.
        - list [ref=e168]:
          - listitem [ref=e169]:
            - link "SMS Terms and Conditions" [ref=e170] [cursor=pointer]:
              - /url: /about/sms-terms
          - listitem [ref=e171]:
            - link "Terms and Conditions" [ref=e172] [cursor=pointer]:
              - /url: /about/terms
          - listitem [ref=e173]:
            - link "Privacy Policy" [ref=e174] [cursor=pointer]:
              - /url: /about/privacy-policy
          - listitem [ref=e175]:
            - link "California Privacy Notice" [ref=e176] [cursor=pointer]:
              - /url: /about/california-privacy-policy
          - listitem [ref=e177]:
            - link "Your Privacy Choices privacyoptions" [ref=e178] [cursor=pointer]:
              - /url: /about/privacy-policy#additionalStatePrivacyRights
              - text: Your Privacy Choices
              - img "privacyoptions" [ref=e179]
      - button [ref=e180] [cursor=pointer]
  - alert [ref=e181]
  - iframe
```

# Test source

```ts
  1   | import { test, expect, type Page } from "@playwright/test";
  2   | import { getBaseUrl, getLandingPageUrl } from "../../utils/config";
  3   | import { landingPagePaths, visualPaths } from "../../utils/paths";
  4   | import {
  5   |   selectorsToRemove,
  6   |   selectorsToMask,
  7   |   elementScreenshotItems,
  8   |   expectElementScreenshot,
  9   |   getVisualHideCss,
  10  |   removeElementIfExists,
  11  |   settleVisualPage,
  12  |   visualMaxDiffPixelRatio,
  13  |   waitForStableScrollHeight,
  14  | } from "../../utils/index";
  15  | import fs from "fs";
  16  | import path from "path";
  17  | 
  18  | const hideCssPath = path.join(__dirname, "visual-hide.css");
  19  | const landingHeaderLogoSelector =
  20  |   '[class*="landingPageHeader_logo__"], header img[alt="TruGreen Logo"]';
  21  | 
  22  | async function runFullPageVisualCheck(
  23  |   page: Page,
  24  |   screenshotName: string,
  25  |   visualPath: string,
  26  |   getUrl: (path: string) => string,
  27  | ) {
  28  |   const targetUrl = getUrl(visualPath);
  29  |   await page.goto(targetUrl, { waitUntil: "domcontentloaded" });
  30  | 
  31  |   await settleVisualPage(page, visualPath);
  32  | 
  33  |   for (const item of selectorsToRemove) {
  34  |     await removeElementIfExists(page, item.selector, item.name);
  35  |   }
  36  | 
  37  |   if (visualPath.endsWith("/ppc/landing-page")) {
  38  |     await waitForStableScrollHeight(page);
  39  |   }
  40  | 
> 41  |   await expect(page).toHaveScreenshot(`${screenshotName}.png`, {
      |   ^ Error: A snapshot doesn't exist at /home/runner/work/trugreen/trugreen/snaps/visual/prod/chromium/fullpage-payYourBill.png, writing actual.
  42  |     fullPage: true,
  43  |     scale: "css",
  44  |     stylePath: hideCssPath,
  45  |     mask: selectorsToMask.map((item) => page.locator(item.selector)),
  46  |     maskColor: "#FF7F50",
  47  |     maxDiffPixelRatio: visualMaxDiffPixelRatio,
  48  |   });
  49  | }
  50  | 
  51  | async function expectLandingLogoScreenshot(page: Page) {
  52  |   const landingPath = landingPagePaths.high;
  53  | 
  54  |   await page.goto(getLandingPageUrl(landingPath), {
  55  |     waitUntil: "domcontentloaded",
  56  |   });
  57  |   await settleVisualPage(page, landingPath);
  58  | 
  59  |   const logo = page.locator(landingHeaderLogoSelector).first();
  60  |   await expect(logo).toBeVisible({ timeout: 15000 });
  61  |   await logo.scrollIntoViewIfNeeded();
  62  | 
  63  |   await expect(logo).toHaveScreenshot("landing-header-logo.png", {
  64  |     animations: "disabled",
  65  |     caret: "hide",
  66  |     scale: "css",
  67  |     maxDiffPixelRatio: visualMaxDiffPixelRatio,
  68  |   });
  69  | }
  70  | 
  71  | test.describe(
  72  |   "Visual Regression Tests",
  73  |   { tag: ["@visual-regression", "@visual"] },
  74  |   () => {
  75  |     test.beforeAll(() => {
  76  |       const css = getVisualHideCss();
  77  |       fs.writeFileSync(hideCssPath, css);
  78  |       console.log(
  79  |         `\nVisual Regression Tests - Environment: ${process.env.ENV || "prod"}\n`,
  80  |       );
  81  |       console.log(`Visual maxDiffPixelRatio: ${visualMaxDiffPixelRatio}`);
  82  |     });
  83  | 
  84  |     // STEP 1 — element screenshots of removable selectors, once each (home page).
  85  |     for (const item of elementScreenshotItems) {
  86  |       test(`element: ${item.name}`, async ({ page }) => {
  87  |         await expectElementScreenshot(page, item);
  88  |       });
  89  |     }
  90  | 
  91  |     // STEP 2 — full-page sitewide smoke coverage.
  92  |     for (const [name, visualPath] of Object.entries(visualPaths)) {
  93  |       test(`page: ${name}`, async ({ page }) => {
  94  |         await runFullPageVisualCheck(
  95  |           page,
  96  |           `fullpage-${name}`,
  97  |           visualPath,
  98  |           getBaseUrl,
  99  |         );
  100 |       });
  101 |     }
  102 |   },
  103 | );
  104 | 
  105 | test.describe(
  106 |   "Landing Page Visual Regression Tests",
  107 |   { tag: ["@landing-pages", "@visual"] },
  108 |   () => {
  109 |     test.beforeAll(() => {
  110 |       const css = getVisualHideCss();
  111 |       fs.writeFileSync(hideCssPath, css);
  112 |       console.log(
  113 |         `\nLanding Page Visual Tests - Environment: ${process.env.LANDING_PAGE_ENV || process.env.ENV || "prod"}\n`,
  114 |       );
  115 |       console.log(`Visual maxDiffPixelRatio: ${visualMaxDiffPixelRatio}`);
  116 |     });
  117 | 
  118 |     test("element: Landing Header Logo", async ({ page }) => {
  119 |       await expectLandingLogoScreenshot(page);
  120 |     });
  121 | 
  122 |     for (const [name, landingPath] of Object.entries(landingPagePaths)) {
  123 |       test(`page: landing ${name}`, async ({ page }) => {
  124 |         await runFullPageVisualCheck(
  125 |           page,
  126 |           `fullpage-landing-${name}`,
  127 |           landingPath,
  128 |           getLandingPageUrl,
  129 |         );
  130 |       });
  131 |     }
  132 |   },
  133 | );
  134 | 
```