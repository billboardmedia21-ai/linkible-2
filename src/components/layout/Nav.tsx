"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { mainNav, footerNav } from "@/data/site";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import Magnetic from "@/components/motion/Magnetic";
import ThemeToggle from "./ThemeToggle";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close any open menu when the route changes. Adjusting state during render
  // is React's recommended alternative to a setState-in-effect here.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-[90] px-3 pt-3 sm:px-5 sm:pt-4"
        onMouseLeave={() => setOpenMenu(null)}
      >
        <nav
          className={cn(
            "mx-auto flex items-center justify-between rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled
              ? "glass-strong max-w-[1140px] px-4 py-2.5 sm:px-5"
              : "glass max-w-[1240px] px-5 py-3.5 sm:px-6",
          )}
        >
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => {
              const hasMenu = Boolean(item.columns);
              return (
                <li
                  key={item.label}
                  // relative: the dropdown is positioned against THIS item, so
                  // it opens directly beneath its own title rather than under
                  // the whole bar. The panel is a DOM descendant of the li, so
                  // hovering it counts as hovering the item — the menu stays
                  // open while the pointer travels from title to panel.
                  className="relative"
                  onMouseEnter={() => setOpenMenu(hasMenu ? item.label : null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-colors duration-300",
                      isActive(item.href)
                        ? "text-brand-700"
                        : "text-ink-soft hover:text-brand-600",
                    )}
                  >
                    {item.label}
                    {hasMenu && (
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-300",
                          openMenu === item.label && "rotate-180",
                        )}
                      />
                    )}
                    {isActive(item.href) && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-brand-50"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {hasMenu && openMenu === item.label && (
                      // Plain wrapper does the centring (translate-x) and the
                      // hover bridge (the top padding); the motion element
                      // inside owns the animated transform, so the two never
                      // fight over the same `transform` property. The li is
                      // shorter than the pill around it, so the padding must
                      // cover the pill's own vertical padding (14px / 10px
                      // depending on scroll state) plus a ~10px visual gap —
                      // otherwise the panel overlaps the pill's bottom edge.
                      <div
                        className={cn(
                          "absolute top-full left-1/2 z-10 -translate-x-1/2",
                          scrolled ? "pt-[23px]" : "pt-[27px]",
                        )}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: -12, scale: 0.98 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            // Opacity on a parent cascades to its whole subtree,
                            // including the panel's own near-opaque background —
                            // so a single slow fade left page content visible
                            // through it for the first chunk of the entrance.
                            // Resolving opacity fast while position/scale keep
                            // settling avoids that see-through window.
                            transition: {
                              opacity: { duration: 0.16, ease: "easeOut" },
                              y: { duration: 0.4, ease: EASE },
                              scale: { duration: 0.4, ease: EASE },
                            },
                          }}
                          exit={{
                            opacity: 0,
                            y: -12,
                            scale: 0.98,
                            transition: { duration: 0.2, ease: EASE },
                          }}
                        >
                          <MegaPanel label={item.label} />
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Magnetic strength={0.25} className="hidden sm:block">
              <Link
                href="/book-a-call"
                data-cursor-text="Let's talk"
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-brand-600 px-5 text-[14.5px] font-medium text-white shadow-[0_8px_24px_-10px_rgba(196,42,53,0.8)] transition-all duration-300 hover:bg-brand-700"
              >
                Book a Call
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Magnetic>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-mist-300 bg-white/60 text-ink transition-colors hover:bg-white lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function MegaPanel({ label }: { label: string }) {
  const item = mainNav.find((n) => n.label === label);
  if (!item?.columns) return null;

  // A single column with no featured panel (Industries) reads as a compact
  // dropdown, not a full-width mega menu — stretching it across the same
  // grid the multi-column menus use would leave a large empty void, so it
  // gets its own narrower treatment, centred under its trigger.
  const compact = item.columns.length === 1 && !item.featured;

  return (
    <div>
      <div
        className={cn(
          "glass-panel overflow-hidden rounded-[28px] p-7",
          // Absolutely positioned now, so it no longer stretches to a parent —
          // each shape needs an explicit width.
          compact ? "w-72" : item.featured ? "w-[min(1100px,92vw)]" : "w-[520px]",
        )}
      >
        <div
          className={cn(
            "grid gap-8",
            compact
              ? "grid-cols-1"
              : item.featured
                ? "grid-cols-[1fr_1fr_1fr_0.9fr]"
                : "grid-cols-2",
          )}
        >
          {item.columns.map((col, ci) => (
            <div key={col.title || `col-${ci}`}>
              {col.title && (
                <p className="mb-4 text-[10.5px] font-semibold tracking-[0.18em] text-muted uppercase">
                  {col.title}
                </p>
              )}
              <ul className="space-y-1">
                {col.items.map((child, i) => (
                  <motion.li
                    key={child.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + ci * 0.04 + i * 0.03, duration: 0.4, ease: EASE }}
                  >
                    <Link
                      href={child.href}
                      className="group block rounded-xl px-3 py-2 transition-colors duration-250 hover:bg-brand-50/80"
                    >
                      <span className="flex items-center justify-between gap-3 text-[14.5px] font-medium text-ink group-hover:text-brand-700">
                        {child.label}
                        <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </span>
                      {child.blurb && (
                        <span className="mt-0.5 block text-[12.5px] leading-snug text-muted">
                          {child.blurb}
                        </span>
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}

          {item.featured && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12, duration: 0.5, ease: EASE }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white"
            >
              <div className="grain absolute inset-0 opacity-40" />
              <p className="relative display text-[19px] leading-tight">{item.featured.title}</p>
              <p className="relative mt-2 text-[13px] leading-relaxed text-brand-100">
                {item.featured.body}
              </p>
              <Link
                href={item.featured.href}
                className="relative mt-5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-brand-700 transition-transform duration-300 hover:-translate-y-0.5"
              >
                {item.featured.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[95] lg:hidden"
        >
          <div className="absolute inset-0 bg-ink/25 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-white/92 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-mist-200 px-5 py-4">
              <Logo />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-mist-300 text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <ul className="space-y-1">
                {mainNav.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: EASE }}
                    className="border-b border-mist-200/80 last:border-0"
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex-1 py-3.5 text-[19px] font-medium tracking-tight text-ink"
                      >
                        {item.label}
                      </Link>
                      {item.columns && (
                        <button
                          aria-label={`Expand ${item.label}`}
                          onClick={() =>
                            setExpanded(expanded === item.label ? null : item.label)
                          }
                          className="p-2.5 text-muted"
                        >
                          <ChevronDown
                            className={cn(
                              "h-4.5 w-4.5 transition-transform duration-300",
                              expanded === item.label && "rotate-180",
                            )}
                          />
                        </button>
                      )}
                    </div>

                    <AnimatePresence initial={false}>
                      {expanded === item.label && item.columns && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.38, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-4 pb-4">
                            {item.columns.map((col, ci) => (
                              <div key={col.title || `col-${ci}`}>
                                {col.title && (
                                  <p className="mb-1.5 text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
                                    {col.title}
                                  </p>
                                )}
                                <ul className="space-y-0.5">
                                  {col.items.map((c) => (
                                    <li key={c.href}>
                                      <Link
                                        href={c.href}
                                        onClick={onClose}
                                        className="block py-1.5 pl-3 text-[15px] text-slate-body"
                                      >
                                        {c.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
                className="mt-8"
              >
                <p className="mb-3 text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
                  Global Coverage
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {footerNav[3].links.slice(0, 8).map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={onClose}
                      className="rounded-full border border-mist-300 px-3 py-1.5 text-[12.5px] text-slate-body"
                    >
                      {l.label.replace("Link Building ", "")}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="border-t border-mist-200 p-5">
              <Link
                href="/book-a-call"
                onClick={onClose}
                className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-brand-600 py-3.5 font-medium text-white"
              >
                Book a Call
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
