// @ts-nocheck
import { expect, test } from "../../utils/axe-fixture";
import paths from "../../utils/axe-paths";
import { getBaseUrl } from "../../utils/config";

/* 
To clear old reports:
rm -rf accessibility-reports

To run this test file only:
npx playwright test -g @accessibility-audit

After running the tests, generate an index.html file by running this script:
node scripts/build-axe-index.js

Open the file with:
open accessibility-reports/axe-html/index.html

To generate a report by common issues run:
node scripts/build-axe-common-issues.js

Open the file with:
open accessibility-reports/axe-grouped/common-issues-prod.html
*/

test.describe("Accessibility Scans", () => {
  // Keep this suite resilient to slower page loads without changing global timeouts.
  test.setTimeout(90000);

  for (const path of paths) {
    test(`${path} — accessibility scan @accessibility-audit`, async ({
      page,
      runAxeScan,
    }) => {
      const targetUrl = getBaseUrl(path);
      console.log(`Testing URL: ${targetUrl}`);
      await page.goto(targetUrl, {
        waitUntil: "domcontentloaded",
      });
      await expect(
        page.getByRole("heading", { level: 1 }).first(),
      ).toBeVisible();
      const actualUrl = page.url();
      console.log(`Actual URL after navigation: ${actualUrl}`);
      await runAxeScan(page, targetUrl);
    });
  }
});
