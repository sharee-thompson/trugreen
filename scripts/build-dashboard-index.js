const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const dashboardDir = path.join(process.cwd(), "dashboard");
const generatedAt = new Date();

const dashboardMeta = {
  team: "VML AQ Automation POC",
  purpose:
    "Provide one place to review published automation results, understand what each test area protects, and decide what follow-up is needed.",
  runFrequency:
    "<strong>Daily:</strong> smoke, api, functional, visual<br><strong>Weekly:</strong> performance, storybook, link validation<br><strong>Monthly:</strong> accessibility, analytics<br>All times 8:00 AM Central. On-demand runs also available for most suites.",
  contact: "Sharee Thompson / Jessica Zager",
};

const resultDefinitions = [
  {
    label: "Passed",
    icon: "✅",
    description:
      "The checks completed successfully for that run. Review only if the result contradicts an expected product or release change.",
  },
  {
    label: "Failed",
    icon: "❌",
    description:
      "At least one check found a problem or could not complete. Review the failing step first, confirm business impact, and decide whether to create or update a defect.",
  },
  {
    label: "Flaky",
    icon: "⚠️",
    description:
      "The same test behaves inconsistently across runs. Treat this as an investigation item because it reduces trust in release signals even when the product is healthy.",
  },
  {
    label: "Skipped",
    icon: "⏭️",
    description:
      "The test did not run by design or due to environment constraints. Verify whether the skip is expected before using the suite as release evidence.",
  },
];

const reviewWorkflow = [
  "Start with the suite that best matches the release area or reported issue.",
  "Read the report summary and latest status before opening raw Playwright details.",
  "If a run fails, confirm whether the issue is reproducible, environment-specific, or an expected product change.",
  "If a run is flaky or skipped, flag it for human review before using it as release confidence evidence.",
  "Escalate validated issues to the owning QA, dev, or product contact with the report link and a short impact summary.",
];

fs.mkdirSync(dashboardDir, { recursive: true });

