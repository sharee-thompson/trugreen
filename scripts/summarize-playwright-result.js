const fs = require("fs");

const reportPath = process.argv[2] || "playwright-report.json";

const emptySummary = {
  status: "unknown",
  total: 0,
  passed: 0,
  failed: 0,
  flaky: 0,
  skipped: 0,
  timedOut: 0,
};

function summarizeTests(suites, summary) {
  for (const suite of suites || []) {
    summarizeTests(suite.suites, summary);
    for (const spec of suite.specs || []) {
      for (const test of spec.tests || []) {
        const status = test.status;
        summary.total += 1;

        if (status === "expected") {
          summary.passed += 1;
          continue;
        }

        if (status === "flaky") {
          summary.flaky += 1;
          continue;
        }

        if (status === "skipped") {
          summary.skipped += 1;
          continue;
        }

        if (status === "timedOut") {
          summary.timedOut += 1;
          continue;
        }

        summary.failed += 1;
      }
    }
  }
}

function buildStatus(summary) {
  if (summary.failed > 0 || summary.timedOut > 0) {
    return "failure";
  }

  if (summary.flaky > 0) {
    return "warning";
  }

  if (summary.passed > 0) {
    return "success";
  }

  if (summary.skipped > 0) {
    return "skipped";
  }

  return "unknown";
}

function buildSummaryLine(summary) {
  return [
    `Total: ${summary.total}`,
    `Passed: ${summary.passed}`,
    `Failed: ${summary.failed}`,
    `Flaky: ${summary.flaky}`,
    `Skipped: ${summary.skipped}`,
    `Timed out: ${summary.timedOut}`,
  ].join(" | ");
}

let summary = { ...emptySummary };

if (fs.existsSync(reportPath)) {
  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  summarizeTests(report.suites, summary);
  summary.status = buildStatus(summary);
}

const output = {
  ...summary,
  summaryLine: buildSummaryLine(summary),
};

process.stdout.write(`${JSON.stringify(output)}\n`);
