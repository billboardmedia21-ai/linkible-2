"use client";

import { Fragment, useState } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Ease-out-expo — the same curve the design language uses everywhere. */
const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/*  Block reveals: fade (default) and wipe                             */
/* ------------------------------------------------------------------ */

// Wipe runs a clip-path left → right. The end state uses NEGATIVE insets
// (all in % so Motion can interpolate them) instead of inset(0), because a
// plain inset(0) permanently clips anything painting outside the box —
// box-shadows, blurred glows, the hover-lift of cards inside — even after
// the reveal has finished.
const WIPE_FROM = "inset(-20% 100% -20% -10%)";
const WIPE_TO = "inset(-20% -10% -20% -10%)";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  variant?: "fade" | "wipe";
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
  variant = "fade",
}: Props) {
  if (variant === "wipe") {
    // The observer must NOT sit on the element that carries the clip-path:
    // Chromium's IntersectionObserver measures the clipped area, so an
    // element whose clip-path hides all of it never reports as visible — and
    // so never gets revealed. The outer wrapper is unclipped and does the
    // observing; the inner one carries the wipe via a propagated variant.
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: "-10% 0px -10% 0px" }}
      >
        <motion.div
          className="reveal-wipe"
          variants={{
            hidden: { clipPath: WIPE_FROM },
            show: { clipPath: WIPE_TO, transition: { duration: 1.15, ease: EASE, delay } },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.95, ease: EASE } },
};

export function Stagger({
  children,
  className,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Headline reveals: rotated mask rise                                */
/* ------------------------------------------------------------------ */
//
// Each word (or the whole line, for LineReveal) sits in a mask and rises
// from below with a slight rotation — the same "emerging from a slit"
// motion as the reference — over ~1s with a per-word stagger.
//
// The mask is deliberately generous on ALL four sides: 0.22em top/bottom
// for ascenders and descenders, 0.08em left/right for the overhang that
// negative letter-spacing leaves on a word's last glyph. Matching negative
// margins cancel the padding out, so layout is exactly what it would be
// with no mask at all. And once the last word has finished rising, the mask
// stops clipping altogether (overflow goes back to visible) — after that
// nothing on the page can cut a glyph, whatever the browser or GPU does.
//
// The hidden state travels 130% (not 100%): a word must be fully below the
// mask's padded bottom edge, or the tip of a tall ascender would peek out.

const MASK_STYLE = {
  padding: "0.22em 0.08em",
  margin: "-0.22em -0.08em",
} as const;

const RISE_VARIANTS: Variants = {
  hidden: { y: "130%", rotate: 2, opacity: 0 },
  show: {
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: {
      y: { duration: 1.05, ease: EASE },
      rotate: { duration: 1.05, ease: EASE },
      opacity: { duration: 0.3, ease: "easeOut" },
    },
  },
};

/** Word-by-word headline reveal. */
export function TextReveal({
  text,
  className,
  delay = 0,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const words = text.split(" ");
  const [settled, setSettled] = useState(false);
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.05, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            className={cn("inline-block align-bottom", !settled && "overflow-hidden")}
            style={MASK_STYLE}
            aria-hidden
          >
            <motion.span
              className="inline-block"
              style={{ transformOrigin: "0% 100%" }}
              variants={RISE_VARIANTS}
              // Only the last word reports completion — every earlier word
              // has a shorter stagger delay, so it has finished by then.
              onAnimationComplete={i === words.length - 1 ? () => setSettled(true) : undefined}
            >
              {word}
            </motion.span>
          </span>
          {/* A real, breakable space between words — a non-breaking space
              here leaves the line unwrappable and overflows phones. */}
          {i < words.length - 1 ? <span aria-hidden> </span> : null}
        </Fragment>
      ))}
    </motion.span>
  );
}

/** Whole-line reveal. Use when the line carries a background-clip gradient:
 *  bg-clip-text must live on the transformed element itself, not an ancestor. */
export function LineReveal({
  text,
  className,
  delay = 0,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const [settled, setSettled] = useState(false);
  return (
    <motion.span
      className={cn("inline-block align-bottom", !settled && "overflow-hidden")}
      style={MASK_STYLE}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px" }}
      variants={{ hidden: {}, show: { transition: { delayChildren: delay } } }}
    >
      <motion.span
        className={cn("inline-block", className)}
        style={{ transformOrigin: "0% 100%" }}
        variants={RISE_VARIANTS}
        onAnimationComplete={() => setSettled(true)}
      >
        {text}
      </motion.span>
    </motion.span>
  );
}
