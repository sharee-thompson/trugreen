//Components list for Landing Page Tests
import type { Page, Locator } from "@playwright/test";

//List of all components is now in Confluence: https://confluence.uhub.biz/display/VYRNATRG/Landing+Pages+-+Required+Components

/*Note, these are not available to test yet, see 81662:
preFooter
preFooterCta
footer
faqs
faqsCategory
faqContainer
faqDrawer
faqQuestion
faqAnswer
sectionGetQuote
sectionCtaLeadForm
leadFormInPage


These are no longer in the list of required components:
ribbonPhoto
cardWrapperGrid
videoEmbed
heroCtaToLeadFormModal
leadFormModal

These are currently commented out. JZ
*/

//Any locators that require an alternate strategy will be listed up here
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

export const ribbonGuaranteeIcon = (page: Page) =>
  page
    .locator("#guarantee-ribbon")
    .getByRole("img", { name: "Satisfaction Guarantee" });

export const components = {
  /*Initial testing for test functionality done here:
  https://tru-g-2025.netlify.app/iframe.html?id=pages-landing-test--default&viewMode=story
  */

  //Requirements in Common
  nav: ".landingPageHeader_container__JNUbK",
  navLogo: ".landingPageHeader_logo__jfr9b",
  hero: ".landingPageHero_heroSection__yEE4B",
  heroCtaBase: ".landingPageHero_ctaWrapper__JgtSm",
  sectionSeeTheDifference,
  nonVideoCardWrapper: ".beforeAfterCard_container__re_Y3",
  //cardBeforeAfter: ".beforeAfterCard_card__egO_V",
  cardBeforeAfterOne: ".beforeAfterCard_card__egO_V:nth-child(1)",
  cardBeforeAfterTwo: ".beforeAfterCard_card__egO_V:nth-child(2)",
  cardBeforeAfterThree: ".beforeAfterCard_card__egO_V:nth-child(3)",
  /*
  preFooter: ".preFooter_preFooter__8xHzO  footer-panel bg-black",
  preFooterCta: ".preFooter_content__VQfVw",
  footer: "footer",*/

  //Requirements by Intent
  //High 80535
  heroCtaToCall: ".landingPageHero_wBtn__JMBjM.banner_w-btn__nhoru",
  ctaRibbon: "#cta-ribbon",
  ctaRibbonCallButton:
    ".cta_cta__klq2F.typography_button-text__ubQWS.typography_body-text-1-base___iCQd.typography_body-text-base__7XZyV.cta_cta--primary__I9dsN.cta_cta__klq2F.typography_button-text__ubQWS.typography_body-text-1-base___iCQd.typography_body-text-base__7XZyV.PhoneContact_phoneLink__eOVPz.ribbon_phoneCta__RguZi",
  ctaRibbonButton:
    ".cta_cta__klq2F.typography_button-text__ubQWS.typography_body-text-1-base___iCQd.typography_body-text-base__7XZyV.cta_cta--outline__L3bsY.cta_cta__klq2F.typography_button-text__ubQWS.typography_body-text-1-base___iCQd.typography_body-text-base__7XZyV",
  ribbonGuarantee: "#guarantee-ribbon",
  ribbonGuaranteeIcon,
  //Trying live example, from /pests-products-and-services
  /*sectionGetQuote: ".cq-lets-talk",
  //May also try ".greener-lawns" that goes with the CTA below
  //Get Started CTA
  sectionCtaLeadForm: ".greener-lawns",
  //On click, focus moves to
  //Still in development on 6-8
  leadFormInPage: "",*/

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
  logoInRibbon: "nth-child[0,1,2].ribbon_content__JaA_F",
  sectionQuestions,
  /*faqs: "#accordionExample",
  //From Storybook, it's ".faqs_faqs__iZBoV"
  faqsCategory: ".faqs_navigation__SVa9I",
  faqContainer: ".faqs_section__av_co faqs_active__UM23n",
  faqDrawer: ".faqs_disclosure__NAdz8",
  faqQuestion: ".faqs_questionText__tqydV",
  faqAnswer: ".faqs_answer__WE5Po",*/

  //### Low 80537
  heroCTAToLeadForm: "",
  
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
  /*
  "preFooter",
  "preFooterCta",
  "footer"*/
] as const;

export const highComponents = [
  "nav",
  "navLogo",
  "hero",
  "heroCtaToCall",
  "sectionSeeTheDifference",
  //"cardBeforeAfter",
  "cardBeforeAfterOne",
  "cardBeforeAfterTwo",
  "cardBeforeAfterThree",
  "ctaRibbon",
  "ctaRibbonCallButton",
  "ctaRibbonButton",
  "ribbonGuarantee",
  "ribbonGuaranteeIcon",
  /*"sectionGetQuote",
  "sectionCtaLeadForm",
  "leadFormInPage",
  "preFooter",
  "preFooterCta",
  "footer"*/
] as const;

export const medComponents = [
  "nav",
  "navLogo",
  "hero",
  "heroCtaToCall",
  //"heroCtaToLeadForm",
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
  /*"sectionGetQuote",
  "sectionCtaLeadForm",
  "leadFormInPage",*/
  "ctaRibbon",
  "ctaRibbonCallButton",
  "ctaRibbonButton",
  "sectionSeeTheDifference",
  //"cardBeforeAfter",
  "cardBeforeAfterOne",
  "cardBeforeAfterTwo",
  "cardBeforeAfterThree",
  "ribbonLogo",
  "logoInRibbon",
  /*"ribbonLogoOne",
  "ribbonLogoTwo",
  "ribbonLogoThree"*/
  "sectionQuestions",
  /*"faqs",
  "faqsCategory",
  "faqContainer",
  "faqDrawer",
  "faqQuestion",
  "faqAnswer"*/
] as const;

export const lowComponents = [
  "nav",
  "navLogo",
  "hero",
  //"heroCtaToLeadForm",
  "sectionClearChoice",
  "iconCardWrapper",
  //"iconCard",
  "iconCardOne",
  "iconCardTwo",
  "iconCardThree",
  //"leadFormInPage",
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
  "ctaRibbonButton",
  "sectionQuestions",
  /*"faqs",
  "faqsCategory",
  "faqContainer",
  "faqDrawer",
  "faqQuestion",
  "faqAnswer"*/
  /*
  "preFooter",
  "preFooterCta",
  "footer"*/
] as const;