const reports = [
  {
    key: "smoke",
    title: "Smoke Tests",
    description:
      "Daily core site health checks for the TruGreen automation pilot.",
    whatItChecks:
      "Confirms that key pages load and core site experiences are available before deeper testing begins.",
    whyItMatters:
      "This protects basic site health and provides an early release-confidence signal across the highest-value user journeys.",
    nextSteps:
      "If smoke fails, review the first broken page or assertion, confirm whether the issue is environment-specific, and route it to the owning dev or QA contact before relying on downstream suite results.",
    links: [
      {
        label: "View Smoke Report",
        href: "./smoke/playwright-report/index.html",
        exists: "smoke/playwright-report/index.html",
      },
    ],
  },
  {
    key: "accessibility",
    title: "Accessibility Audit",
    description: "Axe accessibility scan results and grouped common issues.",
    whatItChecks:
      "Runs automated accessibility checks to highlight violations, recurring patterns, and shared component-level issues.",
    whyItMatters:
      "This helps the team catch accessibility regressions early and compare recurring issues across releases and environments.",
    nextSteps:
      "Review the common issues view first, identify whether findings are new or recurring, and confirm whether the issue should be fixed in a shared component, content template, or page-specific implementation.",
    links: [
      {
        label: "View Accessibility Report",
        href: "./accessibility/accessibility-reports/axe-html/index.html",
        exists: "accessibility/accessibility-reports/axe-html/index.html",
      },
      {
        label: "View Common Issues",
        href: "./accessibility/accessibility-reports/axe-grouped/common-issues-prod.html",
        exists:
          "accessibility/accessibility-reports/axe-grouped/common-issues-prod.html",
      },
    ],
  },
  {
    key: "analytics",
    title: "Analytics Validation",
    description: "GA4, dataLayer, and outbound tracking validation results.",
    whatItChecks:
      "Validates whether critical analytics events fire with the expected tracking configuration.",
    whyItMatters:
      "This protects reporting integrity, analytics QA signoff, and confidence that releases do not break measurement.",
    nextSteps:
      "If analytics checks fail, confirm whether the event is missing, delayed, or misconfigured, then involve the dev or analytics owner with the failing report and affected tracking details.",
    links: [
      {
        label: "View Analytics Report",
        href: "./analytics/playwright-report/index.html",
        exists: "analytics/playwright-report/index.html",
      },
    ],
  },
  {
    key: "api",
    title: "API Validation",
    description: "API integration checks for key TruGreen endpoints.",
    whatItChecks:
      "Checks whether key service endpoints respond successfully and return expected data for monitored scenarios.",
    whyItMatters:
      "This protects integration reliability and helps catch service-side issues that may not be obvious from UI behavior alone.",
    nextSteps:
      "If an API check fails, confirm the response status and payload behavior first, then determine whether the problem belongs to the upstream service, environment configuration, or downstream site dependency.",
    links: [
      {
        label: "View API Report",
        href: "./api/playwright-report/index.html",
        exists: "api/playwright-report/index.html",
      },
    ],
  },
  {
    key: "performance",
    title: "Performance Audit",
    description: "Performance scan results and historical page speed metrics.",
    whatItChecks:
      "Tracks Lighthouse-based performance results over time to show lab-measured speed and stability trends.",
    whyItMatters:
      "This helps the team spot regressions in loading and rendering behavior before they become visible customer experience issues.",
    nextSteps:
      "Review metric-level changes before focusing on the overall score, confirm whether the regression is lab-only or likely user-facing, and compare recent runs before escalating.",
    links: [
      {
        label: "View Performance Report",
        href: "./performance/performance-report/index.html",
        exists: "performance/performance-report/index.html",
      },
    ],
  },
  {
    key: "visual",
    title: "Visual Regression",
    description:
      "Visual comparison results for standard site pages and landing pages.",
    whatItChecks:
      "Compares current screenshots for core site pages and landing pages against approved baselines to detect layout, styling, and rendering changes.",
    whyItMatters:
      "This protects presentation quality across customer-facing pages and landing experiences, helping separate intended UI changes from unexpected regressions.",
    nextSteps:
      "If a visual diff appears, check whether the change matches an expected release update, then decide whether to accept a new baseline or raise a defect for unintended UI drift on either the standard site or landing pages.",
    links: [
      {
        label: "View Visual Report",
        href: "./visual/playwright-report/index.html",
        exists: "visual/playwright-report/index.html",
      },
    ],
  },
  {
    key: "storybook",
    title: "Storybook Visual Regression",
    description: "Component snapshot results for published Storybook stories.",
    whatItChecks:
      "Runs visual snapshot checks against Storybook stories tagged for test coverage to catch component-level UI drift.",
    whyItMatters:
      "This protects shared UI building blocks before regressions spread into full pages and customer journeys.",
    nextSteps:
      "If a Storybook diff appears, compare it to the intended component change first, then decide whether to update the baseline or open a defect for unintended visual drift.",
    links: [
      {
        label: "View Storybook Report",
        href: "./storybook/playwright-report/index.html",
        exists: "storybook/playwright-report/index.html",
      },
      {
        label: "View Storybook Inventory",
        href: "./storybook/storybook-inventory.md",
        exists: "storybook/storybook-inventory.md",
      },
    ],
  },
  {
    key: "functional",
    title: "Functional Validation",
    description:
      "Checks for landing page component visibility, sanity checks for critical user flows, and general smoke tests.",
    whatItChecks:
      "Landing page components and key steps in selected user flows (buy-online).",
    whyItMatters:
      "This protects high-value business paths tied directly to conversion, revenue, or other strategic goals.",
    nextSteps:
      "If a test fails, identify the earliest blocked step, confirm business impact, and route it quickly because conversion-path failures usually need same-day triage. As more tests are added, review each for its specific business impact.",
    links: [
      {
        label: "View Functional Test Report",
        href: "./functional/playwright-report/index.html",
        exists: "functional/playwright-report/index.html",
      },
    ],
  },
  {
    key: "link",
    title: "Link Validation",
    description:
      "Homepage-driven link checks for internal and external URL health.",
    whatItChecks:
      "Checks for broken or unreachable links so the team can spot navigation and destination issues early.",
    whyItMatters:
      "This protects content quality, SEO-sensitive paths, and customer trust when moving through the site.",
    nextSteps:
      "When enabled, review failures for repeated patterns first, separate blocked third-party destinations from real site defects, and prioritize broken customer-path links for follow-up.",
    links: [
      {
        label: "View Link Report",
        href: "./link/playwright-report/index.html",
        exists: "link/playwright-report/index.html",
      },
    ],
  },
];

