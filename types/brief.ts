export type CampaignObjective =
  | "launch_product"
  | "increase_awareness"
  | "drive_sales"
  | "grow_audience"
  | "promote_event"
  | "other";

export type ToneOfVoice =
  | "professional"
  | "friendly"
  | "playful"
  | "bold"
  | "luxury"
  | "minimal";

export type Platform =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "facebook"
  | "x"
  | "linkedin"
  | "email";

/**
 * Normalized brand profile shape used only by the Brief Builder feature.
 *
 * The current schema supports exactly ONE brand profile per user.
 *
 * If multi-brand support is introduced later, only the
 * brand-profile service needs to change.
 */
export interface BrandProfileSummary {
  id: string;
  brandName: string;
  industry: string | null;
  targetAudience: string | null;
  brandVoice: string | null;
}

export interface BriefFormValues {
  campaignName: string;
  objective: CampaignObjective;
  targetAudience: string;
  toneOfVoice: ToneOfVoice;
  platforms: Platform[];
  keyMessage: string;
  callToAction: string;

  /**
   * yyyy-mm-dd from <input type="date">
   */
  deadline: string;
}

export interface GeneratedBriefInput {
  form: BriefFormValues;
  brand: BrandProfileSummary;
}

export interface MessagingPillar {
  title: string;
  description: string;
}

export interface ContentIdea {
  platform: Platform;
  format: string;
  concept: string;
}

export interface PostingStrategyItem {
  platform: Platform;
  frequency: string;
  bestTimes: string;
  notes: string;
}

export interface SuccessMetric {
  label: string;
  target: string;
  description: string;
}

export interface GeneratedBrief {
  id: string;
  createdAt: string;

  campaignName: string;
  brandName: string;

  objective: CampaignObjective;

  /**
   * Platforms selected for this campaign.
   */
  platforms: Platform[];

  deadline: string;

  summary: string;

  audienceInsights: {
    profile: string;
    painPoints: string[];
    motivations: string[];
  };

  messagingPillars: MessagingPillar[];

  contentIdeas: ContentIdea[];

  postingStrategy: PostingStrategyItem[];

  successMetrics: SuccessMetric[];
}
