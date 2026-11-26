# Linkible — Website Redesign

A React/Next.js rebuild of [linkible.io](https://linkible.io), carrying the full page and
content structure of the original, styled with the motion language of
[b2design.nl](https://www.b2design.nl) in a white / blue / grey palette.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, React 19, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`) |
| Motion | `motion` (Framer Motion v13) + Lenis smooth scroll |
| Icons | lucide-react |
| Fonts | Inter (body) + Inter Tight (display), via `next/font` |

## Commands

```bash
npm run dev      # development server
npm run build    # production build (64 static routes)
npm start        # serve the production build
npm run lint     # eslint
```

## Design system

Everything is driven by tokens in `src/app/globals.css`:

- **Blue** `--color-brand-50 … --color-brand-900` — primary actions, accents, gradients
- **Grey** `--color-mist-50 … --color-mist-400` — surfaces, borders, section bands
- **Ink** `--color-ink`, `--color-ink-soft`, `--color-slate-body`, `--color-muted` — type
- **Glass** `.glass`, `.glass-strong`, `.glass-card` — the backdrop-blur surfaces used by the
  navigation, stat cards and hero chips

## Motion

Borrowed from the b2design reference (which drives its own effects through
`data-cursor-text`, `data-animation` and `data-bgcolor` attributes):

| Component | Behaviour |
|---|---|
| `motion/Cursor` | Custom cursor that grows on interactive elements and fills with a label wherever `data-cursor-text="…"` is set |
| `motion/SmoothScroll` | Lenis inertia scrolling, anchor interception, scroll reset on route change |
| `motion/Reveal` | `Reveal` (`fade` 26px/1s, or `wipe` — clip-path left→right), `Stagger`/`StaggerItem`, and the headline reveals `TextReveal` (per word) / `LineReveal` (whole line — required wherever a `bg-clip-text` gradient is applied). Headlines rise from a rotated mask (`translateY(130%) rotate(2deg)` → 0, ~1.05s, ease-out-expo); the mask has 0.22em/0.08em headroom on every side and stops clipping once settled. A wipe's observer sits on an unclipped outer element — Chromium's IntersectionObserver never fires for an element whose own clip-path hides all of it |
| `motion/Magnetic` | Buttons that pull toward the pointer |
| `motion/Counter` | Counts up on entry; renders the real figure server-side |
| `motion/Marquee` | Infinite masked logo ribbon |
| `motion/ScrollProgress` | Gradient progress bar |
| `motion/SectionBg` | Page background shifts per section (the `data-bgcolor` idea) |

The glassmorphic navigation (`layout/Nav.tsx`) blurs over content, contracts on scroll,
opens hover mega-menus with staggered columns, and becomes a full-height drawer on mobile.

**Reduced motion** is honoured properly: `MotionProvider` wraps the tree in
`<MotionConfig reducedMotion="user">`, because CSS duration overrides cannot reach
JS-driven animation. Counters render their final value for those users.

## Content

All copy lives in `src/data/` so pages stay presentational:

```
site.ts             navigation + footer link groups, contact details
services.ts         11 service pages
specializations.ts  10 specialization pages
countries.ts        13 market pages (composed from per-country seeds)
pricing.ts          4 plans, comparison matrix, commercial FAQs
caseStudies.ts      4 full case studies
blog.ts             6 long-form posts
faqs.ts             4 grouped FAQ sections
team.ts             team, values, milestones
content.ts          pillars, process, service cards, testimonials
```

## Routes (64 generated)

Every navigation and footer destination from the reference site exists:

- `/` · `/pricing` · `/about` · `/contact` · `/book-a-call` · `/faqs` · `/verify-team`
- `/terms` · `/privacy-policy` · `/checkout` (reads `?package=&industry=`)
- `/services` + 11 children · `/specialization` + 10 · `/countries` + 13
- `/case-study` + 4 · `/blogs` + 6
- `/sitemap.xml` · `/robots.txt` · custom `not-found`

## Forms

Contact, booking and checkout are complete, validated front-end flows with optimistic
success states. Submission is stubbed with a short delay — wire each `onSubmit` to your
CRM, scheduler and payment provider (each is marked with a comment).

## Verified

- `tsc --noEmit`, `eslint`, and `next build` all pass clean
- All 58 crawlable internal links return 200; unknown routes 404 correctly
- No horizontal overflow across 21 pages at 390px and 1440px
