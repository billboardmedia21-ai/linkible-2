import { useId } from "react";
import { C } from "./palette";
import { ChipStack } from "./Chips";
import { PlayingCard, CardBack } from "./PlayingCard";

const ROYAL: { rank: string }[] = [{ rank: "10" }, { rank: "J" }, { rank: "Q" }, { rank: "K" }, { rank: "A" }];

/**
 * A poker table seen from a slight angle, a spade royal flush dealt across
 * the felt. Cards deal in when the scene scrolls into view (see InView).
 * ViewBox 0 0 600 450.
 */
export default function PokerTable({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const felt = `felt-${uid}`;
  const arc = `arc-${uid}`;
  return (
    <svg
      viewBox="10 150 580 300"
      className={className}
      role="img"
      aria-label="A poker table with a royal flush of spades dealt across the felt"
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id={felt} cx="50%" cy="42%" r="70%">
          <stop offset="0" stopColor={C.RED_L} />
          <stop offset="1" stopColor={C.RED_D} />
        </radialGradient>
        <path id={arc} d="M 168 262 Q 300 206 432 262" />
      </defs>

      {/* pedestal + base */}
      <ellipse cx={300} cy={420} rx={110} ry={14} fill={C.INK} opacity={0.18} />
      <path d="M246 352 H354 L368 412 H232 Z" fill={C.WOOD_D} stroke={C.INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M262 366 H338" stroke={C.GOLD} strokeWidth={4} strokeLinecap="round" />
      <ellipse cx={300} cy={414} rx={86} ry={12} fill={C.WOOD} stroke={C.INK} strokeWidth={3} />

      {/* table body */}
      <ellipse cx={300} cy={322} rx={270} ry={130} fill={C.WOOD_D} stroke={C.INK} strokeWidth={3} />
      <ellipse cx={300} cy={302} rx={270} ry={130} fill={C.WOOD} stroke={C.INK} strokeWidth={3} />
      <ellipse cx={300} cy={302} rx={257} ry={118} fill="none" stroke={C.GOLD} strokeWidth={4} />
      <ellipse cx={300} cy={302} rx={246} ry={108} fill={C.DARK} stroke={C.INK} strokeWidth={2.4} />
      {/* felt */}
      <ellipse cx={300} cy={302} rx={232} ry={97} fill={`url(#${felt})`} stroke={C.INK} strokeWidth={2.4} />
      <ellipse cx={300} cy={302} rx={190} ry={72} fill="none" stroke={C.GOLD_L} strokeWidth={2} strokeDasharray="2 9" strokeLinecap="round" />
      <text fontSize={14} fontWeight={800} letterSpacing={7} fill={C.GOLD_L} opacity={0.9} fontFamily="var(--font-display), system-ui, sans-serif">
        <textPath href={`#${arc}`} startOffset="50%" textAnchor="middle">
          STACK THE DECK
        </textPath>
      </text>

      {/* chip stacks on the rail */}
      <ChipStack cx={140} baseY={322} scale={0.42} colors={["gold", "ink", "gold"]} />
      <ChipStack cx={168} baseY={338} scale={0.42} colors={["ivory", "red", "ivory", "red"]} />
      <ChipStack cx={452} baseY={320} scale={0.42} colors={["ink", "gold", "ink", "gold", "ink"]} />
      <ChipStack cx={426} baseY={338} scale={0.42} colors={["red", "ivory", "red"]} />

      {/* dealer button */}
      <g transform="translate(212 350)">
        <ellipse cx={0} cy={4} rx={17} ry={7} fill={C.INK} opacity={0.5} />
        <ellipse cx={0} cy={0} rx={17} ry={7} fill={C.GOLD} stroke={C.INK} strokeWidth={2} />
        <text x={0} y={3.5} textAnchor="middle" fontSize={9} fontWeight={900} fill={C.INK} fontFamily="var(--font-display), system-ui, sans-serif">D</text>
      </g>

      {/* community cards: a royal flush in spades */}
      {ROYAL.map((c, i) => (
        <g key={c.rank} transform={`translate(${300 + (i - 2) * 66} ${296 + Math.abs(i - 2) * 3}) rotate(${(i - 2) * 3.2})`}>
          <g className="deal" style={{ ["--d" as string]: `${0.1 + i * 0.16}s` }}>
            <ellipse cx={2} cy={40} rx={26} ry={5} fill={C.INK} opacity={0.22} />
            <PlayingCard rank={c.rank} suit="spade" w={56} h={78} />
          </g>
        </g>
      ))}

      {/* the player's hole cards */}
      <g transform="translate(262 372) rotate(-12)">
        <g className="deal" style={{ ["--d" as string]: "1.0s" }}>
          <CardBack w={46} h={64} />
        </g>
      </g>
      <g transform="translate(298 374) rotate(7)">
        <g className="deal" style={{ ["--d" as string]: "1.15s" }}>
          <CardBack w={46} h={64} />
        </g>
      </g>

      {/* a chip tossed in */}
      <g className="chip-toss" transform="translate(330 250)">
        <ellipse cx={0} cy={0} rx={15} ry={6} fill={C.GOLD} stroke={C.INK} strokeWidth={2} />
        <ellipse cx={0} cy={0} rx={9} ry={3.4} fill="none" stroke={C.IVORY} strokeWidth={1.6} strokeDasharray="3 2" />
      </g>

      {/* sparkles */}
      {[
        [70, 170, 0],
        [540, 150, 0.8],
        [560, 330, 1.4],
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
