import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal, TextReveal } from "@/components/motion/Reveal";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    // Fluid rhythm (the reference scales its section gap with the viewport
    // rather than stepping between three fixed values).
    <section id={id} className={cn("relative py-[clamp(5rem,10vw,9.5rem)]", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  title,
  body,
  align = "left",
  className,
  accent = false,
}: {
  // Kept in the type so existing call sites passing it don't need
  // touching — the micro-heading badge it used to render was removed
  // site-wide, so the value itself is intentionally no longer read here.
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
  // A plain colour bar, not a text pill — opt-in per call site so the
  // sitewide "no micro-headings" removal isn't reversed everywhere at once.
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {accent && (
        <div
          aria-hidden
          className={cn(
            "mb-4 h-[3px] w-10 rounded-full bg-brand-600",
            align === "center" && "mx-auto",
          )}
        />
      )}
      <h2 className="display text-[clamp(2.1rem,5vw,4rem)] text-ink">
        <TextReveal text={title} />
      </h2>
      {body && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-5 text-pretty text-[17px] leading-relaxed text-slate-body",
              align === "center" && "mx-auto max-w-2xl",
            )}
          >
            {body}
          </p>
        </Reveal>
      )}
    </div>
  );
}
