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
