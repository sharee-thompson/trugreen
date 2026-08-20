# Local Metadata Check

**Base URL:** http://localhost:3000
**Date:** 2026-08-20

## Summary

- **Total routes:** 28
- **Metadata good (head + title + description + canonical):** 27
- **Placement in <head> OK:** 28
- **Broken:** 1

## Results

| Route | Title | Description | Canonical | Title in body? | Desc in body? | Canon in body? | Good? |
|---|---|---|---|---|---|---|---|---|
| /about/california-privacy-policy | TruGreen California Privacy Notice \| TruGreen | Review TruGreen&#x27;s California Privacy Notice as required... | /about/california-privacy-policy | no | no | no | yes |
| /about/privacy-policy | TruGreen Privacy Policy \| TruGreen | Review TruGreen&#x27;s Privacy Policy including how we colle... | /about/privacy-policy | no | no | no | yes |
| /about/sms-terms | SMS Terms and Conditions \| TruGreen | 1. These SMS Terms and Conditions apply when you give prior ... | /about/sms-terms | no | no | no | yes |
| /about/terms | TruGreen Terms &amp; Conditions \| TruGreen | Review TruGreen&#x27;s Terms &amp; Conditions including serv... | /about/terms | no | no | no | yes |
| /aftercare | AfterCare Page \| TruGreen | After we service your property, you may wonder what to do ne... | /aftercare | no | no | no | yes |
| /appointment-scheduler | Schedule an Appointment \| TruGreen | Schedule your TruGreen lawn care appointment online. | /appointment-scheduler | no | no | no | yes |
| /customer-support | Customer support \| TruGreen | Get answers to your TruGreen questions and contact our custo... | /customer-support | no | no | no | yes |
| /lawn-care-101 | Lawn Care 101: Lawn Maintenance Guides and Tips \| TruGreen | Gather ideas and inspiration for growing your dream lawn, le... | /lawn-care-101 | no | no | no | yes |
| /lawn-care-101/blog | TruGreen Lawn Care Blog \| TruGreen | Get the latest TruGreen expert news, lawn care tips, and sea... | /lawn-care-101/blog | no | no | no | yes |
| /lawn-care-101/faqs | Frequently Asked Questions | Have a lawn care questions, or need answers to your lawn car... | /lawn-care-101/faqs | no | no | no | yes |
| /lawn-care-101/learning-center | Guide to Garden Weeds, Pests, &amp; Diseases \| TruGreen | Get to the root of your lawn care problems—from identifying ... | /lawn-care-101/learning-center | no | no | no | yes |
| /lawn-care-101/learning-center/grasses/brown-patch |  |  |  | no | no | no | no |
| /lawn-care-101/learning-center/search | Search \| TruGreen Learning Center | Search the TruGreen Learning Center for lawn care tips and a... | /lawn-care-101/learning-center/search | no | no | no | yes |
| /local-lawn-care | TruGreen Local Lawn Care Service Company Near Me\| TruGreen | Find your local TruGreen branch for all your lawn care maint... | /local-lawn-care | no | no | no | yes |
| /local-lawn-care/alabama | TruGreen Alabama: Local Lawn Care Service Near Me \| TruGreen | TruGreen lawn care plans provide year-round care specificall... | /local-lawn-care/alabama | no | no | no | yes |
| /myservicesummary | My Service Summary \| TruGreen | View and manage your TruGreen lawn care service summary. | /myservicesummary | no | no | no | yes |
| /my-account/globalError | Error \| TruGreen | TruGreen account error page. | /my-account/globalError | no | no | no | yes |
| /my-account/reset-password | Reset Password \| TruGreen | Reset your TruGreen account password. | /my-account/reset-password | no | no | no | yes |
| /newsroom | Lawn Care Newsroom\| TruGreen | Whether you&#x27;re looking for company information, our lat... | /newsroom | no | no | no | yes |
| /newsroom/executive-staff | TruGreen Executive Team \| TruGreen | Get to know the TruGreen team that is taking residential and... | /newsroom/executive-staff | no | no | no | yes |
| /newsroom/executive-staff/kurt-kane | Kurt Kane: President &amp; CEO \| TruGreen | Kurt Kane joined TruGreen as president and CEO. | /newsroom/executive-staff/kurt-kane | no | no | no | yes |
| /pay-your-bill | Pay Your Bill \| TruGreen | Pay your TruGreen lawn care bill online quickly and securely... | /pay-your-bill | no | no | no | yes |
| /pests-products-and-services | Pest Control Plans: Find the right treatment plan \| TruGreen | Protect your home and yard from unwanted pests. Find the mos... | /pests-products-and-services | no | no | no | yes |
| /products-and-services | Compare Lawn Plans: How much do our services cost? \| TruGreen | Explore TruGreen&#x27;s pricing options and compare lawn car... | /products-and-services | no | no | no | yes |
| /products-and-services/trupro | TruPro: Full service lawn care and complete plan \| TruGreen | Enjoy the greenest, healthiest lawn with our most comprehens... | /products-and-services/trupro | no | no | no | yes |
| /searchResult | Search Results \| TruGreen | Search TruGreen for lawn care tips, services, and resources. | /searchResult | no | no | no | yes |
| /service-terms-and-conditions | Get JSON Data \| TruGreen | Get JSON Data | /service-terms-and-conditions | no | no | no | yes |
| /why-choose-trugreen/testimonials-and-ratings | TruGreen Testimonials &amp; Reviews \| TruGreen | Hear what satisfied consumers say they loved about their Tru... | /why-choose-trugreen/testimonials-and-ratings | no | no | no | yes |

## Broken routes

- **/lawn-care-101/learning-center/grasses/brown-patch** (commit pre-existing)

## Notes

- Title, description, and canonical are read from the first occurrence in the HTML.
- `Title in body?`, `Desc in body?`, and `Canon in body?` indicate whether any of these tags were found inside the `<body>` element rather than `<head>`.
- `Good?` is true only when metadata is in `<head>`, title/description are not homepage defaults, and the canonical matches the route path exactly.
