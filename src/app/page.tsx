import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  CasinoHero,
  DealSection,
  DealerCTA,
  GamesSection,
  OddsSection,
  ResultsSection,
} from "@/components/home/HomeSections";
import Testimonials from "@/components/sections/Testimonials";
import PricingCards from "@/components/sections/PricingCards";
import FaqAccordion from "@/components/sections/FaqAccordion";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { allFaqs } from "@/data/faqs";

export default function HomePage() {
  return (
    <>
      <CasinoHero />
      <OddsSection />
      <GamesSection />
      <DealSection />
      <ResultsSection />

      <div>
        <Testimonials />
      </div>

      <div id="pricing">
        <Section>
          <Container>
            <SectionHeading
              title="Plans priced on what it actually takes"
              body="No hidden fees, no lock-in. Every tier includes manual outreach, original content and full placement transparency."
              align="center"
            />
            <div className="mt-14">
              <PricingCards compact />
            </div>
            <Reveal delay={0.2}>
              <div className="mt-10 text-center">
                <Link
                  href="/pricing"
                  className="group inline-flex items-center gap-2 text-[15px] font-extrabold text-brand-700"
                >
                  Compare all plan features
                  <ArrowRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1.5" />
                </Link>
              </div>
            </Reveal>
          </Container>
        </Section>
      </div>

      <div>
        <Section className="bg-mist-100">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <SectionHeading
                title="The questions we get asked most"
                body="If yours is not here, ask us directly — we answer within one business day."
              />
              <div>
                <FaqAccordion items={allFaqs.slice(0, 6)} />
                <Reveal delay={0.15}>
                  <Link
                    href="/faqs"
                    className="group mt-8 inline-flex items-center gap-2 text-[15px] font-extrabold text-brand-700"
                  >
                    Read all FAQs
                    <ArrowRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1.5" />
                  </Link>
                </Reveal>
              </div>
            </div>
          </Container>
        </Section>
      </div>

      <DealerCTA />
    </>
  );
}
