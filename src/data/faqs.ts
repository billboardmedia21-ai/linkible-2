export const faqGroups = [
  {
    title: "Getting Started",
    items: [
      {
        q: "How do I know which plan is right for my site?",
        a: "It depends on your competition, not your budget. On a strategy call we model the page-level referring domain gap for your top commercial terms and tell you the volume required. If that is below the tier you were considering, we will say so.",
      },
      {
        q: "What do you need from me to start?",
        a: "Read access to Google Analytics and Search Console, your target keyword list if you have one, and thirty minutes for an onboarding call. We handle everything else.",
      },
      {
        q: "How quickly does a campaign start?",
        a: "Research begins within two business days of onboarding. First outreach goes out in week two and first placements typically confirm in week three.",
      },
      {
        q: "Do you work with sites in any language?",
        a: "We have native writers across all major European languages plus Hindi and Portuguese. If we cannot cover a language properly, we will tell you rather than run it through translation software.",
      },
    ],
  },
  {
    title: "Quality & Safety",
    items: [
      {
        q: "Are your links safe from Google penalties?",
        a: "Yes. We run manual outreach for editorial placements only — no PBNs, no link networks, no automated placements. In over 300 campaigns we have never had a client receive a manual action from our work.",
      },
      {
        q: "How do you vet placement sites?",
        a: "Seven checks: organic traffic, traffic trend, topical relevance, outbound link patterns, editorial standards, indexation and placement history. Domain rating is a filter, not the decision.",
      },
      {
        q: "Do you use paid placements?",
        a: "Some editorial placements involve a publisher fee, which is standard across the industry and disclosed in your reporting. Digital PR and HARO placements are always fully earned.",
      },
      {
        q: "What happens if a link is removed?",
        a: "We replace it with an equivalent or better placement at no cost within the first six months, and we monitor live status quarterly so we usually spot it before you do.",
      },
    ],
  },
  {
    title: "Process & Reporting",
    items: [
      {
        q: "Do I get to approve sites before outreach?",
        a: "Yes, on every plan. The prospect list is shared before a single email goes out and you can veto anything without explanation.",
      },
      {
        q: "Who writes the content?",
        a: "In-house writers, with subject-matter specialists for technical, medical and financial verticals. Every draft is available for your review before submission.",
      },
      {
        q: "What does reporting include?",
        a: "A live dashboard with every prospect and placement, the live URL, anchor text, authority metrics and date. Monthly, a strategist walks you through ranking and traffic movement.",
      },
      {
        q: "Can I talk to the person doing the work?",
        a: "Yes. You get a named strategist, not a ticket queue, reachable over email, Slack or a scheduled call.",
      },
    ],
  },
  {
    title: "Results & Commercials",
    items: [
      {
        q: "When will I see results?",
        a: "Early movement on secondary terms typically appears between weeks six and ten. Head terms and meaningful revenue impact usually land around month four.",
      },
      {
        q: "Do you guarantee rankings?",
        a: "No, and any agency that does is either guessing or misleading you. We guarantee link volume, quality standards and full transparency on every placement.",
      },
      {
        q: "Is there a lock-in contract?",
        a: "No. All plans run month to month with thirty days' notice. Work already in the pipeline is completed and delivered.",
      },
      {
        q: "Can I pause a campaign?",
        a: "Yes, with thirty days' notice. Most clients who pause do so around seasonal peaks, and we plan the restart so momentum is not lost.",
      },
    ],
  },
];

export const allFaqs = faqGroups.flatMap((g) => g.items);
