import { test, expect } from "@playwright/test";
import { landingPagePaths } from "../../../utils/paths";
import { getLandingPageUrl } from "../../../utils/config";
import {
  components,
  medComponents,
  resolve
} from "../../../utils/landing-page-components";

  test.describe(
    "Test Case 80849:Medium Intent",
    { tag: ["@deep", "@landing-pages"] },
    () => {
      for (const comp of medComponents) {
        test(`Medium Intent - ${comp}`, async ({ page }) => {
          const url = getLandingPageUrl(landingPagePaths.medium)
          await page.goto(url);
          await expect(resolve(page, components[comp])).toBeVisible();
        });
      }
    },
  );
