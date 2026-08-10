/**
 * Source reliability framework used across all conflict pages.
 *
 * Two independent axes are applied to every citation used in content/*.md:
 *
 * 1. TIER (this file's main grouping) — editorial reliability, roughly:
 *    how rigorous is this outlet's fact-checking/correction culture, and
 *    how editorially independent is it from any party to a given conflict.
 *
 * 2. sourceType — epistemological distance from the event:
 *    - "primary":   original material (treaties, official statements,
 *                   court/tribunal rulings, satellite imagery, raw
 *                   datasets, first-hand on-scene reporting)
 *    - "secondary": analysis/interpretation of primary material (most
 *                   news journalism, think-tank analysis)
 *    - "tertiary":  compilations of secondary material (encyclopedic
 *                   overviews, background explainers)
 *    - "quaternary":indexes/reviews of tertiary material (literature
 *                   reviews, meta-analyses) — rarely cited directly here
 *
 * A third property, independence, is NOT fixed globally: whether a given
 * outlet counts as "third-party" or "involved" depends on which conflict
 * is being covered (e.g. a national broadcaster is third-party for a
 * conflict on the other side of the world, but an involved party for a
 * conflict its own government is fighting). Per-citation attribution in
 * the content itself is what carries that distinction — see SOURCES.md
 * for the citation rules.
 */

const SOURCE_TIERS = [
  {
    id: "A",
    label: "Tier A — Wire Services & Major International Broadcasters",
    description:
      "Highest editorial reliability: dedicated correction desks, direct " +
      "wire reporting from the ground, minimal reliance on unverified " +
      "secondhand claims. Default choice for verifying high-stakes facts."
  },
  {
    id: "B",
    label: "Tier B — Major Independent Newspapers & Broadcasters",
    description:
      "Rigorous editorial standards and bylines, but some outlets carry " +
      "documented institutional leanings on specific topics — noted per " +
      "source below. Publicly funded broadcasters here (marked †) are " +
      "editorially independent of their funding government, unlike Tier E."
  },
  {
    id: "C",
    label: "Tier C — International Organizations, Monitors & Data Bodies",
    description:
      "Methodologically transparent, primary-adjacent sources. Preferred " +
      "for casualty figures, displacement counts, ceasefire-violation " +
      "tracking, and famine/food-security classifications."
  },
  {
    id: "D",
    label: "Tier D — Government & Official Institutional Sources",
    description:
      "Primary sources, but involved parties. Used to represent an " +
      "official position accurately — never, alone, to establish a " +
      "contested fact. Judicial bodies (ICJ, ICC) are the exception: " +
      "quasi-independent rulings carry more neutral weight than a single " +
      "state's ministry statement."
  },
  {
    id: "E",
    label: "Tier E — State-Controlled & Heavily Partisan Media",
    description:
      "Evidence of that side's narrative ONLY. Always attributed " +
      "explicitly inline (e.g. \"Moscow, TASS\"); never used to verify a " +
      "fact on its own, and never presented unattributed."
  }
];

