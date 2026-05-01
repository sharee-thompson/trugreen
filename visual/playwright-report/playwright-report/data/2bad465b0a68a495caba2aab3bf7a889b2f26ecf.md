# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual/visual-regression.spec.ts >> Visual Regression Tests @visual-regression >> should match screenshot for /customer-support
- Location: tests/visual/visual-regression.spec.ts:189:9

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  Expected an image 1280px by 4614px, received 1280px by 4615px. 

Call log:
  - Expect "toHaveScreenshot" with timeout 5000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - Expected an image 1280px by 4614px, received 1280px by 4615px.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - Expected an image 1280px by 4614px, received 1280px by 4615px.

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner:
    - generic [ref=e2]:
      - paragraph [ref=e7] [cursor=pointer]:
        - 'link "Get Six Weeks of FREE Lawn Care. Disclosure 2. Use Code: UPGRADE at Checkout." [ref=e8]':
          - /url: /buy-online
          - text: Get Six Weeks of FREE Lawn Care.
          - superscript [ref=e9]: "2"
          - text: "Use Code: UPGRADE at Checkout."
      - generic [ref=e11]:
        - link "TruGreen Logo" [ref=e13] [cursor=pointer]:
          - /url: /
          - img "TruGreen Logo" [ref=e14]
        - generic [ref=e16]:
          - link "location_icon" [ref=e17] [cursor=pointer]:
            - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
            - img "location_icon" [ref=e18]
          - link "hamMenu_icon" [ref=e19] [cursor=pointer]:
            - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
            - img "hamMenu_icon" [ref=e20]
  - generic [ref=e22]:
    - generic [ref=e27]:
      - heading "Need some help? You’re in the right place." [level=1] [ref=e28]:
        - text: Need some help?
        - text: You’re in the
        - text: right place.
      - paragraph [ref=e29]:
        - text: Get help with your account, ask questions about plans and services, and check out our
        - link "FAQs" [ref=e30] [cursor=pointer]:
          - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        - text: — all in one place.
      - button "Contact us" [ref=e31] [cursor=pointer]
    - generic [ref=e33]:
      - heading "We’ve got you covered." [level=2] [ref=e36]
      - generic [ref=e37]:
        - generic [ref=e39]:
          - generic [ref=e42]:
            - heading "Get help with the everyday stuff." [level=3] [ref=e43]
            - list [ref=e44]:
              - listitem [ref=e45]:
                - generic [ref=e46]: Scheduling information
              - listitem [ref=e47]:
                - generic [ref=e48]: Billing and payments
              - listitem [ref=e49]:
                - generic [ref=e50]: Manage account settings
              - listitem [ref=e51]:
                - generic [ref=e52]: Add or change service
              - listitem [ref=e53]:
                - generic [ref=e54]: Login assistance
            - paragraph [ref=e55]: Our Virtual Assistant can handle most things and is available 24/7, or you can log in to manage your account.
            - generic [ref=e56]:
              - generic [ref=e57] [cursor=pointer]: Chat Now
              - link "Log In" [ref=e58] [cursor=pointer]:
                - /url: /my-account/login
          - img [ref=e60]
        - generic [ref=e62]:
          - generic [ref=e64]:
            - heading "Give us a call." [level=4] [ref=e66]
            - paragraph [ref=e67]: Drop us a line and let's connect.
            - paragraph [ref=e68]:
              - generic [ref=e69]:
                - text: "Mon – Fri: 7:30 AM – 10:00 PM ET"
                - text: "Sat: 8:30 AM – 8:00 PM ET"
                - text: "Sun: Closed"
            - link "1-844-310-5528" [ref=e70] [cursor=pointer]:
              - /url: tel:+18442767741
            - heading "Send us a Text" [level=4] [ref=e72]
            - link "MYLAWN (695296)" [ref=e73] [cursor=pointer]:
              - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
          - generic [ref=e75]:
            - heading "Email us." [level=4] [ref=e76]
            - paragraph [ref=e77]: Send us your compliments, suggestions, questions, and more. We’ll get back to you in 1-2 business days.
            - link "Email Us" [ref=e78] [cursor=pointer]:
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
    - generic [ref=e80]:
      - generic [ref=e83]:
        - heading "Questions? Glad you asked." [level=2] [ref=e84]:
          - text: Questions?
          - text: Glad you asked.
        - generic [ref=e85]:
          - textbox "Search FAQs" [ref=e86]
          - img [ref=e87] [cursor=pointer]
      - generic [ref=e89]:
        - tablist [ref=e91]:
          - tab "Most Common Questions" [selected] [ref=e92] [cursor=pointer]
          - tab "Before My Service" [selected] [ref=e93] [cursor=pointer]
          - tab "After My Service" [selected] [ref=e94] [cursor=pointer]
          - tab "General Service Questions" [selected] [ref=e95] [cursor=pointer]
          - tab "Billing" [selected] [ref=e96] [cursor=pointer]
          - tab "Lawn Care" [selected] [ref=e97] [cursor=pointer]
          - tab "TruShrub" [selected] [ref=e98] [cursor=pointer]
          - tab "TruDefense" [selected] [ref=e99] [cursor=pointer]
          - tab "TruBarrier" [selected] [ref=e100] [cursor=pointer]
          - tab "About TruGreen" [selected] [ref=e101] [cursor=pointer]
        - tabpanel "Most Common Questions" [ref=e103]:
          - generic [ref=e104]:
            - generic [ref=e105]:
              - heading "If it rained right after my application will the treatment still be effective?" [level=5] [ref=e107]:
                - button "If it rained right after my application will the treatment still be effective?" [expanded] [ref=e108] [cursor=pointer]
              - generic "If it rained right after my application will the treatment still be effective?" [ref=e109]:
                - generic [ref=e110]: For most products, rainfall before or after an application typically enhances the effectiveness of your TruGreen application. Water is vital for proper plant health and aids in carrying nutrients into the soil so they can be absorbed by a plant’s root system. Water also activates pre-emergent weed control and sub-surface insect control. TruGreen applications won’t wash away once they are absorbed by the plant or watered into the soil.
            - heading "How long will it take for weeds to disappear after my TruGreen service begins?" [level=5] [ref=e113]:
              - button "How long will it take for weeds to disappear after my TruGreen service begins?" [ref=e114] [cursor=pointer]
            - heading "What happens if TruGreen misses a scheduled appointment?" [level=5] [ref=e117]:
              - button "What happens if TruGreen misses a scheduled appointment?" [ref=e118] [cursor=pointer]
            - heading "Why is there a difference between the bill I received and what I signed up for?" [level=5] [ref=e121]:
              - button "Why is there a difference between the bill I received and what I signed up for?" [ref=e122] [cursor=pointer]
            - heading "What should I do if I think TruGreen forgot to treat part of my property?" [level=5] [ref=e125]:
              - button "What should I do if I think TruGreen forgot to treat part of my property?" [ref=e126] [cursor=pointer]
            - heading "What should I know about brown or bare spots that may develop on my lawn after service?" [level=5] [ref=e129]:
              - button "What should I know about brown or bare spots that may develop on my lawn after service?" [ref=e130] [cursor=pointer]
    - generic [ref=e134]:
      - generic [ref=e135]:
        - heading "Let’s talk lawn." [level=2] [ref=e136]
        - paragraph [ref=e137]: Our experts really know their stuff, that’s why they’re, well, experts. Tell us what’s on your mind and we’ll get back to you with an answer as soon as possible.
      - generic [ref=e138]:
        - paragraph [ref=e140]: "* Required information"
        - generic [ref=e141]:
          - generic [ref=e142]:
            - generic [ref=e143]:
              - generic [ref=e144]: Full Name*
              - textbox "Full Name*" [ref=e145]
            - generic [ref=e146]:
              - generic [ref=e147]: Phone*
              - textbox "Phone* Phone*" [ref=e148]:
                - /placeholder: (___)-___-____
          - generic [ref=e150]:
            - generic [ref=e151]: Address*
            - combobox [ref=e152]:
              - textbox "Address* Address*" [ref=e153]:
                - /placeholder: ""
              - listbox
          - generic [ref=e154]:
            - generic [ref=e155]:
              - generic [ref=e156]: Email Address*
              - textbox "Email Address* Email*" [ref=e157]
            - generic [ref=e158]:
              - generic [ref=e159]: Zip Code*
              - textbox "Zip Code* Zip Code*" [ref=e160]
          - generic [ref=e161]:
            - generic [ref=e162]:
              - generic [ref=e163]: Subject*
              - combobox "Subject*" [ref=e164]:
                - option "Select" [selected]
                - option "Our Services"
                - option "Customer Service"
                - option "About Us"
            - generic [ref=e165]:
              - generic [ref=e166]: Topic*
              - combobox "Topic*" [disabled] [ref=e167]:
                - option "Select" [selected]
          - generic [ref=e169]:
            - generic [ref=e170]:
              - generic [ref=e171]: What’s on your mind?*
              - generic [ref=e172]: 0/300
            - textbox [ref=e173]
            - button "Submit" [ref=e174]
            - paragraph [ref=e175]:
              - text: "By providing my contact information and clicking “Submit”, I consent to: (1) receive autodialed marketing and non-marketing calls, texts and prerecorded messages from TruGreen; and (2) TruGreen’s"
              - link "Privacy Policy" [ref=e176] [cursor=pointer]:
                - /url: /about/privacy-policy
              - text: and
              - link "Terms and Conditions" [ref=e177] [cursor=pointer]:
                - /url: /about/terms
              - text: (including arbitration provision and class action waiver). California residents, see TruGreen’s California
              - link "Privacy Notice" [ref=e178] [cursor=pointer]:
                - /url: /about/california-privacy-policy
              - text: and
              - link "Privacy Policy" [ref=e179] [cursor=pointer]:
                - /url: /about/california-privacy-policy
              - text: . I understand that my consent is not required to obtain a quote or purchase TruGreen services and that the cancellation of that account does not automatically revoke this consent.
  - contentinfo [ref=e180]:
    - generic [ref=e181]:
      - generic [ref=e182]:
        - generic [ref=e184]:
          - heading "About US" [level=5] [ref=e185]
          - list [ref=e186]:
            - listitem [ref=e187]:
              - link "About TruGreen" [ref=e188] [cursor=pointer]:
                - /url: /newsroom/executive-staff#about
            - listitem [ref=e189]:
              - link "Executive Staff" [ref=e190] [cursor=pointer]:
                - /url: /newsroom/executive-staff
            - listitem [ref=e191]:
              - link "Newsroom" [ref=e192] [cursor=pointer]:
                - /url: /newsroom
            - listitem [ref=e193]:
              - link "Careers" [ref=e194] [cursor=pointer]:
                - /url: https://www.trugreenjobs.com
        - generic [ref=e196]:
          - heading "Our Services" [level=5] [ref=e197]
          - list [ref=e198]:
            - listitem [ref=e199]:
              - link "Lawn Care Plan Comparison" [ref=e200] [cursor=pointer]:
                - /url: /products-and-services
            - listitem [ref=e201]:
              - link "Tree & Shrub Plan Overview" [ref=e202] [cursor=pointer]:
                - /url: /products-and-services/trushrub-tree-and-shrub-care
            - listitem [ref=e203]:
              - link "Pest Control Plan Comparison" [ref=e204] [cursor=pointer]:
                - /url: /pests-products-and-services
            - listitem [ref=e205]:
              - link "Branch Finder" [ref=e206] [cursor=pointer]:
                - /url: /local-lawn-care
        - generic [ref=e208]:
          - heading "Resources" [level=5] [ref=e209]
          - list [ref=e210]:
            - listitem [ref=e211]:
              - link "FAQs" [ref=e212] [cursor=pointer]:
                - /url: /lawn-care-101/faqs
            - listitem [ref=e213]:
              - link "Military Discount" [ref=e214] [cursor=pointer]:
                - /url: /military-discount
            - listitem [ref=e215]:
              - link "Learning Center" [ref=e216] [cursor=pointer]:
                - /url: /lawn-care-101/learning-center
            - listitem [ref=e217]:
              - link "Blogs" [ref=e218] [cursor=pointer]:
                - /url: /lawn-care-101/blog
            - listitem [ref=e219]:
              - link "Service Terms and Conditions" [ref=e220] [cursor=pointer]:
                - /url: /service-terms-and-conditions
        - generic [ref=e223]:
          - heading "For new service" [level=5] [ref=e224]
          - list [ref=e225]:
            - listitem [ref=e226]:
              - link "1-844-310-5528" [ref=e227] [cursor=pointer]:
                - /url: tel:1-844-310-5528
            - listitem [ref=e228]:
              - link "Get a Call Back" [ref=e229] [cursor=pointer]:
                - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        - generic [ref=e232]:
          - heading "For our Customer" [level=5] [ref=e233]
          - list [ref=e234]:
            - listitem [ref=e235]:
              - link "Account Login & Register" [ref=e236] [cursor=pointer]:
                - /url: /my-account/login
            - listitem [ref=e237]:
              - generic [ref=e238]: "Call:"
              - link "1-844-310-5528" [ref=e239] [cursor=pointer]:
                - /url: tel:1-844-310-5528
            - listitem [ref=e240]:
              - 'link "Text: MYLAWN (695296)" [ref=e241] [cursor=pointer]':
                - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
            - listitem [ref=e242]:
              - link "Customer Support" [ref=e243] [cursor=pointer]:
                - /url: /customer-support
            - listitem [ref=e244]:
              - link "Pay My Bill" [ref=e245] [cursor=pointer]:
                - /url: /pay-your-bill
      - generic [ref=e248]:
        - paragraph [ref=e249]: "**Available to residential customers for Lawn, TruDefense Mosquito,TruBarrier Perimeter Pest, Flea, Tick & Outdoor Nuisance Pest Control and/or TruShrub Tree & Shrub services only. Requires purchase of annual plan using PrePay or EasyPay. Guarantee based on a matching quote from a Qualified Provider. Parameters include matching service address, number of applications, application price, services to be performed and areas to be treated. Not valid on quotes older than 120 days or one-day sales/seasonal promotions. TruGreen reserves the right to verify. For first year of service only. Limited time offer. Not to be combined with or used in conjunction with any other offer or discount. Valid at participating TruGreen locations. Additional restrictions may apply. Consumer responsible for all sales tax."
        - paragraph [ref=e250]: ¹ Special price of 50% off is for first Lawn application★, Tree & Shrub application✢, and/or Mosquito application★★ only. All other restrictions apply.
        - paragraph [ref=e251]: ◆ TruGreen will gladly visit your property as needed between scheduled visits to ensure your satisfaction. Guarantee applies to full program customers only. Excludes TruBasic and partial programs. Additional restrictions may apply.
        - paragraph [ref=e252]: ✦ Purchase of full lawn plan required for Healthy Lawn Analysis, which is performed at the first visit.
        - paragraph [ref=e253]: ★ Requires purchase of annual plan. Special price is for first application only. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount.
        - paragraph [ref=e254]: ✢ Requires purchase of annual plan. Special price is for first Tree & Shrub application only, for new residential EasyPay or PrePay customers only. TruGreen® Tree & Shrub includes fertilization of common trees and shrubs, and controls common foliar insects and diseases. It does not include treatment of specialty trees such as fruit or certain ornamentals, or assessment and treatment of trees over 25 ft. in height. For more details, go to TruGreen FAQs at TruGreen.com/FAQTREE. Not to be combined with or used in conjunction with any other offer or discount for the same service. Consumer responsible for all sales tax.
        - paragraph [ref=e255]: ★★ Requires purchase of full mosquito plan. Special price is for first mosquito application only, for new EasyPay or PrePay residential customers only. Valid at participating TruGreen locations. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax. ✧ Guarantee applies to full plan customers only.
        - paragraph [ref=e256]: ◆◆ Prices start at $99.95 for residential customers only and treatment area up to 20K sq. ft. For areas larger than 20K sq. ft., please call for estimate. Service does not include removal of webs higher than 10 ft. and application does not protect against termites and other wood-destroying organisms, bedbugs, bees, fleas, German cockroaches, hornets, pharaoh ants, rodents, or ticks. Valid at participating TruGreen locations. Not to be combined with or used in conjunction with any other oﬀer or discount. Additional restrictions may apply. Consumer responsible for all sales tax.
        - paragraph [ref=e257]:
          - text: "America’s #1 lawn care company based on U.S. market share of professional lawn care companies. 2023 MMR Brand Health Tracker."
          - link "PGATOUR.COM" [ref=e258] [cursor=pointer]:
            - /url: https://pgatour.com/
          - text: ", PGA TOUR, TPC, SHOTLINK and the SWINGING GOLFER LOGO are trademarks of PGA TOUR, Inc. BBB accredited since 7/01/2012."
      - generic [ref=e259]:
        - generic [ref=e261]:
          - generic [ref=e262]:
            - link "Facebook Icon" [ref=e263] [cursor=pointer]:
              - /url: https://www.facebook.com/trugreen
              - img "Facebook Icon" [ref=e264]
            - link "X.com Icon" [ref=e265] [cursor=pointer]:
              - /url: https://x.com/trugreen
              - img "X.com Icon" [ref=e266]
            - link "Instagram Icon" [ref=e267] [cursor=pointer]:
              - /url: https://www.instagram.com/trugreen/
              - img "Instagram Icon" [ref=e268]
            - link "Youtube Icon" [ref=e269] [cursor=pointer]:
              - /url: https://www.youtube.com/trugreen
              - img "Youtube Icon" [ref=e270]
            - link "TikTok Icon" [ref=e271] [cursor=pointer]:
              - /url: https://www.tiktok.com/@trugreen_lawn?lang=en
              - img "TikTok Icon" [ref=e272]
            - link "Yelp Icon" [ref=e273] [cursor=pointer]:
              - /url: https://www.yelp.com/
              - img "Yelp Icon" [ref=e274]
          - generic [ref=e275]:
            - 'link "BBB: Better Business Bureau, Accredited Business Badge" [ref=e276] [cursor=pointer]':
              - /url: https://www.bbb.org/us/tn/memphis/profile/lawn-maintenance/trugreen-0543-1000545#bbbseal
              - 'img "BBB: Better Business Bureau, Accredited Business Badge" [ref=e277]'
            - 'link "NALP: National Association of Landscape Professionals Logo" [ref=e278] [cursor=pointer]':
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
              - 'img "NALP: National Association of Landscape Professionals Logo" [ref=e279]'
            - 'link "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e280] [cursor=pointer]':
              - /url: https://www.trugreen.com/pga-tour
              - 'img "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e281]'
            - 'link "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e282] [cursor=pointer]':
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
              - 'img "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e283]'
        - separator [ref=e284]
      - generic [ref=e287]:
        - paragraph [ref=e289]:
          - img "TruGreen Leaf Logo" [ref=e290]
          - text: © 2026 TruGreen Limited Partnership. All rights reserved.
        - list [ref=e292]:
          - listitem [ref=e293]:
            - link "SMS Terms and Conditions" [ref=e294] [cursor=pointer]:
              - /url: /about/sms-terms
          - listitem [ref=e295]:
            - link "Terms and Conditions" [ref=e296] [cursor=pointer]:
              - /url: /about/terms
          - listitem [ref=e297]:
            - link "Privacy Policy" [ref=e298] [cursor=pointer]:
              - /url: /about/privacy-policy
          - listitem [ref=e299]:
            - link "California Privacy Notice" [ref=e300] [cursor=pointer]:
              - /url: /about/california-privacy-policy
          - listitem [ref=e301]:
            - link "Your Privacy Choices privacyoptions" [ref=e302] [cursor=pointer]:
              - /url: /about/privacy-policy#additionalStatePrivacyRights
              - text: Your Privacy Choices
              - img "privacyoptions" [ref=e303]
  - alert [ref=e304]
  - generic: Cookie Settings
  - button "Provide Feedback" [ref=e305] [cursor=pointer]:
    - generic [ref=e307]: Provide Feedback
  - dialog [ref=e308]:
    - button [ref=e310] [cursor=pointer]:
      - img [ref=e311]
  - iframe
