"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Honours the OS "reduce motion" setting for JS-driven animation.
 *  CSS duration overrides cannot reach motion/react, so this is the only
 *  place transform-based reveals get switched off for users who ask. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6 }}>
      {children}
    </MotionConfig>
  );
}
