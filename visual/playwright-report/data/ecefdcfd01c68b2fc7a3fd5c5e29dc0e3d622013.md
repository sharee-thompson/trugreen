# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual/visual-regression.spec.ts >> Visual Regression Tests @visual-regression >> should match screenshot for /lawn-care-101
- Location: tests/visual/visual-regression.spec.ts:191:9

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  529707 pixels (ratio 0.18 of all image pixels) are different.

Call log:
  - Expect "toHaveScreenshot" with timeout 5000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 529707 pixels (ratio 0.18 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - 529707 pixels (ratio 0.18 of all image pixels) are different.

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - alert [ref=e2]
  - banner:
    - generic [ref=e3]:
      - paragraph [ref=e8] [cursor=pointer]:
        - 'link "Save Like a Pro, Get 50% Off. Use Code: SUMMER." [ref=e9]':
          - /url: /buy-online
          - text: Get 50% Off This Summer.
          - superscript [ref=e10]: "5"
          - text: "Use Code: SUMMER at Checkout."
      - generic [ref=e12]:
        - link "TruGreen Logo" [ref=e14]:
          - /url: /
          - img "TruGreen Logo" [ref=e15]
        - generic [ref=e17]:
          - link "location_icon" [ref=e18]:
            - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
            - img "location_icon" [ref=e19]
          - link [ref=e20]:
            - /url: tel:+18444353891
            - img [ref=e21]
          - link "hamMenu_icon" [ref=e22]:
            - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
            - img "hamMenu_icon" [ref=e23]
  - generic [ref=e25]:
    - banner [ref=e26]:
      - heading "Lawn Care 101" [level=1] [ref=e27]
      - paragraph [ref=e28]: Explore our blog, get expert advice, and learn more about how TruGreen can help you achieve your lawn care goals.
    - generic [ref=e30]:
      - generic [ref=e31]:
        - img "Blog" [ref=e32]
        - heading "Our Blog" [level=5] [ref=e33]
        - paragraph [ref=e34]: Get expert tips and tricks on keeping your lawn and landscape healthy throughout the seasons.
        - link "Visit our blog" [ref=e35]:
          - /url: /lawn-care-101/blog
          - button "Visit our blog" [ref=e36] [cursor=pointer]
      - generic [ref=e37]:
        - img "Learning Center" [ref=e38]
        - heading "Learning Center" [level=5] [ref=e39]
        - paragraph [ref=e40]: Learn how to spot pesky critters, detect lawn diseases, identify your grass type, and more.
        - link "Start exploring" [ref=e41]:
          - /url: /lawn-care-101/learning-center
          - button "Start exploring" [ref=e42] [cursor=pointer]
      - generic [ref=e43]:
        - img "specialist" [ref=e44]
        - heading "Ask The Agronomists" [level=5] [ref=e45]
        - paragraph [ref=e46]: Find out what lawn care scientists recommend you do to achieve and maintain a healthy lawn.
        - link "Explore More" [ref=e47]:
          - /url: /lawn-care-101/blog/lawn-care-tips/ask-agronomists-lawncare-tips-experts
          - button "Explore More" [ref=e48] [cursor=pointer]
      - generic [ref=e49]:
        - img "FAQ" [ref=e50]
        - heading "FAQs" [level=5] [ref=e51]
        - paragraph [ref=e52]: You’ve got questions and we’ve got answers. Everything you need to know about TruGreen’s range of services.
        - link "See FAQs" [ref=e53]:
          - /url: /lawn-care-101/faqs
          - button "See FAQs" [ref=e54] [cursor=pointer]
    - generic [ref=e55]:
      - heading "Featured Blog Posts" [level=2] [ref=e57]
      - generic [ref=e59]:
        - 'link "Winter Lawn Damage: Protecting Your Lawn from Extreme Winter Weather Lawn Damage Winter Lawn Damage: Protecting Your Lawn from Extreme Winter Weather" [ref=e61]':
          - /url: /lawn-care-101/blog/lawn-care-tips/winter-lawn-damage-protecting-your-lawn-extreme-winter-weather
          - 'img "Winter Lawn Damage: Protecting Your Lawn from Extreme Winter Weather" [ref=e62]'
          - generic [ref=e63]:
            - button "Lawn Damage" [ref=e65] [cursor=pointer]
            - paragraph [ref=e66]: "Winter Lawn Damage: Protecting Your Lawn from Extreme Winter Weather"
        - 'link "How to Winterize Your Yard: Essential Lawn Protection Tips Lawn Care How to Winterize Your Yard: Essential Lawn Protection Tips" [ref=e68]':
          - /url: /lawn-care-101/blog/lawn-care-tips/tips-to-protect-your-yard-this-winter
          - 'img "How to Winterize Your Yard: Essential Lawn Protection Tips" [ref=e69]'
          - generic [ref=e70]:
            - button "Lawn Care" [ref=e72] [cursor=pointer]
            - paragraph [ref=e73]: "How to Winterize Your Yard: Essential Lawn Protection Tips"
        - link "How to Protect Trees from Frost Damage Tree & Shrub Care How to Protect Trees from Frost Damage" [ref=e75]:
          - /url: /lawn-care-101/blog/lawn-care-tips/protect-your-trees-and-shrubs-from-frost
          - img "How to Protect Trees from Frost Damage" [ref=e76]
          - generic [ref=e77]:
            - button "Tree & Shrub Care" [ref=e79] [cursor=pointer]
            - paragraph [ref=e80]: How to Protect Trees from Frost Damage
        - 'link "Mowing Leaves: Should You Mulch or Rake for a Healthier Lawn? Lawn Care Mowing Leaves: Should You Mulch or Rake for a Healthier Lawn?" [ref=e82]':
          - /url: /lawn-care-101/blog/lawn-care-tips/it-better-rake-or-mulch-your-leaves
          - 'img "Mowing Leaves: Should You Mulch or Rake for a Healthier Lawn?" [ref=e83]'
          - generic [ref=e84]:
            - button "Lawn Care" [ref=e86] [cursor=pointer]
            - paragraph [ref=e87]: "Mowing Leaves: Should You Mulch or Rake for a Healthier Lawn?"
        - 'link "Different Grass Types: How to Identify and Choose the Right One Lawn Care Different Grass Types: How to Identify and Choose the Right One" [ref=e89]':
          - /url: /lawn-care-101/blog/lawn-care-tips/what-type-grass-are-you
          - 'img "Different Grass Types: How to Identify and Choose the Right One" [ref=e90]'
          - generic [ref=e91]:
            - button "Lawn Care" [ref=e93] [cursor=pointer]
            - paragraph [ref=e94]: "Different Grass Types: How to Identify and Choose the Right One"
        - link "Top 5 Outdoor Friendsgiving Ideas Beyond the Lawn Top 5 Outdoor Friendsgiving Ideas" [ref=e96]:
          - /url: /lawn-care-101/blog/lawn-care-tips/friendsgiving
          - img "Top 5 Outdoor Friendsgiving Ideas" [ref=e97]
          - generic [ref=e98]:
            - button "Beyond the Lawn" [ref=e100] [cursor=pointer]
            - paragraph [ref=e101]: Top 5 Outdoor Friendsgiving Ideas
      - link "Visit our blog" [ref=e104] [cursor=pointer]:
        - /url: /lawn-care-101/blog
    - generic [ref=e105]:
      - heading "Learning Center" [level=2] [ref=e106]
      - paragraph [ref=e107]: Find out what might be growing on your lawn — from grass types to lawn weeds.
      - generic [ref=e110]:
        - generic [ref=e112]:
          - img "Grass Basics" [ref=e113]
          - heading "Grass Basics" [level=6] [ref=e114]
        - generic [ref=e116]:
          - img "Grassy Weeds" [ref=e117]
          - heading "Grassy Weeds" [level=6] [ref=e118]
        - generic [ref=e120]:
          - img "Broadleaf Weeds" [ref=e121]
          - heading "Broadleaf Weeds" [level=6] [ref=e122]
        - generic [ref=e124]:
          - img "Lawn Diseases" [ref=e125]
          - heading "Lawn Disease" [level=6] [ref=e126]
        - generic [ref=e128]:
          - img "Turf Grasses" [ref=e129]
          - heading "Turf Grasses" [level=6] [ref=e130]
        - generic [ref=e132]:
          - img "Lawn Pests" [ref=e133]
          - heading "Lawn Pests" [level=6] [ref=e134]
        - generic [ref=e136]:
          - img "Grass Basics" [ref=e137]
          - heading "Grass Basics" [level=6] [ref=e138]
        - generic [ref=e140]:
          - img "Grassy Weeds" [ref=e141]
          - heading "Grassy Weeds" [level=6] [ref=e142]
        - generic [ref=e144]:
          - img "Broadleaf Weeds" [ref=e145]
          - heading "Broadleaf Weeds" [level=6] [ref=e146]
        - generic [ref=e148]:
          - img "Lawn Diseases" [ref=e149]
          - heading "Lawn Disease" [level=6] [ref=e150]
        - generic [ref=e152]:
          - img "Turf Grasses" [ref=e153]
          - heading "Turf Grasses" [level=6] [ref=e154]
        - generic [ref=e156]:
          - img "Lawn Pests" [ref=e157]
          - heading "Lawn Pests" [level=6] [ref=e158]
      - link "Start Learning" [ref=e160]:
        - /url: /lawn-care-101/learning-center
        - button "Start Learning" [ref=e161] [cursor=pointer]
    - generic [ref=e162]:
      - heading "Our Services" [level=2] [ref=e163]
      - paragraph [ref=e164]: Learn more about how TruGreen can help you get results you can actually see.
      - generic [ref=e167]:
        - generic [ref=e169]:
          - link "Tree & Shrub Care Tree & Shrub Care" [ref=e174] [cursor=pointer]:
            - /url: /products-and-services/tree-and-shrub-service
            - img "Tree & Shrub Care" [ref=e175]
            - heading "Tree & Shrub Care" [level=5] [ref=e176]
          - link "Pest Control Pest Control" [ref=e181] [cursor=pointer]:
            - /url: /pests-products-and-services
            - img "Pest Control" [ref=e182]
            - heading "Pest Control" [level=5] [ref=e183]
          - link "Lawn Care Lawn Care" [ref=e188] [cursor=pointer]:
            - /url: /products-and-services
            - img "Lawn Care" [ref=e189]
            - heading "Lawn Care" [level=5] [ref=e190]
          - link "Tree & Shrub Care Tree & Shrub Care" [ref=e195] [cursor=pointer]:
            - /url: /products-and-services/tree-and-shrub-service
            - img "Tree & Shrub Care" [ref=e196]
            - heading "Tree & Shrub Care" [level=5] [ref=e197]
          - link "Pest Control Pest Control" [ref=e202] [cursor=pointer]:
            - /url: /pests-products-and-services
            - img "Pest Control" [ref=e203]
            - heading "Pest Control" [level=5] [ref=e204]
          - link "Lawn Care Lawn Care" [ref=e209] [cursor=pointer]:
            - /url: /products-and-services
            - img "Lawn Care" [ref=e210]
            - heading "Lawn Care" [level=5] [ref=e211]
          - link "Tree & Shrub Care Tree & Shrub Care" [ref=e216] [cursor=pointer]:
            - /url: /products-and-services/tree-and-shrub-service
            - img "Tree & Shrub Care" [ref=e217]
            - heading "Tree & Shrub Care" [level=5] [ref=e218]
        - generic [ref=e219]:
          - button "Backwards Navigation Arrow" [ref=e220] [cursor=pointer]
          - button "Forward Navigation Arrow" [ref=e221] [cursor=pointer]:
            - generic "Forward Navigation Arrow"
    - generic [ref=e224]:
      - generic [ref=e225]:
        - heading [level=2]
        - paragraph [ref=e227]: Our experts really know their stuff. They can help you pick a plan, tailor it to your needs, and give you a quote based on your property’s size and location.
      - link "Get Started" [ref=e229]:
        - /url: "#"
        - button "Get Started" [ref=e230] [cursor=pointer]
  - contentinfo [ref=e232]:
    - generic [ref=e233]:
      - generic [ref=e234]:
        - generic [ref=e236]:
          - heading "About US" [level=5] [ref=e237]
          - list:
            - listitem [ref=e238]:
              - link "About TruGreen" [ref=e239]:
                - /url: /newsroom/executive-staff#about
            - listitem [ref=e240]:
              - link "Executive Staff" [ref=e241]:
                - /url: /newsroom/executive-staff
            - listitem [ref=e242]:
              - link "Newsroom" [ref=e243]:
                - /url: /newsroom
            - listitem [ref=e244]:
              - link "Careers" [ref=e245]:
                - /url: https://www.trugreenjobs.com
        - generic [ref=e247]:
          - heading "Our Services" [level=5] [ref=e248]
          - list:
            - listitem [ref=e249]:
              - link "Lawn Care Plan Comparison" [ref=e250]:
                - /url: /products-and-services
            - listitem [ref=e251]:
              - link "Tree & Shrub Plan Overview" [ref=e252]:
                - /url: /products-and-services/trushrub-tree-and-shrub-care
            - listitem [ref=e253]:
              - link "Pest Control Plan Comparison" [ref=e254]:
                - /url: /pests-products-and-services
            - listitem [ref=e255]:
              - link "Branch Finder" [ref=e256]:
                - /url: /local-lawn-care
        - generic [ref=e258]:
          - heading "Resources" [level=5] [ref=e259]
          - list:
            - listitem [ref=e260]:
              - link "FAQs" [ref=e261]:
                - /url: /lawn-care-101/faqs
            - listitem [ref=e262]:
              - link "Military Discount" [ref=e263]:
                - /url: /military-discount
            - listitem [ref=e264]:
              - link "Learning Center" [ref=e265]:
                - /url: /lawn-care-101/learning-center
            - listitem [ref=e266]:
              - link "Blogs" [ref=e267]:
                - /url: /lawn-care-101/blog
            - listitem [ref=e268]:
              - link "Service Terms and Conditions" [ref=e269]:
                - /url: /service-terms-and-conditions
        - generic [ref=e272]:
          - heading "For new service" [level=5] [ref=e273]
          - list:
            - listitem [ref=e274]:
              - link "1-844-900-3276" [ref=e275]:
                - /url: tel:+18444353891
            - listitem [ref=e276]:
              - link "Get a Call Back" [ref=e277]:
                - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        - generic [ref=e280]:
          - heading "For our Customer" [level=5] [ref=e281]
          - list:
            - listitem [ref=e282]:
              - link "Account Login & Register" [ref=e283]:
                - /url: /my-account/login
            - listitem [ref=e284]:
              - generic [ref=e285]: "Call:"
              - link "1-844-463-0944" [ref=e286]:
                - /url: tel:+18444173964
            - listitem [ref=e287]:
              - 'link "Text: MYLAWN (695296)" [ref=e288]':
                - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
            - listitem [ref=e289]:
              - link "Customer Support" [ref=e290]:
                - /url: /customer-support
            - listitem [ref=e291]:
              - link "Pay My Bill" [ref=e292]:
                - /url: /pay-your-bill
      - generic [ref=e295]:
        - paragraph [ref=e296]: "**Available to residential customers for Lawn, TruDefense Mosquito,TruBarrier Perimeter Pest, Flea, Tick & Outdoor Nuisance Pest Control and/or TruShrub Tree & Shrub services only. Requires purchase of annual plan using PrePay or EasyPay. Guarantee based on a matching quote from a Qualified Provider. Parameters include matching service address, number of applications, application price, services to be performed and areas to be treated. Not valid on quotes older than 120 days or one-day sales/seasonal promotions. TruGreen reserves the right to verify. For first year of service only. Limited time offer. Not to be combined with or used in conjunction with any other offer or discount. Valid at participating TruGreen locations. Additional restrictions may apply. Consumer responsible for all sales tax."
        - paragraph [ref=e297]: ¹ Special price of 50% off is for first Lawn application★, Tree & Shrub application✢, and/or Mosquito application★★ only. All other restrictions apply.
        - paragraph [ref=e298]: ◆ TruGreen will gladly visit your property as needed between scheduled visits to ensure your satisfaction. Guarantee applies to full program customers only. Excludes TruBasic and partial programs. Additional restrictions may apply.
        - paragraph [ref=e299]: ✦ Purchase of full lawn plan required for Healthy Lawn Analysis, which is performed at the first visit.
        - paragraph [ref=e300]: ★ Requires purchase of annual plan. Special price is for first application only. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount.
        - paragraph [ref=e301]: ✢ Requires purchase of annual plan. Special price is for first Tree & Shrub application only, for new residential EasyPay or PrePay customers only. TruGreen® Tree & Shrub includes fertilization of common trees and shrubs, and controls common foliar insects and diseases. It does not include treatment of specialty trees such as fruit or certain ornamentals, or assessment and treatment of trees over 25 ft. in height. For more details, go to TruGreen FAQs at TruGreen.com/FAQTREE. Not to be combined with or used in conjunction with any other offer or discount for the same service. Consumer responsible for all sales tax.
        - paragraph [ref=e302]: ★★ Requires purchase of full mosquito plan. Special price is for first mosquito application only, for new EasyPay or PrePay residential customers only. Valid at participating TruGreen locations. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax. ✧ Guarantee applies to full plan customers only.
        - paragraph [ref=e303]: ◆◆ Service does not include removal of webs higher than 10 ft. and application does not protect against termites and other wood-destroying organisms, bedbugs, bees, fleas, German cockroaches, hornets, pharaoh ants, rodents, or ticks. Valid at participating TruGreen locations. Not to be combined with or used in conjunction with any other oﬀer or discount. Additional restrictions may apply. Consumer responsible for all sales tax.
        - paragraph [ref=e304]:
          - text: "America’s #1 lawn care company based on U.S. market share of professional lawn care companies. 2023 MMR Brand Health Tracker."
          - link "PGATOUR.COM" [ref=e305]:
            - /url: https://pgatour.com/
          - text: ", PGA TOUR, TPC, SHOTLINK and the SWINGING GOLFER LOGO are trademarks of PGA TOUR, Inc. BBB accredited since 7/01/2012."
        - paragraph [ref=e306]:
          - superscript [ref=e307]: "5"
          - text: Special price is for first two regular lawn services only. Use code SUMMER. Special pricing is given in consideration of your commitment to receive and pay for all treatments under your annual plan. If you cancel before your plan renews, the discounted visits may be charged at full price. Requires purchase of annual Lawn plan, for new residential EasyPay or PrePay customers only. Offer unavailable for lawns larger than 20,000 square feet. Not valid on TruBasic or partial programs. Available 5/22/2026-6/23/2026. One time discount only. Valid at participating TruGreen locations. Availability of services and/or products may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax.
      - generic [ref=e308]:
        - generic [ref=e310]:
          - generic [ref=e311]:
            - link "Facebook Icon" [ref=e312]:
              - /url: https://www.facebook.com/trugreen
              - img "Facebook Icon" [ref=e313]
            - link "X.com Icon" [ref=e314]:
              - /url: https://x.com/trugreen
              - img "X.com Icon" [ref=e315]
            - link "Instagram Icon" [ref=e316]:
              - /url: https://www.instagram.com/trugreen/
              - img "Instagram Icon" [ref=e317]
            - link "Youtube Icon" [ref=e318]:
              - /url: https://www.youtube.com/trugreen
              - img "Youtube Icon" [ref=e319]
            - link "TikTok Icon" [ref=e320]:
              - /url: https://www.tiktok.com/@trugreen_lawn?lang=en
              - img "TikTok Icon" [ref=e321]
            - link "Yelp Icon" [ref=e322]:
              - /url: https://www.yelp.com/
              - img "Yelp Icon" [ref=e323]
          - generic [ref=e324]:
            - 'link "BBB: Better Business Bureau, Accredited Business Badge" [ref=e325]':
              - /url: https://www.bbb.org/us/tn/memphis/profile/lawn-maintenance/trugreen-0543-1000545#bbbseal
              - 'img "BBB: Better Business Bureau, Accredited Business Badge" [ref=e326]'
            - 'link "NALP: National Association of Landscape Professionals Logo" [ref=e327]':
              - /url: "#"
              - 'img "NALP: National Association of Landscape Professionals Logo" [ref=e328]'
            - 'link "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e329]':
              - /url: https://www.trugreen.com/pga-tour
              - 'img "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e330]'
            - 'link "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e331]':
              - /url: "#"
              - 'img "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e332]'
        - separator [ref=e333]
      - generic [ref=e336]:
        - paragraph [ref=e338]:
          - img "TruGreen Leaf Logo" [ref=e339]
          - text: © 2026 TruGreen Limited Partnership. All rights reserved.
        - list [ref=e341]:
          - listitem [ref=e342]:
            - link "SMS Terms and Conditions" [ref=e343]:
              - /url: /about/sms-terms
          - listitem [ref=e344]:
            - link "Terms and Conditions" [ref=e345]:
              - /url: /about/terms
          - listitem [ref=e346]:
            - link "Privacy Policy" [ref=e347]:
              - /url: /about/privacy-policy
          - listitem [ref=e348]:
            - link "California Privacy Notice" [ref=e349]:
              - /url: /about/california-privacy-policy
          - listitem [ref=e350]:
            - link "Your Privacy Choices privacyoptions" [ref=e351]:
              - /url: /about/privacy-policy#additionalStatePrivacyRights
              - text: Your Privacy Choices
              - img "privacyoptions" [ref=e352]
  - generic [ref=e353]:
    - paragraph [ref=e354]: Questions? Quote, Call or Chat Now.
    - link "1-844-900-3276" [ref=e355]:
      - /url: tel:+18444353891
  - generic: Cookie Settings
```

# Test source

```ts
  104 |       }
  105 |     : {};
  106 | }
  107 | 
  108 | async function waitForPageContent(page: any, path: string) {
  109 |   if (path !== "/") {
  110 |     return;
  111 |   }
  112 | 
  113 |   await page
  114 |     .waitForFunction(
  115 |       () => {
  116 |         const main = document.querySelector("main");
  117 |         const hasMainContent = Boolean(main && main.textContent?.trim());
  118 |         const pageIsTallerThanViewport =
  119 |           document.documentElement.scrollHeight > window.innerHeight + 200;
  120 | 
  121 |         return hasMainContent || pageIsTallerThanViewport;
  122 |       },
  123 |       { timeout: 10000 },
  124 |     )
  125 |     .catch(() => {});
  126 | 
  127 |   await page
  128 |     .evaluate(
  129 |       () =>
  130 |         new Promise((resolve) =>
  131 |           requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  132 |         ),
  133 |     )
  134 |     .catch(() => {});
  135 | }
  136 | 
  137 | function getElementScreenshotName(item: any) {
  138 |   return `${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
  139 | }
  140 | 
  141 | async function expectElementScreenshot(page: any, item: any) {
  142 |   for (const useCacheBust of [false, true]) {
  143 |     try {
  144 |       const element = await getHomePageElement(page, item, useCacheBust);
  145 | 
  146 |       await stabilizeElementForScreenshot(page, item);
  147 | 
  148 |       await expect(element).toHaveScreenshot(
  149 |         getElementScreenshotName(item),
  150 |         getElementScreenshotOptions(item),
  151 |       );
  152 |       return;
  153 |     } catch (error) {
  154 |       if (useCacheBust) {
  155 |         throw error;
  156 |       }
  157 | 
  158 |       await page.context().clearCookies();
  159 |       await page
  160 |         .evaluate(() => {
  161 |           window.localStorage.clear();
  162 |           window.sessionStorage.clear();
  163 |         })
  164 |         .catch(() => {});
  165 |     }
  166 |   }
  167 | }
  168 | 
  169 | async function removeElementIfExists(
  170 |   page: any,
  171 |   selector: string,
  172 |   name: string,
  173 | ) {
  174 |   const element = page.locator(selector);
  175 |   if ((await element.count()) > 0) {
  176 |     console.log(`Removing ${name} element...`);
  177 |     await element.evaluate((node: any) => node.remove());
  178 |   }
  179 | }
  180 | 
  181 | test.describe("Visual Regression Tests @visual-regression", () => {
  182 |   for (const item of elementScreenshotItems) {
  183 |     test(`should match screenshot for removed selector ${item.name}`, async ({
  184 |       page,
  185 |     }) => {
  186 |       await expectElementScreenshot(page, item);
  187 |     });
  188 |   }
  189 | 
  190 |   for (const path of paths) {
  191 |     test(`should match screenshot for ${path}`, async ({ page }) => {
  192 |       const url = getBaseUrl(path);
  193 |       await page.goto(url);
  194 | 
  195 |       await waitForPageContent(page, path);
  196 | 
  197 |       await emulateLazyLoadScroll(page);
  198 |       await page.waitForTimeout(5000);
  199 | 
  200 |       for (const item of selectorsToRemove) {
  201 |         await removeElementIfExists(page, item.selector, item.name);
  202 |       }
  203 | 
> 204 |       await expect(page).toHaveScreenshot({
      |                          ^ Error: expect(page).toHaveScreenshot(expected) failed
  205 |         fullPage: true,
  206 |         mask: selectorsToMask.map((item) => page.locator(item.selector)),
  207 |         maxDiffPixelRatio: 0.03,
  208 |       });
  209 |     });
  210 |   }
  211 | 
  212 |   for (const [key, url] of Object.entries(landingPagePaths)) {
  213 |     test(`should match screenshot for landing page ${key}`, async ({
  214 |       page,
  215 |     }) => {
  216 |       await page.goto(url);
  217 | 
  218 |       await emulateLazyLoadScroll(page);
  219 |       await page.waitForTimeout(5000);
  220 | 
  221 |       for (const item of selectorsToRemove) {
  222 |         await removeElementIfExists(page, item.selector, item.name);
  223 |       }
  224 | 
  225 |       await expect(page).toHaveScreenshot({
  226 |         fullPage: true,
  227 |         mask: selectorsToMask.map((item) => page.locator(item.selector)),
  228 |         maxDiffPixelRatio: 0.03,
  229 |       });
  230 |     });
  231 |   }
  232 | });
  233 | 
```