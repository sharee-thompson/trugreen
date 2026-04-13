const fs = require("fs");
const path = require("path");

const baseDir = "accessibility-reports";
const jsonDir = path.join(baseDir, "axe-json");
const htmlDir = path.join(baseDir, "axe-html");

if (!fs.existsSync(jsonDir)) {
  console.error(`JSON directory not found: ${jsonDir}`);
  process.exit(1);
}
if (!fs.existsSync(htmlDir)) {
  console.error(`HTML directory not found: ${htmlDir}`);
  process.exit(1);
}

const files = fs.readdirSync(jsonDir).filter((f) => f.endsWith(".json"));
if (files.length === 0) {
  console.log("No axe JSON reports found.");
  process.exit(0);
}

// --- Collect results ---
const results = files.map((f) => {
  const report = JSON.parse(fs.readFileSync(path.join(jsonDir, f), "utf-8"));

  const violations = report.violations || [];
  const seriousCount = violations.length;

  const baseName = path.basename(f, ".json");
  const [projectPrefix] = baseName.split("_"); // "accessibility" or "accessibility-mobile"

  return {
    project: projectPrefix,
    pageTitle: report.pageTitle || baseName,
    url: report.url || "",
    seriousCount,
    htmlFile: `${baseName}.html`,
  };
});

// --- Group by project ---
const grouped = results.reduce((acc, r) => {
  acc[r.project] = acc[r.project] || [];
  acc[r.project].push(r);
  return acc;
}, {});

const timestamp = new Date().toLocaleString();

// --- Build HTML ---
let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Axe Accessibility Reports</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { margin-bottom: 10px; }
    .timestamp { color: #555; margin-bottom: 1.5rem; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 2rem; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f4f4f4; }
    .pass { color: green; }
    .fail { color: red; }
  </style>
</head>
<body>
  <h1>Axe Accessibility Reports</h1>
  <div class="timestamp">Run on: ${timestamp}</div>
`;

for (const [project, pages] of Object.entries(grouped)) {
  html += `<h2>${project}</h2>`;
  html += `<table>
    <tr>
      <th>Page</th>
      <th>URL</th>
      <th>Serious/Critical Violations</th>
      <th>Report</th>
    </tr>`;

  for (const r of pages) {
    const statusClass = r.seriousCount === 0 ? "pass" : "fail";
    const statusLabel =
      r.seriousCount === 0 ? "✅ 0 Issues" : `❌ ${r.seriousCount} Issues`;

    html += `<tr>
      <td>${r.pageTitle}</td>
      <td><a href="${r.url}" target="_blank">${r.url}</a></td>
      <td class="${statusClass}">${statusLabel}</td>
      <td><a href="./${r.htmlFile}" target="_blank">View Report</a></td>
    </tr>`;
  }

  html += `</table>`;
}

html += `</body></html>`;

// --- Write file ---
const indexPath = path.join(htmlDir, "index.html");
fs.writeFileSync(indexPath, html, "utf-8");

console.log(`✅ Axe index created: ${indexPath}`);
