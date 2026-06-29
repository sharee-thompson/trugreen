# Visual Testing Notes
## Table of Contents
1. [Testing Strategies](#testing-strategies)
2. [Struggles](#struggles)
3. [Selectors](#selectors)
4. [Updates](#updates)

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

## Selectors
We are have a few different ways of handling selectors that cause false failues, listed out in the utility visualAssistance.

### Remove
Import the function removeElementIfExists in your test in a loop, this function will accept a param like (page, selector, name) then the console prints it's name to reassure you it did find it, & did remove it. Ite iterates through the object or array of selectorsToRemove. Also consumed by the utility function elementScreenshotItems.

### Mask
There is an object or array of selectorsToMask, which is iterated through on function elementScreenshotItems & the final function, takeFullPageScreenshot. Call this in your visual assertion on the mask prop.

## Updates
6/29/26 - I changed the mask color to light orange to make it different from the pixel difference in failures. I was going to use a less emergent color temperature, like #0DCAE3 #7FFFD4 or #00FFFF but I thought it might get confusing with this brand theme.

6/29/26 - I moved the visual utilities to their own directory.