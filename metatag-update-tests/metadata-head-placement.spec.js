const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.METADATA_TEST_BASE_URL || 'http://localhost:8080';

// Routes with async generateMetadata that return both alternates.canonical and
// openGraph.url. These are the routes most likely to hit the Next.js 15
// streaming-metadata bug where title/description/canonical are emitted outside
// <head> and end up in <body>.
const suspiciousCases = [
  { path: '/about/privacy-policy', expectedCanonical: '/about/privacy-policy' },
  { path: '/about/california-privacy-policy', expectedCanonical: '/about/california-privacy-policy' },
  { path: '/about/sms-terms', expectedCanonical: '/about/sms-terms' },
  { path: '/about/terms', expectedCanonical: '/about/terms' },
  { path: '/aftercare', expectedCanonical: '/aftercare' },
  { path: '/customer-support', expectedCanonical: '/customer-support' },
  { path: '/lawn-care-101/blog', expectedCanonical: '/lawn-care-101/blog' },
  { path: '/lawn-care-101/faqs', expectedCanonical: '/lawn-care-101/faqs' },
  { path: '/lawn-care-101/learning-center', expectedCanonical: '/lawn-care-101/learning-center' },
  { path: '/lawn-care-101/learning-center/grasses/brown-patch', expectedCanonical: '/lawn-care-101/learning-center/grasses/brown-patch' },
  { path: '/lawn-care-101', expectedCanonical: '/lawn-care-101' },
  { path: '/local-lawn-care', expectedCanonical: '/local-lawn-care' },
  { path: '/newsroom', expectedCanonical: '/newsroom' },
  { path: '/newsroom/executive-staff', expectedCanonical: '/newsroom/executive-staff' },
  { path: '/pests-products-and-services', expectedCanonical: '/pests-products-and-services' },
  { path: '/products-and-services', expectedCanonical: '/products-and-services' },
  { path: '/service-terms-and-conditions', expectedCanonical: '/service-terms-and-conditions' },
  { path: '/why-choose-trugreen/testimonials-and-ratings', expectedCanonical: '/why-choose-trugreen/testimonials-and-ratings' },
];

for (const { path, expectedCanonical } of suspiciousCases) {
  test(`metadata tags should live in <head> for ${path}`, async ({ page }) => {
    const url = `${BASE_URL}${path}`;
    await page.goto(url, { waitUntil: 'load', timeout: 20000 });

    const result = await page.evaluate(() => {
      return {
        titleInHead: document.querySelector('head > title')?.textContent ?? null,
        titlesInBody: [...document.querySelectorAll('body title')].map(el => el.textContent),
        canonicalInHead: document.querySelector('head > link[rel="canonical"]')?.getAttribute('href') ?? null,
        canonicalsInBody: [...document.querySelectorAll('body link[rel="canonical"]')].map(el => el.getAttribute('href')),
        descriptionInHead: document.querySelector('head > meta[name="description"]')?.getAttribute('content') ?? null,
        descriptionsInBody: [...document.querySelectorAll('body meta[name="description"]')].map(el => el.getAttribute('content')),
      };
    });

    const failures = [];
    if (result.titlesInBody.length) failures.push(`<title> found in <body>: ${result.titlesInBody.join(', ')}`);
    if (result.descriptionsInBody.length) failures.push('<meta name="description"> found in <body>');
    if (result.canonicalsInBody.length) failures.push(`<link rel="canonical"> found in <body>: ${result.canonicalsInBody.join(', ')}`);
    if (!result.titleInHead) failures.push('no <title> in <head>');
    if (!result.descriptionInHead) failures.push('no <meta name="description"> in <head>');
    if (!result.canonicalInHead) {
      failures.push('no <link rel="canonical"> in <head>');
    } else {
      const canonicalUrl = new URL(result.canonicalInHead, url);
      if (canonicalUrl.pathname !== expectedCanonical) {
        failures.push(`canonical in <head> is ${canonicalUrl.pathname}, expected ${expectedCanonical}`);
      }
    }

    expect(failures, failures.join('; ')).toEqual([]);
  });
}
