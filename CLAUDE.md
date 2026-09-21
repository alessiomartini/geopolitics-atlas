# Claude Code instructions

## Project

Static geopolitics atlas with content, map data, JavaScript, and a worker.

## Verification

- Preview with a local HTTP server and test the affected page in a browser.
- Check the browser console and the worker/data-loading path for errors.
- Validate changed JSON/data files with the existing format and representative
  entries; do not silently alter historical facts or source attribution.

## Workflow

- Read `README.md` and the relevant content/data/script files before editing.
- Keep content in data files rather than hardcoding it into templates.
- Do not add a build system or dependencies without approval.
- Inspect the diff and report browser/data verification before committing.
- Check `FUTURE-ARCHITECTURE.md` for open ideas before proposing new work.

## Worker (`worker/`)

- Cloudflare Worker (`worker/src/index.js`) + D1 database (`worker/schema.sql`,
  table `notes`) behind the site's floating note widget
  (`js/notes-widget.js`). Has its own `package.json` (only `wrangler` as a
  devDependency).
- After changing `worker/package.json`, run `cd worker && npm install &&
  npx wrangler deploy --dry-run` to check the config still resolves before a
  real `wrangler deploy`.
- This is a per-site D1+Worker; do not merge it with another site's database
  without reading the "Feedback centralizzato" section in
  `FUTURE-ARCHITECTURE.md` first — it is an unresolved idea, not a decision.
