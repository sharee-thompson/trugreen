# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual/visual-regression.spec.ts >> Landing Page Visual Regression Tests >> page: landing medium
- Location: tests/visual/visual-regression.spec.ts:123:11

# Error details

```
Error: page.evaluate: TypeError: null is not an object (evaluating 'document.body.scrollHeight')
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner
  - main [ref=e2]:
    - img "Loading..." [ref=e5]
  - contentinfo [ref=e7]:
    - generic [ref=e8]:
      - generic [ref=e9]:
        - generic [ref=e11]:
          - heading "About Us" [level=2] [ref=e12]
          - list:
            - listitem [ref=e13]:
              - link "About TruGreen" [ref=e14]:
                - /url: /newsroom/executive-staff#about
            - listitem [ref=e15]:
              - link "Executive Staff" [ref=e16]:
                - /url: /newsroom/executive-staff
            - listitem [ref=e17]:
              - link "Newsroom" [ref=e18]:
                - /url: /newsroom
            - listitem [ref=e19]:
              - link "Careers" [ref=e20]:
                - /url: https://www.trugreenjobs.com
        - generic [ref=e22]:
          - heading "Our Services" [level=2] [ref=e23]
          - list:
            - listitem [ref=e24]:
              - link "Lawn Care Plan Comparison" [ref=e25]:
                - /url: /products-and-services
            - listitem [ref=e26]:
              - link "Tree & Shrub Plan Overview" [ref=e27]:
                - /url: /products-and-services/trushrub-tree-and-shrub-care
            - listitem [ref=e28]:
              - link "Pest Control Plan Comparison" [ref=e29]:
                - /url: /pests-products-and-services
            - listitem [ref=e30]:
              - link "Branch Finder" [ref=e31]:
                - /url: /local-lawn-care
        - generic [ref=e33]:
          - heading "Resources" [level=2] [ref=e34]
          - list:
            - listitem [ref=e35]:
              - link "FAQs" [ref=e36]:
                - /url: /lawn-care-101/faqs
            - listitem [ref=e37]:
              - link "Military Discount" [ref=e38]:
                - /url: /military-discount
            - listitem [ref=e39]:
              - link "Learning Center" [ref=e40]:
                - /url: /lawn-care-101/learning-center
            - listitem [ref=e41]:
              - link "Blogs" [ref=e42]:
                - /url: /lawn-care-101/blog
            - listitem [ref=e43]:
              - link "Service Terms and Conditions" [ref=e44]:
                - /url: /service-terms-and-conditions
        - generic [ref=e47]:
          - heading "For new service" [level=2] [ref=e48]
          - list:
            - listitem [ref=e49]:
              - link "1-844-567-9909" [ref=e50]:
                - /url: tel:1-844-567-9909
            - listitem [ref=e51]:
              - link "Get a Call Back" [ref=e52]:
                - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        - generic [ref=e55]:
          - heading "For our Customer" [level=2] [ref=e56]
          - list:
            - listitem [ref=e57]:
              - link "Account Login & Register" [ref=e58]:
                - /url: /my-account/login
            - listitem [ref=e59]:
              - generic [ref=e60]: "Call:"
              - link "1-844-768-0421" [ref=e61]:
                - /url: tel:1-844-768-0421
            - listitem [ref=e62]:
              - 'link "Text: MYLAWN (695296)" [ref=e63]':
                - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
            - listitem [ref=e64]:
              - link "Customer Support" [ref=e65]:
                - /url: /customer-support
            - listitem [ref=e66]:
              - link "Pay My Bill" [ref=e67]:
                - /url: /pay-your-bill
      - generic [ref=e68]:
        - generic [ref=e70]:
          - generic [ref=e71]:
            - link "Facebook Icon" [ref=e72]:
              - /url: https://www.facebook.com/trugreen
              - img "Facebook Icon" [ref=e73]
            - link "X.com Icon" [ref=e74]:
              - /url: https://x.com/trugreen
              - img "X.com Icon" [ref=e75]
            - link "Instagram Icon" [ref=e76]:
              - /url: https://www.instagram.com/trugreen/
              - img "Instagram Icon" [ref=e77]
            - link "Youtube Icon" [ref=e78]:
              - /url: https://www.youtube.com/trugreen
              - img "Youtube Icon" [ref=e79]
            - link "TikTok Icon" [ref=e80]:
              - /url: https://www.tiktok.com/@trugreen_lawn?lang=en
              - img "TikTok Icon" [ref=e81]
            - link "Yelp Icon" [ref=e82]:
              - /url: https://www.yelp.com/
              - img "Yelp Icon" [ref=e83]
          - generic [ref=e84]:
            - 'link "BBB: Better Business Bureau, Accredited Business Badge" [ref=e85]':
              - /url: https://www.bbb.org/us/tn/memphis/profile/lawn-maintenance/trugreen-0543-1000545#bbbseal
              - 'img "BBB: Better Business Bureau, Accredited Business Badge" [ref=e86]'
            - 'link "NALP: National Association of Landscape Professionals Logo" [ref=e87]':
              - /url: "#"
              - 'img "NALP: National Association of Landscape Professionals Logo" [ref=e88]'
            - 'link "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e89]':
              - /url: /pga-tour
              - 'img "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e90]'
            - 'link "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e91]':
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
              - 'img "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e92]'
        - separator [ref=e93]
      - generic [ref=e96]:
        - paragraph [ref=e98]:
          - img "TruGreen Leaf Logo" [ref=e99]
          - text: © 2026 TruGreen Limited Partnership. All rights reserved.
        - list [ref=e101]:
          - listitem [ref=e102]:
            - link "SMS Terms and Conditions" [ref=e103]:
              - /url: /about/sms-terms
          - listitem [ref=e104]:
            - link "Terms and Conditions" [ref=e105]:
              - /url: /about/terms
          - listitem [ref=e106]:
            - link "Privacy Policy" [ref=e107]:
              - /url: /about/privacy-policy
          - listitem [ref=e108]:
            - link "California Privacy Notice" [ref=e109]:
              - /url: /about/california-privacy-policy
          - listitem [ref=e110]:
            - link "Your Privacy Choices privacyoptions" [ref=e111]:
              - /url: /about/privacy-policy#additionalStatePrivacyRights
              - text: Your Privacy Choices
              - img "privacyoptions" [ref=e112]
```

