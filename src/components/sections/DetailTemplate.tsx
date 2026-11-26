import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { DetailPage } from "@/data/types";
import PageHero, { type Crumb } from "./PageHero";
import CTA from "./CTA";
import FaqAccordion from "./FaqAccordion";
import Process from "./Process";
import DetailProcess from "./DetailProcess";
import PricingCards from "./PricingCards";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem, TextReveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export default function DetailTemplate({
  page,
  crumbs,
  related,
  relatedTitle,
  relatedHrefBase,
}: {
  page: DetailPage;
  crumbs: Crumb[];
  related: { slug: string; name: string; eyebrow: string }[];
  relatedTitle: string;
  relatedHrefBase: string;
}) {
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        body={page.intro}
        crumbs={crumbs}
        stats={page.heroStats}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/book-a-call" size="lg" data-cursor-text="Book now">
            Get a free strategy session
          </ButtonLink>
          <Link
            href="/pricing"
            className="inline-flex h-14 items-center rounded-full border border-mist-300 bg-white/60 px-7 text-[15px] font-medium text-ink backdrop-blur-sm transition-all duration-300 hover:border-brand-300 hover:bg-white"
          >
            See pricing
          </Link>
        </div>
      </PageHero>

      <Section className="pt-4">
        <Container>
          <Stagger className="grid gap-4 lg:grid-cols-3">
            {page.highlights.map((h, i) => (
              <StaggerItem key={h.title}>
                <div className="group h-full rounded-[26px] border border-mist-200 bg-white p-7 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-brand-200 hover:shadow-[0_32px_70px_-38px_rgba(196,42,53,0.45)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-[13px] font-semibold text-brand-700 transition-colors duration-500 group-hover:bg-brand-600 group-hover:text-white">
                    0{i + 1}
                  </span>
                  <h3 className="mt-6 text-[19px] font-semibold tracking-tight text-ink">
                    {h.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-slate-body">{h.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {page.differentiator && (
        <Section className="pt-0">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="display text-[clamp(1.9rem,4vw,2.8rem)] text-ink">
                <TextReveal text={page.differentiator.title} />
              </h2>
              <Reveal delay={0.12}>
                <p className="mt-6 text-pretty text-[16.5px] leading-relaxed whitespace-pre-line text-slate-body">
                  {page.differentiator.body}
                </p>
              </Reveal>
            </div>
          </Container>
        </Section>
      )}

      {page.matters && (
        <Section className="bg-mist-100/70">
          <Container>
            <SectionHeading title={page.matters.title} body={page.matters.intro} align="center" />
            <Stagger className="mt-12 grid gap-4 md:grid-cols-2">
              {page.matters.blocks.map((block) => (
                <StaggerItem key={block.title}>
                  <div className="h-full rounded-[26px] border border-mist-200 bg-white p-7">
                    <h3 className="text-[18px] font-semibold tracking-tight text-ink">
                      {block.title}
                    </h3>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-body">
                      {block.body}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {block.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                            <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                          </span>
                          <span className="text-[13.5px] leading-snug text-ink-soft">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      )}

      <Section className={page.matters ? "pt-0" : undefined}>
        <Container>
          <SectionHeading
            title="Pricing & plan"
            body="Invest in placements that strengthen domain authority, not random links. Every plan is structured to deliver measurable SEO impact and long-term ranking power."
            align="center"
          />
          <div className="mt-12">
            <PricingCards compact />
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 text-center">
              <Link
                href="/pricing"
                className="group inline-flex items-center gap-2 text-[15px] font-semibold text-brand-600"
              >
                Compare all plan features
                <ArrowUpRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-mist-100/70">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <SectionHeading eyebrow="What you get" title="Inside the engagement" />
              <Reveal delay={0.15}>
                <div className="mt-8 rounded-[26px] border border-brand-200/70 bg-brand-50/60 p-6">
                  <p className="text-[15px] leading-relaxed text-ink-soft italic">
                    “{page.processNote}”
                  </p>
                </div>
              </Reveal>
            </div>

            <Stagger className="space-y-0">
              {page.deliverables.map((d) => (
                <StaggerItem key={d}>
                  <div className="group flex items-start gap-4 border-b border-mist-300/70 py-5 transition-colors duration-300 first:border-t hover:bg-white/60">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white transition-transform duration-400 group-hover:scale-110">
                      <Check className="h-3 w-3" strokeWidth={3.5} />
                    </span>
                    <span className="text-[15.5px] leading-snug text-ink-soft">{d}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      {page.process ? (
        <DetailProcess
          title={page.process.title}
          intro={page.process.intro}
          steps={page.process.steps}
        />
      ) : (
        <Process />
      )}

      {page.whyUs && (
        <Section className="bg-mist-100/70">
          <Container>
            <SectionHeading title={page.whyUs.title} align="center" />
            <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {page.whyUs.reasons.map((reason, i) => (
                <StaggerItem key={reason.title}>
                  <div className="h-full rounded-[26px] border border-mist-200 bg-white p-7">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-[13px] font-semibold text-brand-700">
                      0{i + 1}
                    </span>
                    <h3 className="mt-6 text-[18px] font-semibold tracking-tight text-ink">
                      {reason.title}
                    </h3>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-body">
                      {reason.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      )}

      {page.impact && (
        <Section>
          <Container>
            <SectionHeading title={page.impact.title} body={page.impact.intro} align="center" />
            <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {page.impact.items.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="h-full rounded-[26px] border border-mist-200 bg-white p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[0_28px_60px_-34px_rgba(196,42,53,0.45)]">
                    <h3 className="text-[17px] font-semibold tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-slate-body">
                      {item.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      )}

      <Section className="pt-0">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <SectionHeading
              eyebrow="FAQs"
              title={`${page.name} questions`}
              body="Straight answers, including the ones other agencies avoid."
            />
            <FaqAccordion items={page.faqs} />
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section className="bg-mist-100/70">
          <Container>
            <h2 className="display text-[clamp(1.7rem,3.4vw,2.5rem)] text-ink">
              <TextReveal text={relatedTitle} />
            </h2>
            <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <StaggerItem key={r.slug}>
                  <Link
                    href={`${relatedHrefBase}/${r.slug}`}
                    data-cursor-text="Open"
                    className="group flex h-full flex-col justify-between rounded-3xl border border-mist-200 bg-white p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[0_28px_60px_-34px_rgba(196,42,53,0.45)]"
                  >
                    <div>
                      <p className="text-[10.5px] font-semibold tracking-[0.16em] text-brand-600 uppercase">
                        {r.eyebrow}
                      </p>
                      <p className="mt-3 text-[17px] leading-snug font-medium text-ink">{r.name}</p>
                    </div>
                    <ArrowUpRight className="mt-8 h-5 w-5 text-mist-400 transition-all duration-400 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-600" />
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      )}

      <CTA />
    </>
  );
}
