"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { BriefForm } from "@/components/brief/BriefForm";
import { BriefPreview } from "@/components/brief/BriefPreview";
import { generateBrief } from "@/lib/services/ai-brief";
import { getUserBrandProfile } from "@/lib/services/brand-profile";
import { saveBrief } from "@/lib/services/briefs";
import {
  EMPTY_BRIEF_FORM,
  isBriefFormValid,
} from "@/lib/services/brief";
import { supabase } from "@/lib/supabase/client";
import type {
  BrandProfileSummary,
  BriefFormValues,
  GeneratedBrief,
} from "@/types/brief";

/**
 * Orchestration component only.
 *
 * Owns all React state for the Brief Builder feature.
 * Business logic lives in the service layer.
 */
export function BriefBuilder() {
  const router = useRouter();

  // Loading / auth state
  const [isLoading, setIsLoading] = useState(true);
  const [brand, setBrand] = useState<BrandProfileSummary | null>(null);

  // Form state
  const [values, setValues] =
    useState<BriefFormValues>(EMPTY_BRIEF_FORM);

  const [hasAttemptedSubmit, setHasAttemptedSubmit] =
    useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generated output
  const [brief, setBrief] =
    useState<GeneratedBrief | null>(null);
  const [isSavingBrief, setIsSavingBrief] = useState(false);
  const [savedBriefId, setSavedBriefId] = useState<string | null>(null);

  useEffect(() => {
    loadBrandProfile();
  }, []);

  async function loadBrandProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const profile = await getUserBrandProfile(
      supabase,
      user.id
    );

    setBrand(profile);
    setIsLoading(false);
  }

  function fieldErrors(): Partial<
    Record<keyof BriefFormValues, string>
  > {
    if (!hasAttemptedSubmit) {
      return {};
    }

    const errors: Partial<
      Record<keyof BriefFormValues, string>
    > = {};

    if (!values.campaignName.trim()) {
      errors.campaignName = "Campaign name is required.";
    }

    if (!values.targetAudience.trim()) {
      errors.targetAudience = "Target audience is required.";
    }

    if (!values.keyMessage.trim()) {
      errors.keyMessage = "Key message is required.";
    }

    if (!values.callToAction.trim()) {
      errors.callToAction = "Call to action is required.";
    }

    if (values.platforms.length === 0) {
      errors.platforms = "Select at least one platform.";
    }

    return errors;
  }

  async function handleSubmit() {
    setHasAttemptedSubmit(true);

    if (!brand || !isBriefFormValid(values)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const generated = await generateBrief({
        form: values,
        brand,
      });

      setBrief(generated);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSaveBrief() {
    if (!brief || !brand) {
      return;
    }

    setIsSavingBrief(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const savedBrief = await saveBrief(supabase, user.id, {
        brandProfileId: brand.id,
        form: values,
        brief,
      });

      if (savedBrief) {
        setSavedBriefId(brief.id);
      }
    } finally {
      setIsSavingBrief(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen p-10">
        <p>Loading...</p>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="min-h-screen p-10">
        <h1 className="text-3xl font-bold">
          Creative Brief Builder
        </h1>

        <p className="mt-3 text-gray-600">
          You need a brand profile before you can generate a
          creative brief.
        </p>

        <button
          className="mt-6 bg-black text-white px-4 py-2 rounded"
          onClick={() => router.push("/onboarding")}
        >
          Set up your brand profile
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 flex flex-col lg:flex-row gap-10">
      <BriefForm
        brand={brand}
        values={values}
        errors={fieldErrors()}
        onChange={setValues}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <div className="space-y-4">
        <BriefPreview brief={brief} />

        {brief && (
          <div>
            <button
              type="button"
              className="rounded bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleSaveBrief}
              disabled={isSavingBrief || savedBriefId === brief.id}
            >
              {isSavingBrief
                ? "Saving brief..."
                : savedBriefId === brief.id
                  ? "Brief saved"
                  : "Save brief"}
            </button>

            {savedBriefId === brief.id && (
              <p className="mt-2 text-sm text-green-700">
                Brief saved successfully.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
