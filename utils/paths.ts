import { getBaseUrl } from "./index";
const paths = [
  "/",
  "/lawn-care-101",
  "/customer-support",
  // "/products-and-services",
  // "/why-choose-trugreen/testimonials-and-ratings"
];

export default paths;

export const landingPagePaths = {
  //high: getBaseUrl + "/b/ppc/landing-page",
  high: "https://dev-trugreen.com/b/ppc/landing-page",
  //medium: getBaseUrl + "/nb/ppc/landing-page",
  medium: "https://dev-trugreen.com/nb/ppc/landing-page",
  //low: getBaseUrl + "/ppc/landing-page",
  low: "https://dev-trugreen.com/ppc/landing-page",

  //Storybook Examples
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
  legacyLowDirectMail: getBaseUrl + "dm/vp/spring1",
  legacyLowPromo: getBaseUrl + "/fb/lawn-promo",
  
} as const;
