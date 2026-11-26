import { C } from "./palette";
import { SUIT_PATH, type Suit } from "./suits";

/** A face-up playing card centred on the origin (60 × 84). */
export function PlayingCard({
  rank,
  suit = "spade",
  w = 60,
  h = 84,
}: {
  rank: string;
  suit?: Suit;
  w?: number;
  h?: number;
}) {
  const red = suit === "heart" || suit === "diamond";
  const fill = red ? C.RED : C.INK;
  const hw = w / 2;
  const hh = h / 2;
  const k = w / 60;
  return (
    <g>
      <rect x={-hw} y={-hh} width={w} height={h} rx={7 * k} fill="#fffdf8" stroke={C.INK} strokeWidth={2.6} />
      <rect x={-hw + 5 * k} y={-hh + 5 * k} width={w - 10 * k} height={h - 10 * k} rx={3.5 * k} fill="none" stroke={C.GOLD} strokeWidth={1.2} />
      <text
        x={-hw + 8 * k}
        y={-hh + 22 * k}
        fontSize={15 * k}
        fontWeight={900}
        fill={fill}
        fontFamily="var(--font-display), system-ui, sans-serif"
      >
        {rank}
      </text>
      <path d={SUIT_PATH[suit]} transform={`translate(${-hw + 14 * k} ${-hh + 33 * k}) scale(${0.27 * k})`} fill={fill} />
      <path d={SUIT_PATH[suit]} transform={`translate(0 ${2 * k}) scale(${1.15 * k})`} fill={fill} />
      <g transform="rotate(180)">
        <text x={-hw + 8 * k} y={-hh + 22 * k} fontSize={15 * k} fontWeight={900} fill={fill} fontFamily="var(--font-display), system-ui, sans-serif">
          {rank}
        </text>
      </g>
    </g>
  );
}

/** A card back centred on the origin. */
export function CardBack({ w = 60, h = 84 }: { w?: number; h?: number }) {
  const hw = w / 2;
  const hh = h / 2;
  return (
    <g>
      <rect x={-hw} y={-hh} width={w} height={h} rx={7} fill={C.RED} stroke={C.INK} strokeWidth={2.6} />
      <rect x={-hw + 5} y={-hh + 5} width={w - 10} height={h - 10} rx={3.5} fill="none" stroke={C.GOLD} strokeWidth={1.6} />
      <path d={`M0 ${-hh * 0.45} L ${hw * 0.5} 0 L 0 ${hh * 0.45} L ${-hw * 0.5} 0 Z`} fill={C.GOLD} stroke={C.INK} strokeWidth={1.6} strokeLinejoin="round" />
      <path d="M 0 -6 C 3 -2 7 0 7 3 C 7 5.5 4.5 7 2.2 5.6 C 2.8 8 3.5 9 4.5 10 L -4.5 10 C -3.5 9 -2.8 8 -2.2 5.6 C -4.5 7 -7 5.5 -7 3 C -7 0 -3 -2 0 -6 Z" fill={C.INK} />
    </g>
  );
}
