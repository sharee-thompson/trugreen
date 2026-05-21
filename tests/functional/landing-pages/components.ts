//Requirements in Common
export const components = {
  /*To begin, I'm using the Storybook page for reference, but I need to double check the live versions, especially for LEGACY components. JZ
  https://tru-g-2025.netlify.app/iframe.html?id=pages-landing-test--default&viewMode=story

  When a component is commented out, that means while it's development may be done, it's not included in the Landing Page Test Story
  */
  nav: ".landingPageHeader_container__JNUbK",
  headerLogo: ".landingPageHeader_logo__jfr9b",
  hero: ".landingPageHero_heroSection__yEE4B",
  heroCtaBase: ".landingPageHero_ctaWrapper__JgtSm",
  sectionSeeTheDifference:
    ".section_section__mbFim section_section--margin-medium__x9HpW section_section--bg-primary__r8no2",
  nonVideoCardWrapper: "",
  cardBeforeAfter: "",
  videoEmbed: "",
  preFooter: "",
  preFooterCta: "",
  footer: "",

  //Requirements by Intent
  //High 80535
  heroCtaToCall: "",
  ribbon: "",
  ribbonCTA: "",
  ribbonGuarantee: "",
  sectionGetQuote: "",
  sectionCtaLeadForm: "",
  //On click, focus moves to
  leadFormInPage: "",

  //### Medium 80536
  sectionTheClearChoice: "",
  cardWrapper: "",
  cardIcon: "",
  sectionHowItWorks:
    ".section_section__mbFim section_section--margin-medium__x9HpW section_section--bg-secondary__BbvW7",
  cardWrapperListAndtimeline: "",
  cardNumbered: "",
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
  heroCtaToLeadFormModal: "",
  leadFormModal: "",
  ribbonPhoto: "",
  cardWrapperGrid: "",
} as const;

export const smokeComponents = [

] as const;

export const highComponents = [

] as const;

export const medComponents = [

] as const;

export const lowComponents = [

] as const;
