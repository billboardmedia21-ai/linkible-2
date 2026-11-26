"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, Link2, Megaphone, Newspaper } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { serviceCards } from "@/data/content";
import { cn } from "@/lib/utils";

const icons = [Link2, Megaphone, Newspaper];
// Resting icon-square / number-badge tints — blue, grey, blue, alternating
// like the rest of the site's white/blue/grey palette rather than a colour
// per service.
const boxTint = [
  { icon: "bg-brand-100 text-brand-600", badge: "bg-brand-50 text-brand-600" },
  { icon: "bg-mist-200 text-ink-soft", badge: "bg-mist-100 text-ink-soft" },
  { icon: "bg-brand-100 text-brand-600", badge: "bg-brand-50 text-brand-600" },
];
// Compact labels for the phone chip strip, which is only ~105px per chip.
const shortTitles = ["Link Building", "Digital PR", "HARO"];
const panelId = (i: number) => `service-${i + 1}`;

// One timing for every highlight change so a box lights up as a single motion.
// Standard ease-in-out: an expo-out spends most of its change in the first
// fraction of the duration, which reads as a snap on colour transitions.
const FADE = "duration-[420ms] ease-[cubic-bezier(0.4,0,0.2,1)]";
// Slide-in curve (expo-out): fast departure, long soft landing — reads as
// "glides in" rather than "appears". Shared by the boxes and the panels.
const EASE = [0.16, 1, 0.3, 1] as const;

/** "Stick with what works": three service boxes on a sticky left rail, three
 *  tall panels on the right. As the right side scrolls, whichever panel is
 *  crossing the middle of the screen is "active" and its box lights up; the
 *  boxes are also anchors that scroll to their panel (SmoothScroll picks up
 *  `#` links, so this is smooth with Lenis and still works natively without). */
