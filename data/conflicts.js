/**
 * Central registry of conflict zones shown on the homepage map.
 *
 * To add a new conflict:
 *   1. Add a content/<id>.md file (see content/_template.md).
 *   2. Add a conflicts/<id>.html page (copy an existing conflict page
 *      and update CONTENT_FILE + the <title>).
 *   3. Add an entry below with matching id/page/content paths.
 *
 * coordinates are [longitude, latitude], used only to place the marker
 * on the map projection.
 */
const CONFLICTS = [
  {
    id: "gaza",
    title: "Gaza / Israel-Palestine",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [34.3, 31.4],
    page: "conflicts/gaza.html",
    content: "content/gaza.md"
  },
  {
    id: "russia-ukraine",
    title: "Russia-Ukraine War",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [31.1656, 48.3794],
    page: "conflicts/russia-ukraine.html",
    content: "content/russia-ukraine.md"
  },
  {
    id: "sudan",
    title: "Sudan Civil War",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [30.2176, 12.8628],
    page: "conflicts/sudan.html",
    content: "content/sudan.md"
  },
  {
    id: "xinjiang",
    title: "Xinjiang",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [85.0, 41.0],
    page: "conflicts/xinjiang.html",
    content: "content/xinjiang.md"
  },
  {
    id: "myanmar",
    title: "Myanmar Civil War",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [96.0, 21.0],
    page: "conflicts/myanmar.html",
    content: "content/myanmar.md"
  },
  {
    id: "drc",
    title: "Eastern DR Congo / M23 Conflict",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [29.2, -1.68],
    page: "conflicts/drc.html",
    content: "content/drc.md"
  },
  {
    id: "yemen",
    title: "Yemen Civil War",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [44.5, 15.4],
    page: "conflicts/yemen.html",
    content: "content/yemen.md"
  },
  {
    id: "sahel",
    title: "Sahel Insurgency (Mali, Burkina Faso, Niger)",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [1.5, 14.5],
    page: "conflicts/sahel.html",
    content: "content/sahel.md"
  },
  {
    id: "somalia",
    title: "Somalia / Al-Shabaab Insurgency",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [45.3, 2.03],
    page: "conflicts/somalia.html",
    content: "content/somalia.md"
  },
  {
    id: "ethiopia",
    title: "Ethiopia (Tigray and Amhara Conflicts)",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [38.7, 14.1],
    page: "conflicts/ethiopia.html",
    content: "content/ethiopia.md"
  },
  {
    id: "syria",
    title: "Syria Civil War and Transition",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [38.0, 35.0],
    page: "conflicts/syria.html",
    content: "content/syria.md"
  },
  {
    id: "lebanon-israel",
    title: "Lebanon-Israel Conflict",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [35.5, 33.3],
    page: "conflicts/lebanon-israel.html",
    content: "content/lebanon-israel.md"
  },
  {
    id: "haiti",
    title: "Haiti Crisis",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [-72.3, 18.9],
    page: "conflicts/haiti.html",
    content: "content/haiti.md"
  },
  {
    id: "taiwan-strait",
    title: "Taiwan Strait Tensions",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [119.5, 24.0],
    page: "conflicts/taiwan-strait.html",
    content: "content/taiwan-strait.md"
  },
  {
    id: "korea",
    title: "Korean Peninsula",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [127.0, 38.3],
    page: "conflicts/korea.html",
    content: "content/korea.md"
  },
  {
    id: "kashmir",
    title: "Kashmir Dispute",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [76.5, 34.0],
    page: "conflicts/kashmir.html",
    content: "content/kashmir.md"
  },
  {
    id: "armenia-azerbaijan",
    title: "Armenia-Azerbaijan Conflict",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [46.75, 39.9],
    page: "conflicts/armenia-azerbaijan.html",
    content: "content/armenia-azerbaijan.md"
  },
  {
    id: "iran-israel",
    title: "Iran-Israel Shadow War",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [51.4, 35.7],
    page: "conflicts/iran-israel.html",
    content: "content/iran-israel.md"
  },
  {
    id: "south-china-sea",
    title: "South China Sea Disputes",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [114.0, 12.0],
    page: "conflicts/south-china-sea.html",
    content: "content/south-china-sea.md"
  },
  {
    id: "venezuela",
    title: "Venezuela Crisis",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [-66.9, 10.5],
    page: "conflicts/venezuela.html",
    content: "content/venezuela.md"
  },
  {
    id: "western-sahara",
    title: "Western Sahara",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [-12.5, 24.5],
    page: "conflicts/western-sahara.html",
    content: "content/western-sahara.md"
  },
  {
    id: "cyprus",
    title: "Cyprus Dispute",
    summary: "TODO: one to two line neutral summary.",
    coordinates: [33.3, 35.1],
    page: "conflicts/cyprus.html",
    content: "content/cyprus.md"
  }
];
