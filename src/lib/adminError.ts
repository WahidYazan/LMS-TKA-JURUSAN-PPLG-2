// Detail error Supabase/Postgres bisa memuat nama tabel, kolom, atau policy.
// Admin hanya melihat pesan ramah; detail lengkap masuk ke console.

// PGRST204 = kolom belum ada, PGRST205 = tabel belum ada.
// Keduanya berarti skema DB belum diperbarui — kondisi yang diharapkan
// sebelum migrasi dijalankan, bukan bug runtime.
export function isMissingSchemaError(err: unknown): boolean {
  const code =
    typeof err === "object" && err !== null && "code" in err
      ? String((err as { code?: unknown }).code ?? "")
      : "";
  return code === "PGRST204" || code === "PGRST205";
}

export const MIGRATION_HINT =
  "Skema database belum diperbarui (kolom/tabel baru belum ada). Jalankan SQL di supabase/migrations/2025_add_is_visible_and_site_settings.sql lewat Supabase Dashboard → SQL Editor, lalu coba lagi.";

export function describeError(action: string, err: unknown): string {
  // Kondisi "belum migrasi" dipakai warn agar tidak memicu overlay error
  // Next.js di dev; error tak terduga tetap error agar kelihatan.
  if (isMissingSchemaError(err)) {
    console.warn(`[admin] ${action}`, err);
    return `${action}. ${MIGRATION_HINT}`;
  }
  console.error(`[admin] ${action}`, err);
  return `${action}. Periksa koneksi dan konfigurasi Supabase, lalu coba lagi.`;
}
