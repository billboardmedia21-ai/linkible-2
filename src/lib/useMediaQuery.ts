"use client";

import { useSyncExternalStore } from "react";

/** Subscribes to a media query without setState-in-effect, and renders a
 *  stable `false` on the server so hydration matches. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
