/**
 * Renders the source tier directory on sources.html from
 * data/sources.js (SOURCE_TIERS + SOURCES).
 */
(function () {
  const container = document.getElementById("source-directory");
  if (!container) return;

  SOURCE_TIERS.forEach((tier) => {
    const section = document.createElement("section");
    section.className = "tier-block";

    const heading = document.createElement("h3");
    heading.textContent = tier.label;
    section.appendChild(heading);

    const desc = document.createElement("p");
    desc.className = "tier-description";
    desc.textContent = tier.description;
    section.appendChild(desc);

    const list = document.createElement("ul");
    list.className = "source-list";

    SOURCES.filter((s) => s.tier === tier.id).forEach((s) => {
      const item = document.createElement("li");

      const nameEl = document.createElement("span");
      nameEl.className = "source-name";
      if (s.url) {
        const link = document.createElement("a");
        link.href = s.url;
        link.textContent = s.name;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        nameEl.appendChild(link);
      } else {
        nameEl.textContent = s.name;
      }
      item.appendChild(nameEl);

      const typeEl = document.createElement("span");
      typeEl.className = "source-type";
      typeEl.textContent = s.sourceType;
      item.appendChild(typeEl);

      if (s.notes) {
        const notesEl = document.createElement("p");
        notesEl.className = "source-notes";
        notesEl.textContent = s.notes;
        item.appendChild(notesEl);
      }

      list.appendChild(item);
    });

    section.appendChild(list);
    container.appendChild(section);
  });
})();
