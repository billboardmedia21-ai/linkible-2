"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { process } from "@/data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 65%"],
  });
  // scaleY, not height: a height motion value forces a layout reflow on
  // every scroll-driven frame, since `height` is a layout-triggering CSS
  // property. The track div is already sized to its full extent (top-2
  // bottom-2, same as the static background line beneath it); animating
  // scaleY from an `origin-top` transform is GPU-composited and free of
  // layout/paint cost, so the fill stays smooth even on a throttled device.
  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 120,
    damping: 28,
  });

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Proven process"
          title="Five steps, run the same way every time"
          body="No black box. You see the prospect list before outreach, the drafts before submission, and every placement the day it goes live."
          align="center"
        />

        <div ref={ref} className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute top-2 bottom-2 left-[27px] w-px bg-mist-300 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-[27px] w-px origin-top bg-gradient-to-b from-brand-400 to-brand-700 md:left-1/2 md:-translate-x-1/2"
          />

          <ul className="space-y-10 md:space-y-16">
            {process.map((s, i) => (
              <motion.li
                key={s.step}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.8, ease: EASE }}
                className={`relative pl-[70px] md:w-1/2 md:pl-0 ${
                  i % 2 === 0 ? "md:pr-14 md:text-right" : "md:ml-auto md:pl-14"
                }`}
              >
                <span
                  // Odd items must NOT also carry `md:left-auto` here: the base
                  // `left-0` below is already the value they want at md (their
                  // li sits in the right column via ml-auto, so its own left
                  // edge IS the centreline) — adding a second `md:` utility
                  // that touches `left` made two classes fight over the same
                  // property, and which one wins is undefined by source order.
                  // That's what put the badge on top of the title for "02"
                  // and "04": the browser was free to pick `left-auto`,
                  // which resolves (with `right` never set) to the element's
                  // static position — right at the start of the li's own
                  // flow, under the heading text.
                  className={`absolute top-0 left-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[13px] font-semibold tracking-wide text-brand-700 shadow-[0_12px_30px_-14px_rgba(196,42,53,0.55)] ring-1 ring-mist-200 md:top-1 ${
                    i % 2 === 0
                      ? "md:left-auto md:right-0 md:translate-x-1/2"
                      : "md:-translate-x-1/2"
                  }`}
                >
                  {s.step}
                </span>
                <h3 className="display text-[24px] text-ink md:text-[27px]">{s.title}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-slate-body">{s.body}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
