# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual/landing-pages/landing-pages.spec.ts >> Landing Page Visual Regression Tests >> should match screenshot for landing page high
- Location: tests/visual/landing-pages/landing-pages.spec.ts:21:9

# Error details

```
Error: A snapshot doesn't exist at /home/runner/work/trugreen/trugreen/snaps/visual/prod/chromium/Landing-Page-Visual-Regression-Tests-should-match-screenshot-for-landing-page-high-1.png, writing actual.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - alert [ref=e2]
  - banner
  - generic [ref=e5]:
    - banner [ref=e6]:
      - generic [ref=e8]:
        - link "TruGreen Logo" [ref=e10] [cursor=pointer]:
          - /url: /
          - img "TruGreen Logo" [ref=e11]
        - link "Call 1-844-811-9033" [ref=e12] [cursor=pointer]:
          - /url: tel:1-844-811-9033
          - img [ref=e14]
          - generic [ref=e16]: Call 1-844-811-9033
    - generic [ref=e18]:
      - img "Beautiful green lawn with professional lawn care" [ref=e19]
      - generic [ref=e23]:
        - heading "You’re one step closer to a golf course quality lawn." [level=1] [ref=e24]
        - paragraph
        - generic [ref=e25]:
          - button "Talk to a Pro" [ref=e27] [cursor=pointer]:
            - img [ref=e29]
            - generic [ref=e31]: Talk to a Pro
          - link "Check Online Pricing" [ref=e32] [cursor=pointer]:
            - /url: /buy-online
    - generic [ref=e34]:
      - generic [ref=e35]:
        - heading "See the TruGreen Difference." [level=2] [ref=e36]
        - paragraph [ref=e37]: Every photo here was taken by the specialist who treated it. See what a tailored plan can do for your lawn.
      - generic [ref=e40]:
        - article [ref=e41]:
          - generic [ref=e42]:
            - heading "Without TruGreen" [level=3] [ref=e43]
            - heading "With TruGreen" [level=3] [ref=e44]
        - article [ref=e46]:
          - generic [ref=e47]:
            - heading "Without TruGreen" [level=3] [ref=e48]
            - heading "With TruGreen" [level=3] [ref=e49]
        - article [ref=e51]:
          - generic [ref=e52]:
            - heading "Without TruGreen" [level=3] [ref=e53]
            - heading "With TruGreen" [level=3] [ref=e54]
    - generic [ref=e57]:
      - heading "Your golf course quality lawn starts with just a few clicks." [level=2] [ref=e58]
      - generic [ref=e59]:
        - button "Talk to a Pro" [ref=e60] [cursor=pointer]:
          - img [ref=e62]
          - generic [ref=e64]: Talk to a Pro
        - button "Check Online Pricing" [ref=e65] [cursor=pointer]
    - generic [ref=e69]:
      - img "TruGreen Guarantee" [ref=e70]
      - paragraph [ref=e71]: TruGreen® will gladly visit your property as often as needed between scheduled visits to make any necessary adjustments and to ensure your satisfaction.
    - generic [ref=e73]:
      - generic [ref=e74]:
        - heading "Get a free quote." [level=2] [ref=e75]
        - paragraph [ref=e76]: Once you fill out the form, we'll reach out within minutes to talk through your lawn goals and pricing.
      - generic [ref=e79]:
        - generic [ref=e80]:
          - generic [ref=e82]: "* Required information"
          - generic [ref=e83]:
            - generic [ref=e84]:
              - generic [ref=e85]: First name*
              - textbox "First name* First name*" [ref=e86]:
                - /placeholder: ""
            - generic [ref=e87]:
              - generic [ref=e88]: Last name*
              - textbox "Last name* Last name*" [ref=e89]:
                - /placeholder: ""
          - generic [ref=e90]:
            - generic [ref=e91]:
              - generic [ref=e92]: Email*
              - textbox "Email* Email*" [ref=e93]:
                - /placeholder: ""
            - generic [ref=e94]:
              - generic [ref=e95]: Phone*
              - textbox "Phone* Phone*" [ref=e96]:
                - /placeholder: (___)-___-____
          - generic [ref=e98]:
            - generic [ref=e99]: Address*
            - combobox [ref=e100]:
              - textbox "Address* Address*" [ref=e101]:
                - /placeholder: ""
              - listbox
          - generic [ref=e103]:
            - generic [ref=e104]: Zip Code*
            - textbox [ref=e105]
        - button "Submit" [ref=e108] [cursor=pointer]
        - paragraph [ref=e112]:
          - text: "By providing my contact information and clicking “Submit”, I consent to: (1) receive autodialed marketing and non-marketing calls, texts and prerecorded messages from TruGreen; and (2) TruGreen’s"
          - link "Privacy Policy" [ref=e113] [cursor=pointer]:
            - /url: https://qa-trugreen.com/about/privacy-policy
          - text: and
          - link "Terms and Conditions" [ref=e114] [cursor=pointer]:
            - /url: https://qa-trugreen.com/about/terms
          - text: (including arbitration provision and class action waiver). California residents, see TruGreen’s California
          - link "Privacy Notice" [ref=e115] [cursor=pointer]:
            - /url: https://qa-trugreen.com/about/california-privacy-policy
          - text: and
          - link "Privacy Policy" [ref=e116] [cursor=pointer]:
            - /url: https://qa-trugreen.com/about/california-privacy-policy
          - text: . I understand that my consent is not required to obtain a quote or purchase TruGreen services and that the cancellation of that account does not automatically revoke this consent.
    - generic [ref=e117]:
      - generic [ref=e118]:
        - heading "Let's talk lawn." [level=3] [ref=e119]
        - generic [ref=e120]:
          - article [ref=e121]:
            - heading "Give us a call." [level=3] [ref=e122]
            - generic [ref=e123]:
              - paragraph [ref=e124]: Talk with an expert and get a free quote.
              - link "1-844-811-9033" [ref=e125] [cursor=pointer]:
                - /url: tel:18448119033
              - paragraph [ref=e126]:
                - generic [ref=e127]: "Mon – Sat: 8:00 AM – 10:00 PM ET"
                - generic [ref=e128]: "Sun: 8:00 AM – 9:00 PM ET"
          - article [ref=e129]:
            - heading "We’ll call you." [level=3] [ref=e130]
            - generic [ref=e131]:
              - paragraph [ref=e132]: One of our experts will be in touch as soon as possible.
              - button "Request a call" [ref=e133] [cursor=pointer]:
                - img [ref=e135]
                - text: Request a call
      - img [ref=e138]
  - contentinfo [ref=e139]:
    - generic [ref=e140]:
      - generic [ref=e141]:
        - generic [ref=e143]:
          - heading "About US" [level=5] [ref=e144]
          - list [ref=e145]:
            - listitem [ref=e146]:
              - link "About TruGreen" [ref=e147] [cursor=pointer]:
                - /url: /newsroom/executive-staff#about
            - listitem [ref=e148]:
              - link "Executive Staff" [ref=e149] [cursor=pointer]:
                - /url: /newsroom/executive-staff
            - listitem [ref=e150]:
              - link "Newsroom" [ref=e151] [cursor=pointer]:
                - /url: /newsroom
            - listitem [ref=e152]:
              - link "CA Climate Disclosure" [ref=e153] [cursor=pointer]:
                - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
            - listitem [ref=e154]:
              - link "Careers" [ref=e155] [cursor=pointer]:
                - /url: https://www.trugreenjobs.com
        - generic [ref=e157]:
          - heading "Our Services" [level=5] [ref=e158]
          - list [ref=e159]:
            - listitem [ref=e160]:
              - link "Lawn Care Plan Comparison" [ref=e161] [cursor=pointer]:
                - /url: /products-and-services
            - listitem [ref=e162]:
              - link "Tree & Shrub Plan Overview" [ref=e163] [cursor=pointer]:
                - /url: /products-and-services/trushrub-tree-and-shrub-care
            - listitem [ref=e164]:
              - link "Pest Control Plan Comparison" [ref=e165] [cursor=pointer]:
                - /url: /pests-products-and-services
            - listitem [ref=e166]:
              - link "Branch Finder" [ref=e167] [cursor=pointer]:
                - /url: /local-lawn-care
        - generic [ref=e169]:
          - heading "Resources" [level=5] [ref=e170]
          - list [ref=e171]:
            - listitem [ref=e172]:
              - link "FAQs" [ref=e173] [cursor=pointer]:
                - /url: /lawn-care-101/faqs
            - listitem [ref=e174]:
              - link "Military Discount" [ref=e175] [cursor=pointer]:
                - /url: /military-discount
            - listitem [ref=e176]:
              - link "Learning Center" [ref=e177] [cursor=pointer]:
                - /url: /lawn-care-101/learning-center
            - listitem [ref=e178]:
              - link "Blogs" [ref=e179] [cursor=pointer]:
                - /url: /lawn-care-101/blog
            - listitem [ref=e180]:
              - link "Service Terms and Conditions" [ref=e181] [cursor=pointer]:
                - /url: /service-terms-and-conditions
        - generic [ref=e184]:
          - heading "For new service" [level=5] [ref=e185]
          - list [ref=e186]:
            - listitem [ref=e187]:
              - link "1-844-811-9033" [ref=e188] [cursor=pointer]:
                - /url: tel:18448119033
            - listitem [ref=e189]:
              - link "Get a Call Back" [ref=e190] [cursor=pointer]:
                - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        - generic [ref=e193]:
          - heading "For our Customers" [level=5] [ref=e194]
          - list [ref=e195]:
            - listitem [ref=e196]:
              - link "Account Login & Register" [ref=e197] [cursor=pointer]:
                - /url: /my-account/login
            - listitem [ref=e198]:
              - generic [ref=e199]: "Call:"
              - link "1-844-366-3467" [ref=e200] [cursor=pointer]:
                - /url: tel:18443663467
            - listitem [ref=e201]:
              - 'link "Text: MYLAWN (695296)" [ref=e202] [cursor=pointer]':
                - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
            - listitem [ref=e203]:
              - link "Customer Support" [ref=e204] [cursor=pointer]:
                - /url: /customer-support
            - listitem [ref=e205]:
              - link "Pay My Bill" [ref=e206] [cursor=pointer]:
                - /url: /pay-your-bill
      - generic [ref=e209]:
        - paragraph [ref=e210]: We may apply a surcharge not to exceed 3% to cover all or part of our costs of accepting your credit card. For Oklahoma-based consumers, the fee will be 2%.
        - paragraph [ref=e211]: "**Available to residential customers for Lawn, TruDefense Mosquito,TruBarrier Perimeter Pest, Flea, Tick & Outdoor Nuisance Pest Control and/or TruShrub Tree & Shrub services only. Requires purchase of annual plan using PrePay or EasyPay. Guarantee based on a matching quote from a Qualified Provider. Parameters include matching service address, number of applications, application price, services to be performed and areas to be treated. Not valid on quotes older than 120 days or one-day sales/seasonal promotions. TruGreen reserves the right to verify. For first year of service only. Limited time offer. Not to be combined with or used in conjunction with any other offer or discount. Valid at participating TruGreen locations. Additional restrictions may apply. Consumer responsible for all sales tax."
        - paragraph [ref=e212]: ◆ TruGreen will gladly visit your property as needed between scheduled visits to ensure your satisfaction. Guarantee applies to full program customers only. Excludes TruBasic and partial programs. Additional restrictions may apply.
        - paragraph [ref=e213]: ✦ Purchase of full lawn plan required for Healthy Lawn Analysis, which is performed at the first visit.
        - paragraph [ref=e214]: ★ Requires purchase of annual plan. Special price is for first application only. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount.
        - paragraph [ref=e215]: ✢ Requires purchase of annual plan. Special price is for first Tree & Shrub application only, for new residential EasyPay or PrePay customers only. TruGreen® Tree & Shrub includes fertilization of common trees and shrubs, and controls common foliar insects and diseases. It does not include treatment of specialty trees such as fruit or certain ornamentals, or assessment and treatment of trees over 25 ft. in height. For more details, go to TruGreen FAQs at TruGreen.com/FAQTREE. Not to be combined with or used in conjunction with any other offer or discount for the same service. Consumer responsible for all sales tax.
        - paragraph [ref=e216]: ★★ Requires purchase of full mosquito plan. Special price is for first mosquito application only, for new EasyPay or PrePay residential customers only. Valid at participating TruGreen locations. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax. ✧ Guarantee applies to full plan customers only.
        - paragraph [ref=e217]: ◆◆ Service does not include removal of webs higher than 10 ft. and application does not protect against termites and other wood-destroying organisms, bedbugs, bees, fleas, German cockroaches, hornets, pharaoh ants, rodents, or ticks. Valid at participating TruGreen locations. Not to be combined with or used in conjunction with any other oﬀer or discount. Additional restrictions may apply. Consumer responsible for all sales tax.
        - paragraph [ref=e218]:
          - text: "America’s #1 lawn care company based on U.S. market share of professional lawn care companies. 2023 MMR Brand Health Tracker."
          - link "PGATOUR.COM" [ref=e219] [cursor=pointer]:
            - /url: https://pgatour.com/
          - text: ", PGA TOUR, TPC, SHOTLINK and the SWINGING GOLFER LOGO are trademarks of PGA TOUR, Inc. BBB accredited since 7/01/2012."
      - generic [ref=e220]:
        - generic [ref=e222]:
          - generic [ref=e223]:
            - link "Facebook Icon" [ref=e224] [cursor=pointer]:
              - /url: https://www.facebook.com/trugreen
              - img "Facebook Icon" [ref=e225]
            - link "X.com Icon" [ref=e226] [cursor=pointer]:
              - /url: https://x.com/trugreen
              - img "X.com Icon" [ref=e227]
            - link "Instagram Icon" [ref=e228] [cursor=pointer]:
              - /url: https://www.instagram.com/trugreen/
              - img "Instagram Icon" [ref=e229]
            - link "Youtube Icon" [ref=e230] [cursor=pointer]:
              - /url: https://www.youtube.com/trugreen
              - img "Youtube Icon" [ref=e231]
            - link "TikTok Icon" [ref=e232] [cursor=pointer]:
              - /url: https://www.tiktok.com/@trugreen_lawn?lang=en
              - img "TikTok Icon" [ref=e233]
            - link "Yelp Icon" [ref=e234] [cursor=pointer]:
              - /url: https://www.yelp.com/
              - img "Yelp Icon" [ref=e235]
          - generic [ref=e236]:
            - 'link "BBB: Better Business Bureau, Accredited Business Badge" [ref=e237] [cursor=pointer]':
              - /url: https://www.bbb.org/us/tn/memphis/profile/lawn-maintenance/trugreen-0543-1000545#bbbseal
              - 'img "BBB: Better Business Bureau, Accredited Business Badge" [ref=e238]'
            - 'link "NALP: National Association of Landscape Professionals Logo" [ref=e239]':
              - /url: "#"
              - 'img "NALP: National Association of Landscape Professionals Logo" [ref=e240]'
            - 'link "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e241] [cursor=pointer]':
              - /url: https://qa-trugreen.com/pga-tour
              - 'img "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e242]'
            - 'link "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e243]':
              - /url: "#"
              - 'img "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e244]'
        - separator [ref=e245]
      - generic [ref=e248]:
        - paragraph [ref=e250]:
          - img "TruGreen Leaf Logo" [ref=e251]
          - text: © 2026 TruGreen Limited Partnership. All rights reserved.
        - list [ref=e253]:
          - listitem [ref=e254]:
            - link "SMS Terms and Conditions" [ref=e255] [cursor=pointer]:
              - /url: /about/sms-terms
          - listitem [ref=e256]:
            - link "Terms and Conditions" [ref=e257] [cursor=pointer]:
              - /url: /about/terms
          - listitem [ref=e258]:
            - link "Privacy Policy" [ref=e259] [cursor=pointer]:
              - /url: /about/privacy-policy
          - listitem [ref=e260]:
            - link "California Privacy Notice" [ref=e261] [cursor=pointer]:
              - /url: /about/california-privacy-policy
          - listitem [ref=e262]:
            - link "Your Privacy Choices privacyoptions" [ref=e263] [cursor=pointer]:
              - /url: /about/privacy-policy#additionalStatePrivacyRights
              - text: Your Privacy Choices
              - img "privacyoptions" [ref=e264]
  - generic: Cookie Settings
```

