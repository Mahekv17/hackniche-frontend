// Simple SVG icon generator — produces valid SVG files that browsers will display as icons
const fs = require('fs');
const path = require('path');

function makeSVG(size) {
  const r = Math.round(size * 0.15);
  const cx = size / 2;
  const cy = size / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${r}" fill="#58CC02"/>
  <!-- Shield body -->
  <path d="M${cx} ${cy - size*0.28} L${cx + size*0.22} ${cy - size*0.14} L${cx + size*0.22} ${cy + size*0.06} Q${cx + size*0.22} ${cy + size*0.26} ${cx} ${cy + size*0.28} Q${cx - size*0.22} ${cy + size*0.26} ${cx - size*0.22} ${cy + size*0.06} L${cx - size*0.22} ${cy - size*0.14} Z" fill="white"/>
  <!-- Checkmark -->
  <polyline points="${cx - size*0.10},${cy + size*0.02} ${cx - size*0.01},${cy + size*0.11} ${cx + size*0.13},${cy - size*0.09}" fill="none" stroke="#58CC02" stroke-width="${size * 0.065}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

const publicDir = path.join(__dirname, 'public');

// Write 192x192
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.svg'), makeSVG(192));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.svg'), makeSVG(512));
// Also write a maskable icon (with more padding)
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-192x192.svg'), makeSVG(192));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.svg'), makeSVG(180));

console.log('✅ SVG icons written to public/');
