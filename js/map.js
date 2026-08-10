/**
 * Renders the homepage world map: draws country outlines from a
 * world-atlas topojson file, then overlays one marker per entry in
 * CONFLICTS (see data/conflicts.js) with hover tooltip + click-through.
 */
(function () {
  const width = 960;
  const height = 500;
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

      svg.append("g")
        .attr("class", "markers")
        .selectAll("circle")
        .data(CONFLICTS)
        .join("circle")
        .attr("class", "conflict-marker")
        .attr("r", 7)
        .attr("cx", (d) => projection(d.coordinates)[0])
        .attr("cy", (d) => projection(d.coordinates)[1])
        .attr("tabindex", 0)
        .attr("role", "link")
        .attr("aria-label", (d) => `${d.title}: ${d.summary}`)
        .on("mouseenter", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip)
        .on("focus", showTooltip)
        .on("blur", hideTooltip)
        .on("click", (event, d) => navigate(d))
        .on("keydown", (event, d) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            navigate(d);
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

  function showTooltip(event, d) {
    tooltip
      .classed("hidden", false)
      .html(`<strong>${escapeHtml(d.title)}</strong><p>${escapeHtml(d.summary)}</p>`);
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
})();
