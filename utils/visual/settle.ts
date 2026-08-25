import { Page, expect } from "@playwright/test";
import { emulateLazyLoadScroll } from "./scrolling-legacy";
import { waitForPageContent } from "./legacy-waits";

// Shared: confirm lazy images decoded + fonts settled (both architectures).
async function waitForImagesAndFonts(page: Page): Promise<void> {
  await page
    .waitForFunction(
      () =>
        Array.from(document.querySelectorAll("img")).every(
          (img) => img.complete,
        ),
      undefined,
      { timeout: 15000 },
    )
    .catch(() => {
      // Best-effort: loading spinners & lazy webp may never report complete.
      // toHaveScreenshot's two-shot stabilization is the real gate.
    });

  await page.waitForLoadState("load").catch(() => {});

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      await page.evaluate(() => document.fonts.ready);
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const isNavigationRace =
        message.includes("Execution context was destroyed") ||
        message.includes("Target page, context or browser has been closed") ||
        message.includes("Target closed") ||
        message.includes("Page closed");

      if (!isNavigationRace || page.isClosed() || attempt === 1) {
        throw error;
      }

      await page.waitForLoadState("load").catch(() => {});
    }
  }
}

export async function waitForStableScrollHeight(page: Page): Promise<void> {
  await page.evaluate(async () => {
    let previousHeights = "";
    let stableFrames = 0;

    for (let attempt = 0; attempt < 30 && stableFrames < 3; attempt += 1) {
      const currentHeights = `${document.documentElement.scrollHeight}:${document.body?.scrollHeight ?? 0}`;

      if (currentHeights === previousHeights) {
        stableFrames += 1;
      } else {
        previousHeights = currentHeights;
        stableFrames = 0;
      }

      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });
    }
  });
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

export async function settleVisualPage(
  page: Page,
  visualPath: string,
): Promise<void> {
  await waitForPageContent(page, visualPath);
  await emulateLazyLoadScroll(page);
  await waitForImagesAndFonts(page);

  if (visualPath.endsWith("/ppc/landing-page")) {
    await waitForStableScrollHeight(page);
  }
}
/*One caveat on the Next landmark: footer is a reasonable render gate, but if it's server-rendered it's a weak hydration signal. If you have a known element that only appears/stabilizes after React mounts (a client-only widget, a personalized banner), swap footer for that — it'll be a truer hydration gate. */
