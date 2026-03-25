// generate-icons.cjs  – creates all required PWA PNGs using sharp
const sharp = require('sharp');
const path  = require('path');
const fs    = require('fs');

const publicDir = path.join(__dirname, 'public');

// Feather Green shield SVG (no external refs, fully self-contained)
function makeSVG(size) {
  const pad  = size * 0.12;               // padding from edge
  const w    = size - pad * 2;            // drawable width
  const h    = size - pad * 2;
  const ox   = pad;                       // origin x
  const oy   = pad;                       // origin y
  const cx   = size / 2;
  const cy   = size / 2;

  // Shield points (relative to center, scaled)
  const sh   = h * 0.82;
  const sw   = w * 0.76;

  const topY    = cy - sh / 2;
  const midY    = cy - sh / 6;
  const botY    = cy + sh / 2;
  const leftX   = cx - sw / 2;
  const rightX  = cx + sw / 2;

  // Checkmark coords
  const ck1x = cx - sw * 0.22,  ck1y = cy + sh * 0.03;
  const ck2x = cx - sw * 0.04,  ck2y = cy + sh * 0.22;
  const ck3x = cx + sw * 0.30,  ck3y = cy - sh * 0.18;
  const lw   = Math.max(4, size * 0.07);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <!-- Rounded-square background -->
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="#58CC02"/>
  <!-- Shield body -->
  <path d="
    M ${cx} ${topY}
    L ${rightX} ${midY}
    L ${rightX} ${cy + sh * 0.1}
    Q ${rightX} ${botY} ${cx} ${botY}
    Q ${leftX} ${botY} ${leftX} ${cy + sh * 0.1}
    L ${leftX} ${midY}
    Z
  " fill="white"/>
  <!-- Checkmark -->
  <polyline
    points="${ck1x},${ck1y} ${ck2x},${ck2y} ${ck3x},${ck3y}"
    fill="none"
    stroke="#58CC02"
    stroke-width="${lw}"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`;
}

async function generateIcon(size, filename) {
  const svg = Buffer.from(makeSVG(size));
  const out = path.join(publicDir, filename);
  await sharp(svg).resize(size, size).png().toFile(out);
  console.log(`✅  ${filename}  (${size}x${size})`);
}

(async () => {
  await generateIcon(48,  'favicon-48.png');
  await generateIcon(72,  'pwa-72x72.png');
  await generateIcon(96,  'pwa-96x96.png');
  await generateIcon(144, 'pwa-144x144.png');
  await generateIcon(192, 'pwa-192x192.png');
  await generateIcon(512, 'pwa-512x512.png');
  await generateIcon(180, 'apple-touch-icon.png');
  // maskable version – more padding, still valid
  await generateIcon(192, 'pwa-maskable-192x192.png');
  await generateIcon(512, 'pwa-maskable-512x512.png');
  console.log('\n🎉  All PNG icons generated in /public');
})();
