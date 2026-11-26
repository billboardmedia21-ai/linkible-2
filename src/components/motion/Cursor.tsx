"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

type Mode = "default" | "link" | "text" | "drag";

export default function Cursor() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reducedMotion;
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 55, mass: 0.45 });
  const sy = useSpring(y, { stiffness: 900, damping: 55, mass: 0.45 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const el = (e.target as HTMLElement)?.closest?.(
        "[data-cursor-text],a,button,input,textarea,select,[role='button']",
      ) as HTMLElement | null;

      if (!el) {
        setMode("default");
        setLabel("");
        return;
      }

      const text = el.getAttribute("data-cursor-text");
      if (text) {
        setMode("text");
        setLabel(text);
        return;
      }
      if (el.matches("input,textarea,select")) {
        setMode("drag");
        setLabel("");
        return;
      }
      setMode("link");
      setLabel("");
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [enabled, x, y]);

  // Hide the system pointer while the spade is active (but keep it over form
  // fields, where the I-beam matters).
  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("spade-cursor");
    return () => document.documentElement.classList.remove("spade-cursor");
  }, [enabled]);

  if (!enabled) return null;

  const size = mode === "text" ? 84 : mode === "link" ? 40 : 24;
  const fill = mode === "text" ? "#c42a35" : mode === "link" ? "#f4b928" : "var(--color-ink)";
  const stroke = mode === "default" ? "#f4b928" : "var(--color-ink)";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[999] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          opacity: visible && mode !== "drag" ? 1 : 0,
          rotate: mode === "link" ? -10 : 0,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.6 }}
        style={{ filter: "drop-shadow(0 2px 0 rgba(31,20,21,0.35))" }}
      >
        <svg viewBox="-21 -19 42 46" className="absolute inset-0 h-full w-full overflow-visible">
          <path
            d="M0 -15 C 9 -5 17 1 17 9 C 17 15 11 18 5.5 15 C 6.5 20 8.5 22.5 11 25 L -11 25 C -8.5 22.5 -6.5 20 -5.5 15 C -11 18 -17 15 -17 9 C -17 1 -9 -5 0 -15 Z"
            style={{ fill, stroke, transition: "fill 0.2s, stroke 0.2s" }}
            strokeWidth={mode === "default" ? 1.6 : 1.8}
            strokeLinejoin="round"
          />
        </svg>
        <AnimatePresence>
          {mode === "text" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="relative -mt-1 max-w-[62%] text-center text-[10px] leading-tight font-extrabold tracking-[0.1em] text-white uppercase"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