# Test source

```ts
  1   | import { Page, TestInfo, expect } from "@playwright/test";
  2   | 
  3   | //Original emulateLazyLoadScroll
  4   | function isClosedPageError(error: unknown): boolean {
  5   |   const message = error instanceof Error ? error.message : String(error);
  6   | 
  7   |   return (
  8   |     message.includes("Target page, context or browser has been closed") ||
  9   |     message.includes("Execution context was destroyed") ||
  10  |     message.includes("Target closed") ||
  11  |     message.includes("Page closed")
  12  |   );
  13  | }
  14  | 
  15  | async function runWhilePageOpen(
  16  |   page: Page,
  17  |   action: () => Promise<void>,
  18  | ): Promise<boolean> {
  19  |   if (page.isClosed()) {
  20  |     return false;
  21  |   }
  22  | 
  23  |   try {
  24  |     await action();
  25  |     return !page.isClosed();
  26  |   } catch (error) {
  27  |     if (page.isClosed() || isClosedPageError(error)) {
  28  |       return false;
  29  |     }
  30  | 
  31  |     throw error;
  32  |   }
  33  | }
  34  | 
  35  | export async function emulateLazyLoadScroll(page: Page): Promise<void> {
  36  |   const DOWN_SCROLL_DISTANCE = 200;
  37  |   const UP_SCROLL_DISTANCE = 300;
  38  |   const MAX_SCROLL_STEPS = 200; // failsafe
  39  |   const WAIT_BETWEEN_SCROLLS = 100;
  40  | 
  41  |   //  1. SCROLL DOWN TO TRIGGER LAZY LOAD
  42  | 
  43  |   const completedScrollDown = await runWhilePageOpen(page, () =>
> 44  |     page.evaluate(
      |          ^ Error: page.evaluate: TypeError: null is not an object (evaluating 'document.body.scrollHeight')
  45  |       async ({ distance, maxSteps, waitMs }) => {
  46  |         await new Promise<void>((resolve) => {
  47  |           let steps = 0;
  48  | 
  49  |           const scrollDown = () => {
  50  |             steps++;
  51  |             window.scrollBy(0, distance);
  52  | 
  53  |             if (
  54  |               steps >= maxSteps ||
  55  |               window.innerHeight + window.scrollY >= document.body.scrollHeight
  56  |             ) {
  57  |               resolve();
  58  |               return;
  59  |             }
  60  | 
  61  |             setTimeout(scrollDown, waitMs);
  62  |           };
  63  | 
  64  |           scrollDown();
  65  |         });
  66  |       },
  67  |       {
  68  |         distance: DOWN_SCROLL_DISTANCE,
  69  |         maxSteps: MAX_SCROLL_STEPS,
  70  |         waitMs: WAIT_BETWEEN_SCROLLS,
  71  |       },
  72  |     ),
  73  |   );
  74  | 
  75  |   if (!completedScrollDown) {
  76  |     return;
  77  |   }
  78  | 
  79  |   //  2. STABILIZE LAYOUT AFTER SCROLLING
  80  | 
  81  |   if (
  82  |     !(await runWhilePageOpen(page, () =>
  83  |       page.evaluate(
  84  |         () =>
  85  |           new Promise<void>((resolve) =>
  86  |             requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  87  |           ),
  88  |       ),
  89  |     ))
  90  |   ) {
  91  |     return;
  92  |   }
  93  | 
  94  |   //  3. SCROLL BACK TO TOP SAFELY (smooth-ish)
  95  | 
  96  |   if (
  97  |     !(await runWhilePageOpen(page, () =>
  98  |       page.evaluate(
  99  |         async ({ distance, waitMs, maxSteps }) => {
  100 |           await new Promise<void>((resolve) => {
  101 |             let steps = 0;
  102 | 
  103 |             const scrollUp = () => {
  104 |               steps++;
  105 | 
  106 |               if (window.scrollY <= 0 || steps >= maxSteps) {
  107 |                 window.scrollTo(0, 0);
  108 |                 resolve();
  109 |                 return;
  110 |               }
  111 | 
  112 |               window.scrollBy(0, -distance);
  113 |               setTimeout(scrollUp, waitMs);
  114 |             };
  115 | 
  116 |             scrollUp();
  117 |           });
  118 |         },
  119 |         {
  120 |           distance: UP_SCROLL_DISTANCE,
  121 |           waitMs: WAIT_BETWEEN_SCROLLS,
  122 |           maxSteps: MAX_SCROLL_STEPS,
  123 |         },
  124 |       ),
  125 |     ))
  126 |   ) {
  127 |     return;
  128 |   }
  129 | 
  130 |   //  4. FINAL STABILIZATION BEFORE SCREENSHOT
  131 | 
  132 |   if (
  133 |     !(await runWhilePageOpen(page, () =>
  134 |       page.evaluate(
  135 |         () =>
  136 |           new Promise<void>((resolve) =>
  137 |             requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  138 |           ),
  139 |       ),
  140 |     ))
  141 |   ) {
  142 |     return;
  143 |   }
  144 | 
```