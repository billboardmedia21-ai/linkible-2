import { C } from "./palette";
import { Chip, CHIP_H, ChipStack, type ChipColor } from "./Chips";

type StackDef = { cx: number; baseY: number; scale: number; colors: ChipColor[]; pattern: [ChipColor, ChipColor] };
const STACKS: Record<string, StackDef> = {
  tall: { cx: 282, baseY: 430, scale: 1.08, colors: ["gold", "ink", "gold", "ink", "gold", "ink", "gold", "ink", "gold"], pattern: ["ink", "gold"] },
  left: { cx: 128, baseY: 452, scale: 1, colors: ["red", "ivory", "red", "ivory", "red", "ivory"], pattern: ["red", "ivory"] },
  right: { cx: 436, baseY: 452, scale: 1, colors: ["ink", "red", "ink", "red", "gold"], pattern: ["ink", "red"] },
  midL: { cx: 210, baseY: 476, scale: 0.9, colors: ["gold", "red", "gold"], pattern: ["red", "gold"] },
  midR: { cx: 356, baseY: 478, scale: 0.9, colors: ["ivory", "ink", "ivory", "ink"], pattern: ["ivory", "ink"] },
};

/** Chips drop onto these stacks in this order, one after another. */
const ORDER = ["tall", "left", "right", "midL", "midR", "tall", "left", "right", "tall"];
const CYCLE = 11; // seconds for one full round before the stacks reset
const STEP = 8; // % of the cycle between chips

const landed: Record<string, number> = {};
const DROPS = ORDER.map((id, i) => {
  const st = STACKS[id];
  const k = landed[id] ?? 0;
  landed[id] = k + 1;
  const n = st.colors.length + k; // chips already beneath this one
  const color = st.pattern[(st.colors.length + k) % 2];
  const from = Math.round(n * CHIP_H - st.baseY / st.scale - 70);
  const tilt = i % 2 ? 16 : -16;
  return { id, st, n, color, from, tilt, i };
});

// One keyframe set per chip so every chip shares ONE global timeline:
// drop in turn, stay on its stack, and all vanish together to restart.
const KEYFRAMES = DROPS.map((d) => {
  const s = d.i * STEP;
  return `@keyframes chipfall-${d.i}{0%,${s}%{opacity:0;transform:translateY(var(--from)) rotate(var(--tilt))}${s + 1}%{opacity:1;transform:translateY(calc(var(--from) * .94)) rotate(var(--tilt));animation-timing-function:cubic-bezier(.55,0,.9,.55)}${s + 7}%{opacity:1;transform:translateY(0) rotate(0deg);animation-timing-function:ease-out}${s + 8.5}%{transform:translateY(-9px) rotate(0deg);animation-timing-function:ease-in}${s + 10}%{transform:translateY(0) rotate(0deg)}90%{opacity:1;transform:translateY(0)}97%,100%{opacity:0;transform:translateY(0)}}`;
}).join("");

/** Stacks of chips; more chips drop onto them one after another. ViewBox 0 0 560 520. */
export default function ChipsScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 520"
      className={className}
      role="img"
      aria-label="Stacks of casino chips with gold coins dropping onto them one after another"
      style={{ overflow: "visible" }}
    >
      <g transform="translate(280 250)">
        <circle r={246} fill={C.GOLD_L} opacity={0.26} />
        <circle r={246} fill="none" stroke={C.GOLD} strokeWidth={9} />
        <circle className="spin-slow" r={222} fill="none" stroke={C.GOLD_D} strokeWidth={2.4} strokeDasharray="1 13" strokeLinecap="round" />
      </g>

      {/* floor shadows */}
      <ellipse cx={280} cy={478} rx={236} ry={16} fill={C.INK} opacity={0.15} />

      {/* the base stacks */}
      {Object.entries(STACKS).map(([id, st]) => (
        <ChipStack key={id} cx={st.cx} baseY={st.baseY} scale={st.scale} colors={st.colors} />
      ))}

      {/* loose chip leaning at the front */}
      <g transform="translate(284 482) rotate(-8)">
        <ellipse cx={0} cy={0} rx={30} ry={11} fill={C.RED} stroke={C.INK} strokeWidth={2.4} />
        <ellipse cx={0} cy={0} rx={20} ry={7} fill="none" stroke={C.IVORY} strokeWidth={2} strokeDasharray="4 3" />
        <ellipse cx={0} cy={0} rx={11} ry={4} fill={C.IVORY} stroke={C.INK} strokeWidth={1.4} />
      </g>

      {/* chips dropping onto the stacks — the very same chips, so the stacks grow */}
      <style>{KEYFRAMES}</style>
      {DROPS.map((d) => (
        <g key={d.i} transform={`translate(${d.st.cx} ${d.st.baseY}) scale(${d.st.scale})`}>
          <g
            className="chip-fall"
            style={{
              ["--from" as string]: `${d.from}px`,
              ["--tilt" as string]: `${d.tilt}deg`,
              animationName: `chipfall-${d.i}`,
            }}
          >
            <Chip y={-d.n * CHIP_H} color={d.color} top />
          </g>
        </g>
      ))}

      {/* sparkles */}
      {[
        [96, 150, 0],
        [472, 120, 0.7],
        [506, 300, 1.3],
        [60, 330, 0.4],
        [350, 40, 1],
      ].map(([x, y, d], i) => (
        <path
          key={i}
          className="spark"
          style={{ animationDelay: `${d}s` }}
          d={`M${x} ${Number(y) - 13} Q${x} ${y} ${Number(x) + 13} ${y} Q${x} ${y} ${x} ${Number(y) + 13} Q${x} ${y} ${Number(x) - 13} ${y} Q${x} ${y} ${x} ${Number(y) - 13} Z`}
          fill={C.GOLD_L}
          stroke={C.INK}
          strokeWidth={1.4}
        />
      ))}
    </svg>
  );
}
