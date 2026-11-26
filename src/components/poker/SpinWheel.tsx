"use client";

import { useEffect, useId, useRef, useState } from "react";
import { animate } from "motion/react";
import { C } from "./palette";
import { SPADE, DIAMOND } from "./suits";
import { Button } from "@/components/ui/Button";

const CX = 260;
const N = 24;
const STEP = 360 / N;
const R_OUT = 176;
const R_IN = 118;
const R_TRACK = 199;
const R_POCKET = 150;
const NUMS = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1];

const f = (n: number) => n.toFixed(2);
const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return `${f(CX + r * Math.sin(a))} ${f(CX - r * Math.cos(a))}`;
};
const wedge = (i: number) => {
  const a0 = i * STEP;
  const a1 = (i + 1) * STEP;
  return `M ${polar(R_OUT, a0)} A ${R_OUT} ${R_OUT} 0 0 1 ${polar(R_OUT, a1)} L ${polar(R_IN, a1)} A ${R_IN} ${R_IN} 0 0 0 ${polar(R_IN, a0)} Z`;
};
const pocketColor = (i: number) => (i === 0 ? "gold" : i % 2 ? "red" : "black");
const mod = (n: number, m: number) => ((n % m) + m) % m;

/** An interactive roulette wheel. Idles slowly; click it (or the button) to spin. */
export default function SpinWheel({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const gold = `gold-${uid}`;
  const cone = `cone-${uid}`;
  const wheelRef = useRef<SVGGElement>(null);
  const ballRef = useRef<SVGGElement>(null);
  const ballDot = useRef<SVGCircleElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const st = useRef({ wheel: 0, ball: 0, r: R_TRACK, spinning: false, visible: true });
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<{ n: number; color: string } | null>(null);

  const apply = () => {
    const s = st.current;
    wheelRef.current?.setAttribute("transform", `rotate(${f(s.wheel)} ${CX} ${CX})`);
    ballRef.current?.setAttribute("transform", `rotate(${f(s.ball)} ${CX} ${CX})`);
    ballDot.current?.setAttribute("cy", f(CX - s.r));
  };

  // Idle drift, paused when off-screen or while a spin is running.
  useEffect(() => {
    const el = wrap.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => (st.current.visible = e.isIntersecting), { threshold: 0.05 });
    if (el) io.observe(el);
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const s = st.current;
      if (!s.spinning && s.visible && !reduce) {
        s.wheel += dt * 7;
        s.ball -= dt * 30;
        apply();
      }
      raf = requestAnimationFrame(loop);
    };
    apply();
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const spin = () => {
    const s = st.current;
    if (s.spinning) return;
    s.spinning = true;
    setSpinning(true);
    setResult(null);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const w0 = s.wheel;
    const wEnd = w0 + 720 + Math.random() * 360;
    const pocket = Math.floor(Math.random() * N);
    const target = wEnd + (pocket + 0.5) * STEP;
    const b0 = s.ball;
    const base = b0 - 1440;
    const ballEnd = base - mod(base - target, 360);
    const smooth = (t: number) => {
      const x = Math.min(1, Math.max(0, t));
      return x * x * (3 - 2 * x);
    };
    animate(0, 1, {
      duration: reduce ? 0.01 : 6.2,
      ease: [0.16, 0.6, 0.25, 1],
      onUpdate: (p) => {
        s.wheel = w0 + (wEnd - w0) * p;
        s.ball = b0 + (ballEnd - b0) * p;
        const d = smooth((p - 0.6) / 0.34);
        s.r = R_TRACK - (R_TRACK - R_POCKET) * d + Math.sin(d * Math.PI * 3) * (1 - d) * 7;
        apply();
      },
      onComplete: () => {
        s.spinning = false;
        setSpinning(false);
        setResult({ n: NUMS[pocket], color: pocketColor(pocket) });
      },
    });
  };

  return (
    <div ref={wrap} className={className}>
      <div
        role="button"
        tabIndex={0}
        aria-label="Spin the roulette wheel"
        data-cursor-text="Spin"
        onClick={spin}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && spin()}
        className="mx-auto block w-full max-w-[520px] cursor-pointer outline-none focus-visible:rounded-full focus-visible:ring-4 focus-visible:ring-gold-400"
      >
        <svg viewBox="0 0 520 520" className="block w-full" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id={gold} x1="0" y1="0" x2="0.5" y2="1">
              <stop offset="0" stopColor={C.GOLD_L} />
              <stop offset="0.55" stopColor={C.GOLD} />
              <stop offset="1" stopColor={C.GOLD_D} />
            </linearGradient>
            <radialGradient id={cone} cx="50%" cy="40%" r="70%">
              <stop offset="0" stopColor={C.IVORY} />
              <stop offset="1" stopColor="#e6c987" />
            </radialGradient>
          </defs>

          <circle cx={CX} cy={CX} r={256} fill={C.GOLD_L} opacity={0.22} />
          <ellipse cx={CX} cy={508} rx={190} ry={9} fill={C.INK} opacity={0.14} />

          {/* wooden bowl */}
          <circle cx={CX} cy={CX} r={240} fill={C.WOOD} stroke={C.INK} strokeWidth={3.4} />
          <circle cx={CX} cy={CX} r={229} fill="none" stroke={`url(#${gold})`} strokeWidth={6} />
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i} transform={`rotate(${i * 45 + 22.5} ${CX} ${CX})`}>
              <path d={DIAMOND} transform={`translate(${CX} ${CX - 235}) scale(0.5)`} fill={C.IVORY} stroke={C.INK} strokeWidth={3.4} />
            </g>
          ))}
          {/* ball track */}
          <circle cx={CX} cy={CX} r={215} fill={C.DARK} stroke={C.INK} strokeWidth={2.4} />
          <circle cx={CX} cy={CX} r={186} fill={C.DARK_2} stroke={C.INK} strokeWidth={2.4} />
          <circle cx={CX} cy={CX} r={R_TRACK} fill="none" stroke={C.GOLD_D} strokeWidth={1.4} strokeDasharray="2 7" strokeLinecap="round" />

          {/* pockets + cone: the part that turns */}
          <g ref={wheelRef}>
            {Array.from({ length: N }, (_, i) => {
              const c = pocketColor(i);
              const mid = (i + 0.5) * STEP;
              return (
                <g key={i}>
                  <path d={wedge(i)} fill={c === "gold" ? C.GOLD : c === "red" ? C.RED : C.DARK} stroke={C.GOLD} strokeWidth={1.6} strokeLinejoin="round" />
                  <g transform={`rotate(${f(mid)} ${CX} ${CX})`}>
                    <text
                      x={CX}
                      y={CX - R_POCKET - 8}
                      textAnchor="middle"
                      fontSize={13}
                      fontWeight={800}
                      fill={c === "gold" ? C.INK : C.IVORY}
                      fontFamily="var(--font-display), system-ui, sans-serif"
                    >
                      {NUMS[i]}
                    </text>
                  </g>
                </g>
              );
            })}
            <circle cx={CX} cy={CX} r={R_IN} fill="none" stroke={`url(#${gold})`} strokeWidth={7} />
            <circle cx={CX} cy={CX} r={R_IN - 4} fill={`url(#${cone})`} stroke={C.INK} strokeWidth={2.4} />
            <circle cx={CX} cy={CX} r={84} fill="none" stroke={C.GOLD_D} strokeWidth={1.6} strokeDasharray="1 6" strokeLinecap="round" />
            {[0, 90].map((a) => (
              <g key={a} transform={`rotate(${a} ${CX} ${CX})`}>
                <rect x={CX - 5} y={CX - 82} width={10} height={164} rx={5} fill={`url(#${gold})`} stroke={C.INK} strokeWidth={2.2} />
                <circle cx={CX} cy={CX - 82} r={8} fill={`url(#${gold})`} stroke={C.INK} strokeWidth={2.2} />
                <circle cx={CX} cy={CX + 82} r={8} fill={`url(#${gold})`} stroke={C.INK} strokeWidth={2.2} />
              </g>
            ))}
            <circle cx={CX} cy={CX} r={26} fill={`url(#${gold})`} stroke={C.INK} strokeWidth={3} />
            <path d={SPADE} transform={`translate(${CX} ${CX - 1}) scale(0.7)`} fill={C.INK} />
          </g>

          {/* the ball */}
          <g ref={ballRef}>
            <circle ref={ballDot} cx={CX} cy={CX - R_TRACK} r={7.5} fill={C.IVORY} stroke={C.INK} strokeWidth={2.2} />
          </g>
          <g>
            <circle cx={CX} cy={CX} r={0} />
          </g>
        </svg>
      </div>

      <div className="mt-5 flex flex-col items-center gap-3">
        <Button onClick={spin} disabled={spinning} variant="light" size="md" data-cursor-text="Spin">
          {spinning ? "Spinning…" : "Spin the wheel"}
        </Button>
        <p aria-live="polite" className="h-6 text-[14px] font-extrabold text-ink">
          {result && (
            <>
              Landed on <span className={result.color === "red" ? "text-brand-600" : result.color === "gold" ? "text-gold-600" : ""}>{result.color} {result.n}</span>
              {" "}— feeling lucky?
            </>
          )}
        </p>
      </div>
    </div>
  );
}
