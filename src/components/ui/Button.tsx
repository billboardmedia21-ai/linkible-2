import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-tight transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white border-2 border-ink shadow-[0_4px_0_0_var(--color-ink)] hover:bg-brand-500 hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--color-ink)] active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--color-ink)]",
  secondary:
    "bg-white text-ink border-2 border-ink shadow-[0_4px_0_0_var(--color-ink)] hover:bg-gold-200 hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--color-ink)] active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--color-ink)]",
  ghost:
    "text-ink border-2 border-ink/80 hover:bg-gold-200 hover:-translate-y-0.5",
  light:
    "bg-gold-400 text-ink border-2 border-ink shadow-[0_4px_0_0_var(--color-ink)] hover:bg-gold-300 hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--color-ink)] active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--color-ink)]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  children,
  className,
  ...props
}: ButtonProps & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  children,
  className,
  ...props
}: ButtonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  const external = href.startsWith("http");
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn(base, variants[variant], sizes[size], className)}
      >
        {children}
        {arrow && <Arrow />}
      </a>
    );
  }
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

function Arrow() {
  return (
    <span className="relative h-4 w-4 overflow-hidden">
      <ArrowUpRight className="absolute h-4 w-4 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-4 group-hover/btn:-translate-y-4" />
      <ArrowUpRight className="absolute h-4 w-4 -translate-x-4 translate-y-4 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
    </span>
  );
}
