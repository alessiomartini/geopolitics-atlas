/**
 * geopolitics-atlas-notes Worker.
 *
 * Accepts POST /notes from the static site's note-taking widget and
 * writes each note to a D1 table. There is no read endpoint — notes are
 * read directly from D1 via the Cloudflare MCP connector (or the
 * dashboard / `wrangler d1 execute`), not through this Worker, since
 * only the site owner needs to read them back.
 */

const ALLOWED_ORIGINS = new Set([
  "https://alessiomartini.github.io",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
]);

const MAX_NOTE_LENGTH = 2000;
const MAX_PAGE_LENGTH = 200;

function corsHeaders(origin) {
  const headers = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (url.pathname !== "/notes" || request.method !== "POST") {
      return json({ error: "Not found" }, 404, origin);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400, origin);
    }

    // Hidden honeypot field: real users never fill it in, most bots do.
    // Pretend success so scripted submitters don't learn to skip it.
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return json({ ok: true }, 201, origin);
    }

    const text = typeof body.text === "string" ? body.text.trim() : "";
    const page = typeof body.page === "string" ? body.page.trim().slice(0, MAX_PAGE_LENGTH) : "";

    if (!text || text.length > MAX_NOTE_LENGTH) {
      return json(
        { error: `"text" is required and must be 1-${MAX_NOTE_LENGTH} characters` },
        400,
        origin
      );
    }

    await env.DB.prepare(
      "INSERT INTO notes (text, page, created_at) VALUES (?, ?, datetime('now'))"
    )
      .bind(text, page)
      .run();

    return json({ ok: true }, 201, origin);
  },
};
