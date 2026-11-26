import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { caseStudies } from "@/data/caseStudies";
import { Reveal, TextReveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export default function FeaturedCase() {
  const study = caseStudies.find((c) => c.featured) ?? caseStudies[0];

  return (
    <Section>
      <Container>
        <Reveal variant="wipe">
          <div className="relative overflow-hidden rounded-[36px] border border-mist-200 bg-mist-50 p-8 sm:p-12 lg:p-16">
            <div
              aria-hidden
              className="absolute -top-24 -right-24 h-[380px] w-[380px] rounded-full bg-brand-200/40 blur-[120px]"
            />

            <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-brand-700 uppercase">
                  Case study · {study.industry}
                </span>
                <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.2rem)] text-ink">
                  <TextReveal text={study.client} />
                </h2>
                <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-pretty text-slate-body">
                  {study.summary}
                </p>
                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
                  {study.timeline} · {study.results.length} tracked outcomes
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <ButtonLink href={`/case-study/${study.slug}`} data-cursor-text="Read it">
                    Read the full study
                    <ArrowUpRight className="h-4 w-4" />
                  </ButtonLink>
                  <Link
                    href="/case-study"
                    className="inline-flex h-12 items-center rounded-full border border-mist-300 px-6 text-[15px] font-medium text-ink transition-all duration-300 hover:border-brand-300 hover:bg-white"
                  >
                    View More Case Studies
                  </Link>
                </div>
              </div>

              <Stagger className="grid grid-cols-2 gap-3 self-center">
                {study.results.map((r) => (
                  <StaggerItem key={r.label}>
                    <div className="group h-full rounded-3xl border border-white bg-white/90 p-6 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-32px_rgba(196,42,53,0.45)]">
                      <p className="display text-[clamp(1.7rem,3.4vw,2.4rem)] text-brand-700">
                        {r.value}
                      </p>
                      <p className="mt-2 text-[13.5px] leading-snug text-slate-body">{r.label}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
