import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Reveal, TextReveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export default function PageHero({
  title,
  body,
  crumbs = [],
  stats,
  children,
  compact = false,
}: {
  // Kept in the type so existing call sites passing it don't need
  // touching — the micro-heading badge it used to render was removed
  // site-wide, so the value itself is intentionally no longer read here.
  eyebrow?: string;
  title: string;
  body?: string;
  crumbs?: Crumb[];
  stats?: { value: string; label: string }[];
  children?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        compact ? "pt-32 pb-14 sm:pt-40" : "pt-32 pb-20 sm:pt-40 lg:pt-44",
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/90 via-white to-white" />
        <div className="absolute -top-32 right-[10%] h-[380px] w-[380px] rounded-full bg-brand-200/45 blur-[130px]" />
        <div className="absolute -top-20 left-[4%] h-[300px] w-[300px] rounded-full bg-brand-300/25 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(31,20,21,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,20,21,0.04) 1px, transparent 1px)",
            backgroundSize: "68px 68px",
            maskImage: "radial-gradient(ellipse 80% 55% at 50% 0%, #000 15%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 55% at 50% 0%, #000 15%, transparent 72%)",
          }}
        />
      </div>

      <Container>
        {crumbs.length > 0 && (
          <Reveal y={12}>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted">
                <li>
                  <Link href="/" className="transition-colors hover:text-brand-600">
                    Home
                  </Link>
                </li>
                {crumbs.map((c) => (
                  <li key={c.label} className="flex items-center gap-1.5">
                    <ChevronRight className="h-3.5 w-3.5 text-mist-400" />
                    {c.href ? (
                      <Link href={c.href} className="transition-colors hover:text-brand-600">
                        {c.label}
                      </Link>
                    ) : (
                      <span className="text-ink-soft">{c.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        )}

        <div className="max-w-5xl">
          <h1 className="display text-[clamp(2.5rem,6.2vw,5rem)] text-ink">
            <TextReveal text={title} delay={0.08} />
          </h1>

          {body && (
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-slate-body sm:text-[18.5px]">
                {body}
              </p>
            </Reveal>
          )}

          {children && <Reveal delay={0.3}>{children}</Reveal>}
        </div>

        {stats && stats.length > 0 && (
          <Reveal delay={0.35}>
            <dl
              className={cn(
                "mt-14 grid gap-3",
                // 2x2 balances better than a lopsided 3-then-1 row.
                stats.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3",
              )}
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass-card rounded-3xl p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5"
                >
                  <dt className="display text-[clamp(1.5rem,3vw,2rem)] text-brand-700">
                    {s.value}
                  </dt>
                  <dd className="mt-1.5 text-[14px] text-slate-body">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
