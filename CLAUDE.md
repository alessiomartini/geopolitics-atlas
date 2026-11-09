# CLAUDE.md

## Project

Static geopolitics atlas: per-conflict content, map data, front-end
JavaScript, and a notes widget that posts to the shared `site-notes` Worker.

## Commands

There is no build, lint, or test tooling in this repo — it's plain
HTML/CSS/JS deployed as-is, with no root-level `package.json`.

- **Consistency check**: `node scripts/check-consistency.mjs` (no deps; also run by CI on push/PR) — run it after adding or editing a conflict.
- **Preview locally**: `python3 -m http.server 8000` from the repo root,
  then open `http://localhost:8000/`. Required because `page-loader.js`
  uses `fetch()` to load markdown, which browsers block under a
  `file://` URL.
- **Read saved notes**: they live in the shared `site-notes` D1 (`site = 'geopolitics-atlas'`); Claude reads them with wrangler (procedure in `site-notes/CLAUDE.md`).
- No test suite exists for the front end.

## Architecture

### Static site, zero build step
Everything deploys to GitHub Pages exactly as it sits in the repo — no
bundler, no transpilation, no `package.json`. Do not add a build system
or new dependencies without explicit approval.

### Content, template, and registry are three files that must agree by convention
`scripts/check-consistency.mjs` (run by CI) checks that they agree; without it the failure mode is silent:

- **`data/conflicts.js`** — the map registry. One entry per conflict:
  `id`, `title`, tooltip `summary`, `coordinates`, and the `page`/`content`
  relative paths. `js/map.js` reads this to place markers and wire
  click-through.
- **`conflicts/<id>.html`** — a near-identical template page per
  conflict. Pages differ only in `<title>` and the inline `CONTENT_FILE`
  variable. Each declares four empty containers,
  `<div data-section="...">`, one per required section.
- **`content/<id>.md`** — the actual prose. `js/page-loader.js` fetches
  it at *runtime, in the browser* and splits it on H1 (page title) / H2
  (section) boundaries with a small hand-rolled parser
  (`splitIntoSections()`) — this is not a static site generator, nothing
  runs at build or deploy time. Section keys are matched
  case-insensitively against the H2 text.

If an `id` doesn't match across all three, a content file is missing, or
an H2 heading in the markdown doesn't exactly match (mod case) the
`data-section` attribute in the HTML, the result is a silent
"TODO: content not yet written for this section" or a failed fetch in the
browser console — not a build failure. When adding or renaming a
conflict, update all three files together; see README's "Adding a new
conflict". Keep content in these data files rather than hardcoding it
into templates.

### The source-tier framework is the site's thesis, not a footnote
`data/sources.js` defines two independent axes applied to every
citation: editorial-reliability **tier** (A–E) and epistemological
**source type** (primary/secondary/tertiary/quaternary). `sources.html`
renders that registry via `js/sources.js`. The citation *rules* derived
from those axes — how much tier a claim needs depending on how
consequential it is, that disagreeing figures are shown side by side
rather than one being silently picked, that an involved party's own
claims are attributed by name and belong under "Contested Narratives"
unless third-party corroborated — live as prose on `sources.html`
itself. (A stale comment at the top of `data/sources.js` still says "see
SOURCES.md" — no such file exists; see `ROADMAP.md`.) When
writing or editing conflict content, the rules on `sources.html` are
normative, not just the tier list.

### Notes widget (write-only by design)
`js/notes-widget.js` is injected on every page (`index.html`,
`sources.html`, every `conflicts/*.html`) and POSTs free-text notes to the
shared `site-notes` Worker (`https://site-notes.alemarti-2001.workers.dev/geopolitics-atlas/notes`,
repo `alessiomartini/site-notes`, one D1 for all of Alessio's sites). The site never reads notes back (site-notes is write-only; Claude reads them from the D1 with wrangler). A hidden honeypot field
(`website`) makes bot submissions return a fake success. The origin
allowlist lives in that repo's `src/index.js`.

### Privacy posture
`robots.txt` disallows everything, and every page sets
`<meta name="robots" content="noindex, nofollow">`. This is a personal
reference site on a public URL for convenience, not for public
discoverability — keep that meta tag on any new page.

## Editorial conventions for `content/*.md`

Multiple sessions write and edit conflict prose over time; these keep the
output consistent rather than each page reading like a different author:

- Keep the four `##` headings byte-for-byte identical to
  `content/_template.md` — the loader matches on exact (case-insensitive)
  text.
- Cite inline as `([Outlet](url))` immediately after the sentence or
  clause it supports — see `content/gaza.md` for the established style,
  including how to cite two disagreeing sources for the same figure
  (`([Source A](url), [Source B](url))`).
- Follow `sources.html`'s citation rules, not just the tier list: the
  more consequential the claim, the higher the tier bar; disagreeing
  figures are both shown rather than one silently chosen; an involved
  party's own account is attributed by name and goes under "Contested
  Narratives" unless corroborated by a third party; Tier E sources are
  never used to establish a fact, only to represent what that party is
  saying.
- List every inline-cited source again as a linked bullet in that page's
  "Sources" section — every existing page does this.
- If a citation uses an outlet not already in `data/sources.js`, add it
  there with a tier before (or in the same change as) citing it.
- Content is written "current as of" a point in time, and fast-moving
  claims say so inline (see phrasing like "as of this writing" in
  existing pages). There's no automated staleness tracking yet — see
  `ROADMAP.md`.
- Do not silently alter historical facts, figures, or source attribution
  in existing content — a factual correction is a deliberate edit, not a
  side effect of a rewrite.
