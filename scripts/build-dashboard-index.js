const fs = require("fs");
const path = require("path");

const dashboardDir = path.join(process.cwd(), "dashboard");

fs.mkdirSync(dashboardDir, { recursive: true });

const reports = [
  {
    key: "smoke",
    title: "Smoke Tests",
    description:
      "Daily core site health checks for the TruGreen automation pilot.",
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
    description: "Visual comparison results for selected pages and components.",
    links: [
      {
        label: "View Visual Report",
        href: "./visual/playwright-report/index.html",
        exists: "visual/playwright-report/index.html",
      },
    ],
  },
  {
    key: "link",
    title: "Link Validation",
    description:
      "Homepage-driven link checks for internal and external URL health.",
    comingSoon: true,
    links: [],
  },
];

function fileExists(relativePath) {
  return fs.existsSync(path.join(dashboardDir, relativePath));
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

const cards = reports
  .map(
    (report) => `
      <section class="card">
        <h2>${report.title}</h2>
        <p>${report.description}</p>
        <div class="links">
          ${renderLinks(report)}
        </div>
      </section>
    `,
  )
  .join("\n");

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
      --border: #dfe1e6;
      --button: #2563b8;
      --button-hover: #174ea6;
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
      max-width: 1180px;
      margin: 0 auto;
      padding: 40px 24px;
    }

    .hero {
      margin-bottom: 28px;
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

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 24px;
      box-shadow: 0 2px 8px var(--shadow);
      min-height: 190px;
    }

    h2 {
      margin-top: 0;
      margin-bottom: 12px;
      font-size: 22px;
      color: var(--navy);
    }

    p {
      line-height: 1.5;
      margin-bottom: 0;
    }

    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 18px;
    }

    .button {
      display: inline-block;
      padding: 11px 15px;
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
  </style>
</head>
<body>
  <main class="page">
    <header class="hero">
      <h1>TruGreen Automation Dashboard</h1>
      <p class="subtitle">Latest published QA automation reports from GitHub Actions.</p>
    </header>

    <div class="grid">
      ${cards}
    </div>

    <p class="footer">Dashboard generated automatically from available report folders.</p>
  </main>
</body>
</html>`;

fs.writeFileSync(path.join(dashboardDir, "index.html"), html);

console.log("Dashboard index generated at dashboard/index.html");
