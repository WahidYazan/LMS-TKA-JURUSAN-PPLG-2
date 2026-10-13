-- =====================================================================
-- Portal TKA PPLG — CMS Schema (Supabase / Postgres)
-- Jalankan file ini di Supabase Dashboard → SQL Editor.
-- Setelah itu buat admin user: Authentication → Users → Add user
-- (email + password, centang "Auto Confirm").
-- =====================================================================

create extension if not exists pgcrypto;

-- ============ CLEANUP KONFLIK TIPE ============
-- Jika sudah ada tabel lama dengan id integer (mis. cobaan sebelumnya),
-- rename ke *_old_backup agar schema uuid di bawah bisa membuat tabel baru.
-- Data lama TIDAK dihapus — tetap ada di tabel *_old_backup.

do $$
declare
  t text;
  b text;
begin
  foreach t in array array[
    'quiz_questions','modules','module_sections',
    'cheatsheet_sections','cheatsheet_items','landing_stats','landing_features'
  ] loop
    if exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = t and column_name = 'id'
        and data_type <> 'uuid'
    ) then
      b := t || '_old_backup';
      if to_regclass('public.' || b) is not null then
        raise exception 'Tabel public.%s sudah ada. Hapus/rename tabel itu manual dulu, lalu jalankan ulang schema ini.', b;
      end if;
      execute format('alter table public.%I rename to %I', t, b);
    end if;
  end loop;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'module_sections'
      and column_name = 'module_id' and data_type <> 'uuid'
  ) then
    if to_regclass('public.module_sections_old_backup') is not null then
      raise exception 'Tabel public.module_sections_old_backup sudah ada. Hapus/rename dulu, lalu jalankan ulang schema ini.';
    end if;
    execute 'alter table public.module_sections rename to module_sections_old_backup';
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'cheatsheet_items'
      and column_name = 'section_id' and data_type <> 'uuid'
  ) then
    if to_regclass('public.cheatsheet_items_old_backup') is not null then
      raise exception 'Tabel public.cheatsheet_items_old_backup sudah ada. Hapus/rename dulu, lalu jalankan ulang schema ini.';
    end if;
    execute 'alter table public.cheatsheet_items rename to cheatsheet_items_old_backup';
  end if;
end $$;

-- ============ TABLES ============

create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  module_num int not null,
  case_text text not null,
  options jsonb not null check (jsonb_array_length(options) = 4),
  correct_index int not null check (correct_index between 0 and 3),
  explanation text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  number int not null,
  module_badge text not null default '',
  title text not null,
  card_title text not null default '',
  short_desc text not null default '',
  hero_image text not null default '',
  table_of_contents jsonb not null default '[]',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.module_sections (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  section_key text not null,
  number_prefix text,
  title text not null,
  paragraphs jsonb not null default '[]',
  bullet_points jsonb not null default '[]',
  code_snippet jsonb,
  media jsonb not null default '[]',
  sort_order int not null default 0
);
create index if not exists module_sections_module_idx
  on public.module_sections (module_id, sort_order);

create table if not exists public.cheatsheet_sections (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  category text not null,
  sort_order int not null default 0
);

create table if not exists public.cheatsheet_items (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.cheatsheet_sections(id) on delete cascade,
  command_or_concept text not null,
  description text not null,
  example text,
  sort_order int not null default 0
);
create index if not exists cheatsheet_items_section_idx
  on public.cheatsheet_items (section_id, sort_order);

create table if not exists public.landing_stats (
  id uuid primary key default gen_random_uuid(),
  value text not null,
  label text not null,
  color text not null default 'text-sky-600',
  sort_order int not null default 0
);

create table if not exists public.landing_features (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text not null,
  description text not null,
  tone text not null default 'blue',
  sort_order int not null default 0
);

-- ============ ADMIN CHECK ============
-- Ganti email di bawah dengan email admin yang kamu buat di
-- Authentication → Users. Tambah email lain dengan `in (...)`.

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(
    auth.jwt() ->> 'email' in ('admin@example.com'),
    false
  );
$$;

-- ============ RLS ============

alter table public.quiz_questions enable row level security;
alter table public.modules enable row level security;
alter table public.module_sections enable row level security;
alter table public.cheatsheet_sections enable row level security;
alter table public.cheatsheet_items enable row level security;
alter table public.landing_stats enable row level security;
alter table public.landing_features enable row level security;

-- Public read (siswa/anon boleh melihat semua konten)
drop policy if exists "public read quiz_questions" on public.quiz_questions;
create policy "public read quiz_questions" on public.quiz_questions for select using (true);
drop policy if exists "public read modules" on public.modules;
create policy "public read modules" on public.modules for select using (true);
drop policy if exists "public read module_sections" on public.module_sections;
create policy "public read module_sections" on public.module_sections for select using (true);
drop policy if exists "public read cheatsheet_sections" on public.cheatsheet_sections;
create policy "public read cheatsheet_sections" on public.cheatsheet_sections for select using (true);
drop policy if exists "public read cheatsheet_items" on public.cheatsheet_items;
create policy "public read cheatsheet_items" on public.cheatsheet_items for select using (true);
drop policy if exists "public read landing_stats" on public.landing_stats;
create policy "public read landing_stats" on public.landing_stats for select using (true);
drop policy if exists "public read landing_features" on public.landing_features;
create policy "public read landing_features" on public.landing_features for select using (true);

-- Admin write (hanya user login whose email terdaftar di is_admin())
drop policy if exists "admin write quiz_questions" on public.quiz_questions;
create policy "admin write quiz_questions" on public.quiz_questions
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admin write modules" on public.modules;
create policy "admin write modules" on public.modules
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admin write module_sections" on public.module_sections;
create policy "admin write module_sections" on public.module_sections
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admin write cheatsheet_sections" on public.cheatsheet_sections;
create policy "admin write cheatsheet_sections" on public.cheatsheet_sections
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admin write cheatsheet_items" on public.cheatsheet_items;
create policy "admin write cheatsheet_items" on public.cheatsheet_items
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admin write landing_stats" on public.landing_stats;
create policy "admin write landing_stats" on public.landing_stats
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admin write landing_features" on public.landing_features;
create policy "admin write landing_features" on public.landing_features
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
