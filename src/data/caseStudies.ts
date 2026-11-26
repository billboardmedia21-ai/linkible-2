export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  summary: string;
  timeline: string;
  challenge: string;
  approach: string[];
  outcome: string;
  results: { value: string; label: string }[];
  quote?: { text: string; name: string; role: string };
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "techflow-saas",
    client: "TechFlow",
    industry: "B2B Software",
    summary:
      "A B2B SaaS platform stuck on page five for its category term, competing against incumbents with ten-year-old domains.",
    timeline: "6-month campaign",
    challenge:
      "TechFlow had strong product-led content but almost no editorial backlinks. Their three main competitors each held between 400 and 900 referring domains; TechFlow had 61. Every commercial term they cared about sat between position 38 and 61.",
    approach: [
      "Mapped the referring-domain gap page by page rather than at domain level, which showed the deficit was concentrated on six commercial pages",
      "Built a quarterly industry benchmark study that gave journalists a reason to cite them",
      "Ran parallel guest placement and HARO campaigns to build breadth while PR built authority",
      "Rebalanced anchors away from exact-match, which had been over-optimised by a previous vendor",
    ],
    outcome:
      "Within six months TechFlow moved from page five to page one for its primary category term and held it through two core updates. Organic traffic grew 347%, and the pipeline attributed to organic search supported a $2.4M ARR impact.",
    results: [
      { value: "347%", label: "Organic traffic growth" },
      { value: "Page 5 → 1", label: "Primary term ranking" },
      { value: "$2.4M", label: "ARR revenue impact" },
      { value: "6 months", label: "Time to result" },
    ],
    quote: {
      text: "The benchmark study alone still generates inbound links eighteen months later. That was the unlock.",
      name: "Dana Whitfield",
      role: "VP Marketing, TechFlow",
    },
    featured: true,
  },
  {
    slug: "meridian-property",
    client: "Meridian Property Group",
    industry: "Real Estate",
    summary:
      "A multi-office brokerage losing every suburb search to national portals with far larger domains.",
    timeline: "9-month campaign",
    challenge:
      "Meridian ranked well for its brand but nowhere for the eleven suburb terms that drove the majority of buyer enquiries. National aggregators occupied the top four positions in every market.",
    approach: [
      "Built a separate prospect pool per suburb rather than treating it as one national campaign",
      "Commissioned quarterly local market data reports pitched to regional papers",
      "Deep-linked every placement into the relevant location page, not the homepage",
      "Layered in relocation, mortgage and interiors publications for topical breadth",
    ],
    outcome:
      "Nine of eleven suburb pages reached the top three. Enquiry volume from organic search more than doubled, and cost per enquiry fell by 61% against their paid baseline.",
    results: [
      { value: "9 of 11", label: "Suburb pages in top 3" },
      { value: "112%", label: "Organic enquiry growth" },
      { value: "-61%", label: "Cost per enquiry" },
      { value: "84", label: "Local links built" },
    ],
    quote: {
      text: "We stopped bidding on our own suburb names. That saved more than the retainer cost.",
      name: "Priya Anand",
      role: "Marketing Director, Meridian",
    },
  },
  {
    slug: "vantage-health",
    client: "Vantage Health",
    industry: "Healthcare",
    summary:
      "A telehealth provider recovering visibility after a core update wiped out two thirds of its organic traffic.",
    timeline: "8-month campaign",
    challenge:
      "A helpful-content update removed 64% of Vantage's organic traffic overnight. Audit showed thin author signals, no medical review process, and a backlink profile weighted toward low-trust directories.",
    approach: [
      "Disavowed nothing — instead built trust-side weight through clinically reviewed content",
      "Established named clinician authors with verifiable credentials and consistent entity signals",
      "Earned placements exclusively on health publications with visible editorial policies and named medical reviewers",
      "Secured expert commentary slots for their clinicians in national health coverage",
    ],
    outcome:
      "Traffic recovered to 118% of pre-update levels by month eight and continued growing through the following core update, which is the harder test.",
    results: [
      { value: "118%", label: "Of pre-update traffic" },
      { value: "41", label: "YMYL-safe links" },
      { value: "2", label: "Core updates survived" },
      { value: "8 months", label: "To full recovery" },
    ],
  },
  {
    slug: "atlas-outdoor",
    client: "Atlas Outdoor",
    industry: "Ecommerce",
    summary:
      "A seasonal outdoor retailer needing category authority in place before peak buying season opened.",
    timeline: "5-month campaign",
    challenge:
      "Atlas earned 71% of annual revenue in a fourteen-week window. Their category pages had never ranked above position twelve, meaning peak season was funded almost entirely by paid media.",
    approach: [
      "Front-loaded the campaign four months ahead of season so authority matured before demand arrived",
      "Built gear comparison and trail data content designed for outdoor publication pickup",
      "Prioritised deep links into category pages over homepage links",
      "Ran a newsjacking desk through the first six weeks of season",
    ],
    outcome:
      "Six category pages entered the top five before peak season opened. Organic revenue during the window rose 214% year on year while paid spend fell 30%.",
    results: [
      { value: "214%", label: "Peak organic revenue" },
      { value: "-30%", label: "Paid media spend" },
      { value: "6", label: "Categories in top 5" },
      { value: "5 months", label: "Campaign length" },
    ],
    quote: {
      text: "The timing advice was worth as much as the links. Starting in January instead of April changed the whole season.",
      name: "Tom Iverson",
      role: "Ecommerce Lead, Atlas Outdoor",
    },
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
