import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import CaseStudyIndex from "@/components/sections/CaseStudyIndex";
import CTA from "@/components/sections/CTA";
import Testimonials from "@/components/sections/Testimonials";
import { caseStudies } from "@/data/caseStudies";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real link building and digital PR campaigns with the numbers behind them — SaaS, real estate, healthcare and ecommerce.",
};

export default function CaseStudyPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Campaigns, with the numbers attached"
        body="Four engagements written up in full — what the problem was, what we actually did, and what happened. Including the timelines, which are longer than most agencies admit."
        crumbs={[{ label: "Case Study" }]}
        compact
      />
      <CaseStudyIndex studies={caseStudies} />
      <Testimonials />
      <CTA
        title="Want results like these?"
        body="Every study above started with the same free strategy session. We model your gap, tell you the realistic timeline, and you decide."
      />
    </>
  );
}
