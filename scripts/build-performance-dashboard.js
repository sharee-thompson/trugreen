const fs = require("fs");
const path = require("path");

const reportDir = path.join(process.cwd(), "performance-report");
const csvPath = path.join(reportDir, "performance-history-seconds.csv");
const insightsPath = path.join(reportDir, "performance-insights-latest.json");
const insightsDir = path.join(reportDir, "performance-insights");
const outputPath = path.join(reportDir, "index.html");
const approvedBaselinesCsvPath = path.join(reportDir, "approved-baselines.csv");
const approvedBaselinesPath = path.join(
  process.cwd(),
  "performance-baselines",
  "approved-baselines.json",
);

const STATUS_RANK = {
  improved: 0,
  "within tolerance": 1,
  regressed: 2,
  "no baseline": 3,
};

const REGRESSION_KEY_ITEMS = [
  "Score: regressed when the score drops by 8 or more points.",
  "LCP: regressed when it increases by at least 0.5s and 20%.",
  "FCP: regressed when it increases by at least 0.4s and 20%.",
  "TTI: regressed when it increases by at least 0.5s and 20%.",
  "TBT: regressed when it increases by at least 0.25s and 25%.",
  "CLS: regressed when it increases by at least 0.05 and 25%.",
  "A device summary regresses only when Score regresses or at least two timing metrics regress.",
  "Page status rolls up from the device summaries, so one noisy metric does not mark the whole page as regressed.",
];

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

function parseInsightsFile(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8").trim();
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readInsights(filePath, directoryPath) {
  if (fs.existsSync(directoryPath)) {
    const files = fs
      .readdirSync(directoryPath)
      .filter((name) => name.endsWith(".json"));

    const insights = [];
    for (const fileName of files) {
      const fileInsights = parseInsightsFile(
        path.join(directoryPath, fileName),
      );
      insights.push(...fileInsights);
    }

    if (insights.length > 0) {
      return insights;
    }
  }

  if (!fs.existsSync(filePath)) {
    return [];
  }

  return parseInsightsFile(filePath);
}

function readApprovedBaselines(filePath) {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  try {
    const raw = fs.readFileSync(filePath, "utf8").trim();
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.baselines) ? parsed.baselines : [];
  } catch {
    return [];
  }
}

