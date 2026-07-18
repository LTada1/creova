import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { Campaign, CampaignStatus } from "@/types";

const STATUS_LABEL: Record<CampaignStatus, string> = {
  draft: "Draft",
  in_review: "In review",
  scheduled: "Scheduled",
  live: "Live",
  completed: "Completed",
};

const STATUS_VARIANT: Record<CampaignStatus, "default" | "secondary" | "outline" | "ember" | "success"> = {
  draft: "outline",
  in_review: "ember",
  scheduled: "secondary",
  live: "success",
  completed: "secondary",
};

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Card className="group cursor-pointer transition-all hover:-translate-y-0.5 hover:border-white/15">
      <div className={cn("h-24 w-full rounded-t-xl bg-gradient-to-br", campaign.thumbnailGradient)} />
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{campaign.name}</p>
            <p className="truncate text-xs text-muted-foreground">{campaign.brand}</p>
          </div>
          <Badge variant={STATUS_VARIANT[campaign.status]} className="shrink-0">
            {STATUS_LABEL[campaign.status]}
          </Badge>
        </div>

        <div className="mt-3">
          <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
            <span>{campaign.channel}</span>
            <span>{campaign.progress}%</span>
          </div>
          <Progress value={campaign.progress} />
        </div>

        <p className="mt-3 text-xs text-muted-foreground">{campaign.updatedAt}</p>
      </CardContent>
    </Card>
  );
}
