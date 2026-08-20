import { test } from "@playwright/test";
import { landingPagePaths } from "../../../utils/paths";
import { getLandingPageUrl } from "../../../utils/config";
import {
  expectComponentsVisible,
  lowComponents,
  loadLandingPage,
} from "../../../utils/landing-page-components";

test.describe(
  "Test Case 80848: Low Intent",
  { tag: ["@deep", "@landing-pages", "@functional"] },
  () => {
    test("Low Intent - required components", async ({ page }) => {
      await loadLandingPage(page, getLandingPageUrl(landingPagePaths.low));
      await expectComponentsVisible(page, lowComponents);
    });
  },
);
