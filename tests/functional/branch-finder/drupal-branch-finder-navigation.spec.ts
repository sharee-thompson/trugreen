import { test } from "@playwright/test";
import { getBaseUrl } from "../../../utils/config";
import {
  DRUPAL_HEADER_SELECTORS,
  expectPersistedZip,
  expectZipInNewTab,
  submitZip,
} from "./branch-finder-helpers";

const TEST_ZIP = "38119";
const TEST_BRANCH_PATH = "/local-lawn-care/tennessee/memphis";
const UPDATED_ZIP = "90210";
const UPDATED_BRANCH_PATH = "/local-lawn-care/california/irwindale";

const DRUPAL_ROUTES = [
  "/lawn-care-101/blog/lawn-care-tips/5-spooky-facts-about-your-lawn",
  "/lawn-care-101/blog/lawn-care-tips/allergy-proofing-your-lawn",
  "/lawn-care-101/blog/lawn-care-tips/benefits-of-overseeding-a-lawn",
  "/lawn-care-101/blog/lawn-care-tips/best-methods-for-broadleaf-weed-control",
  "/lawn-care-101/blog/lawn-care-tips/best-way-to-get-green-grass",
  "/lawn-care-101/blog/trugreen-lawn-care-services/benefits-of-a-lawn-fertilizer-service",
  "/lawn-care-101/blog/diy-and-curb-appeal-tips/20-ways-to-soak-up-the-last-of-summer",
  "/lawn-care-101/blog/trugreen-community-and-partnerships/20-ways-to-unplug-and-unwind",
  "/lawn-care-101/blog/pest-control-and-mosquito-defense/3-summer-lawn-pests-to-avoid-trugreen",
  "/lawn-care-101/blog/tree-and-shrub-care/7-ways-to-care-for-your-trees-this-spring",
  "/lawn-care-101/blog/trugreen-company/2015-by-the-numbers",
  "/lawn-care-101/blog/aeration-service/benefits-of-spring-aeration-trugreen",
  "/lawn-care-101/blog/lawn-care/atlanta-lawn-care",
  "/lawn-care-101/blog/beyond-lawn/does-grass-produce-oxygen",
  "/lawn-care-101/blog/lawn-damage/get-rid-mushrooms-lawn",
  "/lawn-care-101/blog/contests-and-sweepstakes/contest-share-your-fourth-of-july-memories",
  "/lawn-care-101/blog/lifestyle/bloomin%E2%80%99-spring-printables-trugreen",
  "/lawn-care-101/blog/diy/how-aerate-your-lawn",
  "/lawn-care-101/learning-center/broadleaf-weeds",
  "/lawn-care-101/learning-center/grass-basics/dig-deeper/4-stages-of-drought-stress",
  "/lawn-care-101/learning-center/turf-grasses/dig-deeper/benefits-of-turf-grass",
  "/lawn-care-101/learning-center/grassy-weeds/dig-deeper/difference-between-grass-and-sedge",
  "/lawn-care-101/lawn-care-guides/complete-lawn-aeration-guide-when%2C-how%2C-best-time",
  "/lawn-care-101/lawn-care-guides/complete-lawn-fungus-guide",
  "/lawn-care-101/lawn-care-guides/overseeding-lawn-care-guide",
  "/satellite/local-lawn-care/texas/odessa",
  "/satellite/local-lawn-care/colorado/loveland",
  "/satellite/local-lawn-care/new-hampshire/londonderry",
  "/newsroom/executive-staff/kurt-kane",
  "/newsroom/executive-staff/kevin-mann",
  "/newsroom/executive-staff/ben-dunham",
  "/newsroom/executive-staff/ayman-taha",
  "/newsroom/executive-staff/bill-hausbeck",
  "/military-discount",
  "/why-choose-trugreen/experience-and-expertise",
  "/about/sms-privacy-policy",
  "/testimonials",
  "/rewards",
  "/rewards/activity",
  "/referafriend",
  "/loyalty/fall1/terms-and-conditions",
  "/loyalty/fall2/terms-and-conditions",
  "/giveaway-terms-and-conditions",
  "/spring-terms-conditions",
  "/monthlypay-terms-conditions",
];

test.use({ viewport: { width: 1400, height: 900 } });

test.describe(
  "Drupal header branch finder navigation",
  { tag: "@branch-finder-drupal" },
  () => {
    test.beforeEach(async ({ context }) => {
      await context.clearCookies();
    });

    for (const route of DRUPAL_ROUTES) {
      test(`search button routes from ${route} to its local branch`, async ({
        page,
      }) => {
        await page.goto(getBaseUrl(route), { waitUntil: "domcontentloaded" });
        await submitZip(
          page,
          DRUPAL_HEADER_SELECTORS,
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
      await page.goto(getBaseUrl(DRUPAL_ROUTES[0]), {
        waitUntil: "domcontentloaded",
      });
      await submitZip(
        page,
        DRUPAL_HEADER_SELECTORS,
        TEST_ZIP,
        TEST_BRANCH_PATH,
        "enter",
      );
      await expectPersistedZip(page, DRUPAL_HEADER_SELECTORS, TEST_ZIP);
      await expectZipInNewTab(
        context,
        getBaseUrl(DRUPAL_ROUTES[0]),
        DRUPAL_HEADER_SELECTORS,
        TEST_ZIP,
      );
    });

    test("updating the ZIP routes to the updated local branch", async ({
      page,
    }) => {
      await page.goto(getBaseUrl(DRUPAL_ROUTES[0]), {
        waitUntil: "domcontentloaded",
      });
      await submitZip(
        page,
        DRUPAL_HEADER_SELECTORS,
        TEST_ZIP,
        TEST_BRANCH_PATH,
        "click",
      );
      await submitZip(
        page,
        DRUPAL_HEADER_SELECTORS,
        UPDATED_ZIP,
        UPDATED_BRANCH_PATH,
        "click",
      );
      await expectPersistedZip(page, DRUPAL_HEADER_SELECTORS, UPDATED_ZIP);
    });
  },
);
