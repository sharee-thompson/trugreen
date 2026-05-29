//Components list for Landing Page Tests

//Requirements in Common
export const components = {
  /*To begin, I'm using the Storybook page for reference, but I need to double check the live versions, especially for LEGACY components. JZ
  https://tru-g-2025.netlify.app/iframe.html?id=pages-landing-test--default&viewMode=story

  When a component is missing a value, that means while it's development may be done, it's not included in the Landing Page Test Story

  This is not laid out inteligently, it's broken down by intent twice. Need to double check for duplicates.
  */

  //All
  nav: ".landingPageHeader_container__JNUbK",
  navLogo: ".landingPageHeader_logo__jfr9b",
  hero: ".landingPageHero_heroSection__yEE4B",
  heroCtaBase: ".landingPageHero_ctaWrapper__JgtSm",
  sectionSeeTheDifference:
    ".section_section__mbFim section_section--margin-medium__x9HpW section_section--bg-primary__r8no2",
  nonVideoCardWrapper: ".beforeAfterCard_container__re_Y3",
  cardBeforeAfter: ".beforeAfterCard_card__egO_V",
  /*
  cardBeforeAfterOne: ".beforeAfterCard_card__egO_V:nth-child(1)",
  cardBeforeAfterTwo: ".beforeAfterCard_card__egO_V:nth-child(2)",
  cardBeforeAfterThree: ".beforeAfterCard_card__egO_V:nth-child(3)",*/

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
  sectionGetQuote: "",
  sectionCtaLeadForm: "",
  //On click, focus moves to
  leadFormInPage: "",

  //### Medium 80536
  sectionClearChoice:
    ".section_section__mbFim section_section--margin-medium__x9HpW section_section--bg-primary__r8no2",
  iconCardWrapper: ".iconCard_wrapper__JI9kU",
  iconCard: ".iconCard_card__eSr8D",
  /*iconCardOne: ".iconCard_card__eSr8D:nth-child(1)",
  iconCardTwo: ".iconCard_card__eSr8D:nth-child(2)",
  iconCardThree: ".iconCard_card__eSr8D:nth-child(3)",*/
  sectionHowItWorks:
    ".section_section__mbFim section_section--margin-medium__x9HpW section_section--bg-secondary__BbvW7",
  cardWrapperListAndTimeline: ".numberCard_wrapper__pgtnJ",
  cardNumbered: ".numberCard_card__wlUcJ",
  /*cardNumbered1
        cardNumbered2
        cardNumbered3
        cardNumbered4
        OR just use nth-child when classes are the same*/

  ribbonLogo: "#logo-ribbon",
  logoInRibbon: "nth-child[0,1,2].ribbon_content__JaA_F",
  sectionQuestions: "",
  faqs: "",
  category: "",
  faq: "",

  //### Low 80537
  heroCtaToLeadFormModal:
    ".cta_cta__klq2F typography_button-text__ubQWS typography_body-text-1-base___iCQd typography_body-text-base__7XZyV cta_cta--primary__I9dsN cta_cta__klq2F typography_button-text__ubQWS typography_body-text-1-base___iCQd typography_body-text-base__7XZyV",
  leadFormModal: "#lead-modal",
  ribbonPhoto: "",
  cardWrapperGrid: "",
} as const;

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
  "cateogory",
  "faq"
  /*Both category & faq might need to repeat also*/
] as const;

export const lowComponents = [
  "heroCtaToLeadFormModal",
  "leadFormModal",
  "ribbonPhoto",
  "cardWrapperGrid",
] as const;
