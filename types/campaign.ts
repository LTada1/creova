import type { GeneratedBrief } from "@/types/brief";

export interface SocialPost {
  headline: string;
  caption: string;
  callToAction: string;
  hashtags: string[];
}

export interface TikTokContent {
  hook: string;
  concept: string;
  scriptBeats: string[];
  caption: string;
  hashtags: string[];
}

export interface YouTubeContent {
  title: string;
  description: string;
  videoOutline: string[];
  thumbnailText: string;
}

export interface XThread {
  posts: string[];
}

export interface EmailNewsletter {
  subject: string;
  previewText: string;
  body: string;
  callToAction: string;
}

export interface ContentCalendarItem {
  day: string;
  channel: string;
  content: string;
  goal: string;
}

export interface GenerationPrompt {
  asset: string;
  prompt: string;
}

export interface GeneratedCampaignInput {
  brief: GeneratedBrief;
}

export interface GeneratedCampaign {
  id: string;
  createdAt: string;
  briefId: string;
  campaignName: string;
  brandName: string;
  summary: string;
  instagram: SocialPost;
  tiktok: TikTokContent;
  youtube: YouTubeContent;
  linkedin: SocialPost;
  xThread: XThread;
  facebook: SocialPost;
  emailNewsletter: EmailNewsletter;
  contentCalendar: ContentCalendarItem[];
  imageGenerationPrompts: GenerationPrompt[];
  videoGenerationPrompts: GenerationPrompt[];
}

export interface SavedCampaign extends GeneratedCampaign {
  associatedBriefName: string | null;
}
