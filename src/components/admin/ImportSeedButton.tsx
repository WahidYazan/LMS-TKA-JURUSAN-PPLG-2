"use client";

import React, { useState } from "react";
import { DatabaseZap } from "lucide-react";
import { importBundledDefaults, type SeedReport } from "../../lib/seedImport";
import { supabase } from "../../lib/supabase";
import { describeError } from "@/lib/adminError";
import { AdminCard } from "./AdminPrimitives";
import { ConfirmDeleteDialog } from "./AdminModal";

export const ImportSeedButton: React.FC = () => {
  const [confirming, setConfirming] = useState(false);
  const [running, setRunning] = useState(false);
  const [report, setReport] = useState<SeedReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setConfirming(false);
    setRunning(true);
    setError(null);
    try {
      const result = await importBundledDefaults();
      setReport(result);
    } catch (err: unknown) {
      setError(describeError("Gagal import data", err));
    } finally {
      setRunning(false);
    }
  };

  return (
    <>
      <AdminCard>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <DatabaseZap className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900">
              Klik Tombol Di Bawah Jika Menu Soal Kosong
            </p>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              {supabase
                ? "Salin seluruh soal, modul, cheatsheet, dan landing bawaan yang sudah tersedia. Tabel yang sudah terisi akan dilewati jika tombol di bawah ini di klik."
                : "Supabase belum dikonfigurasi — isi NEXT_PUBLIC_SUPABASE_URL & key di .env.local dulu."}
            </p>

            {report && (
              <div className="mt-3 text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1 animate-fade-in">
                {report.inserted.map((line) => (
                  <p key={line} className="text-emerald-700 font-semibold">
                    + {line}
                  </p>
                ))}
                {report.skipped.map((line) => (
                  <p key={line} className="text-slate-400">
                    • {line}
                  </p>
                ))}
              </div>
            )}

            {error && (
              <p className="mt-3 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            <button
              onClick={() => setConfirming(true)}
              disabled={!supabase || running}
              className="mt-3 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <DatabaseZap className="w-4 h-4" aria-hidden="true" />
              {running ? "Mengimport..." : "Import Data Sekarang"}
            </button>
          </div>
        </div>
      </AdminCard>

      {confirming && (
        <ConfirmDeleteDialog
          label="data bawaan ke database"
          detail="Seluruh konten default (soal, modul, cheatsheet, landing) akan disalin ke Supabase. Tabel yang sudah berisi data tidak akan disentuh. Lanjutkan?"
          confirming={false}
          onCancel={() => setConfirming(false)}
          onConfirm={() => void run()}
        />
      )}
    </>
  );
};
