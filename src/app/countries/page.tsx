import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import IndexGrid from "@/components/sections/IndexGrid";
import CTA from "@/components/sections/CTA";
import { countries } from "@/data/countries";

export const metadata: Metadata = {
  title: "Global Link Building Coverage",
  description:
    "In-market link building across the USA, UK, Australia, Canada, Europe, India and more — with native-language outreach.",
};

export default function CountriesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Global coverage"
        title="Links from the markets you sell in"
        body="Regional rankings respond to in-market authority. We run native-language outreach across thirteen markets, with writers who read the local press every day."
        crumbs={[{ label: "Countries" }]}
        compact
      />
      <IndexGrid items={countries} base="/countries" />
      <CTA />
    </>
  );
}
