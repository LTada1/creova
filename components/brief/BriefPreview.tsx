import { BriefSection } from "@/components/brief/BriefSection";
import { OBJECTIVE_LABEL, PLATFORM_LABEL } from "@/lib/services/brief";
import type { GeneratedBrief } from "@/types/brief";

/**
 * Pure presentational component.
 * Renders a GeneratedBrief or an empty state.
 */
export function BriefPreview({
  brief,
}: {
  brief: GeneratedBrief | null;
}) {
  if (!brief) {
    return (
      <div className="border rounded-xl p-10 flex flex-col items-center justify-center text-center max-w-xl">
        <p className="font-medium">No brief yet</p>
        <p className="mt-1 text-sm text-gray-600">
          Fill in the form and generate a brief to see it laid out here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">{brief.campaignName}</h1>

        <p className="mt-1 text-gray-600">
          {brief.brandName} &middot; {OBJECTIVE_LABEL[brief.objective]}
          {brief.deadline && <> &middot; Due {brief.deadline}</>}
        </p>
      </div>

      <BriefSection title="Executive Summary">
        <p>{brief.summary}</p>
      </BriefSection>

      <BriefSection title="Audience Insights">
        <p>{brief.audienceInsights.profile}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <div>
            <p className="font-medium text-black">Pain points</p>

            {brief.audienceInsights.painPoints.length > 0 ? (
              <ul className="list-disc pl-5 mt-1 space-y-1">
                {brief.audienceInsights.painPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                No pain points available.
              </p>
            )}
          </div>

          <div>
            <p className="font-medium text-black">Motivations</p>

            {brief.audienceInsights.motivations.length > 0 ? (
              <ul className="list-disc pl-5 mt-1 space-y-1">
                {brief.audienceInsights.motivations.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                No motivations available.
              </p>
            )}
          </div>
        </div>
      </BriefSection>

      <BriefSection title="Messaging Pillars">
        {brief.messagingPillars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {brief.messagingPillars.map((pillar) => (
              <div key={pillar.title} className="border rounded p-3">
                <p className="font-medium text-black">{pillar.title}</p>
                <p className="mt-1 text-sm">{pillar.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No messaging pillars available.
          </p>
        )}
      </BriefSection>

      <BriefSection title="Content Ideas">
        {brief.contentIdeas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {brief.contentIdeas.map((idea) => (
              <div
                key={`${idea.platform}-${idea.format}`}
                className="border rounded p-3"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-black">
                    {PLATFORM_LABEL[idea.platform]}
                  </span>

                  <span className="text-gray-500">{idea.format}</span>
                </div>

                <p className="mt-2 text-sm">{idea.concept}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No content ideas generated.
          </p>
        )}
      </BriefSection>

      <BriefSection title="Posting Strategy">
        {brief.postingStrategy.length > 0 ? (
          <div className="divide-y">
            {brief.postingStrategy.map((item) => (
              <div
                key={item.platform}
                className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
              >
                <span className="font-medium text-black">
                  {PLATFORM_LABEL[item.platform]}
                </span>

                <span className="text-sm text-gray-500">
                  {item.frequency} &middot; {item.bestTimes}
                </span>

                <span className="text-sm sm:max-w-[45%]">
                  {item.notes}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No posting strategy available.
          </p>
        )}
      </BriefSection>

      <BriefSection title="Success Metrics">
        {brief.successMetrics.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {brief.successMetrics.map((metric) => (
              <div key={metric.label} className="border rounded p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-black">{metric.label}</p>

                  <span className="text-sm font-medium">
                    {metric.target}
                  </span>
                </div>

                <p className="mt-1 text-sm">{metric.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No success metrics available.
          </p>
        )}
      </BriefSection>
    </div>
  );
}
