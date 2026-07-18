import { ArrowUpRight } from "lucide-react";

import type { GoalCard as GoalCardType } from "@/types";
import { cn } from "@/lib/utils";

export function GoalCard({ goal, className }: { goal: GoalCardType; className?: string }) {
  const Icon = goal.icon;
  const isNova = goal.accent === "nova";

  return (
    <button
      type="button"
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:border-white/15 hover:shadow-lg hover:shadow-black/20",
        className
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg",
          isNova ? "bg-nova/15 text-nova" : "bg-ember/15 text-ember"
        )}
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold tracking-tight">{goal.title}</h3>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground">{goal.description}</p>
      </div>
    </button>
  );
}
