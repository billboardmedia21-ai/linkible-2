"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BadgeCheck, Search, ShieldAlert, ShieldCheck } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";
import { Container, Section } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { team } from "@/data/team";
import { site } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function VerifyTeamPage() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const results = q
    ? team.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.id.toLowerCase().includes(q),
      )
    : team;

  return (
    <>
      <PageHero
        eyebrow="Verify team"
        title="Check that you are talking to us"
        body="People occasionally impersonate agencies to solicit payments. Search any name, email address or staff ID below to confirm the person contacting you genuinely works at Linkible."
        crumbs={[{ label: "Verify Team" }]}
        compact
      />

      <Section className="pt-2">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl">
              <div className="group relative">
                <Search className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-muted transition-colors group-focus-within:text-brand-600" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, email or staff ID…"
                  aria-label="Search team members"
                  className="h-15 w-full rounded-full border border-mist-300 bg-white pr-6 pl-14 text-[16px] text-ink shadow-[0_10px_40px_-24px_rgba(196,42,53,0.4)] transition-all duration-400 outline-none placeholder:text-muted focus:border-brand-400 focus:shadow-[0_16px_50px_-24px_rgba(196,42,53,0.55)]"
                />
              </div>

              <AnimatePresence mode="wait">
                {q && (
                  <motion.p
                    key={results.length > 0 ? "found" : "none"}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`mt-5 flex items-center justify-center gap-2 text-[14.5px] font-medium ${
                      results.length > 0 ? "text-brand-700" : "text-red-600"
                    }`}
                  >
                    {results.length > 0 ? (
                      <>
                        <ShieldCheck className="h-4.5 w-4.5" />
                        {results.length} verified {results.length === 1 ? "match" : "matches"} found
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="h-4.5 w-4.5" />
                        No match. Treat this contact as unverified and email {site.email}.
                      </>
                    )}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          <Stagger className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((m) => (
              <StaggerItem key={m.id}>
                <motion.div
                  layout
                  transition={{ duration: 0.5, ease: EASE }}
                  className="h-full rounded-[26px] border border-mist-200 bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[0_28px_60px_-34px_rgba(196,42,53,0.4)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-800 text-[15px] font-semibold text-white">
                      {m.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-700">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  </div>

                  <h2 className="mt-5 text-[17px] font-semibold tracking-tight text-ink">
                    {m.name}
                  </h2>
                  <p className="mt-0.5 text-[13.5px] font-medium text-brand-600">{m.role}</p>

                  <dl className="mt-5 space-y-2 border-t border-mist-200 pt-4 text-[13px]">
                    <Row label="Staff ID" value={m.id} mono />
                    <Row label="Email" value={m.email} />
                    <Row label="Location" value={m.location} />
                    <Row label="With us since" value={m.since} />
                  </dl>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2}>
            <div className="mx-auto mt-14 max-w-3xl rounded-[26px] border border-brand-200/70 bg-brand-50/60 p-7">
              <h2 className="text-[17px] font-semibold tracking-tight text-ink">
                How to spot an impersonator
              </h2>
              <ul className="mt-4 space-y-2.5 text-[14.5px] leading-relaxed text-slate-body">
                <li>
                  · Every genuine Linkible email address ends in <strong>@linkible.io</strong>. We
                  never contact clients from free email providers.
                </li>
                <li>
                  · We never request payment to a personal account, in cryptocurrency, or through
                  gift cards.
                </li>
                <li>
                  · We never ask for your website passwords. We request delegated access through
                  Google&apos;s own permission screens.
                </li>
                <li>
                  · If anything feels off, stop and email{" "}
                  <a href={`mailto:${site.email}`} className="font-medium text-brand-700 underline">
                    {site.email}
                  </a>{" "}
                  before sending money or credentials.
                </li>
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTA
        title="Something look suspicious?"
        body="Forward the message to us and we will confirm within the hour whether it came from our team."
        primary={{ label: "Report it to us", href: "/contact" }}
        secondary={{ label: "Who We Are", href: "/about" }}
      />
    </>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="shrink-0 text-muted">{label}</dt>
      <dd className={`truncate text-right text-ink-soft ${mono ? "font-mono text-[12.5px]" : ""}`}>
        {value}
      </dd>
    </div>
  );
}
