export type Plan = {
  name: string;
  price: number;
  tagline: string;
  links: string;
  dr: string;
  popular?: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    name: "Basic",
    price: 1499,
    tagline: "For new sites establishing a first authority base.",
    links: "6–8 links",
    dr: "DR 20–50",
    features: [
      "6–8 do-follow contextual editorial backlinks",
      "Domains rated DR 20–50",
      "One target keyword and URL",
      "100% manual outreach",
      "500-word content per placement",
      "Natural anchor text distribution",
      "Permanent placements",
      "Monthly reporting dashboard",
    ],
  },
  {
    name: "Startup",
    price: 3499,
    tagline: "For growing sites that need authority, not just volume.",
    links: "6–8 links",
    dr: "DR 40–90+",
    features: [
      "6–8 do-follow authority backlinks",
      "Domains rated DR 40–90+",
      "Pre-outreach planning session",
      "Competitor backlink gap review",
      "500-word editorial content",
      "Mixed anchor text strategy",
      "Up to 3 target URLs",
      "Monthly reporting dashboard",
    ],
  },
  {
    name: "Growth",
    price: 7499,
    tagline: "Our most popular tier for serious ranking campaigns.",
    links: "15–20 links",
    dr: "DR 40–90+",
    popular: true,
    features: [
      "15–20 do-follow editorial backlinks",
      "Domains rated DR 40–90+",
      "Multi-page link strategy",
      "Full competitor analysis",
      "Keyword grouping and prioritisation",
      "1,000+ word content per placement",
      "Unlimited target URLs",
      "Comprehensive monthly reporting",
      "Dedicated account manager",
    ],
  },
  {
    name: "Pro",
    price: 13499,
    tagline: "Maximum velocity for competitive head terms.",
    links: "30–35 links",
    dr: "DR 40–90+",
    features: [
      "30–35 do-follow editorial backlinks",
      "Premium domains rated DR 40–90+",
      "Deep competitive intelligence",
      "Multi-URL and multi-keyword strategy",
      "1,200–1,500 word content per placement",
      "Dedicated strategist oversight",
      "Digital PR campaign included",
      "Full transparency reporting",
      "Weekly check-ins",
    ],
  },
];

export const pricingPillars = [
  {
    title: "100% Transparency",
    body: "Every prospect, every placement, every anchor — logged and visible before you are invoiced for it.",
  },
  {
    title: "Flexible Billing",
    body: "Month to month with no lock-in. Pause, scale or cancel with thirty days' notice.",
  },
  {
    title: "Dedicated Support",
    body: "A named strategist who knows your account, reachable on a channel you choose.",
  },
];

export const pricingFaqs = [
  {
    q: "Are there any hidden fees?",
    a: "No. The plan price covers prospecting, content, outreach, placement and reporting. The only additional cost is an optional original survey for digital PR campaigns, quoted separately and only with your approval.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. All plans are month to month with thirty days' notice. Work already in the outreach pipeline is completed and delivered.",
  },
  {
    q: "What if you can't deliver the agreed number of links?",
    a: "We roll the shortfall into the following month at no cost, or credit it, whichever you prefer. We do not pad a report with links that do not meet the agreed quality bar.",
  },
  {
    q: "Do you offer custom pricing?",
    a: "Yes, for volumes above the Pro tier, for agencies buying wholesale, and for campaigns with unusual requirements. Book a call and we will build a scope.",
  },
  {
    q: "How is quality actually measured?",
    a: "Organic traffic, traffic trend, topical relevance, outbound link patterns and editorial standards. Domain rating is a filter, never the whole picture.",
  },
  {
    q: "When do I see results?",
    a: "Early ranking movement typically appears between weeks six and ten. Meaningful traffic and revenue impact usually lands around month four.",
  },
];
