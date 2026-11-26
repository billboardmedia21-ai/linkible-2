"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/data/blog";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogIndex({ posts }: { posts: Post[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts],
  );
  const [filter, setFilter] = useState("All");

  const visible = filter === "All" ? posts : posts.filter((p) => p.category === filter);
  const featured = posts.find((p) => p.featured);

  return (
    <Section className="pt-2">
      <Container>
        {featured && filter === "All" && (
          <Reveal>
            <Link
              href={`/blogs/${featured.slug}`}
              data-cursor-text="Read post"
              className="group relative mb-12 block overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-8 text-white transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 sm:p-12"
            >
              <div className="grain absolute inset-0 opacity-50" />
              <div
                aria-hidden
                className="absolute -top-28 -right-16 h-[340px] w-[340px] rounded-full bg-brand-400/30 blur-[110px] transition-transform duration-1000 group-hover:scale-125"
              />
              <div className="relative max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase backdrop-blur-sm">
                  Featured · {featured.category}
                </span>
                <h2 className="display mt-6 text-[clamp(1.8rem,4vw,2.9rem)] text-white">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-pretty text-brand-100">
                  {featured.excerpt}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-brand-200">
                  <span>{formatDate(featured.date)}</span>
                  <span className="h-1 w-1 rounded-full bg-brand-300" />
                  <span>{featured.readTime}</span>
                  <span className="h-1 w-1 rounded-full bg-brand-300" />
                  <span>{featured.author}</span>
                  <ArrowUpRight className="ml-auto h-5 w-5 transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </Link>
          </Reveal>
        )}

        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-300",
                  filter === c ? "text-white" : "text-slate-body hover:text-brand-600",
                )}
              >
                {filter === c && (
                  <motion.span
                    layoutId="blog-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-brand-600"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={cn(
                    "absolute inset-0 -z-20 rounded-full border transition-colors duration-300",
                    filter === c ? "border-transparent" : "border-mist-300",
                  )}
                />
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((post) => (
              <motion.article
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <Link
                  href={`/blogs/${post.slug}`}
                  data-cursor-text="Read post"
                  className="group flex h-full flex-col rounded-[28px] border border-mist-200 bg-white p-7 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-brand-200 hover:shadow-[0_36px_80px_-42px_rgba(196,42,53,0.45)]"
                >
                  <span className="text-[10.5px] font-semibold tracking-[0.16em] text-brand-600 uppercase">
                    {post.category}
                  </span>
                  <h2 className="mt-4 text-[20px] leading-tight font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-brand-700">
                    {post.title}
                  </h2>
                  <p className="mt-3.5 flex-1 text-[14.5px] leading-relaxed text-slate-body">
                    {post.excerpt}
                  </p>
                  <div className="mt-7 flex items-center gap-3 border-t border-mist-200 pt-5 text-[12.5px] text-muted">
                    <span>{formatDate(post.date)}</span>
                    <span className="h-1 w-1 rounded-full bg-mist-400" />
                    <span>{post.readTime}</span>
                    <ArrowUpRight className="ml-auto h-4 w-4 text-mist-400 transition-all duration-400 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-600" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Section>
  );
}
