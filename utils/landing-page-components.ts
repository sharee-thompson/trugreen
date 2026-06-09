//Components list for Landing Page Tests
import type { Page, Locator } from "@playwright/test";

/*Locators 2 Fix
sectionSeeTheDifference
cardBeforeAfter

Note, these are not available to test yet:
preFooter
preFooterCta
videoEmbed
footer
faqs
faqsCategory
faqContainer
faqDrawer
faqQuestion
faqAnswer

For multiples, try :nth(0) to target any first. To assert expected number, uncomment children. Applies to:
cardBeforeAfter
iconCard
logoInRibbon
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
  cardBeforeAfter: ".beforeAfterCard_card__egO_V:nth(0)",
  videoEmbed: "",
  preFooter: ".preFooter_preFooter__8xHzO  footer-panel bg-black",
  preFooterCta: ".preFooter_content__VQfVw",
  footer: "footer",

  //Requirements by Intent
  //High 80535
  heroCtaToCall:
    ".cta_cta__klq2F typography_button-text__ubQWS typography_body-text-1-base___iCQd typography_body-text-base__7XZyV cta_cta--primary__I9dsN cta_cta__klq2F typography_button-text__ubQWS typography_body-text-1-base___iCQd typography_body-text-base__7XZyV PhoneContact_phoneLink__eOVPz",
  ctaRibbon: "#cta-ribbon",
  ctaRibbonCallButton:
    ".cta_cta__klq2F typography_button-text__ubQWS typography_body-text-1-base___iCQd typography_body-text-base__7XZyV cta_cta--primary__I9dsN cta_cta__klq2F typography_button-text__ubQWS typography_body-text-1-base___iCQd typography_body-text-base__7XZyV PhoneContact_phoneLink__eOVPz ribbon_phoneCta__RguZi",
  ctaRibbonButton:
    ".cta_cta__klq2F typography_button-text__ubQWS typography_body-text-1-base___iCQd typography_body-text-base__7XZyV cta_cta--outline__L3bsY cta_cta__klq2F typography_button-text__ubQWS typography_body-text-1-base___iCQd typography_body-text-base__7XZyV",
  ribbonGuarantee: "#guarantee-ribbon",
  ribbonGuaranteeIcon:
    "img.ribbon_content--small__RRZt_ ribbon_content--sideBySide__eRkqt ribbon_gap--small___XQd_",
  //Trying live example, from /pests-products-and-services
  sectionGetQuote: ".cq-lets-talk",
  //May also try ".greener-lawns" that goes with the CTA below
  //Get Started CTA
  sectionCtaLeadForm: ".greener-lawns",
  //On click, focus moves to
  //Still in development on 6-8
  leadFormInPage: "",

  //### Medium 80536
  sectionClearChoice,
  iconCardWrapper: ".iconCard_wrapper__JI9kU",
  iconCard: ".iconCard_card__eSr8D:nth(0)",
  /*iconCardOne: ".iconCard_card__eSr8D:nth-child(1)",
  iconCardTwo: ".iconCard_card__eSr8D:nth-child(2)",
  iconCardThree: ".iconCard_card__eSr8D:nth-child(3)",*/
  sectionHowItWorks,
  cardWrapperListAndTimeline: ".numberCard_wrapper__pgtnJ",
  cardNumbered: ".numberCard_card__wlUcJ:nth(0)",
  /*cardNumbered1
        cardNumbered2
        cardNumbered3
        cardNumbered4
        OR just use nth-child when classes are the same*/

  ribbonLogo: "#logo-ribbon",
  logoInRibbon: "nth-child[0,1,2].ribbon_content__JaA_F",
  sectionQuestions,
  faqs: "#accordionExample",
  //From Storybook, it's ".faqs_faqs__iZBoV"
  faqsCategory: ".faqs_navigation__SVa9I",
  faqContainer: ".faqs_section__av_co faqs_active__UM23n",
  faqDrawer: ".faqs_disclosure__NAdz8",
  faqQuestion: ".faqs_questionText__tqydV",
  faqAnswer: ".faqs_answer__WE5Po",

  //### Low 80537
  heroCtaToLeadFormModal:
    ".cta_cta__klq2F typography_button-text__ubQWS typography_body-text-1-base___iCQd typography_body-text-base__7XZyV cta_cta--primary__I9dsN cta_cta__klq2F typography_button-text__ubQWS typography_body-text-1-base___iCQd typography_body-text-base__7XZyV",
  leadFormModal: "#lead-modal",
  ribbonPhoto: "",
  cardWrapperGrid: "",
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
  "nonVideoCardWrapper",
  "cardBeforeAfter",
  /*"cardBeforeAfterOne",
  "cardBeforeAfterTwo",
  "cardBeforeAfterThree",*/
  "videoEmbed",
  "preFooter",
  "preFooterCta",
  "footer"
] as const;

export const highComponents = [
  "heroCtaToCall",
  "ctaRibbon",
  "ctaRibbonCallButton",
  "ctaRibbonButton",
  "ribbonGuarantee",
  "ribbonGuaranteeIcon",
  "sectionGetQuote",
  "sectionCtaLeadForm",
  "leadFormInPage",
] as const;

export const medComponents = [
  "sectionClearChoice",
  "iconCardWrapper",
  "iconCard",
  /*"iconCardOne",
  "iconCardTwo",
  "iconCardThree",*/
  "sectionHowItWorks",
  "cardWrapperListAndTimeline",
  "cardNumbered",
  /*"cardNumberedOne",
  "cardNumberedTwo",
  "cardNumberedThree",
  "cardNumberedFour",*/
  "ribbonLogo",
  /*"ribbonLogoOne",
  "ribbonLogoTwo",
  "ribbonLogoThree"*/
  "sectionQuestions",
  "faqs",
  "faqsCategory",
  "faqContainer",
  "faqDrawer",
  "faqQuestion",
  "faqAnswer"

  /*Both question & answer might need to repeat also*/
] as const;

export const lowComponents = [
  "heroCtaToLeadFormModal",
  "leadFormModal",
  "ribbonPhoto",
  "cardWrapperGrid",
] as const;
