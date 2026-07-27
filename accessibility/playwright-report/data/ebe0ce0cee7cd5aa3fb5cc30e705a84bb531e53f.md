# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y/accessibility-audit.spec.ts >> Accessibility Scans >> /customer-support — accessibility scan @accessibility-audit
- Location: tests/a11y/accessibility-audit.spec.ts:29:9

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: page.goto: Test timeout of 60000ms exceeded.
Call log:
  - navigating to "https://www.trugreen.com/customer-support?automation=true", waiting until "networkidle"

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - alert [ref=e2]
  - generic:
    - dialog "Privacy" [ref=e4]:
      - generic [ref=e6]:
        - generic [ref=e9]:
          - text: We and third parties use cookies and similar tools to track your interactions with this site, perform analytics, and conduct targeted advertising. By using the site, you agree to our use of these technologies and our
          - link "Terms and Conditions" [ref=e10]:
            - /url: https://www.trugreen.com/about/terms
          - text: and our
          - link "Privacy Policy" [ref=e11]:
            - /url: https://www.trugreen.com/about/privacy-policy#cookiesandinterest-basedadvertising
          - text: . California residents, please see our
          - link "More information about your privacy, opens in a new tab" [ref=e12]:
            - /url: https://www.trugreen.com/about/california-privacy-policy
            - text: California Privacy Policy
        - generic [ref=e14]:
          - button "Cookie Settings, Opens the preference center dialog" [ref=e15] [cursor=pointer]: Cookie Settings
          - button "Reject All" [ref=e16] [cursor=pointer]
          - button "Accept All Cookies" [ref=e17] [cursor=pointer]
      - button "Close" [ref=e19] [cursor=pointer]
    - text: Cookie Settings
  - banner:
    - generic [ref=e20]:
      - paragraph [ref=e25] [cursor=pointer]:
        - 'link "$9.95 First Application. Use Code: SAVENOW at Checkout." [ref=e26]':
          - /url: /buy-online
          - text: "$9.95 First Application. Use Code: SAVENOW at Checkout."
          - superscript [ref=e27]: "3"
      - generic [ref=e29]:
        - link "TruGreen Logo" [ref=e31]:
          - /url: /
          - img "TruGreen Logo" [ref=e32]
        - generic [ref=e34]:
          - link "location_icon" [ref=e35]:
            - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
            - img "location_icon" [ref=e36]
          - link [ref=e37]:
            - /url: tel:1-844-423-5590
            - img [ref=e38]
          - link "hamMenu_icon" [ref=e39]:
            - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
            - img "hamMenu_icon" [ref=e40]
  - generic [ref=e42]:
    - generic [ref=e47]:
      - heading "Need some help? You’re in the right place." [level=1] [ref=e48]:
        - text: Need some help?
        - text: You’re in the
        - text: right place.
      - paragraph [ref=e49]:
        - text: Get help with your account, ask questions about plans and services, and check out our
        - link "FAQs" [ref=e50]:
          - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        - text: — all in one place.
      - button "Contact us" [ref=e51] [cursor=pointer]
    - generic [ref=e53]:
      - heading "We’ve got you covered." [level=2] [ref=e56]
      - generic [ref=e57]:
        - generic [ref=e61]:
          - img [ref=e62]
          - generic [ref=e63]:
            - heading "Get help with the everyday stuff." [level=3] [ref=e64]
            - list [ref=e65]:
              - listitem [ref=e66]:
                - generic [ref=e67]: Scheduling information
              - listitem [ref=e68]:
                - generic [ref=e69]: Billing and payments
              - listitem [ref=e70]:
                - generic [ref=e71]: Manage account settings
              - listitem [ref=e72]:
                - generic [ref=e73]: Add or change service
              - listitem [ref=e74]:
                - generic [ref=e75]: Login assistance
            - paragraph [ref=e76]: Our Virtual Assistant can handle most things and is available 24/7, or you can log in to manage your account.
            - generic [ref=e77]:
              - generic [ref=e78] [cursor=pointer]: Chat Now
              - link "Log In" [ref=e79] [cursor=pointer]:
                - /url: /my-account/login
        - generic [ref=e82]:
          - generic [ref=e84]:
            - heading "Give us a call." [level=4] [ref=e86]
            - paragraph [ref=e87]: Drop us a line and let's connect.
            - paragraph [ref=e88]:
              - generic [ref=e89]:
                - text: "Mon – Fri: 7:30 AM – 10:00 PM ET"
                - text: "Sat: 8:30 AM – 8:00 PM ET"
                - text: "Sun: Closed"
            - link "1-844-423-5590" [ref=e90] [cursor=pointer]:
              - /url: tel:+18444235590
            - heading "Send us a Text" [level=4] [ref=e92]
            - link "MYLAWN (695296)" [ref=e93] [cursor=pointer]:
              - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
          - generic [ref=e95]:
            - heading "Email us." [level=4] [ref=e96]
            - paragraph [ref=e97]: Send us your compliments, suggestions, questions, and more. We’ll get back to you in 1-2 business days.
            - link "Email Us" [ref=e98] [cursor=pointer]:
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
    - generic [ref=e100]:
      - generic [ref=e103]:
        - heading "Questions? Glad you asked." [level=2] [ref=e104]:
          - text: Questions?
          - text: Glad you asked.
        - generic [ref=e105]:
          - textbox "Search FAQs" [ref=e106]
          - img [ref=e107] [cursor=pointer]
      - tabpanel "Most Common Questions" [ref=e111]:
        - heading "Most Common Questions" [level=2] [ref=e112]
        - generic [ref=e113]:
          - generic [ref=e114]:
            - heading "If it rained right after my application will the treatment still be effective?" [level=5] [ref=e116]:
              - button "If it rained right after my application will the treatment still be effective?" [expanded] [ref=e117] [cursor=pointer]
            - generic "If it rained right after my application will the treatment still be effective?" [ref=e118]:
              - generic [ref=e119]: For most products, rainfall before or after an application typically enhances the effectiveness of your TruGreen application. Water is vital for proper plant health and aids in carrying nutrients into the soil so they can be absorbed by a plant’s root system. Water also activates pre-emergent weed control and sub-surface insect control. TruGreen applications won’t wash away once they are absorbed by the plant or watered into the soil.
          - heading "How long will it take for weeds to disappear after my TruGreen service begins?" [level=5] [ref=e122]:
            - button "How long will it take for weeds to disappear after my TruGreen service begins?" [ref=e123] [cursor=pointer]
          - heading "What happens if TruGreen misses a scheduled appointment?" [level=5] [ref=e126]:
            - button "What happens if TruGreen misses a scheduled appointment?" [ref=e127] [cursor=pointer]
          - heading "Why is there a difference between the bill I received and what I signed up for?" [level=5] [ref=e130]:
            - button "Why is there a difference between the bill I received and what I signed up for?" [ref=e131] [cursor=pointer]
          - heading "What should I do if I think TruGreen forgot to treat part of my property?" [level=5] [ref=e134]:
            - button "What should I do if I think TruGreen forgot to treat part of my property?" [ref=e135] [cursor=pointer]
          - heading "What should I know about brown or bare spots that may develop on my lawn after service?" [level=5] [ref=e138]:
            - button "What should I know about brown or bare spots that may develop on my lawn after service?" [ref=e139] [cursor=pointer]
    - generic [ref=e143]:
      - generic [ref=e144]:
        - heading "Let’s talk lawn." [level=2] [ref=e145]
        - paragraph [ref=e146]: Our experts really know their stuff, that’s why they’re, well, experts. Tell us what’s on your mind and we’ll get back to you with an answer as soon as possible.
      - generic [ref=e147]:
        - paragraph [ref=e149]: "* Required information"
        - generic [ref=e150]:
          - generic [ref=e151]:
            - generic [ref=e152]:
              - generic [ref=e153]: Full Name*
              - textbox "Full Name*" [ref=e154]
            - generic [ref=e155]:
              - generic [ref=e156]: Phone*
              - textbox "Phone* Phone*" [ref=e157]:
                - /placeholder: (___)-___-____
          - generic [ref=e159]:
            - generic [ref=e160]: Address*
            - combobox [ref=e161]:
              - textbox "Address* Address*" [ref=e162]:
                - /placeholder: ""
              - listbox
          - generic [ref=e163]:
            - generic [ref=e164]:
              - generic [ref=e165]: Email Address*
              - textbox "Email Address* Email*" [ref=e166]
            - generic [ref=e167]:
              - generic [ref=e168]: Zip Code*
              - textbox "Zip Code* Zip Code*" [ref=e169]
          - generic [ref=e170]:
            - generic [ref=e171]:
              - generic [ref=e172]: Subject*
              - combobox "Subject*" [ref=e173]:
                - option "Select" [selected]
                - option "Our Services"
                - option "Customer Service"
                - option "About Us"
            - generic [ref=e174]:
              - generic [ref=e175]: Topic*
              - combobox "Topic*" [disabled] [ref=e176]:
                - option "Select" [selected]
          - generic [ref=e178]:
            - generic [ref=e179]:
              - generic [ref=e180]: What’s on your mind?*
              - generic [ref=e181]: 0/300
            - textbox [ref=e182]
            - button "Submit" [ref=e183]
            - paragraph [ref=e184]:
              - text: "By providing my contact information and clicking “Submit”, I consent to: (1) receive autodialed marketing and non-marketing calls, texts and prerecorded messages from TruGreen; and (2) TruGreen’s"
              - link "Privacy Policy" [ref=e185]:
                - /url: /about/privacy-policy
              - text: and
              - link "Terms and Conditions" [ref=e186]:
                - /url: /about/terms
              - text: (including arbitration provision and class action waiver). California residents, see TruGreen’s California
              - link "Privacy Notice" [ref=e187]:
                - /url: /about/california-privacy-policy
              - text: and
              - link "Privacy Policy" [ref=e188]:
                - /url: /about/california-privacy-policy
              - text: . I understand that my consent is not required to obtain a quote or purchase TruGreen services and that the cancellation of that account does not automatically revoke this consent.
  - contentinfo [ref=e190]:
    - generic [ref=e191]:
      - generic [ref=e192]:
        - generic [ref=e194]:
          - heading "About US" [level=5] [ref=e195]
          - list:
            - listitem [ref=e196]:
              - link "About TruGreen" [ref=e197]:
                - /url: /newsroom/executive-staff#about
            - listitem [ref=e198]:
              - link "Executive Staff" [ref=e199]:
                - /url: /newsroom/executive-staff
            - listitem [ref=e200]:
              - link "Newsroom" [ref=e201]:
                - /url: /newsroom
            - listitem [ref=e202]:
              - link "Careers" [ref=e203]:
                - /url: https://www.trugreenjobs.com
        - generic [ref=e205]:
          - heading "Our Services" [level=5] [ref=e206]
          - list:
            - listitem [ref=e207]:
              - link "Lawn Care Plan Comparison" [ref=e208]:
                - /url: /products-and-services
            - listitem [ref=e209]:
              - link "Tree & Shrub Plan Overview" [ref=e210]:
                - /url: /products-and-services/trushrub-tree-and-shrub-care
            - listitem [ref=e211]:
              - link "Pest Control Plan Comparison" [ref=e212]:
                - /url: /pests-products-and-services
            - listitem [ref=e213]:
              - link "Branch Finder" [ref=e214]:
                - /url: /local-lawn-care
        - generic [ref=e216]:
          - heading "Resources" [level=5] [ref=e217]
          - list:
            - listitem [ref=e218]:
              - link "FAQs" [ref=e219]:
                - /url: /lawn-care-101/faqs
            - listitem [ref=e220]:
              - link "Military Discount" [ref=e221]:
                - /url: /military-discount
            - listitem [ref=e222]:
              - link "Learning Center" [ref=e223]:
                - /url: /lawn-care-101/learning-center
            - listitem [ref=e224]:
              - link "Blogs" [ref=e225]:
                - /url: /lawn-care-101/blog
            - listitem [ref=e226]:
              - link "Service Terms and Conditions" [ref=e227]:
                - /url: /service-terms-and-conditions
        - generic [ref=e230]:
          - heading "For new service" [level=5] [ref=e231]
          - list:
            - listitem [ref=e232]:
              - link "1-844-423-5590" [ref=e233]:
                - /url: tel:1-844-423-5590
            - listitem [ref=e234]:
              - link "Get a Call Back" [ref=e235]:
                - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        - generic [ref=e238]:
          - heading "For our Customer" [level=5] [ref=e239]
          - list:
            - listitem [ref=e240]:
              - link "Account Login & Register" [ref=e241]:
                - /url: /my-account/login
            - listitem [ref=e242]:
              - generic [ref=e243]: "Call:"
              - link "1-844-423-5590" [ref=e244]:
                - /url: tel:1-844-423-5590
            - listitem [ref=e245]:
              - 'link "Text: MYLAWN (695296)" [ref=e246]':
                - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
            - listitem [ref=e247]:
              - link "Customer Support" [ref=e248]:
                - /url: /customer-support
            - listitem [ref=e249]:
              - link "Pay My Bill" [ref=e250]:
                - /url: /pay-your-bill
      - generic [ref=e253]:
        - paragraph [ref=e254]: We may apply a surcharge not to exceed 3% to cover all or part of our costs of accepting your credit card. For Oklahoma-based consumers, the fee will be 2%.
        - paragraph [ref=e255]: "**Available to residential customers for Lawn, TruDefense Mosquito,TruBarrier Perimeter Pest, Flea, Tick & Outdoor Nuisance Pest Control and/or TruShrub Tree & Shrub services only. Requires purchase of annual plan using PrePay or EasyPay. Guarantee based on a matching quote from a Qualified Provider. Parameters include matching service address, number of applications, application price, services to be performed and areas to be treated. Not valid on quotes older than 120 days or one-day sales/seasonal promotions. TruGreen reserves the right to verify. For first year of service only. Limited time offer. Not to be combined with or used in conjunction with any other offer or discount. Valid at participating TruGreen locations. Additional restrictions may apply. Consumer responsible for all sales tax."
        - paragraph [ref=e256]: ◆ TruGreen will gladly visit your property as needed between scheduled visits to ensure your satisfaction. Guarantee applies to full program customers only. Excludes TruBasic and partial programs. Additional restrictions may apply.
        - paragraph [ref=e257]: ✦ Purchase of full lawn plan required for Healthy Lawn Analysis, which is performed at the first visit.
        - paragraph [ref=e258]: ★ Requires purchase of annual plan. Special price is for first application only. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount.
        - paragraph [ref=e259]: ✢ Requires purchase of annual plan. Special price is for first Tree & Shrub application only, for new residential EasyPay or PrePay customers only. TruGreen® Tree & Shrub includes fertilization of common trees and shrubs, and controls common foliar insects and diseases. It does not include treatment of specialty trees such as fruit or certain ornamentals, or assessment and treatment of trees over 25 ft. in height. For more details, go to TruGreen FAQs at TruGreen.com/FAQTREE. Not to be combined with or used in conjunction with any other offer or discount for the same service. Consumer responsible for all sales tax.
        - paragraph [ref=e260]: ★★ Requires purchase of full mosquito plan. Special price is for first mosquito application only, for new EasyPay or PrePay residential customers only. Valid at participating TruGreen locations. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax. ✧ Guarantee applies to full plan customers only.
        - paragraph [ref=e261]: ◆◆ Service does not include removal of webs higher than 10 ft. and application does not protect against termites and other wood-destroying organisms, bedbugs, bees, fleas, German cockroaches, hornets, pharaoh ants, rodents, or ticks. Valid at participating TruGreen locations. Not to be combined with or used in conjunction with any other oﬀer or discount. Additional restrictions may apply. Consumer responsible for all sales tax.
        - paragraph [ref=e262]:
          - text: "America’s #1 lawn care company based on U.S. market share of professional lawn care companies. 2023 MMR Brand Health Tracker."
          - link "PGATOUR.COM" [ref=e263]:
            - /url: https://pgatour.com/
          - text: ", PGA TOUR, TPC, SHOTLINK and the SWINGING GOLFER LOGO are trademarks of PGA TOUR, Inc. BBB accredited since 7/01/2012."
        - paragraph [ref=e264]:
          - superscript [ref=e265]: "3"
          - text: Special price is for first regular lawn service only. Use code SAVENOW. Special pricing is given in consideration of your commitment to receive all treatments under your annual plan. If you cancel before your plan renews, the discounted visit will be charged at full price. Requires purchase of annual Lawn plan, for new residential EasyPay or PrePay customers only. Offer unavailable for lawns larger than 20,000 square feet. Not valid on TruBasic or partial programs. Available 7/21/2026-8/19/2026. One time discount only. Valid at participating TruGreen locations. Availability of services and/or products may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax
      - generic [ref=e266]:
        - generic [ref=e268]:
          - generic [ref=e269]:
            - link "Facebook Icon" [ref=e270]:
              - /url: https://www.facebook.com/trugreen
              - img "Facebook Icon" [ref=e271]
            - link "X.com Icon" [ref=e272]:
              - /url: https://x.com/trugreen
              - img "X.com Icon" [ref=e273]
            - link "Instagram Icon" [ref=e274]:
              - /url: https://www.instagram.com/trugreen/
              - img "Instagram Icon" [ref=e275]
            - link "Youtube Icon" [ref=e276]:
              - /url: https://www.youtube.com/trugreen
              - img "Youtube Icon" [ref=e277]
            - link "TikTok Icon" [ref=e278]:
              - /url: https://www.tiktok.com/@trugreen_lawn?lang=en
              - img "TikTok Icon" [ref=e279]
            - link "Yelp Icon" [ref=e280]:
              - /url: https://www.yelp.com/
              - img "Yelp Icon" [ref=e281]
          - generic [ref=e282]:
            - 'link "BBB: Better Business Bureau, Accredited Business Badge" [ref=e283]':
              - /url: https://www.bbb.org/us/tn/memphis/profile/lawn-maintenance/trugreen-0543-1000545#bbbseal
              - 'img "BBB: Better Business Bureau, Accredited Business Badge" [ref=e284]'
            - 'link "NALP: National Association of Landscape Professionals Logo" [ref=e285]':
              - /url: "#"
              - 'img "NALP: National Association of Landscape Professionals Logo" [ref=e286]'
            - 'link "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e287]':
              - /url: https://www.trugreen.com/pga-tour
              - 'img "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e288]'
            - 'link "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e289]':
              - /url: "#"
              - 'img "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e290]'
        - separator [ref=e291]
      - generic [ref=e294]:
        - paragraph [ref=e296]:
          - img "TruGreen Leaf Logo" [ref=e297]
          - text: © 2026 TruGreen Limited Partnership. All rights reserved.
        - list [ref=e299]:
          - listitem [ref=e300]:
            - link "SMS Terms and Conditions" [ref=e301]:
              - /url: /about/sms-terms
          - listitem [ref=e302]:
            - link "Terms and Conditions" [ref=e303]:
              - /url: /about/terms
          - listitem [ref=e304]:
            - link "Privacy Policy" [ref=e305]:
              - /url: /about/privacy-policy
          - listitem [ref=e306]:
            - link "California Privacy Notice" [ref=e307]:
              - /url: /about/california-privacy-policy
          - listitem [ref=e308]:
            - link "Your Privacy Choices privacyoptions" [ref=e309]:
              - /url: /about/privacy-policy#additionalStatePrivacyRights
              - text: Your Privacy Choices
              - img "privacyoptions" [ref=e310]
  - generic [ref=e311]:
    - paragraph [ref=e312]: Questions? Quote, Call or Chat Now.
    - link "1-844-423-5590" [ref=e313]:
      - /url: tel:+18444235590
