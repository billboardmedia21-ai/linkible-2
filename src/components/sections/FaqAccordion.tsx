"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import type { Faq } from "@/data/types";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function FaqAccordion({
  items,
  className,
}: {
  items: Faq[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className={cn("divide-y divide-mist-200 border-y border-mist-200", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-start justify-between gap-6 py-6 text-left"
            >
              <span
                className={cn(
                  "text-[17px] leading-snug font-medium tracking-tight transition-colors duration-300 sm:text-[19px]",
                  isOpen ? "text-brand-700" : "text-ink group-hover:text-brand-600",
                )}
              >
                {item.q}
              </span>
              <span
                className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-400",
                  isOpen
                    ? "rotate-45 border-brand-600 bg-brand-600 text-white"
                    : "border-mist-300 text-ink group-hover:border-brand-300 group-hover:text-brand-600",
                )}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pr-14 pb-7 text-[15.5px] leading-relaxed text-slate-body">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
