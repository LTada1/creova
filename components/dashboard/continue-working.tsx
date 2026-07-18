import { CONTINUE_WORKING } from "@/data/dummy-data";
import { CampaignCard } from "@/components/dashboard/campaign-card";
import { SectionHeader } from "@/components/dashboard/section-header";

export function ContinueWorking() {
  return (
    <section>
      <SectionHeader title="Continue Working" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CONTINUE_WORKING.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </section>
  );
}
