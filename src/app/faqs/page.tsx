import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CTA from "@/components/sections/CTA";
import { Container, Section } from "@/components/ui/Section";
import { Reveal, TextReveal } from "@/components/motion/Reveal";
import { faqGroups } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers on link quality, safety, process, reporting, timelines and commercials — including the questions other agencies avoid.",
};

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Everything clients ask us"
        body="Grouped by what people actually want to know, and answered without the marketing hedge. If yours is missing, email us and we will add it."
        crumbs={[{ label: "FAQs" }]}
        compact
      />

      <Section className="pt-2">
        <Container>
          <div className="space-y-20">
            {faqGroups.map((group, i) => (
              <div key={group.title} className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
                <div className="lg:sticky lg:top-32 lg:self-start">
                  <span className="text-[11px] font-semibold tracking-[0.18em] text-brand-600 uppercase">
                    0{i + 1}
                  </span>
                  <h2 className="display mt-3 text-[clamp(1.6rem,3vw,2.2rem)] text-ink">
                    <TextReveal text={group.title} />
                  </h2>
                </div>
                <Reveal delay={0.1}>
                  <FaqAccordion items={group.items} />
                </Reveal>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTA
        title="Still have a question?"
        body="Send it over. A strategist answers every enquiry within one business day — no chatbot, no discovery form gauntlet."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Book a Call", href: "/book-a-call" }}
      />
    </>
  );
}
