#!/usr/bin/env node
// Read-only consistency check between data/conflicts.js, conflicts/*.html,
// content/*.md and data/sources.js. Plain Node built-ins only.
// Usage: node scripts/check-consistency.mjs   (exit 1 if any error)
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);
const read = (p) => readFileSync(join(root, p), "utf8");

// Load a browser data file (top-level const) in a vm context.
function loadGlobal(file, name) {
  const ctx = vm.createContext({});
  vm.runInContext(read(file) + `\n;globalThis.__out = ${name};`, ctx, { filename: file });
  return ctx.__out;
}

const CONFLICTS = loadGlobal("data/conflicts.js", "CONFLICTS");
const SOURCES = loadGlobal("data/sources.js", "SOURCES");

const norm = (s) => s.trim().toLowerCase().replace(/\s+/g, " ");
const h2s = (md) => [...md.matchAll(/^##\s+(.+?)\s*$/gm)].map((m) => m[1]);
const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, "").toLowerCase(); } catch { return null; } };


// places: optional key places drawn on the regional map (js/region-map.js).
// Viewport check mirrors region-map.js: 880x440 Web-Mercator, centred on coordinates.
function checkPlaces(c) {
  const w = `conflicts.js[${c.id}].places`;
  if (!Array.isArray(c.places) || c.places.length < 1 || c.places.length > 6) {
    err(`${w}: expected an array of 1-6 places`);
    return;
  }
  const rad = Math.PI / 180;
  const merc = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * rad) / 2));
  const scale = (256 * Math.pow(2, typeof c.zoom === "number" ? c.zoom : 6)) / (2 * Math.PI);
  const seen = new Set();
  for (const [i, p] of c.places.entries()) {
    const pw = `${w}[${i}]`;
    if (!p || typeof p.name !== "string" || !p.name.trim()) { err(`${pw}: name must be a non-empty string`); continue; }
    if (seen.has(p.name)) err(`${pw}: duplicate name "${p.name}"`);
    seen.add(p.name);
    const [lon, lat] = Array.isArray(p.coordinates) ? p.coordinates : [];
    if (!Number.isFinite(lon) || !Number.isFinite(lat) || Math.abs(lon) > 180 || Math.abs(lat) > 85) {
      err(`${pw} (${p.name}): coordinates must be [lon, lat] numbers in range`);
      continue;
    }
    const x = 440 + scale * (lon - c.coordinates[0]) * rad;
    const y = 220 - scale * (merc(lat) - merc(c.coordinates[1]));
    if (x < 30 || x > 850 || y < 15 || y > 425) err(`${pw} (${p.name}): outside the map viewport (x=${Math.round(x)}, y=${Math.round(y)})`);
  }
}

// --- registry vs files ---
const ids = new Set();
for (const c of CONFLICTS) {
  if (ids.has(c.id)) err(`conflicts.js: duplicate id "${c.id}"`);
  ids.add(c.id);
  if (c.page !== `conflicts/${c.id}.html`) err(`conflicts.js[${c.id}]: page "${c.page}" does not match id (expected conflicts/${c.id}.html)`);
  if (c.content !== `content/${c.id}.md`) err(`conflicts.js[${c.id}]: content "${c.content}" does not match id (expected content/${c.id}.md)`);
  const validDate = (s) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s) &&
    !isNaN(new Date(s + "T00:00:00Z")) && new Date(s + "T00:00:00Z").toISOString().slice(0, 10) === s;
  if (!validDate(c.lastVerified)) {
    err(`conflicts.js[${c.id}]: lastVerified must be a valid "YYYY-MM-DD" date (got ${JSON.stringify(c.lastVerified)})`);
  } else if (c.lastVerified > new Date().toISOString().slice(0, 10)) {
    err(`conflicts.js[${c.id}]: lastVerified ${c.lastVerified} is in the future`);
  }
  if (c.zoom !== undefined && !(typeof c.zoom === "number" && c.zoom >= 2 && c.zoom <= 12)) {
    err(`conflicts.js[${c.id}]: zoom must be a number between 2 and 12 (got ${JSON.stringify(c.zoom)})`);
  }
  if (c.places !== undefined) checkPlaces(c);
  if (!existsSync(join(root, c.page))) err(`conflicts.js[${c.id}]: page file missing: ${c.page}`);
  if (!existsSync(join(root, c.content))) err(`conflicts.js[${c.id}]: content file missing: ${c.content}`);
}
for (const f of readdirSync(join(root, "conflicts")).filter((f) => f.endsWith(".html"))) {
  if (!ids.has(f.slice(0, -5))) err(`conflicts/${f}: no entry in data/conflicts.js`);
}
for (const f of readdirSync(join(root, "content")).filter((f) => f.endsWith(".md") && f !== "_template.md")) {
  if (!ids.has(f.slice(0, -3))) err(`content/${f}: no entry in data/conflicts.js`);
}

// --- template headings ---
const templateH2 = h2s(read("content/_template.md")).map(norm);
if (templateH2.length === 0) err("content/_template.md: no H2 headings found");

