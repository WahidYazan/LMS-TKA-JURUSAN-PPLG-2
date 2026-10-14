"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  BookOpen,
  ListChecks,
  Home,
  ArrowUpRight,
  DatabaseZap,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ImportSeedButton } from "@/components/admin/ImportSeedButton";
import { LogoSettings } from "@/components/admin/LogoSettings";

/** Aksen per seksi: biru tetap dominan, sisanya hanya penanda fungsi. */
const sections = [
  {
    href: "/tka/admin/quiz",
    label: "Soal Quiz",
    desc: "Soal HOTS per modul, opsi & pembahasan (jumlah otomatis).",
    icon: HelpCircle,
    table: "quiz_questions" as const,
    code: "SOAL",
    accent: "sky" as const,
    ring: "group-hover:border-sky-300",
    tile: "bg-sky-50 text-sky-600 group-hover:bg-sky-500 group-hover:text-white",
  },
  {
    href: "/tka/admin/modules",
    label: "Modul",
    desc: "Materi pembelajaran & section di tiap modul.",
    icon: BookOpen,
    table: "modules" as const,
    code: "MODUL",
    accent: "blue" as const,
    ring: "group-hover:border-blue-300",
    tile: "bg-blue-50 text-blue-600 group-hover:bg-blue-500 group-hover:text-white",
  },
  {
    href: "/tka/admin/cheatsheet",
    label: "Cheatsheet",
    desc: "Rangkuman git, http, sql, oop beserta itemnya.",
    icon: ListChecks,
    table: "cheatsheet_items" as const,
    code: "CHTS",
    accent: "indigo" as const,
    ring: "group-hover:border-indigo-300",
    tile: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white",
  },
  {
    href: "/tka/admin/landing",
    label: "Landing",
    desc: "Statistik angka & kartu fitur halaman depan.",
    icon: Home,
    table: "landing_features" as const,
    code: "LP",
    accent: "cyan" as const,
    ring: "group-hover:border-cyan-300",
    tile: "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white",
  },
] as const;

/** Baris statistik kecil di hero — diambil langsung dari jumlah baris tabel. */
const StatPill: React.FC<{
  value: number | null;
  label: string;
}> = ({ value, label }) => (
  <div className="flex items-baseline gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
    {value === null ? (
      <span className="skeleton h-6 w-8 rounded-md" aria-hidden="true" />
    ) : (
      <span className="text-xl font-extrabold tracking-tight text-slate-900 tabular-nums">
        {value}
      </span>
    )}
    <span className="text-[11px] font-semibold text-slate-500 leading-tight">
      {label}
    </span>
  </div>
);

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<Record<string, number | null>>({});

  const loadCounts = useCallback(async () => {
    const client = supabase;
    if (!client) return;
    const entries = await Promise.all(
      sections.map(async (s) => {
        const { count } = await client
          .from(s.table)
          .select("id", { count: "exact", head: true });
        return [s.table, count ?? null] as const;
      }),
    );
    setCounts(Object.fromEntries(entries));
  }, []);

  useEffect(() => {
    const run = async () => {
      await loadCounts();
    };
    void run();
  }, [loadCounts]);

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-xs mb-6">
        <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-sky-400 via-sky-500 to-blue-600" aria-hidden="true" />
        <div
          className="absolute -right-10 -top-12 w-72 h-72 bg-blueprint opacity-70 pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative pl-7 pr-5 sm:pl-8 sm:pr-8 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="min-w-0">
              <p className="font-mono text-[10.5px] font-semibold tracking-[0.2em] uppercase text-sky-600">
                Panel Internal · AD/01
              </p>
              <h1 className="mt-2 text-[28px] sm:text-[38px] font-extrabold tracking-[-0.03em] leading-[1.05] text-balance text-slate-900">
                Dashboard konten
              </h1>
              <p className="mt-2.5 text-[13.5px] sm:text-[15px] text-slate-500 max-w-xl leading-relaxed">
                Kelola seluruh konten Simulasi TKA PPLG dari satu tempat.
                Perubahan tersimpan langsung terlihat di situs siswa.
              </p>

              {supabase ? (
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <StatPill value={counts.quiz_questions ?? null} label="soal HOTS" />
                  <StatPill value={counts.modules ?? null} label="modul" />
                  <StatPill
                    value={counts.cheatsheet_items ?? null}
                    label="item cheatsheet"
                  />
                  <StatPill
                    value={counts.landing_features ?? null}
                    label="kartu fitur"
                  />
                </div>
              ) : (
                <p className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                  <DatabaseZap className="w-4 h-4" aria-hidden="true" />
                  Supabase belum dikonfigurasi (.env.local)
                </p>
              )}
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[11px] font-bold uppercase tracking-wider text-sky-700 w-fit shrink-0 self-start lg:self-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" aria-hidden="true" />
              Halaman Admin
            </span>
          </div>
        </div>
      </section>

      {/* ── Kartu seksi ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {sections.map((s, i) => {
          const Icon = s.icon;
          const count = counts[s.table];
          return (
            <Link key={s.href} href={s.href} className="group block">
              <div
                className={`h-full relative bg-white rounded-2xl border border-slate-200 shadow-xs p-5 transition-all group-hover:shadow-lg group-hover:-translate-y-0.5 ${s.ring}`}
              >
                {/* penomoran mono di pojok — biar bukan kartu seragam */}
                <span
                  className="absolute top-4 right-4 font-mono text-[10.5px] font-semibold tracking-widest text-slate-300 group-hover:text-slate-400 transition-colors"
                  aria-hidden="true"
                >
                  0{i + 1} / 0{sections.length}
                </span>

                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${s.tile}`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1 pr-8">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-[15px] font-extrabold tracking-tight text-slate-900">
                        {s.label}
                      </p>
                      <span className="font-mono text-[9.5px] font-semibold tracking-widest uppercase text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">
                        {s.code}
                      </span>
                    </div>
                    <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
                  <p className="text-[11.5px] font-semibold text-slate-400">
                    {count === null || count === undefined
                      ? "Memuat jumlah data…"
                      : `${count} data tersimpan`}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[12px] font-bold text-sky-600 group-hover:text-sky-700 transition-colors">
                    Kelola
                    <ArrowUpRight
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Pengaturan & impor ───────────────────────────────── */}
      <div className="space-y-4">
        <LogoSettings />
        <ImportSeedButton />
      </div>
    </div>
  );
}
