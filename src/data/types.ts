export type Faq = { q: string; a: string };

export type DetailPage = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  intro: string;
  heroStats: { value: string; label: string }[];
  highlights: { title: string; body: string }[];
  deliverables: string[];
  processNote: string;
  faqs: Faq[];

  // Everything below is optional and additive: pages that don't set it fall
  // back to the shorter template (the shared 5-step Process section, no
  // "why us"/benefits grids). Populated per page as content is authored —
  // see the HARO entry in services.ts for the full shape in use.
  /** "Most X Services Miss. We Don't" — the differentiation section right
   *  after the hero. */
  differentiator?: { title: string; body: string };
  /** "Why X Matters for SEO Success" — an intro paragraph plus a few
   *  sub-topic blocks, each with its own short bullet list. */
  matters?: {
    title: string;
    intro: string;
    blocks: { title: string; body: string; points: string[] }[];
  };
  /** A process specific to this service (4 named steps with a title and a
   *  body each) — replaces the generic global <Process/> when present. */
  process?: { title: string; intro: string; steps: { title: string; body: string }[] };
  /** "Why Choose Linkible for X" — a short reasons grid. */
  whyUs?: { title: string; reasons: { title: string; body: string }[] };
  /** "What X Actually Improves" — a benefits grid. */
  impact?: { title: string; intro: string; items: { title: string; body: string }[] };
};
