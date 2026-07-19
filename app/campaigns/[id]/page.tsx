"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { CampaignPreview } from "@/components/campaign/CampaignPreview";
import { getCampaignById } from "@/lib/services/campaigns";
import { supabase } from "@/lib/supabase/client";
import type { SavedCampaign } from "@/types/campaign";

export default function CampaignPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<SavedCampaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    async function loadCampaign() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const savedCampaign = await getCampaignById(supabase, user.id, id);

      if (!savedCampaign) {
        setIsNotFound(true);
      } else {
        setCampaign(savedCampaign);
      }

      setIsLoading(false);
    }

    void loadCampaign();
  }, [id, router]);

  if (isLoading) {
    return <div className="min-h-screen p-10"><p>Loading campaign...</p></div>;
  }

  if (isNotFound) {
    return (
      <main className="min-h-screen p-10">
        <div className="max-w-xl rounded-xl border p-10 text-center">
          <p className="text-3xl font-bold">404</p>
          <h1 className="mt-2 text-xl font-bold">Campaign not found</h1>
          <p className="mt-1 text-gray-600">
            This campaign does not exist or you do not have access to it.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-10">
      <CampaignPreview campaign={campaign} />
    </main>
  );
}
