import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import ContactForm from "@/components/sections/ContactForm";
import FaqAccordion from "@/components/sections/FaqAccordion";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { site, socials } from "@/data/site";
import { allFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to a Linkible strategist. We reply to every enquiry within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to a strategist, not a chatbot"
        body="Tell us what you are trying to rank for and who is currently beating you. We will reply within one business day with a genuine assessment — including when we think you do not need us."
        crumbs={[{ label: "Contact" }]}
        compact
      />

      <Section className="pt-2">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
            <div className="space-y-4">
              <Reveal>
                <ContactCard
                  icon={<Mail className="h-5 w-5" />}
                  label="Email"
                  value={site.email}
                  href={`mailto:${site.email}`}
                />
              </Reveal>
              <Reveal delay={0.08}>
                <ContactCard
                  icon={<Phone className="h-5 w-5" />}
                  label="Phone"
                  value={site.phone}
                  href={`tel:${site.phoneHref}`}
                />
              </Reveal>
              <Reveal delay={0.16}>
                <ContactCard
                  icon={<MapPin className="h-5 w-5" />}
                  label="Office"
                  value={site.address}
                />
              </Reveal>
              <Reveal delay={0.24}>
                <ContactCard
                  icon={<Clock className="h-5 w-5" />}
                  label="Response time"
                  value="Within one business day, Mon–Fri AEST"
                />
              </Reveal>

              <Reveal delay={0.3}>
                <div className="rounded-[26px] border border-brand-200/70 bg-brand-50/60 p-6">
                  <p className="text-[13px] font-semibold tracking-[0.14em] text-brand-700 uppercase">
                    Follow us
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-brand-200 bg-white px-4 py-2 text-[13.5px] font-medium text-brand-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 hover:text-white"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="bg-mist-100/70">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <SectionHeading
              eyebrow="Before you write"
              title="Answers that might save you a message"
              body="The four things people most often email us to ask."
            />
            <FaqAccordion items={allFaqs.slice(0, 4)} />
          </div>
        </Container>
      </Section>
    </>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="group flex items-start gap-4 rounded-[26px] border border-mist-200 bg-white p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_24px_60px_-34px_rgba(196,42,53,0.4)]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-500 group-hover:bg-brand-600 group-hover:text-white">
        {icon}
      </span>
      <span>
        <span className="block text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
          {label}
        </span>
        <span className="mt-1.5 block text-[15.5px] leading-snug font-medium text-ink">
          {value}
        </span>
      </span>
    </div>
  );

  return href ? (
    <a href={href} data-cursor-text="Reach out">
      {inner}
    </a>
  ) : (
    inner
  );
}
