# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual/visual-regression.spec.ts >> Visual Regression Tests @visual-regression >> should match screenshot for /lawn-care-101
- Location: tests/visual/visual-regression.spec.ts:189:9

# Error details

```
Error: A snapshot doesn't exist at /home/runner/work/trugreen/trugreen/snaps/visual/iPhone-Safari/Visual-Regression-Tests-visual-regression-should-match-screenshot-for-lawn-care-101-1.png, writing actual.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner:
    - generic [ref=e2]:
      - paragraph [ref=e7] [cursor=pointer]:
        - link "Save time and unlock exclusive online pricing - get started today." [ref=e8]:
          - /url: /buy-online
      - generic [ref=e10]:
        - link "TruGreen Logo" [ref=e12]:
          - /url: /
          - img "TruGreen Logo" [ref=e13]
        - generic [ref=e15]:
          - link "location_icon" [ref=e16]:
            - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
            - img "location_icon" [ref=e17]
          - link [ref=e18]:
            - /url: tel:+18443442152
            - img [ref=e19]
          - link "hamMenu_icon" [ref=e20]:
            - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
            - img "hamMenu_icon" [ref=e21]
  - generic [ref=e23]:
    - banner [ref=e24]:
      - heading "Lawn Care 101" [level=1] [ref=e25]
      - paragraph [ref=e26]: Explore our blog, get expert advice, and learn more about how TruGreen can help you achieve your lawn care goals.
    - generic [ref=e28]:
      - generic [ref=e29]:
        - img "Blog" [ref=e30]
        - heading "Our Blog" [level=5] [ref=e31]
        - paragraph [ref=e32]: Get expert tips and tricks on keeping your lawn and landscape healthy throughout the seasons.
        - link "Visit our blog" [ref=e33]:
          - /url: /lawn-care-101/blog
          - button "Visit our blog" [ref=e34] [cursor=pointer]
      - generic [ref=e35]:
        - img "Learning Center" [ref=e36]
        - heading "Learning Center" [level=5] [ref=e37]
        - paragraph [ref=e38]: Learn how to spot pesky critters, detect lawn diseases, identify your grass type, and more.
        - link "Start exploring" [ref=e39]:
          - /url: /lawn-care-101/learning-center
          - button "Start exploring" [ref=e40] [cursor=pointer]
      - generic [ref=e41]:
        - img "specialist" [ref=e42]
        - heading "Ask The Agronomists" [level=5] [ref=e43]
        - paragraph [ref=e44]: Find out what lawn care scientists recommend you do to achieve and maintain a healthy lawn.
        - link "Explore More" [ref=e45]:
          - /url: /lawn-care-101/blog/lawn-care-tips/ask-agronomists-lawncare-tips-experts
          - button "Explore More" [ref=e46] [cursor=pointer]
      - generic [ref=e47]:
        - img "FAQ" [ref=e48]
        - heading "FAQs" [level=5] [ref=e49]
        - paragraph [ref=e50]: You’ve got questions and we’ve got answers. Everything you need to know about TruGreen’s range of services.
        - link "See FAQs" [ref=e51]:
          - /url: /lawn-care-101/faqs
          - button "See FAQs" [ref=e52] [cursor=pointer]
    - generic [ref=e53]:
      - heading "Featured Blog Posts" [level=2] [ref=e55]
      - generic [ref=e57]:
        - 'link "Winter Lawn Damage: Protecting Your Lawn from Extreme Winter Weather Lawn Damage Winter Lawn Damage: Protecting Your Lawn from Extreme Winter Weather" [ref=e59]':
          - /url: /lawn-care-101/blog/lawn-care-tips/winter-lawn-damage-protecting-your-lawn-extreme-winter-weather
          - 'img "Winter Lawn Damage: Protecting Your Lawn from Extreme Winter Weather" [ref=e60]'
          - generic [ref=e61]:
            - button "Lawn Damage" [ref=e63] [cursor=pointer]
            - paragraph [ref=e64]: "Winter Lawn Damage: Protecting Your Lawn from Extreme Winter Weather"
        - 'link "How to Winterize Your Yard: Essential Lawn Protection Tips Lawn Care How to Winterize Your Yard: Essential Lawn Protection Tips" [ref=e66]':
          - /url: /lawn-care-101/blog/lawn-care-tips/tips-to-protect-your-yard-this-winter
          - 'img "How to Winterize Your Yard: Essential Lawn Protection Tips" [ref=e67]'
          - generic [ref=e68]:
            - button "Lawn Care" [ref=e70] [cursor=pointer]
            - paragraph [ref=e71]: "How to Winterize Your Yard: Essential Lawn Protection Tips"
        - link "How to Protect Trees from Frost Damage Tree & Shrub Care How to Protect Trees from Frost Damage" [ref=e73]:
          - /url: /lawn-care-101/blog/lawn-care-tips/protect-your-trees-and-shrubs-from-frost
          - img "How to Protect Trees from Frost Damage" [ref=e74]
          - generic [ref=e75]:
            - button "Tree & Shrub Care" [ref=e77] [cursor=pointer]
            - paragraph [ref=e78]: How to Protect Trees from Frost Damage
        - 'link "Mowing Leaves: Should You Mulch or Rake for a Healthier Lawn? Lawn Care Mowing Leaves: Should You Mulch or Rake for a Healthier Lawn?" [ref=e80]':
          - /url: /lawn-care-101/blog/lawn-care-tips/it-better-rake-or-mulch-your-leaves
          - 'img "Mowing Leaves: Should You Mulch or Rake for a Healthier Lawn?" [ref=e81]'
          - generic [ref=e82]:
            - button "Lawn Care" [ref=e84] [cursor=pointer]
            - paragraph [ref=e85]: "Mowing Leaves: Should You Mulch or Rake for a Healthier Lawn?"
        - 'link "Different Grass Types: How to Identify and Choose the Right One Lawn Care Different Grass Types: How to Identify and Choose the Right One" [ref=e87]':
          - /url: /lawn-care-101/blog/lawn-care-tips/what-type-grass-are-you
          - 'img "Different Grass Types: How to Identify and Choose the Right One" [ref=e88]'
          - generic [ref=e89]:
            - button "Lawn Care" [ref=e91] [cursor=pointer]
            - paragraph [ref=e92]: "Different Grass Types: How to Identify and Choose the Right One"
        - link "Top 5 Outdoor Friendsgiving Ideas Beyond the Lawn Top 5 Outdoor Friendsgiving Ideas" [ref=e94]:
          - /url: /lawn-care-101/blog/lawn-care-tips/friendsgiving
          - img "Top 5 Outdoor Friendsgiving Ideas" [ref=e95]
          - generic [ref=e96]:
            - button "Beyond the Lawn" [ref=e98] [cursor=pointer]
            - paragraph [ref=e99]: Top 5 Outdoor Friendsgiving Ideas
      - link "Visit our blog" [ref=e102] [cursor=pointer]:
        - /url: /lawn-care-101/blog
    - generic [ref=e103]:
      - heading "Learning Center" [level=2] [ref=e104]
      - paragraph [ref=e105]: Find out what might be growing on your lawn — from grass types to lawn weeds.
      - generic [ref=e108]:
        - generic [ref=e110]:
          - img "Grass Basics" [ref=e111]
          - heading "Grass Basics" [level=6] [ref=e112]
        - generic [ref=e114]:
          - img "Grassy Weeds" [ref=e115]
          - heading "Grassy Weeds" [level=6] [ref=e116]
        - generic [ref=e118]:
          - img "Broadleaf Weeds" [ref=e119]
          - heading "Broadleaf Weeds" [level=6] [ref=e120]
        - generic [ref=e122]:
          - img "Lawn Diseases" [ref=e123]
          - heading "Lawn Disease" [level=6] [ref=e124]
        - generic [ref=e126]:
          - img "Turf Grasses" [ref=e127]
          - heading "Turf Grasses" [level=6] [ref=e128]
        - generic [ref=e130]:
          - img "Lawn Pests" [ref=e131]
          - heading "Lawn Pests" [level=6] [ref=e132]
        - generic [ref=e134]:
          - img "Grass Basics" [ref=e135]
          - heading "Grass Basics" [level=6] [ref=e136]
        - generic [ref=e138]:
          - img "Grassy Weeds" [ref=e139]
          - heading "Grassy Weeds" [level=6] [ref=e140]
        - generic [ref=e142]:
          - img "Broadleaf Weeds" [ref=e143]
          - heading "Broadleaf Weeds" [level=6] [ref=e144]
        - generic [ref=e146]:
          - img "Lawn Diseases" [ref=e147]
          - heading "Lawn Disease" [level=6] [ref=e148]
        - generic [ref=e150]:
          - img "Turf Grasses" [ref=e151]
          - heading "Turf Grasses" [level=6] [ref=e152]
        - generic [ref=e154]:
          - img "Lawn Pests" [ref=e155]
          - heading "Lawn Pests" [level=6] [ref=e156]
      - link "Start Learning" [ref=e158]:
        - /url: /lawn-care-101/learning-center
        - button "Start Learning" [ref=e159] [cursor=pointer]
    - generic [ref=e160]:
      - heading "Our Services" [level=2] [ref=e161]
      - paragraph [ref=e162]: Learn more about how TruGreen can help you get results you can actually see.
      - generic [ref=e165]:
        - generic [ref=e167]:
          - link "Tree & Shrub Care Tree & Shrub Care" [ref=e172] [cursor=pointer]:
            - /url: /products-and-services/tree-and-shrub-service
            - img "Tree & Shrub Care" [ref=e173]
            - heading "Tree & Shrub Care" [level=5] [ref=e174]
          - link "Pest Control Pest Control" [ref=e179] [cursor=pointer]:
            - /url: /pests-products-and-services
            - img "Pest Control" [ref=e180]
            - heading "Pest Control" [level=5] [ref=e181]
          - link "Lawn Care Lawn Care" [ref=e186] [cursor=pointer]:
            - /url: /products-and-services
            - img "Lawn Care" [ref=e187]
            - heading "Lawn Care" [level=5] [ref=e188]
          - link "Tree & Shrub Care Tree & Shrub Care" [ref=e193] [cursor=pointer]:
            - /url: /products-and-services/tree-and-shrub-service
            - img "Tree & Shrub Care" [ref=e194]
            - heading "Tree & Shrub Care" [level=5] [ref=e195]
          - link "Pest Control Pest Control" [ref=e200] [cursor=pointer]:
            - /url: /pests-products-and-services
            - img "Pest Control" [ref=e201]
            - heading "Pest Control" [level=5] [ref=e202]
          - link "Lawn Care Lawn Care" [ref=e207] [cursor=pointer]:
            - /url: /products-and-services
            - img "Lawn Care" [ref=e208]
            - heading "Lawn Care" [level=5] [ref=e209]
          - link "Tree & Shrub Care Tree & Shrub Care" [ref=e214] [cursor=pointer]:
            - /url: /products-and-services/tree-and-shrub-service
            - img "Tree & Shrub Care" [ref=e215]
            - heading "Tree & Shrub Care" [level=5] [ref=e216]
        - generic [ref=e217]:
          - button "Backwards Navigation Arrow" [ref=e218] [cursor=pointer]
          - button "Forward Navigation Arrow" [ref=e219] [cursor=pointer]:
            - generic "Forward Navigation Arrow"
    - generic [ref=e222]:
      - generic [ref=e223]:
        - heading [level=2]
        - paragraph [ref=e225]: Our experts really know their stuff. They can help you pick a plan, tailor it to your needs, and give you a quote based on your property’s size and location.
      - link "Get Started" [ref=e227]:
        - /url: "#"
        - button "Get Started" [ref=e228] [cursor=pointer]
  - contentinfo [ref=e230]:
    - generic [ref=e231]:
      - generic [ref=e232]:
        - generic [ref=e234]:
          - heading "About US" [level=5] [ref=e235]
          - list:
            - listitem [ref=e236]:
              - link "About TruGreen" [ref=e237]:
                - /url: /newsroom/executive-staff#about
            - listitem [ref=e238]:
              - link "Executive Staff" [ref=e239]:
                - /url: /newsroom/executive-staff
            - listitem [ref=e240]:
              - link "Newsroom" [ref=e241]:
                - /url: /newsroom
            - listitem [ref=e242]:
              - link "Careers" [ref=e243]:
                - /url: https://www.trugreenjobs.com
        - generic [ref=e245]:
          - heading "Our Services" [level=5] [ref=e246]
          - list:
            - listitem [ref=e247]:
              - link "Lawn Care Plan Comparison" [ref=e248]:
                - /url: /products-and-services
            - listitem [ref=e249]:
              - link "Tree & Shrub Plan Overview" [ref=e250]:
                - /url: /products-and-services/trushrub-tree-and-shrub-care
            - listitem [ref=e251]:
              - link "Pest Control Plan Comparison" [ref=e252]:
                - /url: /pests-products-and-services
            - listitem [ref=e253]:
              - link "Branch Finder" [ref=e254]:
                - /url: /local-lawn-care
        - generic [ref=e256]:
          - heading "Resources" [level=5] [ref=e257]
          - list:
            - listitem [ref=e258]:
              - link "FAQs" [ref=e259]:
                - /url: /lawn-care-101/faqs
            - listitem [ref=e260]:
              - link "Military Discount" [ref=e261]:
                - /url: /military-discount
            - listitem [ref=e262]:
              - link "Learning Center" [ref=e263]:
                - /url: /lawn-care-101/learning-center
            - listitem [ref=e264]:
              - link "Blogs" [ref=e265]:
                - /url: /lawn-care-101/blog
            - listitem [ref=e266]:
              - link "Service Terms and Conditions" [ref=e267]:
                - /url: /service-terms-and-conditions
        - generic [ref=e270]:
          - heading "For new service" [level=5] [ref=e271]
          - list:
            - listitem [ref=e272]:
              - link "1-844-394-6536" [ref=e273]:
                - /url: tel:+18443442152
            - listitem [ref=e274]:
              - link "Get a Call Back" [ref=e275]:
                - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        - generic [ref=e278]:
          - heading "For our Customer" [level=5] [ref=e279]
          - list:
            - listitem [ref=e280]:
              - link "Account Login & Register" [ref=e281]:
                - /url: /my-account/login
            - listitem [ref=e282]:
              - generic [ref=e283]: "Call:"
              - link "1-844-463-1261" [ref=e284]:
                - /url: tel:+18442178147
            - listitem [ref=e285]:
              - 'link "Text: MYLAWN (695296)" [ref=e286]':
                - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
            - listitem [ref=e287]:
              - link "Customer Support" [ref=e288]:
                - /url: /customer-support
            - listitem [ref=e289]:
              - link "Pay My Bill" [ref=e290]:
                - /url: /pay-your-bill
      - generic [ref=e293]:
        - paragraph [ref=e294]: "**Available to residential customers for Lawn, TruDefense Mosquito,TruBarrier Perimeter Pest, Flea, Tick & Outdoor Nuisance Pest Control and/or TruShrub Tree & Shrub services only. Requires purchase of annual plan using PrePay or EasyPay. Guarantee based on a matching quote from a Qualified Provider. Parameters include matching service address, number of applications, application price, services to be performed and areas to be treated. Not valid on quotes older than 120 days or one-day sales/seasonal promotions. TruGreen reserves the right to verify. For first year of service only. Limited time offer. Not to be combined with or used in conjunction with any other offer or discount. Valid at participating TruGreen locations. Additional restrictions may apply. Consumer responsible for all sales tax."
        - paragraph [ref=e295]: ¹ Special price of 50% off is for first Lawn application★, Tree & Shrub application✢, and/or Mosquito application★★ only. All other restrictions apply.
        - paragraph [ref=e296]: ◆ TruGreen will gladly visit your property as needed between scheduled visits to ensure your satisfaction. Guarantee applies to full program customers only. Excludes TruBasic and partial programs. Additional restrictions may apply.
        - paragraph [ref=e297]: ✦ Purchase of full lawn plan required for Healthy Lawn Analysis, which is performed at the first visit.
        - paragraph [ref=e298]: ★ Requires purchase of annual plan. Special price is for first application only. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount.
        - paragraph [ref=e299]: ✢ Requires purchase of annual plan. Special price is for first Tree & Shrub application only, for new residential EasyPay or PrePay customers only. TruGreen® Tree & Shrub includes fertilization of common trees and shrubs, and controls common foliar insects and diseases. It does not include treatment of specialty trees such as fruit or certain ornamentals, or assessment and treatment of trees over 25 ft. in height. For more details, go to TruGreen FAQs at TruGreen.com/FAQTREE. Not to be combined with or used in conjunction with any other offer or discount for the same service. Consumer responsible for all sales tax.
        - paragraph [ref=e300]: ★★ Requires purchase of full mosquito plan. Special price is for first mosquito application only, for new EasyPay or PrePay residential customers only. Valid at participating TruGreen locations. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax. ✧ Guarantee applies to full plan customers only.
        - paragraph [ref=e301]: ◆◆ Prices start at $99.95 for residential customers only and treatment area up to 20K sq. ft. For areas larger than 20K sq. ft., please call for estimate. Service does not include removal of webs higher than 10 ft. and application does not protect against termites and other wood-destroying organisms, bedbugs, bees, fleas, German cockroaches, hornets, pharaoh ants, rodents, or ticks. Valid at participating TruGreen locations. Not to be combined with or used in conjunction with any other oﬀer or discount. Additional restrictions may apply. Consumer responsible for all sales tax.
        - paragraph [ref=e302]:
          - text: "America’s #1 lawn care company based on U.S. market share of professional lawn care companies. 2023 MMR Brand Health Tracker."
          - link "PGATOUR.COM" [ref=e303]:
            - /url: https://pgatour.com/
          - text: ", PGA TOUR, TPC, SHOTLINK and the SWINGING GOLFER LOGO are trademarks of PGA TOUR, Inc. BBB accredited since 7/01/2012."
      - generic [ref=e304]:
        - generic [ref=e306]:
          - generic [ref=e307]:
            - link "Facebook Icon" [ref=e308]:
              - /url: https://www.facebook.com/trugreen
              - img "Facebook Icon" [ref=e309]
            - link "X.com Icon" [ref=e310]:
              - /url: https://x.com/trugreen
              - img "X.com Icon" [ref=e311]
            - link "Instagram Icon" [ref=e312]:
              - /url: https://www.instagram.com/trugreen/
              - img "Instagram Icon" [ref=e313]
            - link "Youtube Icon" [ref=e314]:
              - /url: https://www.youtube.com/trugreen
              - img "Youtube Icon" [ref=e315]
            - link "TikTok Icon" [ref=e316]:
              - /url: https://www.tiktok.com/@trugreen_lawn?lang=en
              - img "TikTok Icon" [ref=e317]
            - link "Yelp Icon" [ref=e318]:
              - /url: https://www.yelp.com/
              - img "Yelp Icon" [ref=e319]
          - generic [ref=e320]:
            - 'link "BBB: Better Business Bureau, Accredited Business Badge" [ref=e321]':
              - /url: https://www.bbb.org/us/tn/memphis/profile/lawn-maintenance/trugreen-0543-1000545#bbbseal
              - 'img "BBB: Better Business Bureau, Accredited Business Badge" [ref=e322]'
            - 'link "NALP: National Association of Landscape Professionals Logo" [ref=e323]':
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
              - 'img "NALP: National Association of Landscape Professionals Logo" [ref=e324]'
            - 'link "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e325]':
              - /url: https://www.trugreen.com/pga-tour
              - 'img "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e326]'
            - 'link "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e327]':
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
              - 'img "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e328]'
        - separator [ref=e329]
      - generic [ref=e332]:
        - paragraph [ref=e334]:
          - img "TruGreen Leaf Logo" [ref=e335]
          - text: © 2026 TruGreen Limited Partnership. All rights reserved.
        - list [ref=e337]:
          - listitem [ref=e338]:
            - link "SMS Terms and Conditions" [ref=e339]:
              - /url: /about/sms-terms
          - listitem [ref=e340]:
            - link "Terms and Conditions" [ref=e341]:
              - /url: /about/terms
          - listitem [ref=e342]:
            - link "Privacy Policy" [ref=e343]:
              - /url: /about/privacy-policy
          - listitem [ref=e344]:
            - link "California Privacy Notice" [ref=e345]:
              - /url: /about/california-privacy-policy
          - listitem [ref=e346]:
            - link "Your Privacy Choices privacyoptions" [ref=e347]:
              - /url: /about/privacy-policy#additionalStatePrivacyRights
              - text: Your Privacy Choices
              - img "privacyoptions" [ref=e348]
  - generic [ref=e349]:
    - paragraph [ref=e350]: Questions? Quote, Call or Chat Now.
    - link "1-844-394-6536" [ref=e351]:
      - /url: tel:+18443442152
  - alert [ref=e352]
  - generic: Cookie Settings
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
      |       ^ Error: A snapshot doesn't exist at /home/runner/work/trugreen/trugreen/snaps/visual/iPhone-Safari/Visual-Regression-Tests-visual-regression-should-match-screenshot-for-lawn-care-101-1.png, writing actual.
  204 |         fullPage: true,
  205 |         mask: selectorsToMask.map((item) => page.locator(item.selector)),
  206 |         maxDiffPixelRatio: 0.03,
  207 |       });
  208 |     });
  209 |   }
  210 | });
  211 | 
```