-- Izinkan akun admin proyek mengubah konten melalui kebijakan RLS.
-- Jalankan lewat Supabase Dashboard → SQL Editor.
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(
    lower(auth.jwt() ->> 'email') in ('haikal@gmail.com'),
    false
  );
$$;
