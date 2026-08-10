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
    summary: "A ceasefire since October 2025 has held despite continued Israeli military control of most of Gaza, unresolved Hamas disarmament, and a still-severe humanitarian crisis following two years of war that began with Hamas's 7 October 2023 attack.",
    coordinates: [34.3, 31.4],
    page: "conflicts/gaza.html",
    content: "content/gaza.md"
  },
  {
    id: "russia-ukraine",
    title: "Russia-Ukraine War",
    summary: "A full-scale Russian invasion launched in February 2022 has settled into a costly stalemate along a shifting front line, with peace talks ongoing but unresolved over Russian-occupied territory.",
    coordinates: [31.1656, 48.3794],
    page: "conflicts/russia-ukraine.html",
    content: "content/russia-ukraine.md"
  },
  {
    id: "sudan",
    title: "Sudan Civil War",
    summary: "Since April 2023, Sudan's army and the paramilitary Rapid Support Forces have fought a war marked by mass civilian atrocities — including UN findings of genocide-level violence in El Fasher — and the world's largest displacement and hunger crisis.",
    coordinates: [30.2176, 12.8628],
    page: "conflicts/sudan.html",
    content: "content/sudan.md"
  },
  {
    id: "xinjiang",
    title: "Xinjiang",
    summary: "China operates a large security and detention apparatus targeting Uyghurs and other Muslim minorities, which Beijing describes as counter-extremism and vocational training and which the UN and Western governments describe as mass arbitrary detention, with some governments designating it genocide.",
    coordinates: [85.0, 41.0],
    page: "conflicts/xinjiang.html",
    content: "content/xinjiang.md"
  },
  {
    id: "myanmar",
    title: "Myanmar Civil War",
    summary: "A military junta that seized power in a 2021 coup fights a fragmented resistance of pro-democracy and ethnic armed groups for control of the country, five years into a war that has displaced millions.",
    coordinates: [96.0, 21.0],
    page: "conflicts/myanmar.html",
    content: "content/myanmar.md"
  },
  {
    id: "drc",
    title: "Eastern DR Congo / M23 Conflict",
    summary: "Since 2021, the Rwanda-linked M23 rebel group has seized large parts of eastern DR Congo, including Goma and Bukavu, killing thousands and displacing millions, with a fragile Qatar-brokered peace framework still being negotiated in 2026.",
    coordinates: [29.2, -1.68],
    page: "conflicts/drc.html",
    content: "content/drc.md"
  },
  {
    id: "yemen",
    title: "Yemen Civil War",
    summary: "A nine-year war between Yemen's internationally recognized government and the Houthi movement, in a fragile post-2022 truce that came under serious strain in 2026 amid renewed fighting and Houthi attacks on Red Sea shipping.",
    coordinates: [44.5, 15.4],
    page: "conflicts/yemen.html",
    content: "content/yemen.md"
  },
  {
    id: "sahel",
    title: "Sahel Insurgency (Mali, Burkina Faso, Niger)",
    summary: "Al-Qaeda- and Islamic State-linked insurgents have expanded across military-junta-ruled Mali, Burkina Faso, and Niger since 2012, driving record casualties, mass displacement, and a Malian capital under fuel blockade in 2025–2026.",
    coordinates: [1.5, 14.5],
    page: "conflicts/sahel.html",
    content: "content/sahel.md"
  },
  {
    id: "somalia",
    title: "Somalia / Al-Shabaab Insurgency",
    summary: "Somalia's federal government and African Union forces remain locked in a long stalemate with the al-Qaeda-linked Al-Shabaab insurgency, which controls or taxes large parts of south-central Somalia despite repeated government offensives.",
    coordinates: [45.3, 2.03],
    page: "conflicts/somalia.html",
    content: "content/somalia.md"
  },
  {
    id: "ethiopia",
    title: "Ethiopia (Tigray and Amhara Conflicts)",
    summary: "Ethiopia's 2020–2022 Tigray war left unresolved fault lines that have produced a separate Amhara Fano insurgency since 2023 and renewed federal-TPLF clashes in 2026, threatening the fragile Pretoria peace agreement.",
    coordinates: [38.7, 14.1],
    page: "conflicts/ethiopia.html",
    content: "content/ethiopia.md"
  },
  {
    id: "syria",
    title: "Syria Civil War and Transition",
    summary: "Following the fall of the Assad regime in December 2024, a transitional government under Ahmed al-Sharaa has won international recognition while facing deadly sectarian violence against Alawite and Druze communities and an unfinished integration of Kurdish-led forces.",
    coordinates: [38.0, 35.0],
    page: "conflicts/syria.html",
    content: "content/syria.md"
  },
  {
    id: "lebanon-israel",
    title: "Lebanon-Israel Conflict",
    summary: "A November 2024 ceasefire ended a year of open war between Israel and Hezbollah, but Israeli forces remain in southern Lebanon and continue near-daily strikes as Hezbollah's disarmament remains incomplete and contested.",
    coordinates: [35.5, 33.3],
    page: "conflicts/lebanon-israel.html",
    content: "content/lebanon-israel.md"
  },
  {
    id: "haiti",
    title: "Haiti Crisis",
    summary: "Gang coalitions, led by Viv Ansanm, control most of Port-au-Prince amid a collapse of state authority following the 2021 presidential assassination, with a new UN-backed Gang Suppression Force only beginning deployment in 2026 amid record displacement and hunger.",
    coordinates: [-72.3, 18.9],
    page: "conflicts/haiti.html",
    content: "content/haiti.md"
  },
  {
    id: "taiwan-strait",
    title: "Taiwan Strait Tensions",
    summary: "China claims self-governing Taiwan as part of its territory and has ruled out renouncing force to achieve 'reunification,' while Taiwan's government maintains the island is already sovereign — a standoff sustained for decades by U.S. strategic ambiguity.",
    coordinates: [119.5, 24.0],
    page: "conflicts/taiwan-strait.html",
    content: "content/taiwan-strait.md"
  },
  {
    id: "korea",
    title: "Korean Peninsula",
    summary: "North and South Korea remain technically at war under a 1953 armistice, with Pyongyang now renouncing reunification and expanding its nuclear arsenal while Seoul pursues cautious re-engagement.",
    coordinates: [127.0, 38.3],
    page: "conflicts/korea.html",
    content: "content/korea.md"
  },
  {
    id: "kashmir",
    title: "Kashmir Dispute",
    summary: "India and Pakistan have contested the former princely state of Kashmir since 1947 partition, each administering part of it while claiming all of it, with a Kashmiri self-determination movement pressing a third, distinct claim.",
    coordinates: [76.5, 34.0],
    page: "conflicts/kashmir.html",
    content: "content/kashmir.md"
  },
  {
    id: "armenia-azerbaijan",
    title: "Armenia-Azerbaijan Conflict",
    summary: "Azerbaijan's 2023 offensive ended decades of conflict over Nagorno-Karabakh, displacing its ethnic Armenian population; Yerevan and Baku are now negotiating a bilateral peace treaty and border demarcation.",
    coordinates: [46.75, 39.9],
    page: "conflicts/armenia-azerbaijan.html",
    content: "content/armenia-azerbaijan.md"
  },
  {
    id: "iran-israel",
    title: "Iran-Israel Shadow War",
    summary: "Decades of covert confrontation between Iran and Israel became direct warfare in 2025-2026, including a February 2026 strike that killed Iran's Supreme Leader, leaving Iran's nuclear program's status and a durable settlement both unresolved.",
    coordinates: [51.4, 35.7],
    page: "conflicts/iran-israel.html",
    content: "content/iran-israel.md"
  },
  {
    id: "south-china-sea",
    title: "South China Sea Disputes",
    summary: "China's expansive maritime claims overlap with those of the Philippines, Vietnam, Malaysia and Brunei, producing recurring coast-guard confrontations despite a 2016 international tribunal ruling against China's legal basis.",
    coordinates: [114.0, 12.0],
    page: "conflicts/south-china-sea.html",
    content: "content/south-china-sea.md"
  },
  {
    id: "venezuela",
    title: "Venezuela Crisis",
    summary: "Venezuela's disputed 2024 election, US sanctions and drug-trafficking allegations, and a long-running Essequibo territorial claim against Guyana culminated in a January 2026 US military operation that captured President Maduro, leaving Vice President Delcy Rodríguez as acting president.",
    coordinates: [-66.9, 10.5],
    page: "conflicts/venezuela.html",
    content: "content/venezuela.md"
  },
  {
    id: "western-sahara",
    title: "Western Sahara",
    summary: "Morocco and the Algeria-backed Polisario Front have disputed sovereignty over Western Sahara since 1975; a 1991 UN ceasefire and promised referendum stalled for decades, and in 2025 the UN Security Council backed Morocco's autonomy plan as the basis for talks.",
    coordinates: [-12.5, 24.5],
    page: "conflicts/western-sahara.html",
    content: "content/western-sahara.md"
  },
  {
    id: "cyprus",
    title: "Cyprus Dispute",
    summary: "The island has been divided since Turkey's 1974 intervention, with a UN buffer zone separating the internationally recognized south from the Turkish-backed north; reunification talks remain stalled after decades of failed negotiations.",
    coordinates: [33.3, 35.1],
    page: "conflicts/cyprus.html",
    content: "content/cyprus.md"
  }
];
