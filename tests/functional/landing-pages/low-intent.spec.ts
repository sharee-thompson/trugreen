import { test, expect } from "@playwright/test";
import { landingPagePaths } from "../../../utils/paths";
import { getLandingPageUrl } from "../../../utils/config";
import {
  components,
  lowComponents,
  resolve,
} from "../../../utils/landing-page-components";

test.describe(
  "Test Case 80848: Low Intent",
  { tag: ["@deep", "@landing-pages", "@functional"] },
  () => {
    for (const comp of lowComponents) {
      test(`Low Intent - ${comp}`, async ({ page }) => {
        const url = getLandingPageUrl(landingPagePaths.low);
        await page.goto(url);
        await expect(resolve(page, components[comp])).toBeVisible();
      });
    }
  },
);
