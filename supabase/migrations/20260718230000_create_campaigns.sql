create extension if not exists pgcrypto;

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  brief_id uuid null references public.briefs (id) on delete set null,
  campaign_name text not null,
  campaign_json jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists campaigns_user_id_created_at_idx
on public.campaigns (user_id, created_at desc);

create index if not exists campaigns_brief_id_idx
on public.campaigns (brief_id);

alter table public.campaigns enable row level security;

drop policy if exists "Users can select their own campaigns" on public.campaigns;
drop policy if exists "Users can insert their own campaigns" on public.campaigns;
drop policy if exists "Users can delete their own campaigns" on public.campaigns;

create policy "Users can select their own campaigns"
on public.campaigns
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own campaigns"
on public.campaigns
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can delete their own campaigns"
on public.campaigns
for delete
to authenticated
using (auth.uid() = user_id);
