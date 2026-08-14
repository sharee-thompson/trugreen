const SKIP_PROTOCOL_PREFIXES = [
  "mailto:",
  "tel:",
  "sms:",
  "javascript:",
  "data:",
  "blob:",
  "about:",
];

const SKIP_EXTENSION_REGEX =
  /\.(pdf|jpg|jpeg|png|gif|webp|svg|zip|doc|docx|xls|xlsx|ppt|pptx|mp4|mp3)(\?.*)?$/i;

const SKIP_PATH_PATTERNS = [
  /(^|\/)logout(?:\/|$)/i,
  /(^|\/)log-out(?:\/|$)/i,
  /(^|\/)signout(?:\/|$)/i,
  /(^|\/)sign-out(?:\/|$)/i,
  /(^|\/)wp-login\.php$/i,
];

const TRACKING_PARAMS = new Set([
  "automation",
  "fbclid",
  "gclid",
  "gbraid",
  "wbraid",
  "mc_cid",
  "mc_eid",
  "utm_campaign",
  "utm_content",
  "utm_id",
  "utm_medium",
  "utm_source",
  "utm_term",
]);

function trimTrailingSlash(pathname: string): string {
  if (pathname === "/") {
    return pathname;
  }

  return pathname.replace(/\/+$/, "") || "/";
}

function sortAndCleanQuery(parsed: URL): void {
  const keptEntries = Array.from(parsed.searchParams.entries())
    .filter(([key, value]) => {
      if (!value.trim()) {
        return false;
      }

      return !TRACKING_PARAMS.has(key.toLowerCase());
    })
    .sort(([leftKey, leftValue], [rightKey, rightValue]) => {
      const keyCompare = leftKey.localeCompare(rightKey);
      if (keyCompare !== 0) {
        return keyCompare;
      }

      return leftValue.localeCompare(rightValue);
    });

  parsed.search = "";
  for (const [key, value] of keptEntries) {
    parsed.searchParams.append(key, value);
  }
}

export function normalizeHttpUrl(
  rawUrl: string,
  baseUrl: string,
): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed || trimmed.startsWith("#")) {
    return null;
  }

  const lowered = trimmed.toLowerCase();
  if (SKIP_PROTOCOL_PREFIXES.some((prefix) => lowered.startsWith(prefix))) {
    return null;
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed, baseUrl);
  } catch {
    return null;
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return null;
  }

  parsed.hash = "";
  parsed.username = "";
  parsed.password = "";
  parsed.pathname = trimTrailingSlash(parsed.pathname);
  sortAndCleanQuery(parsed);

  return parsed.toString();
}

export function isInternalUrl(url: string, baseUrl: string): boolean {
  try {
    return new URL(url).origin === new URL(baseUrl).origin;
  } catch {
    return false;
  }
}

export function getSkipReason(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return "invalid-url";
  }

  if (SKIP_EXTENSION_REGEX.test(parsed.toString())) {
    return "file-url";
  }

  if (SKIP_PATH_PATTERNS.some((pattern) => pattern.test(parsed.pathname))) {
    return "unsafe-action-url";
  }

  return null;
}

export function normalizeCrawlUrl(
  rawUrl: string,
  baseUrl: string,
): string | null {
  const normalized = normalizeHttpUrl(rawUrl, baseUrl);
  if (!normalized) {
    return null;
  }

  const skipReason = getSkipReason(normalized);
  if (skipReason) {
    return null;
  }

  return normalized;
}
