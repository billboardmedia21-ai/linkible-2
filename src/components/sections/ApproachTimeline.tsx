"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** A single narrow reading column, so the connecting line runs straight
 *  down the left edge — the alternating layout Process.tsx uses would
 *  fight the article's max-[68ch] measure here. */
export default function ApproachTimeline({ steps }: { steps: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 70%"],
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
    <div ref={ref} className="relative mt-8">
      <div className="absolute top-2 bottom-2 left-[17px] w-px bg-mist-300" />
      <motion.div
        style={{ scaleY }}
        className="absolute top-2 bottom-2 left-[17px] w-px origin-top bg-gradient-to-b from-brand-400 to-brand-700"
      />

      <ol className="space-y-8">
        {steps.map((step, i) => (
          <motion.li
            key={step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
            className="group relative flex gap-5 pl-0"
          >
            <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[12.5px] font-semibold text-brand-700 ring-1 ring-mist-300 transition-colors duration-500 group-hover:bg-brand-600 group-hover:text-white group-hover:ring-brand-600">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="pt-1 text-[16px] leading-relaxed text-slate-body">{step}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
