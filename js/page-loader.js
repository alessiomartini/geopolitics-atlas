/**
 * Shared loader for conflict pages. Expects a `CONTENT_FILE` global
 * (set inline in each conflicts/*.html page) pointing at the matching
 * markdown file in /content, and DOM elements marked with
 * `data-section="Heading Name"` to receive the parsed HTML for that
 * markdown section. This enforces the fixed section structure at the
 * template level regardless of how the markdown itself is ordered.
 */
(async function () {
  const MIN_TIMELINE_EVENTS = 3;
  const YEAR_RE = /\b(1[5-9]\d\d|20\d\d)\b/;
  const ABBREVIATIONS = /(?:\b(?:U\.S|U\.K|U\.N|St|Mr|Mrs|Dr|Gen|Col|Lt|vs|No|Inc|Jr|Sr)|\b[A-Z])\.$/;

  const titleEl = document.getElementById("conflict-title");
  const sectionEls = document.querySelectorAll("[data-section]");

  if (typeof CONTENT_FILE === "undefined") {
    console.error("page-loader.js: CONTENT_FILE is not defined on this page.");
    return;
  }

  try {
    const res = await fetch(CONTENT_FILE);
    if (!res.ok) {
      throw new Error(`${CONTENT_FILE} responded with ${res.status}`);
    }
    const markdown = await res.text();
    renderMarkdown(markdown);
  } catch (err) {
    console.error("Failed to load conflict content:", err);
    sectionEls.forEach((el) => {
      el.innerHTML =
        '<p class="error-note">Failed to load content for this section. ' +
        "If you're previewing locally, make sure the site is served over HTTP " +
        "(not opened directly as a file://) and that the markdown file exists.</p>";
    });
  }

  function renderMarkdown(markdown) {
    const { title, sections } = splitIntoSections(markdown);

    if (title && titleEl) {
      titleEl.textContent = title;
      document.title = `${title} — Geopolitics Atlas`;
    }

    renderLastVerified();

    sectionEls.forEach((el) => {
      const key = normalize(el.getAttribute("data-section"));
      const raw = sections[key];
      if (raw && raw.trim()) {
        el.innerHTML = marked.parse(raw.trim());
        if (key === "historical context") renderTimeline(el);
      } else {
        el.innerHTML = '<p class="todo-note">TODO: content not yet written for this section.</p>';
      }
    });
  }

  // Shows the conflict's "last verified" date under the title, flagged when
  // older than STALE_AFTER_DAYS. The conflict is found by its content path.
  function renderLastVerified() {
    if (!titleEl || typeof CONFLICTS === "undefined") return;
    const conflict = CONFLICTS.find((c) => "../" + c.content === CONTENT_FILE);
    if (!conflict) return;
    const info = lastVerifiedInfo(conflict);
    const note = document.createElement("p");
    note.className = "last-verified" + (info.stale ? " stale" : "");
    note.textContent = info.stale
      ? `Last verified ${info.date} (${info.days} days ago) — may be out of date`
      : `Last verified ${info.date}`;
    titleEl.insertAdjacentElement("afterend", note);
  }

  // Builds a compact chronological timeline from the sentences of the
  // Historical Context section that mention a year. Nothing is written
  // separately: each entry is the original sentence (citations included),
  // linked to the paragraph it came from. Hidden when fewer than
  // MIN_TIMELINE_EVENTS dated sentences are found.
  function splitSentences(html) {
    const out = [];
    const re = /[.!?]\)?\s+(?=[A-Z\u201c"])/g;
    let start = 0;
    let m;
    while ((m = re.exec(html))) {
      const end = m.index + m[0].trimEnd().length;
      if (ABBREVIATIONS.test(html.slice(start, m.index + 1))) continue;
      out.push(html.slice(start, end));
      start = m.index + m[0].length;
    }
    out.push(html.slice(start));
    return out.map((t) => t.trim()).filter(Boolean);
  }

  function renderTimeline(container) {
    const events = [];
    container.querySelectorAll(":scope > p").forEach((p, i) => {
      p.id = "history-p" + (i + 1);
      splitSentences(p.innerHTML).forEach((sentence) => {
        const plain = sentence.replace(/<[^>]*>/g, " ");
        const m = plain.match(YEAR_RE);
        if (m) events.push({ year: parseInt(m[1], 10), html: sentence, target: p.id });
      });
    });
    if (events.length < MIN_TIMELINE_EVENTS) return;
    events.sort((a, b) => a.year - b.year); // stable: keeps text order within a year

    const details = document.createElement("details");
    details.className = "timeline";
    details.open = true;
    const summary = document.createElement("summary");
    summary.textContent = "Timeline of dated events";
    const list = document.createElement("ol");
    events.forEach((ev) => {
      const li = document.createElement("li");
      const year = document.createElement("a");
      year.className = "tl-year";
      year.href = "#" + ev.target;
      year.title = "Jump to this passage in the text";
      year.textContent = ev.year;
      const text = document.createElement("span");
      text.className = "tl-text";
      text.innerHTML = ev.html;
      li.append(year, text);
      list.appendChild(li);
    });
    details.append(summary, list);
    container.prepend(details);
  }

  function normalize(str) {
    return str.trim().toLowerCase();
  }

  // Splits markdown on H1 (page title) and H2 (section headings) boundaries.
  function splitIntoSections(markdown) {
    const lines = markdown.split("\n");
    let title = null;
    const sections = {};
    let currentKey = null;
    let buffer = [];

    function flush() {
      if (currentKey) {
        const existing = sections[currentKey] || "";
        sections[currentKey] = existing + buffer.join("\n") + "\n";
      }
      buffer = [];
    }

    for (const line of lines) {
      const h1Match = line.match(/^#\s+(.*)/);
      const h2Match = line.match(/^##\s+(.*)/);

      if (h1Match && title === null) {
        title = h1Match[1].trim();
        continue;
      }
      if (h2Match) {
        flush();
        currentKey = normalize(h2Match[1]);
        continue;
      }
      buffer.push(line);
    }
    flush();

    return { title, sections };
  }
})();
