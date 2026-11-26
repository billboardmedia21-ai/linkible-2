import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailTemplate from "@/components/sections/DetailTemplate";
import { specializations, getSpecialization } from "@/data/specializations";

export function generateStaticParams() {
  return specializations.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getSpecialization(slug);
  if (!page) return { title: "Not found" };
  return { title: page.name, description: page.intro.slice(0, 158) };
}

export default async function SpecializationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getSpecialization(slug);
  if (!page) notFound();

  const related = specializations
    .filter((s) => s.slug !== slug)
    .slice(0, 3)
    .map((s) => ({ slug: s.slug, name: s.name, eyebrow: s.eyebrow }));

  return (
    <DetailTemplate
      page={page}
      crumbs={[
        { label: "Specializations", href: "/specialization" },
        { label: page.name },
      ]}
      related={related}
      relatedTitle="Related specializations"
      relatedHrefBase="/specialization"
    />
  );
}
