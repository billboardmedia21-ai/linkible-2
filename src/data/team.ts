export type Member = {
  id: string;
  name: string;
  role: string;
  email: string;
  location: string;
  since: string;
  focus: string;
};

export const team: Member[] = [
  { id: "LNK-0114", name: "Amara Osei", role: "Head of Outreach", email: "amara@linkible.io", location: "North Sydney, AU", since: "2021", focus: "Publisher relationships, negotiation" },
  { id: "LNK-0207", name: "Daniel Whitcombe", role: "Lead Strategist", email: "daniel@linkible.io", location: "London, UK", since: "2021", focus: "Gap analysis, anchor modelling" },
  { id: "LNK-0233", name: "Priya Raghunathan", role: "Digital PR Director", email: "priya@linkible.io", location: "Bengaluru, IN", since: "2022", focus: "Data stories, tier-one pitching" },
  { id: "LNK-0311", name: "Marco Bellini", role: "European Outreach Lead", email: "marco@linkible.io", location: "Milan, IT", since: "2022", focus: "EU markets, native-language campaigns" },
  { id: "LNK-0402", name: "Sofia Marquez", role: "Content Lead", email: "sofia@linkible.io", location: "Madrid, ES", since: "2023", focus: "Editorial standards, writer management" },
  { id: "LNK-0455", name: "James Okonkwo", role: "Account Director", email: "james@linkible.io", location: "Toronto, CA", since: "2023", focus: "Enterprise and agency accounts" },
  { id: "LNK-0518", name: "Hana Brenner", role: "DACH Market Lead", email: "hana@linkible.io", location: "Berlin, DE", since: "2024", focus: "German-language PR and outreach" },
  { id: "LNK-0602", name: "Tom Ashworth", role: "Technical SEO Lead", email: "tom@linkible.io", location: "Manchester, UK", since: "2024", focus: "Audits, hreflang, recovery" },
];

export const values = [
  {
    title: "Tell clients the uncomfortable thing",
    body: "If the data says you need less than you planned to buy, we say so. Short-term revenue is a bad trade for a reputation built over three hundred campaigns.",
  },
  {
    title: "Show the work before the invoice",
    body: "Every prospect is visible before outreach. Every placement is logged with its anchor and authority. There is no report that exists only after money has moved.",
  },
  {
    title: "Build links you could show anyone",
    body: "The test for every placement is whether a client could show it to their board, their lawyer or a Google engineer without flinching.",
  },
  {
    title: "Respect the publisher",
    body: "Editors are not a resource to be extracted from. The relationships that make this work take years and are worth protecting.",
  },
];

export const milestones = [
  { year: "2021", title: "Founded in North Sydney", body: "Two outreach specialists and a spreadsheet of publisher contacts." },
  { year: "2022", title: "First 100 campaigns", body: "Expanded into European markets with native-language outreach." },
  { year: "2023", title: "Digital PR desk launched", body: "Added original data studies and tier-one media pitching." },
  { year: "2024", title: "Agency partner programme", body: "White-label fulfilment for over 40 partner agencies." },
  { year: "2026", title: "1,200+ placements", body: "Eight markets, four continents, zero manual actions." },
];