export default function ServiceCarousel() {
  const [active, setActive] = useState(0);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // A thin band across the vertical centre of the viewport: the panel that
    // overlaps it is the one being read. Panels are taller than the band and
    // the gap between them is shorter, so exactly one is always inside it;
    // when none intersects (above the first / below the last) the previous
    // value simply stays.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    panelRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <Section>
      <Container>
        <SectionHeading
          accent
          title="Stick with what works"
          body="We put clients in Google's good books by ticking these three boxes. When you know what works, why tinker with it?"
        />

        {/* Plain block flow below lg, a two-column grid from lg. Sticky needs
            its containing block to be as tall as the panels: a grid item's
            containing block is only its own grid area, so the single-column
            (phone) layout must not be a grid or the chip strip would unstick
            after its own row. */}
        <div className="mt-14 lg:grid lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10">
          <div className="sticky top-[88px] z-20 mb-5 lg:top-32 lg:mb-0 lg:self-start">
            {/* Desktop: the three boxes. */}
            <div className="hidden flex-col gap-4 lg:flex">
              {serviceCards.map((service, i) => {
                const Icon = icons[i];
                const on = i === active;
                return (
                  // The slide lives on this wrapper, not on the sticky rail
                  // itself: a transform on the rail would stop it sticking.
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, x: -48 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
                  >
                    <a
                      href={`#${panelId(i)}`}
                      aria-current={on ? "true" : undefined}
                      data-cursor-text="View"
                      className={cn(
                        "group relative flex items-center gap-4 overflow-hidden rounded-[22px] border p-4",
                        "transition-[translate,box-shadow,border-color] hover:-translate-y-0.5",
                        FADE,
                        on
                          ? "translate-x-1 border-transparent shadow-[0_28px_60px_-26px_rgba(196,42,53,0.6)]"
                          : "border-mist-200 shadow-[0_1px_2px_rgba(196,42,53,0.05)]",
                      )}
                    >
                      {/* Resting white card, with the active blue fill as its
                          own layer faded in on opacity — a gradient can't be
                          transitioned directly, it just flips between states. */}
                      <div className="absolute inset-0 bg-white" />
                      <div
                        aria-hidden
                        className={cn(
                          "absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-600 to-brand-800 transition-opacity",
                          FADE,
                          on ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {/* A soft glossy highlight, clipped to the card's own
                          rounded corners by its parent's overflow-hidden. */}
                      <div
                        aria-hidden
                        className={cn(
                          "absolute -top-10 -right-6 h-28 w-28 rounded-full bg-white/25 blur-2xl transition-opacity",
                          FADE,
                          on ? "opacity-100" : "opacity-0",
                        )}
                      />
                      <div
                        aria-hidden
                        className={cn(
                          "grain absolute inset-0 transition-opacity",
                          FADE,
                          on ? "opacity-25" : "opacity-0",
                        )}
                      />

                      <span
                        className={cn(
                          "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors",
                          FADE,
                          on ? "bg-white/15 text-white" : boxTint[i].icon,
                        )}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>

                      <span className="relative z-10 flex min-w-0 flex-1 flex-col gap-1.5">
                        <span
                          className={cn(
                            "inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10.5px] font-semibold tabular-nums transition-colors",
                            FADE,
                            on ? "bg-white/15 text-white" : boxTint[i].badge,
                          )}
                        >
                          0{i + 1}
                        </span>
                        <span
                          className={cn(
                            "truncate text-[15px] font-medium transition-colors",
                            FADE,
                            on ? "text-white" : "text-ink",
                          )}
                        >
                          {service.title}
                        </span>
                      </span>

                      <span
                        className={cn(
                          "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors",
                          FADE,
                          on
                            ? "bg-white text-brand-700"
                            : "bg-brand-50 text-brand-600 group-hover:bg-brand-100",
                        )}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </a>
                  </motion.div>
                );
              })}
            </div>

            {/* Phone/tablet: the same three as a sticky chip strip. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid grid-cols-3 gap-1 rounded-full border border-mist-200 bg-white/95 p-1.5 shadow-[0_12px_32px_-18px_rgba(196,42,53,0.35)] backdrop-blur-xl lg:hidden"
            >
              {serviceCards.map((service, i) => (
                <a
                  key={service.title}
                  href={`#${panelId(i)}`}
                  aria-current={i === active ? "true" : undefined}
                  className={cn(
                    "rounded-full px-2 py-2.5 text-center text-[12.5px] font-medium whitespace-nowrap transition-colors",
                    FADE,
                    i === active ? "bg-brand-600 text-white" : "text-ink-soft",
                  )}
                >
                  {shortTitles[i]}
                </a>
              ))}
            </motion.div>
          </div>

          <div className="flex min-w-0 flex-col gap-6">
            {serviceCards.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: 56 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.75, ease: EASE }}
              >
                <ServicePanel
                  service={service}
                  index={i}
                  active={i === active}
                  setRef={(el) => {
                    panelRefs.current[i] = el;
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ServicePanel({
  service,
  index,
  active,
  setRef,
}: {
  service: (typeof serviceCards)[number];
  index: number;
  active: boolean;
  setRef: (el: HTMLElement | null) => void;
}) {
  const Icon = icons[index];
  return (
    <article
      id={panelId(index)}
      ref={setRef}
      data-index={index}
      className={cn(
        // scroll-mt: where a native (non-Lenis) anchor jump lands, clear of the nav.
        "relative scroll-mt-28 overflow-hidden rounded-[32px] border bg-white transition-[opacity,border-color,box-shadow]",
        FADE,
        active
          ? "border-brand-300 opacity-100 shadow-[0_40px_90px_-50px_rgba(196,42,53,0.45)]"
          : "border-mist-200 opacity-55 shadow-[0_0_0_0_rgba(196,42,53,0)]",
      )}
    >
      <div className="grid lg:min-h-[500px] lg:grid-cols-[1.2fr_1fr]">
        <div
          className={cn(
            "flex flex-col justify-center p-8 transition-[translate] duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-10 lg:p-12",
            active ? "translate-x-0" : "translate-x-4",
          )}
        >
          <span className="inline-flex items-center gap-2 text-[14.5px] font-semibold text-brand-600">
            <Icon className="h-4 w-4" />
            {service.title}
          </span>

          <h3 className="display mt-5 text-[clamp(1.6rem,3vw,2.2rem)] text-ink">
            {service.headline}
          </h3>

          <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-slate-body">
            {service.description}
          </p>

          <ul className="mt-6 space-y-3">
            {service.points.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="text-[14.5px] font-medium text-ink-soft">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href={service.href}
            data-cursor-text="Learn more"
            className="group/cta mt-8 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-brand-600 px-6 text-[14.5px] font-medium text-white transition-all duration-300 hover:bg-brand-700"
          >
            Learn More
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
          </Link>
        </div>

        {/* On-brand decorative panel — icons and gradients rather than stock
            photography, matching the rest of the site. Its motion only runs
            while this panel is the active one. */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-ink via-brand-900 to-brand-800 lg:block">
          <div className="grain absolute inset-0 opacity-40" />
          {/* Soft corner glow + a low wave, echoing the reference panel's
              extra polish beyond the plain gradient + orbit rings. */}
          <div
            aria-hidden
            className="absolute -top-12 -right-12 h-56 w-56 rounded-full bg-brand-400/25 blur-[70px]"
          />
          <svg
            aria-hidden
            viewBox="0 0 400 200"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-28 w-full opacity-60"
          >
            <path
              d="M0,90 C110,150 290,10 400,80 L400,200 L0,200 Z"
              fill={`url(#service-wave-${index})`}
            />
            <defs>
              <linearGradient id={`service-wave-${index}`} x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#3b6bff" stopOpacity="0.35" />
                <stop offset="1" stopColor="#1b47e8" stopOpacity="0.05" />
              </linearGradient>
            </defs>
          </svg>
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full opacity-30"
          >
            <circle
              cx="50"
              cy="50"
              r="34"
              fill="none"
              stroke="white"
              strokeWidth="0.3"
              strokeDasharray="2 3"
            />
            <circle
              cx="50"
              cy="50"
              r="22"
              fill="none"
              stroke="white"
              strokeWidth="0.3"
              strokeDasharray="1 2.5"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={active ? { scale: [1, 1.06, 1] } : { scale: 1 }}
              transition={
                active
                  ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.6 }
              }
              className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm"
            >
              <div className="absolute inset-0 rounded-3xl bg-brand-400/30 blur-xl" />
              <Icon
                className="relative h-11 w-11 text-white"
                strokeWidth={1.5}
              />
            </motion.div>
          </div>

          {[
            { Icon: icons[0], top: "18%", left: "20%", delay: 0 },
            { Icon: icons[1], top: "70%", left: "24%", delay: 0.4 },
            { Icon: icons[2], top: "24%", left: "78%", delay: 0.8 },
            {
              Icon: icons[(index + 1) % 3],
              top: "76%",
              left: "76%",
              delay: 1.2,
            },
          ].map(({ Icon: Float, top, left, delay }, i) => (
            <motion.span
              key={i}
              animate={active ? { y: [0, -8, 0] } : { y: 0 }}
              transition={
                active
                  ? {
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay,
                    }
                  : { duration: 0.6 }
              }
              style={{ top, left }}
              className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm"
            >
              <Float className="h-4 w-4 text-white/80" strokeWidth={1.75} />
            </motion.span>
          ))}
        </div>
      </div>
    </article>
  );
}
