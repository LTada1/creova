import type {
  ContentCalendarItem,
  GeneratedCampaign,
  GeneratedCampaignInput,
  GenerationPrompt,
  SocialPost,
  TikTokContent,
  XThread,
  YouTubeContent,
} from "@/types/campaign";

/**
 * Mock campaign generation layer.
 *
 * This is deliberately deterministic: a saved brief always produces the
 * same campaign content. Replace only this service when a real AI provider
 * is introduced.
 */
function buildInstagram(input: GeneratedCampaignInput): SocialPost {
  const { brief } = input;

  return {
    headline: brief.campaignName,
    caption: `${brief.summary} Save this for your next step, then ${brief.summary.includes("encourages") ? "take action" : "join us"}.`,
    callToAction: "Discover more today.",
    hashtags: ["#CreovaCampaign", "#BrandStory", "#CreativeStrategy"],
  };
}

function buildTikTok(input: GeneratedCampaignInput): TikTokContent {
  const { brief } = input;

  return {
    hook: `What if ${brief.campaignName} could change the way you show up?`,
    concept: `A fast, platform-native reveal of the campaign's core idea: ${brief.summary}`,
    scriptBeats: [
      "Open with a bold visual tension or relatable problem.",
      "Reveal the campaign value in one clear, memorable line.",
      "Show the audience what the next step looks like.",
      "End with a direct invitation to participate.",
    ],
    caption: `${brief.campaignName}, made for the moment.`,
    hashtags: ["#ForYou", "#CampaignLaunch", "#CreativeIdea"],
  };
}

function buildYouTube(input: GeneratedCampaignInput): YouTubeContent {
  const { brief } = input;

  return {
    title: `${brief.campaignName}: The Story Behind the Campaign`,
    description: `${brief.summary}\n\nFollow the campaign journey and see how the idea comes to life.`,
    videoOutline: [
      "Introduce the audience need and campaign promise.",
      "Show the idea in action through a concise story.",
      "Share a proof point or behind-the-scenes moment.",
      "Close with the campaign call to action.",
    ],
    thumbnailText: `${brief.campaignName}\nStarts here`,
  };
}

function buildXThread(input: GeneratedCampaignInput): XThread {
  const { brief } = input;

  return {
    posts: [
      `1/ ${brief.campaignName} is here. ${brief.summary}`,
      "2/ The campaign starts with one clear idea: make the value impossible to miss.",
      "3/ We are building every touchpoint around a consistent, audience-first story.",
      "4/ Follow along, share your perspective, and be part of what comes next.",
    ],
  };
}

function buildCalendar(input: GeneratedCampaignInput): ContentCalendarItem[] {
  const { brief } = input;

  return [
    { day: "Day 1", channel: "Instagram", content: "Campaign reveal carousel", goal: "Awareness" },
    { day: "Day 2", channel: "TikTok", content: "Hook-led campaign video", goal: "Reach" },
    { day: "Day 3", channel: "LinkedIn", content: "Campaign point of view", goal: "Credibility" },
    { day: "Day 4", channel: "X", content: "Narrative campaign thread", goal: "Conversation" },
    { day: "Day 5", channel: "YouTube", content: `${brief.campaignName} story video`, goal: "Consideration" },
    { day: "Day 6", channel: "Facebook", content: "Community campaign post", goal: "Engagement" },
    { day: "Day 7", channel: "Email", content: "Campaign newsletter", goal: "Conversion" },
  ];
}

function buildImagePrompts(input: GeneratedCampaignInput): GenerationPrompt[] {
  const { brief } = input;

  return [
    {
      asset: "Hero campaign image",
      prompt: `Editorial campaign image for ${brief.brandName}, expressing ${brief.campaignName}; confident, polished composition, clear subject, brand-safe lighting, no text.`,
    },
    {
      asset: "Instagram carousel",
      prompt: `A cohesive three-panel social carousel for ${brief.campaignName}, visual storytelling around the campaign promise, modern art direction, generous space for optional copy, no text rendered.`,
    },
    {
      asset: "Email header",
      prompt: `A clean horizontal email-header visual for ${brief.campaignName}, focused on anticipation and clarity, premium editorial photography style, no text rendered.`,
    },
  ];
}

function buildVideoPrompts(input: GeneratedCampaignInput): GenerationPrompt[] {
  const { brief } = input;

  return [
    {
      asset: "TikTok reveal",
      prompt: `Vertical 9:16 campaign reveal for ${brief.campaignName}: immediate visual hook, fast cuts, one central transformation, energetic but brand-safe pacing, end on a confident product or brand moment.`,
    },
    {
      asset: "YouTube campaign story",
      prompt: `Cinematic 16:9 brand story for ${brief.campaignName}: establish audience context, reveal the core idea, show authentic moments, finish with a memorable call to action.`,
    },
  ];
}

/** Generates a complete deterministic mock campaign from one saved brief. */
export async function generateCampaign(
  input: GeneratedCampaignInput
): Promise<GeneratedCampaign> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { brief } = input;

  return {
    id: `campaign_${brief.id}`,
    createdAt: new Date().toISOString(),
    briefId: brief.id,
    campaignName: brief.campaignName,
    brandName: brief.brandName,
    summary: `A coordinated multi-channel rollout for ${brief.campaignName}. ${brief.summary}`,
    instagram: buildInstagram(input),
    tiktok: buildTikTok(input),
    youtube: buildYouTube(input),
    linkedin: {
      headline: `${brief.campaignName}: a campaign built for relevance`,
      caption: `${brief.summary} This is an invitation to move from attention to meaningful action.`,
      callToAction: "Join the conversation.",
      hashtags: ["#BrandStrategy", "#CampaignThinking", "#CreativeLeadership"],
    },
    xThread: buildXThread(input),
    facebook: {
      headline: `Introducing ${brief.campaignName}`,
      caption: `${brief.summary} We would love to hear what resonates with you.`,
      callToAction: "Share your thoughts below.",
      hashtags: ["#Community", "#CampaignUpdate"],
    },
    emailNewsletter: {
      subject: `${brief.campaignName} is here`,
      previewText: "A new campaign, a clear story, and your next step.",
      body: `${brief.summary}\n\nExplore the campaign and discover what comes next.`,
      callToAction: "Explore the campaign",
    },
    contentCalendar: buildCalendar(input),
    imageGenerationPrompts: buildImagePrompts(input),
    videoGenerationPrompts: buildVideoPrompts(input),
  };
}
