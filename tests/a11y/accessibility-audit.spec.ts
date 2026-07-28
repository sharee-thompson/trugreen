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
    }, testInfo) => {
      const targetUrl = getBaseUrl(path);
      console.log(`Testing URL: ${targetUrl}`);
      await page.goto(targetUrl, {
        waitUntil: "domcontentloaded",
        timeout: 75000,
      });
      await expect(page.locator("body")).toBeVisible({ timeout: 15000 });

      if (testInfo.project.name === "iPhone Safari") {
        await expect
          .poll(async () => page.title(), {
            timeout: 25000,
            message: `Page title stayed in a loading state for ${targetUrl}`,
          })
          .not.toMatch(/^\s*Loading\b/i);

        const readinessChecks = [
          page.locator("main").first(),
          page.locator("footer").first(),
          page.locator('a[href*="privacy-policy"]').first(),
        ];

        let ready = false;
        for (const locator of readinessChecks) {
          if ((await locator.count()) > 0 && (await locator.isVisible())) {
            ready = true;
            break;
          }
        }

        expect(
          ready,
          `No stable landmark was visible before scanning ${targetUrl}`,
        ).toBeTruthy();
      }

      const primaryHeading = page.getByRole("heading", { level: 1 }).first();
      if ((await primaryHeading.count()) > 0) {
        const headingVisible = await primaryHeading.isVisible();
        if (!headingVisible) {
          console.warn(`Primary heading found but not visible: ${targetUrl}`);
        }
      } else {
        console.warn(`No level-1 heading found: ${targetUrl}`);
      }

      const actualUrl = page.url();
      console.log(`Actual URL after navigation: ${actualUrl}`);
      await runAxeScan(page, targetUrl);
    });
  }
});
