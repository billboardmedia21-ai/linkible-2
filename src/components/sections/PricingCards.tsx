import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { plans } from "@/data/pricing";
import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

// One shared timing for every hover-driven change on a card (fill, text,
// border, shadow), so the whole card turns blue as a single motion rather
// than a handful of properties finishing at different moments. A standard
// ease-in-out, not an expo-out: expo-out spends ~90% of its change in the
// first quarter of the duration, which reads as a snap on colour changes.
const COLOR = "transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)]";

export default function PricingCards({ compact = false }: { compact?: boolean }) {
  return (
    <Stagger className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {plans.map((plan) => {
        const isRecommended = plan.popular;
        return (
          <StaggerItem key={plan.name}>
            {/* The blue treatment is purely a hover state, driven by CSS
                group-hover rather than React state: no re-render of every
                card on each pointer move, and no stuck-blue card if the
                pointer leaves the window mid-hover. "Recommended" gets a
                quieter resting signal (tinted border + badge) instead. */}
            <div
              className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-[28px] border bg-white p-7",
                "shadow-[0_0_0_0_rgba(196,42,53,0)] hover:-translate-y-2 hover:shadow-[0_36px_80px_-40px_rgba(196,42,53,0.55)]",
                "hover:border-brand-600",
                // `translate`, not `transform`: Tailwind v4's -translate-y-* utilities set
                // the standalone `translate` property, which a `transform`
                // transition does not cover (the lift would snap).
                "transition-[translate,box-shadow,border-color] duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                isRecommended ? "border-brand-300" : "border-mist-200",
              )}
            >
              {/* The blue fill is its own layer that fades in on opacity.
                  A CSS gradient (background-image) can't be transitioned —
                  it flips between states — so animating the card's own
                  background made the fill snap while everything else faded.
                  Opacity interpolates cleanly. */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-brand-700 to-brand-900 opacity-0 transition-opacity duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100"
              />
              <div
                aria-hidden
                className="grain absolute inset-0 opacity-0 transition-opacity duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-40"
              />

              {isRecommended && (
                <span
                  className={cn(
                    "absolute top-6 right-6 rounded-full bg-brand-50 px-3 py-1 text-[10.5px] font-semibold tracking-[0.14em] text-brand-700 uppercase group-hover:bg-white/15 group-hover:text-white",
                    "transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                  )}
                >
                  Most Popular
                </span>
              )}

              <div className="relative">
                <h3 className={cn("display text-[22px] text-ink group-hover:text-white", COLOR)}>
                  {plan.name}
                </h3>
                <p
                  className={cn(
                    "mt-2 min-h-[42px] text-[13.5px] leading-snug text-muted group-hover:text-brand-100",
                    COLOR,
                  )}
                >
                  {plan.tagline}
                </p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span
                    className={cn(
                      "display text-[clamp(2.2rem,4vw,2.8rem)] text-ink group-hover:text-white",
                      COLOR,
                    )}
                  >
                    ${plan.price.toLocaleString()}
                  </span>
                  <span className={cn("text-[13.5px] text-muted group-hover:text-brand-200", COLOR)}>
                    /month
                  </span>
                </div>

                <div
                  className={cn(
                    "mt-5 flex flex-wrap gap-2 border-b border-mist-200 pb-6 group-hover:border-white/15",
                    COLOR,
                  )}
                >
                  <Pill>{plan.links}</Pill>
                  <Pill>{plan.dr}</Pill>
                </div>
              </div>

              <ul className="relative mt-6 flex-1 space-y-3">
                {(compact ? plan.features.slice(0, 5) : plan.features).map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <span
                      className={cn(
                        "mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 group-hover:bg-white/20 group-hover:text-white",
                        COLOR,
                      )}
                    >
                      <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                    </span>
                    <span
                      className={cn(
                        "text-[13.5px] leading-snug text-slate-body group-hover:text-brand-50",
                        COLOR,
                      )}
                    >
                      {f}
                    </span>
                  </li>
                ))}
                {compact && plan.features.length > 5 && (
                  <li className={cn("pl-7 text-[13px] text-muted group-hover:text-brand-200", COLOR)}>
                    +{plan.features.length - 5} more
                  </li>
                )}
              </ul>

              <Link
                href={`/checkout?package=${plan.name}&industry=general`}
                data-cursor-text="Start now"
                className={cn(
                  "group/cta relative mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink text-[14.5px] font-medium text-white group-hover:bg-white group-hover:text-brand-700 group-hover:hover:bg-brand-50",
                  COLOR,
                )}
              >
                Buy Now
                <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-1" />
              </Link>
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "rounded-full bg-mist-100 px-3 py-1 text-[12px] font-medium text-slate-body group-hover:bg-white/15 group-hover:text-white",
        COLOR,
      )}
    >
      {children}
    </span>
  );
}
