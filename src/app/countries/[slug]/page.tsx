import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailTemplate from "@/components/sections/DetailTemplate";
import { countries, getCountry } from "@/data/countries";

export function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getCountry(slug);
  if (!page) return { title: "Not found" };
  return { title: page.name, description: page.intro.slice(0, 158) };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getCountry(slug);
  if (!page) notFound();

  const related = countries
    .filter((c) => c.slug !== slug)
    .slice(0, 6)
    .map((c) => ({ slug: c.slug, name: c.name, eyebrow: c.eyebrow }));

  return (
    <DetailTemplate
      page={page}
      crumbs={[{ label: "Countries", href: "/countries" }, { label: page.name }]}
      related={related}
      relatedTitle="Other markets we cover"
      relatedHrefBase="/countries"
    />
  );
}
