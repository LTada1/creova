import { ListChecks, Clock, ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/dashboard/section-header";
import { RECOMMENDED_RECIPES } from "@/data/dummy-data";
import type { Recipe } from "@/types";

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Card className="group flex cursor-pointer flex-col justify-between transition-all hover:-translate-y-0.5 hover:border-white/15">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{recipe.tag}</Badge>
          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        <p className="mt-3 text-sm font-medium">{recipe.title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{recipe.description}</p>

        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <ListChecks className="h-3.5 w-3.5" />
            {recipe.steps} steps
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            ~{recipe.estMinutes} min
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function RecommendedRecipes() {
  return (
    <section>
      <SectionHeader title="Recommended Recipes" actionLabel="Browse all" actionHref="/creative-recipes" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {RECOMMENDED_RECIPES.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}
