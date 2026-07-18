import type { supabase as supabaseSingleton } from "@/lib/supabase/client";
import type { BrandProfileSummary } from "@/types/brief";

// Infer the client type from the existing singleton so we don't import
// @supabase/supabase-js directly.
type SupabaseClient = typeof supabaseSingleton;

/**
 * Fetches the current user's brand profile for use in the Brief Builder.
 *
 * The current application supports one brand profile per user. If
 * multi-brand support is introduced later, this is the only function that
 * should need to change (for example, returning an array instead of a
 * single profile).
 */
export async function getUserBrandProfile(
  supabase: SupabaseClient,
  userId: string
): Promise<BrandProfileSummary | null> {
  const { data, error } = await supabase
    .from("brand_profiles")
    .select(
      `
        id,
        brand_name,
        industry,
        target_audience,
        brand_voice
      `
    )
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Failed to load brand profile:", error);
    return null;
  }

  if (!data) {
    return null;
  }

  return {
    id: data.id,
    brandName: data.brand_name ?? "Your brand",
    industry: data.industry ?? null,
    targetAudience: data.target_audience ?? null,
    brandVoice: data.brand_voice ?? null,
  };
}
