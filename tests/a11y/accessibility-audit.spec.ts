// @ts-nocheck
import { test } from "../../utils/axe-fixture";
import paths from "../../utils/axe-paths";
import { getBaseUrl } from "../../utils/config";
import { landingPagePaths } from "../../utils/paths";

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
  for (const path of paths) {
    test(`${path} — accessibility scan @accessibility-audit`, async ({
      page,
      runAxeScan,
    }) => {
      const targetUrl = getBaseUrl(path);
      console.log(`Testing URL: ${targetUrl}`);
      await page.goto(targetUrl, {
        waitUntil: "networkidle",
      });
      const actualUrl = page.url();
      console.log(`Actual URL after navigation: ${actualUrl}`);
      await runAxeScan(page, targetUrl);
    });
  }

  for (const [key, url] of Object.entries(landingPagePaths)) {
    test(`landing-page/${key} — accessibility scan @accessibility-audit`, async ({
      page,
      runAxeScan,
    }) => {
      console.log(`Testing URL: ${url}`);
      await page.goto(url, {
        waitUntil: "networkidle",
      });
      const actualUrl = page.url();
      console.log(`Actual URL after navigation: ${actualUrl}`);
      await runAxeScan(page, url);
    });
  }
});
