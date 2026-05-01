import path from "path";

// Storybook base URL
// My project only had one environment for Storybook at this time,
// so I'm not using the BASE_URL from the playwright config. Just FYI.
const STORYBOOK_BASE = "https://tru-g-2025.netlify.app";

export const STORYBOOK_CONFIG = {
  indexUrl: `${STORYBOOK_BASE}/index.json`,
  // Proper SB testing views the component is "isolation", meaning without the SB UI
  iframeUrl: `${STORYBOOK_BASE}/iframe.html`,
  // This will pop the list of components tested in the tests dir, if you don't want it there, just update the path.
  //const INVENTORY_PATH = path.resolve("./tests/storybook-inventory.md");
  inventoryPath: path.join(__dirname, "storybook-inventory.md"),

  // Super helpful explanations from The Wizard™
  // Filter: only run stories with these tags (or set to null to run all)
  // Tags are defined in your *.stories.js files
  requiredTags: ["test"] as string[] | null,
  /// Filter: skip stories whose IDs match these patterns
  // e.g. /--docs$/ excludes documentation-only entries
  excludePatterns: [/--docs$/] as RegExp[],

  // Max time (ms) to wait for a component to render before skipping it
  renderTimeout: 5000,
};
