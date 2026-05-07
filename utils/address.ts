import { addresses } from "rrad";
import * from "fs";
import * from "path";

interface Address {
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
}

const USED_PATH = path.join(__dirname, "../.used-addresses.json");

function getUsedIndexes(): Set<number> {
  if (!fs.existsSync(USED_PATH)) return new Set();
  return new Set(JSON.parse(fs.readFileSync(USED_PATH, "utf-8")));
}

function saveUsedIndexes(used: Set<number>): void {
  fs.writeFileSync(USED_PATH, JSON.stringify([...used]), "utf-8");
}

export function getRandomAddress(): Address {
  const used = getUsedIndexes();

  if (used.size >= addresses.length) {
    throw new Error(
      "All RRAD addresses have been used! Reset .used-addresses.json",
    );
  }

  let index: number;
  do {
    index = Math.floor(Math.random() * addresses.length);
  } while (used.has(index));

  used.add(index);
  saveUsedIndexes(used);
  return addresses[index];
}

// If you need multiple at once
export function getRandomAddresses(count: number): Address[] {
  return Array.from({ length: count }, () => getRandomAddress());
}
