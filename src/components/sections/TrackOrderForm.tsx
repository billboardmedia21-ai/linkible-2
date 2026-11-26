"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Loader2, Search } from "lucide-react";
import { Field } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

// Same shape every campaign moves through — mirrors the stages a client's
// account manager actually reports against, so a looked-up order lands on
// one of these rather than an invented generic "processing" state.
const STAGES = [
  "Order confirmed",
  "Prospecting & outreach",
  "Content drafted",
  "Placement live",
];

export default function TrackOrderForm() {
  const [status, setStatus] = useState<"idle" | "checking" | "found">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("checking");
    // Front-end demo lookup — wire to your order system / CRM here.
    setTimeout(() => setStatus("found"), 1000);
  };

  return (
    <div className="rounded-[32px] border border-mist-200 bg-white p-7 shadow-[0_30px_80px_-50px_rgba(196,42,53,0.4)] sm:p-10">
      <AnimatePresence mode="wait">
        {status === "found" ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p className="text-[13px] font-semibold tracking-[0.14em] text-brand-600 uppercase">
              Order #LB-20458
            </p>
            <h3 className="display mt-2 text-[26px] text-ink">Content drafted</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-body">
              Your writer has finished the first placement draft. It is with your
              strategist for review before outreach begins.
            </p>

            {/* Same numbered-row shape as the case-study approach timeline —
                a flex row, not absolute positioning, so there is nothing here
                that can repeat the badge/heading overlap the process
                timeline had. */}
            <ol className="mt-8 space-y-5">
              {STAGES.map((stage, i) => {
                const done = i <= 2;
                const current = i === 2;
                return (
                  <li key={stage} className="flex items-center gap-4">
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12.5px] font-semibold transition-colors duration-500",
                        done
                          ? "bg-brand-600 text-white"
                          : "bg-mist-100 text-muted ring-1 ring-mist-300",
                      )}
                    >
                      {done ? (
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </span>
                    <span
                      className={cn(
                        "text-[15px] font-medium",
                        current ? "text-brand-700" : done ? "text-ink" : "text-muted",
                      )}
                    >
                      {stage}
                    </span>
                  </li>
                );
              })}
            </ol>

            <button
              onClick={() => setStatus("idle")}
              className="mt-8 text-[14px] font-semibold text-brand-600 underline underline-offset-4"
            >
              Look up another order
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <Field label="Order ID" name="orderId" required />
            <Field label="Email used at checkout" name="email" type="email" required />

            <button
              type="submit"
              disabled={status === "checking"}
              data-cursor-text="Track it"
              className="group mt-2 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-600 text-[15.5px] font-medium text-white shadow-[0_14px_36px_-14px_rgba(196,42,53,0.85)] transition-all duration-400 hover:bg-brand-700 disabled:opacity-70"
            >
              {status === "checking" ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  Looking it up…
                </>
              ) : (
                <>
                  <Search className="h-4.5 w-4.5" />
                  Track order
                  <ArrowRight className="h-4.5 w-4.5 transition-transform duration-400 group-hover:translate-x-1.5" />
                </>
              )}
            </button>

            <p className="pt-1 text-center text-[12.5px] text-muted">
              Your order ID was sent to your inbox when checkout completed.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
