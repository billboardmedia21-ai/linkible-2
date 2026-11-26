"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export default function Marquee({
  children,
  speed = 34,
  reverse = false,
  className,
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`group relative flex overflow-hidden ${className ?? ""}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="flex shrink-0 items-center gap-14 py-1 pr-14"
          animate={{ x: reverse ? ["-100%", "0%"] : ["0%", "-100%"] }}
          transition={{ duration: speed, ease: "linear", repeat: Infinity }}
          aria-hidden={i === 1}
        >
          {children}
        </motion.div>
      ))}
    </div>
  );
}
