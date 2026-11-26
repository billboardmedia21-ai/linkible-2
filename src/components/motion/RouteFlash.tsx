"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { SPADE } from "@/components/poker/suits";

const COLS = 8;
const ROWS = 5;

/** Route transition: a deck of card backs flips across the screen, covers the
 *  page swap, then flips away again (a "shuffle" wipe). Timing is kept in step
 *  with PageTransition's exit/enter so the swap happens while fully covered. */
export default function RouteFlash() {
  const pathname = usePathname();
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [key, setKey] = useState(0);
  // Compare against the previous pathname instead of a "first run" flag: React
  // StrictMode runs effects twice on mount in dev, which a flag mistakes for a
  // navigation.
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    setKey((k) => k + 1);
  }, [pathname]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {key > 0 && (
        <motion.div
          key={key}
          aria-hidden
          data-route-flash=""
          className="pointer-events-none fixed inset-0 z-[120] grid"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            perspective: 1200,
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.01 }}
        >
          {Array.from({ length: COLS * ROWS }).map((_, i) => {
            const c = i % COLS;
            const r = Math.floor(i / COLS);
            const delay = (c * 0.035 + r * 0.05) * (r % 2 ? 1 : 0.85);
            return (
              <motion.div
                key={i}
                className="p-[3px]"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: [90, 0, 0, -90], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.25, times: [0, 0.3, 0.62, 1], ease: "easeInOut", delay }}
              >
                <CardBack />
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CardBack() {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-xl border-[3px] border-ink"
      style={{
        backgroundColor: "#b3242e",
        backgroundImage:
          "linear-gradient(45deg, rgba(255,255,255,0.09) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.09) 75%), linear-gradient(45deg, rgba(255,255,255,0.09) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.09) 75%)",
        backgroundSize: "26px 26px",
        backgroundPosition: "0 0, 13px 13px",
      }}
    >
      <div className="absolute inset-[7px] rounded-lg border-2 border-gold-400" />
      <svg viewBox="-30 -30 60 60" className="absolute inset-0 m-auto h-[46%] w-[46%] max-h-24 max-w-24">
        <path d="M0 -26 L 20 0 L 0 26 L -20 0 Z" fill="#f4b928" stroke="#2a1d1c" strokeWidth={2.4} strokeLinejoin="round" />
        <path d={SPADE} transform="translate(0 0) scale(0.55) translate(0 -4)" fill="#2a1d1c" />
      </svg>
    </div>
  );
}
