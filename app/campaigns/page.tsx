"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  deleteCampaign,
  duplicateCampaign,
  getCampaignsForUser,
} from "@/lib/services/campaigns";
import { supabase } from "@/lib/supabase/client";
import type { SavedCampaign } from "@/types/campaign";

function formatCreatedDate(createdAt: string): string {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function CampaignsPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<SavedCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCampaignId, setActiveCampaignId] = useState<string | null>(null);

  useEffect(() => {
    async function loadCampaigns() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      setCampaigns(await getCampaignsForUser(supabase, user.id));
      setIsLoading(false);
    }

    void loadCampaigns();
  }, [router]);

  async function handleDuplicate(campaignId: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    setActiveCampaignId(campaignId);

    try {
      const duplicate = await duplicateCampaign(supabase, user.id, campaignId);

      if (duplicate) {
        setCampaigns((current) => [duplicate, ...current]);
      }
    } finally {
      setActiveCampaignId(null);
    }
  }

  async function handleDelete(campaignId: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    setActiveCampaignId(campaignId);

    try {
      if (await deleteCampaign(supabase, user.id, campaignId)) {
        setCampaigns((current) =>
          current.filter((campaign) => campaign.id !== campaignId)
        );
      }
    } finally {
      setActiveCampaignId(null);
    }
  }

  if (isLoading) {
    return <div className="min-h-screen p-10"><p>Loading campaigns...</p></div>;
  }

  return (
    <main className="min-h-screen p-10">
      <div className="max-w-4xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Saved campaigns</h1>
            <p className="mt-1 text-gray-600">
              Review, duplicate, or remove your generated campaign plans.
            </p>
          </div>

          <Link href="/campaign-generator" className="w-fit rounded bg-black px-4 py-2 text-white">
            Generate campaign
          </Link>
        </div>

        {campaigns.length === 0 ? (
          <div className="mt-8 rounded-xl border p-10 text-center">
            <p className="font-medium">No saved campaigns yet</p>
            <p className="mt-1 text-sm text-gray-600">
              Generate a campaign from one of your saved briefs to see it here.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {campaigns.map((campaign) => {
              const isActive = activeCampaignId === campaign.id;

              return (
                <article key={campaign.id} className="rounded-xl border p-5">
                  <h2 className="text-xl font-bold">{campaign.campaignName}</h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Created {formatCreatedDate(campaign.createdAt)}
                  </p>
                  <p className="mt-3 text-sm">
                    <span className="font-medium">Brief:</span>{" "}
                    {campaign.associatedBriefName ?? "Brief unavailable"}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={`/campaigns/${campaign.id}`}
                      className="rounded border px-4 py-2 text-sm font-medium"
                    >
                      Open
                    </Link>
                    <button
                      type="button"
                      className="rounded border px-4 py-2 text-sm font-medium disabled:opacity-50"
                      onClick={() => handleDuplicate(campaign.id)}
                      disabled={isActive}
                    >
                      {isActive ? "Working..." : "Duplicate"}
                    </button>
                    <button
                      type="button"
                      className="rounded border border-red-600 px-4 py-2 text-sm font-medium text-red-700 disabled:opacity-50"
                      onClick={() => handleDelete(campaign.id)}
                      disabled={isActive}
                    >
                      {isActive ? "Working..." : "Delete"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
