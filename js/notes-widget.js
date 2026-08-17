/**
 * Floating "note to self" widget, present on every page. Lets the site
 * owner jot comments/suggestions/ideas while browsing; each note is
 * POSTed to the geopolitics-atlas-notes Worker and stored in D1. There
 * is no in-site list of past notes — they're read back separately
 * (Cloudflare dashboard / wrangler / MCP), by design.
 */
(function () {
  const WORKER_URL = "https://geopolitics-atlas-notes.alemarti-2001.workers.dev/notes";

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.id = "notes-toggle";
  toggle.className = "notes-toggle";
  toggle.textContent = "+ Note";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "notes-panel");

  const panel = document.createElement("div");
  panel.id = "notes-panel";
  panel.className = "notes-panel hidden";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Add a note for this site");
  panel.innerHTML =
    '<label for="notes-textarea">Note, suggestion, or idea for this site</label>' +
    '<textarea id="notes-textarea" maxlength="2000" rows="4" placeholder="e.g. &quot;add a timeline view for Sudan&quot; or &quot;fix typo in Xinjiang sources&quot;"></textarea>' +
    '<input type="text" name="website" id="notes-website" class="notes-honeypot" tabindex="-1" autocomplete="off">' +
    '<div class="notes-actions">' +
    '<span class="notes-status" id="notes-status" aria-live="polite"></span>' +
    '<button type="button" id="notes-cancel">Cancel</button>' +
    '<button type="button" id="notes-submit">Save note</button>' +
    "</div>";

  document.body.appendChild(toggle);
  document.body.appendChild(panel);

  const textarea = panel.querySelector("#notes-textarea");
  const status = panel.querySelector("#notes-status");
  const honeypot = panel.querySelector("#notes-website");
  const submitBtn = panel.querySelector("#notes-submit");
  const cancelBtn = panel.querySelector("#notes-cancel");

  function openPanel() {
    panel.classList.remove("hidden");
    toggle.setAttribute("aria-expanded", "true");
    textarea.focus();
  }

  function closePanel() {
    panel.classList.add("hidden");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    if (panel.classList.contains("hidden")) {
      openPanel();
    } else {
      closePanel();
    }
  });

  cancelBtn.addEventListener("click", closePanel);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.classList.contains("hidden")) {
      closePanel();
    }
  });

  submitBtn.addEventListener("click", async () => {
    const text = textarea.value.trim();
    if (!text) {
      status.textContent = "Write something first.";
      return;
    }

    submitBtn.disabled = true;
    status.textContent = "Saving…";

    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          page: location.pathname,
          website: honeypot.value,
        }),
      });
      if (!res.ok) throw new Error(`request failed with ${res.status}`);

      textarea.value = "";
      status.textContent = "Saved.";
      setTimeout(closePanel, 900);
    } catch (err) {
      console.error("Failed to save note:", err);
      status.textContent = "Couldn't save — try again later.";
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
