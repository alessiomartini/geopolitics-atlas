# Architettura futura e idee aperte

Idee non ancora implementate e note per chi riprende il progetto più avanti.

## Cose lasciate a metà

- **Nessun endpoint di lettura per le note**: per design (vedi
  `worker/README.md`), il Worker accetta solo scritture; le note si leggono
  con `wrangler d1 execute` o dal dashboard/MCP Cloudflare. Se in futuro
  servisse una vista rapida delle note da qualunque device, andrebbe aggiunto
  un endpoint di lettura protetto (oggi non c'è alcuna autenticazione sulla
  scrittura: chiunque conosca l'URL del Worker può scrivere note).
- Nessun'altra funzionalità risulta esplicitamente incompleta al momento di
  questa revisione: il sito (mappa, pagine conflitto, sources.html) è
  funzionante per tutti i conflitti presenti in `data/conflicts.js`.

## Idee da valutare (non decise)

### Feedback centralizzato (idea, non ancora decisa)

Oggi questo sito, come `ear-training` e con pattern analogo anche
`eating-amsterdam`, `markets-first-principles` e `realtime-earth`, ha il
proprio database Cloudflare D1 dedicato dietro un proprio Worker (qui:
`worker/schema.sql`, tabella `notes`, Worker in `worker/src`).

Un'idea da valutare in futuro, **a bassa priorità** perché il sistema attuale
funziona bene, è consolidare tutto in un **unico D1 condiviso fra tutti i
siti**, con una tabella tipo:

```sql
notes(id, site, page, text, created_at, ...)
```

dove la colonna `site` distingue la provenienza, dietro un unico Worker con
un'allowlist CORS per dominio.

**Pro:**
- meno account/infrastruttura Cloudflare da mantenere (un D1 + un Worker
  invece di N coppie);
- un solo posto da cui leggere le note di tutti i siti.

**Contro:**
- un bug nel Worker condiviso romperebbe la raccolta note ovunque, mentre
  oggi ogni sito è isolato: un problema in uno non tocca gli altri;
- andrebbe migrato lo storico già presente nei D1 esistenti di ciascun sito.

Nessuna azione richiesta ora: è solo un'opzione da tenere presente se in
futuro la manutenzione di N Worker separati diventasse un problema reale.

## Dipendenze

- Root: nessun `package.json`, sito statico senza build step.
- `worker/`: unica dipendenza `wrangler` (`^4.0.0`), verificata aggiornata
  alla versione `4.135.0` (latest) il 2026-09-21 — nessun aggiornamento
  necessario. Verificato con `npx wrangler deploy --dry-run` dopo
  `npm install`: la configurazione risolve correttamente e il binding D1
  (`env.DB`) viene riconosciuto.
