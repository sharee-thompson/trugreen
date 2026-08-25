import { Page } from "@playwright/test";

export type VisualElement = {
  selector: string;
  name: string;
  screenshot?: boolean;
};

export const selectorsToHideInCss: VisualElement[] = [
  {
    selector: ".InfinityNumber",
    name: "Dynamic Phone Number - Base",
    screenshot: false,
  },
  {
    selector: ".InfinityNumber.contact_btn",
    name: "In-Page Dynamic Phone Number",
    screenshot: false,
  },
  {
    selector:
      ".d-inline-block.g-font-size-16.mb-5.text-white.InfinityNumber.clickable",
    name: "Dynamic Phone Number-Footer For New Service",
    screenshot: false,
  },
  {
    selector: ".d-inline-block.footer_phone_no.InfinityNumber.clickable",
    name: "Dynamic Phone Number-Footer For Our Customers",
    screenshot: false,
  },
  {
    selector: ".btn.primary-btn.InfinityNumber",
    name: "Dynamic Phone Number-PreFooter",
    screenshot: false,
  },
  {
    selector: '[class*="PhoneContact_phoneNumber__"]',
    name: "Landing Header Phone Number",
    screenshot: false,
  },
  {
    selector:
      'header [class*="PhoneContact_phoneIcon__"], [class*="landingPageHeader_"] [class*="PhoneContact_phoneIcon__"]',
    name: "Landing Header Phone Icon",
    screenshot: false,
  },
];

export const selectorsToHideWithVisibilityInCss: VisualElement[] = [
  {
    selector:
      '[class*="landingPageHeader_"] a[href^="tel:"], [class*="preFooter_"] a[href^="tel:"], footer a[href^="tel:"]',
    name: "Landing Dynamic Phone Links",
    screenshot: false,
  },
  {
    selector:
      '[class*="landingPageHeader_logo__"], header img[alt="TruGreen Logo"]',
    name: "Landing Header Logo",
    screenshot: false,
  },
];

export const selectorsToMask: VisualElement[] = [
  {
    selector: ".map_section, #map_section",
    name: "Map Section",
    screenshot: false,
  },
  {
    selector: '[class*="beforeAfterCard_container__"] img',
    name: "Landing Difference Images",
    screenshot: false,
  },
];

export const selectorsToRemove: VisualElement[] = [
  { selector: ".changeimgsrc", name: "Sticky Chat Button", screenshot: false },
  { selector: "#onetrust-banner-sdk", name: "Cookie Banner" },
  {
    selector:
      "header.sticky-top, .top-header.headerFix, .top-strip, #myBtn, #optly-buyonline-eyebrow, [data-optly-sitewide-eyebrow]",
    name: "Header Cleanup",
    screenshot: false,
  },
  {
    selector: "#QSIFeedbackButton-btn",
    name: "Feedback Button",
    screenshot: false,
  },
  {
    selector: ".call-ribbon.call-ribbon-bg-white",
    name: "Fixed Call Ribbon",
    screenshot: false,
  },
  {
    selector: '[class*="preFooter_preFooter__"] img',
    name: "Landing Lets Talk Lawn Artwork",
    screenshot: false,
  },
  {
    selector:
      ".owl-carousel.owl-theme.owl-loaded.owl-drag, .owl-carousel.row.owl-theme.owl-loaded.owl-drag, .owl-carousel.row.owl-carousel.owl-theme.owl-loaded.owl-drag, .owl-carousel.owl-carousel.owl-theme.owl-loaded.owl-drag",
    name: "Dynamic Review Content",
    screenshot: false,
  },
];

export const dedicatedElementScreenshotItems: VisualElement[] = [
  {
    selector: ".top-header.headerFix",
    name: "Header Wrapper",
  },
];

export const elementScreenshotItems = [
  ...selectorsToRemove,
  ...selectorsToMask,
  ...dedicatedElementScreenshotItems,
].filter((item) => item.screenshot !== false);

export function getVisualHideCss(): string {
  const removeSelectors = selectorsToRemove
    .map((item) => item.selector)
    .join(", ");
  const hideSelectors = selectorsToHideInCss
    .map((item) => item.selector)
    .join(", ");
  const visibilityHideSelectors = selectorsToHideWithVisibilityInCss
    .map((item) => item.selector)
    .join(", ");
  const cssBlocks: string[] = [];

  if (removeSelectors) {
    cssBlocks.push(`${removeSelectors} { display: none !important; }`);
  }

  if (hideSelectors) {
    cssBlocks.push(
      `${hideSelectors} { color: transparent !important; -webkit-text-fill-color: transparent !important; text-shadow: none !important; }`,
    );
  }

  if (visibilityHideSelectors) {
    cssBlocks.push(
      `${visibilityHideSelectors} { visibility: hidden !important; }`,
    );
  }

  cssBlocks.push(
    `.mainChildren, .mma-wrapper.mainChildren, #main-content { margin-top: 0 !important; padding-top: 0 !important; }`,
  );

  return cssBlocks.join("\n");
}

export async function removeElementIfExists(
  page: Page,
  selector: string,
  name: string,
) {
  const elements = page.locator(selector);
  const count = await elements.count();
  if (count > 0) {
    console.log(`Removing ${count} "${name}" element(s)...`);
    await elements.evaluateAll((nodes) =>
      nodes.forEach((node) => node.remove()),
    );
  }
}
