import type { supabase as supabaseSingleton } from "@/lib/supabase/client";
import type {
  BriefFormValues,
  GeneratedBrief,
} from "@/types/brief";

// Infer the client type from the existing browser-client singleton so this
// service follows the same dependency-injection pattern as brand-profile.ts.
type SupabaseClient = typeof supabaseSingleton;

interface BriefRow {
  id: string;
  created_at: string;
  brief_json: GeneratedBrief;
}

export interface SaveBriefInput {
  brandProfileId: string | null;
  form: BriefFormValues;
  brief: GeneratedBrief;
}

interface SupabaseErrorDetails {
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
}

function logSupabaseError(operation: string, error: unknown): void {
  const details = (error ?? {}) as SupabaseErrorDetails;

  console.error(`Failed to ${operation}:`, {
    message: details.message ?? "No error message was returned.",
    code: details.code ?? null,
    details: details.details ?? null,
    hint: details.hint ?? null,
  });
}

function toGeneratedBrief(row: BriefRow): GeneratedBrief {
  return {
    ...row.brief_json,
    id: row.id,
    createdAt: row.created_at,
  };
}

/** Saves a generated brief for a user and returns its persisted form. */
export async function saveBrief(
  supabase: SupabaseClient,
  userId: string,
  input: SaveBriefInput
): Promise<GeneratedBrief | null> {
  const { data, error } = await supabase
    .from("briefs")
    .insert({
      user_id: userId,
      campaign_name: input.brief.campaignName,
      brand_profile_id: input.brandProfileId,
      form_json: input.form,
      brief_json: input.brief,
    })
    .select("id, created_at, brief_json")
    .single();

  if (error || !data) {
    logSupabaseError("save brief", error);
    return null;
  }

  return toGeneratedBrief(data as BriefRow);
}

/** Returns a user's generated briefs, newest first. */
export async function getBriefsForUser(
  supabase: SupabaseClient,
  userId: string
): Promise<GeneratedBrief[]> {
  const { data, error } = await supabase
    .from("briefs")
    .select("id, created_at, brief_json")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load briefs:", error);
    return [];
  }

  return (data as BriefRow[] | null)?.map(toGeneratedBrief) ?? [];
}

/** Returns one generated brief only when it belongs to the given user. */
export async function getBriefById(
  supabase: SupabaseClient,
  userId: string,
  briefId: string
): Promise<GeneratedBrief | null> {
  const { data, error } = await supabase
    .from("briefs")
    .select("id, created_at, brief_json")
    .eq("id", briefId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    if (error) {
      console.error("Failed to load brief:", error);
    }
    return null;
  }

  return toGeneratedBrief(data as BriefRow);
}
