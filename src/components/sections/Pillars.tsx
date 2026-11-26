import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { pillars } from "@/data/content";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export default function Pillars() {
  return (
    <Section className="relative overflow-hidden bg-mist-100/70">
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100/40 blur-[150px]"
      />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:items-start lg:gap-20">
          <SectionHeading
            eyebrow="Why choose us"
            title="Built to be defensible, not just fast"
            body="Anyone can buy links. We build the kind you could show a board, a lawyer, or a Google engineer without flinching — and we show you every one before you are invoiced."
          />

          <Stagger className="grid gap-4 sm:grid-cols-2">
            {pillars.map((p) => (
              <StaggerItem key={p.title}>
                <div className="group h-full rounded-[26px] border border-white bg-white/80 p-7 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_30px_70px_-38px_rgba(196,42,53,0.5)]">
                  <div className="flex items-baseline gap-2">
                    <span className="display text-[34px] text-brand-600">{p.metric}</span>
                    <span className="text-[12px] font-medium tracking-wide text-muted uppercase">
                      {p.metricLabel}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-body">{p.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
