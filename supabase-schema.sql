-- ============================================================
-- MANA SATHULURU - SUPABASE DATABASE SCHEMA
-- Run this script in your Supabase Dashboard -> SQL Editor
-- ============================================================

-- 1. Create Contact Messages Table
create table if not exists public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  read boolean default false
);

-- Enable Row Level Security (RLS)
alter table public.contact_messages enable row level security;

-- Drop old policies to avoid conflict
drop policy if exists "Allow anonymous submissions to contact_messages" on public.contact_messages;
drop policy if exists "Allow public to insert contact_messages" on public.contact_messages;
drop policy if exists "Enable insert for all users" on public.contact_messages;

-- Policy: Allow ANY visitor to submit a contact message
create policy "Allow public to insert contact_messages"
  on public.contact_messages
  for insert
  to public
  with check (true);

-- Policy: Only service role / authenticated admins can view messages
create policy "Allow authenticated users to read contact_messages"
  on public.contact_messages
  for select
  to authenticated
  using (true);

-- ============================================================
-- 2. Optional: Village Guestbook / Blessings Table
-- ============================================================
create table if not exists public.village_blessings (
  id uuid default gen_random_uuid() primary key,
  author_name text not null,
  location text,
  message text not null,
  is_approved boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.village_blessings enable row level security;

-- Policy: Allow anyone to view approved blessings
create policy "Allow public to read approved blessings"
  on public.village_blessings
  for select
  to anon, authenticated
  using (is_approved = true);

-- Policy: Allow visitors to submit a blessing
create policy "Allow public to insert blessings"
  on public.village_blessings
  for insert
  to anon, authenticated
  with check (true);
