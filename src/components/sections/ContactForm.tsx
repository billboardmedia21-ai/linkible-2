"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Field, TextArea, Select, ChipGroup, SuccessPanel } from "@/components/ui/Field";

const EASE = [0.16, 1, 0.3, 1] as const;

const budgets = ["$1.5k–3k", "$3k–7.5k", "$7.5k–13.5k", "$13.5k+", "Not sure yet"];
const services = [
  "Link Building",
  "Digital PR",
  "HARO Link Building",
  "Guest Posting",
  "White Label",
  "International SEO",
];

export default function ContactForm() {
  const [budget, setBudget] = useState(budgets[1]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    // Front-end demo submission — wire to your CRM or a route handler here.
    setTimeout(() => setStatus("sent"), 1100);
  };

  return (
    <div className="rounded-[32px] border border-mist-200 bg-white p-7 shadow-[0_30px_80px_-50px_rgba(196,42,53,0.4)] sm:p-10">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <SuccessPanel
              title="Message received"
              body="A strategist will reply within one business day — from an @linkible.io address, always."
            >
              <button
                onClick={() => setStatus("idle")}
                className="mt-7 text-[14px] font-semibold text-brand-600 underline underline-offset-4"
              >
                Send another message
              </button>
            </SuccessPanel>
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
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" required />
              <Field label="Work email" name="email" type="email" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Company" name="company" />
              <Field label="Website URL" name="website" type="url" />
            </div>

            <Select
              label="What do you need help with?"
              name="service"
              options={services}
              required
            />

            <div className="pt-2">
              <ChipGroup
                label="Monthly budget"
                options={budgets}
                value={budget}
                onChange={setBudget}
              />
              <input type="hidden" name="budget" value={budget} />
            </div>

            <TextArea
              label="Tell us about your goals and your competition"
              name="message"
              required
              className="pt-2"
            />

            <label className="flex cursor-pointer items-start gap-3 pt-1 text-[13.5px] leading-relaxed text-slate-body">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-0.5 h-4.5 w-4.5 shrink-0 cursor-pointer rounded border-mist-400 accent-brand-600"
              />
              I agree to Linkible storing my details to respond to this enquiry, as described in
              the Privacy Policy.
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              data-cursor-text="Send it"
              className="group mt-2 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-600 text-[15.5px] font-medium text-white shadow-[0_14px_36px_-14px_rgba(196,42,53,0.85)] transition-all duration-400 hover:bg-brand-700 disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <ArrowRight className="h-4.5 w-4.5 transition-transform duration-400 group-hover:translate-x-1.5" />
                </>
              )}
            </button>

            <p className="pt-1 text-center text-[12.5px] text-muted">
              We reply within one business day. No sales sequences, no automated drip.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
