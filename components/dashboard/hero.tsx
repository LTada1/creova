import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-nova-glow" />

      <div className="relative flex flex-col items-start gap-6 pb-8 pt-10 md:pt-14">
        <div className="flex w-full flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl animate-fade-up">
            <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              What would you like to accomplish today?
            </h1>
            <p className="mt-2 text-base text-muted-foreground">
              Turn ideas into complete creative campaigns.
            </p>
          </div>

          <Button size="lg" className="shrink-0 animate-fade-up">
            <Plus className="h-4 w-4" />
            New Campaign
          </Button>
        </div>
      </div>
    </section>
  );
}
