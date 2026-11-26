"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type StorySection = { id: string; label: string };

/** Scroll-synced section navigation for long-form narrative pages — a
 *  sticky rail on desktop, a horizontally-scrollable chip strip on mobile.
 *  Same IntersectionObserver approach as LegalBody's table of contents,
 *  generalised so both can share it. */
export default function StoryNav({ sections }: { sections: StorySection[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  const chipRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    chipRefs.current[active]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  return (
    <>
      {/* Mobile: horizontal chip strip, pinned just under the sticky nav.
          min-w-0 matters here: this renders as a direct CSS grid item (the
          parent grid's single mobile column), and grid items default to
          min-width:auto — without overriding that, this refuses to shrink
          below the chip row's full intrinsic width and blows out the page
          instead of letting its own overflow-x-auto scroll internally. */}
      <div className="sticky top-[86px] z-20 min-w-0 -mx-5 mb-10 bg-white/90 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8 lg:hidden">
        <div className="scrollbar-none flex gap-2 overflow-x-auto">
          {sections.map((s) => (
            <a
              key={s.id}
              ref={(el) => {
                chipRefs.current[s.id] = el;
              }}
              href={`#${s.id}`}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-300",
                active === s.id
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-mist-300 text-slate-body",
              )}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Desktop: sticky rail beside the article column. */}
      <aside className="hidden lg:sticky lg:top-32 lg:block lg:min-w-0 lg:self-start">
        <p className="mb-4 text-[10.5px] font-semibold tracking-[0.18em] text-muted uppercase">
          On this story
        </p>
        <ul className="space-y-0.5 border-l border-mist-200">
          {sections.map((s) => (
            <li key={s.id} className="relative">
              {active === s.id && (
                <motion.span
                  layoutId="story-nav-active"
                  className="absolute inset-y-0 -left-px w-0.5 bg-brand-600"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <a
                href={`#${s.id}`}
                className={cn(
                  "block py-2 pl-4 text-[14px] transition-colors duration-300",
                  active === s.id
                    ? "font-medium text-brand-700"
                    : "text-slate-body hover:text-ink",
                )}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
