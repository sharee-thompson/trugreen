import { test, expect } from "@playwright/test";

test.describe('Full E Buy Flow Test for Rando Address Generation', () => {
    test('Step 1', { tag: '@step1' }, async ({ page }) => {
        //
    });

    test("Step 2", { tag: "@step1" }, async ({ page }) => {
      //
    });
});

/*

await page.goto('https://qa-trugreen.com/buy-online-e');
await page.getByRole('searchbox', { name: 'Enter your home address' }).click();
await page.getByRole('searchbox', { name: 'Enter your home address' }).fill('5621 foxr');
await page.getByRole('searchbox', { name: 'Enter your home address' }).press('ArrowDown');
await page.getByRole('searchbox', { name: 'Enter your home address' }).press('Enter');
await page.getByRole('searchbox', { name: 'Enter your home address' }).press('Tab');
await page.locator('#svcEmail').fill('cheeseburger@burger.com');
await page.getByRole('button', { name: 'Next' }).click();

await page.getByRole('button', { name: 'Build My Plan' }).click();
await page.getByText('Select TruBasic℠').click();
await page.getByRole('button', { name: 'Select & Continue' }).click();

await page.getByRole('radio', { name: 'Pay Later', exact: true }).click();
await page.getByRole('button', { name: 'Continue to Payment' }).click();

await page.getByRole('textbox', { name: 'First Name' }).click();
await page.getByRole('textbox', { name: 'First Name' }).fill('Test paymentDetails');
await page.getByRole('textbox', { name: 'First Name' }).press('Tab');
await page.getByRole('textbox', { name: 'Last Name' }).fill('AddressPerisists');
await page.getByRole('textbox', { name: 'Phone Number Phone* Phone*' }).click();

//Negative assertion
await page.getByRole('textbox', { name: 'Phone Number Phone* Phone*' }).fill('(913)-100-1234');
await page.locator('#choose-payment-opt').getByRole('button', { name: 'Continue' }).click();
await page.getByRole('textbox', { name: 'Phone Number Phone* Phone*' }).click();
await page.locator('#choose-payment-opt').getByText('Invalid Phone Number').click();

await page.getByRole('textbox', { name: 'Phone Number Phone* Phone*' }).click();
await page.getByRole('textbox', { name: 'Phone Number Phone* Phone*' }).fill('(913)-285-5730');
await page.getByRole('textbox', { name: 'Phone Number Phone* Phone*' }).press('Tab');
await page.locator('#choose-payment-opt').getByRole('button', { name: 'Continue' }).click();

await page.locator('#paymetric').contentFrame().getByRole('textbox', { name: 'Cardholder Name' }).click();
await page.locator('#paymetric').contentFrame().getByRole('textbox', { name: 'Cardholder Name' }).fill('Test Credit Card Field');

//Negative assertion
await page.locator('#paymetric').contentFrame().getByRole('textbox', { name: 'Card Number' }).fill('8888888888888888');
await page.locator('#paymetric').contentFrame().getByRole('textbox', { name: 'Card Number' }).press('Tab');

await page.locator('#paymetric').contentFrame().getByRole('textbox', { name: 'Card Number' }).fill('4111111111111111');
await page.locator('#paymetric').contentFrame().getByRole('textbox', { name: 'Card Number' }).press('Tab');
await page.locator('#paymetric').contentFrame().getByLabel('Expiration Month').press('ArrowDown');
await page.locator('#paymetric').contentFrame().getByLabel('Expiration Month').selectOption('1');
await page.locator('#paymetric').contentFrame().getByLabel('Expiration Month').press('Tab');
await page.locator('#paymetric').contentFrame().getByLabel('Expiration Year').press('ArrowDown');
await page.locator('#paymetric').contentFrame().getByLabel('Expiration Year').selectOption('2028');
await page.getByRole('button', { name: 'Continue' }).nth(1).click();

await page.getByText('Review Your Order').click();
await page.getByText('Subtotal').click();
await page.getByText('Taxes').click();
await page.getByText('Due Today').click();*/