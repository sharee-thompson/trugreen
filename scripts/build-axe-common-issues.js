const fs = require("fs");
const path = require("path");

const baseDir = "accessibility-reports";
const jsonDir = path.join(baseDir, "axe-json");
const htmlDir = path.join(baseDir, "axe-html");
const groupedDir = path.join(baseDir, "axe-grouped");
const envLabel = process.env.ENV || "prod";

if (!fs.existsSync(jsonDir)) {
  console.error(`JSON directory not found: ${jsonDir}`);
  process.exit(1);
}

if (!fs.existsSync(htmlDir)) {
  console.error(`HTML directory not found: ${htmlDir}`);
  process.exit(1);
}

const files = fs.readdirSync(jsonDir).filter((file) => file.endsWith(".json"));

if (files.length === 0) {
  console.log("No axe JSON reports found.");
  process.exit(0);
}

fs.mkdirSync(groupedDir, { recursive: true });

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeDynamicBits(selector) {
  return selector
    .replace(/:nth-child\([^)]*\)/g, ":nth-child(*)")
    .replace(/#ui-id-\d+/g, "#ui-id-*")
    .replace(/\b(ui-id-|slick-slide|slick-slide-control|tab-)(\d+)\b/g, "$1*")
    .replace(
      /\[(aria-controls|aria-labelledby|for|id)=\"[^\"]*\d+[^\"]*\"\]/g,
      '[$1="*"]',
    )
    .replace(/\b(ct|block|region|paragraph)--?\d+\b/g, "$1*");
}

function splitSelector(selector) {
  return normalizeWhitespace(selector)
    .split(/\s*(?:>|\+|~)\s*|\s+/)
    .filter(Boolean);
}

function normalizeSelector(selector) {
  const compact = normalizeDynamicBits(normalizeWhitespace(selector));
  const segments = splitSelector(compact);
  const tail = segments.slice(-2).join(" > ") || compact;
  return tail;
}

function normalizeTargetList(targets) {
  return uniqueSorted(
    (targets || []).map((target) => normalizeSelector(target)),
  ).join(" | ");
}

function normalizeHtmlSnippet(html) {
  return normalizeWhitespace(html)
    .replace(/\sid=\"[^\"]+\"/g, ' id="*"')
    .replace(/\saria-controls=\"[^\"]+\"/g, ' aria-controls="*"')
    .replace(/\saria-labelledby=\"[^\"]+\"/g, ' aria-labelledby="*"')
    .slice(0, 300);
}

function uniqueSorted(values) {
  return Array.from(new Set(values.filter(Boolean))).sort();
}

function toCountMap(values) {
  const countMap = new Map();

  for (const value of values) {
    countMap.set(value, (countMap.get(value) || 0) + 1);
  }

  return Array.from(countMap.entries())
    .map(([value, count]) => ({ value, count }))
    .sort(
      (left, right) =>
        right.count - left.count || left.value.localeCompare(right.value),
    );
}

const issueGroups = new Map();
const ruleGroups = new Map();
const componentGroups = new Map();
const scannedPageKeys = new Set();
let scannedViolations = 0;
let scannedNodes = 0;

for (const file of files) {
  const filePath = path.join(jsonDir, file);
  const report = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const fileBase = path.basename(file, ".json");
  const htmlReport = path.join("..", "axe-html", `${fileBase}.html`);
  const pageInfo = {
    url: report.url || "",
    pageTitle: report.pageTitle || fileBase,
    reportFile: htmlReport,
    reportName: `${fileBase}.html`,
    project: fileBase.split("_")[0] || "unknown",
  };
  const pageKey = pageInfo.url || fileBase;
  scannedPageKeys.add(pageKey);

  for (const violation of report.violations || []) {
    scannedViolations += 1;

    const ruleKey = violation.id;
    const ruleGroup = ruleGroups.get(ruleKey) || {
      ruleId: violation.id,
      impact: violation.impact || "unknown",
      help: violation.help || "",
      helpUrl: violation.helpUrl || "",
      description: violation.description || "",
      occurrences: 0,
      pages: new Set(),
      projects: new Set(),
      components: new Set(),
    };

    for (const node of violation.nodes || []) {
      scannedNodes += 1;

      const exactTarget = uniqueSorted(node.target || []).join(" | ");
      const normalizedTarget = normalizeTargetList(node.target || []);
      const componentKey =
        normalizedTarget || normalizeHtmlSnippet(node.html || "<unknown>");
      const issueKey = `${violation.id}::${componentKey}`;
      const failureSummary =
        normalizeWhitespace(node.failureSummary || "") ||
        "No failure summary provided";
      const relatedTargets = uniqueSorted(
        (node.any || [])
          .concat(node.all || [])
          .concat(node.none || [])
          .flatMap((check) =>
            (check.relatedNodes || []).flatMap(
              (relatedNode) => relatedNode.target || [],
            ),
          )
          .map((target) => normalizeSelector(target)),
      );
      const issueGroup = issueGroups.get(issueKey) || {
        key: issueKey,
        ruleId: violation.id,
        impact: violation.impact || "unknown",
        help: violation.help || "",
        helpUrl: violation.helpUrl || "",
        description: violation.description || "",
        componentKey,
        sampleTarget: exactTarget || componentKey,
        sampleHtml: normalizeHtmlSnippet(node.html || ""),
        occurrences: 0,
        pageEntries: new Map(),
        urls: new Set(),
        projects: new Set(),
        failureSummaries: new Set(),
        relatedTargets: new Set(),
      };

      issueGroup.occurrences += 1;
      issueGroup.projects.add(pageInfo.project);
      issueGroup.failureSummaries.add(failureSummary);
      for (const relatedTarget of relatedTargets) {
        issueGroup.relatedTargets.add(relatedTarget);
      }

      issueGroup.urls.add(pageInfo.url);

      const pageEntryKey = `${pageInfo.url}::${pageInfo.project}`;

      if (!issueGroup.pageEntries.has(pageEntryKey)) {
        issueGroup.pageEntries.set(pageEntryKey, {
          url: pageInfo.url,
          pageTitle: pageInfo.pageTitle,
          reportFile: pageInfo.reportFile,
          reportName: pageInfo.reportName,
          project: pageInfo.project,
          count: 0,
        });
      }

      issueGroup.pageEntries.get(pageEntryKey).count += 1;
      issueGroups.set(issueKey, issueGroup);

      ruleGroup.occurrences += 1;
      ruleGroup.pages.add(pageInfo.url);
      ruleGroup.projects.add(pageInfo.project);
      ruleGroup.components.add(componentKey);

      const componentGroup = componentGroups.get(componentKey) || {
        componentKey,
        occurrences: 0,
        pages: new Set(),
        projects: new Set(),
        rules: new Set(),
      };

      componentGroup.occurrences += 1;
      componentGroup.pages.add(pageInfo.url);
      componentGroup.projects.add(pageInfo.project);
      componentGroup.rules.add(violation.id);

      componentGroups.set(componentKey, componentGroup);
    }

    ruleGroups.set(ruleKey, ruleGroup);
  }
}

const recurringIssues = Array.from(issueGroups.values())
  .map((group) => ({
    ruleId: group.ruleId,
    impact: group.impact,
    help: group.help,
    helpUrl: group.helpUrl,
    description: group.description,
    componentKey: group.componentKey,
    sampleTarget: group.sampleTarget,
    sampleHtml: group.sampleHtml,
    occurrenceCount: group.occurrences,
    affectedPageCount: group.urls.size,
    affectedProjects: Array.from(group.projects).sort(),
    failureSummaries: Array.from(group.failureSummaries).sort(),
    relatedTargets: Array.from(group.relatedTargets).sort(),
    pages: Array.from(group.pageEntries.values()).sort(
      (left, right) =>
        right.count - left.count || left.url.localeCompare(right.url),
    ),
  }))
  .sort((left, right) => {
    if (right.affectedPageCount !== left.affectedPageCount) {
      return right.affectedPageCount - left.affectedPageCount;
    }
    if (right.occurrenceCount !== left.occurrenceCount) {
      return right.occurrenceCount - left.occurrenceCount;
    }
    return left.ruleId.localeCompare(right.ruleId);
  });

const ruleSummary = Array.from(ruleGroups.values())
  .map((group) => ({
    ruleId: group.ruleId,
    impact: group.impact,
    help: group.help,
    helpUrl: group.helpUrl,
    description: group.description,
    occurrenceCount: group.occurrences,
    affectedPageCount: group.pages.size,
    affectedProjects: Array.from(group.projects).sort(),
    recurringComponentCount: group.components.size,
  }))
  .sort((left, right) => {
    if (right.affectedPageCount !== left.affectedPageCount) {
      return right.affectedPageCount - left.affectedPageCount;
    }
    if (right.occurrenceCount !== left.occurrenceCount) {
      return right.occurrenceCount - left.occurrenceCount;
    }
    return left.ruleId.localeCompare(right.ruleId);
  });

const componentSummary = Array.from(componentGroups.values())
  .map((group) => ({
    componentKey: group.componentKey,
    occurrenceCount: group.occurrences,
    affectedPageCount: group.pages.size,
    affectedProjects: Array.from(group.projects).sort(),
    rules: Array.from(group.rules).sort(),
  }))
  .sort((left, right) => {
    if (right.affectedPageCount !== left.affectedPageCount) {
      return right.affectedPageCount - left.affectedPageCount;
    }
    if (right.occurrenceCount !== left.occurrenceCount) {
      return right.occurrenceCount - left.occurrenceCount;
    }
    return left.componentKey.localeCompare(right.componentKey);
  });

const summary = {
  generatedAt: new Date().toISOString(),
  env: envLabel,
  scannedPages: scannedPageKeys.size,
  scannedViolations,
  scannedNodes,
  recurringIssueCount: recurringIssues.length,
  ruleCount: ruleSummary.length,
  componentCount: componentSummary.length,
};

const output = {
  summary,
  groupingLogic: {
    primaryKey: "ruleId + normalized selector tail",
    selectorNormalization: [
      "collapse whitespace",
      "replace nth-child() values with *",
      "replace common generated ids like #ui-id-23 with wildcards",
      "keep only the last one to two selector segments to reduce page-specific parent wrappers",
    ],
    purpose: [
      "show recurring issues once with all affected pages underneath",
      "preserve page-level evidence for audit follow-up",
      "surface candidate shared components separately from per-page failures",
    ],
  },
  ruleSummary,
  componentSummary,
  recurringIssues,
};

const jsonOutputPath = path.join(groupedDir, `common-issues-${envLabel}.json`);
fs.writeFileSync(jsonOutputPath, JSON.stringify(output, null, 2), "utf-8");

const ruleRows = ruleSummary
  .slice(0, 25)
  .map(
    (rule) => `<tr>
      <td><code>${escapeHtml(rule.ruleId)}</code></td>
      <td>${escapeHtml(rule.impact)}</td>
      <td>${rule.affectedPageCount}</td>
      <td>${rule.occurrenceCount}</td>
      <td>
        <div>${escapeHtml(rule.help)}</div>
        <div class="rule-link"><a href="${escapeHtml(rule.helpUrl)}" target="_blank" rel="noreferrer">Deque rule reference</a></div>
      </td>
    </tr>`,
  )
  .join("\n");

const issueSections = recurringIssues
  .slice(0, 50)
  .map((issue) => {
    const pageItems = issue.pages
      .slice(0, 12)
      .map(
        (page) => `<li>
          <a href="${escapeHtml(page.reportFile)}" target="_blank" rel="noreferrer">${escapeHtml(page.pageTitle)}</a>
          <span class="meta">${escapeHtml(page.project)} · ${page.count} occurrence(s)</span>
          <div class="url"><a href="${escapeHtml(page.url)}" target="_blank" rel="noreferrer">${escapeHtml(page.url)}</a></div>
        </li>`,
      )
      .join("\n");

    const failureItems = issue.failureSummaries
      .slice(0, 3)
      .map((summaryItem) => `<li>${escapeHtml(summaryItem)}</li>`)
      .join("\n");

    const relatedTargets = issue.relatedTargets.length
      ? `<div class="subtle"><strong>Related targets:</strong> ${escapeHtml(issue.relatedTargets.slice(0, 5).join(" | "))}</div>`
      : "";

    return `<section class="issue-card" id="${escapeHtml(slugify(`${issue.ruleId}-${issue.componentKey}`))}">
      <div class="issue-header">
        <h3><code>${escapeHtml(issue.ruleId)}</code> on <span>${escapeHtml(issue.componentKey)}</span></h3>
        <div class="badges">
          <span class="badge impact-${escapeHtml(issue.impact)}">${escapeHtml(issue.impact)}</span>
          <span class="badge">${issue.affectedPageCount} page(s)</span>
          <span class="badge">${issue.occurrenceCount} occurrence(s)</span>
        </div>
      </div>
      <p>${escapeHtml(issue.help)}</p>
      <div class="rule-link"><a href="${escapeHtml(issue.helpUrl)}" target="_blank" rel="noreferrer">Open Deque rule reference</a></div>
      <div class="subtle"><strong>Sample target:</strong> ${escapeHtml(issue.sampleTarget)}</div>
      <pre>${escapeHtml(issue.sampleHtml)}</pre>
      ${relatedTargets}
      <details>
        <summary>Failure details</summary>
        <ul>${failureItems}</ul>
      </details>
      <details open>
        <summary>Affected pages</summary>
        <ul class="page-list">${pageItems}</ul>
      </details>
    </section>`;
  })
  .join("\n");

const componentRows = componentSummary
  .slice(0, 25)
  .map(
    (component) => `<tr>
      <td><code>${escapeHtml(component.componentKey)}</code></td>
      <td>${component.affectedPageCount}</td>
      <td>${component.occurrenceCount}</td>
      <td>${escapeHtml(component.rules.join(", "))}</td>
    </tr>`,
  )
  .join("\n");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Axe Common Issues Report</title>
  <style>
    body {
      margin: 20px;
      font-family: Arial, sans-serif;
      background: #ffffff;
      color: #333333;
    }

    h1 {
      margin-bottom: 10px;
    }

    h2 {
      margin-top: 32px;
      margin-bottom: 12px;
    }

    .lede {
      max-width: 78ch;
      color: #555555;
      font-size: 0.98rem;
      margin-bottom: 20px;
    }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 12px;
      margin: 16px 0 24px;
    }

    .summary-card {
      border: 1px solid #dddddd;
      background: #fafafa;
      padding: 10px 12px;
    }

    .summary-card .label {
      color: #555555;
      display: block;
      margin-bottom: 4px;
      font-size: 0.9rem;
    }

    .summary-card .value {
      font-size: 1.6rem;
      font-weight: 600;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0 24px;
    }

    th,
    td {
      border: 1px solid #dddddd;
      padding: 8px;
      text-align: left;
      vertical-align: top;
    }

    th {
      background-color: #f4f4f4;
    }

    .issue-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .issue-card {
      border: 1px solid #dddddd;
      background: #ffffff;
      padding: 12px 12px 14px;
    }

    .issue-header {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: flex-start;
      flex-wrap: wrap;
      margin-bottom: 6px;
    }

    .badges {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      font-size: 0.85rem;
    }

    .badge {
      border-radius: 3px;
      padding: 2px 8px;
      border: 1px solid #dddddd;
      background: #f4f4f4;
    }

    .impact-critical,
    .impact-serious {
      color: #ffffff;
      background: #c0392b;
      border-color: #c0392b;
    }

    .impact-moderate {
      background: #f9e79f;
      border-color: #f1c40f;
    }

    .impact-minor {
      background: #d4efdf;
      border-color: #27ae60;
    }

    .subtle,
    .meta,
    .url {
      color: #666666;
      font-size: 0.9rem;
    }

    .rule-link {
      margin: 6px 0 10px;
      font-size: 0.9rem;
    }

    .page-list {
      padding-left: 18px;
    }

    .page-list li + li {
      margin-top: 8px;
    }

    pre,
    code {
      font-family: "SFMono-Regular", Consolas, monospace;
      font-size: 0.85rem;
    }

    pre {
      overflow-x: auto;
      background: #f8f8f8;
      padding: 8px;
      border: 1px solid #dddddd;
      margin: 8px 0;
    }

    a {
      color: #114b85;
    }

    @media (max-width: 720px) {
      body {
        margin: 12px;
      }

      th,
      td {
        padding: 6px;
      }
    }
  </style>
</head>
<body>
  <main>
    <h1>Axe Common Issues Report</h1>
    <p class="lede">This report groups repeated axe violations across pages so you can track one engineering issue with a clear list of affected pages. It keeps the existing per-page HTML reports intact and adds a triage-oriented view on top.</p>

    <div class="summary-grid">
      <div class="summary-card"><span class="label">Environment</span><span class="value">${escapeHtml(summary.env)}</span></div>
      <div class="summary-card"><span class="label">Pages scanned</span><span class="value">${summary.scannedPages}</span></div>
      <div class="summary-card"><span class="label">Violations scanned</span><span class="value">${summary.scannedViolations}</span></div>
      <div class="summary-card"><span class="label">Failing nodes</span><span class="value">${summary.scannedNodes}</span></div>
      <div class="summary-card"><span class="label">Recurring issue groups</span><span class="value">${summary.recurringIssueCount}</span></div>
    </div>

    <h2>Top Rules</h2>
    <table>
      <thead>
        <tr>
          <th>Rule</th>
          <th>Impact</th>
          <th>Pages</th>
          <th>Occurrences</th>
          <th>Help</th>
        </tr>
      </thead>
      <tbody>
        ${ruleRows}
      </tbody>
    </table>

    <h2>Top Component Candidates</h2>
    <table>
      <thead>
        <tr>
          <th>Normalized selector</th>
          <th>Pages</th>
          <th>Occurrences</th>
          <th>Rules</th>
        </tr>
      </thead>
      <tbody>
        ${componentRows}
      </tbody>
    </table>

    <h2>Recurring Issues</h2>
    <div class="issue-list">
      ${issueSections}
    </div>
  </main>
</body>
</html>`;

const htmlOutputPath = path.join(groupedDir, `common-issues-${envLabel}.html`);
fs.writeFileSync(htmlOutputPath, html, "utf-8");

console.log(`Saved grouped JSON report to: ${jsonOutputPath}`);
console.log(`Saved grouped HTML report to: ${htmlOutputPath}`);
console.log(
  `Grouped ${summary.scannedNodes} failing node(s) into ${summary.recurringIssueCount} recurring issue group(s).`,
);
