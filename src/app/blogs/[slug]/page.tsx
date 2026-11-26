import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import CTA from "@/components/sections/CTA";
import { Container, Section } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem, TextReveal } from "@/components/motion/Reveal";
import { posts, getPost } from "@/data/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt.slice(0, 158),
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== slug).slice(0, 3);
  const date = new Date(post.date).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <article>
        <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-50/90 via-white to-white" />
            <div className="absolute -top-28 right-[12%] h-[340px] w-[340px] rounded-full bg-brand-200/40 blur-[130px]" />
          </div>

          <Container>
            <div className="mx-auto max-w-3xl">
              <Reveal y={12}>
                <Link
                  href="/blogs"
                  className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-muted transition-colors hover:text-brand-600"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  All articles
                </Link>
              </Reveal>

              <Reveal y={14} delay={0.05}>
                <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-white/70 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-brand-700 uppercase backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  {post.category}
                </span>
              </Reveal>

              <h1 className="display mt-6 text-[clamp(2rem,4.8vw,3.4rem)] text-ink">
                <TextReveal text={post.title} delay={0.1} />
              </h1>

              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-mist-200 pt-6 text-[13.5px] text-muted">
                  <span className="font-medium text-ink-soft">{post.author}</span>
                  <span className="h-1 w-1 rounded-full bg-mist-400" />
                  <span>{date}</span>
                  <span className="h-1 w-1 rounded-full bg-mist-400" />
                  <span>{post.readTime}</span>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <Section className="pt-4">
          <Container>
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <p className="border-l-2 border-brand-500 pl-6 text-[19px] leading-relaxed text-pretty text-ink-soft">
                  {post.excerpt}
                </p>
              </Reveal>

              <div className="mt-14 space-y-12">
                {post.body.map((block, i) => (
                  <Reveal key={i} delay={0.05}>
                    <div>
                      {block.heading && (
                        <h2 className="display text-[clamp(1.5rem,2.8vw,2rem)] text-ink">
                          {block.heading}
                        </h2>
                      )}
                      <div className={block.heading ? "mt-5 space-y-5" : "space-y-5"}>
                        {block.paragraphs.map((p, j) => (
                          <p key={j} className="text-[17px] leading-[1.75] text-slate-body">
                            {p}
                          </p>
                        ))}
                      </div>
                      {block.list && (
                        <ul className="mt-6 space-y-3 rounded-[24px] border border-mist-200 bg-mist-50 p-7">
                          {block.list.map((item) => (
                            <li key={item} className="flex gap-3.5">
                              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                              <span className="text-[16px] leading-relaxed text-ink-soft">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      </article>

      <Section className="bg-mist-100/70">
        <Container>
          <h2 className="display text-[clamp(1.7rem,3.4vw,2.5rem)] text-ink">
            <TextReveal text="Keep reading" />
          </h2>
          <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <StaggerItem key={r.slug}>
                <Link
                  href={`/blogs/${r.slug}`}
                  data-cursor-text="Read post"
                  className="group flex h-full flex-col justify-between rounded-3xl border border-mist-200 bg-white p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[0_28px_60px_-34px_rgba(196,42,53,0.45)]"
                >
                  <div>
                    <p className="text-[10.5px] font-semibold tracking-[0.16em] text-brand-600 uppercase">
                      {r.category}
                    </p>
                    <p className="mt-3 text-[16.5px] leading-snug font-medium text-ink">{r.title}</p>
                  </div>
                  <div className="mt-8 flex items-center justify-between text-[12.5px] text-muted">
                    {r.readTime}
                    <ArrowUpRight className="h-4.5 w-4.5 text-mist-400 transition-all duration-400 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-600" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
