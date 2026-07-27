# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y/accessibility-audit.spec.ts >> Accessibility Scans >> /pay-your-bill — accessibility scan @accessibility-audit
- Location: tests/a11y/accessibility-audit.spec.ts:31:9

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 288

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#e8e8e8",
+               "contrastRatio": 2.74,
+               "expectedContrastRatio": "3:1",
+               "fgColor": "#8c8c8c",
+               "fontSize": "24.0pt (32px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.74 (foreground color: #8c8c8c, background color: #e8e8e8, font size: 24.0pt (32px), font weight: bold). Expected contrast ratio of 3:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"sub-title\" ncwce=\"true\"><div class=\"container p-3 text-center\" ncwce=\"true\"><div class=\"row\" ncwce=\"true\"><div class=\"col-12\" ncwce=\"true\"><h1 ncwce=\"true\">Pay My Bill</h1></div></div></div></div>",
+                 "target": Array [
+                   ".sub-title",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.74 (foreground color: #8c8c8c, background color: #e8e8e8, font size: 24.0pt (32px), font weight: bold). Expected contrast ratio of 3:1",
+         "html": "<h1 ncwce=\"true\">Pay My Bill</h1>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "h1",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 2.81,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#22b14c",
+               "fontSize": "10.5pt (14px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.81 (foreground color: #22b14c, background color: #ffffff, font size: 10.5pt (14px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"card rounded border border-1 p-2 mb-3\" ncwce=\"true\">",
+                 "target": Array [
+                   ".card.border.border-1",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.81 (foreground color: #22b14c, background color: #ffffff, font size: 10.5pt (14px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<a href=\"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')\" id=\"chatBotloader\" ncwce=\"true\">Chat with us</a>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "#chatBotloader",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 2.81,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#22b14c",
+               "fontSize": "10.5pt (14px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.81 (foreground color: #22b14c, background color: #ffffff, font size: 10.5pt (14px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"card rounded border border-1 p-2 mb-3\" ncwce=\"true\">",
+                 "target": Array [
+                   ".card.border.border-1",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.81 (foreground color: #22b14c, background color: #ffffff, font size: 10.5pt (14px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<a href=\"tel:1-844-384-4424\" ncwce=\"true\">Call us</a>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href=\"tel:1-844-384-4424\"]",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+   Object {
+     "description": "Ensure <img> elements have alternative text or a role of none or presentation",
+     "help": "Images must have alternative text",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/image-alt?application=playwright",
+     "id": "image-alt",
+     "impact": "critical",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "has-alt",
+             "impact": "critical",
+             "message": "Element does not have an alt attribute",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-label",
+             "impact": "critical",
+             "message": "aria-label attribute does not exist or is empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-labelledby",
+             "impact": "critical",
+             "message": "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "messageKey": "noAttr",
+             },
+             "id": "non-empty-title",
+             "impact": "critical",
+             "message": "Element has no title attribute",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "presentational-role",
+             "impact": "critical",
+             "message": "Element's default semantics were not overridden with role=\"none\" or role=\"presentation\"",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element does not have an alt attribute
+   aria-label attribute does not exist or is empty
+   aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
+   Element has no title attribute
+   Element's default semantics were not overridden with role=\"none\" or role=\"presentation\"",
+         "html": "<img src=\"/images/header/Call.svg\" data-cdn-processed-src=\"/images/header/Call.svg\">",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           "img[src$=\"Call.svg\"]",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.text-alternatives",
+       "wcag2a",
+       "wcag111",
+       "section508",
+       "section508.22.a",
+       "TTv5",
+       "TT7.a",
+       "TT7.b",
+       "EN-301-549",
+       "EN-9.1.1.1",
+       "ACT",
+       "RGAAv4",
+       "RGAA-1.1.1",
+     ],
+   },
+   Object {
+     "description": "Ensure links have discernible text",
+     "help": "Links must have discernible text",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/link-name?application=playwright",
+     "id": "link-name",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "has-visible-text",
+             "impact": "serious",
+             "message": "Element does not have text that is visible to screen readers",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-label",
+             "impact": "serious",
+             "message": "aria-label attribute does not exist or is empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-labelledby",
+             "impact": "serious",
+             "message": "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "messageKey": "noAttr",
+             },
+             "id": "non-empty-title",
+             "impact": "serious",
+             "message": "Element has no title attribute",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix all of the following:
+   Element is in tab order and does not have accessible text
+
+ Fix any of the following:
+   Element does not have text that is visible to screen readers
+   aria-label attribute does not exist or is empty
+   aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
+   Element has no title attribute",
+         "html": "<a href=\"tel:1-844-567-9909\" class=\"mob-links InfinityNumber clickable call-center-mobile\" id=\"checkinfinity\" ncwce=\"true\">",
+         "impact": "serious",
+         "none": Array [
+           Object {
+             "data": null,
+             "id": "focusable-no-name",
+             "impact": "serious",
+             "message": "Element is in tab order and does not have accessible text",
+             "relatedNodes": Array [],
+           },
+         ],
+         "target": Array [
+           ".call-center-mobile",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.name-role-value",
+       "wcag2a",
+       "wcag244",
+       "wcag412",
+       "section508",
+       "section508.22.a",
+       "TTv5",
+       "TT6.a",
+       "EN-301-549",
+       "EN-9.2.4.4",
+       "EN-9.4.1.2",
+       "ACT",
+       "RGAAv4",
+       "RGAA-6.2.1",
+     ],
+   },
+ ]
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
            - /url: tel:+18443969837
            - img [ref=e38]
          - link "hamMenu_icon" [ref=e39]:
            - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
            - img "hamMenu_icon" [ref=e40]
  - generic [ref=e42]:
    - heading "Pay My Bill" [level=1] [ref=e47]
    - generic [ref=e49]:
      - generic [ref=e52]:
        - heading "Find your bill" [level=5] [ref=e53]
        - paragraph [ref=e54]: Provide us with this information so we can confirm your account
        - generic [ref=e55]:
          - generic [ref=e56]:
            - generic [ref=e57]: Last Name *
            - textbox "Last Name" [ref=e58]
          - paragraph [ref=e59]:
            - text: We also need
            - strong [ref=e60]: either your phone number and zip code, or your customer number
          - generic [ref=e61]:
            - generic [ref=e62]:
              - generic [ref=e63]: Phone Number *
              - textbox "(___)-___-____" [ref=e64]
            - generic [ref=e65]:
              - generic [ref=e66]: Zip Code *
              - spinbutton [ref=e67]
          - paragraph [ref=e69]: OR
          - generic [ref=e70]:
            - generic [ref=e71]: Customer Number *
            - spinbutton [ref=e72]
            - generic [ref=e73]: Zip Code *
            - textbox "12345" [ref=e74]
          - button "Find my bill" [ref=e75] [cursor=pointer]
      - generic [ref=e76]:
        - generic [ref=e78]:
          - heading "Benefits of creating an online account" [level=5] [ref=e79]
          - generic [ref=e80]:
            - img "check" [ref=e81]
            - text: Pay a bill, billing history, prepay for services, enroll in EasyPay.
          - generic [ref=e82]:
            - img "check" [ref=e83]
            - text: See Service History and remaining services.
          - generic [ref=e84]:
            - img "check" [ref=e85]
            - text: Update Account Settings.
          - generic [ref=e86]:
            - img "check" [ref=e87]
            - text: Review documents including Service Summaries, Invoices, Prepay Letters.
        - generic [ref=e89]:
          - heading "Need help with your billing ?" [level=5] [ref=e90]
          - paragraph [ref=e91]: Try our TruGreen Virtual Assistant
          - link "Chat with us" [ref=e92]:
            - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
          - paragraph [ref=e93]: Or call us to pay by phone
          - link "Call us" [ref=e94]:
            - /url: tel:1-844-384-4424
  - contentinfo [ref=e96]:
    - generic [ref=e97]:
      - generic [ref=e98]:
        - generic [ref=e100]:
          - heading "About US" [level=5] [ref=e101]
          - list:
            - listitem [ref=e102]:
              - link "About TruGreen" [ref=e103]:
                - /url: /newsroom/executive-staff#about
            - listitem [ref=e104]:
              - link "Executive Staff" [ref=e105]:
                - /url: /newsroom/executive-staff
            - listitem [ref=e106]:
              - link "Newsroom" [ref=e107]:
                - /url: /newsroom
            - listitem [ref=e108]:
              - link "Careers" [ref=e109]:
                - /url: https://www.trugreenjobs.com
        - generic [ref=e111]:
          - heading "Our Services" [level=5] [ref=e112]
          - list:
            - listitem [ref=e113]:
              - link "Lawn Care Plan Comparison" [ref=e114]:
                - /url: /products-and-services
            - listitem [ref=e115]:
              - link "Tree & Shrub Plan Overview" [ref=e116]:
                - /url: /products-and-services/trushrub-tree-and-shrub-care
            - listitem [ref=e117]:
              - link "Pest Control Plan Comparison" [ref=e118]:
                - /url: /pests-products-and-services
            - listitem [ref=e119]:
              - link "Branch Finder" [ref=e120]:
                - /url: /local-lawn-care
        - generic [ref=e122]:
          - heading "Resources" [level=5] [ref=e123]
          - list:
            - listitem [ref=e124]:
              - link "FAQs" [ref=e125]:
                - /url: /lawn-care-101/faqs
            - listitem [ref=e126]:
              - link "Military Discount" [ref=e127]:
                - /url: /military-discount
            - listitem [ref=e128]:
              - link "Learning Center" [ref=e129]:
                - /url: /lawn-care-101/learning-center
            - listitem [ref=e130]:
              - link "Blogs" [ref=e131]:
                - /url: /lawn-care-101/blog
            - listitem [ref=e132]:
              - link "Service Terms and Conditions" [ref=e133]:
                - /url: /service-terms-and-conditions
        - generic [ref=e136]:
          - heading "For new service" [level=5] [ref=e137]
          - list:
            - listitem [ref=e138]:
              - link "1-844-396-9837" [ref=e139]:
                - /url: tel:+18443969837
            - listitem [ref=e140]:
              - link "Get a Call Back" [ref=e141]:
                - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        - generic [ref=e144]:
          - heading "For our Customer" [level=5] [ref=e145]
          - list:
            - listitem [ref=e146]:
              - link "Account Login & Register" [ref=e147]:
                - /url: /my-account/login
            - listitem [ref=e148]:
              - generic [ref=e149]: "Call:"
              - link "1-844-393-1338" [ref=e150]:
                - /url: tel:+18443931338
            - listitem [ref=e151]:
              - 'link "Text: MYLAWN (695296)" [ref=e152]':
                - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
            - listitem [ref=e153]:
              - link "Customer Support" [ref=e154]:
                - /url: /customer-support
            - listitem [ref=e155]:
              - link "Pay My Bill" [ref=e156]:
                - /url: /pay-your-bill
      - generic [ref=e159]:
        - paragraph [ref=e160]: We may apply a surcharge not to exceed 3% to cover all or part of our costs of accepting your credit card. For Oklahoma-based consumers, the fee will be 2%.
        - paragraph [ref=e161]: "**Available to residential customers for Lawn, TruDefense Mosquito,TruBarrier Perimeter Pest, Flea, Tick & Outdoor Nuisance Pest Control and/or TruShrub Tree & Shrub services only. Requires purchase of annual plan using PrePay or EasyPay. Guarantee based on a matching quote from a Qualified Provider. Parameters include matching service address, number of applications, application price, services to be performed and areas to be treated. Not valid on quotes older than 120 days or one-day sales/seasonal promotions. TruGreen reserves the right to verify. For first year of service only. Limited time offer. Not to be combined with or used in conjunction with any other offer or discount. Valid at participating TruGreen locations. Additional restrictions may apply. Consumer responsible for all sales tax."
        - paragraph [ref=e162]: ◆ TruGreen will gladly visit your property as needed between scheduled visits to ensure your satisfaction. Guarantee applies to full program customers only. Excludes TruBasic and partial programs. Additional restrictions may apply.
        - paragraph [ref=e163]: ✦ Purchase of full lawn plan required for Healthy Lawn Analysis, which is performed at the first visit.
        - paragraph [ref=e164]: ★ Requires purchase of annual plan. Special price is for first application only. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount.
        - paragraph [ref=e165]: ✢ Requires purchase of annual plan. Special price is for first Tree & Shrub application only, for new residential EasyPay or PrePay customers only. TruGreen® Tree & Shrub includes fertilization of common trees and shrubs, and controls common foliar insects and diseases. It does not include treatment of specialty trees such as fruit or certain ornamentals, or assessment and treatment of trees over 25 ft. in height. For more details, go to TruGreen FAQs at TruGreen.com/FAQTREE. Not to be combined with or used in conjunction with any other offer or discount for the same service. Consumer responsible for all sales tax.
        - paragraph [ref=e166]: ★★ Requires purchase of full mosquito plan. Special price is for first mosquito application only, for new EasyPay or PrePay residential customers only. Valid at participating TruGreen locations. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax. ✧ Guarantee applies to full plan customers only.
        - paragraph [ref=e167]: ◆◆ Service does not include removal of webs higher than 10 ft. and application does not protect against termites and other wood-destroying organisms, bedbugs, bees, fleas, German cockroaches, hornets, pharaoh ants, rodents, or ticks. Valid at participating TruGreen locations. Not to be combined with or used in conjunction with any other oﬀer or discount. Additional restrictions may apply. Consumer responsible for all sales tax.
        - paragraph [ref=e168]:
          - text: "America’s #1 lawn care company based on U.S. market share of professional lawn care companies. 2023 MMR Brand Health Tracker."
          - link "PGATOUR.COM" [ref=e169]:
            - /url: https://pgatour.com/
          - text: ", PGA TOUR, TPC, SHOTLINK and the SWINGING GOLFER LOGO are trademarks of PGA TOUR, Inc. BBB accredited since 7/01/2012."
        - paragraph [ref=e170]:
          - superscript [ref=e171]: "3"
          - text: Special price is for first regular lawn service only. Use code SAVENOW. Special pricing is given in consideration of your commitment to receive all treatments under your annual plan. If you cancel before your plan renews, the discounted visit will be charged at full price. Requires purchase of annual Lawn plan, for new residential EasyPay or PrePay customers only. Offer unavailable for lawns larger than 20,000 square feet. Not valid on TruBasic or partial programs. Available 7/21/2026-8/19/2026. One time discount only. Valid at participating TruGreen locations. Availability of services and/or products may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax
      - generic [ref=e172]:
        - generic [ref=e174]:
          - generic [ref=e175]:
            - link "Facebook Icon" [ref=e176]:
              - /url: https://www.facebook.com/trugreen
              - img "Facebook Icon" [ref=e177]
            - link "X.com Icon" [ref=e178]:
              - /url: https://x.com/trugreen
              - img "X.com Icon" [ref=e179]
            - link "Instagram Icon" [ref=e180]:
              - /url: https://www.instagram.com/trugreen/
              - img "Instagram Icon" [ref=e181]
            - link "Youtube Icon" [ref=e182]:
              - /url: https://www.youtube.com/trugreen
              - img "Youtube Icon" [ref=e183]
            - link "TikTok Icon" [ref=e184]:
              - /url: https://www.tiktok.com/@trugreen_lawn?lang=en
              - img "TikTok Icon" [ref=e185]
            - link "Yelp Icon" [ref=e186]:
              - /url: https://www.yelp.com/
              - img "Yelp Icon" [ref=e187]
          - generic [ref=e188]:
            - 'link "BBB: Better Business Bureau, Accredited Business Badge" [ref=e189]':
              - /url: https://www.bbb.org/us/tn/memphis/profile/lawn-maintenance/trugreen-0543-1000545#bbbseal
              - 'img "BBB: Better Business Bureau, Accredited Business Badge" [ref=e190]'
            - 'link "NALP: National Association of Landscape Professionals Logo" [ref=e191]':
              - /url: "#"
              - 'img "NALP: National Association of Landscape Professionals Logo" [ref=e192]'
            - 'link "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e193]':
              - /url: https://www.trugreen.com/pga-tour
              - 'img "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e194]'
            - 'link "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e195]':
              - /url: "#"
              - 'img "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e196]'
        - separator [ref=e197]
      - generic [ref=e200]:
        - paragraph [ref=e202]:
          - img "TruGreen Leaf Logo" [ref=e203]
          - text: © 2026 TruGreen Limited Partnership. All rights reserved.
        - list [ref=e205]:
          - listitem [ref=e206]:
            - link "SMS Terms and Conditions" [ref=e207]:
              - /url: /about/sms-terms
          - listitem [ref=e208]:
            - link "Terms and Conditions" [ref=e209]:
              - /url: /about/terms
          - listitem [ref=e210]:
            - link "Privacy Policy" [ref=e211]:
              - /url: /about/privacy-policy
          - listitem [ref=e212]:
            - link "California Privacy Notice" [ref=e213]:
              - /url: /about/california-privacy-policy
          - listitem [ref=e214]:
            - link "Your Privacy Choices privacyoptions" [ref=e215]:
              - /url: /about/privacy-policy#additionalStatePrivacyRights
              - text: Your Privacy Choices
              - img "privacyoptions" [ref=e216]
  - generic [ref=e217]:
    - paragraph [ref=e218]: Questions? Quote, Call or Chat Now.
    - link "1-844-567-9909" [ref=e219]:
      - /url: tel:1-844-567-9909
```

# Test source

```ts
  1  | import { expect, test as base, Page } from "@playwright/test";
  2  | import AxeBuilder from "@axe-core/playwright";
  3  | import { createHtmlReport } from "axe-html-reporter";
  4  | import fs from "fs";
  5  | import path from "path";
  6  | 
  7  | type AxeReport = {
  8  |   violations: any[];
  9  |   pageTitle: string;
  10 |   url: string;
  11 | };
  12 | 
  13 | type RunAxeOptions = {
  14 |   includeSelector?: string;
  15 |   rules?: string[];
  16 | };
  17 | 
  18 | type AxeFixtures = {
  19 |   runAxeScan: (
  20 |     page: Page,
  21 |     fullUrl: string,
  22 |     options?: RunAxeOptions,
  23 |   ) => Promise<AxeReport>;
  24 | };
  25 | 
  26 | export const test = base.extend<AxeFixtures>({
  27 |   runAxeScan: async ({}, use, testInfo) => {
  28 |     await use(async (page: Page, fullUrl: string, options?: RunAxeOptions) => {
  29 |       let builder = new AxeBuilder({ page })
  30 |         .exclude("")
  31 |         .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]);
  32 | 
  33 |       if (options?.includeSelector) {
  34 |         builder = builder.include(options.includeSelector);
  35 |       }
  36 | 
  37 |       if (options?.rules?.length) {
  38 |         builder = builder.withRules(options.rules);
  39 |       }
  40 | 
  41 |       const results = await builder.analyze();
  42 | 
  43 |       const seriousViolations = results.violations.filter(
  44 |         (v) => v.impact === "serious" || v.impact === "critical",
  45 |       );
  46 | 
  47 |       const baseDir = "accessibility-reports";
  48 |       const jsonDir = path.join(baseDir, "axe-json");
  49 |       const htmlDir = path.join(baseDir, "axe-html");
  50 | 
  51 |       fs.mkdirSync(jsonDir, { recursive: true });
  52 |       fs.mkdirSync(htmlDir, { recursive: true });
  53 | 
  54 |       const urlObj = new URL(fullUrl);
  55 |       const pathSlug =
  56 |         urlObj.pathname.replace(/^\/|\/$/g, "").replace(/\//g, "-") || "home";
  57 |       const projectPrefix = testInfo.project.name;
  58 |       const fileBase = `${projectPrefix}_${pathSlug}`;
  59 | 
  60 |       const pageTitle = await page.title();
  61 |       const axeReport: AxeReport = {
  62 |         ...results,
  63 |         pageTitle,
  64 |         url: page.url(),
  65 |       };
  66 | 
  67 |       const jsonPath = path.join(jsonDir, `${fileBase}.json`);
  68 |       fs.writeFileSync(jsonPath, JSON.stringify(axeReport, null, 2), "utf-8");
  69 | 
  70 |       const htmlFileName = `${fileBase}.html`;
  71 |       const htmlPath = path.join(htmlDir, htmlFileName);
  72 | 
  73 |       createHtmlReport({
  74 |         results: axeReport,
  75 |         options: {
  76 |           outputDir: htmlDir,
  77 |           reportFileName: htmlFileName,
  78 |           projectKey: "Accessibility Audit",
  79 |         },
  80 |       });
  81 | 
  82 |       await testInfo.attach(`axe-${fileBase}-report`, {
  83 |         path: htmlPath,
  84 |         contentType: "text/html",
  85 |       });
  86 | 
> 87 |       expect(seriousViolations).toEqual([]);
     |                                 ^ Error: expect(received).toEqual(expected) // deep equality
  88 | 
  89 |       return axeReport;
  90 |     });
  91 |   },
  92 | });
  93 | 
  94 | export { expect };
  95 | 
```