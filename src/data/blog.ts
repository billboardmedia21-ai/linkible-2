export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  featured?: boolean;
  body: { heading?: string; paragraphs: string[]; list?: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "backlink-gap-analysis-guide",
    title: "How To Run A Backlink Gap Analysis That Actually Changes Your Strategy",
    excerpt:
      "Most gap analyses stop at a domain-level list of referring domains. That is where they stop being useful. Here is the page-level method we run on every new account.",
    category: "Strategy",
    date: "2026-08-28",
    readTime: "9 min read",
    author: "Linkible Strategy Team",
    featured: true,
    body: [
      {
        paragraphs: [
          "A domain-level backlink gap tells you that a competitor has more links than you. It does not tell you which page needs them, what kind they are, or whether closing the gap would change a single ranking. That is why most gap analyses end up as a slide nobody acts on.",
          "The version worth running operates at page level, because that is the level Google ranks at.",
        ],
      },
      {
        heading: "Start from the SERP, not the domain",
        paragraphs: [
          "Pick the ten commercial queries that matter most to revenue. For each one, pull the top five ranking URLs and their referring domain counts. You are looking for the realistic threshold to compete on that specific query, which is almost always dramatically lower than your competitor's site-wide total.",
          "We regularly find clients who believe they need six hundred referring domains when the actual page-level threshold is thirty-one.",
        ],
      },
      {
        heading: "Segment by link type",
        paragraphs: [
          "Not all of a competitor's referring domains are replicable, and some are not worth replicating. Split them into four buckets:",
        ],
        list: [
          "Editorial placements you could realistically earn",
          "Digital PR coverage tied to a specific campaign or dataset",
          "Directory, aggregator and profile links with negligible weight",
          "Legacy links from partnerships, acquisitions or age that you cannot copy",
        ],
      },
      {
        heading: "Model the shape, not the count",
        paragraphs: [
          "Once you strip out the non-replicable buckets, the target becomes clear and usually much smaller. You are trying to match the shape of a winning profile — the ratio of editorial to PR, the anchor distribution, the topical spread — not a raw number.",
          "This is the step that turns an analysis into a campaign plan. Everything downstream, from prospect screening to anchor ratios, follows from the shape you defined here.",
        ],
      },
      {
        heading: "Sequence by opportunity, not by ambition",
        paragraphs: [
          "Rank your target pages by the ratio of expected revenue to gap size. The page you most want to rank is frequently the worst first move, because the gap is enormous and the timeline is long. Building authority on adjacent pages first is usually faster and feeds the head term anyway through internal linking.",
        ],
      },
    ],
  },
  {
    slug: "haro-pitches-that-get-published",
    title: "Why 90% Of HARO Pitches Get Ignored (And What The Other 10% Do)",
    excerpt:
      "We have sent thousands of pitches to journalist requests. The pattern separating the ones that land from the ones that vanish is remarkably consistent.",
    category: "Digital PR",
    date: "2026-08-12",
    readTime: "7 min read",
    author: "Linkible PR Desk",
    body: [
      {
        paragraphs: [
          "Journalists working from source requests are not evaluating your expertise in the abstract. They are asking one question: can I paste this into my draft right now?",
          "Almost every failed pitch fails that test in the same few ways.",
        ],
      },
      {
        heading: "Write the quote, not an offer to be quoted",
        paragraphs: [
          "The single most common mistake is pitching availability. 'Our CEO would be happy to comment on this' creates work for the journalist. A finished, attributable, two-sentence quote removes work.",
          "Lead with the quote. Credentials go underneath, in one line.",
        ],
      },
      {
        heading: "Answer the question that was asked",
        paragraphs: [
          "Requests are specific and pitches are usually generic. If a journalist asks about hiring in fintech compliance roles, a broad quote about the future of work is not a near miss, it is unusable.",
          "If you cannot answer the specific question, skip the request. Volume without relevance does nothing except train journalists to ignore your address.",
        ],
      },
      {
        heading: "Respect the deadline, which is earlier than stated",
        paragraphs: [
          "Most published quotes come from pitches sent in the first ninety minutes. By the time a request is twelve hours old, the writer has usually filled the slot and is deleting the rest.",
          "Speed with a worse quote generally beats perfection sent tomorrow.",
        ],
      },
      {
        heading: "Be a person with a name",
        paragraphs: [
          "Pitches from a generic marketing address, with no title, no company context and no way to verify the expert, get discarded regardless of quality. Journalists are staking their credibility on your quote.",
          "Give them a name, a role, a company, and a link they can check in ten seconds.",
        ],
      },
    ],
  },
  {
    slug: "anchor-text-ratios-2026",
    title: "Anchor Text Ratios In 2026: What The Data Still Supports",
    excerpt:
      "Exact-match anchors have not stopped working, but the safe range is narrower than most guides suggest. Here is how we model anchor plans now.",
    category: "Technical SEO",
    date: "2026-07-24",
    readTime: "8 min read",
    author: "Linkible Strategy Team",
    body: [
      {
        paragraphs: [
          "Anchor text remains one of the strongest relevance signals available, which is exactly why over-optimisation is still one of the fastest ways to suppress a page.",
          "The useful question is not 'what percentage is safe' in the abstract. It is 'what does the anchor profile of the pages currently winning this query look like'.",
        ],
      },
      {
        heading: "Model from the SERP",
        paragraphs: [
          "Pull the anchor distribution for the top five ranking URLs on your target query. Across most commercial verticals we see exact-match anchors sitting between 3% and 9% of a winning page's profile, with brand and naked URL anchors making up the largest share.",
          "Where a client arrives with 25% exact-match from a previous vendor, the fix is dilution rather than removal.",
        ],
      },
      {
        heading: "The practical distribution we build to",
        paragraphs: ["As a starting shape, before SERP-specific adjustment:"],
        list: [
          "Brand and brand-plus-keyword: 40–50%",
          "Naked URL and generic: 20–25%",
          "Partial match and long tail: 20–30%",
          "Exact match: 3–8%",
        ],
      },
      {
        heading: "Velocity matters as much as ratio",
        paragraphs: [
          "A profile can be perfectly proportioned and still look manipulated if it arrives too fast. New domains especially need pacing that matches their age and existing profile.",
          "We tune velocity per domain rather than delivering the same monthly volume regardless of site maturity.",
        ],
      },
    ],
  },
  {
    slug: "vetting-link-prospects",
    title: "The Seven Checks We Run Before A Site Enters A Prospect List",
    excerpt:
      "Domain rating is the last thing we look at, not the first. These are the checks that actually predict whether a link will hold its value.",
    category: "Link Building",
    date: "2026-07-03",
    readTime: "6 min read",
    author: "Linkible Outreach Team",
    body: [
      {
        paragraphs: [
          "Domain rating is easy to inflate and easy to buy. It correlates with link value far more weakly than most buyers assume. Here is what we check instead, in order.",
        ],
      },
      {
        heading: "The checklist",
        paragraphs: ["Every prospect passes all seven before it reaches a client's approval list:"],
        list: [
          "Organic traffic — does the site receive meaningful search traffic, or only referral and direct?",
          "Traffic trend — is that traffic stable or growing, or has it been falling for eighteen months?",
          "Topical relevance — does the site genuinely cover your subject, or is it a general blog accepting anything?",
          "Outbound link patterns — how many external do-follow links per post, and who are they pointing at?",
          "Editorial standards — are there named authors, a contact page, an editorial policy?",
          "Indexation — are the site's recent posts actually in the index?",
          "Placement history — have we or anyone else already placed here recently for a competing client?",
        ],
      },
      {
        heading: "Why traffic trend is the underrated one",
        paragraphs: [
          "A site with 40,000 monthly visits that has been declining steadily for two years is usually a site that has been over-monetising links. A link from it will be worth less next quarter than it is today.",
          "A site with 6,000 visits that has been growing steadily is very often the better buy, regardless of what the domain rating says.",
        ],
      },
    ],
  },
  {
    slug: "digital-pr-data-stories",
    title: "Building A Data Story Journalists Will Actually Cover",
    excerpt:
      "Original data is the strongest predictor of pickup in digital PR. Most campaigns still produce data nobody can write a headline from.",
    category: "Digital PR",
    date: "2026-06-18",
    readTime: "10 min read",
    author: "Linkible PR Desk",
    body: [
      {
        paragraphs: [
          "The gap between a data campaign that earns forty links and one that earns none is almost never the size of the dataset. It is whether the data produces a sentence a journalist can put in a headline.",
        ],
      },
      {
        heading: "Test the headline before you collect the data",
        paragraphs: [
          "Write the three headlines you hope the study produces. If none of them would make you click, the study will not work, and you have learned that before commissioning a survey rather than after.",
          "We routinely kill campaign concepts at this stage. It is the cheapest possible point to fail.",
        ],
      },
      {
        heading: "Find the comparison",
        paragraphs: [
          "Numbers on their own are inert. Numbers in comparison are stories. City versus city, this year versus last, expectation versus reality — the comparison is what makes a statistic quotable.",
          "It is also what lets one dataset produce a dozen regional angles instead of one national story.",
        ],
      },
      {
        heading: "Make the regional cut deliberate",
        paragraphs: [
          "A single national number gets one pitch to one desk. The same data cut by city or region gives you twenty local pitches, each with a headline naming the reader's own area.",
          "Regional pickup is where most of the link volume in a successful campaign comes from.",
        ],
      },
      {
        heading: "Publish the methodology",
        paragraphs: [
          "Serious outlets will not cite a study without a methodology they can check. Sample size, collection period, source and limitations — published on the page, not available on request.",
          "This single detail is the difference between tier-one pickup and aggregator-only coverage.",
        ],
      },
    ],
  },
  {
    slug: "link-building-timeline-expectations",
    title: "How Long Link Building Actually Takes: An Honest Timeline",
    excerpt:
      "Nobody ranks in thirty days. Here is what genuinely happens month by month, based on three hundred campaigns.",
    category: "Strategy",
    date: "2026-05-30",
    readTime: "7 min read",
    author: "Linkible Strategy Team",
    body: [
      {
        paragraphs: [
          "The most damaging thing an agency can do is let a client expect results a quarter earlier than they will arrive. Here is the pattern we see consistently.",
        ],
      },
      {
        heading: "Month one: nothing visible",
        paragraphs: [
          "Research, prospecting, approval and content production. First outreach goes out around week two, first placements land around week three. Rankings do not move, and should not be expected to.",
        ],
      },
      {
        heading: "Months two to three: early signals",
        paragraphs: [
          "Placement volume becomes steady. Long-tail and secondary terms usually move first, often significantly. Head terms may not have moved at all, which is normal and not a warning sign.",
        ],
      },
      {
        heading: "Months four to six: the inflection",
        paragraphs: [
          "This is where most campaigns visibly turn. Accumulated authority reaches a threshold, head terms start climbing, and traffic growth becomes obvious in the analytics rather than only in rank tracking.",
          "It is also the point where campaigns get cancelled by clients who stopped at month three.",
        ],
      },
      {
        heading: "Months seven and beyond: compounding",
        paragraphs: [
          "Earned links start attracting secondary links without further spend. Pages that reached page one begin picking up citations organically. The cost per additional ranking position falls significantly.",
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const categories = Array.from(new Set(posts.map((p) => p.category)));
