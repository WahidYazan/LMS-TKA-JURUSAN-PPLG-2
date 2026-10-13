// Detail error Supabase/Postgres bisa memuat nama tabel, kolom, atau policy.
// Admin hanya melihat pesan generik; detail lengkap masuk ke console.
export function describeError(action: string, err: unknown): string {
  console.error(`[admin] ${action}`, err);
  return `${action}. Periksa koneksi dan konfigurasi Supabase, lalu coba lagi.`;
}
