import { test, expect } from "@playwright/test";
import { landingPagePaths } from "../../../utils/paths";
import { getLandingPageUrl } from "../../../utils/config";
import {
  components,
  highComponents,
  resolve
} from "../../../utils/landing-page-components";

  test.describe(
    "Test Case 80847: High Intent",
    { tag: ["@deep", "@landing-pages"] },
    () => {
      for (const comp of highComponents) {
        test(`High Intent - ${comp}`, async ({ page }) => {
          
          const url = getLandingPageUrl(landingPagePaths.high)
          await page.goto(url);
          await expect(resolve(page, components[comp])).toBeVisible();
        });
      }
    },
  );
