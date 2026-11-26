import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({
  className,
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Linkible home"
      className={cn("group flex items-center gap-2.5", className)}
    >
      <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_6px_18px_-6px_rgba(196,42,53,0.7)]">
        <span className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
        <svg viewBox="0 0 24 24" className="relative h-[18px] w-[18px]" fill="none">
          <path
            d="M9.5 14.5 14.5 9.5M8 12.5 6.2 14.3a3.25 3.25 0 0 0 4.6 4.6l1.8-1.8M16 11.5l1.8-1.8a3.25 3.25 0 0 0-4.6-4.6l-1.8 1.8"
            stroke="white"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span
        className={cn(
          "display text-[21px] tracking-[-0.045em]",
          invert ? "text-white" : "text-ink",
        )}
      >
        Linkible
      </span>
    </Link>
  );
}
