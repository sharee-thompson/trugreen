import path from "path";

const STORYBOOK_BASE = "https://tru-g-2025.netlify.app";

export const STORYBOOK_CONFIG = {
  indexUrl: `${STORYBOOK_BASE}/index.json`,
  iframeUrl: `${STORYBOOK_BASE}/iframe.html`,
  inventoryPath: path.join(__dirname, "storybook-inventory.md"),
  requiredTags: ["test"] as string[] | null,
  
  excludePatterns: [/--docs$/] as RegExp[],

  renderTimeout: 5000,
};
