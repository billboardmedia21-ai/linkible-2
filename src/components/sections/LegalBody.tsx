"use client";

import { useEffect, useState } from "react";
import { Container, Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export type LegalSection = { id: string; heading: string; paragraphs: string[]; list?: string[] };

export default function LegalBody({ sections }: { sections: LegalSection[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <Section className="pt-2">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="mb-4 text-[10.5px] font-semibold tracking-[0.18em] text-muted uppercase">
              On this page
            </p>
            <ul className="space-y-0.5 border-l border-mist-200">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={cn(
                      "-ml-px block border-l-2 py-2 pl-4 text-[14px] transition-all duration-300",
                      active === s.id
                        ? "border-brand-600 font-medium text-brand-700"
                        : "border-transparent text-slate-body hover:border-mist-400 hover:text-ink",
                    )}
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <div className="max-w-3xl">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-32 border-b border-mist-200 py-10 first:pt-0 last:border-0">
                <h2 className="display text-[clamp(1.4rem,2.6vw,1.9rem)] text-ink">{s.heading}</h2>
                <div className="mt-5 space-y-4">
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className="text-[15.5px] leading-relaxed text-slate-body">
                      {p}
                    </p>
                  ))}
                  {s.list && (
                    <ul className="mt-4 space-y-2.5">
                      {s.list.map((li) => (
                        <li key={li} className="flex gap-3 text-[15.5px] leading-relaxed text-slate-body">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                          {li}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
