# QA vs Production Metadata Comparison

**Date:** 2026-08-19
**QA:** https://qa-trugreen.com
**Production:** https://www.trugreen.com

## Summary

- **Total routes:** 21
- **QA has a working metadata update (Prod is stale/broken):** 0
- **QA is broken but Prod is fine (regression):** 1
- **Both QA and Prod are broken:** 16
- **QA fixes a broken Prod:** 0
- **No change between environments:** 4
- **Fetch error on one or both:** 0

## Quick verdict

Routes where the branch is doing more **good** than harm are marked `qa-update`
(new, correct metadata in QA head that differs from/ is missing in Prod) or
`qa-fix` (QA is correctly in `<head>` while Prod is in `<body>`).

Routes where the branch is doing **harm** are marked `qa-regression`:
QA has title / description / canonical in `<body>` while Prod has them in `<head>`.

## Results

| Route | QA title | Prod title | QA desc | Prod desc | QA canon | Prod canon | QA body tags? | Prod body tags? | Status |
|---|---|---|---|---|---|---|---|---|---|
| /appointment-scheduler | TruGreen \| America’s #1 Name in Lawn Care | TruGreen \| America’s #1 Name in Lawn Care | Get a pro-worthy lawn with expert, local lawn care services ... | Get a pro-worthy lawn with expert, local lawn care services ... | / | / | no | no | both-broken |
| /home-a | TruGreen \| America’s #1 Name in Lawn Care | TruGreen \| America’s #1 Name in Lawn Care | Get a pro-worthy lawn with expert, local lawn care services ... | Get a pro-worthy lawn with expert, local lawn care services ... | / | / | no | no | both-broken |
| /home-b | TruGreen \| America’s #1 Name in Lawn Care | TruGreen \| America’s #1 Name in Lawn Care | Get a pro-worthy lawn with expert, local lawn care services ... | Get a pro-worthy lawn with expert, local lawn care services ... | / | / | no | no | both-broken |
| /home-c | TruGreen \| America’s #1 Name in Lawn Care | TruGreen \| America’s #1 Name in Lawn Care | Get a pro-worthy lawn with expert, local lawn care services ... | Get a pro-worthy lawn with expert, local lawn care services ... | / | / | no | no | both-broken |
| /lawn-care-101/learning-center/search | Learning Center Page \| TruGreen | Learning Center Page \| TruGreen | After we service your property, you may wonder what to do ne... | After we service your property, you may wonder what to do ne... | /learning-center | /learning-center | no | no | no-change |
| /my-account/globalError | TruGreen \| America’s #1 Name in Lawn Care | TruGreen \| America’s #1 Name in Lawn Care | Get a pro-worthy lawn with expert, local lawn care services ... | Get a pro-worthy lawn with expert, local lawn care services ... | / | / | no | no | both-broken |
| /my-account/reset-password | TruGreen \| America’s #1 Name in Lawn Care | TruGreen \| America’s #1 Name in Lawn Care | Get a pro-worthy lawn with expert, local lawn care services ... | Get a pro-worthy lawn with expert, local lawn care services ... | / | / | no | no | both-broken |
| /myservicesummary | TruGreen \| America’s #1 Name in Lawn Care | TruGreen \| America’s #1 Name in Lawn Care | Get a pro-worthy lawn with expert, local lawn care services ... | Get a pro-worthy lawn with expert, local lawn care services ... | / | / | no | no | both-broken |
| /pay-your-bill | TruGreen \| America’s #1 Name in Lawn Care | TruGreen \| America’s #1 Name in Lawn Care | Get a pro-worthy lawn with expert, local lawn care services ... | Get a pro-worthy lawn with expert, local lawn care services ... | / | / | no | no | both-broken |
| /searchResult | TruGreen \| America’s #1 Name in Lawn Care | TruGreen \| America’s #1 Name in Lawn Care | Get a pro-worthy lawn with expert, local lawn care services ... | Get a pro-worthy lawn with expert, local lawn care services ... | / | / | no | no | both-broken |
| /why-choose-trugreen/testimonials-and-ratings | TruGreen \| America’s #1 Name in Lawn Care | TruGreen Testimonials &amp; Reviews \| TruGreen | Get a pro-worthy lawn with expert, local lawn care services ... | Hear what satisfied consumers say they loved about their Tru... | / | /why-choose-trugreen/testimonials-and-ratings | no | no | qa-regression |
| /about/privacy-policy |  |  |  |  | / | / | yes | yes | both-broken |
| /customer-support | TruGreen \| America’s #1 Name in Lawn Care | Customer support \| TruGreen | Get a pro-worthy lawn with expert, local lawn care services ... |  | / | /customer-support | no | no | both-broken |
| /ppc/landing-page | PPC Landing Page - Low Intent | PPC Landing Page - Low Intent | Low intent PPC landing page | Low intent PPC landing page | / | / | no | no | no-change |
| /about/california-privacy-policy |  |  |  |  | / | / | yes | yes | both-broken |
| /about/terms |  |  |  |  | / | / | yes | yes | both-broken |
| /b/ppc/landing-page | PPC Landing Page - High Intent | PPC Landing Page - High Intent | High intent PPC landing page | High intent PPC landing page | / | / | no | no | no-change |
| /lawn-care-101/learning-center |  |  |  |  | / | / | yes | yes | both-broken |
| /nb/ppc/landing-page | PPC Landing Page - Mid Intent | PPC Landing Page - Mid Intent | Mid intent PPC landing page | Mid intent PPC landing page | / | / | no | no | no-change |
| /newsroom/executive-staff |  |  |  |  | / | / | yes | yes | both-broken |
| /newsroom |  |  |  |  | / | / | yes | yes | both-broken |

## Detail by status

### QA metadata in <body> (regression) (1)

- **/why-choose-trugreen/testimonials-and-ratings** (commit efa52654e)

### Both in <body> (16)

- **/appointment-scheduler** (commit efa52654e)
- **/home-a** (commit efa52654e)
- **/home-b** (commit efa52654e)
- **/home-c** (commit efa52654e)
- **/my-account/globalError** (commit efa52654e)
- **/my-account/reset-password** (commit efa52654e)
- **/myservicesummary** (commit efa52654e)
- **/pay-your-bill** (commit efa52654e)
- **/searchResult** (commit efa52654e)
- **/about/privacy-policy** (commit 2bc56835)
- **/customer-support** (commit 2bc56835)
- **/about/california-privacy-policy** (commit da9c8af)
- **/about/terms** (commit da9c8af)
- **/lawn-care-101/learning-center** (commit da9c8af)
- **/newsroom/executive-staff** (commit da9c8af)
- **/newsroom** (commit da9c8af)

### No change (4)

- **/lawn-care-101/learning-center/search** (commit efa52654e)
- **/ppc/landing-page** (commit 2bc56835)
- **/b/ppc/landing-page** (commit da9c8af)
- **/nb/ppc/landing-page** (commit da9c8af)

## Notes

- Title, description, and canonical are read from the first occurrence in the HTML.
- `QA body tags?` and `Prod body tags?` indicate whether any of these tags were found inside the `<body>` element rather than `<head>`.
- Canonical is compared as a path only.