function fileExists(relativePath) {
  return fs.existsSync(path.join(dashboardDir, relativePath));
}

function formatTimestamp(date) {
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

function renderTextList(items, className) {
  return `
    <ul class="${className}">
      ${items.map((item) => `<li>${item}</li>`).join("\n")}
    </ul>
  `;
}

function renderDefinitions(items) {
  return items
    .map(
      (item) => `
        <div class="definition-item">
          <h3><span class="definition-icon">${item.icon}</span>${item.label}</h3>
          <p>${item.description}</p>
        </div>
      `,
    )
    .join("\n");
}

function renderLinks(report) {
  if (report.comingSoon) {
    return `<p class="not-ready">Coming soon.</p>`;
  }

  const availableLinks = report.links.filter((link) => fileExists(link.exists));

  if (availableLinks.length === 0) {
    return `<p class="not-ready">No report published yet.</p>`;
  }

  return availableLinks
    .map(
      (link) =>
        `<a class="button" href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>`,
    )
    .join("\n");
}

function readPlaywrightMeta(reportHtmlPath) {
  try {
    const html = fs.readFileSync(reportHtmlPath, "utf8");
    const match = html.match(
      /<template id="playwrightReportBase64">data:application\/zip;base64,([A-Za-z0-9+/=]+)<\/template>/,
    );

    if (!match) {
      return null;
    }

    const tempZipPath = path.join(
      os.tmpdir(),
      `playwright-report-${process.pid}-${Date.now()}.zip`,
    );
    fs.writeFileSync(tempZipPath, Buffer.from(match[1], "base64"));

    let reportJson;
    try {
      reportJson = execFileSync("unzip", ["-p", tempZipPath, "report.json"], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      });
    } finally {
      if (fs.existsSync(tempZipPath)) {
        fs.unlinkSync(tempZipPath);
      }
    }

    const parsed = JSON.parse(reportJson);

    let startTime = null;
    if (parsed && parsed.startTime) {
      const parsedStartTime = new Date(parsed.startTime);
      if (!Number.isNaN(parsedStartTime.getTime())) {
        startTime = parsedStartTime;
      }
    }

    return {
      stats: parsed && parsed.stats ? parsed.stats : null,
      startTime,
    };
  } catch {
    return null;
  }
}

