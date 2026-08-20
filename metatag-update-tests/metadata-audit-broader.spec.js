const { test, expect } = require('@playwright/test');

const LOCAL_BASE = 'http://localhost:3000';
const HOMEPAGE_TITLE = "TruGreen | America's #1 Name in Lawn Care";
const HOMEPAGE_DESCRIPTION = 'Get a pro-worthy lawn with expert, local lawn care services from TruGreen, and spend your extra time doing what you love.';

// Routes that currently have generateMetadata blocks which fall back to {}
// when the CMS has no record, causing the homepage title/description to render.
const suspiciousCases = [
  { path: '/about/california-privacy-policy', expectedCanonical: '/about/california-privacy-policy' },
  { path: '/about/sms-terms', expectedCanonical: '/about/sms-terms' },
  { path: '/about/terms', expectedCanonical: '/about/terms' },
  { path: '/lawn-care-101/faqs', expectedCanonical: '/lawn-care-101/faqs' },
  { path: '/lawn-care-101/learning-center', expectedCanonical: '/lawn-care-101/learning-center' },
  { path: '/local-lawn-care', expectedCanonical: '/local-lawn-care' },
  { path: '/newsroom', expectedCanonical: '/newsroom' },
  { path: '/newsroom/executive-staff', expectedCanonical: '/newsroom/executive-staff' },
  { path: '/pests-products-and-services', expectedCanonical: '/pests-products-and-services' },
  { path: '/products-and-services', expectedCanonical: '/products-and-services' },
  { path: '/service-terms-and-conditions', expectedCanonical: '/service-terms-and-conditions' },
  // Routes we already fixed, included here as regression checks
  { path: '/about/privacy-policy', expectedCanonical: '/about/privacy-policy' },
  { path: '/customer-support', expectedCanonical: '/customer-support' },
  { path: '/ppc/landing-page', expectedCanonical: '/ppc/landing-page' },
];

for (const { path, expectedCanonical } of suspiciousCases) {
  test(`metadata for ${path}`, async ({ page }) => {
    await page.goto(`${LOCAL_BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    const title = await page.title();
    const canonicalHref = await page.locator('link[rel="canonical"]').first().getAttribute('href').catch(() => null);
    const descriptionEl = await page.locator('meta[name="description"]').first().getAttribute('content').catch(() => null);

    // Collect failures for one clean assertion message per route
    const failures = [];
    if (title === HOMEPAGE_TITLE) failures.push(`title is homepage default: "${title}"`);
    if (descriptionEl === HOMEPAGE_DESCRIPTION) failures.push('description is homepage default');
    if (!canonicalHref) {
      failures.push('canonical is missing');
    } else {
      const canonicalUrl = new URL(canonicalHref, page.url());
      if (canonicalUrl.pathname !== expectedCanonical) failures.push(`canonical is ${canonicalUrl.pathname}, expected ${expectedCanonical}`);
    }

    expect(failures, failures.join('; ')).toEqual([]);
    expect(title.length).toBeGreaterThan(0);
  });
}
