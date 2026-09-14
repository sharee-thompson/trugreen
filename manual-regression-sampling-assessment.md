# TruGreen Sampling Regression Assessment

## Scope Reviewed

Sampling pages defined in [tests/performance/performance-pages.ts](/Users/sharee.thompson/Projects/TruGreen/trugreen/tests/performance/performance-pages.ts):

- home
- products-and-services
- customer-support
- lp-high
- trupro
- lawn-fertilization
- branch-chattanooga-tn
- lawn-care-101
- pay-your-bill
- blog-landing

## Current Automated Coverage

- Accessibility scans cover home, products-and-services, customer-support, lawn-care-101, pay-your-bill, and the three landing pages.
- Performance audits can target all sampling pages, including the current sampling subset.
- Visual regression covers home, products-and-services, pay-your-bill, the blog application page, and all landing-page variants.
- Link validation crawls outward from the homepage.
- SEO audit currently focuses on the homepage.
- Analytics coverage is homepage-specific and validates GA4 plus CTA navigation into buy-online.
- Functional smoke covers homepage branding, buy-online entry presence, customer-support content, lawn-care-101 content, and buy-online reachability.
- Landing-page functional tests validate component presence on high, medium, and low intent landing pages, but not user journeys through those components.
- Buy-flow automation validates the ecommerce flow on buy-online variants, not the public sampling content pages themselves.
- API coverage validates branch lookup data for a ZIP code, not the local branch page UI.

## Coverage Gaps That Still Need Manual Regression

- CTA behavior is mostly unverified on the sampled public pages. Existing tests usually check that a button or link is visible, not that it routes correctly.
- Public quote and contact forms are largely unverified. Automation does not cover required-field validation on the products page, landing page lead form, or customer-support contact form.
- FAQ and accordion behavior is not functionally exercised on customer-support, products-and-services, trupro, or lawn-fertilization.
- Educational navigation is not functionally exercised on lawn-care-101 and blog landing beyond basic presence checks.
- Pay-your-bill behavior is not functionally exercised. The current suite does not validate required fields, alternate lookup paths, or fallback support navigation.
- The Chattanooga local branch page is not functionally covered. Live inspection currently returned an error state, which makes this page especially important for manual regression.
- Cross-link behavior from plan cards and service cards is mostly untested on products-and-services, trupro, and lawn-fertilization.

## Recommended Manual Suite Size

- 10 manual test cases, one anchored to each sampling page.
- Expected execution time: about 95 to 115 minutes total.
- Focus: functional behavior only.
- Excluded on purpose: pure visual checks, accessibility conformance, Lighthouse performance, and basic page-load presence that automation already covers.

## Output

ADO import file: [manual-regression-sampling-ado.csv](/Users/sharee.thompson/Projects/TruGreen/trugreen/manual-regression-sampling-ado.csv)
