import { GOAL_CARDS } from "@/data/dummy-data";
import { GoalCard } from "@/components/dashboard/goal-card";

export function GoalCardsGrid() {
  return (
    <section aria-label="Choose a starting point" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {GOAL_CARDS.map((goal, index) => (
        <GoalCard key={goal.id} goal={goal} className={index === 0 ? "lg:col-span-2" : undefined} />
      ))}
    </section>
  );
}
