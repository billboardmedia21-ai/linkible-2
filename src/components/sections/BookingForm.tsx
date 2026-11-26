"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Field, Select, SuccessPanel } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const times = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

function nextBusinessDays(count: number) {
  const days: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) days.push(new Date(d));
  }
  return days;
}

export default function BookingForm() {
  const days = useMemo(() => nextBusinessDays(8), []);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState(times[1]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    // Front-end demo submission — wire to your scheduling provider here.
    setTimeout(() => setStatus("sent"), 1100);
  };

  const chosen = days[day];
  const chosenLabel = chosen.toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

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
              title="Call requested"
              body={`We have pencilled in ${chosenLabel} at ${time} AEST. You will get a confirmation and calendar invite within one business day.`}
            >
              <button
                onClick={() => setStatus("idle")}
                className="mt-7 text-[14px] font-semibold text-brand-600 underline underline-offset-4"
              >
                Pick a different slot
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
            className="space-y-7"
          >
            <div>
              <p className="mb-3 text-[12px] font-semibold tracking-[0.14em] text-muted uppercase">
                Pick a day
              </p>
              <div className="grid grid-cols-4 gap-2">
                {days.map((d, i) => (
                  <button
                    key={d.toISOString()}
                    type="button"
                    onClick={() => setDay(i)}
                    aria-pressed={day === i}
                    className={cn(
                      "relative rounded-2xl border px-2 py-3 text-center transition-all duration-300",
                      day === i
                        ? "border-brand-600 bg-brand-600 text-white shadow-[0_10px_24px_-12px_rgba(196,42,53,0.8)]"
                        : "border-mist-300 bg-white text-ink hover:border-brand-300 hover:-translate-y-0.5",
                    )}
                  >
                    <span
                      className={cn(
                        "block text-[10.5px] font-semibold tracking-[0.12em] uppercase",
                        day === i ? "text-brand-100" : "text-muted",
                      )}
                    >
                      {d.toLocaleDateString("en-AU", { weekday: "short" })}
                    </span>
                    <span className="mt-1 block text-[17px] font-semibold">{d.getDate()}</span>
                    <span
                      className={cn(
                        "block text-[10.5px]",
                        day === i ? "text-brand-100" : "text-muted",
                      )}
                    >
                      {d.toLocaleDateString("en-AU", { month: "short" })}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-[12px] font-semibold tracking-[0.14em] text-muted uppercase">
                Pick a time <span className="normal-case">(AEST)</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {times.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    aria-pressed={time === t}
                    className={cn(
                      "rounded-full border px-4 py-2.5 text-[14px] font-medium transition-all duration-300",
                      time === t
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-mist-300 bg-white text-slate-body hover:border-brand-300 hover:text-brand-700",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 border-t border-mist-200 pt-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" name="name" required />
                <Field label="Work email" name="email" type="email" required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Website URL" name="website" type="url" required />
                <Select
                  label="Monthly budget"
                  name="budget"
                  options={["$1.5k–3k", "$3k–7.5k", "$7.5k–13.5k", "$13.5k+", "Not sure yet"]}
                  defaultValue="$3k–7.5k"
                />
              </div>
              <Field label="Main competitor (optional)" name="competitor" />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              data-cursor-text="Book it"
              className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-600 text-[15.5px] font-medium text-white shadow-[0_14px_36px_-14px_rgba(196,42,53,0.85)] transition-all duration-400 hover:bg-brand-700 disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  Requesting…
                </>
              ) : (
                <>
                  Request {chosenLabel.split(",")[0]} at {time}
                  <ArrowRight className="h-4.5 w-4.5 transition-transform duration-400 group-hover:translate-x-1.5" />
                </>
              )}
            </button>

            <p className="text-center text-[12.5px] text-muted">
              30 minutes · No pitch deck · We will model your backlink gap live on the call
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
