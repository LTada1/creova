"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkle } from "lucide-react";

import { NAV_ITEMS } from "@/data/dummy-data";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-background/60 md:flex">
      <div className="flex h-14 items-center gap-2 px-5">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-nova-ember">
          <Sparkle className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
        </div>
        <span className="text-sm font-semibold tracking-tight">Creova</span>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  isActive ? "text-nova" : "text-muted-foreground group-hover:text-foreground"
                )}
                strokeWidth={2}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mx-3 mb-4 rounded-lg border border-border bg-card p-3">
        <p className="text-xs font-medium">Workspace plan</p>
        <p className="mt-0.5 text-xs text-muted-foreground">Growth &middot; 12 of 20 seats used</p>
      </div>
    </aside>
  );
}
