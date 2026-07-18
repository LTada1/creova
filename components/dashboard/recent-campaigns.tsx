import { RECENT_CAMPAIGNS } from "@/data/dummy-data";
import { CampaignCard } from "@/components/dashboard/campaign-card";
import { SectionHeader } from "@/components/dashboard/section-header";

export function RecentCampaigns() {
  return (
    <section>
      <SectionHeader title="Recent Campaigns" actionLabel="View all" actionHref="/campaigns" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {RECENT_CAMPAIGNS.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </section>
  );
}
