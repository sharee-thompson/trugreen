import { getBaseUrl } from "./index";
const paths = [
  "/",
  "/lawn-care-101",
  "/lawn-care-101/faqs",
  "/lawn-care-101/lawn-care-guides",
  "/lawn-care-101/learning-center",
  "/lawn-care-101/blog",
  "/customer-support",
  "/pay-your-bill",
  "/local-lawn-care",
  "/service-terms-and-conditions",
  "/products-and-services",
  "/products-and-services/trushrub-tree-and-shrub-care",
  "/pests-products-and-services",
  "/why-choose-trugreen",
  "/why-choose-trugreen/testimonials-and-ratings",
  "/app",
  "/newsroom/executive-staff",
  "/about"
];

export default paths;

export const visualDrupalPaths = {
  locationsStateListingPage: "/local-lawn-care/texas",
  branchLocalService: "/local-lawn-care/texas/sugar-land/lawn-care",
  products: "/products-and-services",
  pests: "/pests-products-and-services",
} as const;

export const visualNextPaths = {
  home: "/",
  support: "/customer-support",
  terms: "/service-terms-and-conditions",
  expertise: "/why-choose-trugreen/experience-and-expertise",
} as const;


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
