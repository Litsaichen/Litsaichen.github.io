# Li-Tsai Chen (陳立采) — personal portfolio website

Plain static site, deployed with GitHub Pages from the `main` branch root of
the repo `Litsaichen/Litsaichen.github.io` → https://litsaichen.github.io

No framework, no build step. Edit the files and push; Pages redeploys in about a minute.

## Files
- `index.html` — the whole site (home + four project detail views)
- `css/style.css` — theme colours at the top (`:root`), then the design's styles
- `js/main.js` — language toggle, project views, "load more", career-map lightbox
- `assets/` — images (web-compressed), CV PDF, demo video, favicon, og-image

## How the page works
- **Bilingual**: every piece of text exists twice, `<x-zh>…</x-zh>` and `<x-en>…</x-en>`.
  When editing text, always update BOTH languages. The language choice is saved in localStorage.
- **Project pages** are `<x-view data-view="…">` blocks in index.html, opened by URL hash:
  `#coffee` (草圖咖啡), `#fivesense` (五感地圖), `#gallery` (畫廊田野), `#mindthegap` (Mind the Gap).
  The home page is `<x-view data-view="home">`.
- Clickable things use `data-action="…"` (handled in js/main.js), e.g. `openCoffee`, `goProjects`.
- Site structure: About / Projects / Discover More (film photography + AI Dreamscape, merged into the homepage, expands with load more) / Contact.

## Conventions
- Images: resize to ≤1800px on the long side, JPEG quality ~80, before adding to `assets/`.
  Use lowercase English file names without spaces.
- All paths are relative (`assets/…`), so the site also works when opened locally.
- To preview locally: `python3 -m http.server` in this folder, then open http://localhost:8000
