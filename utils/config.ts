type EnvName = "prod" | "qa" | "dev";
import { withAutomationParam } from "./withAutomationParam";

const baseUrls: Record<EnvName, string> = {
  prod: "https://www.trugreen.com",
  qa: "https://qa-trugreen.com",
  dev: "https://dev-trugreen.com",
};

// By default, append ?automation=true unless opts.automation === false
// Optionally accepts a path to join with the base URL
export function getBaseUrl(
  pathOrOpts?: string | { automation?: boolean },
  opts?: { automation?: boolean },
): string {
  const env = (process.env.ENV as EnvName | undefined) || "prod";
  const base = baseUrls[env] || baseUrls.prod;
  let path = "";
  let automation = true;
  if (typeof pathOrOpts === "string") {
    path = pathOrOpts;
    if (opts && typeof opts.automation === "boolean")
      automation = opts.automation;
  } else if (typeof pathOrOpts === "object" && pathOrOpts !== null) {
    if (typeof pathOrOpts.automation === "boolean")
      automation = pathOrOpts.automation;
  }
  // Join base and path
  const joined = path
    ? base.replace(/\/$/, "") + (path.startsWith("/") ? path : "/" + path)
    : base;
  if (automation === false) {
    return joined;
  }
  return withAutomationParam(joined);
}

// Joins base URL and path, then appends automation param at the end (unless automation: false)
export function getFullUrl(
  path: string,
  opts?: { automation?: boolean },
): string {
  const base = getBaseUrl({ automation: false });
  // Ensure no double slashes
  const joined =
    base.replace(/\/$/, "") + (path.startsWith("/") ? path : "/" + path);
  if (opts?.automation === false) {
    return joined;
  }
  return withAutomationParam(joined);
}

// Like getBaseUrl but defaults to "dev" instead of "prod"
// Used for landing page tests which are dev-focused during active development
export function getLandingPageUrl(
  pathOrOpts?: string | { automation?: boolean },
  opts?: { automation?: boolean },
): string {
  const env =
    (process.env.LANDING_PAGE_ENV as EnvName | undefined) ||
    (process.env.ENV as EnvName | undefined) ||
    "dev";
  const base = baseUrls[env] || baseUrls.dev;
  let path = "";
  let automation = true;
  if (typeof pathOrOpts === "string") {
    path = pathOrOpts;
    if (opts && typeof opts.automation === "boolean")
      automation = opts.automation;
  } else if (typeof pathOrOpts === "object" && pathOrOpts !== null) {
    if (typeof pathOrOpts.automation === "boolean")
      automation = pathOrOpts.automation;
  }
  // Join base and path
  const joined = path
    ? base.replace(/\/$/, "") + (path.startsWith("/") ? path : "/" + path)
    : base;
  if (automation === false) {
    return joined;
  }
  return withAutomationParam(joined);
}
