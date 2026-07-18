import type {
  BriefFormValues,
  CampaignObjective,
  Platform,
  SuccessMetric,
  ToneOfVoice,
} from "@/types/brief";

export const OBJECTIVE_OPTIONS: {
  value: CampaignObjective;
  label: string;
}[] = [
  { value: "launch_product", label: "Launch a product" },
  { value: "increase_awareness", label: "Increase brand awareness" },
  { value: "drive_sales", label: "Drive sales or conversions" },
  { value: "grow_audience", label: "Grow audience or followers" },
  { value: "promote_event", label: "Promote an event" },
  { value: "other", label: "Other" },
];

export const TONE_OPTIONS: {
  value: ToneOfVoice;
  label: string;
}[] = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "playful", label: "Playful" },
  { value: "bold", label: "Bold" },
  { value: "luxury", label: "Luxury" },
  { value: "minimal", label: "Minimal" },
];

export const PLATFORM_OPTIONS: {
  value: Platform;
  label: string;
}[] = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "facebook", label: "Facebook" },
  { value: "x", label: "X (Twitter)" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "email", label: "Email" },
];

export const OBJECTIVE_LABEL: Record<CampaignObjective, string> =
  Object.fromEntries(
    OBJECTIVE_OPTIONS.map((option) => [option.value, option.label])
  ) as Record<CampaignObjective, string>;

export const TONE_LABEL: Record<ToneOfVoice, string> = Object.fromEntries(
  TONE_OPTIONS.map((option) => [option.value, option.label])
) as Record<ToneOfVoice, string>;

export const PLATFORM_LABEL: Record<Platform, string> = Object.fromEntries(
  PLATFORM_OPTIONS.map((option) => [option.value, option.label])
) as Record<Platform, string>;

export const PLATFORM_FORMAT: Record<Platform, string[]> = {
  instagram: ["Carousel post", "Reels"],
  tiktok: ["Short-form video"],
  youtube: ["Long-form video", "YouTube Shorts"],
  facebook: ["Community post"],
  x: ["Thread"],
  linkedin: ["Thought-leadership post"],
  email: ["Newsletter"],
};

export const PLATFORM_CADENCE: Record<
  Platform,
  {
    frequency: string;
    bestTimes: string;
  }
> = {
  instagram: {
    frequency: "4–5x per week",
    bestTimes: "Tue–Thu, 11am–1pm",
  },
  tiktok: {
    frequency: "5–7x per week",
    bestTimes: "7–9pm daily",
  },
  youtube: {
    frequency: "1–2x per week",
    bestTimes: "Saturday mornings",
  },
  facebook: {
    frequency: "3x per week",
    bestTimes: "Weekday afternoons",
  },
  x: {
    frequency: "1x per day",
    bestTimes: "9am & 6pm",
  },
  linkedin: {
    frequency: "2–3x per week",
    bestTimes: "Tue–Thu, 8–10am",
  },
  email: {
    frequency: "1x per week",
    bestTimes: "Tuesday mornings",
  },
};

export const METRICS_BY_OBJECTIVE: Record<
  CampaignObjective,
  SuccessMetric[]
> = {
  launch_product: [
    {
      label: "Reach",
      target: "50,000+ impressions",
      description:
        "Unique accounts exposed to launch content during the first two weeks.",
    },
    {
      label: "Engagement rate",
      target: "4%+",
      description: "Likes, comments and shares relative to reach.",
    },
    {
      label: "Waitlist / Signups",
      target: "500+",
      description: "Users registering interest before or during launch.",
    },
    {
      label: "Sales conversions",
      target: "2–3%",
      description: "Visitors completing a purchase.",
    },
  ],

  increase_awareness: [
    {
      label: "Reach",
      target: "100,000+ impressions",
      description: "Total audience reached.",
    },
    {
      label: "Brand mentions",
      target: "+20%",
      description: "Increase in organic mentions.",
    },
    {
      label: "Follower growth",
      target: "+5–8%",
      description: "Net follower increase.",
    },
    {
      label: "Video completion",
      target: "40%+",
      description: "Percentage of viewers watching until the end.",
    },
  ],

  drive_sales: [
    {
      label: "Conversion rate",
      target: "2.5%+",
      description: "Visitors completing a purchase.",
    },
    {
      label: "ROAS",
      target: "3x+",
      description: "Return on ad spend.",
    },
    {
      label: "CTR",
      target: "1.5%+",
      description: "Click-through rate.",
    },
    {
      label: "Average order value",
      target: "+10%",
      description: "Increase in average purchase value.",
    },
  ],

  grow_audience: [
    {
      label: "Follower growth",
      target: "+10–15%",
      description: "Net audience growth.",
    },
    {
      label: "Engagement rate",
      target: "5%+",
      description: "Interactions relative to reach.",
    },
    {
      label: "Share rate",
      target: "1%+",
      description: "Shares and reposts.",
    },
    {
      label: "Profile visits",
      target: "+25%",
      description: "Increase in profile visits.",
    },
  ],

  promote_event: [
    {
      label: "Registrations",
      target: "300+",
      description: "Confirmed event registrations.",
    },
    {
      label: "Reach",
      target: "40,000+ impressions",
      description: "Audience reached.",
    },
    {
      label: "Attendance",
      target: "60%+",
      description: "Registrations converting into attendance.",
    },
    {
      label: "Event engagement",
      target: "8%+",
      description: "Engagement during event promotion.",
    },
  ],

  other: [
    {
      label: "Reach",
      target: "To be defined",
      description: "Campaign reach.",
    },
    {
      label: "Engagement",
      target: "To be defined",
      description: "Audience engagement.",
    },
    {
      label: "Conversions",
      target: "To be defined",
      description: "Primary conversion metric.",
    },
    {
      label: "Growth",
      target: "To be defined",
      description: "Primary growth metric.",
    },
  ],
};

export const EMPTY_BRIEF_FORM: BriefFormValues = {
  campaignName: "",
  objective: "launch_product",
  targetAudience: "",
  toneOfVoice: "professional",
  platforms: [],
  keyMessage: "",
  callToAction: "",
  deadline: "",
};

export function isBriefFormValid(values: BriefFormValues): boolean {
  return (
    values.campaignName.trim().length > 0 &&
    values.targetAudience.trim().length > 0 &&
    values.keyMessage.trim().length > 0 &&
    values.callToAction.trim().length > 0 &&
    values.platforms.length > 0
  );
}
