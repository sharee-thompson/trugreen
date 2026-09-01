# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y/accessibility-audit.spec.ts >> Accessibility Scans >> /nb/ppc/landing-page — accessibility scan @accessibility-audit
- Location: tests/a11y/accessibility-audit.spec.ts:31:9

# Error details

```
Error: frame.evaluate: Execution context was destroyed, most likely because of a navigation
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner
  - main [ref=e2]:
    - img "Loading..." [ref=e5]
  - contentinfo [ref=e6]:
    - generic [ref=e7]:
      - generic [ref=e8]:
        - generic [ref=e10]:
          - heading "About Us" [level=2] [ref=e11]
          - list [ref=e12]:
            - listitem [ref=e13]:
              - link "About TruGreen" [ref=e14] [cursor=pointer]:
                - /url: /newsroom/executive-staff#about
            - listitem [ref=e15]:
              - link "Executive Staff" [ref=e16] [cursor=pointer]:
                - /url: /newsroom/executive-staff
            - listitem [ref=e17]:
              - link "Newsroom" [ref=e18] [cursor=pointer]:
                - /url: /newsroom
            - listitem [ref=e19]:
              - link "Careers" [ref=e20] [cursor=pointer]:
                - /url: https://www.trugreenjobs.com
        - generic [ref=e22]:
          - heading "Our Services" [level=2] [ref=e23]
          - list [ref=e24]:
            - listitem [ref=e25]:
              - link "Lawn Care Plan Comparison" [ref=e26] [cursor=pointer]:
                - /url: /products-and-services
            - listitem [ref=e27]:
              - link "Tree & Shrub Plan Overview" [ref=e28] [cursor=pointer]:
                - /url: /products-and-services/trushrub-tree-and-shrub-care
            - listitem [ref=e29]:
              - link "Pest Control Plan Comparison" [ref=e30] [cursor=pointer]:
                - /url: /pests-products-and-services
            - listitem [ref=e31]:
              - link "Branch Finder" [ref=e32] [cursor=pointer]:
                - /url: /local-lawn-care
        - generic [ref=e34]:
          - heading "Resources" [level=2] [ref=e35]
          - list [ref=e36]:
            - listitem [ref=e37]:
              - link "FAQs" [ref=e38] [cursor=pointer]:
                - /url: /lawn-care-101/faqs
            - listitem [ref=e39]:
              - link "Military Discount" [ref=e40] [cursor=pointer]:
                - /url: /military-discount
            - listitem [ref=e41]:
              - link "Learning Center" [ref=e42] [cursor=pointer]:
                - /url: /lawn-care-101/learning-center
            - listitem [ref=e43]:
              - link "Blogs" [ref=e44] [cursor=pointer]:
                - /url: /lawn-care-101/blog
            - listitem [ref=e45]:
              - link "Service Terms and Conditions" [ref=e46] [cursor=pointer]:
                - /url: /service-terms-and-conditions
        - generic [ref=e49]:
          - heading "For new service" [level=2] [ref=e50]
          - list [ref=e51]:
            - listitem [ref=e52]:
              - link "1-844-567-9909" [ref=e53] [cursor=pointer]:
                - /url: tel:1-844-567-9909
            - listitem [ref=e54]:
              - link "Get a Call Back" [ref=e55] [cursor=pointer]:
                - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        - generic [ref=e58]:
          - heading "For our Customer" [level=2] [ref=e59]
          - list [ref=e60]:
            - listitem [ref=e61]:
              - link "Account Login & Register" [ref=e62] [cursor=pointer]:
                - /url: /my-account/login
            - listitem [ref=e63]:
              - generic [ref=e64]: "Call:"
              - link "1-844-768-0421" [ref=e65] [cursor=pointer]:
                - /url: tel:1-844-768-0421
            - listitem [ref=e66]:
              - 'link "Text: MYLAWN (695296)" [ref=e67] [cursor=pointer]':
                - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
            - listitem [ref=e68]:
              - link "Customer Support" [ref=e69] [cursor=pointer]:
                - /url: /customer-support
            - listitem [ref=e70]:
              - link "Pay My Bill" [ref=e71] [cursor=pointer]:
                - /url: /pay-your-bill
      - generic [ref=e72]:
        - generic [ref=e74]:
          - generic [ref=e75]:
            - link "Facebook Icon" [ref=e76] [cursor=pointer]:
              - /url: https://www.facebook.com/trugreen
              - img "Facebook Icon" [ref=e77]
            - link "X.com Icon" [ref=e78] [cursor=pointer]:
              - /url: https://x.com/trugreen
              - img "X.com Icon" [ref=e79]
            - link "Instagram Icon" [ref=e80] [cursor=pointer]:
              - /url: https://www.instagram.com/trugreen/
              - img "Instagram Icon" [ref=e81]
            - link "Youtube Icon" [ref=e82] [cursor=pointer]:
              - /url: https://www.youtube.com/trugreen
              - img "Youtube Icon" [ref=e83]
            - link "TikTok Icon" [ref=e84] [cursor=pointer]:
              - /url: https://www.tiktok.com/@trugreen_lawn?lang=en
              - img "TikTok Icon" [ref=e85]
            - link "Yelp Icon" [ref=e86] [cursor=pointer]:
              - /url: https://www.yelp.com/
              - img "Yelp Icon" [ref=e87]
          - generic [ref=e88]:
            - 'link "BBB: Better Business Bureau, Accredited Business Badge" [ref=e89] [cursor=pointer]':
              - /url: https://www.bbb.org/us/tn/memphis/profile/lawn-maintenance/trugreen-0543-1000545#bbbseal
              - 'img "BBB: Better Business Bureau, Accredited Business Badge" [ref=e90]'
            - 'link "NALP: National Association of Landscape Professionals Logo" [ref=e91]':
              - /url: "#"
              - 'img "NALP: National Association of Landscape Professionals Logo" [ref=e92]'
            - 'link "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e93] [cursor=pointer]':
              - /url: /pga-tour
              - 'img "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e94]'
            - 'link "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e95] [cursor=pointer]':
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
              - 'img "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e96]'
        - separator [ref=e97]
      - generic [ref=e100]:
        - paragraph [ref=e102]:
          - img "TruGreen Leaf Logo" [ref=e103]
          - text: © 2026 TruGreen Limited Partnership. All rights reserved.
        - list [ref=e105]:
          - listitem [ref=e106]:
            - link "SMS Terms and Conditions" [ref=e107] [cursor=pointer]:
              - /url: /about/sms-terms
          - listitem [ref=e108]:
            - link "Terms and Conditions" [ref=e109] [cursor=pointer]:
              - /url: /about/terms
          - listitem [ref=e110]:
            - link "Privacy Policy" [ref=e111] [cursor=pointer]:
              - /url: /about/privacy-policy
          - listitem [ref=e112]:
            - link "California Privacy Notice" [ref=e113] [cursor=pointer]:
              - /url: /about/california-privacy-policy
          - listitem [ref=e114]:
            - link "Your Privacy Choices privacyoptions" [ref=e115] [cursor=pointer]:
              - /url: /about/privacy-policy#additionalStatePrivacyRights
              - text: Your Privacy Choices
              - img "privacyoptions" [ref=e116]
  - alert [ref=e117]
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
> 41 |       const results = await builder.analyze();
     |                       ^ Error: frame.evaluate: Execution context was destroyed, most likely because of a navigation
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
  87 |       expect(seriousViolations).toEqual([]);
  88 | 
  89 |       return axeReport;
  90 |     });
  91 |   },
  92 | });
  93 | 
  94 | export { expect };
  95 | 
```