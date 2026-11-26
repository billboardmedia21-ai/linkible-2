"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

// Flipped once this component has mounted in the browser. Module-level rather
// than React state so reading it during render is stable and lint-clean; it is
// never set on the server, so SSR and the first client render agree.
let hasMounted = false;

/** Content half of the b2design-style route transition: a quick cross-fade
 *  keyed by pathname, synced with RouteFlash's colour pulse (see that file
 *  for the reasoning — this mirrors swup's `is-changing` opacity swap). */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    hasMounted = true;
  }, []);

  return (
    // NOT initial={false} here. On AnimatePresence that prop cascades through
    // context to EVERY motion component inside <main>, telling them all to skip
    // their own `initial` state on the first render — so on any hard load or
    // refresh the hero headline, every whileInView reveal and every stagger
    // rendered fully visible and never animated (server HTML came out as
    // `opacity:1;transform:none`). Only client-side navigations played them.
    // Skipping the page-shell fade on first load is done per-element below.
    <AnimatePresence mode="wait">
      {/* Renders the actual <main>, not a wrapper div: it must stay the
          flex-1 item directly under <body> for the sticky footer to work. */}
      <motion.main
        key={pathname}
        className="flex-1"
        initial={hasMounted ? { opacity: 0, y: 16 } : false}
        animate={{
          opacity: 1,
          y: 0,
          // No filter on the way IN, deliberately. Motion cannot interpolate
          // blur(6px) -> none, so it settles on `blur(0px)`, and any
          // non-`none` filter on <main> makes it a containing block that
          // silently breaks position:sticky for every descendant (the
          // case-study story rail, the legal-page TOC). A hard load never
          // showed this (no enter animation runs there), which is how an
          // earlier "fix" looked fine; client-side navigation is what
          // exposed it. Opacity + rise gives the same arrival without it.
          // Starts mid-way through RouteFlash's hold (see that file's shared
          // timing budget), so the incoming page eases in gently while the
          // blue wash is still covering the seam — no blank gap, no snap.
          // ~1.2s from click to fully settled: smooth, not sluggish.
          transition: { duration: 0.7, ease: EASE, delay: 0.12 },
        }}
        exit={{
          opacity: 0,
          y: -12,
          filter: "blur(6px)",
          transition: { duration: 0.38, ease: EASE },
        }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
