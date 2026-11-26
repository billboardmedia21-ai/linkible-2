"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const shell =
  "peer h-14 w-full rounded-2xl border border-mist-300 bg-white px-4 pt-5 text-[15px] text-ink outline-none transition-all duration-300 placeholder:text-transparent focus:border-brand-500 focus:shadow-[0_0_0_4px_rgba(47,99,255,0.12)]";

const labelCls =
  "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-muted transition-all duration-300 peer-focus:top-4 peer-focus:text-[11.5px] peer-focus:font-medium peer-focus:text-brand-600 peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-[11.5px] peer-[:not(:placeholder-shown)]:font-medium";

export function Field({
  label,
  name,
  type = "text",
  required,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={label}
        className={shell}
      />
      <label htmlFor={name} className={labelCls}>
        {label}
        {required && <span className="text-brand-500"> *</span>}
      </label>
    </div>
  );
}

export function TextArea({
  label,
  name,
  rows = 5,
  required,
  className,
}: {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder={label}
        className={cn(shell, "h-auto resize-none py-5 pt-7 leading-relaxed")}
      />
      <label
        htmlFor={name}
        className="pointer-events-none absolute top-5 left-4 text-[15px] text-muted transition-all duration-300 peer-focus:top-2.5 peer-focus:text-[11.5px] peer-focus:font-medium peer-focus:text-brand-600 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[11.5px] peer-[:not(:placeholder-shown)]:font-medium"
      >
        {label}
        {required && <span className="text-brand-500"> *</span>}
      </label>
    </div>
  );
}

export function Select({
  label,
  name,
  options,
  required,
  defaultValue,
  className,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  defaultValue?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <label
        htmlFor={name}
        className="absolute top-3.5 left-4 text-[11.5px] font-medium text-muted"
      >
        {label}
        {required && <span className="text-brand-500"> *</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="h-14 w-full cursor-pointer appearance-none rounded-2xl border border-mist-300 bg-white px-4 pt-5 text-[15px] text-ink outline-none transition-all duration-300 focus:border-brand-500 focus:shadow-[0_0_0_4px_rgba(47,99,255,0.12)]"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-[12px] font-semibold tracking-[0.14em] text-muted uppercase">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            aria-pressed={value === o}
            className={cn(
              "rounded-full border px-4 py-2.5 text-[14px] font-medium transition-all duration-300",
              value === o
                ? "border-brand-600 bg-brand-600 text-white shadow-[0_8px_20px_-10px_rgba(196,42,53,0.8)]"
                : "border-mist-300 bg-white text-slate-body hover:border-brand-300 hover:text-brand-700",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function useFormStatus() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  return { status, setStatus };
}

export function SuccessPanel({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-[28px] border border-brand-200 bg-brand-50/70 p-10 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <h3 className="display mt-6 text-[26px] text-ink">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-[15.5px] leading-relaxed text-slate-body">{body}</p>
      {children}
    </div>
  );
}
