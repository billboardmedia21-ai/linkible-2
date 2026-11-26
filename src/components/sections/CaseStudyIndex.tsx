"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Clock } from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { cn, estimateReadingTime } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CaseStudyIndex({ studies }: { studies: CaseStudy[] }) {
  const industries = useMemo(
    () => ["All", ...Array.from(new Set(studies.map((s) => s.industry)))],
    [studies],
  );
  const [filter, setFilter] = useState("All");

  const visible = filter === "All" ? studies : studies.filter((s) => s.industry === filter);
  const featured = studies.find((s) => s.featured);
  const gridStudies =
    filter === "All" ? visible.filter((s) => s.slug !== featured?.slug) : visible;

  return (
    <Section className="pt-2">
      <Container>
        {featured && filter === "All" && (
          <Reveal>
            <Link
              href={`/case-study/${featured.slug}`}
              data-cursor-text="Read study"
              className="group relative mb-12 block overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-8 text-white transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 sm:p-12"
            >
              <div className="grain absolute inset-0 opacity-50" />
              <div
                aria-hidden
                className="absolute -top-28 -right-16 h-[340px] w-[340px] rounded-full bg-brand-400/30 blur-[110px] transition-transform duration-1000 group-hover:scale-125"
              />

              <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-14">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase backdrop-blur-sm">
                    Featured · {featured.industry}
                  </span>
                  <h2 className="display mt-6 text-[clamp(1.8rem,4vw,2.9rem)] text-white">
                    {featured.client}
                  </h2>
                  <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-pretty text-brand-100">
                    {featured.summary}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-brand-200">
                    <span>{featured.timeline}</span>
                    <span className="h-1 w-1 rounded-full bg-brand-300" />
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {estimateReadingTime(featured.challenge, featured.approach, featured.outcome)}{" "}
                      min read
                    </span>
                    <ArrowUpRight className="ml-auto hidden h-5 w-5 transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1 sm:block" />
                  </div>
                </div>

                <dl className="grid grid-cols-2 gap-3">
                  {featured.results.map((r) => (
                    <div
                      key={r.label}
                      className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm transition-colors duration-500 group-hover:bg-white/15"
                    >
                      <dt className="display text-[clamp(1.4rem,2.6vw,1.9rem)] text-white">
                        {r.value}
                      </dt>
                      <dd className="mt-1.5 text-[12.5px] leading-snug text-brand-100">
                        {r.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Link>
          </Reveal>
        )}

        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2">
            {industries.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-300",
                  filter === c ? "text-white" : "text-slate-body hover:text-brand-600",
                )}
              >
                {filter === c && (
                  <motion.span
                    layoutId="case-study-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-brand-600"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={cn(
                    "absolute inset-0 -z-20 rounded-full border transition-colors duration-300",
                    filter === c ? "border-transparent" : "border-mist-300",
                  )}
                />
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid gap-4 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {gridStudies.map((study, i) => (
              <motion.article
                key={study.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.04 }}
              >
                <Link
                  href={`/case-study/${study.slug}`}
                  data-cursor-text="Read study"
                  className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-mist-200 bg-white p-7 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-brand-200 hover:shadow-[0_36px_80px_-40px_rgba(196,42,53,0.45)]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-400 to-brand-700 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10.5px] font-semibold tracking-[0.16em] text-brand-600 uppercase">
                      {study.industry}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-mist-400" />
                    <span className="text-[12.5px] text-muted">{study.timeline}</span>
                  </div>

                  <h2 className="display mt-5 text-[24px] leading-tight text-ink">
                    {study.client}
                  </h2>
                  <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-slate-body">
                    {study.summary}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-2 border-t border-mist-200 pt-6">
                    {study.results.slice(0, 2).map((r) => (
                      <div
                        key={r.label}
                        className="rounded-xl bg-mist-50 p-4 transition-colors duration-500 group-hover:bg-brand-50/70"
                      >
                        <p className="display text-[19px] text-brand-700">{r.value}</p>
                        <p className="mt-0.5 text-[11.5px] leading-snug text-slate-body">
                          {r.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-600">
                    Read the full study
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Section>
  );
}
