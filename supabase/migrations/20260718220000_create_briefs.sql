create extension if not exists pgcrypto;

create table if not exists public.briefs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  campaign_name text not null,
  brand_profile_id uuid,
  form_json jsonb not null,
  brief_json jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists briefs_user_id_created_at_idx
on public.briefs (user_id, created_at desc);

create index if not exists briefs_brand_profile_id_idx
on public.briefs (brand_profile_id);

alter table public.briefs enable row level security;

drop policy if exists "Users can select their own briefs" on public.briefs;
drop policy if exists "Users can insert their own briefs" on public.briefs;
drop policy if exists "Users can delete their own briefs" on public.briefs;

create policy "Users can select their own briefs"
on public.briefs
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own briefs"
on public.briefs
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can delete their own briefs"
on public.briefs
for delete
to authenticated
using (auth.uid() = user_id);
