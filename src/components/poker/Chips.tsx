import { C } from "./palette";
import { SPADE } from "./suits";

const RX = 54;
const RY = 18;
export const CHIP_H = 14;
const H = CHIP_H;
const f = (n: number) => n.toFixed(2);

export type ChipColor = "red" | "gold" | "ink" | "ivory";
const FILL: Record<ChipColor, { body: string; stripe: string; mark: string }> = {
  red: { body: C.RED, stripe: C.IVORY, mark: C.IVORY },
  gold: { body: C.GOLD, stripe: C.IVORY, mark: C.INK },
  ink: { body: C.DARK, stripe: C.GOLD, mark: C.GOLD },
  ivory: { body: C.IVORY, stripe: C.RED, mark: C.RED },
};

/** One chip, bottom face centred on (0, y). `top` adds the visible top face. */
export function Chip({ y, color, top }: { y: number; color: ChipColor; top: boolean }) {
  const { body, stripe, mark } = FILL[color];
  const yt = y - H;
  const dashes = Array.from({ length: 7 }, (_, k) => {
    const t = Math.PI * (0.13 + k * 0.123);
    return { x: RX * Math.cos(t), y: RY * Math.sin(t) };
  });
  const spots = Array.from({ length: 8 }, (_, k) => {
    const t = (k / 8) * Math.PI * 2;
    return { x: 46.5 * Math.cos(t), y: 15.5 * Math.sin(t) };
  });
  return (
    <g>
      <path
        d={`M ${-RX} ${f(yt)} L ${-RX} ${f(y)} A ${RX} ${RY} 0 0 0 ${RX} ${f(y)} L ${RX} ${f(yt)} A ${RX} ${RY} 0 0 0 ${-RX} ${f(yt)} Z`}
        fill={body}
        stroke={C.INK}
        strokeWidth={2.4}
        strokeLinejoin="round"
      />
      {dashes.map((d, i) => (
        <line key={i} x1={f(d.x)} x2={f(d.x)} y1={f(yt + d.y + 3)} y2={f(y + d.y - 3)} stroke={stripe} strokeWidth={6} />
      ))}
      <path
        d={`M ${-RX} ${f(y)} A ${RX} ${RY} 0 0 0 ${RX} ${f(y)}`}
        fill="none"
        stroke={C.INK}
        strokeWidth={2.4}
      />
      {top && (
        <g>
          <ellipse cx={0} cy={f(yt)} rx={RX} ry={RY} fill={body} stroke={C.INK} strokeWidth={2.4} />
          {spots.map((s, i) => (
            <ellipse key={i} cx={f(s.x)} cy={f(yt + s.y)} rx={5} ry={1.9} fill={stripe} />
          ))}
          <ellipse cx={0} cy={f(yt)} rx={38} ry={12.6} fill="none" stroke={stripe} strokeWidth={2.2} strokeDasharray="5 4" />
          <ellipse cx={0} cy={f(yt)} rx={24} ry={8} fill={body === C.IVORY ? C.GOLD_L : C.IVORY} stroke={C.INK} strokeWidth={1.8} />
          <path d={SPADE} transform={`translate(0 ${f(yt - 0.5)}) scale(0.27 0.19)`} fill={body === C.IVORY ? C.RED : mark === C.IVORY ? C.RED : C.INK} />
        </g>
      )}
    </g>
  );
}

/** A stack of chips standing on (cx, baseY). */
export function ChipStack({
  cx,
  baseY,
  colors,
  scale = 1,
  className,
  style,
  hopTop = false,
}: {
  cx: number;
  baseY: number;
  colors: ChipColor[];
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Make the top chip hop every few seconds. */
  hopTop?: boolean;
}) {
  return (
    <g transform={`translate(${cx} ${baseY}) scale(${scale})`}>
      <g className={className} style={style}>
        {colors.map((c, i) => {
          const last = i === colors.length - 1;
          const chip = <Chip y={-i * H} color={c} top={last} />;
          return last && hopTop ? (
            <g key={i} className="chip-hop">
              {chip}
            </g>
          ) : (
            <g key={i}>{chip}</g>
          );
        })}
      </g>
    </g>
  );
}
