# TTFB Comparison: Before vs After `htmlLimitedBots: /.*/`

**Before:** http://localhost:3000
**After:** http://localhost:3001
**Date:** 2026-08-20
**Samples per route:** 3

## Summary

- **Routes tested:** 28
- **Routes with both before and after measurements:** 27
- **Average TTFB before:** 433.5 ms
- **Average TTFB after:** 1081.4 ms
- **Average delta:** +647.9 ms
- **Average change:** +149.5%

## Results

| Route | Before (ms) | After (ms) | Delta (ms) | Change (%) |
|---|---|---|---|---|
| /about/california-privacy-policy | 262.2 | 1568.3 | +1306.1 | +498.1% |
| /about/privacy-policy | 335.2 | 1554.9 | +1219.7 | +363.8% |
| /about/sms-terms | 228.3 | 1410.3 | +1182.0 | +517.7% |
| /about/terms | 337.0 | 1697.3 | +1360.3 | +403.7% |
| /aftercare | 4927.9 | 4817.4 | -110.5 | -2.2% |
| /appointment-scheduler | 125.6 | 125.6 | +0.1 | +0.1% |
| /customer-support | 254.7 | 247.4 | -7.3 | -2.9% |
| /lawn-care-101 | 284.6 | 2149.7 | +1865.1 | +655.3% |
| /lawn-care-101/blog | 512.4 | 2424.6 | +1912.2 | +373.2% |
| /lawn-care-101/faqs | 186.1 | 191.1 | +5.1 | +2.7% |
| /lawn-care-101/learning-center | 386.8 | 2198.5 | +1811.7 | +468.4% |
| /lawn-care-101/learning-center/grasses/brown-patch | 232.1 | N/A | N/A | N/A |
| /lawn-care-101/learning-center/search | 142.8 | 143.1 | +0.3 | +0.2% |
| /local-lawn-care | 163.6 | 182.4 | +18.8 | +11.5% |
| /local-lawn-care/alabama | 210.6 | 208.7 | -1.8 | -0.9% |
| /myservicesummary | 142.2 | 161.1 | +18.9 | +13.3% |
| /my-account/globalError | 143.0 | 147.3 | +4.3 | +3.0% |
| /my-account/reset-password | 141.3 | 141.5 | +0.2 | +0.1% |
| /newsroom | 497.5 | 713.1 | +215.6 | +43.3% |
| /newsroom/executive-staff | 388.6 | 1911.9 | +1523.3 | +392.0% |
| /newsroom/executive-staff/kurt-kane | 347.9 | 3717.5 | +3369.5 | +968.4% |
| /pay-your-bill | 138.7 | 181.8 | +43.1 | +31.1% |
| /pests-products-and-services | 254.3 | 238.0 | -16.3 | -6.4% |
| /products-and-services | 295.6 | 346.2 | +50.6 | +17.1% |
| /products-and-services/trupro | 308.2 | 248.9 | -59.4 | -19.3% |
| /searchResult | 149.1 | 139.3 | -9.8 | -6.6% |
| /service-terms-and-conditions | 345.9 | 2074.5 | +1728.6 | +499.8% |
| /why-choose-trugreen/testimonials-and-ratings | 394.7 | 257.7 | -137.0 | -34.7% |

## Notes

- TTFB is measured as the time from `fetch()` start until response headers and initial body are received.
- Each route is sampled multiple times; the reported value is the median.
- `Cache-Control: no-cache, no-store` is sent to avoid cached responses.
- `N/A` means the request failed or returned a non-2xx response.
