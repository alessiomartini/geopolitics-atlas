# Roadmap

<!--
Unico file per todo, idee, decisioni e diario, letto da Projects Overview
(https://alessiomartini.github.io/projects-overview/). Protocollo: templates/ROADMAP.md di projects-overview.
-->

## Fatto
- [x] 22 conflitti con contenuto completo in quattro sezioni
- [x] Sistema di affidabilità delle fonti
- [x] Widget per le note + Worker/D1

## Da fare
- [ ] Smistare le note in attesa (ora nel D1 condiviso `site-notes`, `site = 'geopolitics-atlas'`)
- [x] Indicatore "ultima verifica" per ogni conflitto
- [x] Vista timeline per conflitto
- [x] Controllo automatico della coerenza tra `conflicts.js`, pagine e fonti (`scripts/check-consistency.mjs` + workflow CI)
- [x] Aggiungere a `data/sources.js` (con tier) le ~48 testate/domini citati nei contenuti ma assenti (es. news.un.org, cnn.com, britannica.com, feeds.bbci.co.uk, ohchr.org, euronews.com): oggi sono solo warning del check; poi promuoverli a errori

## Idee

- [ ] Studiare politics e geopolitics (corsi, letture) a supporto dell'atlante

### Ideas not yet built

#### Content staleness tracking

- [ ] Content staleness tracking
22 fast-moving conflicts, each written "current as of" some point in
time, with no structured way to tell which pages are oldest or most
overdue for a re-check. Worth considering: a `lastVerified` field per
entry in `data/conflicts.js`, surfaced as a small "as of `<date>`" note
on each conflict page; or simply a periodic re-verification pass logged
in this file. Undecided which — needs a decision before starting, not
just implementation.

#### Timeline / event-log view per conflict

- [ ] Timeline / event-log view per conflict
`js/notes-widget.js`'s own placeholder hint text uses "add a timeline
view for Sudan" as an example note — worth treating as a real idea, not
just UI copy: a chronological list of dated events per conflict,
separate from the four-section narrative prose. Blocked on a data-shape
decision: an additional markdown section (breaks the current fixed
four-heading contract) vs. a separate structured file per conflict (e.g.
`data/timelines/<id>.js`, rendered by a new small script).

#### Validate the three-way content sync (README/CLAUDE.md known issue, made concrete)

- [ ] Validate the three-way content sync (README/CLAUDE.md known issue, made concrete)
A small standalone script — no framework needed — that checks: every
`id` in `data/conflicts.js` has a matching `content/<id>.md` and
`conflicts/<id>.html`; every `##` heading in each `content/<id>.md`
matches one of the four expected section names exactly. Would catch the
silent-failure mode described in `CLAUDE.md` at review/PR time instead of
by noticing a blank section in the browser. No CI runner is currently
wired up in `.github/workflows/` for anything other than the two
Worker-deploy jobs, so this would also need a workflow file if it's
meant to run automatically rather than just locally.

#### Source registry cross-check

- [ ] Source registry cross-check
A script asserting every outlet URL cited inline across `content/*.md`
resolves to an entry already present in `data/sources.js` — would catch
a citation to a source that was never tier-classified before it ships.

#### Revisiting notes-widget read access

- [ ] Revisiting notes-widget read access
If there's ever a reason to browse past notes in-site rather than via
Cloudflare tooling, it must stay owner-authenticated — the current
write-only, no-read-endpoint design (see `CLAUDE.md`) is a deliberate
privacy choice, not a gap to casually close by adding a public `GET
/notes`.

#### Cross-site feedback consolidation (idea, not decided)

- [x] Cross-site feedback consolidation (fatto il 2026-10-19: backend unico `site-notes`)
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

## Decisioni e cose provate

- 2026-10-31: riverifica Gaza: non verificati in questa passata il West Bank (resta il paragrafo di luglio 2026), i dati IPC piu' recenti (cifra NGO di 1,4 milioni in crisi alimentare fino a fine anno non confermata da IPC) e la dichiarazione del coordinatore umanitario ONU del 11-12/10 (emersa solo da un riassunto di ricerca, non citata). Tutti i 22 conflitti avevano `lastVerified` 2026-08-10: scelto Gaza (primo in elenco). Le altre 21 pagine restano a 2026-08-10.
- 2026-10-20: timeline per conflitto = estrazione automatica nel browser (`renderTimeline` in `js/page-loader.js`): ogni frase della sezione Historical Context che contiene un anno (1500-2099) diventa una voce, ordinata per anno, con la frase originale (citazioni incluse, nessun fatto nuovo) e l'anno che rimanda al paragrafo di origine; nascosta se ci sono meno di 3 voci. Scelta rispetto a una sezione `## Timeline` o a `data/timelines/<id>.js` perché non rompe il contratto dei quattro H2 (`check-consistency.mjs` invariato) e non duplica i dati. Limiti: l'anno mostrato è il primo della frase (es. la frase 2005/2006/2007 di Gaza sta sotto 2005, quella 2008-2023 sotto 2008); le frasi senza anno non compaiono; una frase lunga resta intera; la divisione in frasi è euristica (abbreviazioni comuni gestite). Se serve più precisione, passare a una sezione/file strutturato con data esplicita per evento. Su tutte le 22 pagine: da 3 a 7 voci, nessun errore in console.
- 2026-10-19: "ultima verifica" = campo `lastVerified: "YYYY-MM-DD"` in `data/conflicts.js` (obbligatorio, controllato da `check-consistency.mjs`), mostrato sotto il titolo e nel tooltip della mappa, evidenziato "may be out of date" oltre 90 giorni (`STALE_AFTER_DAYS`). Valori iniziali non inventati: data dell'ultimo commit che ha toccato `content/<id>.md` (tutte 2026-08-10, quindi nessuna ancora oltre soglia). Le pagine conflitto ora caricano anche `data/conflicts.js` (il check lo richiede). Limite: è una data manuale, da aggiornare a ogni ri-verifica vera, non per refusi; non c'è ancora un report automatico delle pagine più vecchie (resta l'idea "Content staleness tracking" per quella parte).
- 2026-10-19: il widget scrive nel backend unico `site-notes` (repo `alessiomartini/site-notes`); tolti `worker/` e i workflow *Deploy Notes Worker* / *Read Notes*. Il vecchio worker `geopolitics-atlas-notes` e il suo D1 vanno spenti da Alessio dopo la migrazione delle note.; le note mandano l'autore (`?sono-alessio` segna il browser di Alessio, le altre sono di visitatori); installabile come app a sé dal telefono (manifest con nome, icona e perimetro propri)

- 2026-10-18: `scripts/check-consistency.mjs` (solo Node built-in, dati caricati con `vm`) fallisce su: id/percorsi del registro, file orfani, `CONTENT_FILE`, `data-section` e H2 vs `_template.md`, meta `noindex`. Il controllo "dominio citato presente in `sources.js`" e "citazione inline presente nella sezione Sources" sono volutamente solo warning: sull'albero attuale i primi sono 79 (circa 48 domini non classificati), quindi come errori la CI sarebbe rossa. Match per hostname (senza `www.`, sottodomini accettati). Limite: le URL con parentesi annidate oltre un livello non sono analizzate perfettamente.

Standing scratchpad for work that spans sessions: what's in progress,
known rough edges, and ideas not yet built. This is not a changelog —
git history is the changelog, and finished work should be a short pointer
here at most (see "Recently resolved"), not a re-description.

### How to use this file

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

### In progress / partially done

- **Pending notes in D1 are un-triaged.** The site owner has had the
  "+ Note" widget (`js/notes-widget.js`) live since the Worker was
  deployed (2026-08-17) and may have left ideas, fixes, or corrections
  through it. This pass had no authorized Cloudflare access in-session,
  so those notes were not read and are not reflected anywhere below. The
  next session with Cloudflare MCP/dashboard access (or that runs the
  `site-notes` README query, `site = 'geopolitics-atlas'`) should pull them, triage each into the
  right section of this file, and remove this item.

### Known small issues

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

### Recently resolved

- 2026-08-17 — Notes-taking widget + Cloudflare Worker/D1 deployed and
  wired to the live site, plus a manual "Read Notes" Action as a
  connector-less fallback. `git log 2f22444..8b4ad0d`.
- 2026-08-10 — All 22 conflicts brought to complete four-section content
  (historical context through sources) and given map tooltip summaries;
  overlapping-marker rendering bug and two citation errors fixed in
  follow-up verification. `git log d86b4bb..123015a`.
- 2026-08-10 — Source reliability framework (`data/sources.js`,
  `sources.html`) added as the site's citation methodology. `5c7f43b`.

- 2026-10-19: classificate 43 fonti nuove in `data/sources.js` (+ campo opzionale `domains` per alias, usato da `feeds.bbci.co.uk` -> BBC); il dominio citato mancante è ora un errore del check (0 errori, 0 warning). Tier prudenti e provvisori, da rivedere: testate generaliste (CNN, NBC, CBS, PBS, Euronews, Bloomberg...) in B, non A; UN/OHCHR/Lancet/ACAPS e think tank in C (come Crisis Group), con nota di attribuzione per quelli con orientamento dichiarato (FDD, Critical Threats, Africa Center, CTC West Point); siti di ministeri/ambasciate cinesi e pakistane e DHS in D (parti coinvolte), come CRS, Commons Library e PCA; Britannica e SAHO terziarie; outlet regionali (Caspian News, Middle East Eye, Neos Kosmos, Cyprus Mail) in B con nota di cautela.

## Log
- 2026-10-31: 🤖 riverificato Gaza (prima verifica 2026-08-10, tutti i conflitti avevano la stessa data): bilancio ministero aggiornato (74.382 totali, 1.493 dal cessate il fuoco al 12/10), controllo del territorio 63-65%, primo anniversario e posizioni israeliane/Hamas su disarmo e violazioni; aggiunto Times of Israel (tier B) a `data/sources.js`
- 2026-10-20: 🤖 aggiunta la timeline degli eventi datati in cima a Historical Context di ogni conflitto (estratta dal testo esistente, `js/page-loader.js` + CSS)
- 2026-10-19: 🤖 aggiunto `lastVerified` per conflitto (pagina, tooltip della mappa, avviso oltre 90 giorni, controllo di coerenza, README)
- 2026-10-19: note spostate nel backend unico `site-notes`; 🤖 classificate le 43 fonti mancanti in `data/sources.js` e promosso il controllo del dominio citato da warning a errore
- 2026-10-18: 🤖 aggiunto controllo di coerenza registro/pagine/contenuti/fonti (`scripts/check-consistency.mjs`) con workflow CI in sola lettura; sull'albero attuale 0 errori e 79 warning di fonti non classificate
- 2026-10-18: aggiunte le idee da IDEE.md (protocollo unico)
- 2026-10-18: FUTURE-ARCHITECTURE.md unito in ROADMAP.md (protocollo unico)
- 2026-10-15: creata la roadmap per Projects Overview
