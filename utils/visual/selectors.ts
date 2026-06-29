export const selectorsToRemove = [
  { selector: ".changeimgsrc", name: "Sticky Chat Button" },
  { selector: "#onetrust-banner-sdk", name: "Cookie Banner" },
  { selector: ".top-strip", name: "Promo Banner" },
];

export const selectorsToMask = [
  {
    selector: ".InfinityNumber",
    name: "Dynamic Phone Number",
  },
  {
    selector:
      ".d-inline-block.g-font-size-16.mb-5.text-white.InfinityNumber.clickable",
    name: "Dynamic Phone Number",
  },
  {
    selector: ".d-inline-block.footer_phone_no.InfinityNumber.clickable",
    name: "Dynamic Phone Number",
  },
];

export const elementScreenshotItems = [
  ...selectorsToRemove,
  ...selectorsToMask,
].filter(
  (item) =>
    item.name !== "Sticky Chat Button" && item.name !== "Dynamic Phone Number",
);

export async function removeElementIfExists(
  page: any,
  selector: string,
  name: string,
) {
  const element = page.locator(selector);
  if ((await element.count()) > 0) {
    console.log(`Removing ${name} element...`);
    await element.evaluate((node: any) => node.remove());
  }
}
