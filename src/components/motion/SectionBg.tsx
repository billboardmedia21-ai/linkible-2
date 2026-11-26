"use client";

import { useEffect, useRef } from "react";
import { useInView } from "motion/react";

/** Mirrors b2design's data-bgcolor: page background shifts as sections enter. */
export default function SectionBg({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) {
      document.documentElement.style.setProperty("--page-bg", color);
    }
  }, [inView, color]);

  return <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10" />;
}
