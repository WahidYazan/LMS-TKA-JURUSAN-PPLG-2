-- =====================================================================
-- MIGRASI: is_visible (hide/show) + site_settings (logo web)
-- Jalankan SEKALI di Supabase Dashboard → SQL Editor → Run.
-- Aman diulang (idempotent): pakai IF NOT EXISTS / DROP POLICY IF EXISTS.
--
-- Ini melengkapi schema.sql. Jika database kamu dibuat dari schema.sql
-- versi lama (tanpa is_visible & site_settings), jalankan file ini.
-- =====================================================================

-- ============ 1. KOLOM is_visible DI SEMUA TABEL KONTEN ============
-- default true => konten lama tetap tampil; admin bisa menyembunyikan.

alter table public.quiz_questions
  add column if not exists is_visible boolean not null default true;
alter table public.modules
  add column if not exists is_visible boolean not null default true;
alter table public.module_sections
  add column if not exists is_visible boolean not null default true;
alter table public.cheatsheet_sections
  add column if not exists is_visible boolean not null default true;
alter table public.cheatsheet_items
  add column if not exists is_visible boolean not null default true;
alter table public.landing_stats
  add column if not exists is_visible boolean not null default true;
alter table public.landing_features
  add column if not exists is_visible boolean not null default true;

-- ============ 2. TABEL site_settings (key/value) ============
-- Menyimpan pengaturan situs, misalnya key 'logo_url'.

create table if not exists public.site_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

-- ============ 3. RLS UNTUK site_settings ============

alter table public.site_settings enable row level security;

-- Public read (siswa/anon boleh membaca pengaturan, mis. logo)
drop policy if exists "public read site_settings" on public.site_settings;
create policy "public read site_settings" on public.site_settings
  for select using (true);

-- Admin write (hanya email terdaftar di public.is_admin())
drop policy if exists "admin write site_settings" on public.site_settings;
create policy "admin write site_settings" on public.site_settings
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ============ SELESAI ============
-- Tidak perlu seed. Kolom is_visible otomatis true untuk baris lama.
-- Logo default tetap /images/brands/TTH-nobg.webp sampai admin menggantinya.
