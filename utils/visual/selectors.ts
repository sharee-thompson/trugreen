import { Page } from "@playwright/test";

type VisualElement = {
  selector: string;
  name: string;
  screenshot?: boolean;
};

export const selectorsToMask: VisualElement[] = [
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
  { selector: ".top-strip", name: "Promo Banner", screenshot: false },
];

export const selectorsToRemove: VisualElement[] = [
  { selector: ".changeimgsrc", name: "Sticky Chat Button" },
  { selector: "#onetrust-banner-sdk", name: "Cookie Banner" },
  
];

export const elementScreenshotItems = [
  ...selectorsToRemove,
  ...selectorsToMask,
].filter((item) => item.screenshot !== false);

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
