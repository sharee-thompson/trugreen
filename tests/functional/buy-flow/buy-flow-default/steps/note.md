# Buy Flow Notes

## TO DO
Update email address
Should we move the credit card to an ENV resource?

## Overview
I wanted to split the longer test out so it was more maintainable & so we could run each step alone, which is feasible since each step has it's own url with exceptions:
1. Step 1 'buy-online-e'
2. Step 2 + '/lawnmeasurement'
    - Can add validation of address persistence
    - Needs it's own test
3. Step 3 + '/yourquote'
4. Step 4 + '/paymentDetails'
    a. Select Payment Option
    b. Contact Info
        - Can add validation of address persistence
        - Email should also persist
        - Can add error message validation, ie, invalid phone number
    c. Credit Card
        - Can add error message validation
    d. Review Order        

Each individual test OR the full test itself would require running through the full flow, however, so at least for now, this is how it's going to run:

```
tests/functional/buy-flow/
├── steps/
│   ├── step1-address.ts
│   ├── step2-plan-selection.ts
│   ├── step3-payment-option.ts
│   ├── step4-contact-info.ts
│   ├── step5-credit-card.ts
│   └── step6-review.ts
├── buy-flow-full.spec.ts
```

It's not how I like because it's too POM for Playwright. JZ