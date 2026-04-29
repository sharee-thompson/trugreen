import { test, expect } from "@playwright/test";
import { getBaseUrl } from "../../utils/config";

test.describe("TruGreen API Integration @api", () => {
  test("storeaddressdata API persists address data successfully", async ({
    request,
  }) => {
    const payload = {
      email: "test@example.com",
      address: "123 Main St",
      city: "Denver",
      state: "CO",
      zipcode: "80202",
      pageContext: "buy-online",
      page_title: "Buy Online - Get Your Lawn Measurement",
      page_url: "https://www.trugreen.com/buy-online/lawnmeasurement",
    };

    console.log(`Sending storeaddressdata request with payload:`, payload);

    const response = await request.post(
      "https://api.trugreen.com/user/cms/content/storeaddressdata",
      {
        data: payload,
      },
    );

    const status = response.status();
    console.log(`Response status: ${status}`);

    const responseBody = await response.json();
    console.log(`Response body:`, JSON.stringify(responseBody, null, 2));

    expect(status).toBeLessThan(400);
    console.log(`Address data persisted successfully`);
  });
});
