import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock, Quote, TrendingUp } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import StoryNav from "@/components/sections/StoryNav";
import CTA from "@/components/sections/CTA";
import { Container, Section } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem, TextReveal } from "@/components/motion/Reveal";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";
import { estimateReadingTime } from "@/lib/utils";
import ApproachTimeline from "@/components/sections/ApproachTimeline";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Not found" };
  return {
    title: `${study.client} case study`,
    description: study.summary.slice(0, 158),
  };
}

const SECTIONS = [
  { id: "challenge", label: "The challenge" },
  { id: "approach", label: "What we did" },
  { id: "outcome", label: "The outcome" },
  { id: "results", label: "Results" },
];

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const others = caseStudies.filter((c) => c.slug !== slug).slice(0, 3);
  const readMins = estimateReadingTime(study.challenge, study.approach, study.outcome);
  const sections = study.quote ? [...SECTIONS, { id: "quote", label: "In their words" }] : SECTIONS;

  return (
    <>
      <PageHero
        eyebrow={`${study.industry} · ${study.timeline}`}
        title={study.client}
        body={study.summary}
        crumbs={[{ label: "Case Study", href: "/case-study" }, { label: study.client }]}
        stats={study.results}
      >
        <div className="mt-6 flex items-center gap-2 text-[13px] text-muted">
          <Clock className="h-3.5 w-3.5" />
          {readMins} min read
        </div>
      </PageHero>

      <Section className="pt-4">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
            <StoryNav sections={sections} />

            {/* max-w-[68ch] keeps body copy at an optimal reading measure
                regardless of how wide the column gets on large screens. */}
            <div className="max-w-[68ch]">
              <section id="challenge" className="scroll-mt-40">
                <Reveal>
                  <div className="relative overflow-hidden rounded-[28px] border border-mist-200 bg-mist-50 p-8 sm:p-10">
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-400 to-brand-700"
                    />
                    <h2 className="text-[11px] font-semibold tracking-[0.18em] text-brand-600 uppercase">
                      The challenge
                    </h2>
                    <p className="mt-5 text-[17px] leading-[1.75] text-pretty text-ink-soft">
                      {study.challenge}
                    </p>
                  </div>
                </Reveal>
              </section>

              <section id="approach" className="mt-16 scroll-mt-40">
                <h2 className="display text-[clamp(1.7rem,3.2vw,2.3rem)] text-ink">
                  <TextReveal text="What we did" />
                </h2>
                <p className="mt-3 text-[15px] text-muted">
                  {study.approach.length} moves, in the order we made them.
                </p>
                <ApproachTimeline steps={study.approach} />
              </section>

              <section id="outcome" className="mt-16 scroll-mt-40">
                <h2 className="display text-[clamp(1.7rem,3.2vw,2.3rem)] text-ink">
                  <TextReveal text="The outcome" />
                </h2>
                <Reveal delay={0.1}>
                  <div className="relative mt-6 rounded-[28px] bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-8 text-white sm:p-10">
                    <div className="grain absolute inset-0 rounded-[28px] opacity-30" />
                    <TrendingUp
                      className="relative h-7 w-7 text-brand-200"
                      strokeWidth={1.75}
                    />
                    <p className="relative mt-4 text-[18px] leading-[1.75] text-pretty text-white/95 sm:text-[19.5px]">
                      {study.outcome}
                    </p>
                  </div>
                </Reveal>
              </section>

              <section id="results" className="mt-16 scroll-mt-40">
                <h2 className="display text-[clamp(1.7rem,3.2vw,2.3rem)] text-ink">
                  <TextReveal text="Results" />
                </h2>
                <Stagger className="mt-6 grid gap-3 sm:grid-cols-2">
                  {study.results.map((r) => (
                    <StaggerItem key={r.label}>
                      <div className="group h-full rounded-3xl border border-mist-200 bg-white p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[0_28px_60px_-34px_rgba(196,42,53,0.4)]">
                        <dt className="display text-[clamp(1.8rem,3.4vw,2.4rem)] text-brand-700">
                          {r.value}
                        </dt>
                        <dd className="mt-2 text-[14px] text-slate-body">{r.label}</dd>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </section>

              {study.quote && (
                <section id="quote" className="mt-16 scroll-mt-40">
                  <Reveal>
                    <figure className="rounded-[28px] bg-ink p-8 text-white sm:p-11">
                      <Quote className="h-8 w-8 text-brand-400" strokeWidth={1.5} />
                      <blockquote className="mt-5 text-[19px] leading-relaxed text-pretty text-white/90 sm:text-[21px]">
                        {study.quote.text}
                      </blockquote>
                      <figcaption className="mt-7 border-t border-white/10 pt-5 text-[14px] text-white/55">
                        <strong className="font-semibold text-white">{study.quote.name}</strong> ·{" "}
                        {study.quote.role}
                      </figcaption>
                    </figure>
                  </Reveal>
                </section>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-mist-100/70">
        <Container>
          <h2 className="display text-[clamp(1.7rem,3.4vw,2.5rem)] text-ink">
            <TextReveal text="More case studies" />
          </h2>
          <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <StaggerItem key={o.slug}>
                <Link
                  href={`/case-study/${o.slug}`}
                  data-cursor-text="Open"
                  className="group flex h-full flex-col justify-between rounded-3xl border border-mist-200 bg-white p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[0_28px_60px_-34px_rgba(196,42,53,0.45)]"
                >
                  <div>
                    <p className="text-[10.5px] font-semibold tracking-[0.16em] text-brand-600 uppercase">
                      {o.industry}
                    </p>
                    <p className="display mt-3 text-[20px] text-ink">{o.client}</p>
                    <p className="mt-2.5 text-[13.5px] leading-snug text-slate-body">
                      {o.results[0].value} {o.results[0].label.toLowerCase()}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-8 h-5 w-5 text-mist-400 transition-all duration-400 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-600" />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
