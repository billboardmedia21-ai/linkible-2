import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { Reveal, TextReveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export default function CTA({
  title = "Ready to outrank the sites above you?",
  body = "Book a free strategy session. We will model your backlink gap live on the call and tell you exactly what it takes to close it.",
  primary = { label: "Get Your Free Strategy Session", href: "/book-a-call" },
  secondary = { label: "View Pricing", href: "/pricing" },
}: {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <Section className="pb-8">
      <Container>
        <Reveal variant="wipe">
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-6 py-16 text-center sm:px-14 sm:py-20">
            <div className="grain absolute inset-0 opacity-60" />
            <div
              aria-hidden
              className="absolute -top-32 -right-20 h-[360px] w-[360px] rounded-full bg-brand-400/30 blur-[110px]"
            />
            <div
              aria-hidden
              className="absolute -bottom-40 -left-24 h-[380px] w-[380px] rounded-full bg-white/10 blur-[120px]"
            />

            <div className="relative mx-auto max-w-3xl">
              <h2 className="display text-[clamp(2rem,4.8vw,3.6rem)] text-white">
                <TextReveal text={title} />
              </h2>
              <Reveal delay={0.15}>
                <p className="mx-auto mt-6 max-w-xl text-pretty text-[17px] leading-relaxed text-brand-100">
                  {body}
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <ButtonLink
                    href={primary.href}
                    variant="light"
                    size="lg"
                    data-cursor-text="Book now"
                  >
                    {primary.label}
                    <ArrowRight className="h-4 w-4" />
                  </ButtonLink>
                  <Link
                    href={secondary.href}
                    className="inline-flex h-14 items-center rounded-full border border-white/25 px-8 text-base font-medium text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
                  >
                    {secondary.label}
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={0.35}>
                <p className="mt-7 text-[13px] text-brand-200/80">
                  No lock-in contracts · Cancel anytime · Reply within one business day
                </p>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
