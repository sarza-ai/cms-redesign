import sharp from 'sharp';
import { mkdirSync } from 'fs';

/*
 * The sprite sheets are fully OPAQUE — the "transparent" checkerboard is baked
 * in as gray pixels (~123 and ~183, desaturated). So:
 *   1. Detect checkerboard-gray pixels.
 *   2. Flood fill from the image borders through those grays -> the true
 *      outside background (leaves gray detail *inside* a mushroom intact).
 *   3. Make the outside transparent.
 *   4. Connected-component label the remaining foreground -> individual
 *      mushrooms (bounding boxes may overlap; pixels don't).
 *   5. Crop + trim each to its own transparent PNG.
 *
 * Usage: node scripts/crop-mushrooms.mjs "<src.png>" <prefix>
 */

const SRC = process.argv[2] || 'design-assets/mushroom images 4.png';
const PREFIX = process.argv[3] || 'm';
const OUT = 'public/mushrooms';
const MAIN_AREA = 5000;
const ABSORB_AREA = 200;
const PAD = 10;

mkdirSync(OUT, { recursive: true });

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({
  resolveWithObject: true,
});
const { width, height, channels } = info;
const N = width * height;

// --- 1. checkerboard-gray test (wide range bridges the blended seams
//        between the two checker tones; whites/creams of mushrooms are
//        brighter than 208 so they survive) ---
const isBg = (i) => {
  const r = data[i * channels], g = data[i * channels + 1], b = data[i * channels + 2];
  if (Math.max(r, g, b) - Math.min(r, g, b) > 22) return false; // near-gray only
  const v = (r + g + b) / 3;
  return v > 100 && v < 208;
};

// --- 2. flood fill background from borders (8-connectivity) ---
const outside = new Uint8Array(N);
const stack = new Int32Array(N);
let sp = 0;
const pushIf = (p) => {
  if (p >= 0 && p < N && !outside[p] && isBg(p)) { outside[p] = 1; stack[sp++] = p; }
};
for (let x = 0; x < width; x++) { pushIf(x); pushIf((height - 1) * width + x); }
for (let y = 0; y < height; y++) { pushIf(y * width); pushIf(y * width + width - 1); }
while (sp > 0) {
  const p = stack[--sp];
  const x = p % width, y = (p - x) / width;
  if (x > 0) pushIf(p - 1);
  if (x < width - 1) pushIf(p + 1);
  if (y > 0) pushIf(p - width);
  if (y < height - 1) pushIf(p + width);
  if (x > 0 && y > 0) pushIf(p - width - 1);
  if (x < width - 1 && y > 0) pushIf(p - width + 1);
  if (x > 0 && y < height - 1) pushIf(p + width - 1);
  if (x < width - 1 && y < height - 1) pushIf(p + width + 1);
}

// --- 3. foreground mask + transparent RGBA buffer ---
const out = Buffer.alloc(N * 4);
for (let i = 0; i < N; i++) {
  out[i * 4] = data[i * channels];
  out[i * 4 + 1] = data[i * channels + 1];
  out[i * 4 + 2] = data[i * channels + 2];
  out[i * 4 + 3] = outside[i] ? 0 : 255;
}

// --- 4. connected components on foreground ---
const labels = new Int32Array(N);
let cur = 0;
const comps = [];
for (let s = 0; s < N; s++) {
  if (outside[s] || labels[s]) continue;
  cur++;
  let q = 0;
  stack[q++] = s;
  labels[s] = cur;
  let minX = width, minY = height, maxX = 0, maxY = 0, area = 0;
  while (q > 0) {
    const p = stack[--q];
    const x = p % width, y = (p - x) / width;
    area++;
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
    if (x > 0 && !outside[p - 1] && !labels[p - 1]) { labels[p - 1] = cur; stack[q++] = p - 1; }
    if (x < width - 1 && !outside[p + 1] && !labels[p + 1]) { labels[p + 1] = cur; stack[q++] = p + 1; }
    if (y > 0 && !outside[p - width] && !labels[p - width]) { labels[p - width] = cur; stack[q++] = p - width; }
    if (y < height - 1 && !outside[p + width] && !labels[p + width]) { labels[p + width] = cur; stack[q++] = p + width; }
  }
  comps.push({ minX, minY, maxX, maxY, area, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 });
}

const bodies = comps.filter((c) => c.area >= MAIN_AREA).sort((a, b) => a.cx - b.cx);
const smalls = comps.filter((c) => c.area >= ABSORB_AREA && c.area < MAIN_AREA);
for (const s of smalls) {
  let best = null, bestD = Infinity;
  for (const b of bodies) {
    if (s.cx >= b.minX - 30 && s.cx <= b.maxX + 30 && s.cy >= b.minY - 20 && s.cy <= b.maxY + 90) {
      const d = Math.abs(s.cx - b.cx);
      if (d < bestD) { bestD = d; best = b; }
    }
  }
  if (best) {
    best.minX = Math.min(best.minX, s.minX); best.minY = Math.min(best.minY, s.minY);
    best.maxX = Math.max(best.maxX, s.maxX); best.maxY = Math.max(best.maxY, s.maxY);
  }
}

console.log(`${SRC}: ${comps.length} blobs -> ${bodies.length} mushrooms`);

let n = 0;
for (const b of bodies) {
  const left = Math.max(0, Math.round(b.minX) - PAD);
  const top = Math.max(0, Math.round(b.minY) - PAD);
  const w = Math.min(width - left, Math.round(b.maxX - b.minX) + 1 + PAD * 2);
  const h = Math.min(height - top, Math.round(b.maxY - b.minY) + 1 + PAD * 2);
  if (w <= 0 || h <= 0) continue;
  n++;
  const name = `${OUT}/${PREFIX}${n}.png`;
  console.log(`  ${name}  extract{left:${left},top:${top},w:${w},h:${h}} (area ${b.area})`);
  try {
    await sharp(out, { raw: { width, height, channels: 4 } })
      .extract({ left, top, width: w, height: h })
      .png()
      .toFile(name);
  } catch (err) {
    console.log(`    !! ${err.message}`);
  }
}
console.log(`Wrote ${n} mushrooms.`);
