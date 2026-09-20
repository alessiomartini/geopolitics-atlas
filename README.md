# Geopolitics Atlas

Personal reference site summarizing ongoing conflicts: historical context,
verified facts, and contested narratives, each with cited sources. Plain
HTML/CSS/JS, no build step, deployable directly on GitHub Pages.

Not intended for search indexing (`robots.txt` and per-page `noindex` are
set accordingly) — it's on a public URL for convenience of access, not
for public reach.

## Status

All 22 conflicts currently listed in `data/conflicts.js` have complete
four-section write-ups (no stub/TODO content remains). A "+ Note" widget
is deployed site-wide, posting free-text notes to a Cloudflare
Worker + D1 backend (`worker/`) for the site owner to read back later —
see `CLAUDE.md` for how that piece works and `FUTURE-ARCHITECTURE.md`
for what's still pending on it.

This project is edited across multiple independent working sessions over
time, sometimes by different Claude Code instances. `CLAUDE.md` and
`FUTURE-ARCHITECTURE.md` exist specifically to keep that coherent — see
"Working across sessions" below.

## Design principles

- **No build step, ever.** Every file outside `worker/` is deployed to
  GitHub Pages exactly as it sits in the repo. No bundler, no
  transpilation, nothing to run before pushing.
- **Content is separate from its template, and both are separate from
  the conflict registry.** A conflict's prose (`content/<id>.md`), its
  page shell (`conflicts/<id>.html`), and its map entry
  (`data/conflicts.js`) are three different files that have to agree by
  convention — nothing enforces the link between them. See "Adding a new
  conflict" below and `CLAUDE.md` for the failure mode when they drift.
- **The source-tier framework (`data/sources.js`, `sources.html`) is the
  actual point of the site**, not a footnote. Two independent axes —
  editorial-reliability tier and primary/secondary/tertiary source
  type — govern what evidence a claim needs before it can appear as fact
  rather than as an attributed, contested claim.
- **Muted "atlas/encyclopedia" visual language** (dark palette, serif
  body text, restrained accent color) — deliberately not styled like a
  breaking-news feed, because the content shouldn't read as more urgent
  or more certain than the sourcing behind it supports.
- **The notes widget is write-only on purpose.** It has no read endpoint
  and no in-site list of past notes; they're the owner's private scratch
  list, read back out-of-band (Cloudflare dashboard, `wrangler`, MCP, or
  the "Read Notes" GitHub Action).

## Structure

```
index.html              Homepage with the interactive world map
css/style.css            Shared styles for all pages
js/map.js                Renders the map (d3 + world-atlas topojson) and marker tooltips/clicks
js/page-loader.js        Fetches a conflict's markdown and renders it into the page template
js/sources.js            Renders the source-tier directory on sources.html
js/notes-widget.js       Site-wide "+ Note" widget, posts to the Cloudflare Worker below
data/conflicts.js        Registry of conflicts shown on the map (id, title, summary, coordinates, links)
data/sources.js          Source reliability tiers + the per-outlet registry
conflicts/*.html         One page per conflict, sharing a common template
content/*.md             Markdown source for each conflict's write-up
content/_template.md     Starting point for new conflicts
sources.html             Source tiers + citation-rules methodology page
worker/                  Cloudflare Worker + D1 schema backing the notes widget (see CLAUDE.md)
.github/workflows/       Manual (workflow_dispatch-only) deploy/read jobs for the Worker
```

## Adding a new conflict

1. Copy `content/_template.md` to `content/<id>.md` and keep the four
   `##` headings as-is (`Historical Context`, `Current State of Facts`,
   `Contested Narratives / Common Myths`, `Sources`) — the page template
   maps content into the page by these exact heading names.
2. Copy an existing page, e.g. `conflicts/gaza.html`, to
   `conflicts/<id>.html`. Update the `<title>` and the `CONTENT_FILE`
   inline script variable to point at `../content/<id>.md`.
3. Add an entry to `data/conflicts.js` with a unique `id`, `title`,
   short `summary`, `coordinates` (`[longitude, latitude]`) for the map
   marker, and the relative `page`/`content` paths.

That's it — the homepage map and the new page pick up automatically.
Follow the citation rules on `sources.html` when writing the content, and
add any newly-cited outlet to `data/sources.js` with a tier.

## Previewing locally

The site uses `fetch()` to load markdown content, which most browsers
block under a `file://` URL. Serve the directory over local HTTP instead,
e.g. from the project root:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/` in a browser. Any static file server
works the same way (e.g. `npx serve`, VS Code's Live Server extension).

## Working across sessions

Three files exist to keep separate working sessions coherent instead of
each one rediscovering context or quietly drifting from prior decisions:

- **`README.md`** (this file) — what the project is, its current state,
  and the ideas the structure is built on. Update the "Status" section
  when it goes stale (e.g. the conflict count changes, a new deployed
  piece is added).
- **`CLAUDE.md`** — operating instructions and architecture notes for
  Claude Code specifically: commands, how the moving parts fit together,
  and editorial conventions for content edits. Update it when the
  architecture itself changes, not for routine content edits.
- **`FUTURE-ARCHITECTURE.md`** — the standing backlog: work in progress,
  known rough edges, and ideas not yet built. Read it before starting
  non-trivial work; update it before stopping.
