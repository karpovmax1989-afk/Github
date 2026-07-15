---
name: instagram-carousel
description: >
  Build a polished multi-slide Instagram carousel of infographics (1080x1350 PNGs)
  from an HTML template — vivid palette, large readable numbers, and a subtle
  second-plane "sunburst" motif. Use whenever the user asks to make an Instagram
  post / carousel / инфографику / карусель / слайды for a topic (product update,
  stats, tips, announcement). Renders HTML to PNG with Playwright.
---

# Instagram carousel infographics

Turns a topic into a set of square-portrait Instagram slides (1080×1350) that read
as one cohesive series: a cover, a numbers slide, and a capability grid + CTA. The
look is intentionally bold — saturated gradients, a serif display face for big
numbers, a recurring bright accent, and a faint Claude-style sunburst behind the
content.

## Files in this skill
- `template.html` — the 3-slide carousel. Two palette presets inside (VIVID / WARM);
  edit text, numbers, and colors here. Add or remove `.slide` blocks freely.
- `render.js` — renders each `.slide` to `slide-1.png`, `slide-2.png`, … via Playwright.

## Design system (keep these invariant)
- **Canvas:** 1080×1350 per slide, rendered at deviceScaleFactor 2 (→ 2160×2700 PNG).
- **Type:** serif (`DejaVu Serif`/Georgia) for headlines & numbers; sans
  (`Liberation Sans`/system) for kickers, labels, body. Numbers are huge (~150px),
  tabular, tight tracking.
- **Layout rhythm:** kicker (uppercase, wide tracking) → serif headline → content;
  a small footer line with a colored dot at the bottom of every slide.
- **Three slide types:** `.s1` cover (hook + one `<em>` highlight word), `.s2`
  numbers (2–3 `.stat` blocks = big `.num` + `.txt` with `<b>` label and `<span>`
  caption), `.s3` grid (four `.cap` cards + serif `.cta`).
- **Second-plane motif:** each slide has ≥1 `<svg data-burst>` (radial sunburst,
  drawn by the inline script) plus loose circles/dots. Recolor via `data-color` /
  `data-op`; keep opacity low (0.1–0.24) so text stays dominant.
- **Palette:** two presets ship in `template.html`. VIVID = magenta→coral cover,
  dark-indigo numbers slide with neon yellow/teal/pink figures, teal→blue grid.
  WARM = clay/cream editorial. Whatever palette you choose, keep a single bright
  accent recurring on all slides and high text/background contrast.

## Workflow
1. **Copy** `template.html` into the scratchpad (never edit the skill copy for a
   one-off): `cp .claude/skills/instagram-carousel/template.html <scratch>/carousel.html`
2. **Edit** the copy for the topic: rewrite each slide's text, swap the three stat
   numbers, pick/adjust the palette preset. Add/remove slides as needed.
3. **Install Playwright once** (browser is preinstalled, skip its download):
   `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install playwright --no-save --silent`
   (run in a dir with a `node_modules`; remember its path for `NODE_PATH`).
4. **Render:** `NODE_PATH=<node_modules> node .claude/skills/instagram-carousel/render.js <scratch>/carousel.html <scratch>`
5. **Review every PNG** with the Read tool — check for text overflow, headline/number
   collisions, and awkward line breaks. Fix in the HTML and re-render. (The numbers
   slide is the usual offender: shrink `.num` font-size or shorten the headline if
   the first stat crowds the heading.)
6. **Deliver** the PNGs with SendUserFile. Optionally build a single preview page
   that stacks all slides in a column (embed each PNG as a base64 `data:` URI in one
   `.col` flex container) and send it with `display: render` so the user can review
   the whole carousel in the side panel.

## Honesty rule for numbers
Infographics invite invented statistics. Only put a figure on a slide if it's
verified or clearly framed as illustrative. Keep a "цифры — ориентир" note in the
footer when unsure, and tell the user in chat which numbers to confirm before
posting. Never fabricate benchmark percentages or precise metrics.

## Cleanup
The temporary `node_modules` from step 3 is a build artifact — delete it (or install
it outside the repo) so it doesn't get committed. Deliverable PNGs and the working
HTML belong in the scratchpad, not the repo.
