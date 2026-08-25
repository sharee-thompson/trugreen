import { getBaseUrl } from "./index";

export const visualPaths = {
  home: "/",
  payYourBill: "/pay-your-bill",
  products: "/products-and-services",
  blogApp:
    "/lawn-care-101/blog/trugreen-lawn-care-services/trugreen-lawn-care-app",
  customerSupport: "/customer-support",
  lawnCare101: "/lawn-care-101",

  // Product detail coverage: keep a small representative set.
  trupro: "/products-and-services/trupro",
  trubasic: "/products-and-services/trubasic",
  aeration: "/products-and-services/aeration",

  // One representative local branch page.
  branchLeesSummit: "/local-lawn-care/missouri/lees-summit",

  // One long-form legal page.
  aboutUs: "/newsroom/executive-staff#about",
  privacyPolicy: "/about/privacy-policy",

  // One account page and one content landing page.
  login: "/my-account/login",
  registration: "/my-account/registration",
  blogLanding: "/lawn-care-101/blog",
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
