"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { BriefPreview } from "@/components/brief/BriefPreview";
import { getBriefById } from "@/lib/services/briefs";
import { supabase } from "@/lib/supabase/client";
import type { GeneratedBrief } from "@/types/brief";

export default function BriefPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [brief, setBrief] = useState<GeneratedBrief | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    async function loadBrief() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const savedBrief = await getBriefById(supabase, user.id, id);

      if (!savedBrief) {
        setIsNotFound(true);
      } else {
        setBrief(savedBrief);
      }

      setIsLoading(false);
    }

    void loadBrief();
  }, [id, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen p-10">
        <p>Loading brief...</p>
      </div>
    );
  }

  if (isNotFound) {
    return (
      <main className="min-h-screen p-10">
        <div className="max-w-xl rounded-xl border p-10 text-center">
          <p className="text-3xl font-bold">404</p>
          <h1 className="mt-2 text-xl font-bold">Brief not found</h1>
          <p className="mt-1 text-gray-600">
            This brief does not exist or you do not have access to it.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-10">
      <BriefPreview brief={brief} />
    </main>
  );
}
