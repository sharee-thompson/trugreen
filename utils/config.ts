type EnvName = "prod" | "qa" | "dev";

const baseUrls: Record<EnvName, string> = {
  prod: "https://www.trugreen.com",
  qa: "https://qa-trugreen.com",
  dev: "https://dev-trugreen.com",
};

export function getBaseUrl(): string {
  const env = (process.env.ENV as EnvName | undefined) || "prod";
  return baseUrls[env] || baseUrls.prod;
}
