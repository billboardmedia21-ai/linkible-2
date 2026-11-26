import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import IndexGrid from "@/components/sections/IndexGrid";
import CTA from "@/components/sections/CTA";
import { specializations } from "@/data/specializations";

export const metadata: Metadata = {
  title: "Specializations",
  description:
    "Link building, guest posting, digital PR, influencer marketing and international SEO specializations.",
};

export default function SpecializationIndex() {
  return (
    <>
      <PageHero
        eyebrow="Specializations"
        title="The disciplines we go deep on"
        body="Ten focused practices, each with its own team, process and reporting. Most campaigns combine two or three — we will tell you which ones your site actually needs."
        crumbs={[{ label: "Specializations" }]}
        compact
      />
      <IndexGrid items={specializations} base="/specialization" />
      <CTA />
    </>
  );
}
