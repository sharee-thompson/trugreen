//Components list for Landing Page Tests
import type { Page, Locator } from "@playwright/test";

//List of all components is now in Confluence: https://confluence.uhub.biz/display/VYRNATRG/Landing+Pages+-+Required+Components

//Any locators that require an alternate strategy will be listed up here

//Hero CTAs
export const heroCtaBase = (page: Page) =>
  page.locator(".landingPageHero_ctaWrapper__JgtSm");

export const heroCtaToLeadForm = (page: Page) =>
  heroCtaBase(page).getByRole("button").getByText("Get a Free Quote");

export const heroCtaToCall = (page: Page) =>
  heroCtaBase(page).getByRole("button").getByText("Talk To A Pro");

export const heroCtaToEcomm = (page: Page) =>
  heroCtaBase(page).getByRole("link").getByText("Check Online Pricing");

//Sections
export const sectionSeeTheDifference = (page: Page) =>
  page.locator("section").filter({ hasText: "See the TruGreen Difference." });

export const sectionClearChoice = (page: Page) =>
  page
    .locator("section")
    .filter({ hasText: "The clear choice for a great looking lawn." });

export const sectionHowItWorks = (page: Page) =>
  page.locator("section").filter({ hasText: "How It Works" });

export const sectionQuestions = (page: Page) =>
  page.locator("section").filter({ hasText: "Questions?" });

//Ribbons & Their Components

export const ctaRibbon = (page: Page) => page.locator("#cta-ribbon");

export const ctaRibbonGetQuote = (page: Page) =>
  ctaRibbon(page).getByRole("button").getByText("Get a Free Quote");

export const ctaRibbonButtonEcomm = (page: Page) =>
  ctaRibbon(page).getByRole("button").getByText("Check Online Pricing");

export const ctaRibbonCallButton = (page: Page) =>
  ctaRibbon(page).getByRole("button").getByText("Talk To A Pro");

export const ribbonGuaranteeIcon = (page: Page) =>
  page
    .locator("#guarantee-ribbon")
    .getByRole("img", { name: "Satisfaction Guarantee" });

export const logoInRibbonOne = (page: Page) =>
  page.locator("img").getByAltText("Satisfaction Guarantee");
export const logoInRibbonTwo = (page: Page) =>
  page.locator("img").getByAltText("200 Million Customers Nationwide");
export const logoInRibbonThree = (page: Page) =>
  page.locator("img").getByAltText("America's No. 1 Lawn Care Company");

//FAQ
export const faqDrawer = (page: Page) =>
  page.locator(".faqs_item__0sj26").first();
export const faqQuestion = (page: Page) =>
  page.locator(".faqs_questionText__tqydV").first();
export const faqAnswer = (page: Page) =>
  page.locator(".faqs_answer__WE5Po").first();

export const components = {
  //Requirements in Common
  nav: ".landingPageHeader_container__JNUbK",
  navLogo: ".landingPageHeader_logo__jfr9b",
  hero: ".landingPageHero_heroSection__yEE4B",
  heroCtaBase,
  sectionSeeTheDifference,
  nonVideoCardWrapper: ".beforeAfterCard_container__re_Y3",
  //cardBeforeAfter: ".beforeAfterCard_card__egO_V",
  cardBeforeAfterOne: ".beforeAfterCard_card__egO_V:nth-child(1)",
  cardBeforeAfterTwo: ".beforeAfterCard_card__egO_V:nth-child(2)",
  cardBeforeAfterThree: ".beforeAfterCard_card__egO_V:nth-child(3)",
  leadFormInPage: ".leadForm_form__owt7P",
  preFooter: ".preFooter_preFooter__8xHzO.footer-panel.bg-black",
  preFooterCta: "button#get_call_back",
  footer: "footer",

  //Requirements by Intent
  //High 80535
  heroCtaToCall,
  heroCtaToEcomm,
  ctaRibbon,
  ctaRibbonCallButton,
  ctaRibbonButtonEcomm,
  ribbonGuarantee: "#guarantee-ribbon",
  ribbonGuaranteeIcon,
  sectionGetQuote: "#leadFormSection",

  //### Medium 80536
  sectionClearChoice,
  iconCardWrapper: ".iconCard_wrapper__JI9kU",
  //iconCard: ".iconCard_card__eSr8D:nth(0)",
  iconCardOne: ".iconCard_card__eSr8D:nth-child(1)",
  iconCardTwo: ".iconCard_card__eSr8D:nth-child(2)",
  iconCardThree: ".iconCard_card__eSr8D:nth-child(3)",
  sectionHowItWorks,
  cardWrapperListAndTimeline: ".numberCard_wrapper__pgtnJ",
  //cardNumbered: ".numberCard_card__wlUcJ:nth(0)",
  cardNumberedOne: ".numberCard_card__wlUcJ:nth-child(1)",
  cardNumberedTwo: ".numberCard_card__wlUcJ:nth-child(2)",
  cardNumberedThree: ".numberCard_card__wlUcJ:nth-child(3)",
  cardNumberedFour: ".numberCard_card__wlUcJ:nth-child(4)",
  ribbonLogo: "#logo-ribbon",
  logoInRibbonOne,
  logoInRibbonTwo,
  logoInRibbonThree,
  sectionQuestions,
  faqs: ".faqs_container__N7WpV",
  faqsCategory: ".faqs_navigation__SVa9I",
  faqContainer: ".faqs_sections__UWvkp",
  faqDrawer,
  faqQuestion,
  faqAnswer,

  //### Low 80537
  heroCtaToLeadForm,
  ctaRibbonGetQuote,
} as const;

