const fs = require("fs");
const path = require("path");

const dashboardSeoDir = path.join(process.cwd(), "dashboard", "seo");
const historyDir = path.join(dashboardSeoDir, "history");
const latestCsvPath = path.join(dashboardSeoDir, "seo-page-audit-latest.csv");
const latestJsonPath = path.join(dashboardSeoDir, "seo-page-audit-latest.json");
const baselineDir = path.join(dashboardSeoDir, "baseline");
const baselineCsvPath = path.join(baselineDir, "seo-baseline-latest.csv");
const baselineJsonPath = path.join(baselineDir, "seo-baseline-latest.json");
const playwrightReportPath = path.join(
  dashboardSeoDir,
  "playwright-report",
  "index.html",
);

fs.mkdirSync(dashboardSeoDir, { recursive: true });

function formatTimestamp(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });
}

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
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

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }

  const headers = parseCsvLine(lines[0]);
  const rows = lines.slice(1).map(parseCsvLine);
  return { headers, rows };
}

function formatHistoryBaseName(baseName) {
  const timestampPart = baseName.replace(/^seo-page-audit-[^-]+-/, "");
  const match = timestampPart.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2})-(\d{2})-(\d{2})-(\d{3})Z$/,
  );

  if (!match) {
    return baseName;
  }

  const [, year, month, day, hour, minute, second, millisecond] = match;
  return formatTimestamp(
    `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`,
  );
}

function buildPreviewTable() {
  if (!fileExists(latestCsvPath)) {
    return `<p class="empty-state">No SEO CSV has been published yet.</p>`;
  }

  const { headers, rows } = parseCsv(fs.readFileSync(latestCsvPath, "utf8"));
  const previewRows = rows.slice(0, 12);

  if (headers.length === 0) {
    return `<p class="empty-state">The latest SEO CSV is empty.</p>`;
  }

  return `
    <div class="table-shell">
      <table>
        <thead>
          <tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${previewRows
            .map(
              (row) =>
                `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`,
            )
            .join("\n")}
        </tbody>
      </table>
    </div>
  `;
}

function getLatestGeneratedAt() {
  if (!fileExists(latestJsonPath)) {
    return null;
  }

  try {
    const parsed = JSON.parse(fs.readFileSync(latestJsonPath, "utf8"));
    return parsed.generatedAt || null;
  } catch {
    return null;
  }
}

function getBaselineSummary() {
  if (!fileExists(baselineJsonPath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(baselineJsonPath, "utf8"));
  } catch {
    return null;
  }
}

function getBaselineDownloadTargets(baselineSummary) {
  if (!baselineSummary) {
    return {
      csvHref: "./baseline/seo-baseline-latest.csv",
      jsonHref: "./baseline/seo-baseline-latest.json",
      csvExists: fileExists(baselineCsvPath),
      jsonExists: fileExists(baselineJsonPath),
    };
  }

  const baselineSlug = slugify(baselineSummary.baselineLabel || "default");
  const labeledCsvName = `seo-baseline-${baselineSlug}-latest.csv`;
  const labeledJsonName = `seo-baseline-${baselineSlug}-latest.json`;
  const labeledCsvPath = path.join(baselineDir, labeledCsvName);
  const labeledJsonPath = path.join(baselineDir, labeledJsonName);

  return {
    csvHref: fileExists(labeledCsvPath)
      ? `./baseline/${labeledCsvName}`
      : "./baseline/seo-baseline-latest.csv",
    jsonHref: fileExists(labeledJsonPath)
      ? `./baseline/${labeledJsonName}`
      : "./baseline/seo-baseline-latest.json",
    csvExists: fileExists(labeledCsvPath) || fileExists(baselineCsvPath),
    jsonExists: fileExists(labeledJsonPath) || fileExists(baselineJsonPath),
  };
}

