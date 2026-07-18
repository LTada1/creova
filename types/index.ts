import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type GoalCard = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: "nova" | "ember";
};

export type CampaignStatus = "draft" | "in_review" | "scheduled" | "live" | "completed";

export type Campaign = {
  id: string;
  name: string;
  brand: string;
  status: CampaignStatus;
  progress: number;
  updatedAt: string;
  channel: string;
  thumbnailGradient: string;
};

export type Recipe = {
  id: string;
  title: string;
  description: string;
  tag: string;
  steps: number;
  estMinutes: number;
};