function escapeCsvValue(value) {
  if (value === null || value === undefined) {
    return "";
  }

  const stringValue = String(value);
  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

function buildApprovedBaselinesCsv(baselines) {
  const headers = [
    "baseline_name",
    "page_key",
    "device",
    "url",
    "environment",
    "throttling_method",
    "captured_at",
    "approved_at",
    "source_run_id",
    "sample_count_requested",
    "performance_score",
    "first_contentful_paint_seconds",
    "largest_contentful_paint_seconds",
    "total_blocking_time_seconds",
    "interactive_seconds",
    "cumulative_layout_shift",
  ];

  const rows = [headers.join(",")];

  const sortedBaselines = [...baselines].sort((left, right) => {
    const baselineCompare = String(left.baselineName || "").localeCompare(
      String(right.baselineName || ""),
    );

    if (baselineCompare !== 0) {
      return baselineCompare;
    }

    return String(left.pageKey || "").localeCompare(
      String(right.pageKey || ""),
    );
  });

  for (const baseline of sortedBaselines) {
    const devices = Array.isArray(baseline.devices) ? baseline.devices : [];

    for (const deviceSnapshot of devices) {
      const metrics = deviceSnapshot.metrics || {};

      rows.push(
        [
          baseline.baselineName,
          baseline.pageKey,
          deviceSnapshot.deviceProfile,
          baseline.url,
          baseline.environment,
          baseline.throttlingMethod,
          baseline.capturedAt,
          baseline.approvedAt,
          baseline.sourceRunId,
          baseline.sampleCountRequested,
          metrics.performanceScore,
          metrics.firstContentfulPaintSeconds,
          metrics.largestContentfulPaintSeconds,
          metrics.totalBlockingTimeSeconds,
          metrics.interactiveSeconds,
          metrics.cumulativeLayoutShift,
        ]
          .map(escapeCsvValue)
          .join(","),
      );
    }
  }

  return `${rows.join("\n")}\n`;
}

function toNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function isLikelyAnomalyRow(row) {
  const score = toNumber(row.performance_score);
  const fcp = toNumber(row.first_contentful_paint_seconds);
  const lcp = toNumber(row.largest_contentful_paint_seconds);
  const tti = toNumber(row.interactive_seconds);
  const tbt = toNumber(row.total_blocking_time_seconds);

  if (score !== 0) {
    return false;
  }

  return fcp > 0 && lcp > 0 && tti === 0 && tbt === 0;
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

function buildRegressionKey() {
  const items = REGRESSION_KEY_ITEMS.map(
    (item) => `<li>${escapeHtml(item)}</li>`,
  ).join("\n");

  return `<div class="regression-key">
    <strong>Regression key</strong>
    <ul>
      ${items}
    </ul>
  </div>`;
}

function formatDurationMs(value) {
  const numeric = toNumber(value);
  if (!numeric) {
    return "-";
  }

  if (numeric >= 1000) {
    return `${(numeric / 1000).toFixed(2)} s`;
  }

  return `${numeric.toFixed(0)} ms`;
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

function formatDelta(value, digits = 2) {
  if (!Number.isFinite(value) || value === 0) {
    return "0.00";
  }

  return `${value > 0 ? "+" : ""}${value.toFixed(digits)}`;
}

function formatPercentDelta(value) {
  if (!Number.isFinite(value)) {
    return "-";
  }

  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getLatestBaselineForPage(baselines, pageKey) {
  return baselines
    .filter((baseline) => baseline.pageKey === pageKey)
    .sort((left, right) =>
      String(right.approvedAt || "").localeCompare(
        String(left.approvedAt || ""),
      ),
    )[0];
}

function exceedsRegressionTolerance(
  delta,
  percentDelta,
  absoluteThreshold,
  percentThreshold,
) {
  return delta >= absoluteThreshold && percentDelta >= percentThreshold;
}

function compareMetricStatus(metricKey, currentValue, baselineValue) {
  const delta = currentValue - baselineValue;
  const percentDelta = baselineValue !== 0 ? (delta / baselineValue) * 100 : 0;

  if (metricKey === "performance_score") {
    if (delta > 0) {
      return { status: "improved", delta, percentDelta };
    }

    if (Math.abs(delta) >= 8) {
      return { status: "regressed", delta, percentDelta };
    }

    return { status: "within tolerance", delta, percentDelta };
  }

  if (metricKey === "largest_contentful_paint_seconds") {
    if (delta < 0) {
      return { status: "improved", delta, percentDelta };
    }

    if (exceedsRegressionTolerance(delta, percentDelta, 0.5, 20)) {
      return { status: "regressed", delta, percentDelta };
    }

    return { status: "within tolerance", delta, percentDelta };
  }

  if (metricKey === "first_contentful_paint_seconds") {
    if (delta < 0) {
      return { status: "improved", delta, percentDelta };
    }

    if (exceedsRegressionTolerance(delta, percentDelta, 0.4, 20)) {
      return { status: "regressed", delta, percentDelta };
    }

    return { status: "within tolerance", delta, percentDelta };
  }

  if (metricKey === "total_blocking_time_seconds") {
    if (delta < 0) {
      return { status: "improved", delta, percentDelta };
    }

    if (exceedsRegressionTolerance(delta, percentDelta, 0.25, 25)) {
      return { status: "regressed", delta, percentDelta };
    }

    return { status: "within tolerance", delta, percentDelta };
  }

  if (metricKey === "cumulative_layout_shift") {
    if (delta < 0) {
      return { status: "improved", delta, percentDelta };
    }

    if (exceedsRegressionTolerance(delta, percentDelta, 0.05, 25)) {
      return { status: "regressed", delta, percentDelta };
    }

    return { status: "within tolerance", delta, percentDelta };
  }

  if (metricKey === "interactive_seconds") {
    if (delta < 0) {
      return { status: "improved", delta, percentDelta };
    }

    if (exceedsRegressionTolerance(delta, percentDelta, 0.5, 20)) {
      return { status: "regressed", delta, percentDelta };
    }

    return { status: "within tolerance", delta, percentDelta };
  }

  return { status: "within tolerance", delta, percentDelta };
}

function pickWorseStatus(left, right) {
  return STATUS_RANK[left] >= STATUS_RANK[right] ? left : right;
}

function summarizeComparisonMetrics(metrics) {
  if (!metrics.length) {
    return "no baseline";
  }

  const scoreMetric = metrics.find((metric) => metric.label === "Score");
  if (scoreMetric?.status === "regressed") {
    return "regressed";
  }

  const timingRegressionCount = metrics.filter(
    (metric) => metric.label !== "Score" && metric.status === "regressed",
  ).length;

  if (timingRegressionCount >= 2) {
    return "regressed";
  }

  const hasImproved = metrics.some((metric) => metric.status === "improved");
  const hasSingleTimingRegression = timingRegressionCount === 1;

  if (hasImproved && !hasSingleTimingRegression) {
    return "improved";
  }

  return "within tolerance";
}

function summarizePageStatus(comparisons) {
  if (!comparisons.length) {
    return "no baseline";
  }

  if (comparisons.some((comparison) => comparison.status === "regressed")) {
    return "regressed";
  }

  if (comparisons.some((comparison) => comparison.status === "improved")) {
    return "improved";
  }

  return "within tolerance";
}

const BASELINE_METRIC_KEY_BY_ROW_KEY = {
  performance_score: "performanceScore",
  first_contentful_paint_seconds: "firstContentfulPaintSeconds",
  largest_contentful_paint_seconds: "largestContentfulPaintSeconds",
  interactive_seconds: "interactiveSeconds",
  total_blocking_time_seconds: "totalBlockingTimeSeconds",
  cumulative_layout_shift: "cumulativeLayoutShift",
};

function buildBaselineComparisons(latestSnapshot, baseline) {
  if (!baseline) {
    return [];
  }

  return latestSnapshot.map((row) => {
    const baselineDevice = (baseline.devices || []).find(
      (device) => device.deviceProfile === row.device_profile,
    );

    if (!baselineDevice) {
      return {
        device: row.device_profile || "unknown",
        status: "no baseline",
        baselineName: baseline.baselineName,
        metrics: [],
      };
    }

    const metricKeys = [
      ["performance_score", "Score"],
      ["first_contentful_paint_seconds", "FCP (S)"],
      ["largest_contentful_paint_seconds", "LCP (S)"],
      ["interactive_seconds", "TTI (S)"],
      ["total_blocking_time_seconds", "TBT (S)"],
      ["cumulative_layout_shift", "CLS"],
    ];

    const metrics = metricKeys.map(([metricKey, label]) => {
      const currentValue = toNumber(row[metricKey]);
      const baselineMetricKey = BASELINE_METRIC_KEY_BY_ROW_KEY[metricKey];
      const baselineValue = toNumber(
        baselineMetricKey
          ? baselineDevice.metrics?.[baselineMetricKey]
          : undefined,
      );
      const comparison = compareMetricStatus(
        metricKey,
        currentValue,
        baselineValue,
      );

      return {
        label,
        currentValue,
        baselineValue,
        status: comparison.status,
        delta: comparison.delta,
        percentDelta: comparison.percentDelta,
      };
    });

    const status = summarizeComparisonMetrics(metrics);

    return {
      device: row.device_profile || "unknown",
      status,
      baselineName: baseline.baselineName,
      metrics,
      baselineCapturedAt: baseline.capturedAt,
    };
  });
}

function getLatestStatusForPage(pageRows, baselines) {
  const sorted = [...pageRows].sort((a, b) =>
    String(b.timestamp_iso || "").localeCompare(String(a.timestamp_iso || "")),
  );
  const latestRunId = sorted[0]?.run_id || "";
  const latestSnapshot = latestRunId
    ? sorted.filter((row) => row.run_id === latestRunId)
    : sorted.slice(0, 2);
  const baseline = getLatestBaselineForPage(
    baselines,
    sorted[0]?.page_key || "",
  );
  const comparisons = buildBaselineComparisons(latestSnapshot, baseline);

  if (comparisons.length === 0) {
    return "no baseline";
  }

  return summarizePageStatus(comparisons);
}

function buildBaselineSection(latestSnapshot, baselineComparisons) {
  if (!baselineComparisons.length) {
    return `<div class="hint">No approved baseline found for this page yet.</div>`;
  }

  const baselineName = baselineComparisons[0]?.baselineName || "-";
  const baselineCapturedAt = baselineComparisons[0]?.baselineCapturedAt || "";
  const rows = baselineComparisons
    .map((comparison) => {
      const metricRows = comparison.metrics
        .map(
          (metric) => `<tr>
          <td>${escapeHtml(comparison.device)}</td>
          <td>${escapeHtml(metric.label)}</td>
          <td>${escapeHtml(formatMetric(metric.baselineValue))}</td>
          <td>${escapeHtml(formatMetric(metric.currentValue))}</td>
          <td>${escapeHtml(formatDelta(metric.delta))}</td>
          <td>${escapeHtml(formatPercentDelta(metric.percentDelta))}</td>
          <td class="status-${escapeHtml(metric.status.replace(/\s+/g, "-"))}">${escapeHtml(metric.status)}</td>
        </tr>`,
        )
        .join("\n");

      return metricRows;
    })
    .join("\n");

  const statusSummary = baselineComparisons
    .map((comparison) => `${comparison.device}: ${comparison.status}`)
    .join(" | ");

  return `<div class="hint">Baseline: ${escapeHtml(baselineName)} | Captured: ${escapeHtml(formatTimestamp(baselineCapturedAt))} | Latest status: ${escapeHtml(statusSummary)}</div>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Device</th>
          <th>Metric</th>
          <th>Baseline</th>
          <th>Current</th>
          <th>Delta</th>
          <th>Delta %</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  </div>`;
}

function buildIssueSections(latestInsightsRows) {
  if (!latestInsightsRows.length) {
    return `<div class="hint">No Lighthouse insights were captured for this latest snapshot yet.</div>`;
  }

  const sections = latestInsightsRows
    .sort((a, b) =>
      String(a.deviceProfile || "").localeCompare(
        String(b.deviceProfile || ""),
      ),
    )
    .map((deviceInsight) => {
      const opportunities = Array.isArray(deviceInsight.opportunities)
        ? deviceInsight.opportunities
        : [];
      const diagnostics = Array.isArray(deviceInsight.diagnostics)
        ? deviceInsight.diagnostics
        : [];

      const opportunityItems = opportunities.length
        ? opportunities
            .map(
              (item) => `<li>
            <strong>${escapeHtml(item.title || item.auditId || "Opportunity")}</strong>
            <span class="pill">Potential savings: ${escapeHtml(formatDurationMs(item.savingsMs))}</span>
            <div class="muted">${escapeHtml(item.description || "")}</div>
          </li>`,
            )
            .join("\n")
        : `<li class="muted">No major opportunities reported for this device in the latest snapshot.</li>`;

      const diagnosticItems = diagnostics.length
        ? diagnostics
            .map(
              (item) => `<li>
            <strong>${escapeHtml(item.title || item.auditId || "Diagnostic")}</strong>
            <span class="pill">Score: ${escapeHtml(item.score === null || item.score === undefined ? "n/a" : Number(item.score).toFixed(2))}</span>
            ${item.displayValue ? `<div class="muted">${escapeHtml(item.displayValue)}</div>` : ""}
            <div class="muted">${escapeHtml(item.description || "")}</div>
          </li>`,
            )
            .join("\n")
        : `<li class="muted">No diagnostics issues reported for this device in the latest snapshot.</li>`;

      return `<div class="issue-card">
        <h3>${escapeHtml(deviceInsight.deviceProfile || "unknown device")}</h3>
        <div class="score-line">Representative score: ${escapeHtml(formatScore(deviceInsight.performanceScore))}</div>
        <h4>Top Opportunities</h4>
        <ul class="issue-list">${opportunityItems}</ul>
        <h4>Diagnostics</h4>
        <ul class="issue-list">${diagnosticItems}</ul>
      </div>`;
    })
    .join("\n");

  return `<div class="issues-grid">${sections}</div>`;
}

function buildPageReport(pageKey, pageRows, insightsRows, baselines) {
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
  const latestInsightsRows = insightsRows.filter(
    (insight) =>
      insight.pageKey === pageKey &&
      (!latestRunId || insight.runId === latestRunId),
  );
  const latestBaseline = getLatestBaselineForPage(baselines, pageKey);
  const baselineComparisons = buildBaselineComparisons(
    latestSnapshot,
    latestBaseline,
  );

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
    h3 { margin-top: 1rem; margin-bottom: 0.5rem; }
    h4 { margin-top: 0.75rem; margin-bottom: 0.5rem; }
    .meta { color: #555; margin-bottom: 0.75rem; }
    .hint { color: #555; margin-bottom: 1rem; }
    .muted { color: #666; }
    .regression-key { border: 1px solid #ddd; border-radius: 8px; background: #fafafa; padding: 12px 14px; margin-bottom: 1.25rem; }
    .regression-key ul { margin: 0.5rem 0 0; padding-left: 1.2rem; }
    .regression-key li { margin-bottom: 0.35rem; }
    .score-line { margin-bottom: 0.6rem; }
    .issues-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; }
    .issue-card { border: 1px solid #ddd; border-radius: 8px; padding: 12px; background: #fafafa; }
    .issue-list { margin: 0; padding-left: 1.2rem; }
    .issue-list li { margin-bottom: 0.75rem; }
    .pill { display: inline-block; margin-left: 8px; padding: 1px 8px; border-radius: 999px; background: #ececec; font-size: 0.85rem; }
    .table-wrap { width: 100%; overflow-x: auto; }
    table { border-collapse: collapse; width: 100%; min-width: 960px; margin-bottom: 1.75rem; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; vertical-align: top; }
    th { background-color: #f4f4f4; white-space: nowrap; }
    .status-improved { color: #0b6b2f; font-weight: 600; }
    .status-within-tolerance { color: #7a5d00; font-weight: 600; }
    .status-regressed { color: #9f1c1c; font-weight: 600; }
    .status-no-baseline { color: #666; font-weight: 600; }
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
  ${buildRegressionKey()}

  <h2>Current vs Baseline</h2>
  ${buildBaselineSection(latestSnapshot, baselineComparisons)}

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

  <h2>Performance Insights (Latest Run)</h2>
  <div class="hint">Top Lighthouse opportunities and diagnostics for the latest snapshot rows above.</div>
  ${buildIssueSections(latestInsightsRows)}
</body>
</html>`;
}

function buildDashboard(rows, baselines) {
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
      latestStatus: "no baseline",
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

  for (const page of pages) {
    const pageRows = rows.filter((row) => row.page_key === page.pageKey);
    page.latestStatus = getLatestStatusForPage(pageRows, baselines);
  }

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Performance Audit Reports</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { margin-bottom: 10px; }
    .timestamp { color: #555; margin-bottom: 1.5rem; }
    .meta-links { color: #555; margin-bottom: 1rem; }
    .regression-key { border: 1px solid #ddd; border-radius: 8px; background: #fafafa; padding: 12px 14px; margin-bottom: 1.25rem; }
    .regression-key ul { margin: 0.5rem 0 0; padding-left: 1.2rem; }
    .regression-key li { margin-bottom: 0.35rem; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 2rem; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f4f4f4; }
    .pass { color: green; }
    .muted { color: #666; }
    .status-improved { color: #0b6b2f; font-weight: 600; }
    .status-within-tolerance { color: #7a5d00; font-weight: 600; }
    .status-regressed { color: #9f1c1c; font-weight: 600; }
    .status-no-baseline { color: #666; font-weight: 600; }
  </style>
</head>
<body>
  <h1>Performance Audit Reports</h1>
  <div class="timestamp">Run on: ${new Date().toLocaleString()}</div>
  <div class="meta-links"><a href="./approved-baselines.csv">Download approved baselines CSV</a> | <a href="../performance-baselines/approved-baselines.json">View approved baselines JSON</a></div>
  ${buildRegressionKey()}
  <table>
    <tr>
      <th>Page</th>
      <th>URL</th>
      <th>Latest Desktop Score</th>
      <th>Latest Mobile Score</th>
      <th>Latest Run Status</th>
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
      <td class="status-${escapeHtml(String(page.latestStatus).replace(/\s+/g, "-"))}">${escapeHtml(page.latestStatus)}</td>
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

const rawRows = readRows(csvPath);
const rows = rawRows.filter((row) => !isLikelyAnomalyRow(row));
const insights = readInsights(insightsPath, insightsDir);
const baselines = readApprovedBaselines(approvedBaselinesPath);

if (rows.length !== rawRows.length) {
  console.log(
    `Filtered ${rawRows.length - rows.length} suspected Lighthouse anomaly row(s) from dashboard output.`,
  );
}

const rowsByPage = new Map();
for (const row of rows) {
  const pageKey = row.page_key || "unknown-page";
  const pageRows = rowsByPage.get(pageKey) || [];
  pageRows.push(row);
  rowsByPage.set(pageKey, pageRows);
}

for (const [pageKey, pageRows] of rowsByPage.entries()) {
  const pageHtml = buildPageReport(pageKey, pageRows, insights, baselines);
  fs.writeFileSync(path.join(reportDir, `${pageKey}.html`), pageHtml, "utf8");
}

const html = buildDashboard(rows, baselines);
const approvedBaselinesCsv = buildApprovedBaselinesCsv(baselines);

fs.writeFileSync(outputPath, html, "utf8");
fs.writeFileSync(approvedBaselinesCsvPath, approvedBaselinesCsv, "utf8");

console.log("Performance report generated at performance-report/index.html");
console.log(
  "Approved baselines CSV generated at performance-report/approved-baselines.csv",
);
