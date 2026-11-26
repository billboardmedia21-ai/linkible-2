import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { DetailPage } from "@/data/types";
import { Container, Section } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export default function IndexGrid({
  items,
  base,
}: {
  items: DetailPage[];
  base: string;
}) {
  return (
    <Section className="pt-4">
      <Container>
        <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <StaggerItem key={item.slug}>
              <Link
                href={`${base}/${item.slug}`}
                data-cursor-text="Explore"
                className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-mist-200 bg-white p-7 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-brand-200 hover:shadow-[0_36px_80px_-40px_rgba(196,42,53,0.45)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-400 to-brand-700 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[10.5px] font-semibold tracking-[0.16em] text-brand-600 uppercase">
                    {item.eyebrow}
                  </span>
                  <span className="text-[11px] font-medium text-mist-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="display mt-6 text-[22px] leading-tight text-ink">{item.name}</h2>
                <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-slate-body">
                  {item.intro.length > 150 ? `${item.intro.slice(0, 150).trim()}…` : item.intro}
                </p>

                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-mist-200 pt-5">
                  {item.heroStats.slice(0, 2).map((s) => (
                    <span
                      key={s.label}
                      className="rounded-full bg-mist-100 px-3 py-1 text-[11.5px] font-medium text-slate-body"
                    >
                      {s.value}
                    </span>
                  ))}
                </div>

                <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-600">
                  Learn more
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
