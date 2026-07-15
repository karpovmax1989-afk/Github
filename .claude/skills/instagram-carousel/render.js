// Render an Instagram carousel HTML to one PNG per slide.
//
// Usage:  NODE_PATH=<path-to-node_modules> node render.js [input.html] [outDir]
//   input.html  default: template.html (in this folder)
//   outDir      default: current working directory
//
// Requires the `playwright` npm package and the Chromium at
// /opt/pw-browsers/chromium (preinstalled in Claude Code web sessions).
// Each element with class "slide" becomes slide-1.png, slide-2.png, ... in order.

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const input = path.resolve(process.argv[2] || path.join(__dirname, 'template.html'));
const outDir = path.resolve(process.argv[3] || process.cwd());

(async () => {
  if (!fs.existsSync(input)) { console.error('Input not found: ' + input); process.exit(1); }
  const exe = '/opt/pw-browsers/chromium';
  const browser = await chromium.launch(fs.existsSync(exe) ? { executablePath: exe } : {});
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  await page.goto('file://' + input);
  await page.waitForTimeout(400); // let the sunburst script paint
  const slides = await page.$$('.slide');
  if (!slides.length) { console.error('No .slide elements found in ' + input); process.exit(1); }
  for (let i = 0; i < slides.length; i++) {
    const out = path.join(outDir, `slide-${i + 1}.png`);
    await slides[i].screenshot({ path: out });
    console.log('saved ' + out);
  }
  await browser.close();
})();
