import type { ReactNode } from "react";
import { Container } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * A home-page section with an optional illustration beside its content.
 * Content and art sit in two equal columns on desktop (art on `side`), and
 * stack on small screens with the art below the copy.
 */
export default function StageSection({
  id,
  className,
  children,
  art,
  side = "right",
  tall = true,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  art?: ReactNode;
  side?: "left" | "right";
  tall?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("relative flex items-center py-20 sm:py-24", tall && art && "lg:min-h-[88svh]", className)}
    >
      <Container className="w-full">
        {art ? (
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className={cn(side === "left" && "lg:order-2")}>{children}</div>
            <div className={cn("w-full", side === "left" && "lg:order-1")}>{art}</div>
          </div>
        ) : (
          children
        )}
      </Container>
    </section>
  );
}
