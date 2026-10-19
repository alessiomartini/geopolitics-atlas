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
  { id: "bbc", name: "BBC News", url: "https://www.bbc.com/news", domains: ["feeds.bbci.co.uk"], tier: "A", sourceType: "secondary", notes: "Publicly funded, editorially independent of the UK government." },
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
  { id: "cnn", name: "CNN", url: "https://www.cnn.com", tier: "B", sourceType: "secondary" },
  { id: "nbcnews", name: "NBC News", url: "https://www.nbcnews.com", tier: "B", sourceType: "secondary" },
  { id: "cbsnews", name: "CBS News", url: "https://www.cbsnews.com", tier: "B", sourceType: "secondary" },
  { id: "pbs", name: "PBS NewsHour", url: "https://www.pbs.org/newshour", tier: "B", sourceType: "secondary", notes: "Publicly funded (†), editorially independent." },
  { id: "euronews", name: "Euronews", url: "https://www.euronews.com", tier: "B", sourceType: "secondary" },
  { id: "bloomberg", name: "Bloomberg", url: "https://www.bloomberg.com", tier: "B", sourceType: "secondary" },
  { id: "cnbc", name: "CNBC", url: "https://www.cnbc.com", tier: "B", sourceType: "secondary" },
  { id: "theglobeandmail", name: "The Globe and Mail", url: "https://www.theglobeandmail.com", tier: "B", sourceType: "secondary" },
  { id: "thehill", name: "The Hill", url: "https://thehill.com", tier: "B", sourceType: "secondary", notes: "US political outlet; strongest on US domestic politics." },
  { id: "foreignpolicy", name: "Foreign Policy", url: "https://foreignpolicy.com", tier: "B", sourceType: "secondary" },
  { id: "thediplomat", name: "The Diplomat", url: "https://thediplomat.com", tier: "B", sourceType: "secondary", notes: "Asia-Pacific affairs magazine." },
  { id: "theconversation", name: "The Conversation", url: "https://theconversation.com", tier: "B", sourceType: "secondary", notes: "Articles written by academics; attribute to the named author." },
  { id: "britannica", name: "Encyclopaedia Britannica", url: "https://www.britannica.com", tier: "B", sourceType: "tertiary", notes: "Encyclopedic background; not for contested or fast-moving facts." },
  { id: "sahistory", name: "South African History Online", url: "https://sahistory.org.za", tier: "B", sourceType: "tertiary", notes: "Background history compilation; cross-check recent claims." },
  { id: "allafrica", name: "AllAfrica", url: "https://allafrica.com", tier: "B", sourceType: "secondary", notes: "Aggregator of African outlets; check the original publisher of each story." },
  { id: "middleeasteye", name: "Middle East Eye", url: "https://www.middleeasteye.net", tier: "B", sourceType: "secondary", notes: "Independent outlet with a documented editorial stance on Middle East politics; treat with added scrutiny." },
  { id: "eurasianet", name: "Eurasianet", url: "https://eurasianet.org", tier: "B", sourceType: "secondary", notes: "Regional outlet (Caucasus, Central Asia)." },
  { id: "caspiannews", name: "Caspian News", url: "https://caspiannews.com", tier: "B", sourceType: "secondary", notes: "Azerbaijan-based outlet; treat coverage involving Azerbaijan with added scrutiny." },
  { id: "cyprus-mail", name: "Cyprus Mail", url: "https://cyprus-mail.com", tier: "B", sourceType: "secondary", notes: "Cyprus-based outlet; opinion pieces are attributed to their authors." },
  { id: "neoskosmos", name: "Neos Kosmos", url: "https://neoskosmos.com", tier: "B", sourceType: "secondary", notes: "Greek-diaspora outlet; relevant to Cyprus coverage with added scrutiny." },
  { id: "dawan-africa", name: "Dawan Africa", url: "https://www.dawan.africa", tier: "B", sourceType: "secondary", notes: "Regional outlet; cross-check with a Tier A/B source." },
  { id: "thenewhumanitarian", name: "The New Humanitarian", url: "https://www.thenewhumanitarian.org", tier: "B", sourceType: "secondary", notes: "Independent humanitarian-affairs journalism." },

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
  { id: "un", name: "United Nations (UN News, press and country offices)", url: "https://www.un.org", tier: "C", sourceType: "primary", notes: "UN News, press.un.org and country-office pages; UN bodies are not neutral parties in every conflict, so attribute to the specific body." },
  { id: "ohchr", name: "UN Human Rights Office (OHCHR)", url: "https://www.ohchr.org", tier: "C", sourceType: "primary" },
  { id: "lancet", name: "The Lancet", url: "https://www.thelancet.com", tier: "C", sourceType: "primary", notes: "Peer-reviewed medical journal; cite the specific study and its method." },
  { id: "acaps", name: "ACAPS", url: "https://www.acaps.org", tier: "C", sourceType: "secondary" },
  { id: "securitycouncilreport", name: "Security Council Report", url: "https://www.securitycouncilreport.org", tier: "C", sourceType: "secondary", notes: "Independent non-profit tracking UN Security Council work." },
  { id: "icij", name: "ICIJ (International Consortium of Investigative Journalists)", url: "https://www.icij.org", tier: "C", sourceType: "secondary", notes: "Investigative consortium working from leaked documents; cite the specific investigation." },
  { id: "euaa", name: "EU Agency for Asylum (EUAA)", url: "https://www.euaa.europa.eu", tier: "C", sourceType: "secondary", notes: "Country-of-origin information compilations." },
  { id: "insightcrime", name: "InSight Crime", url: "https://insightcrime.org", tier: "C", sourceType: "secondary", notes: "Think tank/investigative outlet on organized crime." },
  { id: "criticalthreats", name: "Critical Threats (AEI)", url: "https://www.criticalthreats.org", tier: "C", sourceType: "secondary", notes: "Think tank with a US security-policy orientation." },
  { id: "brookings", name: "Brookings Institution", url: "https://www.brookings.edu", tier: "C", sourceType: "secondary", notes: "Think tank; attribute analysis to the named author." },
  { id: "cfr", name: "Council on Foreign Relations", url: "https://www.cfr.org", tier: "C", sourceType: "secondary", notes: "US think tank; attribute analysis to the named author." },
  { id: "africacenter", name: "Africa Center for Strategic Studies", url: "https://africacenter.org", tier: "C", sourceType: "secondary", notes: "US Department of Defense academic institution; official-adjacent, attribute analysis." },
  { id: "cacianalyst", name: "CACI Analyst", url: "https://www.cacianalyst.org", tier: "C", sourceType: "secondary", notes: "Central Asia-Caucasus think-tank journal; attribute to the named author." },
  { id: "ctc-westpoint", name: "Combating Terrorism Center at West Point", url: "https://ctc.westpoint.edu", tier: "C", sourceType: "secondary", notes: "US Military Academy research center; official-adjacent, attribute analysis." },
  { id: "fdd", name: "Foundation for Defense of Democracies (FDD)", url: "https://www.fdd.org", tier: "C", sourceType: "secondary", notes: "Advocacy think tank with an explicit policy position; attribute by name, never alone for contested facts." },

  // --- Tier D (representative examples; cite the specific official page used) ---
  { id: "icj", name: "International Court of Justice (ICJ)", url: "https://www.icj-cij.org", tier: "D", sourceType: "primary", notes: "Quasi-independent judicial body; rulings carry more neutral weight than a single state's statement." },
  { id: "icc", name: "International Criminal Court (ICC)", url: "https://www.icc-cpi.int", tier: "D", sourceType: "primary", notes: "Quasi-independent judicial body; same caveat as ICJ." },
  { id: "gov-generic", name: "National ministries / official statements (generic category)", url: "", tier: "D", sourceType: "primary", notes: "Cite the specific ministry/agency page. Always an involved party for conflicts concerning that state." },
  { id: "dhs", name: "US Department of Homeland Security", url: "https://www.dhs.gov", tier: "D", sourceType: "primary", notes: "Official US government statement; an involved party where US policy is concerned." },
  { id: "uk-commons-library", name: "UK House of Commons Library", url: "https://commonslibrary.parliament.uk", tier: "D", sourceType: "secondary", notes: "Non-partisan research briefings for UK Parliament." },
  { id: "crs", name: "Congressional Research Service (via EveryCRSReport)", url: "https://www.everycrsreport.com", tier: "D", sourceType: "secondary", notes: "Mirror of US Congressional Research Service reports; check the date of each report." },
  { id: "pca", name: "Permanent Court of Arbitration (case documents)", url: "https://pcacases.com", tier: "D", sourceType: "primary", notes: "Arbitral tribunal documents; quasi-independent, same caveat as ICJ." },
  { id: "mofa-pk", name: "Ministry of Foreign Affairs of Pakistan", url: "https://mofa.gov.pk", tier: "D", sourceType: "primary", notes: "Official statements; involved party." },
  { id: "mfa-cn", name: "Ministry of Foreign Affairs of China", url: "https://www.mfa.gov.cn", tier: "D", sourceType: "primary", notes: "Official statements; involved party." },
  { id: "china-embassy", name: "Embassies of China (embassy sites)", url: "https://id.china-embassy.gov.cn", tier: "D", sourceType: "primary", notes: "Official statements of the Chinese state; involved party." },

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
