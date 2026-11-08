// node tools/permute.js [seed] [--json]  → deterministic combination of layout × palette × type × radius × density × motion × skeleton × stickers
// Same seed → same site. Agents: pick the seed, then check the result fits the brand (mood/fits); re-roll if not.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const t = JSON.parse(fs.readFileSync(path.join(root, 'tokens/tokens.json'), 'utf8'));
const list = (dir, ext) => fs.existsSync(path.join(root, dir)) ? fs.readdirSync(path.join(root, dir)).filter(f => f.endsWith(ext)).map(f => f.replace(ext, '')).sort() : [];

const axes = {
  layout: list('layouts', '.html'),
  palette: Object.keys(t.palettes),
  type: Object.keys(t.type),
  radius: Object.keys(t.radius),
  density: Object.keys(t.density),
  motion: ['calm', 'lively', 'bold'],
  skeleton: ['pixel', 'scan', 'blur', 'type'],
  stickers: ['none', 'stamp', 'tape', 'badge', 'scribble'],
  grain: ['off', 'on'],
};

// mulberry32 on a string hash
let h = 1779033703;
const seed = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : String(Date.now());
for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 3432918353), h = h << 13 | h >>> 19;
const rnd = () => { h |= 0; h = h + 0x6D2B79F5 | 0; let x = Math.imul(h ^ h >>> 15, 1 | h); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; };

const pick = {};
for (const [k, v] of Object.entries(axes)) pick[k] = v[Math.floor(rnd() * v.length)];
const total = Object.values(axes).reduce((a, v) => a * Math.max(1, v.length), 1);

if (process.argv.includes('--json')) { console.log(JSON.stringify({ seed, ...pick })); process.exit(0); }
const p = t.palettes[pick.palette], ty = t.type[pick.type];
console.log(`seed ${seed}  (${total.toLocaleString('de-DE')} Kombinationen)\n`);
for (const [k, v] of Object.entries(pick)) console.log(`  ${k.padEnd(9)} ${v}`);
console.log(`\n  Palette:  ${p.mood} — passt zu ${p.fits}`);
console.log(`  Schrift:  ${ty.display} / ${ty.body} — ${ty.mood}`);
console.log(`\n<html lang="de" data-palette="${pick.palette}" data-type="${pick.type}" data-radius="${pick.radius}" data-density="${pick.density}" data-motion="${pick.motion}" data-skeleton="${pick.skeleton}" data-stickers="${pick.stickers}" data-grain="${pick.grain}">`);
console.log(`Layout-Vorlage: layouts/${pick.layout}.html`);
