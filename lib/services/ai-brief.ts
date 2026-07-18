import {
  METRICS_BY_OBJECTIVE,
  OBJECTIVE_LABEL,
  PLATFORM_CADENCE,
  PLATFORM_FORMAT,
  TONE_LABEL,
} from "@/lib/services/brief";

import type {
  ContentIdea,
  GeneratedBrief,
  GeneratedBriefInput,
  MessagingPillar,
  Platform,
  PostingStrategyItem,
} from "@/types/brief";

/**
 * ---------------------------------------------------------------------------
 * MOCK AI GENERATION LAYER
 * ---------------------------------------------------------------------------
 *
 * This is the ONLY file that contains AI generation logic.
 *
 * The rest of the application depends only on:
 *
 * generateBrief(input): Promise<GeneratedBrief>
 *
 * Replacing this with OpenAI, Anthropic or another provider later should only
 * require changing this file.
 * ---------------------------------------------------------------------------
 */

function buildSummary(input: GeneratedBriefInput): string {
  const { form, brand } = input;

  const objective = OBJECTIVE_LABEL[form.objective].toLowerCase();
  const tone = TONE_LABEL[form.toneOfVoice].toLowerCase();

  return `${form.campaignName} is a ${tone} campaign for ${brand.brandName}, designed to ${objective}. It targets ${form.targetAudience} with the core message "${form.keyMessage}" and encourages the audience to ${form.callToAction}.`;
}

function buildAudienceInsights(
  input: GeneratedBriefInput
): GeneratedBrief["audienceInsights"] {
  const { form } = input;

  return {
    profile: `${form.targetAudience}. They respond well to a ${TONE_LABEL[
      form.toneOfVoice
    ].toLowerCase()} tone and platform-native content.`,

    painPoints: [
      "Overwhelmed by generic marketing messages.",
      "Limited time to evaluate products and services.",
      "Need clear value before taking action.",
    ],

    motivations: [
      `A compelling reason to ${form.callToAction.toLowerCase()}.`,
      "Trustworthy brands with consistent messaging.",
      "Content that solves a real problem.",
    ],
  };
}

function buildMessagingPillars(
  input: GeneratedBriefInput
): MessagingPillar[] {
  const { form } = input;

  return [
    {
      title: "Core Message",
      description: `Every asset should reinforce "${form.keyMessage}".`,
    },
    {
      title: "Consistent Voice",
      description: `Maintain a ${TONE_LABEL[
        form.toneOfVoice
      ].toLowerCase()} tone across every platform.`,
    },
    {
      title: "Strong Call-to-Action",
      description: `Every piece of content should encourage the audience to "${form.callToAction}".`,
    },
  ];
}

function buildContentIdeas(
  input: GeneratedBriefInput
): ContentIdea[] {
  const { form } = input;

  const platforms: Platform[] =
    form.platforms.length > 0 ? form.platforms : ["instagram"];

  return platforms.flatMap((platform) =>
    PLATFORM_FORMAT[platform].map((format) => ({
      platform,
      format,
      concept: `${format} focused on "${form.keyMessage}", ending with a clear invitation to ${form.callToAction.toLowerCase()}.`,
    }))
  );
}

function buildPostingStrategy(
  input: GeneratedBriefInput
): PostingStrategyItem[] {
  const { form } = input;

  const platforms: Platform[] =
    form.platforms.length > 0 ? form.platforms : ["instagram"];

  return platforms.map((platform) => ({
    platform,
    frequency: PLATFORM_CADENCE[platform].frequency,
    bestTimes: PLATFORM_CADENCE[platform].bestTimes,
    notes: `Start with ${PLATFORM_FORMAT[
      platform
    ][0].toLowerCase()} and optimize based on early engagement.`,
  }));
}

/**
 * Mock AI generation.
 *
 * A small delay is intentionally included so the UI behaves exactly as it
 * would with a real AI provider.
 */
export async function generateBrief(
  input: GeneratedBriefInput
): Promise<GeneratedBrief> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { form, brand } = input;

  return {
    id: `brief_${Date.now()}`,

    createdAt: new Date().toISOString(),

    campaignName: form.campaignName,

    brandName: brand.brandName,

    objective: form.objective,

    platforms: form.platforms,

    deadline: form.deadline,

    summary: buildSummary(input),

    audienceInsights: buildAudienceInsights(input),

    messagingPillars: buildMessagingPillars(input),

    contentIdeas: buildContentIdeas(input),

    postingStrategy: buildPostingStrategy(input),

    successMetrics: METRICS_BY_OBJECTIVE[form.objective],
  };
}
