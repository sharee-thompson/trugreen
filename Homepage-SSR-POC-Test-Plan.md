Objective

Validate the TruGreen homepage SSR POC from an AQ perspective once it is deployed to a test environment.

This is a black-box sign-off plan. AQ is validating observable behavior only, not implementation details.

40-Hour Planning Assumption

- This plan is scoped to fit within approximately 40 hours total
- Only P0 items are required for homepage SSR sign-off
- P1 items should be completed only if P0 finishes on time and the environment is stable
- P2 items are follow-up coverage and are not part of the initial 40-hour commitment

Scope

- Primary sign-off route: /
- Direct variant routes such as /home-a, /home-b, and /home-c do not need full coverage unless routing behaves differently
- Isolation spot checks: /customer-support, /lawn-care-101, /buy-online
- Coverage includes desktop, mobile, console, network, and rendered HTML

Estimated Effort

- Week 1: 18-22 hours for setup, routing, SSR proof, functional regression, and first analytics pass
- Week 2: 18-22 hours for accessibility, isolation, limited visual checks, performance capture, retest, and reporting

Out of Scope

- Local dev branch testing
- Code review of SSR implementation
- Full-site regression
- Formal production Core Web Vitals certification

Entry Criteria

- SSR POC is deployed to a test environment
- AQ has the correct URL
- QA is the official non-SSR comparison environment when available
- AQ has the current homepage analytics baseline
- AQ and dev agree that initial SSR sign-off is limited to above-the-fold homepage content
- Any flags, experiments, geo rules, or personalization are disclosed

Developer Handoff Required Before AQ Sign-Off

- npm run build passes
- Scratch not-found validation returns a true 404 in both dev and prod build/start flows
- MarketingPartner=9809 hides header/footer and mounts #lead-modal
- Unsupported MarketingPartner=1234 keeps header/footer visible
- Removing the query parameter restores header/footer and clears localStorage.CMAW_MarketingPartner
- Unrelated routes and all five /buy-online\* variants were spot-checked with no unintended regression

AQ Sign-Off Checks

P0 Required for 40-Hour Sign-Off

1. Routing and status codes, 3-4 hours

- Confirm valid routes return 200 and an invalid route such as /test returns a true 404
- Confirm the not-found page renders correctly
- Spot-check at least one valid non-homepage route
- If available in the environment, spot-check the documented MarketingPartner flows

2. SSR proof on /, 4-6 hours

- Confirm / returns meaningful HTML in the initial response, not a mostly empty client shell
- Check for above-the-fold content in the raw HTML: main h1, hero copy, ribbon content, text-panel content
- Disable JavaScript and confirm informational content remains visible at roughly the same level as the pre-SSR baseline

3. Functional regression after hydration, 8-10 hours

- Confirm header, nav, primary CTA, one representative form path, modal behavior, phone display, key map content, and direct-entry/back-forward/refresh flows still work
- Watch for duplicate content, double-fired handlers, layout shift, loading overlays, console errors, and hydration warnings

4. Analytics and tracking, 6-8 hours

- Compare against the current production homepage baseline from https://www.trugreen.com/
- Required baseline signals:
  - GA4 property ID: G-V7W66KBH3J
  - Homepage load events: page_view, scroll
  - Core dataLayer events: gtm.js, gtm.dom, gtm.load, gtm.scrollDepth, OneTrustLoaded, OptanonLoaded, OneTrustGroupsUpdated, gtm.triggerGroup
  - CTA sample destination: /buy-online, with page_view and scroll on destination load
- Confirm events fire once, metadata is correct, and no duplicate analytics appear during hydration
- If dev identifies the exact Suspense-related tracking signal, validate that too

5. Accessibility and isolation, 4-5 hours

- Run automated a11y checks on /
- Perform a short keyboard pass on /
- Confirm /customer-support, /lawn-care-101, and /buy-online still render correctly

6. Limited visual and performance review, 4-6 hours

- Visual coverage for sign-off: /, /customer-support, /buy-online
- Confirm no obvious layout shift, flashing, overlap, or late content jumps on desktop or mobile
- Capture TTFB, FCP, LCP, CLS, initial HTML payload size, and first-load JavaScript size for / when a valid baseline exists
- If only the SSR environment exists, document current performance and treat findings as preliminary

P1 Complete If Time Permits

1. Expanded visual coverage, 4-6 hours

- Visual coverage: /, /products-and-services, /pay-your-bill, /blog/trugreen-lawn-care-services/trugreen-lawn-care-app, /b/ppc/landing-page, /nb/ppc/landing-page, /ppc/landing-page, /customer-support, /lawn-care-101, /buy-online
- Confirm no obvious layout shift, flashing, overlap, or late content jumps on desktop or mobile

2. Expanded functional paths, 3-5 hours

- Additional CTA variations
- Additional modal flows
- Broader carousel and interactive-module coverage if needed

3. Deeper performance comparison, 3-4 hours

- Compare SSR results to the agreed baseline when possible
- Use the same route, browser, device profile, test method, and network profile for at least three runs, then report the median

P2 Deferred From the Initial 40-Hour Plan

- Full visual pass across the extended page inventory if homepage SSR sign-off is already complete
- Deeper analytics coverage across multiple CTA and modal permutations
- Broad non-homepage regression outside the named isolation routes
- Formal performance investigation beyond directional comparison

Exit Criteria

- / returns meaningful server-rendered HTML
- Invalid routes return correct status codes
- No critical P0 functional, analytics, visual, or accessibility regressions are found
- Isolation routes remain unaffected
- Performance findings and trade-offs are documented
- Any unfinished P1 or P2 items are explicitly recorded as follow-up coverage, not silent omissions

Open Questions for Dev

- What exact signal proves the tracking feature removed from the global Suspense boundary still works?
- Are there any intentional differences, active experiments, or known third-party dependencies AQ should account for beyond what is already known?
