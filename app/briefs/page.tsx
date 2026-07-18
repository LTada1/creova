"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { OBJECTIVE_LABEL, PLATFORM_LABEL } from "@/lib/services/brief";
import { getBriefsForUser } from "@/lib/services/briefs";
import { supabase } from "@/lib/supabase/client";
import type { GeneratedBrief } from "@/types/brief";

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

export default function BriefsPage() {
  const router = useRouter();
  const [briefs, setBriefs] = useState<GeneratedBrief[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBriefs() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      setBriefs(await getBriefsForUser(supabase, user.id));
      setIsLoading(false);
    }

    void loadBriefs();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen p-10">
        <p>Loading briefs...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-10">
      <div className="max-w-4xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Saved briefs</h1>
            <p className="mt-1 text-gray-600">
              Review the creative briefs you have generated.
            </p>
          </div>

          <Link
            href="/brief-builder"
            className="w-fit rounded bg-black px-4 py-2 text-white"
          >
            Create brief
          </Link>
        </div>

        {briefs.length === 0 ? (
          <div className="mt-8 rounded-xl border p-10 text-center">
            <p className="font-medium">No saved briefs yet</p>
            <p className="mt-1 text-sm text-gray-600">
              Generate a creative brief to see it here.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {briefs.map((brief) => (
              <article
                key={brief.id}
                className="rounded-xl border p-5 sm:flex sm:items-center sm:justify-between sm:gap-6"
              >
                <div>
                  <h2 className="text-xl font-bold">{brief.campaignName}</h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Created {formatCreatedDate(brief.createdAt)}
                  </p>
                  <p className="mt-3 text-sm">
                    <span className="font-medium">Objective:</span>{" "}
                    {OBJECTIVE_LABEL[brief.objective]}
                  </p>
                  <p className="mt-1 text-sm">
                    <span className="font-medium">Platforms:</span>{" "}
                    {brief.platforms.length > 0
                      ? brief.platforms
                          .map((platform) => PLATFORM_LABEL[platform])
                          .join(", ")
                      : "None selected"}
                  </p>
                </div>

                <Link
                  href={`/briefs/${brief.id}`}
                  className="mt-5 inline-block rounded border px-4 py-2 text-sm font-medium sm:mt-0"
                >
                  Open
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