export type ComponentValue = string | ((page: Page) => Locator);

export const resolve = (page: Page, value: ComponentValue): Locator =>
  typeof value === "function" ? value(page) : page.locator(value);

export const smokeComponents = [
  "nav",
  "navLogo",
  "hero",
  "heroCtaBase",
  "sectionSeeTheDifference",
  //"cardBeforeAfter",
  "cardBeforeAfterOne",
  "cardBeforeAfterTwo",
  "cardBeforeAfterThree",
  "leadFormInPage",
  "preFooter",
  "preFooterCta",
  "footer",
] as const;

export const highComponents = [
  "nav",
  "navLogo",
  "hero",
  "heroCtaToCall",
  "heroCtaToEcomm",
  "sectionSeeTheDifference",
  //"cardBeforeAfter",
  "cardBeforeAfterOne",
  "cardBeforeAfterTwo",
  "cardBeforeAfterThree",
  "ctaRibbon",
  "ctaRibbonCallButton",
  "ctaRibbonButtonEcomm",
  "ribbonGuarantee",
  "ribbonGuaranteeIcon",
  "sectionGetQuote",
  "leadFormInPage",
  "preFooter",
  "preFooterCta",
  "footer",
] as const;

export const medComponents = [
  "nav",
  "navLogo",
  "hero",
  "heroCtaToCall",
  "heroCtaToLeadForm",
  "sectionClearChoice",
  "iconCardWrapper",
  //"iconCard",
  "iconCardOne",
  "iconCardTwo",
  "iconCardThree",
  "sectionHowItWorks",
  "cardWrapperListAndTimeline",
  //"cardNumbered",
  "cardNumberedOne",
  "cardNumberedTwo",
  "cardNumberedThree",
  "cardNumberedFour",
  "sectionGetQuote",
  "leadFormInPage",
  "ctaRibbon",
  "ctaRibbonCallButton",
  "sectionSeeTheDifference",
  //"cardBeforeAfter",
  "cardBeforeAfterOne",
  "cardBeforeAfterTwo",
  "cardBeforeAfterThree",
  "ribbonLogo",
  /*"logoInRibbonOne",
  "logoInRibbonTwo",
  "logoInRibbonThree",*/
  "sectionQuestions",
  "faqs",
  "faqsCategory",
  "faqContainer",
  "faqDrawer",
  "faqQuestion",
  "faqAnswer",
] as const;

export const lowComponents = [
  "nav",
  "navLogo",
  "hero",
  "heroCtaToLeadForm",
  "sectionClearChoice",
  "iconCardWrapper",
  //"iconCard",
  "iconCardOne",
  "iconCardTwo",
  "iconCardThree",
  "leadFormInPage",
  "sectionHowItWorks",
  "cardWrapperListAndTimeline",
  //"cardNumbered",
  "cardNumberedOne",
  "cardNumberedTwo",
  "cardNumberedThree",
  "cardNumberedFour",
  "sectionSeeTheDifference",
  //"cardBeforeAfter",
  "cardBeforeAfterOne",
  "cardBeforeAfterTwo",
  "cardBeforeAfterThree",
  "ctaRibbon",
  "ctaRibbonGetQuote",
  "sectionQuestions",
  "faqs",
  "faqsCategory",
  "faqContainer",
  "faqDrawer",
  "faqQuestion",
  "faqAnswer",
  "preFooter",
  "preFooterCta",
  "footer",
] as const;
