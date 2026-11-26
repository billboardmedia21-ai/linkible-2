import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { footerNav, site, socials } from "@/data/site";
import { Container } from "@/components/ui/Section";
import Logo from "./Logo";
import { Reveal } from "@/components/motion/Reveal";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden bg-ink text-white">
      <div className="grain absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand-600/25 blur-[140px]"
      />

      <Container className="relative">
        <div className="grid gap-12 border-b border-white/10 py-16 lg:grid-cols-[1.15fr_2fr] lg:gap-20">
          <Reveal>
            <div>
              <Logo invert />
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/60">
                White-hat link building, digital PR and HARO placements for brands that
                need authority they can defend.
              </p>

              <div className="mt-7 space-y-3 text-[14.5px]">
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-3 text-white/70 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-brand-300" />
                  {site.email}
                </a>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="group flex items-center gap-3 text-white/70 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-brand-300" />
                  {site.phone}
                </a>
                <p className="flex items-start gap-3 text-white/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                  {site.address}
                </p>
              </div>

              <div className="mt-8 flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-500 hover:text-white"
                  >
                    <SocialIcon name={s.icon} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
            {footerNav.map((group, gi) => (
              <Reveal key={group.title} delay={gi * 0.06}>
                <div>
                  <h3 className="text-[11px] font-semibold tracking-[0.18em] text-brand-300 uppercase">
                    {group.title}
                  </h3>
                  <ul className="mt-5 space-y-2.5">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-start gap-1 text-[14px] leading-snug text-white/60 transition-colors duration-250 hover:text-white"
                        >
                          <span className="relative">
                            {link.label}
                            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-400 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                          </span>
                          <ArrowUpRight className="mt-0.5 h-3 w-3 shrink-0 opacity-0 transition-opacity duration-250 group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 py-7 text-[13px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/faqs" className="transition-colors hover:text-white">
              FAQs
            </Link>
            <Link href="/verify-team" className="transition-colors hover:text-white">
              Verify Team
            </Link>
          </div>
        </div>
      </Container>

      <div aria-hidden className="relative select-none overflow-hidden">
        <p className="display translate-y-[18%] text-center text-[clamp(4rem,17vw,15rem)] leading-none text-white/[0.045]">
          Linkible
        </p>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  const c = "h-4 w-4";
  if (name === "facebook")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={c}>
        <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
      </svg>
    );
  if (name === "linkedin")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={c}>
        <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM3.3 8.4h3.4V21H3.3zM10 8.4h3.25v1.73h.05c.45-.86 1.56-1.76 3.2-1.76 3.43 0 4.06 2.25 4.06 5.18V21h-3.4v-5.78c0-1.38-.03-3.15-1.92-3.15-1.92 0-2.21 1.5-2.21 3.05V21H10z" />
      </svg>
    );
  if (name === "x")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={c}>
        <path d="M17.5 3h3l-6.6 7.5L21.8 21h-6l-4.7-6.1L5.7 21H2.6l7-8L2.2 3h6.2l4.2 5.6zm-1 16h1.7L7.6 4.8H5.8z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={c}>
      <path d="M21.7 4.3 2.9 11.4c-.9.3-.9 1.6.1 1.9l4.7 1.5 1.8 5.4c.2.7 1.1.9 1.6.3l2.6-2.7 4.8 3.5c.6.4 1.4.1 1.6-.6l3.2-15c.2-.8-.6-1.5-1.4-1.2zM9.6 14.2l8.2-5.1-6.6 6.3-.3 3.1z" />
    </svg>
  );
}
