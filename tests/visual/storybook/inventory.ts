import fs from "fs";
import { STORYBOOK_CONFIG } from "./config";
import { StoryEntry } from "./discovery";

export function writeInventory(stories: StoryEntry[]): void {
  if (stories.length === 0) return;

  const timestamp = new Date().toISOString();
  const grouped = new Map<string, StoryEntry[]>();
  for (const story of stories) {
    const existing = grouped.get(story.title) ?? [];
    existing.push(story);
    grouped.set(story.title, existing);
  }

  const lines: string[] = [
    `# Storybook Snapshot Inventory`,
    ``,
    `> Auto-generated on ${timestamp}`,
    `>`,
    `> **${stories.length}** stories across **${grouped.size}** topics`,
    ``,
    `---`,
    ``,
  ];

  for (const [title, componentStories] of grouped) {
    lines.push(`## ${title}`);
    lines.push(``);
    lines.push(`| Story | ID |`);
    lines.push(`|-------|----|`);
    for (const s of componentStories) {
      lines.push(`| ${s.name} | \`${s.id}\` |`);
    }
    lines.push(``);
  }

  fs.writeFileSync(STORYBOOK_CONFIG.inventoryPath, lines.join("\n"), "utf-8");
  console.log(`📋 Inventory written to ${STORYBOOK_CONFIG.inventoryPath}`);
}
