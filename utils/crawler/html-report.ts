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

  return `<!doctype html>
  <html lang="en"><head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Link Validation Report</title>
	<style>
		body { font-family: -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif; margin: 24px; color: #202124; }
		h1 { margin-bottom: 8px; }
		.meta { margin-bottom: 20px; }
		.chips { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
		.chip { padding: 6px 10px; border-radius: 999px; font-weight: 600; font-size: 13px; }
		.chip.all { background: #e8f0fe; color: #1a73e8; }
		.chip.pass { background: #e6f4ea; color: #188038; }
		.chip.fail { background: #fce8e6; color: #d93025; }
		table { width: 100%; border-collapse: collapse; margin-top: 12px; }
		th, td { border: 1px solid #dadce0; padding: 8px; text-align: left; vertical-align: top; font-size: 13px; }
		th { background: #f8f9fa; }
		tr.ok td:first-child { color: #188038; font-weight: 700; }
		tr.fail td:first-child { color: #d93025; font-weight: 700; }
		a { color: #1a73e8; word-break: break-all; }
		code { background: #f1f3f4; padding: 2px 4px; border-radius: 4px; }
	</style>
</head>
<body>
	<h1>Link Validation Report</h1>
	<div class="meta">
		<div><strong>Base URL:</strong> <code>${baseUrl}</code></div>
		<div><strong>Project:</strong> <code>${projectName}</code></div>
		<div class="chips">
			<span class="chip all">Total: ${records.length}</span>
			<span class="chip pass">Passed: ${passed}</span>
			<span class="chip fail">Failed: ${failed.length}</span>
		</div>
	</div>

	
			${rows}
		<table>
		<thead>
			<tr>
				<th>Result</th>
				<th>Status</th>
				<th>URL</th>
				<th>Found On</th>
				<th>Type</th>
			</tr>
		</thead>
		<tbody></tbody>
	</table>

</body></html>
  `;
}

export function shortError(error?: string): string | undefined {
  if (!error) {
    return undefined;
  }

  const firstLine = error.split("\n")[0]?.trim();
  return firstLine || undefined;
}