import { useId } from "react";
import { C } from "./palette";
import { SPADE, HEART, DIAMOND } from "./suits";

const f = (n: number) => n.toFixed(1);

/**
 * The casino front door: glowing sign, striped awning, double doors that swing
 * open on hover, neon icons in the windows and a red carpet with velvet ropes.
 * ViewBox 0 0 560 650.
 */
export default function CasinoEntrance({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const glow = `glow-${uid}`;
  const gold = `gold-${uid}`;
  const lattice = `lat-${uid}`;

  const bulbsTop = Array.from({ length: 12 }, (_, i) => 168 + i * 20.4);
  const bulbsSide = [62, 80, 98];
  const stripes = Array.from({ length: 8 }, (_, i) => 180 + i * 25);

  return (
    <svg
      viewBox="0 0 560 650"
      className={`ent ${className ?? ""}`}
      role="img"
      aria-label="A glowing casino entrance with a red carpet"
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id={glow} cx="50%" cy="62%" r="62%">
          <stop offset="0" stopColor="#ffe27a" />
          <stop offset="0.45" stopColor="#d9902a" />
          <stop offset="1" stopColor="#3b2018" />
        </radialGradient>
        <linearGradient id={gold} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor={C.GOLD_L} />
          <stop offset="0.55" stopColor={C.GOLD} />
          <stop offset="1" stopColor={C.GOLD_D} />
        </linearGradient>
        <pattern id={lattice} width={14} height={14} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width={14} height={14} fill="#33231f" />
          <path d="M0 0H14M0 0V14" stroke="#7a5a2a" strokeWidth={1.2} />
        </pattern>
      </defs>

      {/* halo */}
      <g transform="translate(280 340)">
        <circle r={262} fill={C.GOLD_L} opacity={0.28} />
        <circle r={262} fill="none" stroke={C.GOLD} strokeWidth={9} />
        <circle className="spin-slow" r={238} fill="none" stroke={C.GOLD_D} strokeWidth={2.4} strokeDasharray="1 13" strokeLinecap="round" />
      </g>

      {/* pavement shadow */}
      <ellipse cx={280} cy={640} rx={250} ry={12} fill={C.INK} opacity={0.16} />

      {/* building */}
      <rect x={110} y={140} width={340} height={442} rx={14} fill={C.COAT} stroke={C.INK} strokeWidth={3} />
      {/* wainscot */}
      <rect x={110} y={500} width={340} height={82} fill={C.RED_D} stroke={C.INK} strokeWidth={3} />
      <path d="M110 500 H450" stroke={C.GOLD} strokeWidth={5} />
      {/* pilasters */}
      {[110, 426].map((x) => (
        <g key={x}>
          <rect x={x} y={140} width={24} height={442} fill={`url(#${gold})`} stroke={C.INK} strokeWidth={3} />
          {[200, 280, 360, 440].map((y) => (
            <path key={y} d={DIAMOND} transform={`translate(${x + 12} ${y}) scale(0.5)`} fill={C.COAT} stroke={C.INK} strokeWidth={3} />
          ))}
        </g>
      ))}
      {/* cornice */}
      <rect x={96} y={126} width={368} height={24} rx={6} fill={`url(#${gold})`} stroke={C.INK} strokeWidth={3} />
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={i} cx={116 + i * 29.5} cy={138} r={3} fill={C.COAT} stroke={C.INK} strokeWidth={1.4} />
      ))}

      {/* sign */}
      <path d="M200 126 V112 M360 126 V112" stroke={C.INK} strokeWidth={8} />
      <rect x={150} y={40} width={260} height={80} rx={18} fill={C.RED} stroke={C.INK} strokeWidth={3.4} />
      <rect x={160} y={50} width={240} height={60} rx={12} fill="none" stroke={C.GOLD} strokeWidth={2.4} />
      <text
        x={280}
        y={92}
        textAnchor="middle"
        fontSize={38}
        fontWeight={900}
        letterSpacing={7}
        fill={C.GOLD_L}
        stroke={C.INK}
        strokeWidth={2.4}
        paintOrder="stroke"
        fontFamily="var(--font-display), system-ui, sans-serif"
        className="neon-text"
      >
        CASINO
      </text>
      {bulbsTop.flatMap((x, i) => [
        <circle key={`t${i}`} className="bulb" style={{ animationDelay: `${(i % 2) * 0.6}s` }} cx={f(x)} cy={45} r={3.2} fill={C.GOLD_L} />,
        <circle key={`b${i}`} className="bulb" style={{ animationDelay: `${((i + 1) % 2) * 0.6}s` }} cx={f(x)} cy={115} r={3.2} fill={C.GOLD_L} />,
      ])}
      {bulbsSide.flatMap((y, i) => [
        <circle key={`l${i}`} className="bulb" style={{ animationDelay: `${(i % 2) * 0.6 + 0.3}s` }} cx={155} cy={y} r={3.2} fill={C.GOLD_L} />,
        <circle key={`r${i}`} className="bulb" style={{ animationDelay: `${((i + 1) % 2) * 0.6 + 0.3}s` }} cx={405} cy={y} r={3.2} fill={C.GOLD_L} />,
      ])}
      {/* neon spade crest */}
      <g transform="translate(280 34)">
        <circle r={26} fill={C.DARK} stroke={`url(#${gold})`} strokeWidth={5} />
        <circle r={26} fill="none" stroke={C.INK} strokeWidth={2} />
        <path className="neon" d={SPADE} transform="translate(0 -1) scale(0.74)" fill={C.GOLD_L} />
      </g>

      {/* windows */}
      {[
        { x: 146, icon: HEART, col: "#ff6b73" },
        { x: 372, icon: DIAMOND, col: "#ff6b73" },
      ].map((w) => (
        <g key={w.x}>
          <path d={`M${w.x} 392 V 290 Q${w.x} 256 ${w.x + 21} 256 Q${w.x + 42} 256 ${w.x + 42} 290 V 392 Z`} fill={C.DARK} stroke={`url(#${gold})`} strokeWidth={5} strokeLinejoin="round" />
          <path d={`M${w.x} 392 V 290 Q${w.x} 256 ${w.x + 21} 256 Q${w.x + 42} 256 ${w.x + 42} 290 V 392 Z`} fill="none" stroke={C.INK} strokeWidth={2} />
          <path className="neon" d={w.icon} transform={`translate(${w.x + 21} 326) scale(0.78)`} fill="none" stroke={w.col} strokeWidth={3.4} strokeLinejoin="round" />
          <path d={`M${w.x + 8} 380 L${w.x + 20} 268`} stroke="#fff" strokeWidth={5} opacity={0.12} strokeLinecap="round" />
        </g>
      ))}

      {/* door: frame + warm interior */}
      <path d="M194 582 V282 Q194 222 280 222 Q366 222 366 282 V582 Z" fill={`url(#${gold})`} stroke={C.INK} strokeWidth={3.4} />
      <path d="M206 582 V284 Q206 234 280 234 Q354 234 354 284 V582 Z" fill={`url(#${glow})`} stroke={C.INK} strokeWidth={2.4} className="door-glow" />
      {/* silhouettes inside the lobby */}
      <path d="M236 582 V520 Q236 500 250 500 Q264 500 264 520 V582 Z" fill="#2b1b1a" opacity={0.55} />
      <circle cx={250} cy={488} r={10} fill="#2b1b1a" opacity={0.55} />

      {/* the two door leaves */}
      <g className="door door-l">
        <rect x={210} y={250} width={68} height={332} rx={4} fill={C.DARK_2} stroke={`url(#${gold})`} strokeWidth={4} />
        <rect x={218} y={262} width={52} height={180} rx={3} fill={`url(#${lattice})`} stroke={C.INK} strokeWidth={2} />
        <path d="M226 436 L248 268" stroke="#fff" strokeWidth={6} opacity={0.14} strokeLinecap="round" />
        <rect x={218} y={460} width={52} height={104} rx={3} fill="none" stroke={C.GOLD} strokeWidth={2} />
        <rect x={266} y={420} width={6} height={52} rx={3} fill={`url(#${gold})`} stroke={C.INK} strokeWidth={1.6} />
      </g>
      <g className="door door-r">
        <rect x={282} y={250} width={68} height={332} rx={4} fill={C.DARK_2} stroke={`url(#${gold})`} strokeWidth={4} />
        <rect x={290} y={262} width={52} height={180} rx={3} fill={`url(#${lattice})`} stroke={C.INK} strokeWidth={2} />
        <path d="M298 436 L320 268" stroke="#fff" strokeWidth={6} opacity={0.14} strokeLinecap="round" />
        <rect x={290} y={460} width={52} height={104} rx={3} fill="none" stroke={C.GOLD} strokeWidth={2} />
        <rect x={288} y={420} width={6} height={52} rx={3} fill={`url(#${gold})`} stroke={C.INK} strokeWidth={1.6} />
      </g>

      {/* awning */}
      <rect x={172} y={168} width={216} height={10} rx={4} fill={`url(#${gold})`} stroke={C.INK} strokeWidth={2.6} />
      {stripes.map((x, i) => (
        <path
          key={x}
          d={`M${x} 176 H${x + 25} V206 Q${x + 12.5} 224 ${x} 206 Z`}
          fill={i % 2 ? C.COAT : C.RED}
          stroke={C.INK}
          strokeWidth={2.4}
          strokeLinejoin="round"
        />
      ))}

      {/* light spilling out when the doors open */}
      <path className="door-spill" d="M222 584 H338 L408 650 H152 Z" fill={C.GOLD_L} opacity={0} />

      {/* carpet */}
      <path d="M214 582 H346 L410 650 H150 Z" fill={C.RED} stroke={C.INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M222 584 L162 650 M338 584 L398 650" stroke={C.GOLD} strokeWidth={4} />
      <path d="M280 584 V650" stroke={C.RED_L} strokeWidth={26} opacity={0.5} />
      <path d={DIAMOND} transform="translate(280 618) scale(0.8)" fill={C.GOLD} stroke={C.INK} strokeWidth={2.4} />

      {/* stanchions + rope */}
      {[
        { x: 196, y: 586, s: 0.8 },
        { x: 364, y: 586, s: 0.8 },
        { x: 138, y: 646, s: 1 },
        { x: 422, y: 646, s: 1 },
      ].map((p) => (
        <g key={`${p.x}`} transform={`translate(${p.x} ${p.y}) scale(${p.s})`}>
          <ellipse cx={0} cy={0} rx={13} ry={4} fill={C.GOLD_D} stroke={C.INK} strokeWidth={2} />
          <rect x={-3.5} y={-52} width={7} height={52} fill={`url(#${gold})`} stroke={C.INK} strokeWidth={2} />
          <circle cx={0} cy={-56} r={7} fill={`url(#${gold})`} stroke={C.INK} strokeWidth={2} />
        </g>
      ))}
      <path d="M196 534 Q 168 566 138 590" fill="none" stroke={C.RED_D} strokeWidth={6} strokeLinecap="round" />
      <path d="M364 534 Q 392 566 422 590" fill="none" stroke={C.RED_D} strokeWidth={6} strokeLinecap="round" />
      <path d="M196 534 Q 168 566 138 590" fill="none" stroke={C.INK} strokeWidth={1.6} strokeLinecap="round" opacity={0.6} />
      <path d="M364 534 Q 392 566 422 590" fill="none" stroke={C.INK} strokeWidth={1.6} strokeLinecap="round" opacity={0.6} />

      {/* sparkle */}
      {[
        [100, 120, 0],
        [470, 210, 0.8],
        [88, 400, 1.4],
        [486, 440, 0.4],
      ].map(([x, y, d], i) => (
        <path key={i} className="spark" style={{ animationDelay: `${d}s` }} d={`M${x} ${Number(y) - 12} Q${x} ${y} ${Number(x) + 12} ${y} Q${x} ${y} ${x} ${Number(y) + 12} Q${x} ${y} ${Number(x) - 12} ${y} Q${x} ${y} ${x} ${Number(y) - 12} Z`} fill={C.GOLD_L} stroke={C.INK} strokeWidth={1.4} />
      ))}
    </svg>
  );
}
