const fs = require('fs');
const [src, dst] = process.argv.slice(2);
if (!src || !dst) {
  console.error('Usage: node parse.js <source-overflow.txt> <dest.md>');
  process.exit(1);
}
const raw = fs.readFileSync(src, 'utf8');
const lines = raw.split(/\r?\n/);
let i = lines.findIndex(l => l.trim() === '### Result');
if (i === -1 || i + 1 >= lines.length) {
  console.error('Could not find ### Result section');
  process.exit(1);
}
const resultLine = lines[i + 1];
try {
  const md = JSON.parse(resultLine);
  fs.writeFileSync(dst, md, 'utf8');
  console.log('Report written to ' + dst);
} catch (e) {
  console.error('JSON parse failed:', e.message);
  process.exit(1);
}
