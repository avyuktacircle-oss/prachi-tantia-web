/**
 * Flood-fill from edges to remove grey studio/pattern background.
 * Run: node scripts/cutout-portrait.cjs
 */
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const input = path.join(root, "public/images/hero/prachi-portrait.png");
const output = path.join(root, "public/images/hero/prachi-portrait-cutout.png");

function dist2(a, b) {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return dr * dr + dg * dg + db * db;
}

(async () => {
  const { data, info } = await sharp(input)
    .removeAlpha()
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const channels = 4;
  const src = Buffer.from(data);
  const n = w * h;

  const visited = new Uint8Array(n);
  const q = new Int32Array(n);
  let qh = 0;
  let qt = 0;

  const push = (i) => {
    if (!visited[i]) {
      visited[i] = 1;
      q[qt++] = i;
    }
  };

  const spreadOf = (i) => {
    const r = src[i * channels];
    const g = src[i * channels + 1];
    const b = src[i * channels + 2];
    return Math.max(r, g, b) - Math.min(r, g, b);
  };

  const lumOf = (i) => {
    const r = src[i * channels];
    const g = src[i * channels + 1];
    const b = src[i * channels + 2];
    return (r + g + b) / 3;
  };

  const rgb = (i) => [
    src[i * channels],
    src[i * channels + 1],
    src[i * channels + 2],
  ];

  const seed = (x, y) => {
    const i = y * w + x;
    const sp = spreadOf(i);
    const lum = lumOf(i);
    if (sp <= 24 && lum >= 65 && lum <= 238) push(i);
  };

  for (let x = 0; x < w; x++) {
    seed(x, 0);
    seed(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    seed(0, y);
    seed(w - 1, y);
  }

  const SIM2 = 42 * 42;
  const MAX_SPREAD = 30;

  while (qh < qt) {
    const cur = q[qh++];
    const cx = cur % w;
    const cy = (cur / w) | 0;
    const c = rgb(cur);

    for (const [dx, dy] of [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]) {
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
      const ni = ny * w + nx;
      if (visited[ni]) continue;

      const sp = spreadOf(ni);
      const lum = lumOf(ni);
      if (sp > MAX_SPREAD) continue;
      if (lum < 58 || lum > 248) continue;

      const d2 = dist2(rgb(ni), c);
      if (d2 > SIM2) continue;

      visited[ni] = 1;
      q[qt++] = ni;
    }
  }

  const out = Buffer.from(src);
  for (let i = 0; i < n; i++) {
    if (visited[i]) {
      out[i * channels + 3] = 0;
    } else {
      out[i * channels + 3] = 255;
    }
  }

  await sharp(out, {
    raw: { width: w, height: h, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(output);

  console.log("Wrote", output, `(${w}x${h}, ${qt} bg pixels)`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
