# Homepage Analytics Baseline - 2026-08-03

This baseline was captured against `https://www.trugreen.com/` using browser MCP / Playwright.

## Purpose

Use this file as a black-box comparison point when the SSR homepage reaches a test environment.

Compare later runs against:

- GA4 property ID
- GA4 event names observed on load
- dataLayer event names observed on load
- CTA navigation behavior and resulting analytics events

## Capture Context

- Date: 2026-08-03
- Environment: production public site
- Route: `/`
- Tooling: browser MCP / Playwright
- Caveat: this is an observational baseline, not a complete tag audit

## Confirmed GA4 Details

- GA4 property ID: `G-V7W66KBH3J`
- Homepage document title: `TruGreen | America's #1 Name in Lawn Care`

## Confirmed Homepage GA4 Network Events On Load

Observed from GA4 collect requests on homepage load:

1. `page_view`
2. `scroll`

### Observed request details

- `page_view`
  - `tid=G-V7W66KBH3J`
  - `dl=https://www.trugreen.com/`
  - `dt=TruGreen | America's #1 Name in Lawn Care`

- `scroll`
  - `tid=G-V7W66KBH3J`
  - `dl=https://www.trugreen.com/`
  - `dt=TruGreen | America's #1 Name in Lawn Care`

## Confirmed Homepage dataLayer Event Names On Load

Unique event names observed in `window.dataLayer` on the homepage:

1. `gtm.js`
2. `gtm.dom`
3. `gtm.load`
4. `gtm.scrollDepth`
5. `OneTrustLoaded`
6. `OptanonLoaded`
7. `OneTrustGroupsUpdated`
8. `gtm.triggerGroup`

## Homepage CTA Targets Observed

Visible or accessible CTA candidates observed on the homepage during capture included:

1. `Start Today`
2. `Get Started`
3. `See Pricing`
4. `sign up`
5. `Buy Online`

## Confirmed CTA Analytics Sample

One CTA interaction sample was captured from the homepage flow into `/buy-online`.

### Result

- Navigation reached `https://www.trugreen.com/buy-online`
- Destination page title became `Customized Lawn Care Pricing`

### Confirmed GA4 Network Events On Destination Load

Observed after CTA-driven navigation into `/buy-online`:

1. `page_view`
2. `scroll`

### Observed destination request details

- `page_view`
  - `tid=G-V7W66KBH3J`
  - `dl=https://www.trugreen.com/buy-online`
  - `dt=Customized Lawn Care Pricing`

- `scroll`
  - `tid=G-V7W66KBH3J`
  - `dl=https://www.trugreen.com/buy-online`
  - `dt=Customized Lawn Care Pricing`

## What To Compare Later In SSR

When the SSR environment is ready, compare these same signals:

1. Homepage GA4 property ID remains `G-V7W66KBH3J`
2. Homepage still emits `page_view` on load
3. Homepage does not lose or duplicate key load events
4. Homepage dataLayer still includes the same core GTM / consent events
5. Main CTA still navigates correctly to `/buy-online` or the intended destination
6. CTA-driven destination still emits the expected `page_view`

## Recommended QA Regression Rule

Treat these as potential regressions:

1. Missing homepage `page_view`
2. Duplicate homepage `page_view`
3. Changed GA4 property ID
4. Missing CTA-driven destination `page_view`
5. Missing consent / GTM bootstrap events that are normally present

## Notes

- A full analytics inventory would require developer tag documentation or a dedicated tag audit.
- This baseline is still useful because it gives QA a concrete set of current observable events to compare against later.
