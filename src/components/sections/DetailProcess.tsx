"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Container, Section, SectionHeading } from "@/components/ui/Section";

const EASE = [0.16, 1, 0.3, 1] as const;

/** A per-service process (title + body per step), rendered as a single
 *  narrow reading column with a spine down the left edge — the same proven
 *  layout as ApproachTimeline (a flex row, badge as a normal flow sibling of
 *  the text, never absolutely positioned against it). Process.tsx's
 *  alternating left/right layout is what produced the badge-over-title
 *  overlap on "02"/"04"; this deliberately avoids that shape rather than
 *  reusing it, since a single column can't develop the same class conflict. */
export default function DetailProcess({
  title,
  intro,
  steps,
}: {
  title: string;
  intro: string;
  steps: { title: string; body: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  // scaleY, not height: a height motion value forces layout reflow on every
  // scroll-driven frame. The track div is already full-height (top-2
  // bottom-2, matching the static line beneath it); scaleY from an
  // `origin-top` transform is GPU-composited, so it stays smooth.
  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 120,
    damping: 28,
  });

  return (
    <Section>
      <Container>
        <SectionHeading title={title} body={intro} align="center" />

        <div ref={ref} className="relative mx-auto mt-14 max-w-2xl">
          <div className="absolute top-2 bottom-2 left-6 w-px bg-mist-300" />
          <motion.div
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-6 w-px origin-top bg-gradient-to-b from-brand-400 to-brand-700"
          />

          <ol className="space-y-10">
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
                className="relative flex gap-6"
              >
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[13px] font-semibold text-brand-700 shadow-[0_12px_30px_-14px_rgba(196,42,53,0.55)] ring-1 ring-mist-200">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1.5">
                  <h3 className="display text-[19px] text-ink sm:text-[21px]">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-body">{step.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
