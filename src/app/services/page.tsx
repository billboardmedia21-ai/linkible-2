import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import IndexGrid from "@/components/sections/IndexGrid";
import CTA from "@/components/sections/CTA";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Link Building Services",
  description:
    "HARO, white label, broken link building and industry-specific link building services from Linkible.",
};

export default function ServicesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Link building for every kind of site"
        body="Core outreach services plus industry-specific programmes built around how each vertical actually earns links. Pick the one that matches your market, or talk to us and we will tell you."
        crumbs={[{ label: "Services" }]}
        compact
      />
      <IndexGrid items={services} base="/services" />
      <CTA />
    </>
  );
}
