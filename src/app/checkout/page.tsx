import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import CheckoutPanel from "@/components/sections/CheckoutPanel";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { plans } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Start your Linkible campaign. No charge until we confirm fit.",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string; industry?: string }>;
}) {
  const sp = await searchParams;
  const requested = sp.package ?? "";
  const match = plans.find((p) => p.name.toLowerCase() === requested.toLowerCase());
  const industry = (sp.industry ?? "general").replace(/-/g, " ");

  return (
    <>
      <PageHero
        eyebrow="Checkout"
        title="Start your campaign"
        body="Confirm your plan and details. Nothing is charged on this page — we do a quick fit check first, then email a secure payment link."
        crumbs={[{ label: "Pricing", href: "/pricing" }, { label: "Checkout" }]}
        compact
      />

      <Section className="pt-2">
        <Container>
          <Reveal>
            <CheckoutPanel
              initialPlan={match?.name ?? plans[2].name}
              industry={industry.charAt(0).toUpperCase() + industry.slice(1)}
            />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
