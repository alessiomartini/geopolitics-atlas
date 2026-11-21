/**
 * Central registry of conflict zones shown on the homepage map.
 *
 * To add a new conflict:
 *   1. Add a content/<id>.md file (see content/_template.md).
 *   2. Add a conflicts/<id>.html page (copy an existing conflict page
 *      and update CONTENT_FILE + the <title>).
 *   3. Add an entry below with matching id/page/content paths and a
 *      lastVerified date.
 *
 * coordinates are [longitude, latitude], used only to place the marker
 * on the map projection.
 *
 * zoom (optional, default 6) is the Web-Mercator zoom level of the regional
 * map on the conflict page (js/region-map.js), centred on coordinates.
 *
 * mapCenter (optional) is [lon, lat]: centre of the regional map only
 * (js/region-map.js), when the places to show are not around coordinates.
 * The homepage marker always uses coordinates. Defaults to coordinates.
 *
 * places (optional) is a list of 1-6 key places named in content/<id>.md,
 * { name, coordinates: [lon, lat] } (2 decimals), drawn on the regional map
 * as a dot + label (js/region-map.js). Each must lie inside the map's viewport
 * (scripts/check-consistency.mjs checks this). Regions/straits are placed at
 * an approximate centre; Natural Earth draws Crimea as part of Russia.
 *
 * lastVerified is "YYYY-MM-DD": the date the page content was last checked
 * against its sources. Update it whenever content/<id>.md is re-verified
 * (not for typo fixes). Pages older than STALE_AFTER_DAYS get a warning.
 */
