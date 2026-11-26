"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

/** Layout effect on the client, no-op during SSR (avoids the React warning). */
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 1800,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  // Render the real figure by default: it is what ships in the HTML, what a
  // crawler reads, and what a reduced-motion visitor sees. Counting up is an
  // enhancement applied on the client only when motion is welcome.
  const [display, setDisplay] = useState(value);
  const [shouldCount, setShouldCount] = useState(false);

  useIsoLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setDisplay(0);
    setShouldCount(true);
  }, []);

  useEffect(() => {
    if (!shouldCount || !inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shouldCount, inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
