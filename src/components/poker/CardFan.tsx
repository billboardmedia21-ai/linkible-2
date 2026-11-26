import { C } from "./palette";
import { PlayingCard } from "./PlayingCard";

const HAND = [
  { rank: "10", suit: "spade" as const },
  { rank: "J", suit: "spade" as const },
  { rank: "Q", suit: "spade" as const },
  { rank: "K", suit: "spade" as const },
  { rank: "A", suit: "spade" as const },
];

/** A fanned hand of cards that spreads wider on hover. ViewBox 0 0 360 260. */
export default function CardFan({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 260" className={`card-fan ${className ?? ""}`} role="img" aria-label="A fanned hand of spade cards" style={{ overflow: "visible" }}>
      <ellipse cx={180} cy={246} rx={120} ry={9} fill={C.INK} opacity={0.15} />
      {HAND.map((c, i) => (
        <g key={c.rank} transform="translate(180 330)">
          <g className="fan-card" style={{ ["--a" as string]: `${(i - 2) * 17}deg`, ["--a2" as string]: `${(i - 2) * 25}deg`, ["--i" as string]: i }}>
            <g transform="translate(0 -190)">
              <PlayingCard rank={c.rank} suit={c.suit} w={72} h={100} />
            </g>
          </g>
        </g>
      ))}
    </svg>
  );
}
