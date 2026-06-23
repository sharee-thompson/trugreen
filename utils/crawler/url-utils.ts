import {
  SKIP_PROTOCOL_PREFIXES,
  SKIP_EXTENSION_REGEX,
  SKIP_HOST_PATTERNS,
} from "./config";

export function shouldSkipHost(url: URL): boolean {
  return SKIP_HOST_PATTERNS.some((pattern) => pattern.test(url.hostname));
}

export function normalizeUrl(
  rawUrl: string,
  baseOrigin: string,
): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return null;
  }

  const lower = trimmed.toLowerCase();
  if (SKIP_PROTOCOL_PREFIXES.some((prefix) => lower.startsWith(prefix))) {
    return null;
  }

  if (trimmed.startsWith("#")) {
    return null;
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed, baseOrigin);
  } catch {
    return null;
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    return null;
  }

  if (shouldSkipHost(parsed)) {
    return null;
  }

  parsed.hash = "";

  const normalized = parsed.toString();
  if (SKIP_EXTENSION_REGEX.test(normalized)) {
    return null;
  }

  return normalized;
}

export function isInternalUrl(url: string, baseOrigin: string): boolean {
  try {
    return new URL(url).origin === new URL(baseOrigin).origin;
  } catch {
    return false;
  }
}
