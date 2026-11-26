import type { DetailPage } from "./types";

type CountrySeed = {
  slug: string;
  country: string;
  demonym: string;
  market: string;
  publications: string[];
  languages: string;
  stats: { value: string; label: string }[];
  note: string;
};

const seeds: CountrySeed[] = [
  {
    slug: "link-building-usa",
    country: "USA",
    demonym: "American",
    market:
      "the most competitive search market on earth, where national SERPs are dominated by publishers with two decades of accumulated authority",
    publications: ["national news desks", "trade publications", "regional metros", "vertical media"],
    languages: "US English, with regional tone adaptation",
    stats: [
      { value: "50", label: "States covered" },
      { value: "DR 50-90", label: "Placement range" },
      { value: "Local + national", label: "Dual strategy" },
    ],
    note: "In the US we run national authority and metro-level local campaigns in parallel, because ranking in Chicago and ranking nationally are two different problems.",
  },
  {
    slug: "link-building-uk",
    country: "UK",
    demonym: "British",
    market:
      "a market where a handful of national titles set the agenda and regional press still carries genuine local weight",
    publications: ["national broadsheets", "regional press", "trade titles", "consumer magazines"],
    languages: "British English, with regional idiom",
    stats: [
      { value: "Tier 1", label: "National press reach" },
      { value: "DR 55-90", label: "Placement range" },
      { value: "Regional", label: "Local press network" },
    ],
    note: "UK digital PR rewards a strong data hook. National desks receive hundreds of pitches a day and publish the ones with a number they can headline.",
  },
  {
    slug: "link-building-australia",
    country: "Australia",
    demonym: "Australian",
    market:
      "a concentrated market where a small number of publishers reach almost everyone, making relationships disproportionately valuable",
    publications: ["metro dailies", "industry press", "lifestyle media", "state publications"],
    languages: "Australian English",
    stats: [
      { value: "Local team", label: "Sydney-based" },
      { value: "DR 45-85", label: "Placement range" },
      { value: "AEST", label: "In-market hours" },
    ],
    note: "Our team sits in North Sydney, so Australian outreach runs in local hours with journalists we know personally.",
  },
  {
    slug: "link-building-canada",
    country: "Canada",
    demonym: "Canadian",
    market:
      "a bilingual market where English and French campaigns need genuinely separate strategies, not a shared one translated twice",
    publications: ["national dailies", "provincial press", "French-language media", "business titles"],
    languages: "Canadian English and Quebec French",
    stats: [
      { value: "EN + FR", label: "Bilingual outreach" },
      { value: "DR 45-85", label: "Placement range" },
      { value: "10", label: "Provinces covered" },
    ],
    note: "Quebec is effectively its own market. We pitch it in French with writers based there, rather than translating an Ontario angle.",
  },
  {
    slug: "backlink-building-europe",
    country: "Europe",
    demonym: "European",
    market:
      "a set of distinct national markets that reward coordinated, sequenced launches rather than one pan-European blast",
    publications: ["pan-European business media", "national press", "regional trade titles"],
    languages: "All major European languages via native writers",
    stats: [
      { value: "15+", label: "Markets covered" },
      { value: "Native", label: "In-market writers" },
      { value: "Sequenced", label: "Multi-market launch" },
    ],
    note: "We sequence European launches so pickup in one market becomes the credibility hook for the pitch in the next.",
  },
  {
    slug: "link-building-germany",
    country: "Germany",
    demonym: "German",
    market:
      "a market with exacting editorial standards where thoroughness and verifiable sourcing matter more than pitch volume",
    publications: ["national business press", "Fachmedien trade titles", "regional dailies"],
    languages: "German, written by native journalists",
    stats: [
      { value: "DACH", label: "DE, AT, CH reach" },
      { value: "DR 45-85", label: "Placement range" },
      { value: "Native", label: "German writers" },
    ],
    note: "German editors check sources. Campaigns here need methodology you can defend, which is why we document every dataset in full.",
  },
  {
    slug: "link-building-spain",
    country: "Spain",
    demonym: "Spanish",
    market:
      "a relationship-driven media landscape where a warm introduction consistently outperforms a cold pitch",
    publications: ["national dailies", "regional press", "vertical digital media"],
    languages: "Castilian Spanish, with regional sensitivity",
    stats: [
      { value: "ES + LATAM", label: "Spanish-language reach" },
      { value: "DR 40-80", label: "Placement range" },
      { value: "Native", label: "Madrid-based writers" },
    ],
    note: "Spanish campaigns often unlock Latin American syndication for free, which we plan for rather than treat as a bonus.",
  },
  {
    slug: "link-building-italy",
    country: "Italy",
    demonym: "Italian",
    market:
      "a market with strong regional identity where national and local press serve genuinely different audiences",
    publications: ["national dailies", "regional titles", "specialist verticals"],
    languages: "Italian, written by native journalists",
    stats: [
      { value: "20", label: "Regions covered" },
      { value: "DR 40-80", label: "Placement range" },
      { value: "Native", label: "Italian writers" },
    ],
    note: "Regional pride is a live editorial angle in Italy. A city-level data cut routinely outperforms the national number.",
  },
  {
    slug: "portugal-link-building-services",
    country: "Portugal",
    demonym: "Portuguese",
    market:
      "a compact, under-served market where well-executed campaigns face far less competition than in larger territories",
    publications: ["national press", "business media", "digital verticals"],
    languages: "European Portuguese, distinct from Brazilian",
    stats: [
      { value: "Low", label: "Competition level" },
      { value: "DR 35-75", label: "Placement range" },
      { value: "PT-PT", label: "European Portuguese" },
    ],
    note: "European Portuguese is not Brazilian Portuguese. Using the wrong variant is the fastest way to lose an editor's attention.",
  },
  {
    slug: "link-building-services-france",
    country: "France",
    demonym: "French",
    market:
      "a market with a strong preference for French-language sources and a media culture that values editorial independence",
    publications: ["national press", "business titles", "specialist media"],
    languages: "French, written by native journalists",
    stats: [
      { value: "FR", label: "Native-only outreach" },
      { value: "DR 45-85", label: "Placement range" },
      { value: "Paris", label: "In-market contacts" },
    ],
    note: "English-language pitches are usually ignored in France. Everything we send is written in French by a French writer.",
  },
  {
    slug: "backlink-building-new-zealand",
    country: "New Zealand",
    demonym: "New Zealand",
    market:
      "a small, tight-knit media market where quality relationships give outsized reach relative to population",
    publications: ["national news", "regional press", "industry media"],
    languages: "New Zealand English",
    stats: [
      { value: "NZ-wide", label: "National coverage" },
      { value: "DR 35-75", label: "Placement range" },
      { value: "NZST", label: "In-market hours" },
    ],
    note: "New Zealand rewards genuine local relevance. Recycled Australian angles are spotted immediately and passed over.",
  },
  {
    slug: "link-building-services-india",
    country: "India",
    demonym: "Indian",
    market:
      "an enormous, fast-growing market with high media volume where quality screening matters more than anywhere else",
    publications: ["national English dailies", "business media", "regional language press", "tech verticals"],
    languages: "Indian English, with regional language capability",
    stats: [
      { value: "High", label: "Media volume" },
      { value: "DR 40-85", label: "Placement range" },
      { value: "Screened", label: "Strict site vetting" },
    ],
    note: "India has enormous publishing volume and a correspondingly large share of low-quality sites. Our screening is deliberately strict here.",
  },
  {
    slug: "link-building-services-switzerland",
    country: "Switzerland",
    demonym: "Swiss",
    market:
      "a trilingual, high-value market where precision and discretion carry more weight than reach",
    publications: ["German-language press", "French-language media", "business and finance titles"],
    languages: "Swiss German, French and Italian",
    stats: [
      { value: "3", label: "Language regions" },
      { value: "DR 45-85", label: "Placement range" },
      { value: "Premium", label: "High-value market" },
    ],
    note: "Switzerland is three markets in one country. We run separate German, French and Italian campaigns rather than a single national one.",
  },
];

