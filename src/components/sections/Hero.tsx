"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { LineReveal, TextReveal } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import Counter from "@/components/motion/Counter";
import PixelDisintegrate from "@/components/motion/PixelDisintegrate";
import { trustBadges } from "@/data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Negative, not positive: content lifts away slightly FASTER than normal
  // scroll, not slower. A positive offset here made the hero content lag
  // behind real scroll position, which meant it lingered underneath the
  // fixed glass nav for a much longer stretch than a normal scroll pass —
  // visible as the headline appearing cut off behind the translucent
  // header for a good chunk of the scroll. Clearing the nav promptly
  // avoids that overlap instead of merely padding around it.
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-36 pb-20 sm:pt-44 lg:pt-52">
      <Backdrop />

      <Container>
        <motion.div style={{ y, opacity, scale }} className="relative">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-2">
            {/* Two explicit lines rising one after the other (the reference's
                "line stack"). !leading-[1.2] overrides .display's 1.06 here:
                at this size the font's full ascent+descent fits inside the
                line box, so no glyph ever has to paint outside it. */}
            <PixelDisintegrate>
              <h1 className="display pb-5 !leading-[1.2] text-[clamp(2.7rem,7.6vw,6rem)] text-ink sm:pb-7">
                <TextReveal text="Powerful Link Building" delay={0.1} />
                <span className="block">
                  <LineReveal
                    text="That Grows Your Rankings"
                    delay={0.28}
                    className="bg-gradient-to-r from-brand-600 via-brand-500 to-brand-700 bg-clip-text text-transparent [-webkit-text-fill-color:transparent]"
                  />
                </span>
              </h1>
            </PixelDisintegrate>

            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.62 }}
              className="mx-auto mt-7 max-w-2xl text-balance text-[17px] leading-relaxed text-slate-body sm:text-[19px]"
            >
              Boost your website&apos;s authority, outrank competitors, and drive targeted
              traffic — with editorial backlinks you could show anyone.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.76 }}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Magnetic strength={0.3}>
                <Link
                  href="/pricing"
                  data-cursor-text="See plans"
                  className="group inline-flex h-14 items-center gap-2 rounded-full bg-brand-600 px-8 text-base font-medium text-white shadow-[0_16px_40px_-14px_rgba(196,42,53,0.85)] transition-all duration-400 hover:bg-brand-700"
                >
                  Build My Links
                  <ArrowRight className="h-4.5 w-4.5 transition-transform duration-400 group-hover:translate-x-1.5" />
                </Link>
              </Magnetic>
              <Magnetic strength={0.22}>
                <Link
                  href="/contact"
                  className="glass-strong inline-flex h-14 items-center rounded-full px-8 text-base font-medium text-ink transition-all duration-400 hover:bg-white"
                >
                  Contact Us
                </Link>
              </Magnetic>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.9 }}
              className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
            >
              {trustBadges.map((b) => (
                <li key={b.label} className="flex items-center gap-2 text-[13.5px] text-slate-body">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {b.label}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 1 }}
            className="mx-auto mt-16 grid max-w-4xl gap-3 sm:grid-cols-3"
          >
            <StatCard value={347} suffix="%" label="Average traffic growth" sub="TechFlow, 6 months" />
            <StatCard value={1200} suffix="+" label="Editorial links placed" sub="Across 300+ campaigns" />
            <StatCard value={14} suffix=" days" label="To first placements" sub="From campaign kickoff" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

function StatCard({
  value,
  suffix,
  label,
  sub,
}: {
  value: number;
  suffix: string;
  label: string;
  sub: string;
}) {
  return (
    <div className="glass-card group rounded-3xl p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-[0_28px_70px_-30px_rgba(196,42,53,0.5)]">
      <p className="display text-[clamp(2rem,4vw,2.6rem)] text-brand-700">
        <Counter value={value} suffix={suffix} />
      </p>
      <p className="mt-2 text-[14.5px] font-medium text-ink">{label}</p>
      <p className="mt-0.5 text-[12.5px] text-muted">{sub}</p>
    </div>
  );
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* The hero photograph, given real presence rather than buried under
          stacked scrims — a slow one-time Ken Burns settle on mount, tuned
          to keep the diagonal glass streak and the deep blue field visible
          in the frame around the text column. */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
        className="absolute inset-0"
      >
        <Image
          src="/hero-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-[66%_38%] sm:object-[70%_35%]"
        />
      </motion.div>

      {/* One tuned vignette — near-opaque behind the headline, sheer at the
          edges — replaces the old three stacked white layers so the photo's
          own light does the work instead of fighting a flat wash. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 60% at 50% 32%, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.88) 34%, rgba(255,255,255,0.55) 62%, rgba(255,255,255,0.18) 100%)",
        }}
      />
      {/* Clean hand-off into the next section, kept late so the photo still
          shows through behind the stat cards' glass. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />

      {/* A single accent glow, off-centre from the vignette so it reads as
          depth rather than duplicating the photo's own highlight. */}
      <motion.div
        animate={{ y: [0, -24, 0], x: [0, 16, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-6 right-[4%] h-[380px] w-[380px] rounded-full bg-brand-200/35 blur-[130px]"
      />

      {/* Fine grid, blended into the photo's tones rather than flatly
          stacked on top of it. */}
      <div
        className="absolute inset-0 opacity-[0.4] mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(31,20,21,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,20,21,0.06) 1px, transparent 1px)",
          backgroundSize: "68px 68px",
          maskImage: "radial-gradient(ellipse 90% 60% at 50% 0%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 60% at 50% 0%, #000 20%, transparent 75%)",
        }}
      />
    </div>
  );
}
