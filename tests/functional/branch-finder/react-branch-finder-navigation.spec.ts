import { test } from "@playwright/test";
import { getBaseUrl } from "../../../utils/config";
import {
  expectPersistedZip,
  expectZipInNewTab,
  REACT_HEADER_SELECTORS,
  submitZip,
} from "./branch-finder-helpers";

const TEST_ZIP = "38119";
const TEST_BRANCH_PATH = "/local-lawn-care/tennessee/memphis";
const UPDATED_ZIP = "90210";
const UPDATED_BRANCH_PATH = "/local-lawn-care/california/irwindale";

// The app source is not part of this test repository. CI may provide its full
// app-route inventory through REACT_BRANCH_FINDER_ROUTES; these representative
// React routes retain coverage when that inventory is not set.
const DEFAULT_REACT_ROUTES = [
  "/",
  "/products-and-services/weed-control",
  "/lawn-care-101/learning-center/lawn-diseases/brown-patch",
];

const reactRoutes = (
  process.env.REACT_BRANCH_FINDER_ROUTES?.split(",") ?? DEFAULT_REACT_ROUTES
)
  .map((route) => route.trim())
  .filter(Boolean);

test.use({ viewport: { width: 1400, height: 900 } });

test.describe(
  "React header branch finder navigation",
  { tag: "@branch-finder-react" },
  () => {
    test.beforeEach(async ({ context }) => {
      await context.clearCookies();
    });

    for (const route of reactRoutes) {
      test(`search button routes from ${route} to its local branch`, async ({
        page,
      }) => {
        await page.goto(getBaseUrl(route), { waitUntil: "domcontentloaded" });
        await submitZip(
          page,
          REACT_HEADER_SELECTORS,
          TEST_ZIP,
          TEST_BRANCH_PATH,
          "click",
        );
      });
    }

    test("Enter routes, displays the ZIP, and persists it in a new tab", async ({
      page,
      context,
    }) => {
      await page.goto(getBaseUrl(DEFAULT_REACT_ROUTES[0]), {
        waitUntil: "domcontentloaded",
      });
      await submitZip(
        page,
        REACT_HEADER_SELECTORS,
        TEST_ZIP,
        TEST_BRANCH_PATH,
        "enter",
      );
      await expectPersistedZip(page, REACT_HEADER_SELECTORS, TEST_ZIP);
      await expectZipInNewTab(
        context,
        getBaseUrl(DEFAULT_REACT_ROUTES[0]),
        REACT_HEADER_SELECTORS,
        TEST_ZIP,
      );
    });

    test("updating the ZIP routes to the updated local branch", async ({
      page,
    }) => {
      await page.goto(getBaseUrl(DEFAULT_REACT_ROUTES[0]), {
        waitUntil: "domcontentloaded",
      });
      await submitZip(
        page,
        REACT_HEADER_SELECTORS,
        TEST_ZIP,
        TEST_BRANCH_PATH,
        "click",
      );
      await submitZip(
        page,
        REACT_HEADER_SELECTORS,
        UPDATED_ZIP,
        UPDATED_BRANCH_PATH,
        "click",
      );
      await expectPersistedZip(page, REACT_HEADER_SELECTORS, UPDATED_ZIP);
    });
  },
);