// --- conflict images (data/images.js) ---
const IMAGES = loadGlobal("data/images.js", "CONFLICT_IMAGES");
const FREE_LICENSE = /^(Public domain|CC0|CC BY(-SA)? \d\.\d)/;
for (const [id, list] of Object.entries(IMAGES)) {
  if (!ids.has(id)) err(`images.js: unknown conflict id "${id}"`);
  if (!Array.isArray(list) || list.length < 1 || list.length > 3) err(`images.js[${id}]: expected 1-3 images`);
  for (const [i, im] of (list || []).entries()) {
    const w = `images.js[${id}][${i}]`;
    for (const k of ["thumb", "page", "caption", "author", "license"]) {
      if (typeof im[k] !== "string" || !im[k].trim()) err(`${w}: missing "${k}"`);
    }
    if (hostOf(im.thumb) !== "upload.wikimedia.org") err(`${w}: thumb must be on upload.wikimedia.org`);
    if (hostOf(im.page) !== "commons.wikimedia.org") err(`${w}: page must be a commons.wikimedia.org file page`);
    if (im.license && !FREE_LICENSE.test(im.license)) err(`${w}: license "${im.license}" is not public domain / CC0 / CC BY / CC BY-SA`);
  }
}
for (const id of ids) if (!IMAGES[id]) warn(`images.js: no images for "${id}"`);

// --- source hosts ---
const srcHosts = SOURCES.flatMap((s) => [hostOf(s.url), ...(s.domains || [])]).filter(Boolean);
const knownHost = (h) => srcHosts.some((s) => h === s || h.endsWith("." + s));

// --- pages and content ---
for (const id of ids) {
  const pagePath = `conflicts/${id}.html`;
  const mdPath = `content/${id}.md`;
  if (!existsSync(join(root, pagePath)) || !existsSync(join(root, mdPath))) continue;
  const html = read(pagePath);
  const md = read(mdPath);

  if (!/<meta\s+name=["']robots["']\s+content=["']noindex,\s*nofollow["']\s*\/?>/i.test(html)) {
    err(`${pagePath}: missing <meta name="robots" content="noindex, nofollow">`);
  }
  const cf = html.match(/CONTENT_FILE\s*=\s*["']([^"']+)["']/);
  if (!cf) err(`${pagePath}: CONTENT_FILE not defined`);
  else if (cf[1] !== `../${mdPath}`) err(`${pagePath}: CONTENT_FILE is "${cf[1]}", expected "../${mdPath}"`);

  if (!/<script\s+src=["']\.\.\/data\/conflicts\.js["']/.test(html)) {
    err(`${pagePath}: missing <script src="../data/conflicts.js"> (needed for the last-verified note)`);
  }

  if (!/id=["']region-map["']/.test(html)) err(`${pagePath}: missing the regional map container (id="region-map")`);
  if (!/<script\s+src=["']\.\.\/js\/region-map\.js["']/.test(html)) err(`${pagePath}: missing <script src="../js/region-map.js">`);

  if (!/id=["']conflict-images["']/.test(html)) err(`${pagePath}: missing the images container (id="conflict-images")`);
  for (const f of ["data/images.js", "js/conflict-images.js"]) {
    if (!html.includes(`<script src="../${f}"></script>`)) err(`${pagePath}: missing <script src="../${f}">`);
  }

  const sections = [...html.matchAll(/data-section=["']([^"']+)["']/g)].map((m) => m[1]);
  const secN = sections.map(norm);
  const mdH2 = h2s(md).map(norm);
  for (const t of templateH2) {
    if (!secN.includes(t)) err(`${pagePath}: no data-section matching template heading "${t}"`);
  }
  for (const s of secN) {
    if (!templateH2.includes(s)) err(`${pagePath}: data-section "${s}" is not a template heading`);
  }
  for (const t of templateH2) {
    if (!mdH2.includes(t)) err(`${mdPath}: missing H2 heading "${t}"`);
  }
  for (const h of mdH2) {
    if (!templateH2.includes(h)) err(`${mdPath}: H2 heading "${h}" is not a template heading (page would not show it)`);
  }

  // --- citations ---
  const parts = md.split(/^##\s+Sources\s*$/im);
  const body = parts[0];
  const srcSection = parts.slice(1).join("\n");
  const linkRe = /\[[^\]]*\]\((https?:\/\/[^\s)]*(?:\([^\s)]*\)[^\s)]*)*)\)/g;
  const urls = (t) => [...t.matchAll(linkRe)].map((m) => m[1]);
  const inline = urls(body);
  const listed = new Set(urls(srcSection));
  for (const u of new Set([...inline, ...listed])) {
    const h = hostOf(u);
    if (!h) { err(`${mdPath}: unparseable URL ${u}`); continue; }
    if (!knownHost(h)) err(`${mdPath}: outlet "${h}" is not in data/sources.js (${u})`);
  }
  for (const u of new Set(inline)) {
    if (!listed.has(u)) warn(`${mdPath}: inline-cited URL not in Sources section: ${u}`);
  }
}

for (const w of warnings) console.warn("WARN  " + w);
for (const e of errors) console.error("ERROR " + e);
console.log(`\n${ids.size} conflicts checked: ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