export const countries: DetailPage[] = seeds.map((s) => ({
  slug: s.slug,
  name: `Link Building ${s.country}`,
  eyebrow: `${s.country} market`,
  title: `Link Building Services In ${s.country}`,
  intro: `${s.country} is ${s.market}. We build links from ${s.demonym} domains, pitched in ${s.languages}, so your pages earn the in-market relevance signals regional rankings depend on.`,
  heroStats: s.stats,
  highlights: [
    {
      title: "In-market domains",
      body: `Placements on ${s.publications.slice(0, 3).join(", ")} that Google already associates with ${s.country}.`,
    },
    {
      title: "Native-language outreach",
      body: `Every pitch written in ${s.languages} by someone who reads the ${s.demonym} press daily.`,
    },
    {
      title: "Local relevance signals",
      body: `Anchor, entity and geographic signals aligned to how ${s.demonym} searchers actually phrase queries.`,
    },
  ],
  deliverables: [
    `${s.country} competitor backlink gap analysis`,
    `Prospecting across ${s.publications.join(", ")}`,
    "Native-language content production",
    "Personalised in-market journalist and editor outreach",
    "Localised anchor text planning",
    `${s.country}-segmented ranking and traffic reporting`,
  ],
  processNote: s.note,
  faqs: [
    {
      q: `Do I need ${s.country}-based links to rank in ${s.country}?`,
      a: `For competitive terms, yes. In-market links are one of the strongest regional relevance signals available, and they are hard for competitors to replicate quickly.`,
    },
    {
      q: `Is content written in ${s.languages}?`,
      a: `Yes, by native writers. We do not run machine translation past a proofreader and call it localisation.`,
    },
    {
      q: `Can you combine ${s.country} with other markets?`,
      a: `Yes. Multi-market campaigns share research and assets, which usually lowers the per-market cost meaningfully.`,
    },
  ],
}));

export const getCountry = (slug: string) => countries.find((c) => c.slug === slug);
