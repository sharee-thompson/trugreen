import { test, expect } from "@playwright/test";
import { landingPagePaths } from "../../../utils/paths";
import { getLandingPageUrl } from "../../../utils/config";
import {
  components,
  highComponents,
  resolve,
} from "../../../utils/landing-page-components";
import { selectorsToRemove, removeElementIfExists, closeCookieBanner } from "../../../utils";

test.describe(
  "Test Case 80847: High Intent",
  { tag: ["@deep", "@landing-pages", "@functional"] },
  () => {
    for (const comp of highComponents) {
      test(`High Intent - ${comp}`, async ({ page }) => {
        const url = getLandingPageUrl(landingPagePaths.high);
        await page.goto(url);
        await closeCookieBanner(page);
        await page
          .getByText("Questions? Quote, Call or Chat Now.", { exact: true })
          .locator("..")
          .evaluate((el) => el.remove());

        await expect(resolve(page, components[comp])).toBeVisible();
      });
    }
  },
);
