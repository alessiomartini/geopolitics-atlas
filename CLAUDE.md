# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working across sessions

This repo is worked on by independent Claude Code sessions over time, not
one continuous conversation. Coherence across sessions is maintained by
three files, not by memory:

- **Before starting non-trivial work**, read `FUTURE-ARCHITECTURE.md` —
  it holds in-progress items, known rough edges, and pending ideas that a
  fresh session has no other way to know about.
- **Before stopping**, update `FUTURE-ARCHITECTURE.md`: move what you
  finished out of "In progress", add anything you noticed but didn't fix
  under "Known small issues" or "Ideas not yet built", and leave enough
  context on anything unfinished that a cold session can pick it up.
- **Keep `README.md`'s "Status" section accurate** if you change the
  conflict roster or a major deployed piece (e.g. the notes worker).
- **Only edit this file (`CLAUDE.md`) when the actual architecture
  changes** — a new moving part, a changed convention, a new command.
  Routine content edits (writing/updating a conflict's prose) don't
  belong here.

## Commands

There is no build, lint, or test tooling in this repo — it's plain
HTML/CSS/JS deployed as-is, with no root-level `package.json`.

- **Preview locally**: `python3 -m http.server 8000` from the repo root,
  then open `http://localhost:8000/`. Required because `page-loader.js`
  uses `fetch()` to load markdown, which browsers block under a
  `file://` URL.
- **Deploy the notes Worker**: GitHub Actions → *Deploy Notes Worker*
  (`.github/workflows/deploy-notes-worker.yml`, `workflow_dispatch` only).
  Creates the D1 database if it doesn't already exist, substitutes its id
  into `worker/wrangler.jsonc`, applies `worker/schema.sql`
  (idempotent — `CREATE TABLE IF NOT EXISTS`), then `wrangler deploy`.
  Needs the `CLOUDFLARE_API_TOKEN` repo secret.
- **Read back saved notes**: GitHub Actions → *Read Notes*
  (`.github/workflows/read-notes.yml`, `workflow_dispatch` only). Prints
  every row from D1 to the job log — a fallback for when the Cloudflare
  MCP connector isn't available in-session. Read-only, no side effects.
- **Worker local dev**: `cd worker && npm install && npm run dev`
  (`wrangler dev`).
- No test suite exists for the Worker or the front end.

## Architecture

### Static site, zero build step
Everything outside `worker/` deploys to GitHub Pages exactly as it sits
in the repo — no bundler, no transpilation. `worker/` is a separate
Node/wrangler project, deployed independently (see Commands above), and
is the *only* part of this repo with a `package.json` or dependencies.

### Content, template, and registry are three files that must agree by convention
Nothing in the repo enforces this link — it's worth understanding because
the failure mode is silent:

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
browser console — not a build failure. There is no CI check for this (see
`FUTURE-ARCHITECTURE.md` for a proposed one). When adding or renaming a
conflict, update all three files together; see README's "Adding a new
conflict".

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
SOURCES.md" — no such file exists; see `FUTURE-ARCHITECTURE.md`.) When
writing or editing conflict content, the rules on `sources.html` are
normative, not just the tier list.

### Notes widget + Cloudflare Worker (write-only by design)
`js/notes-widget.js` is injected on every page (`index.html`,
`sources.html`, every `conflicts/*.html`) and POSTs free-text notes to a
Cloudflare Worker (`worker/src/index.js`) backed by D1
(`worker/schema.sql`: a single `notes` table). The Worker deliberately
exposes **no read endpoint** — notes are the site owner's private scratch
list and are read back only via the Cloudflare MCP connector, dashboard,
`wrangler d1 execute`, or the *Read Notes* Action, never over the public
site. If that ever changes, it should stay owner-only (see
`FUTURE-ARCHITECTURE.md`) — the write-only design is intentional, not an
oversight.

CORS is a hardcoded origin allowlist in `worker/src/index.js`
(`ALLOWED_ORIGINS`) — update it there if the site's deployed origin
changes. A hidden honeypot field (`website`) makes bot submissions return
a fake success instead of an error, so scripted spam doesn't learn to
route around it.

Both Worker-related GitHub Actions workflows are `workflow_dispatch`
only, never triggered on push — they touch real Cloudflare
infrastructure (D1 creation, Worker deploy) and must not fire on every
commit to the site content.

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
  `FUTURE-ARCHITECTURE.md`.
