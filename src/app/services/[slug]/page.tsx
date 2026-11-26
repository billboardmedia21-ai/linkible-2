import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailTemplate from "@/components/sections/DetailTemplate";
import { services, getService } from "@/data/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getService(slug);
  if (!page) return { title: "Not found" };
  return { title: page.name, description: page.intro.slice(0, 158) };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getService(slug);
  if (!page) notFound();

  const related = services
    .filter((s) => s.slug !== slug)
    .slice(0, 3)
    .map((s) => ({ slug: s.slug, name: s.name, eyebrow: s.eyebrow }));

  return (
    <DetailTemplate
      page={page}
      crumbs={[{ label: "Services", href: "/services" }, { label: page.name }]}
      related={related}
      relatedTitle="Other services worth a look"
      relatedHrefBase="/services"
    />
  );
}
