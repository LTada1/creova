import type { supabase as supabaseSingleton } from "@/lib/supabase/client";
import type { GeneratedCampaign, SavedCampaign } from "@/types/campaign";

type SupabaseClient = typeof supabaseSingleton;

interface CampaignRow {
  id: string;
  created_at: string;
  campaign_json: GeneratedCampaign;
  briefs: { campaign_name: string } | { campaign_name: string }[] | null;
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

function toSavedCampaign(row: CampaignRow): SavedCampaign {
  const brief = Array.isArray(row.briefs) ? row.briefs[0] : row.briefs;

  return {
    ...row.campaign_json,
    id: row.id,
    createdAt: row.created_at,
    associatedBriefName: brief?.campaign_name ?? null,
  };
}

const CAMPAIGN_SELECT = "id, created_at, campaign_json, briefs (campaign_name)";

/** Persists a generated campaign for the current user. */
export async function saveCampaign(
  supabase: SupabaseClient,
  userId: string,
  campaign: GeneratedCampaign
): Promise<SavedCampaign | null> {
  const { data, error } = await supabase
    .from("campaigns")
    .insert({
      user_id: userId,
      brief_id: campaign.briefId,
      campaign_name: campaign.campaignName,
      campaign_json: campaign,
    })
    .select(CAMPAIGN_SELECT)
    .single();

  if (error || !data) {
    logSupabaseError("save campaign", error);
    return null;
  }

  return toSavedCampaign(data as CampaignRow);
}

/** Returns a user's campaigns, newest first. */
export async function getCampaignsForUser(
  supabase: SupabaseClient,
  userId: string
): Promise<SavedCampaign[]> {
  const { data, error } = await supabase
    .from("campaigns")
    .select(CAMPAIGN_SELECT)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    logSupabaseError("load campaigns", error);
    return [];
  }

  return (data as CampaignRow[] | null)?.map(toSavedCampaign) ?? [];
}

/** Returns one campaign only when it belongs to the supplied user. */
export async function getCampaignById(
  supabase: SupabaseClient,
  userId: string,
  campaignId: string
): Promise<SavedCampaign | null> {
  const { data, error } = await supabase
    .from("campaigns")
    .select(CAMPAIGN_SELECT)
    .eq("id", campaignId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    if (error) {
      logSupabaseError("load campaign", error);
    }
    return null;
  }

  return toSavedCampaign(data as CampaignRow);
}

/** Clones one of the user's campaigns with a distinct campaign name. */
export async function duplicateCampaign(
  supabase: SupabaseClient,
  userId: string,
  campaignId: string
): Promise<SavedCampaign | null> {
  const campaign = await getCampaignById(supabase, userId, campaignId);

  if (!campaign) {
    return null;
  }

  const duplicate: GeneratedCampaign = {
    ...campaign,
    id: `campaign_${Date.now()}`,
    createdAt: new Date().toISOString(),
    campaignName: `${campaign.campaignName} (Copy)`,
  };

  return saveCampaign(supabase, userId, duplicate);
}

/** Deletes a campaign only when it belongs to the supplied user. */
export async function deleteCampaign(
  supabase: SupabaseClient,
  userId: string,
  campaignId: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("campaigns")
    .delete()
    .eq("id", campaignId)
    .eq("user_id", userId)
    .select("id")
    .maybeSingle();

  if (error) {
    logSupabaseError("delete campaign", error);
    return false;
  }

  return Boolean(data);
}
