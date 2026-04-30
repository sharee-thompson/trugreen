const fs = require("fs");
const path = require("path");

const reportDir = path.join(process.cwd(), "performance-report");
const csvPath = path.join(reportDir, "performance-history-seconds.csv");
const outputPath = path.join(reportDir, "index.html");

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

function readRows(filePath) {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const raw = fs.readFileSync(filePath, "utf8").trim();
  if (!raw) {
    return [];
  }

  const lines = raw.split(/\r?\n/);
  if (lines.length <= 1) {
    return [];
  }

  const headers = parseCsvLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i += 1) {
    if (!lines[i].trim()) {
      continue;
    }

    const values = parseCsvLine(lines[i]);
    const row = {};

    headers.forEach((header, idx) => {
      row[header] = values[idx] ?? "";
    });

    rows.push(row);
  }

  return rows;
}

function toNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function formatScore(value) {
  if (!value) {
    return "-";
  }

  const score = toNumber(value);
  return Number.isFinite(score) ? `${score.toFixed(0)}` : "-";
}

function formatMetric(value, digits = 2) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  const numeric = toNumber(value);
  return Number.isFinite(numeric) ? numeric.toFixed(digits) : "-";
}

function formatTimestamp(timestampIso) {
  if (!timestampIso) {
    return "-";
  }

  const date = new Date(timestampIso);
  if (Number.isNaN(date.getTime())) {
    return timestampIso;
  }

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildPageReport(pageKey, pageRows) {
  const sorted = [...pageRows].sort((a, b) =>
    String(b.timestamp_iso || "").localeCompare(String(a.timestamp_iso || "")),
  );

  const latestRunId = sorted[0]?.run_id || "";
  const latestSnapshot = latestRunId
    ? sorted.filter((row) => row.run_id === latestRunId)
    : sorted.slice(0, 2);

  const byDevice = new Map();
  for (const row of sorted) {
    const device = row.device_profile || "unknown";
    const current = byDevice.get(device) || {
      device,
      rows: 0,
      performance_score: 0,
      first_contentful_paint_seconds: 0,
      largest_contentful_paint_seconds: 0,
      interactive_seconds: 0,
      total_blocking_time_seconds: 0,
      cumulative_layout_shift: 0,
    };

    current.rows += 1;
    current.performance_score += toNumber(row.performance_score);
    current.first_contentful_paint_seconds += toNumber(
      row.first_contentful_paint_seconds,
    );
    current.largest_contentful_paint_seconds += toNumber(
      row.largest_contentful_paint_seconds,
    );
    current.interactive_seconds += toNumber(row.interactive_seconds);
    current.total_blocking_time_seconds += toNumber(
      row.total_blocking_time_seconds,
    );
    current.cumulative_layout_shift += toNumber(row.cumulative_layout_shift);
    byDevice.set(device, current);
  }

  const averages = Array.from(byDevice.values()).map((entry) => ({
    device: entry.device,
    rows: entry.rows,
    performance_score: entry.performance_score / entry.rows,
    first_contentful_paint_seconds:
      entry.first_contentful_paint_seconds / entry.rows,
    largest_contentful_paint_seconds:
      entry.largest_contentful_paint_seconds / entry.rows,
    interactive_seconds: entry.interactive_seconds / entry.rows,
    total_blocking_time_seconds: entry.total_blocking_time_seconds / entry.rows,
    cumulative_layout_shift: entry.cumulative_layout_shift / entry.rows,
  }));

  const pageUrl = sorted[0]?.url || "";

  const renderRows = (rowsToRender) =>
    rowsToRender
      .map(
        (row) => `<tr>
        <td>${escapeHtml(formatTimestamp(row.timestamp_iso))}</td>
        <td>${escapeHtml(row.device_profile || "-")}</td>
        <td>${formatScore(row.performance_score)}</td>
        <td>${formatMetric(row.first_contentful_paint_seconds)}</td>
        <td>${formatMetric(row.largest_contentful_paint_seconds)}</td>
        <td>${formatMetric(row.interactive_seconds)}</td>
        <td>${formatMetric(row.total_blocking_time_seconds)}</td>
        <td>${formatMetric(row.cumulative_layout_shift)}</td>
      </tr>`,
      )
      .join("\n");

  const renderAverageRows = averages
    .map(
      (entry) => `<tr>
        <td>${escapeHtml(entry.device)}</td>
        <td>${entry.rows}</td>
        <td>${formatMetric(entry.performance_score)}</td>
        <td>${formatMetric(entry.first_contentful_paint_seconds)}</td>
        <td>${formatMetric(entry.largest_contentful_paint_seconds)}</td>
        <td>${formatMetric(entry.interactive_seconds)}</td>
        <td>${formatMetric(entry.total_blocking_time_seconds)}</td>
        <td>${formatMetric(entry.cumulative_layout_shift)}</td>
      </tr>`,
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Performance: ${escapeHtml(pageKey)}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { margin-bottom: 10px; }
    h2 { margin-top: 2rem; margin-bottom: 0.75rem; }
    .meta { color: #555; margin-bottom: 0.75rem; }
    .hint { color: #555; margin-bottom: 1rem; }
    .table-wrap { width: 100%; overflow-x: auto; }
    table { border-collapse: collapse; width: 100%; min-width: 960px; margin-bottom: 1.75rem; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; vertical-align: top; }
    th { background-color: #f4f4f4; white-space: nowrap; }
  </style>
</head>
<body>
  <h1>Performance Report: ${escapeHtml(pageKey)}</h1>
  <div class="meta"><a href="./index.html">Back to dashboard</a>${
    pageUrl
      ? ` | URL: <a href="${escapeHtml(pageUrl)}" target="_blank" rel="noreferrer">${escapeHtml(pageUrl)}</a>`
      : ""
  }</div>
  <div class="hint">Latest recorded result for this page: ${escapeHtml(formatTimestamp(sorted[0]?.timestamp_iso || ""))} | Latest snapshot rows: ${latestSnapshot.length}</div>

  <h2>Latest Run Snapshot (One Row Per Device)</h2>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Device</th>
          <th>Score</th>
          <th>FCP (S)</th>
          <th>LCP (S)</th>
          <th>TTI (S)</th>
          <th>TBT (S)</th>
          <th>CLS</th>
        </tr>
      </thead>
      <tbody>
        ${renderRows(latestSnapshot)}
      </tbody>
    </table>
  </div>

  <h2>Aggregated by Device (Averages)</h2>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Device</th>
          <th>Rows</th>
          <th>Performance Score</th>
          <th>FCP (S)</th>
          <th>LCP (S)</th>
          <th>TTI (S)</th>
          <th>TBT (S)</th>
          <th>CLS</th>
        </tr>
      </thead>
      <tbody>
        ${renderAverageRows}
      </tbody>
    </table>
  </div>

  <h2>Run History</h2>
  <div class="hint">Run history is cumulative across all past executions for this page.</div>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Device</th>
          <th>Score</th>
          <th>FCP (S)</th>
          <th>LCP (S)</th>
          <th>TTI (S)</th>
          <th>TBT (S)</th>
          <th>CLS</th>
        </tr>
      </thead>
      <tbody>
        ${renderRows(sorted)}
      </tbody>
    </table>
  </div>
</body>
</html>`;
}

function buildDashboard(rows) {
  const byPage = new Map();

  for (const row of rows) {
    const pageKey = row.page_key || "unknown-page";
    const device = row.device_profile || "unknown-device";
    const current = byPage.get(pageKey) || {
      pageKey,
      url: row.url || "",
      desktopScore: null,
      mobileScore: null,
      lastUpdated: row.timestamp_iso || "",
      reportFile: `${pageKey}.html`,
    };

    if (!current.url && row.url) {
      current.url = row.url;
    }

    if (row.timestamp_iso && row.timestamp_iso > current.lastUpdated) {
      current.lastUpdated = row.timestamp_iso;
    }

    if (device === "desktop") {
      current.desktopScore = row.performance_score;
    }

    if (device === "mobile") {
      current.mobileScore = row.performance_score;
    }

    byPage.set(pageKey, current);
  }

  const pages = Array.from(byPage.values()).sort((a, b) =>
    a.pageKey.localeCompare(b.pageKey),
  );

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Performance Audit Reports</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { margin-bottom: 10px; }
    .timestamp { color: #555; margin-bottom: 1.5rem; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 2rem; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f4f4f4; }
    .pass { color: green; }
    .muted { color: #666; }
  </style>
</head>
<body>
  <h1>Performance Audit Reports</h1>
  <div class="timestamp">Run on: ${new Date().toLocaleString()}</div>
  <table>
    <tr>
      <th>Page</th>
      <th>URL</th>
      <th>Latest Desktop Score</th>
      <th>Latest Mobile Score</th>
      <th>Last Updated</th>
      <th>Report</th>
    </tr>`;

  if (pages.length === 0) {
    html += `
    <tr>
      <td colspan="6" class="muted">No performance rows found yet.</td>
    </tr>`;
  } else {
    for (const page of pages) {
      const reportCell = `<a href="./${escapeHtml(page.reportFile)}">View Report</a>`;

      const urlCell = page.url
        ? `<a href="${escapeHtml(page.url)}" target="_blank">${escapeHtml(page.url)}</a>`
        : "-";

      html += `
    <tr>
      <td>${escapeHtml(page.pageKey)}</td>
      <td>${urlCell}</td>
      <td class="pass">${formatScore(page.desktopScore)}</td>
      <td class="pass">${formatScore(page.mobileScore)}</td>
      <td>${escapeHtml(page.lastUpdated || "-")}</td>
      <td>${reportCell}</td>
    </tr>`;
    }
  }

  html += `
  </table>
</body>
</html>`;

  return html;
}

fs.mkdirSync(reportDir, { recursive: true });

const rows = readRows(csvPath);

const rowsByPage = new Map();
for (const row of rows) {
  const pageKey = row.page_key || "unknown-page";
  const pageRows = rowsByPage.get(pageKey) || [];
  pageRows.push(row);
  rowsByPage.set(pageKey, pageRows);
}

for (const [pageKey, pageRows] of rowsByPage.entries()) {
  const pageHtml = buildPageReport(pageKey, pageRows);
  fs.writeFileSync(path.join(reportDir, `${pageKey}.html`), pageHtml, "utf8");
}

const html = buildDashboard(rows);

fs.writeFileSync(outputPath, html, "utf8");

console.log("Performance report generated at performance-report/index.html");
