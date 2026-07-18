import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/dashboard/hero";
import { GoalCardsGrid } from "@/components/dashboard/goal-cards-grid";
import { RecentCampaigns } from "@/components/dashboard/recent-campaigns";
import { ContinueWorking } from "@/components/dashboard/continue-working";
import { RecommendedRecipes } from "@/components/dashboard/recommended-recipes";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 md:px-8">
          <Hero />
          <GoalCardsGrid />

          <div className="mt-12 flex flex-col gap-12">
            <RecentCampaigns />
            <ContinueWorking />
            <RecommendedRecipes />
          </div>
        </main>
      </div>
    </div>
  );
}
