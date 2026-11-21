/**
 * Image gallery for a conflict page. Reads CONFLICT_IMAGES (data/images.js,
 * keyed by conflict id) and fills <div id="conflict-images">. The conflict is
 * found by CONTENT_FILE, like region-map.js. Each image shows caption, author,
 * licence and a link to its Wikimedia Commons file page. No images: the
 * container stays hidden.
 */
(function () {
  const container = document.getElementById("conflict-images");
  if (!container || typeof CONFLICTS === "undefined" ||
      typeof CONFLICT_IMAGES === "undefined" || typeof CONTENT_FILE === "undefined") return;
  const conflict = CONFLICTS.find((c) => "../" + c.content === CONTENT_FILE);
  const images = conflict && CONFLICT_IMAGES[conflict.id];
  if (!images || !images.length) return;

  for (const img of images) {
    const fig = document.createElement("figure");
    fig.className = "conflict-image";

    const a = document.createElement("a");
    a.href = img.page;
    a.target = "_blank";
    a.rel = "noopener";
    const el = document.createElement("img");
    el.src = img.thumb;
    el.alt = img.alt || img.caption;
    el.loading = "lazy";
    a.appendChild(el);
    fig.appendChild(a);

    const cap = document.createElement("figcaption");
    cap.textContent = img.caption + " ";
    const credit = document.createElement("span");
    credit.className = "image-credit";
    credit.append(`${img.author}, `);
    if (img.licenseUrl) {
      const l = document.createElement("a");
      l.href = img.licenseUrl;
      l.target = "_blank";
      l.rel = "noopener";
      l.textContent = img.license;
      credit.append(l);
    } else {
      credit.append(img.license);
    }
    credit.append(" — ");
    const src = document.createElement("a");
    src.href = img.page;
    src.target = "_blank";
    src.rel = "noopener";
    src.textContent = "Wikimedia Commons";
    credit.append(src);
    cap.appendChild(credit);
    fig.appendChild(cap);
    container.appendChild(fig);
  }
  container.hidden = false;
})();
