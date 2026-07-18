import { Search, Sparkle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-2 md:hidden">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-nova-ember">
          <Sparkle className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
        </div>
        <span className="text-sm font-semibold tracking-tight">Creova</span>
      </div>

      <div className="relative w-full max-w-sm">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search campaigns, brands, recipes…"
          className="pl-8"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <Avatar>
          <AvatarFallback>LK</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