function getSavedBaselines() {
  if (!fileExists(baselineDir)) {
    return [];
  }

  return fs
    .readdirSync(baselineDir)
    .filter((file) =>
      /^seo-baseline-(?!latest\.)[a-z0-9-]+-latest\.json$/i.test(file),
    )
    .map((file) => {
      const filePath = path.join(baselineDir, file);

      try {
        const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
        const baseName = file.replace(/\.json$/i, "");
        const csvName = `${baseName}.csv`;
        return {
          label: parsed.baselineLabel || baseName,
          generatedAt: parsed.generatedAt || null,
          coverage: parsed.coverage || null,
          mergedRuns: Array.isArray(parsed.sourceRuns)
            ? parsed.sourceRuns.length
            : 0,
          csvHref: `./baseline/${csvName}`,
          csvExists: fileExists(path.join(baselineDir, csvName)),
          jsonHref: `./baseline/${file}`,
        };
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .sort((left, right) => {
      const leftTime = left.generatedAt ? Date.parse(left.generatedAt) : 0;
      const rightTime = right.generatedAt ? Date.parse(right.generatedAt) : 0;
      return rightTime - leftTime;
    });
}

function getHistoryRuns() {
  if (!fileExists(historyDir)) {
    return [];
  }

  const grouped = new Map();
  const files = fs
    .readdirSync(historyDir)
    .filter((file) => /\.(csv|json)$/i.test(file))
    .sort()
    .reverse();

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const baseName = file.slice(0, -ext.length);
    const existing = grouped.get(baseName) || { baseName };
    if (ext === ".csv") {
      existing.csv = file;
    }
    if (ext === ".json") {
      existing.json = file;
    }
    grouped.set(baseName, existing);
  }

  return Array.from(grouped.values())
    .slice(0, 5)
    .map((item) => ({
      ...item,
      label: formatHistoryBaseName(item.baseName),
    }));
}

const latestGeneratedAt = getLatestGeneratedAt();
const baselineSummary = getBaselineSummary();
const baselineDownloads = getBaselineDownloadTargets(baselineSummary);
const savedBaselines = getSavedBaselines();
const historyRuns = getHistoryRuns();
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Technical SEO Audit</title>
  <style>
    :root {
      --navy: #172b4d;
      --text: #0f2144;
      --muted: #5e6c84;
      --background: #f7f9fb;
      --card: #ffffff;
      --border: #dfe1e6;
      --button: #2563b8;
      --button-hover: #174ea6;
      --shadow: rgba(0, 0, 0, 0.06);
    }

    * { box-sizing: border-box; }
    body { margin: 0; font-family: Arial, sans-serif; background: var(--background); color: var(--text); }
    .page { max-width: 1400px; margin: 0 auto; padding: 36px 24px 48px; }
    .breadcrumbs { margin-bottom: 12px; }
    .breadcrumbs a { color: var(--button); text-decoration: none; font-weight: 700; }
    h1 { margin: 0 0 10px; font-size: 34px; color: var(--navy); }
    .subtitle { margin: 0; color: var(--muted); }
    .meta { margin-top: 14px; color: var(--muted); font-size: 14px; }
    .layout { display: grid; gap: 24px; margin-top: 28px; }
    .panel { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 20px; box-shadow: 0 2px 8px var(--shadow); }
    .links { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; }
    .button { display: inline-block; padding: 10px 14px; background: var(--button); color: #fff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; }
    .button:hover { background: var(--button-hover); }
    .history-list { display: grid; gap: 12px; margin-top: 16px; }
    .history-item { display: flex; justify-content: space-between; gap: 16px; padding: 14px 16px; border: 1px solid var(--border); border-radius: 10px; background: #fbfcfe; }
    .history-item-title { font-weight: 700; }
    .history-item-links a { color: var(--button); text-decoration: none; font-weight: 700; margin-left: 10px; }
    .table-shell { overflow: auto; border: 1px solid var(--border); border-radius: 12px; margin-top: 16px; }
    table { width: 100%; border-collapse: collapse; min-width: 1200px; }
    th, td { padding: 10px 12px; border-bottom: 1px solid var(--border); text-align: left; vertical-align: top; font-size: 13px; }
    th { position: sticky; top: 0; background: #eef3f9; color: var(--navy); }
    tr:nth-child(even) td { background: #fcfdff; }
    .empty-state { color: var(--muted); font-style: italic; }
    @media (max-width: 720px) {
      .page { padding: 24px 16px 36px; }
      .history-item { flex-direction: column; }
      .history-item-links a { margin-left: 0; margin-right: 10px; }
    }
  </style>
</head>
<body>
  <main class="page">
    <p class="breadcrumbs"><a href="../index.html">Back to dashboard</a></p>
    <h1>Technical SEO Audit</h1>
    <p class="subtitle">Rendered sitemap-seeded SEO audit results, recent run history, and raw report downloads.</p>
    <p class="meta">Latest published run: ${latestGeneratedAt ? escapeHtml(formatTimestamp(latestGeneratedAt)) : "Not available yet"}</p>

    <section class="panel">
      <h2>Merged Baseline</h2>
      ${
        baselineSummary
          ? `<p>Label: <strong>${escapeHtml(baselineSummary.baselineLabel || "default")}</strong></p>
      <p class="meta">Coverage: ${escapeHtml(String(baselineSummary.coverage?.mergedAuditedUrls ?? 0))} / ${escapeHtml(String(baselineSummary.coverage?.totalKnownSitemapUrls ?? "unknown"))} URLs${baselineSummary.coverage?.percent !== null && baselineSummary.coverage?.percent !== undefined ? ` (${escapeHtml(String(baselineSummary.coverage.percent))}%)` : ""}</p>
      <p class="meta">Merged runs: ${escapeHtml(String((baselineSummary.sourceRuns || []).length))}</p>
      <div class="links">
        ${baselineDownloads.csvExists ? `<a class="button" href="${baselineDownloads.csvHref}" target="_blank" rel="noopener noreferrer">Download Baseline CSV</a>` : ""}
        ${baselineDownloads.jsonExists ? `<a class="button" href="${baselineDownloads.jsonHref}" target="_blank" rel="noopener noreferrer">Download Baseline JSON</a>` : ""}
      </div>`
          : '<p class="empty-state">No merged baseline has been built yet.</p>'
      }
    </section>

    <section class="panel">
      <h2>Saved Baselines</h2>
      ${
        savedBaselines.length === 0
          ? '<p class="empty-state">No labeled baselines have been saved yet.</p>'
          : `
        <div class="history-list">
          ${savedBaselines
            .map(
              (baseline) => `
            <div class="history-item">
              <div>
                <div class="history-item-title">${escapeHtml(baseline.label)}</div>
                <div class="meta">Generated: ${escapeHtml(baseline.generatedAt ? formatTimestamp(baseline.generatedAt) : "Unknown")}</div>
                <div class="meta">Coverage: ${escapeHtml(String(baseline.coverage?.mergedAuditedUrls ?? 0))} / ${escapeHtml(String(baseline.coverage?.totalKnownSitemapUrls ?? "unknown"))} URLs${baseline.coverage?.percent !== null && baseline.coverage?.percent !== undefined ? ` (${escapeHtml(String(baseline.coverage.percent))}%)` : ""}</div>
                <div class="meta">Merged runs: ${escapeHtml(String(baseline.mergedRuns))}</div>
              </div>
              <div class="history-item-links">
                ${baseline.csvExists ? `<a href="${baseline.csvHref}" target="_blank" rel="noopener noreferrer">CSV</a>` : ""}
                <a href="${baseline.jsonHref}" target="_blank" rel="noopener noreferrer">JSON</a>
              </div>
            </div>
          `,
            )
            .join("\n")}
        </div>
      `
      }
    </section>

    <section class="panel">
      <h2>Latest Report</h2>
      <p>Use the HTML table below for quick review, then download the raw CSV or JSON when you need to filter or inspect the full dataset.</p>
      <div class="links">
        ${fileExists(latestCsvPath) ? '<a class="button" href="./seo-page-audit-latest.csv" target="_blank" rel="noopener noreferrer">Download Latest CSV</a>' : ""}
        ${fileExists(latestJsonPath) ? '<a class="button" href="./seo-page-audit-latest.json" target="_blank" rel="noopener noreferrer">Download Latest JSON</a>' : ""}
        ${fileExists(playwrightReportPath) ? '<a class="button" href="./playwright-report/index.html" target="_blank" rel="noopener noreferrer">Open Playwright Report</a>' : ""}
      </div>
      ${buildPreviewTable()}
    </section>

    <section class="panel">
      <h2>Previous 5 CSV Runs</h2>
      ${
        historyRuns.length === 0
          ? '<p class="empty-state">No historical SEO snapshots have been published yet.</p>'
          : `
        <div class="history-list">
          ${historyRuns
            .map(
              (run) => `
            <div class="history-item">
              <div>
                <div class="history-item-title">${escapeHtml(run.label)}</div>
                <div class="meta">${escapeHtml(run.baseName)}</div>
              </div>
              <div class="history-item-links">
                ${run.csv ? `<a href="./history/${run.csv}" target="_blank" rel="noopener noreferrer">Download CSV</a>` : ""}
              </div>
            </div>
          `,
            )
            .join("\n")}
        </div>
      `
      }
    </section>
  </main>
</body>
</html>`;

fs.writeFileSync(path.join(dashboardSeoDir, "index.html"), html, "utf8");
console.log("SEO dashboard page generated at dashboard/seo/index.html");
