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

function average(rows, field) {
  if (rows.length === 0) {
    return 0;
  }

  const total = rows.reduce((acc, row) => acc + toNumber(row[field]), 0);
  return total / rows.length;
}

function twoDecimals(value) {
  return value.toFixed(2);
}

function renderEmptyReport() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Performance Audit Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 24px; background: #f7f9fb; color: #0f2144; }
    .card { max-width: 860px; margin: 0 auto; background: #fff; border: 1px solid #dfe1e6; border-radius: 12px; padding: 24px; }
    h1 { margin-top: 0; }
    .muted { color: #5e6c84; }
  </style>
</head>
<body>
  <main class="card">
    <h1>Performance Audit Report</h1>
    <p class="muted">No performance history rows were found yet. Run the performance workflow to populate this report.</p>
  </main>
</body>
</html>`;
}

function renderReport(rows) {
  const latestTimestamp = rows[rows.length - 1]?.timestamp_iso || "n/a";
  const avgScore = twoDecimals(average(rows, "performance_score"));
  const avgFcp = twoDecimals(average(rows, "first_contentful_paint_seconds"));
  const avgLcp = twoDecimals(average(rows, "largest_contentful_paint_seconds"));
  const avgTbt = twoDecimals(average(rows, "total_blocking_time_seconds"));

  const latestRows = rows.slice(-12).reverse();
  const tableRows = latestRows
    .map(
      (row) => `
      <tr>
        <td>${row.timestamp_iso || ""}</td>
        <td>${row.device_profile || ""}</td>
        <td>${row.page_key || ""}</td>
        <td>${row.performance_score || ""}</td>
        <td>${row.first_contentful_paint_seconds || ""}</td>
        <td>${row.largest_contentful_paint_seconds || ""}</td>
        <td>${row.total_blocking_time_seconds || ""}</td>
      </tr>`,
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Performance Audit Report</title>
  <style>
    :root {
      --ink: #0f2144;
      --muted: #5e6c84;
      --panel: #ffffff;
      --border: #dfe1e6;
      --bg: #f7f9fb;
      --good: #1f7a1f;
    }

    body {
      font-family: Arial, sans-serif;
      margin: 0;
      background: var(--bg);
      color: var(--ink);
      padding: 24px;
    }

    .wrap {
      max-width: 1100px;
      margin: 0 auto;
    }

    .panel {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 22px;
      margin-bottom: 18px;
    }

    h1 {
      margin: 0 0 10px;
    }

    .meta {
      color: var(--muted);
      margin: 0;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px;
      margin-top: 16px;
    }

    .stat {
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 12px;
      background: #fbfcfe;
    }

    .label {
      color: var(--muted);
      font-size: 12px;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .value {
      font-size: 24px;
      font-weight: 700;
      color: var(--good);
      margin: 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }

    th, td {
      text-align: left;
      padding: 10px;
      border-bottom: 1px solid var(--border);
    }

    th {
      color: var(--muted);
      font-weight: 600;
      background: #fbfcfe;
    }

    .small {
      color: var(--muted);
      font-size: 13px;
      margin-top: 12px;
    }

    a {
      color: #2563b8;
      text-decoration: none;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <main class="wrap">
    <section class="panel">
      <h1>Performance Audit Report</h1>
      <p class="meta">Latest sample timestamp: ${latestTimestamp}</p>
      <div class="stats">
        <article class="stat">
          <p class="label">Average Score</p>
          <p class="value">${avgScore}</p>
        </article>
        <article class="stat">
          <p class="label">Avg FCP (s)</p>
          <p class="value">${avgFcp}</p>
        </article>
        <article class="stat">
          <p class="label">Avg LCP (s)</p>
          <p class="value">${avgLcp}</p>
        </article>
        <article class="stat">
          <p class="label">Avg TBT (s)</p>
          <p class="value">${avgTbt}</p>
        </article>
      </div>
      <p class="small">Rows analyzed: ${rows.length}. Raw history: <a href="./performance-history-seconds.csv">performance-history-seconds.csv</a></p>
    </section>

    <section class="panel">
      <h2>Recent Measurements</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Device</th>
            <th>Page</th>
            <th>Score</th>
            <th>FCP (s)</th>
            <th>LCP (s)</th>
            <th>TBT (s)</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </section>
  </main>
</body>
</html>`;
}

fs.mkdirSync(reportDir, { recursive: true });

const rows = readRows(csvPath);
const html = rows.length === 0 ? renderEmptyReport() : renderReport(rows);
fs.writeFileSync(outputPath, html, "utf8");

console.log("Performance report generated at performance-report/index.html");
