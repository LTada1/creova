import { BriefSection } from "@/components/brief/BriefSection";
import type {
  GeneratedCampaign,
  GenerationPrompt,
  SocialPost,
} from "@/types/campaign";

function SocialPostContent({ post }: { post: SocialPost }) {
  return (
    <>
      <p className="font-medium text-black">{post.headline}</p>
      <p>{post.caption}</p>
      <p className="text-sm"><span className="font-medium">CTA:</span> {post.callToAction}</p>
      <p className="text-sm text-gray-500">{post.hashtags.join(" ")}</p>
    </>
  );
}

function PromptList({ prompts }: { prompts: GenerationPrompt[] }) {
  return (
    <div className="space-y-4">
      {prompts.map((prompt) => (
        <div key={prompt.asset} className="border rounded p-3">
          <p className="font-medium text-black">{prompt.asset}</p>
          <p className="mt-1 text-sm">{prompt.prompt}</p>
        </div>
      ))}
    </div>
  );
}

/** Pure presentational view for a generated campaign. */
export function CampaignPreview({
  campaign,
}: {
  campaign: GeneratedCampaign | null;
}) {
  if (!campaign) {
    return (
      <div className="border rounded-xl p-10 flex flex-col items-center justify-center text-center max-w-2xl">
        <p className="font-medium">No campaign yet</p>
        <p className="mt-1 text-sm text-gray-600">
          Choose a saved brief and generate a complete campaign plan.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold">{campaign.campaignName}</h1>
        <p className="mt-1 text-gray-600">{campaign.brandName}</p>
      </div>

      <BriefSection title="Campaign Summary">
        <p>{campaign.summary}</p>
      </BriefSection>

      <BriefSection title="Instagram Content">
        <SocialPostContent post={campaign.instagram} />
      </BriefSection>

      <BriefSection title="TikTok Content">
        <p><span className="font-medium">Hook:</span> {campaign.tiktok.hook}</p>
        <p><span className="font-medium">Concept:</span> {campaign.tiktok.concept}</p>
        <div>
          <p className="font-medium text-black">Script beats</p>
          <ol className="mt-1 list-decimal space-y-1 pl-5">
            {campaign.tiktok.scriptBeats.map((beat) => <li key={beat}>{beat}</li>)}
          </ol>
        </div>
        <p className="text-sm">{campaign.tiktok.caption}</p>
        <p className="text-sm text-gray-500">{campaign.tiktok.hashtags.join(" ")}</p>
      </BriefSection>

      <BriefSection title="YouTube Content">
        <p className="font-medium text-black">{campaign.youtube.title}</p>
        <p>{campaign.youtube.description}</p>
        <div>
          <p className="font-medium text-black">Video outline</p>
          <ol className="mt-1 list-decimal space-y-1 pl-5">
            {campaign.youtube.videoOutline.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </div>
        <p className="text-sm"><span className="font-medium">Thumbnail:</span> {campaign.youtube.thumbnailText}</p>
      </BriefSection>

      <BriefSection title="LinkedIn Content">
        <SocialPostContent post={campaign.linkedin} />
      </BriefSection>

      <BriefSection title="X Thread">
        <ol className="space-y-3">
          {campaign.xThread.posts.map((post) => <li key={post}>{post}</li>)}
        </ol>
      </BriefSection>

      <BriefSection title="Facebook Post">
        <SocialPostContent post={campaign.facebook} />
      </BriefSection>

      <BriefSection title="Email Newsletter">
        <p><span className="font-medium">Subject:</span> {campaign.emailNewsletter.subject}</p>
        <p><span className="font-medium">Preview:</span> {campaign.emailNewsletter.previewText}</p>
        <p className="whitespace-pre-line">{campaign.emailNewsletter.body}</p>
        <p className="text-sm"><span className="font-medium">CTA:</span> {campaign.emailNewsletter.callToAction}</p>
      </BriefSection>

      <BriefSection title="Content Calendar">
        <div className="space-y-3">
          {campaign.contentCalendar.map((item) => (
            <div key={`${item.day}-${item.channel}`} className="border rounded p-3 text-sm">
              <p className="font-medium text-black">{item.day} · {item.channel}</p>
              <p className="mt-1">{item.content}</p>
              <p className="mt-1 text-gray-500">Goal: {item.goal}</p>
            </div>
          ))}
        </div>
      </BriefSection>

      <BriefSection title="Image Generation Prompts">
        <PromptList prompts={campaign.imageGenerationPrompts} />
      </BriefSection>

      <BriefSection title="Video Generation Prompts">
        <PromptList prompts={campaign.videoGenerationPrompts} />
      </BriefSection>
    </div>
  );
}
