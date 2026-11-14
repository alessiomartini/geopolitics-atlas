/**
 * Detailed regional map for a conflict page. Same stack as the homepage map
 * (d3 + topojson-client + the world-atlas package from jsdelivr, no tiles):
 * the map is centred on the conflict's `coordinates` from data/conflicts.js,
 * at the entry's optional `zoom` (Web-Mercator zoom level, default 6).
 * The conflict is found by its CONTENT_FILE, like page-loader.js does.
 */
(function () {
  const DEFAULT_ZOOM = 6;
  const width = 880;
  const height = 440;
  const atlasUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

  const container = document.getElementById("region-map");
  if (!container || typeof CONFLICTS === "undefined" || typeof CONTENT_FILE === "undefined") return;
  const conflict = CONFLICTS.find((c) => "../" + c.content === CONTENT_FILE);
  if (!conflict) return;

  const zoom = typeof conflict.zoom === "number" ? conflict.zoom : DEFAULT_ZOOM;
  const scale = (256 * Math.pow(2, zoom)) / (2 * Math.PI);

  const svg = d3.select(container).select("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("aria-label", `Regional map around ${conflict.title}`);

  const projection = d3.geoMercator()
    .center(conflict.coordinates)
    .scale(scale)
    .translate([width / 2, height / 2]);
  const path = d3.geoPath(projection);

  d3.json(atlasUrl)
    .then((world) => {
      const countries = topojson.feature(world, world.objects.countries).features;

      svg.append("g")
        .attr("class", "region-graticule")
        .append("path")
        .attr("d", path(d3.geoGraticule().step([5, 5])()));

      svg.append("g")
        .selectAll("path")
        .data(countries)
        .join("path")
        .attr("class", "country")
        .attr("d", path);

      // Country names, only where the country's centroid is inside the frame.
      const labels = countries
        .map((f) => ({ name: f.properties.name, pt: projection(d3.geoCentroid(f)) }))
        .filter((l) => l.name && l.pt && l.pt[0] > 40 && l.pt[0] < width - 40 &&
          l.pt[1] > 20 && l.pt[1] < height - 20);
      svg.append("g")
        .selectAll("text")
        .data(labels)
        .join("text")
        .attr("class", "region-label")
        .attr("x", (l) => l.pt[0])
        .attr("y", (l) => l.pt[1])
        .attr("text-anchor", "middle")
        .text((l) => l.name);

      const [mx, my] = projection(conflict.coordinates);
      svg.append("circle")
        .attr("class", "conflict-marker region-marker")
        .attr("r", 7)
        .attr("cx", mx)
        .attr("cy", my);
    })
    .catch((err) => {
      console.error("Failed to load regional map data:", err);
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("class", "map-error")
        .text("Failed to load map data. Check your connection and reload.");
    });
})();
