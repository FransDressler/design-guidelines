// node tools/content-lint.js [files/dirs…]  → flags filler phrases, lorem ipsum, generic CTAs, adjective triplets; exit 1 on hits
// Lines containing "lint-ok" are skipped (e.g. docs that list the banned words).
const fs = require('fs'), path = require('path');
const BAD = [
  'nahtlos', 'revolution\\w*', 'innovativ\\w*', 'ganzheitlich\\w*', 'maßgeschneidert\\w*', 'nächste[ns]? level', 'mehrwert', 'synergie\\w*', 'entfesseln', 'potenzial(e)? (frei|entfalten)', 'schnelllebigen welt',
  'mehr erfahren', 'jetzt loslegen', 'willkommen auf unserer', 'seamless\\w*', 'revolutioniz\\w*', 'empower\\w*', 'unlock\\w*', 'elevate\\w*', 'leverag\\w*', 'cutting[- ]edge', 'next[- ]level', 'game[- ]changer',
  'supercharg\\w*', 'streamlin\\w*', 'get started', 'learn more', 'fast-paced world', 'lorem ipsum', 'dolor sit amet', 'your (company|brand) name',
];
const RE = new RegExp('\\b(' + BAD.join('|') + ')\\b', 'i');
const TRIPLET = /\b([A-ZÄÖÜa-zäöüß]+(ig|lich|bar|iv|sam|el)),\s+([A-ZÄÖÜa-zäöüß]+(ig|lich|bar|iv|sam|el))\s+(und|&|and)\s+([A-ZÄÖÜa-zäöüß]+(ig|lich|bar|iv|sam|el))\b/;
const args = process.argv.slice(2).length ? process.argv.slice(2) : ['.'];
const skip = /(^|\/)(node_modules|debug|dist|\.git|shots|ui)(\/|$)/;
const files = [];
const walk = p => { if (skip.test(p)) return; const s = fs.statSync(p); if (s.isDirectory()) fs.readdirSync(p).forEach(f => walk(path.join(p, f))); else if (/\.(html|md|tsx)$/.test(p)) files.push(p); };
args.forEach(walk);
let hits = 0;
for (const f of files) {
  fs.readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
    if (/lint-ok/.test(line)) return;
    const text = line.replace(/<[^>]+>/g, ' ');
    const m = text.match(RE) || text.match(TRIPLET);
    if (m) { hits++; console.log(`${f}:${i + 1}  „${m[0]}“  ${text.trim().slice(0, 90)}`); }
  });
}
console.log(hits ? `\n${hits} Treffer in ${files.length} Dateien` : `ok: ${files.length} Dateien ohne Floskeln`);
process.exit(hits ? 1 : 0);
