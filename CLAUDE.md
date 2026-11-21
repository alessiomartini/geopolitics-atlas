# CLAUDE.md

Static geopolitics atlas (plain HTML/CSS/JS on GitHub Pages, no build step, no package.json).
Architecture and "Adding a new conflict" are in `README.md`.

## Commands

- `node scripts/check-consistency.mjs`: run after adding or editing a conflict (CI runs it too).
- Preview: `python3 -m http.server 8000`, then open http://localhost:8000/. `file://` fails because `js/page-loader.js` fetches the markdown.
- Notes are in the shared `site-notes` D1 (`site = 'geopolitics-atlas'`); the procedure to read them with wrangler is in `site-notes/CLAUDE.md` (sibling repo; if missing, skip and say so).
- Do not add a build system or dependencies without approval.

## Rules

- `data/conflicts.js`, `conflicts/<id>.html` and `content/<id>.md` must agree on the id and the four section headings; a mismatch fails silently in the browser, so change all three together and run the check.
- Every page keeps `<meta name="robots" content="noindex, nofollow">` (the site is public for convenience, not for discovery).
- The notes widget only writes to the shared `site-notes` Worker; never add a read endpoint.

## Editing `content/*.md`

The rules on `sources.html` (tier and source-type framework) are normative.

- Keep the four `##` headings identical to `content/_template.md`; the loader matches on them.
- Cite inline as `([Outlet](url))` right after the claim, as in `content/gaza.md`. Two disagreeing sources for one figure: `([Source A](url), [Source B](url))`, both shown, never silently pick one.
- The more consequential the claim, the higher the tier it needs. An involved party's own account is attributed by name and goes under "Contested Narratives" unless a third party corroborates it. Tier E sources only show what that party says, never establish a fact.
- List every inline-cited source again as a bullet in the page's "Sources" section.
- A new outlet goes into `data/sources.js` with a tier in the same change.
- Write "current as of" for fast-moving claims and update `lastVerified` in `data/conflicts.js` only after a real re-verification.
- Do not silently change historical facts, figures or attributions; a factual correction is a deliberate edit, noted in `ROADMAP.md`.
