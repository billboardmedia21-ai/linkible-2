import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import Testimonials from "@/components/sections/Testimonials";
import TrustMarquee from "@/components/sections/TrustMarquee";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import { team, values, milestones } from "@/data/team";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Linkible is a white-hat link building and digital PR agency founded in North Sydney, working across eight markets and four continents.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title="An outreach team that shows its working"
        body="Linkible started in 2021 with two outreach specialists and a spreadsheet of publisher contacts. Five years later we have run over 300 campaigns across eight markets — and never had a client receive a manual action."
        crumbs={[{ label: "Who We Are" }]}
      />

      <Section className="pt-0">
        <Container>
          <Reveal>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Metric value={300} suffix="+" label="Campaigns run" />
              <Metric value={1200} suffix="+" label="Links placed" />
              <Metric value={8} suffix="" label="Markets covered" />
              <Metric value={0} suffix="" label="Manual actions" />
            </div>
          </Reveal>
        </Container>
      </Section>

      <TrustMarquee />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading
              eyebrow="How we operate"
              title="Four things we will not trade away"
              body="These are not values on a wall. They are the rules we use to decide what work to take and what to turn down."
            />
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {values.map((v) => (
                <StaggerItem key={v.title}>
                  <div className="h-full rounded-[26px] border border-mist-200 bg-white p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[0_28px_60px_-34px_rgba(196,42,53,0.4)]">
                    <h3 className="text-[18px] leading-snug font-semibold tracking-tight text-ink">
                      {v.title}
                    </h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-slate-body">{v.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      <Section className="bg-mist-100/70">
        <Container>
          <SectionHeading eyebrow="Timeline" title="How we got here" align="center" />
          <Stagger className="mt-14 grid gap-3 md:grid-cols-5">
            {milestones.map((m) => (
              <StaggerItem key={m.year}>
                <div className="group relative h-full rounded-3xl border border-white bg-white/80 p-6 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:bg-white hover:shadow-[0_28px_60px_-34px_rgba(196,42,53,0.4)]">
                  <span className="display text-[26px] text-brand-600">{m.year}</span>
                  <h3 className="mt-3 text-[15.5px] leading-snug font-semibold text-ink">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slate-body">{m.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="The team"
            title="The people who will actually work on your account"
            body="You get a named strategist, not a ticket queue. Every person listed here is verifiable on our Verify Team page."
          />
          <Stagger className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <StaggerItem key={m.id}>
                <div className="group h-full overflow-hidden rounded-[26px] border border-mist-200 bg-white transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-brand-200 hover:shadow-[0_32px_70px_-38px_rgba(196,42,53,0.45)]">
                  <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-brand-500 to-brand-800">
                    <div className="grain absolute inset-0 opacity-50" />
                    <span className="display relative text-[42px] text-white/90">
                      {m.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-[16.5px] font-semibold tracking-tight text-ink">{m.name}</h3>
                    <p className="mt-0.5 text-[13.5px] font-medium text-brand-600">{m.role}</p>
                    <p className="mt-3 text-[13px] leading-relaxed text-slate-body">{m.focus}</p>
                    <p className="mt-4 border-t border-mist-200 pt-3 text-[12px] text-muted">
                      {m.location} · since {m.since}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Testimonials />
      <CTA
        title="Want to meet the team?"
        body="Book a call and you will speak to the strategist who would run your account — not a salesperson who hands you off afterwards."
      />
    </>
  );
}

function Metric({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div className="rounded-3xl border border-mist-200 bg-mist-50 p-7 text-center transition-colors duration-500 hover:border-brand-200 hover:bg-white">
      <p className="display text-[clamp(2rem,4vw,2.8rem)] text-brand-700">
        <Counter value={value} suffix={suffix} />
      </p>
      <p className="mt-1.5 text-[14px] text-slate-body">{label}</p>
    </div>
  );
}
