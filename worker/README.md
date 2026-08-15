# geopolitics-atlas-notes Worker

Receives notes submitted from the site's floating note widget
(`js/notes-widget.js`) and stores them in a Cloudflare D1 database. No
read endpoint is exposed — notes are read back directly from D1 (via
the Cloudflare MCP connector, the dashboard, or `wrangler d1 execute`),
since only the site owner needs to see them.

## One-time setup

```
cd worker
npm install
npx wrangler d1 create geopolitics-atlas-notes
```

Copy the `database_id` from the output into `wrangler.jsonc`, then create the table:

```
npx wrangler d1 execute geopolitics-atlas-notes --remote --file=./schema.sql
```

## Deploy

```
npx wrangler deploy
```

Wrangler prints the Worker's public URL (`https://geopolitics-atlas-notes.<subdomain>.workers.dev`).
Set that URL as `WORKER_URL` in `js/notes-widget.js`, then commit.

## Reading notes back

```
npx wrangler d1 execute geopolitics-atlas-notes --remote --command="SELECT * FROM notes ORDER BY created_at DESC"
```

Or query the same database via the Cloudflare MCP connector's D1 query tool.
