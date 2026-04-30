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

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
      const reportPath = path.join(reportDir, page.reportFile);
      const hasReport = fs.existsSync(reportPath);

      const reportCell = hasReport
        ? `<a href="./${escapeHtml(page.reportFile)}" target="_blank">View Report</a>`
        : `<span class="muted">Report not found</span>`;

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
const html = buildDashboard(rows);

fs.writeFileSync(outputPath, html, "utf8");

console.log("Performance report generated at performance-report/index.html");
