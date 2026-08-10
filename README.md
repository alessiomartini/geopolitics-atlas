# Geopolitics Atlas

Personal reference site summarizing ongoing conflicts: historical context,
verified facts, and contested narratives, each with cited sources. Plain
HTML/CSS/JS, no build step, deployable directly on GitHub Pages.

Not intended for search indexing (`robots.txt` and per-page `noindex` are
set accordingly).

## Other projects in this repository

- [`realtime-earth/`](realtime-earth/) — **The Real-Time Earth**, a modular
  catalog of live global data feeds, deployed separately as a single Cloudflare
  Worker. It has its own build, dependencies and CI workflow, and does not
  affect the static site described below.

## Structure

```
index.html            Homepage with the interactive world map
css/style.css          Shared styles for all pages
js/map.js              Renders the map (d3 + world-atlas topojson) and marker tooltips/clicks
js/page-loader.js      Fetches a conflict's markdown and renders it into the page template
data/conflicts.js      Registry of conflicts shown on the map (id, title, summary, coordinates, links)
conflicts/*.html       One page per conflict, sharing a common template
content/*.md           Markdown source for each conflict's write-up
content/_template.md   Starting point for new conflicts
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
