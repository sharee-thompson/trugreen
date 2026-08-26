# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual/visual-regression.spec.ts >> Visual Regression Tests >> page: aeration
- Location: tests/visual/visual-regression.spec.ts:93:11

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

Timeout: 5000ms
  Failed to take two consecutive stable screenshots.

  Snapshot: fullpage-aeration.png

Call log:
  - Expect "toHaveScreenshot(fullpage-aeration.png)" with timeout 5000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - Expected an image 390px by 8694px, received 390px by 664px. 1540722 pixels (ratio 0.46 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - Expected an image 390px by 664px, received 390px by 8420px. 1445673 pixels (ratio 0.45 of all image pixels) are different.
  - waiting 250ms before taking screenshot
  - Timeout 5000ms exceeded.

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner:
    - generic [ref=e2]:
      - paragraph [ref=e7] [cursor=pointer]:
        - link "Save time and unlock exclusive online pricing - get started today." [ref=e8]:
          - /url: /buy-online
      - navigation "Mobile navigation" [ref=e9]:
        - generic [ref=e10]:
          - link "TruGreen Logo" [ref=e12]:
            - /url: /
            - img "TruGreen Logo" [ref=e13]
          - generic [ref=e15]:
            - link "location_icon" [ref=e16]:
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
              - img "location_icon" [ref=e17]
            - link "Call customer service" [ref=e18]:
              - /url: tel:1-844-311-0728
              - img "Call customer service" [ref=e19]
            - link "hamMenu_icon" [ref=e20]:
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
              - img "hamMenu_icon" [ref=e21]
  - main [ref=e22]:
    - main [ref=e23]:
      - generic [ref=e24]:
        - generic [ref=e26]:
          - img [ref=e27]
          - generic [ref=e31]:
            - heading "Aeration & Overseeding" [level=1] [ref=e32]
            - heading "Breathe new life into your lawn." [level=2] [ref=e33]
            - paragraph [ref=e34]: This annual service sets the stage for the long-term health and vitality of your lawn throughout the seasons.
            - button "Get a Custom Quote" [ref=e37] [cursor=pointer]
        - generic [ref=e42]:
          - paragraph [ref=e44]: Explore lawn care services in your area.
          - generic [ref=e46]:
            - textbox "Zip Code* Zip Code*" [ref=e48]:
              - /placeholder: ZIP Code
            - button "Submit" [ref=e50] [cursor=pointer]
        - generic [ref=e53]:
          - generic [ref=e54]:
            - heading "Benefits of lawn aeration." [level=2] [ref=e57]
            - generic [ref=e60]:
              - generic [ref=e61]:
                - heading "Breaks Up Thatch and Compacted Soil" [level=3] [ref=e62]
                - paragraph [ref=e63]: Compacted soil from everyday foot traffic and thatch buildup can prevent air, water, and nutrients from reaching your grass’ roots. A properly aerated lawn promotes a greener lawn that is more resilient against environmental stressors.
              - generic [ref=e64]:
                - heading "Increases Nutrient Availability" [level=3] [ref=e65]
                - paragraph [ref=e66]: Lawn aeration helps your grass’ roots access the essential nutrients they need. Aeration also boosts the effectiveness of TruGreen fertilization treatments and your ongoing watering to promote a healthy, beautiful turf.
              - generic [ref=e67]:
                - heading "Builds A Thicker, Fuller Lawn" [level=3] [ref=e68]
                - paragraph [ref=e69]: Aeration stimulates grass root development and growth to create and maintain a lush, thick lawn. For cool-season grasses, our specialists overseed your lawn to fill in bare spots and thicken up the turf. This helps crowd out unwanted weeds when spring arrives.
          - img "Benefits Section for aeration" [ref=e73]
        - generic [ref=e76]:
          - heading "Here’s how it works." [level=2] [ref=e79]
          - generic [ref=e80]:
            - generic [ref=e81]:
              - img "howitworks"
            - generic [ref=e82]:
              - generic [ref=e83]:
                - generic [ref=e84]:
                  - button "Timing Is Key" [expanded] [ref=e86] [cursor=pointer]:
                    - heading "Timing Is Key" [level=3] [ref=e87]
                  - generic "Timing Is Key" [ref=e88]:
                    - paragraph [ref=e90]: For warm-season grasses such as St. Augustine and Bermuda, it’s best to aerate your lawn in late spring or early summer. For cool-season grasses, such as Kentucky Bluegrass and Perennial Ryegrass, aeration is typically done in late summer or fall. During this treatment, your TruGreen specialist uses an aerator to punch small holes into your lawn to remove plugs of turf, soil, and thatch.
                - button "Overseeding" [ref=e93] [cursor=pointer]:
                  - heading "Overseeding" [level=3] [ref=e94]
                - button "When To Water" [ref=e97] [cursor=pointer]:
                  - heading "When To Water" [level=3] [ref=e98]
                - button "When To Mow" [ref=e101] [cursor=pointer]:
                  - heading "When To Mow" [level=3] [ref=e102]
                - button "Guaranteed Satisfaction ◆" [ref=e105] [cursor=pointer]:
                  - heading "Guaranteed Satisfaction ◆" [level=3] [ref=e106]
              - button "Talk With an Expert" [ref=e108] [cursor=pointer]
        - generic [ref=e110]:
          - generic [ref=e112]:
            - generic [ref=e113]:
              - heading "Plans that include lawn aeration and overseeding." [level=2] [ref=e114]
              - paragraph [ref=e115]: This service can be performed as a stand-alone treatment, or as part of an existing lawn care plan.
            - generic [ref=e117]:
              - generic [ref=e118]:
                - heading "TruPro℠" [level=3] [ref=e119]
                - generic [ref=e120]: Maximize your lawn's potential.
                - paragraph [ref=e121]: Our most comprehensive plan with everything your lawn needs to thrive.
                - link "Learn more about trupro" [ref=e122]:
                  - /url: /products-and-services/trupro
                  - button "Learn more" [ref=e124] [cursor=pointer]
              - separator [ref=e125]
              - generic [ref=e126]:
                - heading "What’s Included" [level=4] [ref=e127]
                - list [ref=e128]:
                  - listitem [ref=e129]: TruGreen Lawn Assessment
                  - listitem [ref=e130]: Tailored Lawn Plan
                  - listitem [ref=e131]: Fertilization and Weed Control
                  - listitem [ref=e132]: Lawn-Damaging Insect Control
                  - listitem [ref=e133]: Soil Enhancer Treatment
                  - listitem [ref=e134]: Aeration and Overseeding
                  - listitem [ref=e135]: Guaranteed Satisfaction ◆
          - generic [ref=e138]:
            - paragraph [ref=e139]: Not sure which plan you need? We can help.
            - button "Talk With an Expert" [ref=e141] [cursor=pointer]
        - generic [ref=e145]:
          - heading "Questions? Glad you asked." [level=2] [ref=e147]:
            - text: Questions?
            - generic [ref=e148]: Glad you asked.
          - generic [ref=e150]:
            - heading "Do I need to do anything to prepare for my first service?" [level=3] [ref=e152]:
              - button "Do I need to do anything to prepare for my first service?" [ref=e153] [cursor=pointer]
            - heading "Is my TruGreen lawn service guaranteed?" [level=3] [ref=e155]:
              - button "Is my TruGreen lawn service guaranteed?" [ref=e156] [cursor=pointer]
            - heading "Does TruGreen use dry granular or liquid materials when treating my lawns?" [level=3] [ref=e158]:
              - button "Does TruGreen use dry granular or liquid materials when treating my lawns?" [ref=e159] [cursor=pointer]
            - heading "What type of seed is used for overseeding treatment?" [level=3] [ref=e161]:
              - button "What type of seed is used for overseeding treatment?" [ref=e162] [cursor=pointer]
            - heading "Can I receive treatment if I have pets?" [level=3] [ref=e164]:
              - button "Can I receive treatment if I have pets?" [ref=e165] [cursor=pointer]
            - heading "When can families and pets return to serviced areas?" [level=3] [ref=e167]:
              - button "When can families and pets return to serviced areas?" [ref=e168] [cursor=pointer]
            - heading "Are the products applied by TruGreen safe?" [level=3] [ref=e170]:
              - button "Are the products applied by TruGreen safe?" [ref=e171] [cursor=pointer]
        - generic [ref=e174]:
          - heading "Your go-to guide for a healthy, beautiful lawn." [level=2] [ref=e175]
          - generic [ref=e176]:
            - generic [ref=e178]:
              - link "Blog-image-1 8 Essential Outdoor Tools and Equipment Every Homeowner Should Own" [ref=e180]:
                - /url: /lawn-care-101/blog/lawn-care-tips/8-essential-outdoor-tools-and-equipment-every-homeowner-should
                - img "Blog-image-1"
                - heading "8 Essential Outdoor Tools and Equipment Every Homeowner Should Own" [level=3] [ref=e182]
              - link "Blog-image-2 Why You Should Hire a Professional For Lawn Fertilization" [ref=e184]:
                - /url: /lawn-care-101/blog/lawn-care-tips/why-you-should-hire-professional-lawn-fertilization
                - img "Blog-image-2"
                - heading "Why You Should Hire a Professional For Lawn Fertilization" [level=3] [ref=e186]
              - link "Blog-image-0 Top 5 Reasons You Need Lawn Maintenance Services" [ref=e188]:
                - /url: /lawn-care-101/blog/trugreen-lawn-care-services/top-5-reasons-you-need-lawn-maintenance-services
                - img "Blog-image-0"
                - heading "Top 5 Reasons You Need Lawn Maintenance Services" [level=3] [ref=e190]
              - link "Blog-image-1 8 Essential Outdoor Tools and Equipment Every Homeowner Should Own" [ref=e192]:
                - /url: /lawn-care-101/blog/lawn-care-tips/8-essential-outdoor-tools-and-equipment-every-homeowner-should
                - img "Blog-image-1"
                - heading "8 Essential Outdoor Tools and Equipment Every Homeowner Should Own" [level=3] [ref=e194]
              - link "Blog-image-2 Why You Should Hire a Professional For Lawn Fertilization" [ref=e196]:
                - /url: /lawn-care-101/blog/lawn-care-tips/why-you-should-hire-professional-lawn-fertilization
                - img "Blog-image-2"
                - heading "Why You Should Hire a Professional For Lawn Fertilization" [level=3] [ref=e198]
              - link "Blog-image-0 Top 5 Reasons You Need Lawn Maintenance Services" [ref=e200]:
                - /url: /lawn-care-101/blog/trugreen-lawn-care-services/top-5-reasons-you-need-lawn-maintenance-services
                - img "Blog-image-0"
                - heading "Top 5 Reasons You Need Lawn Maintenance Services" [level=3] [ref=e202]
              - link "Blog-image-1 8 Essential Outdoor Tools and Equipment Every Homeowner Should Own" [ref=e204]:
                - /url: /lawn-care-101/blog/lawn-care-tips/8-essential-outdoor-tools-and-equipment-every-homeowner-should
                - img "Blog-image-1"
                - heading "8 Essential Outdoor Tools and Equipment Every Homeowner Should Own" [level=3] [ref=e206]
            - generic [ref=e207]:
              - button [ref=e208] [cursor=pointer]
              - button [ref=e209] [cursor=pointer]
            - generic [ref=e210]:
              - button [ref=e211] [cursor=pointer]
              - button [ref=e213] [cursor=pointer]
              - button [ref=e215] [cursor=pointer]
        - generic [ref=e219]:
          - heading "Let’s talk lawn." [level=2] [ref=e222]
          - generic [ref=e223]:
            - generic [ref=e225]:
              - generic [ref=e226]:
                - heading "Give us a call." [level=3] [ref=e227]
                - paragraph [ref=e228]: Talk with an expert and get a free quote.
                - generic [ref=e230]:
                  - generic [ref=e231]: "Mon – Sat: 8:00 AM – 10:00 PM ET"
                  - generic [ref=e232]: "Sun: 8:00 AM – 9:00 PM ET"
              - link "1-844-311-0728" [ref=e234] [cursor=pointer]:
                - /url: tel:18443110728
            - generic [ref=e236]:
              - generic [ref=e237]:
                - heading "We’ll call you." [level=3] [ref=e238]
                - paragraph [ref=e239]: One of our experts will be in touch as soon as possible.
              - button "Get a Call Back" [ref=e241] [cursor=pointer]
            - generic [ref=e243]:
              - generic [ref=e244]:
                - heading "Need support?" [level=3] [ref=e245]
                - paragraph [ref=e246]: Get help, find answers, and connect with one of our experts — all in one place.
              - link "See Support Options" [ref=e248]:
                - /url: /customer-support
                - button "See Support Options" [ref=e249] [cursor=pointer]
  - contentinfo [ref=e251]:
    - generic [ref=e252]:
      - generic [ref=e253]:
        - generic [ref=e255]:
          - heading "About US" [level=5] [ref=e256]
          - list:
            - listitem [ref=e257]:
              - link "About TruGreen" [ref=e258]:
                - /url: /newsroom/executive-staff#about
            - listitem [ref=e259]:
              - link "Executive Staff" [ref=e260]:
                - /url: /newsroom/executive-staff
            - listitem [ref=e261]:
              - link "Newsroom" [ref=e262]:
                - /url: /newsroom
            - listitem [ref=e263]:
              - link "Careers" [ref=e264]:
                - /url: https://www.trugreenjobs.com
        - generic [ref=e266]:
          - heading "Our Services" [level=5] [ref=e267]
          - list:
            - listitem [ref=e268]:
              - link "Lawn Care Plan Comparison" [ref=e269]:
                - /url: /products-and-services
            - listitem [ref=e270]:
              - link "Tree & Shrub Plan Overview" [ref=e271]:
                - /url: /products-and-services/trushrub-tree-and-shrub-care
            - listitem [ref=e272]:
              - link "Pest Control Plan Comparison" [ref=e273]:
                - /url: /pests-products-and-services
            - listitem [ref=e274]:
              - link "Branch Finder" [ref=e275]:
                - /url: /local-lawn-care
        - generic [ref=e277]:
          - heading "Resources" [level=5] [ref=e278]
          - list:
            - listitem [ref=e279]:
              - link "FAQs" [ref=e280]:
                - /url: /lawn-care-101/faqs
            - listitem [ref=e281]:
              - link "Military Discount" [ref=e282]:
                - /url: /military-discount
            - listitem [ref=e283]:
              - link "Learning Center" [ref=e284]:
                - /url: /lawn-care-101/learning-center
            - listitem [ref=e285]:
              - link "Blogs" [ref=e286]:
                - /url: /lawn-care-101/blog
            - listitem [ref=e287]:
              - link "Service Terms and Conditions" [ref=e288]:
                - /url: /service-terms-and-conditions
        - generic [ref=e291]:
          - heading "For new service" [level=5] [ref=e292]
          - list:
            - listitem [ref=e293]:
              - link "1-844-311-0728" [ref=e294]:
                - /url: tel:1-844-311-0728
            - listitem [ref=e295]:
              - link "Get a Call Back" [ref=e296]:
                - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        - generic [ref=e299]:
          - heading "For our Customer" [level=5] [ref=e300]
          - list:
            - listitem [ref=e301]:
              - link "Account Login & Register" [ref=e302]:
                - /url: /my-account/login
            - listitem [ref=e303]:
              - generic [ref=e304]: "Call:"
              - link "1-844-311-0728" [ref=e305]:
                - /url: tel:1-844-311-0728
            - listitem [ref=e306]:
              - 'link "Text: MYLAWN (695296)" [ref=e307]':
                - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
            - listitem [ref=e308]:
              - link "Customer Support" [ref=e309]:
                - /url: /customer-support
            - listitem [ref=e310]:
              - link "Pay My Bill" [ref=e311]:
                - /url: /pay-your-bill
      - generic [ref=e314]:
        - paragraph [ref=e315]: We may apply a surcharge not to exceed 3% to cover all or part of our costs of accepting your credit card. For Oklahoma-based consumers, the fee will be 2%.
        - paragraph [ref=e316]: "**Available to residential customers for Lawn, TruDefense Mosquito,TruBarrier Perimeter Pest, Flea, Tick & Outdoor Nuisance Pest Control and/or TruShrub Tree & Shrub services only. Requires purchase of annual plan using PrePay or EasyPay. Guarantee based on a matching quote from a Qualified Provider. Parameters include matching service address, number of applications, application price, services to be performed and areas to be treated. Not valid on quotes older than 120 days or one-day sales/seasonal promotions. TruGreen reserves the right to verify. For first year of service only. Limited time offer. Not to be combined with or used in conjunction with any other offer or discount. Valid at participating TruGreen locations. Additional restrictions may apply. Consumer responsible for all sales tax."
        - paragraph [ref=e317]: ◆ TruGreen will gladly visit your property as needed between scheduled visits to ensure your satisfaction. Guarantee applies to full program customers only. Excludes TruBasic and partial programs. Additional restrictions may apply.
        - paragraph [ref=e318]: ✦ Purchase of full lawn plan required for Healthy Lawn Analysis, which is performed at the first visit.
        - paragraph [ref=e319]: ★ Requires purchase of annual plan. Special price is for first application only. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount.
        - paragraph [ref=e320]: ✢ Requires purchase of annual plan. Special price is for first Tree & Shrub application only, for new residential EasyPay or PrePay customers only. TruGreen® Tree & Shrub includes fertilization of common trees and shrubs, and controls common foliar insects and diseases. It does not include treatment of specialty trees such as fruit or certain ornamentals, or assessment and treatment of trees over 25 ft. in height. For more details, go to TruGreen FAQs at TruGreen.com/FAQTREE. Not to be combined with or used in conjunction with any other offer or discount for the same service. Consumer responsible for all sales tax.
        - paragraph [ref=e321]: ★★ Requires purchase of full mosquito plan. Special price is for first mosquito application only, for new EasyPay or PrePay residential customers only. Valid at participating TruGreen locations. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax. ✧ Guarantee applies to full plan customers only.
        - paragraph [ref=e322]: ◆◆ Service does not include removal of webs higher than 10 ft. and application does not protect against termites and other wood-destroying organisms, bedbugs, bees, fleas, German cockroaches, hornets, pharaoh ants, rodents, or ticks. Valid at participating TruGreen locations. Not to be combined with or used in conjunction with any other oﬀer or discount. Additional restrictions may apply. Consumer responsible for all sales tax.
        - paragraph [ref=e323]:
          - text: "America’s #1 lawn care company based on U.S. market share of professional lawn care companies. 2023 MMR Brand Health Tracker."
          - link "PGATOUR.COM" [ref=e324]:
            - /url: https://pgatour.com/
          - text: ", PGA TOUR, TPC, SHOTLINK and the SWINGING GOLFER LOGO are trademarks of PGA TOUR, Inc. BBB accredited since 7/01/2012."
      - generic [ref=e325]:
        - generic [ref=e327]:
          - generic [ref=e328]:
            - link "Facebook Icon" [ref=e329]:
              - /url: https://www.facebook.com/trugreen
              - img "Facebook Icon" [ref=e330]
            - link "X.com Icon" [ref=e331]:
              - /url: https://x.com/trugreen
              - img "X.com Icon" [ref=e332]
            - link "Instagram Icon" [ref=e333]:
              - /url: https://www.instagram.com/trugreen/
              - img "Instagram Icon" [ref=e334]
            - link "Youtube Icon" [ref=e335]:
              - /url: https://www.youtube.com/trugreen
              - img "Youtube Icon" [ref=e336]
            - link "TikTok Icon" [ref=e337]:
              - /url: https://www.tiktok.com/@trugreen_lawn?lang=en
              - img "TikTok Icon" [ref=e338]
            - link "Yelp Icon" [ref=e339]:
              - /url: https://www.yelp.com/
              - img "Yelp Icon" [ref=e340]
          - generic [ref=e341]:
            - 'link "BBB: Better Business Bureau, Accredited Business Badge" [ref=e342]':
              - /url: https://www.bbb.org/us/tn/memphis/profile/lawn-maintenance/trugreen-0543-1000545#bbbseal
              - 'img "BBB: Better Business Bureau, Accredited Business Badge" [ref=e343]'
            - 'link "NALP: National Association of Landscape Professionals Logo" [ref=e344]':
              - /url: "#"
              - 'img "NALP: National Association of Landscape Professionals Logo" [ref=e345]'
            - 'link "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e346]':
              - /url: /pga-tour
              - 'img "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e347]'
            - 'link "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e348]':
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
              - 'img "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e349]'
        - separator [ref=e350]
      - generic [ref=e353]:
        - paragraph [ref=e355]:
          - img "TruGreen Leaf Logo" [ref=e356]
          - text: © 2026 TruGreen Limited Partnership. All rights reserved.
        - list [ref=e358]:
          - listitem [ref=e359]:
            - link "SMS Terms and Conditions" [ref=e360]:
              - /url: /about/sms-terms
          - listitem [ref=e361]:
            - link "Terms and Conditions" [ref=e362]:
              - /url: /about/terms
          - listitem [ref=e363]:
            - link "Privacy Policy" [ref=e364]:
              - /url: /about/privacy-policy
          - listitem [ref=e365]:
            - link "California Privacy Notice" [ref=e366]:
              - /url: /about/california-privacy-policy
          - listitem [ref=e367]:
            - link "Your Privacy Choices privacyoptions" [ref=e368]:
              - /url: /about/privacy-policy#additionalStatePrivacyRights
              - text: Your Privacy Choices
              - img "privacyoptions" [ref=e369]
  - generic [ref=e370]:
    - paragraph [ref=e371]: Questions? Quote, Call or Chat Now.
    - link "1-844-311-0728" [ref=e372]:
      - /url: tel:18443110728
  - alert [ref=e373]
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
      |                      ^ Error: expect(page).toHaveScreenshot(expected) failed
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