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

function getErrorCode(err: unknown): string {
  if (typeof err !== "object" || err === null || !("code" in err)) return "";
  return String((err as { code?: unknown }).code ?? "");
}

function getErrorDetails(err: unknown) {
  if (typeof err !== "object" || err === null) {
    return { message: String(err) };
  }

  const error = err as {
    code?: unknown;
    message?: unknown;
    details?: unknown;
    hint?: unknown;
  };

  return {
    code: error.code,
    message: error.message ?? (err instanceof Error ? err.message : undefined),
    details: error.details,
    hint: error.hint,
  };
}

export function describeError(action: string, err: unknown): string {
  const code = getErrorCode(err);

  // Kondisi "belum migrasi" dipakai warn agar tidak memicu overlay error
  // Next.js di dev; error tak terduga tetap error agar kelihatan.
  if (isMissingSchemaError(err)) {
    console.warn(`[admin] ${action}`, getErrorDetails(err));
    return `${action}. ${MIGRATION_HINT}`;
  }

  const details = getErrorDetails(err);
  const message = String(details.message ?? "").toLowerCase();
  if (
    code === "42501" ||
    message.includes("row-level security") ||
    message.includes("permission denied")
  ) {
    console.warn(`[admin] ${action} ditolak oleh kebijakan RLS`, details);
    return `${action}. Akun ini belum diizinkan oleh Supabase. Pastikan email admin terdaftar di public.is_admin(), lalu jalankan supabase/migrations/2026_update_admin_allowlist.sql lewat Supabase Dashboard → SQL Editor.`;
  }

  console.error(`[admin] ${action}`, details);
  return `${action}. Periksa koneksi dan konfigurasi Supabase, lalu coba lagi.`;
}
