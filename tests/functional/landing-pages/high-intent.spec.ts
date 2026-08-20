import { test } from "@playwright/test";
import { landingPagePaths } from "../../../utils/paths";
import { getLandingPageUrl } from "../../../utils/config";
import {
  expectComponentsVisible,
  highComponents,
  loadLandingPage,
} from "../../../utils/landing-page-components";

test.describe(
  "Test Case 80847: High Intent",
  { tag: ["@deep", "@landing-pages", "@functional"] },
  () => {
    test("High Intent - required components", async ({ page }) => {
      await loadLandingPage(page, getLandingPageUrl(landingPagePaths.high));
      await expectComponentsVisible(page, highComponents);
    });
  },
);
