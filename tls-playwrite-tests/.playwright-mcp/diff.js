const fs = require('fs');

const tlsPath = '/Users/sam.nau/ProjectFiles/Trugreen Resources/playwright-tls-test-report.md';
const vmlPath = '/Users/sam.nau/ProjectFiles/Trugreen Resources/playwright-vml-2.7-baseline-report.md';
const outPath = '/Users/sam.nau/ProjectFiles/Trugreen Resources/playwright-tls-unique-errors.md';

function parse(md) {
  const sections = {};
  const lines = md.split(/\r?\n/);
  let currentUrl = null;
  let currentBullets = [];
  let inSignificant = false;

  for (const l of lines) {
    if (l.startsWith('## Significant')) {
      inSignificant = true;
      continue;
    }
    if (l.startsWith('## ')) {
      inSignificant = false;
      continue;
    }
    if (!inSignificant) continue;
    if (l.startsWith('### http')) {
      const m = l.match(/^### (http:\/\/\S+)/);
      if (m) {
        if (currentUrl) sections[currentUrl] = currentBullets;
        currentUrl = m[1];
        currentBullets = [];
      }
      continue;
    }
    if (l.startsWith('- ')) {
      currentBullets.push({ first: l.slice(2), rest: [] });
    } else if (currentBullets.length > 0 && (/^\s+/.test(l) || /^\s*at\s/.test(l))) {
      currentBullets[currentBullets.length - 1].rest.push(l);
    }
  }
  if (currentUrl) sections[currentUrl] = currentBullets;
  return sections;
}

const tlsSections = parse(fs.readFileSync(tlsPath, 'utf8'));
const vmlSections = parse(fs.readFileSync(vmlPath, 'utf8'));

const allUrls = new Set([...Object.keys(tlsSections), ...Object.keys(vmlSections)]);

let out = '# Errors found only after the TLS change\n\n';
out += 'Comparing TLS removal branch vs. origin/feature/VML-release-2.7 baseline.\n\n';

let anyUnique = false;
for (const url of [...allUrls].sort()) {
  const t = tlsSections[url] || [];
  const v = vmlSections[url] || [];
  const tCounts = {};
  const vCounts = {};
  for (const b of t) tCounts[b.first] = (tCounts[b.first] || 0) + 1;
  for (const b of v) vCounts[b.first] = (vCounts[b.first] || 0) + 1;
  const unique = [];
  for (const [first, count] of Object.entries(tCounts)) {
    const vCount = vCounts[first] || 0;
    const diff = count - vCount;
    if (diff > 0) {
      unique.push({ first, diff });
    }
  }
  if (unique.length > 0) {
    anyUnique = true;
    out += '## ' + url + '\n\n';
    for (const u of unique) {
      out += '- ' + u.first;
      if (u.diff > 1) out += ' (x' + u.diff + ')';
      out += '\n';
    }
    out += '\n';
  }
}

if (!anyUnique) {
  out += 'No significant errors were found only on the TLS branch; all errors also appeared on the VML baseline.\n';
}

fs.writeFileSync(outPath, out, 'utf8');
console.log('Diff written to ' + outPath);