# Test source

```ts
  1  | import { Page, expect } from "@playwright/test";
  2  | import { selectorsToMask, VisualElement } from "./selectors";
  3  | import { getHomePageElement } from "./legacy-waits";
  4  | 
  5  | export async function takeFullPageScreenshot(page: Page) {
> 6  |   await expect(page).toHaveScreenshot({
     |   ^ Error: A snapshot doesn't exist at /home/runner/work/trugreen/trugreen/snaps/visual/prod/chromium/Landing-Page-Visual-Regression-Tests-should-match-screenshot-for-landing-page-high-1.png, writing actual.
  7  |     fullPage: true,
  8  |     mask: selectorsToMask.map((item) => page.locator(item.selector)),
  9  |     maskColor: "#FF7F50",
  10 |     maxDiffPixelRatio: 0.03,
  11 |   });
  12 | }
  13 | 
  14 | export async function stabilizeElementForScreenshot(
  15 |   page: Page,
  16 |   item: VisualElement,
  17 | ) { //This is just special treatment for the cookie banner
  18 |   if (item.selector === "#onetrust-banner-sdk") {
  19 |     await page
  20 |       .evaluate(async () => {
  21 |         if (document.fonts?.ready) {
  22 |           await document.fonts.ready;
  23 |         }
  24 |       })
  25 |       .catch(() => {});
  26 | 
  27 |     await page.evaluate(
  28 |       () =>
  29 |         new Promise<void>((resolve) =>
  30 |           requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  31 |         ),
  32 |     );
  33 |   }
  34 | }
  35 | 
  36 | export function getElementScreenshotOptions(item: VisualElement) {
  37 |   return item.selector === "#onetrust-banner-sdk"
  38 |     ? {
  39 |         animations: "disabled" as const,
  40 |         caret: "hide" as const,
  41 |         scale: "css" as const,
  42 |         maxDiffPixelRatio: 0.03,
  43 |       }
  44 |     : {};
  45 | }
  46 |   
  47 | 
  48 | export function getElementScreenshotName(item: VisualElement): string {
  49 |   const allowed = "abcdefghijklmnopqrstuvwxyz0123456789";
  50 |   const slug = Array.from(item.name.toLowerCase())
  51 |     .map((char) => (allowed.includes(char) ? char : " "))
  52 |     .join("")
  53 |     .split(" ")
  54 |     .filter(Boolean)
  55 |     .join("-");
  56 |   return `${slug}.png`;
  57 | }
  58 | 
  59 | export async function expectElementScreenshot(page: Page, item: VisualElement) {
  60 |   for (const useCacheBust of [false, true]) {
  61 |     try {
  62 |       const element = await getHomePageElement(page, item, useCacheBust);
  63 |       await stabilizeElementForScreenshot(page, item);
  64 |       await expect(element).toHaveScreenshot(
  65 |         getElementScreenshotName(item),
  66 |         getElementScreenshotOptions(item),
  67 |       );
  68 |       return;
  69 |     } catch (error) {
  70 |       if (useCacheBust) {
  71 |         throw error;
  72 |       }
  73 |       await page.context().clearCookies();
  74 |       await page
  75 |         .evaluate(() => {
  76 |           window.localStorage.clear();
  77 |           window.sessionStorage.clear();
  78 |         })
  79 |         .catch(() => {});
  80 |     }
  81 |   }
  82 | }
  83 | 
```