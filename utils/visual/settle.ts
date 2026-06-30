import { Page, expect } from "@playwright/test";
import { emulateLazyLoadScroll } from "./scrolling-legacy";

// Shared: confirm lazy images decoded + fonts settled (both architectures).
async function waitForImagesAndFonts(page: Page): Promise<void> {
  await page.waitForFunction(
    () => {
      const imgs = Array.from(document.querySelectorAll("img"));
      return imgs.every((img) => img.complete && img.naturalWidth > 0);
    },
    undefined,
    { timeout: 15000 }, // fail loudly on a genuinely broken image, don't hang
  );
  await page.evaluate(() => document.fonts.ready);
}

// Drupal: scroll triggers jQuery lazy-load, THEN confirm images finished.
export async function settleDrupalPage(page: Page): Promise<void> {
  await emulateLazyLoadScroll(page);
  await waitForImagesAndFonts(page);
}

// Next.js: use a web-first assertion on a rendered
// landmark as the hydration/readiness proxy, then handle lazy content.
export async function settleNextPage(page: Page): Promise<void> {
  await expect(page.locator("footer")).toBeVisible(); // render/hydration gate
  await emulateLazyLoadScroll(page);
  await waitForImagesAndFonts(page);
}
/*One caveat on the Next landmark: footer is a reasonable render gate, but if it's server-rendered it's a weak hydration signal. If you have a known element that only appears/stabilizes after React mounts (a client-only widget, a personalized banner), swap footer for that — it'll be a truer hydration gate. */