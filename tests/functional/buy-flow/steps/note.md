# Buy Flow Notes

## TO DO
Update email address
Should we move the credit card to an ENV resource?

### TODO from Issue 4
Environment Flexibility: It would be helpful if buy-flow-full.spec.ts could run against any environment, similar to buy-flow-e-sanity.spec.ts.

Step Organization: To clarify which steps are for /buy-online-e vs. /buy-online, I recommend organizing the step files into separate folders (e.g., steps-e/ and steps-original/ or similar), rather than renaming every step file. This will make it easier to maintain both flows as they diverge.

Test File Naming: The buy-flow-full.spec.ts file should also clarify in its name and/or description that it is testing /buy-online-e specifically.

Future Structure: As the buy flow grows, it might make sense to separate all buy-flow-e and buy-flow-original functionality into their own directories for clarity and maintainability.

# TODO From Issue 7
Jacob raised concern about my addition of RRAD without an explicit limit of retries for fear of the site interpreting automation as a DDOS.

Most helpful in utils/address.ts - Need to review best practices & set limit. Initially, considering 5, but maybe review number of workers initiated, etc.

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