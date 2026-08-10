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
  }
];
