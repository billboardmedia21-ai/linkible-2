export const site = {
  name: "Linkible",
  tagline: "Powerful Link Building That Grows Your Rankings",
  description:
    "Boost your website's authority, outrank competitors, and drive targeted traffic with white-hat link building, digital PR and HARO placements.",
  url: "https://linkible.io",
  email: "contact@linkible.io",
  phone: "+61 483 988 821",
  phoneHref: "+61483988821",
  address: "Level 14, 275 Alfred St, North Sydney NSW 2060",
};

export const socials = [
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "X", href: "https://x.com", icon: "x" },
  { label: "Telegram", href: "https://telegram.org", icon: "telegram" },
];

export type NavChild = { label: string; href: string; blurb?: string };
export type NavItem = {
  label: string;
  href: string;
  columns?: { title: string; items: NavChild[] }[];
  featured?: { title: string; body: string; href: string; cta: string };
};

// Order and top-level labels match the live linkible.io nav exactly:
// Pricing · Resources ▾ · Blog · Contact · Industries ▾ · (Book a Call button)
export const mainNav: NavItem[] = [
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    href: "/blogs",
    columns: [
      {
        title: "Learn",
        items: [
          { label: "Case Studies", href: "/case-study", blurb: "Real campaigns, real numbers" },
          { label: "FAQs", href: "/faqs", blurb: "Everything clients ask us" },
        ],
      },
      {
        title: "Company",
        items: [
          { label: "Who We Are", href: "/about" },
          { label: "Verify Team", href: "/verify-team" },
          { label: "Terms & Conditions", href: "/terms" },
          { label: "Privacy Policy", href: "/privacy-policy" },
        ],
      },
    ],
  },
  { label: "Blog", href: "/blogs" },
  { label: "Contact", href: "/contact" },
  {
    label: "Industries",
    href: "/services",
    // Deliberately a single flat list, no column header, no featured
    // panel — matches the live site's compact Industries dropdown exactly.
    columns: [
      {
        title: "",
        items: [
          { label: "SaaS", href: "/services/saas-link-building-services" },
          { label: "Ecommerce", href: "/services/ecommerce-link-building-services" },
          {
            label: "Casino and Gambling",
            href: "/services/casino-gambling-link-building-services",
          },
          { label: "Law Firms", href: "/services/law-firms-link-building-services" },
          { label: "Cannabis and CBD", href: "/services/cannabis-cbd-link-building-services" },
          {
            label: "Banks and Financial Institutions",
            href: "/services/banks-financial-institutions-link-building-services",
          },
        ],
      },
    ],
  },
];

export const footerNav = [
  {
    title: "Company",
    links: [
      { label: "Who We Are", href: "/about" },
      { label: "Case Study", href: "/case-study" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blogs" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "FAQs", href: "/faqs" },
      { label: "Verify Team", href: "/verify-team" },
      { label: "Track Order", href: "/track-order" },
    ],
  },
  {
    title: "Link Building Services",
    links: [
      { label: "HARO Link Building", href: "/services/haro-link-building-service" },
      { label: "White Label Link Building", href: "/services/white-label-link-building-services" },
      { label: "Broken Link Building", href: "/services/broken-link-building-services" },
      { label: "Real Estate", href: "/services/link-building-services-real-estate" },
      { label: "Sports", href: "/services/link-building-services-sports" },
      { label: "Travel & Tourism", href: "/services/travel-and-tourism-link-building-services" },
      { label: "Automobiles", href: "/services/automobiles-link-building-services" },
      { label: "Education & Career", href: "/services/education-link-building-services" },
      { label: "Healthcare", href: "/services/link-building-services-healthcare" },
      { label: "Arts & Entertainment", href: "/services/link-building-arts-entertainment" },
      { label: "Pet & Animal", href: "/services/pet-animal-link-building-services" },
    ],
  },
  {
    title: "Specializations",
    links: [
      { label: "Link Building Services", href: "/specialization/link-building-services" },
      { label: "Guest Posting Services", href: "/specialization/guest-post-services" },
      { label: "Digital PR Services", href: "/specialization/digital-pr-services" },
      { label: "International PR Agency", href: "/specialization/international-pr-agency" },
      { label: "Influencer Marketing Services", href: "/specialization/influencer-marketing-services" },
      { label: "International SEO Services", href: "/specialization/international-seo-agency" },
      { label: "Social Media Management", href: "/specialization/social-media-management-services" },
      { label: "Blogger Outreach Services", href: "/specialization/blogger-outreach-services" },
      { label: "Custom Backlink Building", href: "/specialization/custom-backlink-building-services" },
      { label: "Outsource Backlink Building", href: "/specialization/outsource-backlink-building-services" },
    ],
  },
  {
    title: "Global Coverage",
    links: [
      { label: "Link Building USA", href: "/countries/link-building-usa" },
      { label: "Link Building UK", href: "/countries/link-building-uk" },
      { label: "Link Building Australia", href: "/countries/link-building-australia" },
      { label: "Link Building Canada", href: "/countries/link-building-canada" },
      { label: "Link Building Europe", href: "/countries/backlink-building-europe" },
      { label: "Link Building Germany", href: "/countries/link-building-germany" },
      { label: "Link Building Spain", href: "/countries/link-building-spain" },
      { label: "Link Building Italy", href: "/countries/link-building-italy" },
      { label: "Link Building Portugal", href: "/countries/portugal-link-building-services" },
      { label: "Link Building France", href: "/countries/link-building-services-france" },
      { label: "Link Building New Zealand", href: "/countries/backlink-building-new-zealand" },
      { label: "Link Building India", href: "/countries/link-building-services-india" },
      { label: "Link Building Switzerland", href: "/countries/link-building-services-switzerland" },
    ],
  },
];

export const trustLogos = [
  "TechCrunch",
  "Bloomberg",
  "Business Insider",
  "CoinDesk",
  "Forbes",
  "Entrepreneur",
  "Mashable",
  "The Next Web",
];
