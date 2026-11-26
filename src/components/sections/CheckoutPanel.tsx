"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Loader2, Lock, ShieldCheck } from "lucide-react";
import type { Plan } from "@/data/pricing";
import { plans } from "@/data/pricing";
import { Field, SuccessPanel } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CheckoutPanel({
  initialPlan,
  industry,
}: {
  initialPlan: string;
  industry: string;
}) {
  const [planName, setPlanName] = useState(initialPlan);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const plan: Plan = plans.find((p) => p.name === planName) ?? plans[0];

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    // Front-end demo — connect your payment provider's checkout session here.
    setTimeout(() => setStatus("sent"), 1200);
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mx-auto max-w-2xl"
      >
        <SuccessPanel
          title="Order request received"
          body={`We have your ${plan.name} plan request. An account lead will email a secure payment link and your onboarding questionnaire within one business day.`}
        >
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-12 items-center rounded-full bg-brand-600 px-6 text-[14.5px] font-medium text-white transition-colors hover:bg-brand-700"
            >
              Back to home
            </Link>
            <Link
              href="/case-study"
              className="inline-flex h-12 items-center rounded-full border border-brand-300 bg-white px-6 text-[14.5px] font-medium text-brand-700 transition-colors hover:bg-brand-50"
            >
              Read case studies
            </Link>
          </div>
        </SuccessPanel>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
      <form
        onSubmit={onSubmit}
        className="rounded-[32px] border border-mist-200 bg-white p-7 shadow-[0_30px_80px_-50px_rgba(196,42,53,0.4)] sm:p-10"
      >
        <div>
          <p className="text-[12px] font-semibold tracking-[0.14em] text-muted uppercase">
            1 · Choose your plan
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {plans.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setPlanName(p.name)}
                aria-pressed={planName === p.name}
                className={cn(
                  "relative rounded-2xl border p-4 text-left transition-all duration-300",
                  planName === p.name
                    ? "border-brand-600 bg-brand-50/80 shadow-[0_10px_28px_-16px_rgba(196,42,53,0.6)]"
                    : "border-mist-300 bg-white hover:border-brand-300 hover:-translate-y-0.5",
                )}
              >
                <span className="flex items-center justify-between">
                  <span className="text-[15.5px] font-semibold text-ink">{p.name}</span>
                  {planName === p.name && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white">
                      <Check className="h-3 w-3" strokeWidth={3.5} />
                    </span>
                  )}
                </span>
                <span className="mt-1 block text-[13px] text-muted">
                  ${p.price.toLocaleString()}/mo · {p.links}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-9 border-t border-mist-200 pt-8">
          <p className="text-[12px] font-semibold tracking-[0.14em] text-muted uppercase">
            2 · Your details
          </p>
          <div className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" required />
              <Field label="Work email" name="email" type="email" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Company" name="company" required />
              <Field label="Website URL" name="website" type="url" required />
            </div>
            <Field label="Target keyword or page (optional)" name="target" />
          </div>
        </div>

        <div className="mt-9 border-t border-mist-200 pt-8">
          <p className="text-[12px] font-semibold tracking-[0.14em] text-muted uppercase">
            3 · Confirm
          </p>
          <label className="mt-4 flex cursor-pointer items-start gap-3 text-[13.5px] leading-relaxed text-slate-body">
            <input
              type="checkbox"
              required
              className="mt-0.5 h-4.5 w-4.5 shrink-0 cursor-pointer rounded border-mist-400 accent-brand-600"
            />
            I agree to the{" "}
            <Link href="/terms" className="font-medium text-brand-700 underline underline-offset-2">
              Terms &amp; Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-policy"
              className="font-medium text-brand-700 underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </label>

          <button
            type="submit"
            disabled={status === "sending"}
            data-cursor-text="Continue"
            className="group mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-600 text-[15.5px] font-medium text-white shadow-[0_14px_36px_-14px_rgba(196,42,53,0.85)] transition-all duration-400 hover:bg-brand-700 disabled:opacity-70"
          >
            {status === "sending" ? (
              <>
                <Loader2 className="h-4.5 w-4.5 animate-spin" />
                Processing…
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Continue to secure payment
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-400 group-hover:translate-x-1.5" />
              </>
            )}
          </button>
          <p className="mt-3 text-center text-[12.5px] text-muted">
            You are not charged here. We email a secure payment link after a quick fit check.
          </p>
        </div>
      </form>

      <aside className="lg:sticky lg:top-32 lg:self-start">
        <div className="overflow-hidden rounded-[32px] border border-mist-200 bg-mist-50">
          <div className="relative overflow-hidden bg-gradient-to-br from-brand-700 to-brand-900 p-7 text-white">
            <div className="grain absolute inset-0 opacity-40" />
            <p className="relative text-[11px] font-semibold tracking-[0.16em] text-brand-200 uppercase">
              Order summary
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="relative"
              >
                <p className="display mt-4 text-[30px] text-white">{plan.name}</p>
                <p className="mt-1 text-[13.5px] text-brand-200">{plan.tagline}</p>
                <p className="display mt-6 text-[40px] text-white">
                  ${plan.price.toLocaleString()}
                  <span className="text-[15px] font-normal text-brand-200">/month</span>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-7">
            <dl className="space-y-3 border-b border-mist-300 pb-5 text-[14px]">
              <Row label="Placements" value={plan.links} />
              <Row label="Authority" value={plan.dr} />
              <Row label="Industry" value={industry} />
              <Row label="Billing" value="Monthly, cancel anytime" />
            </dl>

            <ul className="mt-5 space-y-2.5">
              {plan.features.slice(0, 6).map((f) => (
                <li key={f} className="flex gap-2.5 text-[13.5px] leading-snug text-slate-body">
                  <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-start gap-2.5 rounded-2xl bg-white p-4 text-[12.5px] leading-relaxed text-slate-body">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              Shortfalls are rolled over or credited. Links removed within six months are replaced
              free.
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}
