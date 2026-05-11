import path from "path";
import { Page } from "@playwright/test";

const STORYBOOK_BASE = "https://tru-g-2025.netlify.app";

export const STORYBOOK_CONFIG = {
  indexUrl: `${STORYBOOK_BASE}/index.json`,
  iframeUrl: `${STORYBOOK_BASE}/iframe.html`,
  inventoryPath: path.join(__dirname, "storybook-inventory.md"),
  requiredTags: ["test"] as string[] | null,
  
  excludePatterns: [/--docs$/] as RegExp[],

  renderTimeout: 5000,
};

//List of stories that require a click to reveal story under test
type StoryInteraction = (page: Page) => Promise<void>;

export const STORY_INTERACTIONS: Record<string, StoryInteraction> = {
  //Only story as of May 11, default modals, still under construction. JZ
  "components-v2-modals-rightmodal--default": async (page) => {
    await page.locator(".btn primary-btn").first().click();
  },
  /*"components-v2-modal--default": async (page) => {
    await page.getByRole("button", { name: "Open" }).click();
  },
  "components-v2-dropdown--closed": async (page) => {
    await page.getByRole("combobox").click();
  },*/
};

/*
Stories with hover state validation
- a class="cta_cta__klq2F"
- button class="cta_cta__klq2F"
- label class="addOnCard_cta__bm9aX"
- label class="paymentCard_radioLabel__iaSYg"
- label class="planCard_cta__q3fq_"
- button class="ribbon_btn-custom-quote__pBMK7 cta_cta__klq2F"

Cursor change?
- a id="play_store_link" or "app_store_link"
*/
