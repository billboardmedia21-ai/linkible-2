import type { Metadata } from "next";
import BlogIndex from "@/components/sections/BlogIndex";
import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import { posts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Link building playbooks, digital PR teardowns and honest data on what actually moves rankings.",
};

export default function BlogsPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Playbooks, teardowns and honest data"
        body="What we have learned across 300+ campaigns, written up without the hedging. Mostly the things we wish someone had told us earlier."
        crumbs={[{ label: "Blog" }]}
        compact
      />
      <BlogIndex posts={posts} />
      <CTA
        title="Prefer this applied to your site?"
        body="Book a call and we will run the same analysis from these posts against your own domain, live."
      />
    </>
  );
}
