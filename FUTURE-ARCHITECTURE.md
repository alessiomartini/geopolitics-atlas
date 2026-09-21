# Future Architecture & Backlog

Standing scratchpad for work that spans sessions: what's in progress,
known rough edges, and ideas not yet built. This is not a changelog —
git history is the changelog, and finished work should be a short pointer
here at most (see "Recently resolved"), not a re-description.

## How to use this file

- **Read it before starting** non-trivial work in this repo.
- **Update it before stopping.** Move anything you finished into
  "Recently resolved" (one line, with the date and a pointer to the
  commit/PR), keeping roughly the last 5 entries and pruning older ones.
  Add anything you noticed but didn't fix under "Known small issues" or
  "Ideas not yet built".
- If you start something and don't finish it in-session, leave it under
  "In progress" with enough context — not just a title — that a cold
  session (yours later, or someone else's) can continue it without
  re-deriving what you already figured out.
- This file is a backlog, not a design doc: keep entries short and
  actionable. If an idea needs real design work before it's buildable,
  say what decision is blocking it, not a full spec.

## In progress / partially done

- **Pending notes in D1 are un-triaged.** The site owner has had the
  "+ Note" widget (`js/notes-widget.js`) live since the Worker was
  deployed (2026-08-17) and may have left ideas, fixes, or corrections
  through it. This pass had no authorized Cloudflare access in-session,
  so those notes were not read and are not reflected anywhere below. The
  next session with Cloudflare MCP/dashboard access (or that runs the
  *Read Notes* GitHub Action) should pull them, triage each into the
  right section of this file, and remove this item.

## Known small issues

- `data/sources.js`'s header comment says "see SOURCES.md for the
  citation rules" — no `SOURCES.md` exists. The actual rules live as
  prose on `sources.html` ("Citation rules" section). Either fix the
  comment to point at `sources.html`, or extract a real `SOURCES.md` and
  have `sources.html` pull from it — don't end up with the rules
  duplicated in two places that can drift apart.
- Nothing validates that `data/conflicts.js`, `conflicts/<id>.html`, and
  `content/<id>.md` stay in sync (see `CLAUDE.md`, "Content, template,
  and registry"). A typo'd id, a missing content file, or a renamed `##`
  heading fails silently in the browser — not at deploy time.
- Conflict content has no structured "last verified" marker distinct
  from whatever date phrasing happens to be in the prose itself — see
  "Content staleness tracking" below.

## Ideas not yet built

### Content staleness tracking
22 fast-moving conflicts, each written "current as of" some point in
time, with no structured way to tell which pages are oldest or most
overdue for a re-check. Worth considering: a `lastVerified` field per
entry in `data/conflicts.js`, surfaced as a small "as of `<date>`" note
on each conflict page; or simply a periodic re-verification pass logged
in this file. Undecided which — needs a decision before starting, not
just implementation.

### Timeline / event-log view per conflict
`js/notes-widget.js`'s own placeholder hint text uses "add a timeline
view for Sudan" as an example note — worth treating as a real idea, not
just UI copy: a chronological list of dated events per conflict,
separate from the four-section narrative prose. Blocked on a data-shape
decision: an additional markdown section (breaks the current fixed
four-heading contract) vs. a separate structured file per conflict (e.g.
`data/timelines/<id>.js`, rendered by a new small script).

### Validate the three-way content sync (README/CLAUDE.md known issue, made concrete)
A small standalone script — no framework needed — that checks: every
`id` in `data/conflicts.js` has a matching `content/<id>.md` and
`conflicts/<id>.html`; every `##` heading in each `content/<id>.md`
matches one of the four expected section names exactly. Would catch the
silent-failure mode described in `CLAUDE.md` at review/PR time instead of
by noticing a blank section in the browser. No CI runner is currently
wired up in `.github/workflows/` for anything other than the two
Worker-deploy jobs, so this would also need a workflow file if it's
meant to run automatically rather than just locally.

### Source registry cross-check
A script asserting every outlet URL cited inline across `content/*.md`
resolves to an entry already present in `data/sources.js` — would catch
a citation to a source that was never tier-classified before it ships.

### Revisiting notes-widget read access
If there's ever a reason to browse past notes in-site rather than via
Cloudflare tooling, it must stay owner-authenticated — the current
write-only, no-read-endpoint design (see `CLAUDE.md`) is a deliberate
privacy choice, not a gap to casually close by adding a public `GET
/notes`.

### Cross-site feedback consolidation (idea, not decided)
This site, like `ear-training`, has its own dedicated Cloudflare D1 +
Worker for its notes widget (here: `worker/schema.sql`, table `notes`,
Worker in `worker/src`). Several of Alessio's other sites
(`eating-amsterdam`, `markets-first-principles`, `realtime-earth`) follow
the same per-site D1+Worker pattern for a similar purpose.

Worth considering, at low priority since the current per-site setup
works: consolidating into a single D1 database shared across all of
Alessio's sites, e.g. `notes(id, site, page, text, created_at, ...)`
with a `site` column to distinguish origin, behind one Worker with a
per-domain CORS allowlist.

Pro: one Cloudflare account/database/Worker to maintain instead of one
per site; a single place to read notes from every site at once.
Con: a bug in the shared Worker would break note collection for every
site simultaneously, instead of staying isolated to one; existing D1
history per site would need migrating. No action needed now — revisit if
maintaining N separate D1+Worker pairs becomes a real burden.

## Recently resolved

- 2026-08-17 — Notes-taking widget + Cloudflare Worker/D1 deployed and
  wired to the live site, plus a manual "Read Notes" Action as a
  connector-less fallback. `git log 2f22444..8b4ad0d`.
- 2026-08-10 — All 22 conflicts brought to complete four-section content
  (historical context through sources) and given map tooltip summaries;
  overlapping-marker rendering bug and two citation errors fixed in
  follow-up verification. `git log d86b4bb..123015a`.
- 2026-08-10 — Source reliability framework (`data/sources.js`,
  `sources.html`) added as the site's citation methodology. `5c7f43b`.
