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
- [ ] Immagini del conflitto e una mappa più dettagliata dell'area geografica in ogni pagina conflitto (nota dal sito, 2026-10-19, da western-sahara). La timeline per conflitto c'è già (vedi Fatto)
  - [x] Mappa regionale in ogni pagina conflitto (`js/region-map.js`, d3 + world-atlas 50m come la mappa della home, `zoom` opzionale in `data/conflicts.js`)
  - [ ] Immagini del conflitto (servono foto con licenza libera, es. Wikimedia Commons)
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

- 2026-11-14: riverifica Russia-Ucraina / Sudan (ultime due pagine ferme al 2026-10-31). Fonti raggiunte e lette per intero: Euronews (11/11, tier B), Asharq Al-Awsat (7/11, tier C, aggiunto a `data/sources.js` con nota: testata saudita, Riad e' attore diplomatico nel Sudan), Al Jazeera (3/11 e 29/10, tier B), UN News (3/11, tier B/primario). Nessun secondo outlet per i colloqui di Abu Dhabi: CNN (451), Washington Post, Axios, CNBC, Anadolu visti solo come titoli/snippet; Sudan Tribune (403). Nessun fatto storico corretto. Russia-Ucraina: aggiunti i colloqui trilaterali USA-Russia-Ucraina di Abu Dhabi (10-11/11, primi negoziati diretti da febbraio; Kushner 'gap ristretti', Rubio 'molto produttivi', Zelensky 'costruttivi'; nessuna tregua, scambio di 1.000-1.500 prigionieri per parte solo 'in esame'; posizioni sul territorio attribuite: Mosca chiede il ritiro dalle regioni orientali, Trump 'forma un po' diversa'); la tesi russa di aver conquistato meta' del Donbas ucraino e' in Contested Narratives, attribuita a Zelensky come versione di parte (Euronews). Il testo di fine ottobre (Witkoff/Putin del 21/10, energy ceasefire, cifre OHCHR di settembre, attacchi del 22-23/10) e' lasciato com'e'. Sudan: aggiunti combattimenti del 5-6/11 in Kordofan con versioni opposte (Joint Force vs media filo-RSF, entrambe non verificabili), campagna di droni (dati del Consiglio sovrano: 70 attacchi, 187 droni, 484 civili e 176 soldati uccisi, non verificati; denuncia a ONU/UA contro l'Etiopia che nega; nessuna replica RSF nell'articolo), Denise Brown (ONU) sul colpo alle infrastrutture energetiche, e cifre discordanti sul mercato di Nyala del 26/10 (Emergency Lawyers oltre 100 morti; Sudan Doctors Network 21; MSF 36 corpi e oltre 150 feriti) affiancate; i 13 milioni di sfollati sono ripetuti da Al Jazeera. Da verificare (non letti in articoli completi o non trovati): Russia-Ucraina, linea del fronte e controllo del territorio (resta 'agosto 2026': solo uno snippet Kyiv Post su Kostiantynivka e ISW), esito del secondo giorno dei colloqui e nuovo round, cifre OHCHR di ottobre (non ancora pubblicate nei risultati), perdite militari complessive; Sudan, avanzata verso Al-Khuwai/Iyal Bakhit (13/11 e 7/11, solo snippet Sudan Tribune e fonti filo-esercito: non incluse), stato dell'assedio di El-Obeid, bilancio dei morti, IPC/carestia (ultimi dati trovati: IPC novembre 2025 e OCHA aprile 2026), cifra ONU di 30 milioni di persone in bisogno, posizione degli Emirati/RSF.
- 2026-11-07: riverifica Armenia-Azerbaigian / Cipro / Sahara Occidentale / Xinjiang. Con questo lotto tutte le pagine sono state riverificate il 2026-11-07 tranne Russia-Ucraina e Sudan (ferme al 2026-10-31): 20 su 22. Fonti: per ogni pagina almeno due testate raggiunte, ma nessuna copia Reuters/AP/Al Jazeera trovata; usati The Guardian (via Irish Times), Hurriyet, UN News, Cyprus Mail, Euronews, Politis, Daily Sabah, Security Council Report (403, non letto), Morocco World News, WSRW, CGTN/Xinhua, HRW, Taipei Times, Kelley Drye. Aggiunti a `data/sources.js`: Irish Times, Hurriyet, Taipei Times, Politis (tier B), WSRW, Morocco World News, Daily Sabah, Kelley Drye (tier C, con note), Ufficio del primo ministro armeno (tier D, parte coinvolta). Correzioni deliberate: (1) Cipro: la pagina indicava Ersin Tatar come leader turco-cipriota a luglio 2026, ma UN News nomina Tufan Erhurman (eletto il 19/10/2025, succeduto a Tatar): corretto, e il passaggio sulla posizione dei due Stati e' ora attribuito a Turchia e al "ministero degli esteri" del nord; (2) Xinjiang: "4,7 miliardi di dollari trattenuti e 43 aziende aggiunte nel 2025" non risultava nella pagina DHS citata (che riporta oltre 16.700 spedizioni esaminate per quasi 3,7 miliardi, oltre 10.000 respinte, 144 entita'): sostituito con le cifre della pagina; i "43" sono invece l'aggiunta del 31/7/2026 (Kelley Drye, totale 187); (3) Sahara Occidentale: rimossa la frase sulla revisione strategica del Segretario generale "attesa ad aprile 2026" (non verificata, superata dagli eventi). Novita' principali: Armenia, elezioni del 7/6 (maggioranza senza i due terzi per il referendum), incontro Pashinyan-Aliyev a Bishkek il 31/8, ratifica TRIPP il 28/10 (74% USA / 26% Armenia); Cipro, visita di Guterres, incontri settimanali, nessun 5+1 all'ONU, Holguin e conferenza informale attesa entro fine anno, Fidan a Nicosia il 6/11; Sahara, voto del 30/10 (progetto USA 11-1-3 con veto russo, progetto russo 3-1-11), mandato MINURSO scaduto il 31/10 senza successore; Xinjiang, Entity List UFLPA (31/7 e 28/10 BGI/MGI) e i due uiguri in Thailandia. Da verificare (solo snippet, 403 o fonte unica): Armenia, voto 63-32 della ratifica TRIPP (Armenpress, snippet), gruppi di lavoro trilaterali TRIPP del 7/11 (301.am, bloccato), dichiarazioni di Pashinyan del 2/11 e del vice primo ministro sulla delimitazione (APA, fonte azera), seggi esatti e percentuale di Civil Contract (49,8% in un solo snippet), referendum costituzionale previsto nel 2027, dichiarazioni di Hajiyev/Bayramov dopo il voto (senza data), esito dell'impugnativa alla Corte costituzionale (4/7, snippet), tenuta del confine e della delimitazione dopo aprile; Cipro, "prima visita in sedici anni" di Guterres (dalla pagina precedente, non confermata da UN News), esito degli incontri del 6 e 9/11, data della conferenza informale, arrivo di Holguin posticipato al 4/12 (snippet), risoluzione ONU di gennaio (numero 2815 e voto 13-0-2 da snippet di Security Council Report, non letto), aperture di nuovi valichi; Sahara, reazioni di Polisario e Algeria (non lette in articoli completi), stato di MINURSO dopo il 31/10 (WSRW: mandato scaduto; Newscord riporta un ordine di smantellamento, non verificato), dibattito dell'Assemblea generale del 10/11, turni di colloqui di febbraio 2026 a Madrid e Washington e ruolo di de Mistura (snippet), cifra dei rifugiati di Tindouf (173.000, non riverificata); Xinjiang, 2025-2026 dati CBP aggiornati (fonti discordanti, vedi dashboard CBP), legge regionale sulla lingua (URM, Substack), caso Starbucks, numero di rilevamenti UFLPA per anno, stima di 13,75 milioni di trasferimenti di lavoro (non riverificata), Regolamento UE sul lavoro forzato (2027, non riverificato).
- 2026-11-07: riverifica Corea / Taiwan / Mar Cinese Meridionale / Kashmir (fonti: Al Jazeera per tutte e quattro le pagine, tier B, qualificato; Reuters via Khaleej Times per il museo della difesa nordcoreano; aggiunto Khaleej Times (tier B, solo per copie di agenzia) a `data/sources.js`). Nessun fatto storico corretto. Corea: aggiunti test missilistici del 3 e 12/10 (JCS: >900 km; Koyari: due missili, 910 km, forse ipersonico), museo con Hwasong-20, esplosione nella DMZ di fine settembre (la responsabilita' nordcoreana e' la conclusione di Seul e dell'indagine congiunta Corea del Sud-ONU, Pyongyang la respinge: in Contested Narratives), proposta di colloqui militari del 23/10, viaggio di Kim a Dandong il 24/10 (nessun incontro con Xi riportato), dichiarazione trilaterale USA-Corea-Giappone del 30/10, proposta di Lee a settembre di un congelamento nucleare. Taiwan: discorso del 10/10 di Lai e replica del TAO, bilancio difesa 2027 (NT$1,1 mila miliardi, oltre il 3% del PIL), attivita' PLA del 10/10 (21 aerei, 7 navi), pacchetti di armi USA (11 mld a dicembre 2025, 14 mld in attesa, rinvio prima dell'APEC), incontro Trump-Xi di maggio (la frase di Xi su Taiwan e' riportata dal portavoce cinese Mao Ning). Mar Cinese Meridionale: ottobre piu' teso (USNI, via Al Jazeera: almeno otto incontri ravvicinati), frase dell'ambasciatore cinese Jing Quan ("easily win") e richiesta di espulsione da parte di un senatore, ADMM-Plus a Manila con Hegseth, Codice di condotta. Kashmir: sentenza della Corte permanente di arbitrato sul Trattato delle acque dell'Indo (31/8) e rifiuto dell'India, proteste e repressione del JAAC nel Kashmir pakistano (cifre discordanti riportate affiancate: 11 / almeno 40 Amnesty / oltre 50 / oltre 60), elezioni dal 27/7 al 10/8, caso Gor-Pakistan (19-20/8). Da verificare (non letti in articoli completi, solo snippet, 403 o fonti deboli): Corea, esito di un eventuale incontro Trump-Kim all'APEC di Shenzhen (previsto a meta' novembre, non ancora avvenuto); Taiwan, esito del bilancio speciale di difesa in Parlamento e della procedura di impeachment contro Lai (NPR di gennaio, solo snippet), stato del bilancio 2027 (Taipei Times: NT$1,1225 mila miliardi, 3,01%, solo snippet); Mar Cinese Meridionale, mancata chiusura del Codice di condotta entro luglio 2026 e ipotesi di blocco da parte del Laos (The Diplomat, 403), conteggio USNI del 9/10 (sei scontri, 403), ostacolo al rifornimento di Second Thomas Shoal a settembre e missione monitorata dalla guardia costiera cinese a meta' ottobre (solo snippet), evacuazione medica dalla Sierra Madre; Kashmir, violenza e infiltrazioni nel Kashmir indiano nel 2026 (23 militanti uccisi al 31/10 secondo un sito indiano minore con fonti anonime dell'esercito: non incluso), risultati finali delle elezioni del Kashmir pakistano e primo ministro eletto, elezione presidenziale del 24/9, scambi di fuoco alla Linea di Controllo di ottobre (date incerte), mina a Poonch, 2/10 convocazione dei diplomatici dopo l'uccisione di due pakistani (CrisisWatch, 403), statuto di Stato federato del Kashmir indiano, tenuta del cessate il fuoco di maggio 2025 (l'affermazione del testo non e' stata riverificata).
- 2026-11-07: riverifica Sahel / Somalia / Etiopia (fonti: Al Jazeera, AFP via EWN, Reuters via The Star, Critical Threats, African Arguments, Kujenga Amani/SSRC, Rio Times; aggiunti a `data/sources.js` EWN tier B, Kujenga Amani e African Arguments tier C, Rio Times tier C con nota di cautela). Sahel: aggiunti Kidal (presa FLA/JNIM in aprile, rientro dell'esercito il 6/10 con versioni opposte su combattimento/ritiro), blocco di Bamako a stallo (900 autocisterne scortate al 14/9), ammutinamento di Niamey del 29/8 (bilancio non univoco: "decine" vs almeno 27 morti e ~100 arresti; ruolo russo attribuito all'ambasciatore e ad Al Jazeera); correzione deliberata: la cifra "circa 1.000 uomini in piu' a giugno" dell'Africa Corps non e' stata tolta ma affiancata a quella di African Arguments (forza totale ~1.000), perche' non riconciliabili. Somalia: aggiunti mandato presidenziale scaduto/"periodo di transizione", calendario elettorale (politiche 15/4, presidenziali 15/5/2027, respinto dall'opposizione), combattimenti a Baidoa con le forze di Laftagareen (fonte unica Rio Times, tier C, attribuito; accusa di legami con al-Shabaab presentata come non verificata). Etiopia: la pagina era ferma a prima della guerra di settembre; aggiunti elezioni del 1/6, ripresa dei combattimenti il 23/9, alleanza di sette gruppi, ingresso a Mekelle il 3/10 (AFP: sabato), rottura Etiopia-Eritrea, fronte fluido al 23/10 (Critical Threats, in gran parte non confermato); lo scontro sull'Eritrea e' in Contested Narratives. Da verificare (non letti in articoli completi, solo snippet o 403): giuramento di Abiy per il nuovo mandato il 5/10 (East African, 403); analisi Chatham House di ottobre (403); proroga del mandato AUSSOM al 31/12/2026 (risoluzione ONU 2809, 11.826 uomini) e chiusura UNTMIS il 31/10; annullamento dell'elezione diretta del Galmudug (24/8); dati recenti sul Burkina Faso (nessuna fonte per set-ott 2026: i dati del testo sono ancora ACLED/Africa Center 2025 e UN di inizio 2026, lo 40% del territorio non riverificato); cifre di sfollati e mortalita' aggiornate per la nuova guerra etiopica (Al Jazeera: ~750.000 sfollati in Tigray dalla guerra precedente, nessun dato sul 2026); esito dell'offensiva su Buurhakaba dopo il 18/10; stato della guerra etiopica dopo il 23/10.
- 2026-11-07: riverifica Gaza / Siria / Venezuela. Gaza: aggiornati i dati del ministero della Salute al 3/11 (74.609 morti totali, 1.593 dal cessate il fuoco), affiancati a quelli del 12/10 invece di sostituirli; non verificati West Bank, IPC piu' recente, controllo del territorio (resta il 63-65% di ottobre) e stato del disarmo (nessuna novita' trovata). Siria: aggiunta la dissoluzione dell'SDF del 25/8 (SANA, fonte statale, parla di integrazione completata; The Defense Post riporta 12.000 su ~35.000 combattenti integrati, citando un comandante curdo: tenuti affiancati), la visita di al-Sharaa a Riyadh del 4/11; NON trovate notizie su ottobre-novembre per i colloqui Siria-Israele (ultimo dato: gennaio 2026), sulle truppe israeliane nel sud e su Sweida/costa; il testo storico non e' stato modificato. Venezuela: aggiunti accordo petrolifero (settembre, secondo Al Jazeera), ritorno di Machado il 25/10, Rodriguez senza data per le elezioni, incontro Rubio-Blanco del 2/11; non incluse perche' lette solo in riassunti di ricerca o in un elenco di titoli correlati: dichiarazione di non colpevolezza di Maduro del 15/10 sull'accusa di cospirazione per tortura (da verificare con una fonte primaria o un articolo dedicato), data del processo (14/6/2027 secondo aggregatori, Courthouse News dava 403), liberazioni di prigionieri politici di settembre (39 secondo JEP, 24 verificati da Foro Penal), crisi elettrica. Nessun fatto storico corretto; aggiunti SANA (tier D, parte coinvolta) e The Defense Post (tier C) a `data/sources.js`.
- 2026-11-07: riverifica Myanmar / Yemen / Haiti. Secondo outlet raggiunto solo in parte: Yemen (Al Jazeera + Anadolu sullo stesso briefing del 9/10), Haiti (Al Jazeera, AP via Africanews, Reuters via The Star, Anadolu); Myanmar solo Al Jazeera (+ OCHA/Crisis Group già presenti). Anadolu è agenzia statale turca (tier B con nota, non parte nel conflitto). Haiti: la pagina diceva che il Consiglio presidenziale di transizione governa dal 2024, ma il mandato è finito il 7/2/2026: corretto nel paragrafo sulla legittimità (correzione deliberata). Stime del controllo di Port-au-Prince discordanti (85-90% nel testo vs ~70% AP) riportate affiancate; cifra di vittime GSF/TPC non riverificata. Yemen: le cifre OCHA 2026 (22 milioni, 5,2 milioni sfollati, 29% finanziato) vengono ancora dal HNRP 2025 e non sono state riverificate; il controllo delle zone costiere (Mokha) e la versione degli Houthi sugli attacchi di ottobre non sono stati verificati; scartati risultati di ricerca che sembravano riferirsi alla scadenza della tregua del 2022 (date incoerenti) e un articolo che datava la fine della tregua al 13/7. Myanmar: non verificate la linea del fronte, l'esito delle offensive e la cifra OCHA oltre luglio; la stima di ~50 morti nel mercato di Rakhine è di un analista, non un conteggio ufficiale. Le altre voci delle pagine restano ad agosto 2026.
- 2026-11-07: riverifica DRC / Iran-Israele / Libano-Israele (fonti: solo Al Jazeera, tier B, qualificato; nessun secondo outlet raggiungibile con la ricerca). Libano-Israele: il testo storico/di stato non menzionava la guerra del 2026 (inizio 2 marzo, tregua di aprile, accordo quadro 26 giugno): aggiunto un paragrafo senza modificare i fatti esistenti; NON trovate notizie su ottobre e inizio novembre (ultimo dato: 25 settembre, 4.386 morti secondo il ministero della Salute libanese); il paragrafo sulle 'più di 10.000 violazioni UNIFIL' resta quello di agosto. DRC: non riverificata la linea del fronte; i colloqui di Doha di novembre erano solo 'attesi'; cifre sfollati discordanti (7,8 milioni ONU vs 5,3 milioni) riportate affiancate. Iran: non verificati lo stato ufficiale dell'IAEA dopo settembre né l'esito dei colloqui di Qatar; le affermazioni IRGC (petroliere, droni) sono riportate come rivendicazioni di parte. Pagine rimaste ai fatti di agosto per il resto.
- 2026-10-31: riverifica Gaza: non verificati in questa passata il West Bank (resta il paragrafo di luglio 2026), i dati IPC piu' recenti (cifra NGO di 1,4 milioni in crisi alimentare fino a fine anno non confermata da IPC) e la dichiarazione del coordinatore umanitario ONU del 11-12/10 (emersa solo da un riassunto di ricerca, non citata). Tutti i 22 conflitti avevano `lastVerified` 2026-08-10: scelto Gaza (primo in elenco). Le altre pagine restano a 2026-08-10 (tranne Russia-Ukraine e Sudan). Sudan: non riverificati bilancio dei morti, cifra ONU di 30 milioni di persone in bisogno e IPC/carestia, stato dell'assedio di El-Obeid (il testo di luglio resta, il quadro di ottobre viene da due soli articoli di Al Jazeera), posizione dell'RSF e degli Emirati. Russia-Ukraine: non riverificati controllo del territorio (~18-20%, stime non confermate), linea del fronte e stime complessive di perdite militari (restano ad agosto 2026).
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
- 2026-11-14: 🤖 aggiunta in ogni pagina conflitto una mappa regionale (d3 + world-atlas 50m, centrata su `coordinates` con `zoom` opzionale) e il relativo controllo in `check-consistency.mjs`; 🤖 riverificati Russia-Ucraina (colloqui trilaterali di Abu Dhabi del 10-11/11) e Sudan (Kordofan, attacchi con droni, cifre discordanti su Nyala); aggiunto Asharq Al-Awsat (tier C) a `data/sources.js`; `lastVerified` aggiornato: ora tutte le 22 pagine sono al 2026-11-07 o dopo
- 2026-11-14: note dal sito portate nel ROADMAP
- 2026-11-07: 🤖 riverificati DRC (coalizione FRN di Kabila con M23, roadmap di agosto, sfollati), Iran-Israele (blocco navale USA, Hormuz, stallo dei negoziati, attacchi di inizio novembre) e Libano-Israele (guerra del 2026, accordo quadro del 26 giugno, situazione a fine settembre); `lastVerified` aggiornato; 🤖 riverificati anche Myanmar (guerra nel quinto anno, offensive, diplomazia di Min Aung Hlaing, ASEAN/Malaysia), Yemen (Grundberg 9/10: «guerra su vasta scala», vittime civili ONU, attacchi agli aeroporti sauditi) e Haiti (mandato GSF prorogato al 31/3/2027, attacco del 18/10, fine del CPT il 7/2/2026, elezioni del 13/12 rinviate a tempo indeterminato); aggiunti Anadolu, Africanews e The Star (tier B) a `data/sources.js`; 🤖 riverificati Gaza (bilancio al 3/11, Mladenov e tende), Siria (dissoluzione SDF, accordo di difesa con l'Arabia Saudita) e Venezuela (Machado, accordo petrolifero, piano in tre fasi USA); aggiunti SANA e The Defense Post a `data/sources.js`; 🤖 riverificati anche Sahel (Kidal, blocco di Bamako, ammutinamento di Niamey), Somalia (crisi del mandato, calendario elettorale, Baidoa) ed Etiopia (elezioni, ripresa della guerra in Tigray, Mekelle, rottura con l'Eritrea); `lastVerified` aggiornato; 🤖 riverificati anche Corea (test missilistici, mina nella DMZ, viaggio di Kim a Dandong), Taiwan (discorso di Lai, bilancio difesa, armi USA), Mar Cinese Meridionale (ottobre teso, ambasciatore cinese, ADMM-Plus) e Kashmir (sentenza sull'Indo, repressione del JAAC, caso Gor); aggiunto Khaleej Times (tier B) a `data/sources.js`; `lastVerified` aggiornato; 🤖 riverificati anche Armenia-Azerbaigian (elezioni del 7/6, incontro di Bishkek, ratifica TRIPP), Cipro (corretto il leader turco-cipriota: Erhurman, non Tatar; colloqui preparatori, Holguin), Sahara Occidentale (mandato MINURSO scaduto il 31/10 dopo i veti incrociati) e Xinjiang (Entity List UFLPA, BGI/MGI, uiguri in Thailandia; corrette le cifre DHS); aggiunti Irish Times, Hurriyet, Taipei Times, Politis, WSRW, Morocco World News, Daily Sabah, Kelley Drye e l'ufficio del primo ministro armeno a `data/sources.js`; `lastVerified` aggiornato: ora 20 pagine su 22 sono al 2026-11-07 (restano Russia-Ucraina e Sudan al 2026-10-31)
- 2026-11-06: widget note v2 canonico (site-notes/widget) al posto del vecchio feedback. widget note allineato alla versione finale (migrazione key#field, dedupe), ?v=3.
- 2026-10-31: 🤖 riverificato Gaza (prima verifica 2026-08-10, tutti i conflitti avevano la stessa data): bilancio ministero aggiornato (74.382 totali, 1.493 dal cessate il fuoco al 12/10), controllo del territorio 63-65%, primo anniversario e posizioni israeliane/Hamas su disarmo e violazioni; aggiunto Times of Israel (tier B) a `data/sources.js`; 🤖 riverificato Russia-Ukraine (prima: 2026-08-10): vittime civili ONU di settembre e inizio ottobre, stato dei colloqui e attacchi energetici a fine ottobre; 🤖 riverificato Sudan (prima: 2026-08-10): fronte del Nord Kordofan, rifiuto dei negoziati da parte di Burhan, sfollati
- 2026-10-20: 🤖 aggiunta la timeline degli eventi datati in cima a Historical Context di ogni conflitto (estratta dal testo esistente, `js/page-loader.js` + CSS)
- 2026-10-19: 🤖 aggiunto `lastVerified` per conflitto (pagina, tooltip della mappa, avviso oltre 90 giorni, controllo di coerenza, README)
- 2026-10-19: note spostate nel backend unico `site-notes`; 🤖 classificate le 43 fonti mancanti in `data/sources.js` e promosso il controllo del dominio citato da warning a errore
- 2026-10-18: 🤖 aggiunto controllo di coerenza registro/pagine/contenuti/fonti (`scripts/check-consistency.mjs`) con workflow CI in sola lettura; sull'albero attuale 0 errori e 79 warning di fonti non classificate
- 2026-10-18: aggiunte le idee da IDEE.md (protocollo unico)
- 2026-10-18: FUTURE-ARCHITECTURE.md unito in ROADMAP.md (protocollo unico)
- 2026-10-15: creata la roadmap per Projects Overview
