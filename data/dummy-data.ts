import {
  LayoutDashboard,
  Megaphone,
  UsersRound,
  FlaskConical,
  Settings,
  Rocket,
  Youtube,
  Sparkles,
  Blocks,
} from "lucide-react";

import type { Campaign, GoalCard, NavItem, Recipe } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Campaigns", href: "/campaigns", icon: Megaphone },
  { label: "Brand Profiles", href: "/brand-profiles", icon: UsersRound },
  { label: "Creative Recipes", href: "/creative-recipes", icon: FlaskConical },
  { label: "Settings", href: "/settings", icon: Settings },
];

export const GOAL_CARDS: GoalCard[] = [
  {
    id: "launch-product",
    title: "Launch a Product",
    description: "Go from announcement to full campaign in one flow.",
    icon: Rocket,
    accent: "nova",
  },
  {
    id: "promote-business",
    title: "Promote My Business",
    description: "Build awareness with a coordinated multi-channel push.",
    icon: Megaphone,
    accent: "ember",
  },
  {
    id: "publish-youtube",
    title: "Publish YouTube Video",
    description: "Script, thumbnail, and description, ready to upload.",
    icon: Youtube,
    accent: "nova",
  },
  {
    id: "social-content",
    title: "Create Social Content",
    description: "A week of on-brand posts across every platform.",
    icon: Sparkles,
    accent: "ember",
  },
  {
    id: "build-custom",
    title: "Build Something Custom",
    description: "Start from a blank canvas and shape your own workflow.",
    icon: Blocks,
    accent: "nova",
  },
];

export const RECENT_CAMPAIGNS: Campaign[] = [
  {
    id: "camp-001",
    name: "Autumn Sneaker Drop",
    brand: "Solstice Footwear",
    status: "live",
    progress: 82,
    updatedAt: "2h ago",
    channel: "Instagram + TikTok",
    thumbnailGradient: "from-nova/40 to-ember/30",
  },
  {
    id: "camp-002",
    name: "Founder Story Series",
    brand: "Northline Coffee",
    status: "in_review",
    progress: 54,
    updatedAt: "5h ago",
    channel: "YouTube",
    thumbnailGradient: "from-ember/40 to-nova/20",
  },
  {
    id: "camp-003",
    name: "Q3 Product Launch",
    brand: "Kiln Studio",
    status: "scheduled",
    progress: 96,
    updatedAt: "1d ago",
    channel: "Email + Social",
    thumbnailGradient: "from-nova/30 to-nova/5",
  },
  {
    id: "camp-004",
    name: "Loyalty Relaunch",
    brand: "Solstice Footwear",
    status: "draft",
    progress: 21,
    updatedAt: "2d ago",
    channel: "Paid Social",
    thumbnailGradient: "from-ember/25 to-secondary",
  },
];

export const CONTINUE_WORKING: Campaign[] = [
  {
    id: "cw-001",
    name: "Holiday Gift Guide",
    brand: "Northline Coffee",
    status: "draft",
    progress: 38,
    updatedAt: "Last edited 20m ago",
    channel: "Instagram",
    thumbnailGradient: "from-nova/40 to-secondary",
  },
  {
    id: "cw-002",
    name: "Behind the Roast — Ep. 4",
    brand: "Northline Coffee",
    status: "draft",
    progress: 63,
    updatedAt: "Last edited 3h ago",
    channel: "YouTube",
    thumbnailGradient: "from-ember/35 to-secondary",
  },
  {
    id: "cw-003",
    name: "Kiln Studio Rebrand Teaser",
    brand: "Kiln Studio",
    status: "in_review",
    progress: 71,
    updatedAt: "Last edited yesterday",
    channel: "TikTok",
    thumbnailGradient: "from-nova/30 to-ember/20",
  },
];

export const RECOMMENDED_RECIPES: Recipe[] = [
  {
    id: "rec-001",
    title: "Product Hunt Launch Kit",
    description: "Teaser, launch-day thread, and follow-up recap, pre-sequenced.",
    tag: "Launch",
    steps: 6,
    estMinutes: 15,
  },
  {
    id: "rec-002",
    title: "Weekly Shorts Batch",
    description: "Turn one long-form video into five short-form cuts.",
    tag: "Video",
    steps: 4,
    estMinutes: 10,
  },
  {
    id: "rec-003",
    title: "Founder Voice Thread",
    description: "A narrative thread that turns your story into a following.",
    tag: "Brand",
    steps: 5,
    estMinutes: 12,
  },
  {
    id: "rec-004",
    title: "Seasonal Promo Bundle",
    description: "Email, story, and paid ad variants for a limited-time offer.",
    tag: "Promotion",
    steps: 7,
    estMinutes: 18,
  },
];
