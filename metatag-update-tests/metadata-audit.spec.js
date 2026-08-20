const { test, expect } = require('@playwright/test');

const LOCAL_BASE = 'http://localhost:8080';
const HOMEPAGE_TITLE = "TruGreen | America's #1 Name in Lawn Care";

// Routes that now get static metadata via their layout.js or page.js
const staticCases = [
  { path: '/pay-your-bill', expectedCanonical: '/pay-your-bill' },
  { path: '/searchResult', expectedCanonical: '/searchResult' },
  { path: '/myservicesummary', expectedCanonical: '/myservicesummary', expectedTitle: 'My Service Summary | TruGreen' },
  { path: '/appointment-scheduler', expectedCanonical: '/appointment-scheduler' },
  { path: '/my-account/reset-password', expectedCanonical: '/my-account/reset-password' },
  { path: '/my-account/globalError', expectedCanonical: '/my-account/globalError' },
  { path: '/lawn-care-101/learning-center/search', expectedCanonical: '/lawn-care-101/learning-center/search' },
];

// Routes whose metadata comes from the shared CMS fetch helper
const dynamicCases = [
  { path: '/aftercare', expectedCanonical: '/aftercare' },
  { path: '/why-choose-trugreen/testimonials-and-ratings', expectedCanonical: '/why-choose-trugreen/testimonials-and-ratings' },
];

for (const { path, expectedCanonical, expectedTitle } of staticCases) {
  test(`static metadata for ${path}`, async ({ page }) => {
    await page.goto(`${LOCAL_BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    const title = await page.title();
    const canonicalHref = await page.locator('link[rel="canonical"]').first().getAttribute('href');
    const canonicalUrl = new URL(canonicalHref, page.url());

    expect(canonicalUrl.pathname).toBe(expectedCanonical);

    if (expectedTitle) {
      expect(title).toBe(expectedTitle);
    } else {
      expect(title).not.toBe(HOMEPAGE_TITLE);
      expect(title.length).toBeGreaterThan(0);
    }
  });
}

for (const { path, expectedCanonical } of dynamicCases) {
  test(`dynamic metadata for ${path}`, async ({ page }) => {
    await page.goto(`${LOCAL_BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    const title = await page.title();
    const canonicalHref = await page.locator('link[rel="canonical"]').first().getAttribute('href');
    const canonicalUrl = new URL(canonicalHref, page.url());

    expect(canonicalUrl.pathname).toBe(expectedCanonical);
    expect(title).not.toBe(HOMEPAGE_TITLE);
    expect(title.length).toBeGreaterThan(0);
  });
}