```

# Test source

```ts
  103 |     : {};
  104 | }
  105 | 
  106 | async function waitForPageContent(page: any, path: string) {
  107 |   if (path !== "/") {
  108 |     return;
  109 |   }
  110 | 
  111 |   await page
  112 |     .waitForFunction(
  113 |       () => {
  114 |         const main = document.querySelector("main");
  115 |         const hasMainContent = Boolean(main && main.textContent?.trim());
  116 |         const pageIsTallerThanViewport =
  117 |           document.documentElement.scrollHeight > window.innerHeight + 200;
  118 | 
  119 |         return hasMainContent || pageIsTallerThanViewport;
  120 |       },
  121 |       { timeout: 10000 },
  122 |     )
  123 |     .catch(() => {});
  124 | 
  125 |   await page
  126 |     .evaluate(
  127 |       () =>
  128 |         new Promise((resolve) =>
  129 |           requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  130 |         ),
  131 |     )
  132 |     .catch(() => {});
  133 | }
  134 | 
  135 | function getElementScreenshotName(item: any) {
  136 |   return `${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
  137 | }
  138 | 
  139 | async function expectElementScreenshot(page: any, item: any) {
  140 |   for (const useCacheBust of [false, true]) {
  141 |     try {
  142 |       const element = await getHomePageElement(page, item, useCacheBust);
  143 | 
  144 |       await stabilizeElementForScreenshot(page, item);
  145 | 
  146 |       await expect(element).toHaveScreenshot(
  147 |         getElementScreenshotName(item),
  148 |         getElementScreenshotOptions(item),
  149 |       );
  150 |       return;
  151 |     } catch (error) {
  152 |       if (useCacheBust) {
  153 |         throw error;
  154 |       }
  155 | 
  156 |       await page.context().clearCookies();
  157 |       await page
  158 |         .evaluate(() => {
  159 |           window.localStorage.clear();
  160 |           window.sessionStorage.clear();
  161 |         })
  162 |         .catch(() => {});
  163 |     }
  164 |   }
  165 | }
  166 | 
  167 | async function removeElementIfExists(
  168 |   page: any,
  169 |   selector: string,
  170 |   name: string,
  171 | ) {
  172 |   const element = page.locator(selector);
  173 |   if ((await element.count()) > 0) {
  174 |     console.log(`Removing ${name} element...`);
  175 |     await element.evaluate((node: any) => node.remove());
  176 |   }
  177 | }
  178 | 
  179 | test.describe("Visual Regression Tests @visual-regression", () => {
  180 |   for (const item of elementScreenshotItems) {
  181 |     test(`should match screenshot for removed selector ${item.name}`, async ({
  182 |       page,
  183 |     }) => {
  184 |       await expectElementScreenshot(page, item);
  185 |     });
  186 |   }
  187 | 
  188 |   for (const path of paths) {
  189 |     test(`should match screenshot for ${path}`, async ({ page }) => {
  190 |       const url = `${BASE_URL}${path}`;
  191 | 
  192 |       await page.goto(url);
  193 | 
  194 |       await waitForPageContent(page, path);
  195 | 
  196 |       await emulateLazyLoadScroll(page);
  197 |       await page.waitForTimeout(5000);
  198 | 
  199 |       for (const item of selectorsToRemove) {
  200 |         await removeElementIfExists(page, item.selector, item.name);
  201 |       }
  202 | 
> 203 |       await expect(page).toHaveScreenshot({
      |                          ^ Error: expect(page).toHaveScreenshot(expected) failed
  204 |         fullPage: true,
  205 |         mask: selectorsToMask.map((item) => page.locator(item.selector)),
  206 |         maxDiffPixelRatio: 0.03,
  207 |       });
  208 |     });
  209 |   }
  210 | });
  211 | 
```