```

# Test source

```ts
  1  | // @ts-nocheck
  2  | import { test } from "../../utils/axe-fixture";
  3  | import paths from "../../utils/axe-paths";
  4  | import { getBaseUrl, getLandingPageUrl } from "../../utils/config";
  5  | import { landingPagePaths } from "../../utils/paths";
  6  | 
  7  | /* 
  8  | To clear old reports:
  9  | rm -rf accessibility-reports
  10 | 
  11 | To run this test file only:
  12 | npx playwright test -g @accessibility-audit
  13 | 
  14 | After running the tests, generate an index.html file by running this script:
  15 | node scripts/build-axe-index.js
  16 | 
  17 | Open the file with:
  18 | open accessibility-reports/axe-html/index.html
  19 | 
  20 | To generate a report by common issues run:
  21 | node scripts/build-axe-common-issues.js
  22 | 
  23 | Open the file with:
  24 | open accessibility-reports/axe-grouped/common-issues-prod.html
  25 | */
  26 | 
  27 | test.describe("Accessibility Scans", () => {
  28 |   for (const path of paths) {
  29 |     test(`${path} — accessibility scan @accessibility-audit`, async ({
  30 |       page,
  31 |       runAxeScan,
  32 |     }) => {
  33 |       const targetUrl = getBaseUrl(path);
  34 |       console.log(`Testing URL: ${targetUrl}`);
> 35 |       await page.goto(targetUrl, {
     |                  ^ Error: page.goto: Test timeout of 60000ms exceeded.
  36 |         waitUntil: "networkidle",
  37 |       });
  38 |       const actualUrl = page.url();
  39 |       console.log(`Actual URL after navigation: ${actualUrl}`);
  40 |       await runAxeScan(page, targetUrl);
  41 |     });
  42 |   }
  43 | 
  44 |   for (const [key, landingPath] of Object.entries(landingPagePaths)) {
  45 |     test(`landing-page/${key} — accessibility scan @accessibility-audit`, async ({
  46 |       page,
  47 |       runAxeScan,
  48 |     }) => {
  49 |       const url = getLandingPageUrl(landingPath);
  50 |       console.log(`Testing URL: ${url}`);
  51 |       await page.goto(url, {
  52 |         waitUntil: "networkidle",
  53 |       });
  54 |       const actualUrl = page.url();
  55 |       console.log(`Actual URL after navigation: ${actualUrl}`);
  56 |       await runAxeScan(page, url);
  57 |     });
  58 |   }
  59 | });
  60 | 
```