import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import PricingCards from "@/components/sections/PricingCards";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CTA from "@/components/sections/CTA";
import Testimonials from "@/components/sections/Testimonials";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { plans, pricingPillars, pricingFaqs } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent link building pricing from $1,499/month. No hidden fees, no lock-in contracts, cancel anytime.",
};

const comparison = [
  { label: "Editorial backlinks", values: ["6–8", "6–8", "15–20", "30–35"] },
  { label: "Domain authority range", values: ["DR 20–50", "DR 40–90+", "DR 40–90+", "DR 40–90+"] },
  { label: "Target URLs", values: ["1", "Up to 3", "Unlimited", "Unlimited"] },
  { label: "Content length", values: ["500 words", "500 words", "1,000+ words", "1,200–1,500 words"] },
  { label: "Competitor gap analysis", values: [false, true, true, true] },
  { label: "Keyword grouping", values: [false, false, true, true] },
  { label: "Digital PR campaign", values: [false, false, false, true] },
  { label: "Dedicated account manager", values: [false, false, true, true] },
  { label: "Weekly check-ins", values: [false, false, false, true] },
  { label: "Live reporting dashboard", values: [true, true, true, true] },
  { label: "Permanent placements", values: [true, true, true, true] },
  { label: "Prospect approval before outreach", values: [true, true, true, true] },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Priced on what it actually takes"
        body="Every plan includes manual outreach, original content, prospect approval before spend and a live reporting dashboard. No hidden fees, and you can cancel anytime."
        crumbs={[{ label: "Pricing" }]}
        compact
      />

      <Section className="pt-2">
        <Container>
          <PricingCards />

          <Reveal delay={0.2}>
            <div className="mt-14 grid gap-4 sm:grid-cols-3">
              {pricingPillars.map((p) => (
                <div
                  key={p.title}
                  className="rounded-3xl border border-mist-200 bg-mist-50 p-7 transition-all duration-500 hover:border-brand-200 hover:bg-white"
                >
                  <h3 className="text-[17px] font-semibold tracking-tight text-ink">{p.title}</h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-body">{p.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-mist-100/70">
        <Container>
          <SectionHeading
            eyebrow="Compare"
            title="Every feature, side by side"
            body="The honest version — including what each tier does not include."
            align="center"
          />

          <Reveal delay={0.15}>
            <div className="mt-12 overflow-x-auto rounded-[28px] border border-mist-200 bg-white">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-mist-200">
                    <th className="px-6 py-5 text-[12px] font-semibold tracking-[0.14em] text-muted uppercase">
                      Feature
                    </th>
                    {plans.map((p) => (
                      <th key={p.name} className="px-6 py-5">
                        <span className="block text-[15.5px] font-semibold text-ink">{p.name}</span>
                        <span className="mt-0.5 block text-[13px] text-muted">
                          ${p.price.toLocaleString()}/mo
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-mist-200 transition-colors duration-250 last:border-0 hover:bg-brand-50/40"
                    >
                      <td className="px-6 py-4 text-[14.5px] text-ink-soft">{row.label}</td>
                      {row.values.map((v, i) => (
                        <td key={i} className="px-6 py-4">
                          {typeof v === "boolean" ? (
                            v ? (
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                                <Check className="h-3.5 w-3.5" strokeWidth={3} />
                              </span>
                            ) : (
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mist-100 text-mist-400">
                                <Minus className="h-3.5 w-3.5" strokeWidth={3} />
                              </span>
                            )
                          ) : (
                            <span className="text-[14px] font-medium text-ink">{v}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Testimonials />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <SectionHeading
              eyebrow="Pricing FAQs"
              title="Before you commit budget"
              body="The commercial questions clients ask on every first call."
            />
            <FaqAccordion items={pricingFaqs} />
          </div>
        </Container>
      </Section>

      <CTA
        title="Not sure which plan fits?"
        body="Book a call and we will model your page-level backlink gap live. If the data says you need less than you planned to buy, we will tell you."
      />
    </>
  );
}
