/**
 * Renders the homepage world map: draws country outlines from a
 * world-atlas topojson file, then overlays one marker per entry in
 * CONFLICTS (see data/conflicts.js) with hover tooltip + click-through.
 */
(function () {
  const width = 960;
  const height = 500;
  const MARKER_RADIUS = 7;
  const worldUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

  const svg = d3.select("#world-map")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  const tooltip = d3.select("#tooltip");
  const mapContainer = document.getElementById("map-container");

  const projection = d3.geoNaturalEarth1()
    .scale(155)
    .translate([width / 2, height / 2]);

  const path = d3.geoPath(projection);

  d3.json(worldUrl)
    .then((world) => {
      const countries = topojson.feature(world, world.objects.countries).features;

      svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(countries)
        .join("path")
        .attr("class", "country")
        .attr("d", path);

      const markerNodes = CONFLICTS.map((d) => {
        const [x, y] = projection(d.coordinates);
        return { data: d, x, y };
      });
      resolveMarkerCollisions(markerNodes, MARKER_RADIUS * 2 + 6);

      svg.append("g")
        .attr("class", "markers")
        .selectAll("circle")
        .data(markerNodes)
        .join("circle")
        .attr("class", "conflict-marker")
        .attr("r", MARKER_RADIUS)
        .attr("cx", (n) => n.x)
        .attr("cy", (n) => n.y)
        .attr("tabindex", 0)
        .attr("role", "link")
        .attr("aria-label", (n) => `${n.data.title}: ${n.data.summary}`)
        .on("mouseenter", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip)
        .on("focus", showTooltip)
        .on("blur", hideTooltip)
        .on("click", (event, n) => navigate(n.data))
        .on("keydown", (event, n) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            navigate(n.data);
          }
        });
    })
    .catch((err) => {
      console.error("Failed to load world map data:", err);
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("class", "map-error")
        .text("Failed to load map data. Check your connection and reload.");
    });

  function navigate(d) {
    window.location.href = d.page;
  }

  function showTooltip(event, n) {
    tooltip
      .classed("hidden", false)
      .html(`<strong>${escapeHtml(n.data.title)}</strong><p>${escapeHtml(n.data.summary)}</p>`);
    moveTooltip(event);
  }

  function moveTooltip(event) {
    const bounds = mapContainer.getBoundingClientRect();
    const clientX = event.clientX ?? bounds.left + bounds.width / 2;
    const clientY = event.clientY ?? bounds.top + bounds.height / 2;
    let x = clientX - bounds.left + 16;
    let y = clientY - bounds.top + 16;

    const tooltipEl = tooltip.node();
    const tw = tooltipEl.offsetWidth;
    const th = tooltipEl.offsetHeight;
    if (x + tw > bounds.width) x = bounds.width - tw - 8;
    if (y + th > bounds.height) y = bounds.height - th - 8;

    tooltip.style("left", `${x}px`).style("top", `${y}px`);
  }

  function hideTooltip() {
    tooltip.classed("hidden", true);
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // At world-map scale, markers for conflicts in the same region (e.g. the
  // eastern Mediterranean) can project to nearly the same point and overlap.
  // Nudge such markers apart in screen space, without altering the
  // geographic coordinates used elsewhere, so every marker stays clickable.
  function resolveMarkerCollisions(nodes, minDist) {
    const iterations = 30;
    for (let iter = 0; iter < iterations; iter++) {
      let moved = false;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          let dx = b.x - a.x;
          let dy = b.y - a.y;
          let dist = Math.hypot(dx, dy);
          if (dist < minDist) {
            moved = true;
            if (dist < 0.01) {
              // Coincident points: nudge along a deterministic direction.
              dx = 1;
              dy = 0;
              dist = 1;
            }
            const push = (minDist - dist) / 2;
            const ux = dx / dist;
            const uy = dy / dist;
            a.x -= ux * push;
            a.y -= uy * push;
            b.x += ux * push;
            b.y += uy * push;
          }
        }
      }
      if (!moved) break;
    }
  }
})();
