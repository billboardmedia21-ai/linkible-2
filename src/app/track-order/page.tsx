import type { Metadata } from "next";
import { Mail, Clock, ShieldCheck } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import TrackOrderForm from "@/components/sections/TrackOrderForm";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Track Order",
  description: "Look up the status of an active Linkible campaign with your order ID.",
};

export default function TrackOrderPage() {
  return (
    <>
      <PageHero
        title="Track your order"
        body="Enter your order ID and the email you used at checkout to see exactly where your campaign is — from confirmation to the day a link goes live."
        crumbs={[{ label: "Track Order" }]}
        compact
      />

      <Section className="pt-2">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
            <div className="space-y-4">
              <Reveal>
                <InfoCard
                  icon={<Mail className="h-5 w-5" />}
                  label="Can't find your order ID?"
                  value="Check the confirmation email from checkout, or reach out and we'll look it up by account email."
                />
              </Reveal>
              <Reveal delay={0.08}>
                <InfoCard
                  icon={<Clock className="h-5 w-5" />}
                  label="Reporting cadence"
                  value="Every active campaign gets a live status update at each stage, plus a full monthly report."
                />
              </Reveal>
              <Reveal delay={0.16}>
                <InfoCard
                  icon={<ShieldCheck className="h-5 w-5" />}
                  label="Still stuck?"
                  value={`Email ${site.email} with your order ID and we'll reply within one business day.`}
                />
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <TrackOrderForm />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-[26px] border border-mist-200 bg-white p-6">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        {icon}
      </span>
      <span>
        <span className="block text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
          {label}
        </span>
        <span className="mt-1.5 block text-[14.5px] leading-relaxed font-medium text-ink-soft">
          {value}
        </span>
      </span>
    </div>
  );
}
