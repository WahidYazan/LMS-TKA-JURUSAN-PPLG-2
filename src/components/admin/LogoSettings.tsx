"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Image as ImageIcon,
  RotateCcw,
  Save,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { describeError, isMissingSchemaError, MIGRATION_HINT } from "@/lib/adminError";
import { invalidateContent, DEFAULT_LOGO } from "@/lib/content";
import { AdminCard } from "./AdminPrimitives";

const LOGO_KEY = "logo_url";

export const LogoSettings: React.FC = () => {
  const [savedUrl, setSavedUrl] = useState("");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(() => !!supabase);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [needsMigration, setNeedsMigration] = useState(false);
  const [error, setError] = useState<string | null>(() =>
    supabase ? null : "Supabase belum dikonfigurasi (.env.local)",
  );

  const load = useCallback(async () => {
    if (!supabase) return;
    try {
      const { data, error: err } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", LOGO_KEY)
        .maybeSingle();
      if (err) throw err;
      const url = (data?.value as string | null) ?? "";
      setSavedUrl(url);
      setDraft(url);
      setNeedsMigration(false);
      setError(null);
    } catch (err: unknown) {
      if (isMissingSchemaError(err)) {
        describeError("Gagal memuat logo", err);
        setNeedsMigration(true);
        setError(null);
      } else {
        setError(describeError("Gagal memuat logo", err));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const run = async () => {
      await load();
    };
    void run();
  }, [load]);

  const handleSave = async () => {
    if (!supabase) return;
    setBusy(true);
    setSaved(false);
    setError(null);
    try {
      const value = draft.trim();
      const { error: err } = await supabase.from("site_settings").upsert(
        { key: LOGO_KEY, value, updated_at: new Date().toISOString() },
        { onConflict: "key" },
      );
      if (err) throw err;
      invalidateContent("siteSettings");
      setSavedUrl(value);
      setSaved(true);
    } catch (err: unknown) {
      setError(describeError("Gagal menyimpan logo", err));
    } finally {
      setBusy(false);
    }
  };

  const handleReset = async () => {
    if (!supabase) return;
    setBusy(true);
    setSaved(false);
    setError(null);
    try {
      const { error: err } = await supabase
        .from("site_settings")
        .delete()
        .eq("key", LOGO_KEY);
      if (err) throw err;
      invalidateContent("siteSettings");
      setSavedUrl("");
      setDraft("");
      setSaved(true);
    } catch (err: unknown) {
      setError(describeError("Gagal menghapus logo", err));
    } finally {
      setBusy(false);
    }
  };

  const previewSrc = draft.trim() || DEFAULT_LOGO;
  const disabled = !supabase || busy || loading || needsMigration;

  return (
    <AdminCard>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
          <ImageIcon className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-900">Logo Web</p>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            Logo tampil di navbar publik dan sidebar admin. Simpan URL baru untuk
            mengganti, atau reset untuk kembali ke logo bawaan.
          </p>

          <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="shrink-0 w-24 h-24 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden">
              {loading ? (
                <Loader2 className="w-6 h-6 text-slate-300 animate-spin" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewSrc}
                  alt="Preview logo"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <label
                htmlFor="logo-url"
                className="block text-xs font-bold text-slate-600"
              >
                URL Logo
              </label>
              <input
                id="logo-url"
                type="text"
                value={draft}
                onChange={(e) => {
                  setDraft(e.target.value);
                  setSaved(false);
                }}
                placeholder={DEFAULT_LOGO}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400"
              />
              <p className="text-[11px] text-slate-400">
                Bisa path lokal (<code className="font-mono">/images/...</code>)
                atau URL <code className="font-mono">https://...</code>.
              </p>
            </div>
          </div>

          {needsMigration && (
            <p className="mt-3 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
              Logo kustom belum aktif — {MIGRATION_HINT}
            </p>
          )}
          {error && (
            <p className="mt-3 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">
              {error}
            </p>
          )}
          {saved && !error && !needsMigration && (
            <p className="mt-3 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
              Tersimpan. Logo diperbarui di seluruh situs.
            </p>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => void handleSave()}
              disabled={disabled}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold shadow-md shadow-sky-500/20 transition-all cursor-pointer min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {busy ? (
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              ) : (
                <Save className="w-4 h-4" aria-hidden="true" />
              )}
              Simpan Logo
            </button>
            <button
              onClick={() => void handleReset()}
              disabled={disabled || !savedUrl}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold transition-colors cursor-pointer min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              Reset ke Bawaan
            </button>
          </div>
        </div>
      </div>
    </AdminCard>
  );
};
