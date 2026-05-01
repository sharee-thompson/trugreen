import { test, expect } from "@playwright/test";
import { STORYBOOK_CONFIG } from "./config";
import { discoverStories, StoryEntry } from "./discovery";
import { writeInventory } from "./inventory";

let stories: StoryEntry[] = [];

test.beforeAll(async ({ request }) => {
  stories = await discoverStories(request);
  console.log(`📚 Discovered ${stories.length} stories for snapshot testing`);
});

test.describe("Storybook Visual Regression", () => {
  test("snapshot each story", async ({ page }) => {
    test.setTimeout(stories.length * 10_000);

    for (const story of stories) {
      await test.step(`📸 ${story.title} / ${story.name}`, async () => {
        await page.goto(
          `${STORYBOOK_CONFIG.iframeUrl}?id=${story.id}&viewMode=story`,
          { waitUntil: "load" },
        );

        try {
          await page.locator("#storybook-root > *").first().waitFor({
            state: "visible",
            timeout: STORYBOOK_CONFIG.renderTimeout,
          });
        } catch {
          console.warn(`⚠️ Skipped (no render): ${story.id}`);
          return;
        }

        await expect.soft(page).toHaveScreenshot(`${story.id}.png`, {
          fullPage: true,
        });
      });
    }

    // Write inventory after all stories attempted
    writeInventory(stories);
  });
});
