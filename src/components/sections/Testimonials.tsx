"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { testimonials } from "@/data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex((next + testimonials.length) % testimonials.length);
  };

  const t = testimonials[index];

  return (
    <Section className="relative overflow-hidden bg-ink text-white">
      <div className="grain absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-brand-600/25 blur-[130px]"
      />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-brand-300 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              Client stories
            </span>
            <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.2rem)] text-white">
              What it is like to
              <br />
              work with us
            </h2>
            <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-white/55">
              Most of our clients came from a previous agency. These are the things they
              tell us were different.
            </p>

            <div className="mt-9 flex items-center gap-3">
              <button
                onClick={() => go(index - 1)}
                aria-label="Previous testimonial"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-brand-400 hover:bg-brand-500 hover:text-white"
              >
                <ArrowLeft className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={() => go(index + 1)}
                aria-label="Next testimonial"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-brand-400 hover:bg-brand-500 hover:text-white"
              >
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
              <span className="ml-3 font-mono text-[13px] text-white/40">
                {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={index}
                custom={dir}
                initial={{ opacity: 0, y: 30 * dir }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 * dir }}
                transition={{ duration: 0.6, ease: EASE }}
                className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl sm:p-11"
              >
                <Quote className="h-9 w-9 text-brand-400" strokeWidth={1.5} />
                <blockquote className="mt-6 text-[19px] leading-relaxed text-pretty text-white/90 sm:text-[22px]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-[15px] font-semibold text-white">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-white">{t.name}</span>
                    <span className="block text-[13.5px] text-white/50">
                      {t.role}, {t.company}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}
