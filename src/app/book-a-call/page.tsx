import type { Metadata } from "next";
import { Check } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import BookingForm from "@/components/sections/BookingForm";
import Testimonials from "@/components/sections/Testimonials";
import { Container, Section } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Book a free 30-minute strategy session. We model your backlink gap live and tell you what it realistically takes to close it.",
};

const agenda = [
  {
    title: "We model your gap live",
    body: "Screen shared, in real time — your page-level referring domain deficit against your three closest competitors.",
  },
  {
    title: "We give you the real timeline",
    body: "Including the months where nothing visible happens. You should know that before you commit budget, not after.",
  },
  {
    title: "We tell you if you don't need us",
    body: "Sometimes the bottleneck is technical, or content, or the offer. We will say so rather than sell you links.",
  },
  {
    title: "You get the analysis either way",
    body: "The gap model is yours to keep whether you work with us or take it to another agency.",
  },
];

export default function BookACallPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a call"
        title="Get your free strategy session"
        body="Thirty minutes with a strategist who will have looked at your site before the call. No pitch deck, no discovery gauntlet — just the numbers and an honest read on what they mean."
        crumbs={[{ label: "Book a Call" }]}
        compact
      />

      <Section className="pt-2">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <div>
              <h2 className="display text-[clamp(1.5rem,2.8vw,2rem)] text-ink">
                What happens on the call
              </h2>
              <Stagger className="mt-8 space-y-0">
                {agenda.map((a) => (
                  <StaggerItem key={a.title}>
                    <div className="group flex gap-4 border-b border-mist-200 py-6 first:border-t">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white transition-transform duration-400 group-hover:scale-110">
                        <Check className="h-3.5 w-3.5" strokeWidth={3.5} />
                      </span>
                      <div>
                        <h3 className="text-[16.5px] font-semibold tracking-tight text-ink">
                          {a.title}
                        </h3>
                        <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-body">
                          {a.body}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal delay={0.2}>
                <div className="mt-8 rounded-[26px] border border-brand-200/70 bg-brand-50/60 p-6">
                  <p className="text-[14.5px] leading-relaxed text-ink-soft">
                    Prefer to write first?{" "}
                    <a href="/contact" className="font-semibold text-brand-700 underline underline-offset-4">
                      Send us a message
                    </a>{" "}
                    and we will reply within one business day.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <BookingForm />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Testimonials />
    </>
  );
}
