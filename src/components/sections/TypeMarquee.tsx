import Marquee from "@/components/motion/Marquee";
import { cn } from "@/lib/utils";

const words = ["Earned links", "Digital PR", "HARO", "Authority", "Rankings"];

/** A slow, oversized typographic band between sections — ink and brand-blue
 *  words alternating, the same rhythm device the reference uses. (Outlined
 *  words were tried first, but -webkit-text-stroke draws every internal
 *  contour of a variable font, leaving stray lines inside D, P, R.) */
export default function TypeMarquee() {
  return (
    <section
      aria-hidden
      className="overflow-hidden border-y border-mist-200 bg-white py-[clamp(1.5rem,3.5vw,3rem)]"
    >
      <Marquee speed={70}>
        {words.map((word, i) => (
          <span key={word} className="flex shrink-0 items-center gap-[clamp(2rem,5vw,4.5rem)]">
            {/* Generous leading + bottom padding: this sits inside the
                marquee track's overflow mask, and 'g' in "Rankings" and
                "Earned links" needs real room below the baseline. */}
            <span
              className={cn(
                "display whitespace-nowrap pb-3 !leading-[1.25] text-[clamp(3rem,9vw,8rem)]",
                i % 2 === 0 ? "text-ink" : "text-brand-600",
              )}
            >
              {word}
            </span>
            <span className="h-3 w-3 shrink-0 rounded-full bg-brand-500" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
