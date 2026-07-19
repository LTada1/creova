"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { CampaignPreview } from "@/components/campaign/CampaignPreview";
import { generateCampaign } from "@/lib/services/ai-campaign";
import { saveCampaign } from "@/lib/services/campaigns";
import { getBriefsForUser } from "@/lib/services/briefs";
import { supabase } from "@/lib/supabase/client";
import type { GeneratedBrief } from "@/types/brief";
import type { GeneratedCampaign } from "@/types/campaign";

/** Orchestrates saved-brief selection and local campaign generation. */
export function CampaignBuilder() {
  const router = useRouter();
  const [briefs, setBriefs] = useState<GeneratedBrief[]>([]);
  const [selectedBriefId, setSelectedBriefId] = useState("");
  const [campaign, setCampaign] = useState<GeneratedCampaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedCampaignId, setSavedCampaignId] = useState<string | null>(null);

  const selectedBrief = useMemo(
    () => briefs.find((brief) => brief.id === selectedBriefId) ?? null,
    [briefs, selectedBriefId]
  );

  useEffect(() => {
    async function loadBriefs() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const savedBriefs = await getBriefsForUser(supabase, user.id);
      setBriefs(savedBriefs);
      setSelectedBriefId(savedBriefs[0]?.id ?? "");
      setIsLoading(false);
    }

    void loadBriefs();
  }, [router]);

  async function handleGenerate() {
    if (!selectedBrief) {
      return;
    }

    setIsGenerating(true);
    setSavedCampaignId(null);

    try {
      setCampaign(await generateCampaign({ brief: selectedBrief }));
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSaveCampaign() {
    if (!campaign) {
      return;
    }

    setIsSaving(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const savedCampaign = await saveCampaign(supabase, user.id, campaign);

      if (savedCampaign) {
        setSavedCampaignId(campaign.id);
      }
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return <div className="min-h-screen p-10"><p>Loading saved briefs...</p></div>;
  }

  if (briefs.length === 0) {
    return (
      <div className="min-h-screen p-10">
        <div className="max-w-xl rounded-xl border p-10 text-center">
          <h1 className="text-3xl font-bold">Campaign Generator</h1>
          <p className="mt-3 text-gray-600">
            Save a creative brief before generating a campaign.
          </p>
          <Link href="/brief-builder" className="mt-6 inline-block rounded bg-black px-4 py-2 text-white">
            Create a brief
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 flex flex-col lg:flex-row gap-10">
      <section className="w-full max-w-md space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Campaign Generator</h1>
          <p className="mt-2 text-gray-600">
            Turn a saved creative brief into a complete multi-channel campaign.
          </p>
        </div>

        <div>
          <label htmlFor="brief" className="mb-1 block text-sm font-medium">Saved brief</label>
          <select
            id="brief"
            className="w-full rounded border p-2"
            value={selectedBriefId}
            onChange={(event) => {
              setSelectedBriefId(event.target.value);
              setCampaign(null);
            }}
          >
            {briefs.map((brief) => (
              <option key={brief.id} value={brief.id}>
                {brief.campaignName} — {brief.brandName}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="w-full rounded bg-black p-2 text-white disabled:opacity-50"
          onClick={handleGenerate}
          disabled={!selectedBrief || isGenerating}
        >
          {isGenerating ? "Generating campaign..." : "Generate Campaign"}
        </button>
      </section>

      <div className="space-y-4">
        <CampaignPreview campaign={campaign} />

        {campaign && (
          <div>
            <button
              type="button"
              className="rounded bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleSaveCampaign}
              disabled={isSaving || savedCampaignId === campaign.id}
            >
              {isSaving
                ? "Saving campaign..."
                : savedCampaignId === campaign.id
                  ? "Campaign saved"
                  : "Save Campaign"}
            </button>

            {savedCampaignId === campaign.id && (
              <p className="mt-2 text-sm text-green-700">
                Campaign saved successfully.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