const SOURCES = [
  // --- Tier A ---
  { id: "reuters", name: "Reuters", url: "https://www.reuters.com", tier: "A", sourceType: "secondary" },
  { id: "ap", name: "Associated Press (AP News)", url: "https://apnews.com", tier: "A", sourceType: "secondary" },
  { id: "afp", name: "Agence France-Presse (AFP)", url: "https://www.afp.com", tier: "A", sourceType: "secondary" },
  { id: "bbc", name: "BBC News", url: "https://www.bbc.com/news", tier: "A", sourceType: "secondary", notes: "Publicly funded, editorially independent of the UK government." },
  { id: "kyodo", name: "Kyodo News", url: "https://english.kyodonews.net", tier: "A", sourceType: "secondary" },

  // --- Tier B ---
  { id: "nyt", name: "The New York Times", url: "https://www.nytimes.com", tier: "B", sourceType: "secondary" },
  { id: "wapo", name: "The Washington Post", url: "https://www.washingtonpost.com", tier: "B", sourceType: "secondary" },
  { id: "guardian", name: "The Guardian", url: "https://www.theguardian.com", tier: "B", sourceType: "secondary" },
  { id: "wsj", name: "The Wall Street Journal", url: "https://www.wsj.com", tier: "B", sourceType: "secondary" },
  { id: "ft", name: "Financial Times", url: "https://www.ft.com", tier: "B", sourceType: "secondary" },
  { id: "economist", name: "The Economist", url: "https://www.economist.com", tier: "B", sourceType: "secondary" },
  { id: "lemonde", name: "Le Monde", url: "https://www.lemonde.fr", tier: "B", sourceType: "secondary" },
  { id: "spiegel", name: "Der Spiegel", url: "https://www.spiegel.de", tier: "B", sourceType: "secondary" },
  { id: "npr", name: "NPR", url: "https://www.npr.org", tier: "B", sourceType: "secondary", notes: "Publicly funded (†), editorially independent." },
  { id: "dw", name: "DW (Deutsche Welle)", url: "https://www.dw.com", tier: "B", sourceType: "secondary", notes: "German public international broadcaster (†), editorially independent." },
  { id: "france24", name: "France 24", url: "https://www.france24.com", tier: "B", sourceType: "secondary", notes: "French public international broadcaster (†), editorially independent." },
  { id: "aljazeera", name: "Al Jazeera English", url: "https://www.aljazeera.com", tier: "B", sourceType: "secondary", notes: "Qatar state-funded (†); treat coverage directly involving Qatar or Gulf politics with added scrutiny." },

  // --- Tier C ---
  { id: "ocha", name: "UN OCHA / ReliefWeb", url: "https://www.unocha.org", tier: "C", sourceType: "primary" },
  { id: "unhcr", name: "UNHCR", url: "https://www.unhcr.org", tier: "C", sourceType: "primary" },
  { id: "icrc", name: "ICRC", url: "https://www.icrc.org", tier: "C", sourceType: "primary" },
  { id: "who", name: "World Health Organization (WHO)", url: "https://www.who.int", tier: "C", sourceType: "primary" },
  { id: "acled", name: "ACLED (Armed Conflict Location & Event Data)", url: "https://acleddata.com", tier: "C", sourceType: "primary" },
  { id: "ucdp", name: "Uppsala Conflict Data Program (UCDP)", url: "https://ucdp.uu.se", tier: "C", sourceType: "primary" },
  { id: "crisisgroup", name: "International Crisis Group", url: "https://www.crisisgroup.org", tier: "C", sourceType: "secondary" },
  { id: "hrw", name: "Human Rights Watch", url: "https://www.hrw.org", tier: "C", sourceType: "secondary", notes: "Advocacy NGO; methodologically rigorous but publishes with an explicit human-rights mandate." },
  { id: "amnesty", name: "Amnesty International", url: "https://www.amnesty.org", tier: "C", sourceType: "secondary", notes: "Advocacy NGO; same caveat as HRW." },
  { id: "ipc", name: "IPC (Integrated Food Security Phase Classification)", url: "https://www.ipcinfo.org", tier: "C", sourceType: "primary" },

  // --- Tier D (representative examples; cite the specific official page used) ---
  { id: "icj", name: "International Court of Justice (ICJ)", url: "https://www.icj-cij.org", tier: "D", sourceType: "primary", notes: "Quasi-independent judicial body; rulings carry more neutral weight than a single state's statement." },
  { id: "icc", name: "International Criminal Court (ICC)", url: "https://www.icc-cpi.int", tier: "D", sourceType: "primary", notes: "Quasi-independent judicial body; same caveat as ICJ." },
  { id: "gov-generic", name: "National ministries / official statements (generic category)", url: "", tier: "D", sourceType: "primary", notes: "Cite the specific ministry/agency page. Always an involved party for conflicts concerning that state." },

  // --- Tier E ---
  { id: "rt", name: "RT", url: "https://www.rt.com", tier: "E", sourceType: "primary", notes: "Russian state media." },
  { id: "tass", name: "TASS", url: "https://tass.com", tier: "E", sourceType: "primary", notes: "Russian state news agency." },
  { id: "cgtn", name: "CGTN", url: "https://www.cgtn.com", tier: "E", sourceType: "primary", notes: "Chinese state media." },
  { id: "xinhua", name: "Xinhua", url: "https://english.news.cn", tier: "E", sourceType: "primary", notes: "Chinese state news agency." },
  { id: "globaltimes", name: "Global Times", url: "https://www.globaltimes.cn", tier: "E", sourceType: "primary", notes: "Chinese state-affiliated outlet." },
  { id: "presstv", name: "Press TV", url: "https://www.presstv.ir", tier: "E", sourceType: "primary", notes: "Iranian state media." },
  { id: "almayadeen", name: "Al Mayadeen", url: "https://english.almayadeen.net", tier: "E", sourceType: "primary", notes: "Lebanon-based, Iran/Hezbollah-aligned." },
  { id: "faction-generic", name: "Non-state faction communiqués (generic category)", url: "", tier: "E", sourceType: "primary", notes: "Cite the specific outlet/statement used (e.g. a named ministry run by a de facto authority, or a named armed group's press office)." }
];
