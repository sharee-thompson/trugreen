# Visual Testing Notes
## Table of Contents
1. [Testing Strategies](#testing-strategies)
2. [Struggles](#struggles)
3. [Frankenstein](#the-biggest-struggle-frankenstein)
4. [Selectors](#selectors)
5. [Make Note](#make-note)
6. [Updates](#updates)

## Testing Strategies
Standard Regression - Sitewide in a high level
Storybook - Design SOT, discovers new stories as well as tests existing for regression
Feature Development: 
    Landing Pages

## Struggles
For each you list, try to identify if this issue persists to all testing strategies, all environments, all viewports, or even all pages in order to try to identify the root cause more efficiently & to identify where a struggle exists siloed, but is a testing point elsewhere. For example, one series of tests requires the phone number is hidden or masked, but another test series may require it's presence.

The idea of recording these is to find what works, be mindful of impacts, & easier troubleshooting in the future.

### Struggle: Template
Affects: All, Standard, Storybook, or Feature
Exists On: All, Prod, QA, or Dev; All, desktop or mobile; Sitewide or specific section or page.
Description: Reference screenshot taken before hero image & svgs for bullet points in following container loaded
Implementation: Review the different strategies already in use or available. Have we tried a simple wait for 'domcontentloaded' or something similar?  

### Struggle: Page Loading
Affects: Standard
Exists On: Probably All, but right now, only one test on mobile on Customer Support affected
Description: Reference screenshot taken before hero image & svgs for bullet points in following container loaded
Implementation: Review the different strategies already in use or available. Have we tried a simple wait for 'domcontentloaded' or something similar? First step is to re-run reference.
Caveats: This is a "frankenstein" site currently, it uses React, Drupal, JS, & who knows what else. There are a lot of things at play that affect the page load, but something to keep in mind. For example, a very old fashioned method like forceFonts for sites whose fonts load last probably isn't the most stable method.   

### Struggle: Inconsistent Masking of the Dynamic Phone Number
Affects: Standard & potentially Feature
Exists On: All, Prod, QA, or Dev
Description: While the InfinityNumber is masked in the body & footer to prevent false failures, the header is either sometimes or always unmasked.
Implementation: By way of looking at bugs, I found that the locator strategy used on the site is inconsistent. At minimum, all classes should include 'InfinityNumber'. IDs are sometimes left blank. Review if targeting only 'InfinityNumber' would be a safe approach. The idea is that since these numbers are expected to display & dial out to the same number on a page, they should have the same locators, but they do not, so some bugs have been found.

## The Biggest Struggle: Frankenstein
This site uses two servers that pull from two repos with hopes of a smooth integration, meaning we are dealing with half the site being Drupal heavy & the other being Next.js/React heavy. These frameworks handle everything differently, so extra consideration is needed.

Resources:
[Miro Map](https://miro.com/app/board/uXjVHVVXe4k=/?moveToWidget=3458764671360012920&cot=14)
[Sitemap Review](https://confluence.uhub.biz/spaces/VYRNATRG/pages/928797756/Sitemap+Review)
[Sitemap Inventory](https://wppcloudnam-my.sharepoint.com/:x:/g/personal/jacob_berthelsen_vml_com/IQAaPDAELeCMT43s7bhM5wHrAcLtOr_1E1_lwEEhL1pVCQA?e=AUVyIn)

On a high level, we could split out links for visual tests like so:
- Drupal
    - Blog
    - Locations
        - Municipalities
        - State LP
        - City LP
        - Local Service
    - Learning Center
    - Products & Services

- Next.js
    - Homepage variants
    - Lawn Care 101
    - Newsroom
    - About
    - Buy Online
    - Auth
        - My account authentication
        - My account payments
        - My account settings
        - My account misc        

Then we could try different strategies based on the backend sourcing by groups.
> Drupal needs you to wait for content (lazy images), React needs you to wait for hydration. Different signals entirely.

## Selectors
We are have a few different ways of handling selectors that cause false failues, listed out in the utility visualAssistance.

### Remove
Use this if you really need it out the DOM AND you want it to be incorporated in screenshot comparison on it's own. And if it's on the Homepage.

Good uses are the promo banner that changes on the top of the page, the cookie banner, & the sticky chat button. Removing these can have adverse reactions to the page layout, but we also want to ensure they are present & accounted for in testing.

Import the function removeElementIfExists in your test in a loop, this function will accept a param like (page, selector, name) then the console prints it's name to reassure you it did find it, & did remove it. It iterates through the object or array of selectorsToRemove. Also consumed by the utility function elementScreenshotItems, which is responsible for taking a screenshot comparison of just the component to make sure it found no regression.

### Mask
Use this for dynamic components when it's presence does not impact layout between screenshots AND it does not need to be incorporated in screenshot comparisons on it's own.

A good use case is the dynamic phone numbers, which are intended to change on every page load & do not impact the overall layout of the page.

There is an object or array of selectorsToMask, which is iterated through on function elementScreenshotItems & the final function, takeFullPageScreenshot. Call this in your visual assertion on the mask prop.

## Make Note
Check out the index file in utils for available functions!

### Sanity Check: Cookie Banner
Any component level screenshots for the cookie banner will look full page because it uses a full-screen overlay.

### Screenshot config options
These are generally either in your Playwright config OR the test itself. We also have options available to add in functions in visual/helpers, like takeFullPageScreenshot & getElementScreenshotOptions.
The only universal strictness that may be updated is:
```
fullPage: true,
mask: selectorsToMask.map((item) => page.locator(item.selector)),
maskColor: "#FF7F50",
maxDiffPixelRatio: 0.03,
```
### Bypassing the Site's Content Security Policy
See the later update from 6/29, where I explained why I am bypassing CSP & what it means.

## Updates
### 6/29/26 
I changed the mask color to light orange to make it different from the pixel difference in failures. I was going to use a less emergent color temperature, like #0DCAE3 #7FFFD4 or #00FFFF but I thought it might get confusing with this brand theme.

I moved the visual utilities to their own directory.

I added a bypassCSP:true use in the main config. Our site throws these errors everywhere & it was breaking one or two single page tests when I was injecting CSS to remove selectors. Here's a note on that:
> bypassCSP disables a real browser security feature. For a visual regression suite running against your own 
> site, that's a totally reasonable trade-off — you're not testing CSP enforcement here, you're checking layout,
> and you need to inject a hide-stylesheet to do it. So I'd say go for it.
> 
> But two honest caveats:
> 
> You're now testing a slightly non-production browser state. CSP is off, so if a future bug were caused by CSP (e.g. a legit stylesheet getting blocked in prod), this suite wouldn't catch it. That's fine for visual regression — just know it's a deliberate blind spot.
> If you'd rather not bypass CSP at all, fall back to Option B from last message — stylePath. Because stylePath applies the CSS during the screenshot capture itself (not via DOM injection), it sidesteps CSP entirely — there's no style tag for the policy to refuse. The cost is the static-CSS-file maintenance we discussed (you lose selectorsToRemove as single source of truth).
> Option B:
>> Create a utility, visual-hide.css
>> ```
>> .changeimgsrc,
>> #onetrust-banner-sdk,
>> anyOtherSelectorToRemove,
>> .top-strip {
>>   display: none !important;
>> }
>> ```
>> Then update your test assertion like so
>> ```
>> await expect(page).toHaveScreenshot(`fullpage-${name}.png`, {
>>  fullPage: true,
>>  stylePath: path.join(__dirname, "visual-hide.css"),
>>  mask: selectorsToMask.map((item) => page.locator(item.selector)),
>>  maskColor: "#FF7F50",
>>  maxDiffPixelRatio: 0.03,
>> ```