/**
 * Shared loader for conflict pages. Expects a `CONTENT_FILE` global
 * (set inline in each conflicts/*.html page) pointing at the matching
 * markdown file in /content, and DOM elements marked with
 * `data-section="Heading Name"` to receive the parsed HTML for that
 * markdown section. This enforces the fixed section structure at the
 * template level regardless of how the markdown itself is ordered.
 */
(async function () {
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

    sectionEls.forEach((el) => {
      const key = normalize(el.getAttribute("data-section"));
      const raw = sections[key];
      if (raw && raw.trim()) {
        el.innerHTML = marked.parse(raw.trim());
      } else {
        el.innerHTML = '<p class="todo-note">TODO: content not yet written for this section.</p>';
      }
    });
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
