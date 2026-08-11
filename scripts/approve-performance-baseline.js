const fs = require("fs");
const path = require("path");

const candidatesDir = path.join(
  process.cwd(),
  "performance-report",
  "baseline-candidates",
);
const baselinesDir = path.join(process.cwd(), "performance-baselines");
const approvedBaselinesPath = path.join(
  baselinesDir,
  "approved-baselines.json",
);

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) {
    return fallback;
  }

  const raw = fs.readFileSync(filePath, "utf8").trim();
  if (!raw) {
    return fallback;
  }

  return JSON.parse(raw);
}

function getCandidateFiles() {
  if (!fs.existsSync(candidatesDir)) {
    return [];
  }

  return fs
    .readdirSync(candidatesDir)
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => path.join(candidatesDir, fileName));
}

function compareByGeneratedAtDesc(left, right) {
  return String(right.generatedAt || "").localeCompare(
    String(left.generatedAt || ""),
  );
}

const baselineName = process.env.PERFORMANCE_BASELINE_NAME?.trim();
const pageKey = process.env.PERFORMANCE_PAGE_KEY?.trim();
const runId = process.env.PERFORMANCE_BASELINE_RUN_ID?.trim();

if (!baselineName || !pageKey) {
  throw new Error(
    "PERFORMANCE_BASELINE_NAME and PERFORMANCE_PAGE_KEY are required to approve a baseline.",
  );
}

const matchingCandidates = getCandidateFiles()
  .map((filePath) => readJson(filePath, null))
  .filter(Boolean)
  .filter((candidate) => candidate.baselineName === baselineName)
  .filter((candidate) => candidate.pageKey === pageKey)
  .filter((candidate) => !runId || candidate.runId === runId)
  .sort(compareByGeneratedAtDesc);

if (matchingCandidates.length === 0) {
  throw new Error(
    `No baseline candidate found for baseline '${baselineName}' and page '${pageKey}'.`,
  );
}

const approved = readJson(approvedBaselinesPath, {
  version: 1,
  updatedAt: null,
  baselines: [],
});

const selectedCandidate = matchingCandidates[0];
const approvedEntry = {
  baselineName: selectedCandidate.baselineName,
  pageKey: selectedCandidate.pageKey,
  url: selectedCandidate.url,
  environment: selectedCandidate.environment,
  throttlingMethod: selectedCandidate.throttlingMethod,
  sourceRunId: selectedCandidate.runId,
  capturedAt: selectedCandidate.generatedAt,
  approvedAt: new Date().toISOString(),
  sampleCountRequested: selectedCandidate.sampleCountRequested,
  devices: selectedCandidate.devices,
};

const existingIndex = approved.baselines.findIndex(
  (entry) =>
    entry.baselineName === approvedEntry.baselineName &&
    entry.pageKey === approvedEntry.pageKey &&
    entry.environment === approvedEntry.environment &&
    entry.throttlingMethod === approvedEntry.throttlingMethod,
);

if (existingIndex >= 0) {
  approved.baselines[existingIndex] = approvedEntry;
} else {
  approved.baselines.push(approvedEntry);
}

approved.updatedAt = new Date().toISOString();

fs.mkdirSync(baselinesDir, { recursive: true });
fs.writeFileSync(
  approvedBaselinesPath,
  JSON.stringify(approved, null, 2),
  "utf8",
);

console.log(
  `Approved baseline '${baselineName}' for '${pageKey}' at performance-baselines/approved-baselines.json`,
);
