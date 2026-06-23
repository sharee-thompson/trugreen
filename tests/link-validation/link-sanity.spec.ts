import { expect, request, test, type APIRequestContext } from "@playwright/test";
import { paths } from "../../utils/paths";
import { getBaseUrl } from "../../utils";

test("Sanity Link Validation", async ({ request }) =>{
    for (const path of paths) {
        const url = new URL(getBaseUrl + path).href;

        await test.step(`Validate: ${url}`, async () => {
            const response = await request.get(url, {failOnStatusCode: false});
            await expect.soft(response, `Broken path: ${url}`).toBeOK();
        })
    }
})