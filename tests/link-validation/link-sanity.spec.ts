import { expect, test } from "@playwright/test";
import  paths  from "../../utils/paths";
import { getBaseUrl } from "../../utils";

test(
  "Sanity Link Validation",
  { tag: ["@sanity", "@link-validation", "@links"] },
  async ({ request }) => {
    for (const path of paths) {
      const url = new URL(path, getBaseUrl()).href;

      await test.step(`Validate: ${url}`, async () => {
        const response = await request.get(url, { failOnStatusCode: false });
        await expect.soft(response, `Broken path: ${url}`).toBeOK();
      });
    }
  },
);