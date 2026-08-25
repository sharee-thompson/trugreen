import { getBaseUrl } from "./index";

export const visualPaths = {
  home: "/",
  payYourBill: "/pay-your-bill",
  products: "/products-and-services",
  blogApp:
    "/lawn-care-101/blog/trugreen-lawn-care-services/trugreen-lawn-care-app",
  // run the following locally but not in CI/CD due to storage limitations
  customerSupport: "/customer-support",
  lawnCare101: "/lawn-care-101",
  trupro: "/products-and-services/trupro",
  trucore: "/products-and-services/trucore",
  naturalLawnCare: "/products-and-services/natural-lawn-care",
  trubasic: "/products-and-services/trubasic",
  lawnFertilization: "/products-and-services/lawn-fertilization",
  lawnStressGuard: "/products-and-services/lawn-stress-guard",
  weedControl: "/products-and-services/weed-control",
  aeration: "/products-and-services/aeration",
  grubControl: "/products-and-services/grub-control",
  soilAnalysis: "/products-and-services/ph-and-soil-analysis",
  lawnDisease: "/products-and-services/lawn-disease",
  testimonialsRatings: "/why-choose-trugreen/testimonials-and-ratings",
  branchChattanooga: "/local-lawn-care/tennessee/chattanooga",
  branchLeesSummit: "/local-lawn-care/missouri/lees-summit",
  branchSacramento: "/local-lawn-care/california/sacramento",
  aboutUs: "/newsroom/executive-staff#about",
  terms: "/about/terms",
  privacyPolicy: "/about/privacy-policy",
  fags: "/lawn-care-101/faqs",
  login: "/my-account/login",
  registration: "/my-account/registration",
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