function getLatestRunMeta(report) {
  if (report.comingSoon) {
    return {
      latestRunText: "Coming soon",
      latestResultText: "Planned",
      latestResultClass: "planned",
    };
  }

  const availableLinks = report.links.filter((link) => fileExists(link.exists));
  if (availableLinks.length === 0) {
    return {
      latestRunText: "No run published yet",
      latestResultText: "No result yet",
      latestResultClass: "unknown",
    };
  }

  // Read the timestamp from last-run.json written by the workflow, rather than
  // relying on mtime (which is reset by every git checkout of gh-pages).
  let latestRunDate = null;
  let runEnvironment = null;
  let baselineEnvironment = null;
  let baselineUpdatedAt = null;
  const lastRunPath = path.join(dashboardDir, report.key, "last-run.json");
  if (fs.existsSync(lastRunPath)) {
    try {
      const meta = JSON.parse(fs.readFileSync(lastRunPath, "utf8"));
      if (meta.timestamp) {
        latestRunDate = new Date(meta.timestamp);
      }
      if (meta.runEnvironment) {
        runEnvironment = meta.runEnvironment;
      }
      if (meta.baselineEnvironment) {
        baselineEnvironment = meta.baselineEnvironment;
      }
      if (meta.baselineUpdatedAt) {
        const parsedBaselineUpdatedAt = new Date(meta.baselineUpdatedAt);
        if (!Number.isNaN(parsedBaselineUpdatedAt.getTime())) {
          baselineUpdatedAt = parsedBaselineUpdatedAt;
        }
      }
    } catch {
      // ignore parse errors
    }
  }

  let latestResultText = "Unknown";
  let latestResultClass = "unknown";

  let playwrightReportPath = null;
  for (const link of availableLinks) {
    if (link.exists.endsWith("playwright-report/index.html")) {
      playwrightReportPath = path.join(dashboardDir, link.exists);
      break;
    }
  }

  // Fallback: probe for a playwright report saved alongside non-standard reports
  // (e.g. accessibility, performance) that don't expose it as a dashboard link.
  if (!playwrightReportPath) {
    const probePath = path.join(
      dashboardDir,
      report.key,
      "playwright-report",
      "index.html",
    );
    if (fs.existsSync(probePath)) {
      playwrightReportPath = probePath;
    }
  }

  if (playwrightReportPath) {
    const playwrightMeta = readPlaywrightMeta(playwrightReportPath);
    if (playwrightMeta && playwrightMeta.stats) {
      const unexpected = Number(playwrightMeta.stats.unexpected || 0);
      latestResultText = unexpected > 0 ? "Failed" : "Passed";
      latestResultClass = unexpected > 0 ? "failed" : "passed";
    }

    if (!latestRunDate && playwrightMeta && playwrightMeta.startTime) {
      latestRunDate = playwrightMeta.startTime;
    }
  }

  if (!latestRunDate) {
    for (const link of availableLinks) {
      const absolutePath = path.join(dashboardDir, link.exists);
      if (fs.existsSync(absolutePath)) {
        const stats = fs.statSync(absolutePath);
        if (!latestRunDate || stats.mtime > latestRunDate) {
          latestRunDate = stats.mtime;
        }
      }
    }
  }

  return {
    latestRunDate,
    latestRunText: latestRunDate
      ? formatTimestamp(latestRunDate)
      : "No run published yet",
    latestResultText,
    latestResultClass,
    runEnvironment,
    baselineEnvironment,
    baselineUpdatedAt,
  };
}

function renderLatestRunMeta(runMeta) {
  const compareContext =
    runMeta.runEnvironment && runMeta.baselineEnvironment
      ? `<p><strong>Compare Context:</strong> run in [${runMeta.runEnvironment}] vs [${runMeta.baselineEnvironment}] baseline</p>`
      : "";

  const baselineUpdated = runMeta.baselineUpdatedAt
    ? `<p><strong>Baseline Last Updated:</strong> ${formatTimestamp(runMeta.baselineUpdatedAt)}</p>`
    : "";

  return `
    <div class="card-run-meta">
      <p><strong>Latest Test Run:</strong> ${runMeta.latestRunText}</p>
      <p><strong>Latest Test Result:</strong> <span class="run-result ${runMeta.latestResultClass}">${runMeta.latestResultText}</span></p>
      ${compareContext}
      ${baselineUpdated}
    </div>
  `;
}

const reportsWithMeta = reports.map((report) => ({
  report,
  runMeta: getLatestRunMeta(report),
}));

