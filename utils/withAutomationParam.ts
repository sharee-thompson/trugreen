// Returns a URL with ?automation=true appended, or &automation=true if there are already query params
export function withAutomationParam(url: string): string {
  if (url.includes("automation=true")) return url;
  return url.includes("?")
    ? `${url}&automation=true`
    : `${url}?automation=true`;
}
