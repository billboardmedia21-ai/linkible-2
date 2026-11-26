"use client";

import { Moon, Sun } from "lucide-react";

const KEY = "linkible-theme";

/** Light/dark switch. The initial theme is set by an inline script in the
 *  document head (see layout.tsx) so there is no flash; this only flips it. */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode: the choice just won't persist */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      data-cursor-text="Theme"
      className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-white text-ink shadow-[0_3px_0_0_var(--color-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-200 active:translate-y-[2px] active:shadow-none ${className}`}
    >
      <Moon className="h-[18px] w-[18px] dark:hidden" />
      <Sun className="hidden h-[18px] w-[18px] dark:block" />
    </button>
  );
}
