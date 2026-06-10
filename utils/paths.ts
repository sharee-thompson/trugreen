import { getBaseUrl } from "./config";

const paths = [
  "/",
  "/lawn-care-101",
  "/customer-support",
  // "/products-and-services",
  // "/why-choose-trugreen/testimonials-and-ratings"
];

export default paths;

export const landingPagePaths = {
  high: getBaseUrl + "/b/ppc/landing-page",
  med: getBaseUrl + "/nb/ppc/landing-page",
  low: getBaseUrl + "/ppc/landing-page",
  legacyHigh: getBaseUrl + "/b/ppc/trugreen-lawn-care",
  legacyMedium: getBaseUrl + "/nb/ppc/lawn-care-service",
  //I included the provided examples, but we can finetune this list
  legacyLowSocial: getBaseUrl + "/fb/lawn",
  legacyLowCampaign: getBaseUrl + "/yt",
  legacyLowDirectMail: getBaseUrl + "dm/vp/spring1",
  legacyLowPromo: getBaseUrl + "/fb/lawn-promo",

  storybookHigh:
    "https://tru-g-2025.netlify.app/iframe.html?id=pages-landing-page-high-intent--default&viewMode=story",
  storybookMedium:
    "https://tru-g-2025.netlify.app/iframe.html?id=pages-landing-page-mid-intent--default&viewMode=story",
  storybookLow:
    "https://tru-g-2025.netlify.app/iframe.html?id=pages-landing-page-low-intent--default&viewMode=story",
} as const;
