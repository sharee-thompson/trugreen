import { test } from "@playwright/test";
import { landingPagePaths } from "../../../utils/paths";
import { getLandingPageUrl } from "../../../utils/config";
import {
  expectComponentsVisible,
  medComponents,
  loadLandingPage,
} from "../../../utils/landing-page-components";

test.describe(
  "Test Case 80849:Medium Intent",
  { tag: ["@deep", "@landing-pages", "@functional"] },
  () => {
    test("Medium Intent - required components", async ({ page }) => {
      await loadLandingPage(page, getLandingPageUrl(landingPagePaths.medium));
      await expectComponentsVisible(page, medComponents);
    });
  },
);
