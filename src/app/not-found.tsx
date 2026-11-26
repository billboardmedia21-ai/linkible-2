import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Reveal, TextReveal } from "@/components/motion/Reveal";

const quickLinks = [
  { label: "Services", href: "/services" },
  { label: "Specializations", href: "/specialization" },
  { label: "Global coverage", href: "/countries" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case studies", href: "/case-study" },
  { label: "Blog", href: "/blogs" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/90 via-white to-white" />
        <div className="absolute -top-28 left-1/2 h-[420px] w-[520px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-[140px]" />
      </div>

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="display text-[clamp(5rem,16vw,10rem)] leading-none text-brand-600/15">
              404
            </p>
          </Reveal>

          <h1 className="display -mt-6 text-[clamp(1.9rem,4.4vw,3rem)] text-ink">
            <TextReveal text="This link is broken" />
          </h1>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-md text-[16.5px] leading-relaxed text-pretty text-slate-body">
              Ironic, given what we do. The page you wanted has moved or never existed — here is
              everywhere else worth going.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-9">
              <Link
                href="/"
                className="group inline-flex h-14 items-center gap-2 rounded-full bg-brand-600 px-8 text-base font-medium text-white shadow-[0_14px_36px_-14px_rgba(196,42,53,0.85)] transition-all duration-400 hover:bg-brand-700"
              >
                Back to home
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-400 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-12 flex flex-wrap justify-center gap-2">
              {quickLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-full border border-mist-300 bg-white/70 px-4 py-2 text-[13.5px] font-medium text-slate-body backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
