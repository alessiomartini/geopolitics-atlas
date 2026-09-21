# Geopolitics Atlas

Personal reference site summarizing ongoing conflicts: historical context,
verified facts, and contested narratives, each with cited sources. Plain
HTML/CSS/JS, no build step, deployable directly on GitHub Pages.

Not intended for search indexing (`robots.txt` and per-page `noindex` are
set accordingly).

## Structure

```
index.html              Homepage with the interactive world map
sources.html            Full source list across all conflicts
css/style.css           Shared styles for all pages
js/map.js               Renders the map (d3 + world-atlas topojson) and marker tooltips/clicks
js/page-loader.js       Fetches a conflict's markdown and renders it into the page template
js/sources.js           Builds the sources.html listing from data/conflicts.js
js/notes-widget.js      Floating note widget, posts to the Cloudflare Worker
data/conflicts.js       Registry of conflicts shown on the map (id, title, summary, coordinates, links)
conflicts/*.html        One page per conflict, sharing a common template
content/*.md            Markdown source for each conflict's write-up
content/_template.md    Starting point for new conflicts
worker/                 Cloudflare Worker + D1 schema for the notes widget (see worker/README.md)
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

## Previewing locally

The site uses `fetch()` to load markdown content, which most browsers
block under a `file://` URL. Serve the directory over local HTTP instead,
e.g. from the project root:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/` in a browser. Any static file server
works the same way (e.g. `npx serve`, VS Code's Live Server extension).

## Notes widget

Every page has a floating note widget (`js/notes-widget.js`) for jotting down
feedback while browsing the site. Notes are posted to a small Cloudflare
Worker (`worker/`) and stored in a dedicated D1 database (`worker/schema.sql`,
table `notes`). There is no read endpoint exposed on the site — notes are read
back directly from D1 (dashboard, `wrangler d1 execute`, or the Cloudflare MCP
connector). See `worker/README.md` for setup and deploy instructions.

## Deploying

The site itself is plain static files: push to the branch GitHub Pages is
configured to serve, nothing to build. The Worker is deployed separately
(`cd worker && npm install && npx wrangler deploy`) and only needs
redeploying when `worker/src/index.js` or the D1 schema changes.
