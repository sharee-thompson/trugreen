import { getBaseUrl } from "./index";
const paths = [
  "/",
  "/lawn-care-101",
  "/lawn-care-101/faqs",
  "/customer-support",
  "/pay-your-bill",
  "/local-lawn-care",
  "/service-terms-and-conditions",
  "/products-and-services",
  "/products-and-services/trushrub-tree-and-shrub-care",
  "/pests-products-and-services",
  "/why-choose-trugreen",
  "/why-choose-trugreen/testimonials-and-ratings",
];

export default paths;

export const landingPagePaths = {
  high: "/b/ppc/landing-page",
  medium: "/nb/ppc/landing-page",
  low: "/ppc/landing-page",
} as const;

export const storybookLandingPagePaths = {
  // Storybook examples stay absolute since they are hosted externally.
  sbHigh:
    "https://tru-g-2025.netlify.app/iframe.html?id=pages-landing-page-high-intent--default&viewMode=story",
  sbMedium:
    "https://tru-g-2025.netlify.app/iframe.html?id=pages-landing-page-mid-intent--default&viewMode=story",
  sbLow:
    "https://tru-g-2025.netlify.app/iframe.html?id=pages-landing-page-low-intent--default&viewMode=story",
} as const;

export const legacyLandingPagePaths = {
  legacyHigh: getBaseUrl + "/b/ppc/trugreen-lawn-care",
  legacyMedium: getBaseUrl + "/nb/ppc/lawn-care-service",
  //I included the provided examples, but we can finetune this list
  legacyLowSocial: getBaseUrl + "/fb/lawn",
  legacyLowCampaign: getBaseUrl + "/yt",
  legacyLowDirectMail: getBaseUrl + "/dm/vp/spring1",
  legacyLowPromo: getBaseUrl + "/fb/lawn-promo",
} as const;
