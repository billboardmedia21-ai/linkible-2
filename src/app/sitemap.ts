import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { specializations } from "@/data/specializations";
import { countries } from "@/data/countries";
import { caseStudies } from "@/data/caseStudies";
import { posts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics = [
    "",
    "/services",
    "/specialization",
    "/countries",
    "/pricing",
    "/blogs",
    "/case-study",
    "/about",
    "/contact",
    "/book-a-call",
    "/faqs",
    "/verify-team",
    "/terms",
    "/privacy-policy",
    "/track-order",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const dynamic = [
    ...services.map((s) => `/services/${s.slug}`),
    ...specializations.map((s) => `/specialization/${s.slug}`),
    ...countries.map((c) => `/countries/${c.slug}`),
    ...caseStudies.map((c) => `/case-study/${c.slug}`),
    ...posts.map((p) => `/blogs/${p.slug}`),
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...statics, ...dynamic];
}
