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

// --- registry vs files ---
const ids = new Set();
for (const c of CONFLICTS) {
  if (ids.has(c.id)) err(`conflicts.js: duplicate id "${c.id}"`);
  ids.add(c.id);
  if (c.page !== `conflicts/${c.id}.html`) err(`conflicts.js[${c.id}]: page "${c.page}" does not match id (expected conflicts/${c.id}.html)`);
  if (c.content !== `content/${c.id}.md`) err(`conflicts.js[${c.id}]: content "${c.content}" does not match id (expected content/${c.id}.md)`);
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

// --- source hosts ---
const srcHosts = SOURCES.map((s) => hostOf(s.url)).filter(Boolean);
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
    if (!knownHost(h)) warn(`${mdPath}: outlet "${h}" is not in data/sources.js (${u})`);
  }
  for (const u of new Set(inline)) {
    if (!listed.has(u)) warn(`${mdPath}: inline-cited URL not in Sources section: ${u}`);
  }
}

for (const w of warnings) console.warn("WARN  " + w);
for (const e of errors) console.error("ERROR " + e);
console.log(`\n${ids.size} conflicts checked: ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