const CONFLICTS = [
  {
    id: "gaza",
    title: "Gaza / Israel-Palestine",
    summary: "A ceasefire since October 2025 has held despite continued Israeli military control of most of Gaza, unresolved Hamas disarmament, and a still-severe humanitarian crisis following two years of war that began with Hamas's 7 October 2023 attack.",
    coordinates: [34.3, 31.4],
    zoom: 8,
    places: [
      { name: "Rafah", coordinates: [34.25, 31.29] },
      { name: "West Bank", coordinates: [35.25, 31.95] }
    ],
    page: "conflicts/gaza.html",
    content: "content/gaza.md",
    lastVerified: "2026-11-07"
  },
  {
    id: "russia-ukraine",
    title: "Russia-Ukraine War",
    summary: "A full-scale Russian invasion launched in February 2022 has settled into a costly stalemate along a shifting front line, with peace talks ongoing but unresolved over Russian-occupied territory.",
    coordinates: [31.1656, 48.3794],
    zoom: 5,
    places: [
      { name: "Kyiv", coordinates: [30.52, 50.45] },
      { name: "Kharkiv", coordinates: [36.23, 49.99] },
      { name: "Donetsk", coordinates: [37.8, 48.0] },
      { name: "Zaporizhzhia", coordinates: [35.14, 47.84] },
      { name: "Kherson", coordinates: [32.62, 46.64] },
      { name: "Crimea", coordinates: [34.1, 45.0] }
    ],
    page: "conflicts/russia-ukraine.html",
    content: "content/russia-ukraine.md",
    lastVerified: "2026-11-14"
  },
  {
    id: "sudan",
    title: "Sudan Civil War",
    summary: "Since April 2023, Sudan's army and the paramilitary Rapid Support Forces have fought a war marked by mass civilian atrocities — including UN findings of genocide-level violence in El Fasher — and the world's largest displacement and hunger crisis.",
    coordinates: [30.2176, 12.8628],
    zoom: 5,
    places: [
      { name: "Khartoum", coordinates: [32.53, 15.5] },
      { name: "El Fasher", coordinates: [25.35, 13.63] },
      { name: "Nyala", coordinates: [24.88, 12.05] },
      { name: "El Obeid", coordinates: [30.21, 13.18] }
    ],
    page: "conflicts/sudan.html",
    content: "content/sudan.md",
    lastVerified: "2026-11-14"
  },
  {
    id: "xinjiang",
    title: "Xinjiang",
    summary: "China operates a large security and detention apparatus targeting Uyghurs and other Muslim minorities, which Beijing describes as counter-extremism and vocational training and which the UN and Western governments describe as mass arbitrary detention, with some governments designating it genocide.",
    coordinates: [85.0, 41.0],
    zoom: 4.5,
    places: [
      { name: "Ürümqi", coordinates: [87.62, 43.83] }
    ],
    page: "conflicts/xinjiang.html",
    content: "content/xinjiang.md",
    lastVerified: "2026-11-07"
  },
  {
    id: "myanmar",
    title: "Myanmar Civil War",
    summary: "A military junta that seized power in a 2021 coup fights a fragmented resistance of pro-democracy and ethnic armed groups for control of the country, five years into a war that has displaced millions.",
    coordinates: [96.0, 21.0],
    zoom: 5.5,
    places: [
      { name: "Rakhine", coordinates: [93.8, 19.8] },
      { name: "Kachin", coordinates: [97.5, 25.8] },
      { name: "Sagaing", coordinates: [95.0, 23.5] },
      { name: "Shan State", coordinates: [98.0, 22.0] }
    ],
    page: "conflicts/myanmar.html",
    content: "content/myanmar.md",
    lastVerified: "2026-11-07"
  },
  {
    id: "drc",
    title: "Eastern DR Congo / M23 Conflict",
    summary: "Since 2021, the Rwanda-linked M23 rebel group has seized large parts of eastern DR Congo, including Goma and Bukavu, killing thousands and displacing millions, with a fragile Qatar-brokered peace framework still being negotiated in 2026.",
    coordinates: [29.2, -1.68],
    zoom: 5,
    places: [
      { name: "Goma", coordinates: [29.22, -1.68] },
      { name: "Bukavu", coordinates: [28.86, -2.5] },
      { name: "Kigali", coordinates: [30.06, -1.95] },
      { name: "Kinshasa", coordinates: [15.31, -4.32] }
    ],
    page: "conflicts/drc.html",
    content: "content/drc.md",
    lastVerified: "2026-11-14"
  },
  {
    id: "yemen",
    title: "Yemen Civil War",
    summary: "A nine-year war between Yemen's internationally recognized government and the Houthi movement, in a fragile post-2022 truce that came under serious strain in 2026 amid renewed fighting and Houthi attacks on Red Sea shipping.",
    coordinates: [44.5, 15.4],
    zoom: 6,
    places: [
      { name: "Sanaa", coordinates: [44.21, 15.35] },
      { name: "Aden", coordinates: [45.0, 12.84] },
      { name: "Hodeidah", coordinates: [42.95, 14.8] },
      { name: "Marib", coordinates: [45.32, 15.46] },
      { name: "Bab el-Mandeb", coordinates: [43.4, 12.6] }
    ],
    page: "conflicts/yemen.html",
    content: "content/yemen.md",
    lastVerified: "2026-11-07"
  },
  {
    id: "sahel",
    title: "Sahel Insurgency (Mali, Burkina Faso, Niger)",
    summary: "Al-Qaeda- and Islamic State-linked insurgents have expanded across military-junta-ruled Mali, Burkina Faso, and Niger since 2012, driving record casualties, mass displacement, and a Malian capital under fuel blockade in 2025–2026.",
    coordinates: [1.5, 14.5],
    zoom: 4.5,
    places: [
      { name: "Bamako", coordinates: [-8.0, 12.64] },
      { name: "Niamey", coordinates: [2.11, 13.51] },
      { name: "Kidal", coordinates: [1.41, 18.44] },
      { name: "Gao", coordinates: [-0.04, 16.27] },
      { name: "Mopti", coordinates: [-4.2, 14.49] }
    ],
    page: "conflicts/sahel.html",
    content: "content/sahel.md",
    lastVerified: "2026-11-07"
  },
  {
    id: "somalia",
    title: "Somalia / Al-Shabaab Insurgency",
    summary: "Somalia's federal government and African Union forces remain locked in a long stalemate with the al-Qaeda-linked Al-Shabaab insurgency, which controls or taxes large parts of south-central Somalia despite repeated government offensives.",
    coordinates: [45.3, 2.03],
    zoom: 5.5,
    places: [
      { name: "Mogadishu", coordinates: [45.34, 2.05] },
      { name: "Baidoa", coordinates: [43.65, 3.12] },
      { name: "Puntland", coordinates: [49.0, 8.0] }
    ],
    page: "conflicts/somalia.html",
    content: "content/somalia.md",
    lastVerified: "2026-11-07"
  },
  {
    id: "ethiopia",
    title: "Ethiopia (Tigray and Amhara Conflicts)",
    summary: "Ethiopia's 2020–2022 Tigray war left unresolved fault lines that have produced a separate Amhara Fano insurgency since 2023 and renewed federal-TPLF clashes in 2026, threatening the fragile Pretoria peace agreement.",
    coordinates: [38.7, 14.1],
    zoom: 5.5,
    places: [
      { name: "Addis Ababa", coordinates: [38.75, 9.03] },
      { name: "Mekelle", coordinates: [39.47, 13.5] },
      { name: "Asmara", coordinates: [38.93, 15.34] },
      { name: "Assab", coordinates: [42.68, 13.04] }
    ],
    page: "conflicts/ethiopia.html",
    content: "content/ethiopia.md",
    lastVerified: "2026-11-07"
  },
  {
    id: "syria",
    title: "Syria Civil War and Transition",
    summary: "Following the fall of the Assad regime in December 2024, a transitional government under Ahmed al-Sharaa has won international recognition while facing deadly sectarian violence against Alawite and Druze communities and an unfinished integration of Kurdish-led forces.",
    coordinates: [38.0, 35.0],
    zoom: 6.5,
    places: [
      { name: "Damascus", coordinates: [36.29, 33.51] },
      { name: "Aleppo", coordinates: [37.16, 36.2] },
      { name: "Idlib", coordinates: [36.63, 35.93] },
      { name: "Homs", coordinates: [36.72, 34.73] },
      { name: "Sweida", coordinates: [36.57, 32.71] },
      { name: "Kobani", coordinates: [38.35, 36.83] }
    ],
    page: "conflicts/syria.html",
    content: "content/syria.md",
    lastVerified: "2026-11-07"
  },
  {
    id: "lebanon-israel",
    title: "Lebanon-Israel Conflict",
    summary: "A November 2024 ceasefire ended a year of open war between Israel and Hezbollah, but Israeli forces remain in southern Lebanon and continue near-daily strikes as Hezbollah's disarmament remains incomplete and contested.",
    coordinates: [35.5, 33.3],
    zoom: 7.5,
    places: [
      { name: "Beirut", coordinates: [35.53, 33.87] },
      { name: "Litani River", coordinates: [35.35, 33.35] },
      { name: "Beaufort Castle", coordinates: [35.53, 33.32] }
    ],
    page: "conflicts/lebanon-israel.html",
    content: "content/lebanon-israel.md",
    lastVerified: "2026-11-14"
  },
  {
    id: "haiti",
    title: "Haiti Crisis",
    summary: "Gang coalitions, led by Viv Ansanm, control most of Port-au-Prince amid a collapse of state authority following the 2021 presidential assassination, with a new UN-backed Gang Suppression Force only beginning deployment in 2026 amid record displacement and hunger.",
    coordinates: [-72.3, 18.9],
    zoom: 7,
    places: [
      { name: "Port-au-Prince", coordinates: [-72.34, 18.54] },
      { name: "Artibonite", coordinates: [-72.6, 19.2] }
    ],
    page: "conflicts/haiti.html",
    content: "content/haiti.md",
    lastVerified: "2026-11-07"
  },
  {
    id: "taiwan-strait",
    title: "Taiwan Strait Tensions",
    summary: "China claims self-governing Taiwan as part of its territory and has ruled out renouncing force to achieve 'reunification,' while Taiwan's government maintains the island is already sovereign — a standoff sustained for decades by U.S. strategic ambiguity.",
    coordinates: [119.5, 24.0],
    zoom: 6.5,
    places: [
      { name: "Taipei", coordinates: [121.56, 25.04] },
      { name: "Taiwan Strait", coordinates: [119.6, 24.6] }
    ],
    page: "conflicts/taiwan-strait.html",
    content: "content/taiwan-strait.md",
    lastVerified: "2026-11-07"
  },
  {
    id: "korea",
    title: "Korean Peninsula",
    summary: "North and South Korea remain technically at war under a 1953 armistice, with Pyongyang now renouncing reunification and expanding its nuclear arsenal while Seoul pursues cautious re-engagement.",
    coordinates: [127.0, 38.3],
    zoom: 6.5,
    places: [
      { name: "Pyongyang", coordinates: [125.75, 39.02] },
      { name: "Seoul", coordinates: [126.98, 37.57] },
      { name: "Panmunjom", coordinates: [126.68, 37.96] }
    ],
    page: "conflicts/korea.html",
    content: "content/korea.md",
    lastVerified: "2026-11-07"
  },
  {
    id: "kashmir",
    title: "Kashmir Dispute",
    summary: "India and Pakistan have contested the former princely state of Kashmir since 1947 partition, each administering part of it while claiming all of it, with a Kashmiri self-determination movement pressing a third, distinct claim.",
    coordinates: [76.5, 34.0],
    zoom: 6,
    places: [
      { name: "Srinagar", coordinates: [74.8, 34.08] },
      { name: "Pahalgam", coordinates: [75.33, 34.02] },
      { name: "Jammu", coordinates: [74.86, 32.73] },
      { name: "Rawalakot", coordinates: [73.76, 33.86] },
      { name: "Ladakh", coordinates: [77.6, 34.2] }
    ],
    page: "conflicts/kashmir.html",
    content: "content/kashmir.md",
    lastVerified: "2026-11-07"
  },
  {
    id: "armenia-azerbaijan",
    title: "Armenia-Azerbaijan Conflict",
    summary: "Azerbaijan's 2023 offensive ended decades of conflict over Nagorno-Karabakh, displacing its ethnic Armenian population; Yerevan and Baku are now negotiating a bilateral peace treaty and border demarcation.",
    coordinates: [46.75, 39.9],
    zoom: 7,
    places: [
      { name: "Yerevan", coordinates: [44.51, 40.18] },
      { name: "Baku", coordinates: [49.87, 40.41] },
      { name: "Lachin", coordinates: [46.55, 39.64] },
      { name: "Nakhchivan", coordinates: [45.41, 39.21] },
      { name: "Syunik", coordinates: [46.2, 39.2] }
    ],
    page: "conflicts/armenia-azerbaijan.html",
    content: "content/armenia-azerbaijan.md",
    lastVerified: "2026-11-07"
  },
  {
    id: "iran-israel",
    title: "Iran-Israel Shadow War",
    summary: "Decades of covert confrontation between Iran and Israel became direct warfare in 2025-2026, including a February 2026 strike that killed Iran's Supreme Leader, leaving Iran's nuclear program's status and a durable settlement both unresolved.",
    coordinates: [51.4, 35.7],
    mapCenter: [54.0, 31.2],
    zoom: 5,
    places: [
      { name: "Natanz", coordinates: [51.73, 33.72] },
      { name: "Strait of Hormuz", coordinates: [56.4, 26.6] },
      { name: "Qeshm", coordinates: [55.9, 26.8] }
    ],
    page: "conflicts/iran-israel.html",
    content: "content/iran-israel.md",
    lastVerified: "2026-11-14"
  },
  {
    id: "south-china-sea",
    title: "South China Sea Disputes",
    summary: "China's expansive maritime claims overlap with those of the Philippines, Vietnam, Malaysia and Brunei, producing recurring coast-guard confrontations despite a 2016 international tribunal ruling against China's legal basis.",
    coordinates: [114.0, 12.0],
    zoom: 5,
    places: [
      { name: "Scarborough Shoal", coordinates: [117.76, 15.15] },
      { name: "Spratly Islands", coordinates: [114.0, 10.0] },
      { name: "Second Thomas Shoal", coordinates: [115.86, 9.72] },
      { name: "Manila", coordinates: [120.98, 14.6] }
    ],
    page: "conflicts/south-china-sea.html",
    content: "content/south-china-sea.md",
    lastVerified: "2026-11-07"
  },
  {
    id: "venezuela",
    title: "Venezuela Crisis",
    summary: "Venezuela's disputed 2024 election, US sanctions and drug-trafficking allegations, and a long-running Essequibo territorial claim against Guyana culminated in a January 2026 US military operation that captured President Maduro, leaving Vice President Delcy Rodríguez as acting president.",
    coordinates: [-66.9, 10.5],
    mapCenter: [-63.0, 8.2],
    zoom: 6,
    places: [
      { name: "Caracas", coordinates: [-66.9, 10.49] },
      { name: "Essequibo (disputed)", coordinates: [-59.3, 5.8] }
    ],
    page: "conflicts/venezuela.html",
    content: "content/venezuela.md",
    lastVerified: "2026-11-07"
  },
  {
    id: "western-sahara",
    title: "Western Sahara",
    summary: "Morocco and the Algeria-backed Polisario Front have disputed sovereignty over Western Sahara since 1975; a 1991 UN ceasefire and promised referendum stalled for decades, and in 2025 the UN Security Council backed Morocco's autonomy plan as the basis for talks.",
    coordinates: [-12.5, 24.5],
    zoom: 5.5,
    places: [
      { name: "Tindouf", coordinates: [-8.15, 27.67] },
      { name: "Guerguerat", coordinates: [-16.2, 21.4] }
    ],
    page: "conflicts/western-sahara.html",
    content: "content/western-sahara.md",
    lastVerified: "2026-11-07"
  },
  {
    id: "cyprus",
    title: "Cyprus Dispute",
    summary: "The island has been divided since Turkey's 1974 intervention, with a UN buffer zone separating the internationally recognized south from the Turkish-backed north; reunification talks remain stalled after decades of failed negotiations.",
    coordinates: [33.3, 35.1],
    zoom: 8,
    places: [
      { name: "Nicosia", coordinates: [33.38, 35.17] }
    ],
    page: "conflicts/cyprus.html",
    content: "content/cyprus.md",
    lastVerified: "2026-11-07"
  }
];

const STALE_AFTER_DAYS = 90;

// Describes a conflict's lastVerified date for display (page header, map tooltip).
// Returns { date, stale, days } where days is the age in whole days (UTC).
function lastVerifiedInfo(conflict, now = new Date()) {
  const [y, m, d] = conflict.lastVerified.split("-").map(Number);
  const verified = Date.UTC(y, m - 1, d);
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.floor((today - verified) / 86400000);
  return { date: conflict.lastVerified, days, stale: days > STALE_AFTER_DAYS };
}
