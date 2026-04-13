import { Page, TestInfo, expect } from "@playwright/test";

export async function emulateLazyLoadScroll(page: Page): Promise<void> {
  const DOWN_SCROLL_DISTANCE = 200;
  const UP_SCROLL_DISTANCE = 300;
  const MAX_STEPS = 200; // failsafe
  const WAIT_BETWEEN_SCROLLS = 100;

  //  1. SCROLL DOWN TO TRIGGER LAZY LOAD

  await page.evaluate(
    async ({ distance, maxSteps, waitMs }) => {
      await new Promise<void>((resolve) => {
        let steps = 0;

        const scrollDown = () => {
          steps++;
          window.scrollBy(0, distance);

          if (
            steps >= maxSteps ||
            window.innerHeight + window.scrollY >= document.body.scrollHeight
          ) {
            resolve();
            return;
          }

          setTimeout(scrollDown, waitMs);
        };

        scrollDown();
      });
    },
    {
      distance: DOWN_SCROLL_DISTANCE,
      maxSteps: MAX_STEPS,
      waitMs: WAIT_BETWEEN_SCROLLS,
    },
  );

  //  2. WAIT FOR LAZY LOADED CONTENT TO FINISH

  try {
    await page.waitForLoadState("networkidle", { timeout: 10000 });
  } catch {}

  //  3. STABILIZE LAYOUT AFTER SCROLLING

  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );

  //  4. SCROLL BACK TO TOP SAFELY (smooth-ish)

  await page.evaluate(
    async ({ distance, waitMs }) => {
      await new Promise<void>((resolve) => {
        const scrollUp = () => {
          if (window.scrollY <= 0) {
            resolve();
            return;
          }

          window.scrollBy(0, -distance);
          setTimeout(scrollUp, waitMs);
        };

        scrollUp();
      });
    },
    { distance: UP_SCROLL_DISTANCE, waitMs: WAIT_BETWEEN_SCROLLS },
  );

  //  5. FINAL STABILIZATION BEFORE SCREENSHOT

  try {
    await page.waitForLoadState("networkidle", { timeout: 5000 });
  } catch {}

  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );

  await page.waitForTimeout(500);
}
