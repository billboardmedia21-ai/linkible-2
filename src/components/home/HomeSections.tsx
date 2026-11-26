import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem, TextReveal, LineReveal } from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import Marquee from "@/components/motion/Marquee";
import StageSection from "./StageSection";
import CasinoEntrance from "@/components/poker/CasinoEntrance";
import ChipsScene from "@/components/poker/ChipsScene";
import PokerTable from "@/components/poker/PokerTable";
import CardFan from "@/components/poker/CardFan";
import SpinWheel from "@/components/poker/SpinWheel";
import InView from "@/components/poker/InView";
import Parallax from "@/components/poker/Parallax";
import { process, serviceCards, trustBadges } from "@/data/content";
import { trustLogos } from "@/data/site";
import { getService } from "@/data/services";
import { caseStudies } from "@/data/caseStudies";

const SUITS = ["♠", "♥", "♦", "♣"] as const;
const suitColor = (i: number) => (i % 4 === 1 || i % 4 === 2 ? "text-brand-600" : "text-ink");

/* ------------------------------------------------------------------ */
/*  1 · Hero — Ace lounges on the couch                                 */
/* ------------------------------------------------------------------ */
export function CasinoHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-12 sm:pt-36 lg:flex lg:min-h-[100svh] lg:items-center lg:pt-28 lg:pb-16">
      {/* sunburst + floating suits */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="halftone absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
        <div className="sunburst absolute top-1/2 right-[-14%] hidden h-[1100px] w-[1100px] -translate-y-1/2 rounded-full lg:block" />
        <span className="float-slow absolute top-[18%] left-[47%] hidden text-5xl text-ink/80 lg:block" style={{ ["--r" as string]: "-12deg" }}>♠</span>
        <span className="float-slower absolute top-[72%] left-[45%] hidden text-4xl text-brand-600/80 lg:block" style={{ ["--r" as string]: "10deg" }}>♦</span>
      </div>

      <Container className="w-full">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
            <Reveal y={14}>
              <span className="sticker">
                <span aria-hidden>♠</span> Casino &amp; iGaming link building
              </span>
            </Reveal>

            <h1 className="display mt-6 pb-3 !leading-[1.14] text-[clamp(2.4rem,4.7vw,4.5rem)] text-ink">
              <TextReveal text="Stack the deck" delay={0.1} />
              <span className="block">
                <LineReveal text="for your rankings." delay={0.26} className="text-brand-600" />
              </span>
            </h1>

            <Reveal delay={0.5}>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-pretty text-slate-body sm:text-[19px]">
                White-hat editorial backlinks, digital PR and HARO placements for casino and
                gambling brands — every link pitched by hand, every placement reported.
              </p>
            </Reveal>

            <Reveal delay={0.62}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/pricing" size="lg" arrow data-cursor-text="See plans">
                  Build My Links
                </ButtonLink>
                <ButtonLink
                  href="/services/casino-gambling-link-building-services"
                  size="lg"
                  variant="secondary"
                >
                  Casino link building
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.74}>
              <ul className="mt-8 hidden flex-wrap gap-2.5 sm:flex">
                {trustBadges.map((b) => (
                  <li
                    key={b.label}
                    className="rounded-full border-2 border-ink bg-white px-3.5 py-1.5 text-[13px] font-bold text-ink shadow-[2px_3px_0_0_var(--color-ink)]"
                  >
                    <span className="mr-1.5 text-brand-600">♦</span>
                    {b.label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* the casino entrance, with a fanned hand tucked in front */}
          <Parallax strength={9} className="relative mx-auto w-full max-w-[min(540px,64svh)]">
            <CasinoEntrance className="block w-full" />
            <div className="pointer-events-none absolute -bottom-3 -left-4 w-[46%] sm:-left-10">
              <CardFan className="pointer-events-auto w-full" />
            </div>
          </Parallax>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2 · Odds — stats, Ace stands up                                     */
/* ------------------------------------------------------------------ */
export function OddsSection() {
  const stats = [
    { value: 347, suffix: "%", label: "Average traffic growth", sub: "TechFlow, 6 months" },
    { value: 1200, suffix: "+", label: "Editorial links placed", sub: "Across 300+ campaigns" },
    { value: 14, suffix: " days", label: "To first placements", sub: "From campaign kickoff" },
  ];
  return (
    <StageSection
      side="right"
      className="gutter-top bg-mist-100"
      art={
        <Parallax strength={10} className="mx-auto w-full max-w-[520px]">
          <ChipsScene className="block w-full" />
        </Parallax>
      }
    >
      <SectionHeading
        title="Numbers you can bet on"
        body="No smoke, no mirrors — results from real campaigns, tracked from the first outreach email to the live link."
      />
      <Stagger className="mt-10 grid gap-4 sm:grid-cols-3">
        {stats.map((s, i) => (
          <StaggerItem key={s.label}>
            <div className="glass-card relative h-full rounded-3xl p-5 transition-transform duration-300 hover:-translate-y-1.5 hover:-rotate-1">
              <span aria-hidden className={`absolute top-3 right-4 text-xl ${suitColor(i + 1)}`}>
                {SUITS[i]}
              </span>
              <p className="display text-[clamp(1.6rem,2.5vw,2.3rem)] whitespace-nowrap text-brand-700">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-[14.5px] leading-snug font-bold text-ink">{s.label}</p>
              <p className="mt-0.5 text-[12.5px] text-muted">{s.sub}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-12 -mr-5 overflow-hidden rounded-2xl border-2 border-ink bg-white py-4 sm:mr-0">
        <p className="mb-2 text-center text-[11px] font-extrabold tracking-[0.2em] text-muted uppercase">
          Client coverage earned in
        </p>
        <Marquee speed={34}>
          {trustLogos.map((logo) => (
            <span key={logo} className="display shrink-0 px-2 text-xl leading-[1.4] whitespace-nowrap text-ink/70">
              {logo} <span className="text-brand-600">♦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </StageSection>
  );
}

/* ------------------------------------------------------------------ */
/*  3 · Games — services, Ace turns around                              */
/* ------------------------------------------------------------------ */
export function GamesSection() {
  const casino = getService("casino-gambling-link-building-services");
  return (
    <StageSection tall={false} className="py-24 sm:py-28">
      <SectionHeading
        title="Pick your game"
        body="Three ways to earn authority — mix and match, or let us deal the hand."
        align="center"
      />

      <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
        {serviceCards.slice(0, 3).map((c, i) => (
          <StaggerItem key={c.title} className="h-full">
            <Link
              href={c.href}
              data-cursor-text="Play"
              className="glass-card group relative flex h-full flex-col rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:-rotate-[0.6deg]"
            >
              <span aria-hidden className={`absolute top-4 left-5 text-lg font-black ${suitColor(i + 1)}`}>
                {SUITS[i]}
              </span>
              <span aria-hidden className={`absolute right-5 bottom-4 rotate-180 text-lg font-black ${suitColor(i + 1)}`}>
                {SUITS[i]}
              </span>
              <h3 className="display mt-6 text-2xl text-ink">{c.title}</h3>
              <p className="mt-1 text-[14px] font-bold text-brand-700">{c.headline}</p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-slate-body">{c.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.points.map((p) => (
                  <li key={p} className="rounded-full bg-gold-200 px-3 py-1 text-[12px] font-bold text-ink">
                    {p}
                  </li>
                ))}
              </ul>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-extrabold text-ink">
                Learn more
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      {casino && (
        <Reveal delay={0.1}>
          <Link
            href="/services/casino-gambling-link-building-services"
            data-cursor-text="High roller"
            className="group relative mt-6 block overflow-hidden rounded-3xl border-2 border-ink bg-ink p-8 text-center text-white shadow-[5px_6px_0_0_var(--color-gold-400)] transition-transform duration-300 hover:-translate-y-1 sm:p-10"
          >
            <span aria-hidden className="pointer-events-none absolute -top-8 left-6 text-[9rem] leading-none text-white/[0.07]">♠</span>
            <span aria-hidden className="pointer-events-none absolute -right-2 -bottom-10 rotate-180 text-[9rem] leading-none text-white/[0.07]">♠</span>
            <p className="relative text-[12px] font-extrabold tracking-[0.18em] text-gold-400 uppercase">
              ♠ {casino.eyebrow}
            </p>
            <h3 className="display relative mt-2 text-[clamp(1.5rem,2.8vw,2.2rem)]">{casino.name}</h3>
            <p className="relative mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-white/75">{casino.intro}</p>
            <span className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-2.5 text-[14px] font-extrabold text-ink">
              Take a seat <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      )}
    </StageSection>
  );
}

/* ------------------------------------------------------------------ */
/*  4 · The deal — process, Ace shows his card                          */
/* ------------------------------------------------------------------ */
export function DealSection() {
  return (
    <StageSection tall={false} className="gutter-top bg-mist-100 py-24 sm:py-28">
      <SectionHeading
        title="Five rounds. Same rules every time."
        body="You see the prospect list before outreach, the drafts before submission, and every placement the day it goes live."
        align="center"
      />
      <ol className="mt-12 flex flex-wrap justify-center gap-4">
        {process.map((p, i) => (
          <Reveal
            key={p.step}
            delay={i * 0.06}
            className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.7rem)] xl:w-[calc(20%-0.8rem)]"
          >
            <li className="glass-card flex h-full flex-col items-center rounded-3xl p-6 text-center transition-transform duration-300 hover:-translate-y-1.5">
              <span className="display flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-gold-400 text-xl shadow-[2px_3px_0_0_var(--color-ink)]">
                {p.step}
              </span>
              <h3 className="display mt-4 text-xl text-ink">{p.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-body">{p.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </StageSection>
  );
}

/* ------------------------------------------------------------------ */
/*  5 · Results — Ace throws the cards                                  */
/* ------------------------------------------------------------------ */
export function ResultsSection() {
  const study = caseStudies.find((c) => c.featured) ?? caseStudies[0];
  return (
    <StageSection
      side="right"
      art={
        <InView className="mx-auto w-full max-w-[620px]">
          <Parallax strength={8}>
            <PokerTable className="block w-full" />
          </Parallax>
        </InView>
      }
    >
      <span className="sticker">♦ Case study · {study.industry}</span>
      <h2 className="display mt-5 text-[clamp(2.1rem,5vw,3.8rem)] text-ink">
        <TextReveal text={`Cards on the table: ${study.client}`} />
      </h2>
      <Reveal delay={0.1}>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-pretty text-slate-body">{study.summary}</p>
        <p className="mt-2 text-[14px] font-bold text-muted">
          {study.timeline} · {study.results.length} tracked outcomes
        </p>
      </Reveal>
      <Stagger className="mt-8 grid grid-cols-2 gap-4">
        {study.results.map((r, i) => (
          <StaggerItem key={r.label}>
            <div className="glass-card relative h-full rounded-3xl p-5">
              <span aria-hidden className={`absolute top-3 right-4 text-lg ${suitColor(i)}`}>{SUITS[i % 4]}</span>
              <p className="display text-[clamp(1.7rem,3vw,2.4rem)] text-brand-700">{r.value}</p>
              <p className="mt-1.5 text-[13.5px] leading-snug text-slate-body">{r.label}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={`/case-study/${study.slug}`} arrow data-cursor-text="Read it">
          Read the full study
        </ButtonLink>
        <ButtonLink href="/case-study" variant="secondary">
          More case studies
        </ButtonLink>
      </div>
    </StageSection>
  );
}

/* ------------------------------------------------------------------ */
/*  Final CTA — Ace points at you                                       */
/* ------------------------------------------------------------------ */
export function DealerCTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="sunburst absolute top-1/2 left-[-14%] hidden h-[1100px] w-[1100px] -translate-y-1/2 rounded-full lg:block" />
      </div>
      <Container className="w-full">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:order-2">
            <div className="glass-panel relative rounded-[2rem] p-8 text-white sm:p-12" style={{ background: "var(--panel-dark)" }}>
              <span aria-hidden className="pointer-events-none absolute -top-5 -left-3 rotate-[-12deg] rounded-xl border-2 border-ink bg-gold-400 px-3 py-1 text-sm font-black text-ink shadow-[2px_3px_0_0_var(--color-ink)]">
                ♠ Your move
              </span>
              <h2 className="display text-[clamp(2rem,4.2vw,3.2rem)]">
                <TextReveal text="Ready to outrank the sites above you?" />
              </h2>
              <Reveal delay={0.15}>
                <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/75">
                  Book a free strategy session. We will model your backlink gap live on the call and
                  tell you exactly what it takes to close it.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/book-a-call" size="lg" variant="light" arrow data-cursor-text="Book now">
                    Get Your Free Strategy Session
                  </ButtonLink>
                  <Link
                    href="/pricing"
                    className="inline-flex h-14 items-center justify-center rounded-full border-2 border-white/40 px-8 text-base font-bold text-white transition-colors duration-300 hover:bg-white/10"
                  >
                    View Pricing
                  </Link>
                </div>
                <p className="mt-6 text-[13px] text-white/55">
                  No lock-in contracts · Cancel anytime · Reply within one business day
                </p>
              </Reveal>
            </div>
          </div>
          <div className="lg:order-1">
            <SpinWheel className="mx-auto w-full max-w-[500px]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
