import type { LinkRecord } from "./types";

export function buildHtmlReport(
  records: LinkRecord[],
  baseUrl: string,
  projectName: string,
): string {
  const failed = records.filter((r) => !r.ok);
  const passed = records.length - failed.length;

  const rows = records
    .map((record) => {
      const statusLabel =
        record.status === null ? "NO_RESPONSE" : String(record.status);
      const state = record.ok ? "PASS" : "FAIL";
      const rowClass = record.ok ? "ok" : "fail";
      const err = record.error ? ` - ${record.error}` : "";
      return `<tr class="${rowClass}"><td>${state}</td><td>${statusLabel}</td><td><a href="${record.url}">${record.url}</a>${err}</td><td>${record.sourcePage}</td><td>${record.isInternal ? "internal" : "external"}</td></tr>`;
    })
    .join("\n");

  return `<!doctype html>`;
}

export function shortError(error?: string): string | undefined {
  if (!error) {
    return undefined;
  }

  const firstLine = error.split("\n")[0]?.trim();
  return firstLine || undefined;
}