/**
 * Detailed regional map for a conflict page. Same stack as the homepage map
 * (d3 + topojson-client + the world-atlas package from jsdelivr, no tiles):
 * the map is centred on the conflict's `mapCenter` (default `coordinates`) from data/conflicts.js,
 * at the entry's optional `zoom` (Web-Mercator zoom level, default 6).
 * Optional `places` are drawn as labelled dots (see drawPlaces).
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

  const center = Array.isArray(conflict.mapCenter) ? conflict.mapCenter : conflict.coordinates;
  const projection = d3.geoMercator()
    .center(center)
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

      drawPlaces();
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
  // Key places (optional `places` in data/conflicts.js): dot + label with a
  // halo. Labels go to the right of the dot; on collision they try left,
  // above, below, and are skipped if still overlapping.
  function drawPlaces() {
    const places = Array.isArray(conflict.places) ? conflict.places : [];
    if (!places.length) return;
    const g = svg.append("g").attr("class", "region-places");
    const fs = window.matchMedia("(max-width: 600px)").matches ? 14 : 11;
    const taken = [];
    const [cx, cy] = projection(conflict.coordinates);
    taken.push({ x0: cx - 9, x1: cx + 9, y0: cy - 9, y1: cy + 9 });
    const hit = (a, b) => a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0;
    places.forEach((p) => {
      const pt = projection(p.coordinates);
      if (!pt) return;
      const [x, y] = pt;
      const w = p.name.length * fs * 0.56 + 6;
      const h = fs + 2;
      const cands = [
        { dx: 6, dy: 0, anchor: "start", x0: x + 4, y0: y - h / 2 },
        { dx: -6, dy: 0, anchor: "end", x0: x - 4 - w, y0: y - h / 2 },
        { dx: 0, dy: -8, anchor: "middle", x0: x - w / 2, y0: y - 8 - h },
        { dx: 0, dy: fs + 6, anchor: "middle", x0: x - w / 2, y0: y + 6 }
      ];
      const spot = cands.find((c) => {
        const box = { x0: c.x0, x1: c.x0 + w, y0: c.y0, y1: c.y0 + h };
        return box.x0 > 2 && box.x1 < width - 2 && box.y0 > 2 && box.y1 < height - 2 &&
          !taken.some((t) => hit(box, t));
      });
      const dotBox = { x0: x - 3, x1: x + 3, y0: y - 3, y1: y + 3 };
      if (!spot) { taken.push(dotBox); g.append("circle").attr("class", "place-dot").attr("r", 3).attr("cx", x).attr("cy", y).append("title").text(p.name); return; }
      taken.push(dotBox, { x0: spot.x0, x1: spot.x0 + w, y0: spot.y0, y1: spot.y0 + h });
      g.append("circle").attr("class", "place-dot").attr("r", 3).attr("cx", x).attr("cy", y);
      g.append("text")
        .attr("class", "place-label")
        .attr("x", x + spot.dx)
        .attr("y", y + spot.dy)
        .attr("dy", "0.35em")
        .attr("text-anchor", spot.anchor)
        .text(p.name);
    });
  }
})();