const cards = reportsWithMeta
  .sort((a, b) => {
    const aDate = a.runMeta.latestRunDate;
    const bDate = b.runMeta.latestRunDate;
    if (aDate && bDate) return bDate - aDate;
    if (aDate) return -1;
    if (bDate) return 1;
    return 0;
  })
  .map(
    ({ report, runMeta }) => `
      <section class="card">
        <div class="card-header">
          <h2>${report.title}</h2>
          <span class="status ${report.comingSoon ? "planned" : "active"}">${report.comingSoon ? "Planned" : "Active"}</span>
        </div>
        <p class="card-description">${report.description}</p>
        ${renderLatestRunMeta(runMeta)}
        <div class="card-copy">
          <p><strong>Checks:</strong> ${report.whatItChecks}</p>
          <p><strong>Protects:</strong> ${report.whyItMatters}</p>
          <p><strong>Review:</strong> ${report.nextSteps}</p>
        </div>
        <div class="links">
          ${renderLinks(report)}
        </div>
      </section>
    `,
  )
  .join("\n");

const dashboardMetaItems = `
  <div class="meta-card">
    <div class="meta-row">
      <span class="meta-label">Last Updated</span>
      <span class="meta-value">${formatTimestamp(generatedAt)}</span>
    </div>
    <div class="meta-row">
      <span class="meta-label">Maintained By</span>
      <span class="meta-value">${dashboardMeta.team}</span>
    </div>
    <div class="meta-row">
      <span class="meta-label">Contact</span>
      <span class="meta-value">${dashboardMeta.contact}</span>
    </div>
  </div>

  <div class="meta-card">
    <div class="meta-row">
      <span class="meta-label">Purpose</span>
      <span class="meta-value">${dashboardMeta.purpose}</span>
    </div>
    <div class="meta-row">
      <span class="meta-label">Run Frequency</span>
      <span class="meta-value">${dashboardMeta.runFrequency}</span>
    </div>
  </div>
`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TruGreen Automation Dashboard</title>
  <style>
    :root {
      --navy: #172b4d;
      --text: #0f2144;
      --muted: #5e6c84;
      --background: #f7f9fb;
      --card: #ffffff;
      --panel: #eef3f9;
      --border: #dfe1e6;
      --button: #2563b8;
      --button-hover: #174ea6;
      --pill-active-bg: #e6f4ea;
      --pill-active-text: #188038;
      --pill-planned-bg: #fff4d6;
      --pill-planned-text: #8a5a00;
      --shadow: rgba(0, 0, 0, 0.06);
    }

    * {
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      margin: 0;
      background: var(--background);
      color: var(--text);
    }

    .page {
      max-width: 1320px;
      margin: 0 auto;
      padding: 40px 24px;
    }

    .hero {
      margin-bottom: 24px;
    }

    h1 {
      margin: 0 0 8px;
      font-size: 34px;
      color: var(--navy);
      letter-spacing: -0.02em;
    }

    .subtitle {
      color: var(--muted);
      font-size: 16px;
      margin: 0;
    }

    .layout {
      display: grid;
      gap: 32px;
    }

    .panel {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 20px;
      box-shadow: 0 2px 8px var(--shadow);
    }

    .panel-alt {
      background: var(--panel);
      margin-bottom: 20px;
    }

    .section-title {
      margin: 0 0 10px;
      font-size: 20px;
      color: var(--navy);
    }

    .section-copy {
      margin: 0;
      color: var(--muted);
    }

    .meta-grid {
      display: grid;
      grid-template-columns: minmax(320px, 0.8fr) minmax(420px, 1.2fr);
      gap: 18px;
      margin-top: 18px;
    }

    .meta-card {
      display: grid;
      gap: 14px;
      padding: 18px;
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 12px;
    }

    .meta-row {
      display: grid;
      gap: 4px;
    }

    .meta-label {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .meta-value {
      font-size: 14px;
      line-height: 1.45;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 28px;
    }

    .definition-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 14px;
      margin-top: 16px;
    }

    .definition-item {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 14px;
    }

    .definition-item h3,
    .workflow h3 {
      margin: 0 0 8px;
      font-size: 15px;
      color: var(--navy);
    }

    .definition-icon {
      margin-right: 6px;
    }

    .definition-item p,
    .workflow p {
      margin: 0;
      color: var(--text);
    }

    .workflow-list {
      margin: 14px 0 0;
      padding-left: 20px;
      line-height: 1.55;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
    }

    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 20px;
      box-shadow: 0 2px 8px var(--shadow);
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 10px;
    }

    h2 {
      margin-top: 0;
      margin-bottom: 0;
      font-size: 22px;
      color: var(--navy);
    }

    p {
      line-height: 1.5;
      margin-bottom: 0;
    }

    .card-description {
      color: var(--muted);
      font-size: 14px;
    }

    .card-run-meta {
      margin-top: 12px;
      padding: 10px 12px;
      border: 1px solid var(--border);
      border-radius: 10px;
      background: #f9fbff;
      font-size: 13px;
      line-height: 1.45;
    }

    .card-run-meta p {
      margin: 0;
    }

    .card-run-meta p + p {
      margin-top: 6px;
    }

    .run-result {
      font-weight: 700;
    }

    .run-result.passed {
      color: #188038;
    }

    .run-result.failed {
      color: #a50e0e;
    }

    .run-result.planned,
    .run-result.unknown {
      color: var(--muted);
    }

    .status {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 6px 10px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .status.active {
      background: var(--pill-active-bg);
      color: var(--pill-active-text);
    }

    .status.planned {
      background: var(--pill-planned-bg);
      color: var(--pill-planned-text);
    }

    .card-copy {
      display: grid;
      gap: 8px;
      margin-top: 14px;
      font-size: 14px;
    }

    .card-copy p {
      margin: 0;
    }

    .card-copy strong {
      color: var(--navy);
    }

    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 16px;
    }

    .button {
      display: inline-block;
      padding: 10px 14px;
      background: var(--button);
      color: #ffffff;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 700;
      font-size: 14px;
    }

    .button:hover {
      background: var(--button-hover);
    }

    .not-ready {
      color: var(--muted);
      font-style: italic;
      margin-bottom: 0;
    }

    .footer {
      margin-top: 28px;
      color: var(--muted);
      font-size: 13px;
    }

    @media (max-width: 1050px) {
      .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .info-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 720px) {
      .page {
        padding: 28px 16px;
      }

      .card-header {
        align-items: flex-start;
        flex-direction: column;
      }

      .meta-grid,
      .grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <main class="page">
    <header class="hero">
      <h1>TruGreen Automation Dashboard</h1>
      <p class="subtitle">Latest published AQ automation reports from GitHub Actions.</p>
    </header>

    <section class="panel panel-alt">
      <h2 class="section-title">Dashboard Context</h2>
      <p class="section-copy">A central place to review automation results, understand impact, and identify follow-up.</p>
      <div class="meta-grid">
        ${dashboardMetaItems}
      </div>
    </section>

    <div class="layout">
      <section class="grid">
        ${cards}
      </section>

      <section class="info-grid">
        <div class="panel workflow">
          <h2 class="section-title">Recommended Review Workflow</h2>
          <p class="section-copy">Use this sequence when reviewing automation output for release confidence, regression triage, or client-facing updates.</p>
          ${renderTextList(reviewWorkflow, "workflow-list")}
        </div>

        <div class="panel">
          <h2 class="section-title">Result Definitions</h2>
          <p class="section-copy">Use these definitions when deciding whether a run should be acknowledged, investigated, or escalated.</p>
          <div class="definition-grid">
            ${renderDefinitions(resultDefinitions)}
          </div>
        </div>
      </section>
    </div>

    <p class="footer">Dashboard generated automatically from available report folders.</p>
  </main>
</body>
</html>`;

fs.writeFileSync(path.join(dashboardDir, "index.html"), html);

console.log("Dashboard index generated at dashboard/index.html");
