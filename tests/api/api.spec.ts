import { test, expect } from "@playwright/test";

test.describe("TruGreen API Integration @api", () => {
  test("GetBranchDetails returns branch data for a valid ZIP code", async ({
    request,
  }) => {
    const postcode = "37210";

    console.log(`Requesting branch details for postcode: ${postcode}`);

    const response = await request.get(
      `https://api.trugreen.com/user/cms/content/GetBranchDetails?postcode=${postcode}`,
    );

    const status = response.status();
    console.log(`Response status: ${status}`);
    expect(status).toBeLessThan(400);

    const responseBody = await response.json();
    console.log(`Response body:`, JSON.stringify(responseBody, null, 2));

    expect(responseBody).toBeDefined();
    console.log(`Branch details returned successfully`);
  });
});
