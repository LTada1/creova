import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Generic presentational section wrapper.
 *
 * Styled to match the existing card pattern used throughout the
 * dashboard (border, rounded corners, consistent spacing).
 *
 * This component contains no business logic and can be reused
 * by future features outside the Brief Builder.
 */
interface BriefSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function BriefSection({
  title,
  children,
  className,
}: BriefSectionProps) {
  return (
    <section className={cn("border rounded-xl p-6", className)}>
      <h2 className="text-2xl font-bold">{title}</h2>

      <div className="mt-3 space-y-3 text-gray-700">
        {children}
      </div>
    </section>
  );
}
