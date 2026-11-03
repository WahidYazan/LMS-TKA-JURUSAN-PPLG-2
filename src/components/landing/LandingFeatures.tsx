"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  FileCode2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";

import { loadLandingFeatures } from "@/lib/content";
import { landingFeatures as defaultFeatures } from "@/data/landing/features";
import { useContent } from "@/hooks/useContent";
import { useSiteStats } from "@/hooks/useSiteStats";

const iconMap: Record<string, React.ElementType> = {
  blue: CheckCircle2,
  indigo: FileCode2,
  sky: ShieldCheck,
  emerald: Zap,
  amber: FileCode2,
  purple: CheckCircle2,
  rose: ShieldCheck,
  orange: Zap,
};

const toneBgMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
  sky: "bg-sky-50 text-sky-600 border-sky-100",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  amber: "bg-amber-50 text-amber-600 border-amber-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100",
  rose: "bg-rose-50 text-rose-600 border-rose-100",
  orange: "bg-orange-50 text-orange-600 border-orange-100",
};

const toneLinkMap: Record<string, string> = {
  blue: "text-blue-600 hover:text-blue-700",
  indigo: "text-indigo-600 hover:text-indigo-700",
  sky: "text-sky-600 hover:text-sky-700",
  emerald: "text-emerald-600 hover:text-emerald-700",
  amber: "text-amber-600 hover:text-amber-700",
  purple: "text-purple-600 hover:text-purple-700",
  rose: "text-rose-600 hover:text-rose-700",
  orange: "text-orange-600 hover:text-orange-700",
};

import { useSiteSettings } from "@/hooks/useSiteSettings";

export const LandingFeatures: React.FC = () => {
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const { totalQuestions } = useSiteStats();
  const { data: features } = useContent(loadLandingFeatures, defaultFeatures);
  const { landingFeaturesWidth } = useSiteSettings();

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(
      "git checkout -b feature/tka-pplg\ngit commit -m 'feat: complete module 03'",
    );
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const displayFeatures = features ?? defaultFeatures;

  // Inject dynamic question count into the soal-hots feature
  const featuresWithDynamicData = displayFeatures.map((feature) => {
    if (feature.id === "soal-hots") {
      return {
        ...feature,
        title: `${totalQuestions} Soal Studi Kasus HOTS & Pembahasan Instan`,
      };
    }
    return feature;
  });

  const itemCount = featuresWithDynamicData.length;

  // Adaptive container max-width based on item count
  // auto mode: 1 item ~350px, 2 items ~700px, 3 items ~1050px, 4 items = max-w-7xl
  // full mode: max-w-7xl (1280px) - full tapi tetap ada margin kanan kiri
  const getAdaptiveMaxWidth = (count: number): string => {
    if (landingFeaturesWidth === "full") return "1280px"; // max-w-7xl - full tapi tetap ada margin kanan kiri
    if (count <= 1) return "350px";
    if (count === 2) return "700px";
    if (count === 3) return "1050px";
    return "1280px"; // 4+ items (max-w-7xl)
  };

  const adaptiveMaxWidth = getAdaptiveMaxWidth(itemCount);

  // Layout styles based on width mode
  // auto mode: flex row, items jejer horizontal, container fits content
  // full mode: grid with auto-fit, can wrap to multiple rows
  const containerStyle: React.CSSProperties = {
    maxWidth: adaptiveMaxWidth,
  };

  const gridStyle: React.CSSProperties =
    landingFeaturesWidth === "full"
      ? {
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit, minmax(320px, 1fr))`,
          gap: "1.5rem",
          justifyContent: "center",
        }
      : {
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          gap: "1.5rem",
          justifyContent: "center",
          overflowX: "auto",
          paddingBottom: "0.5rem",
        };

  return (
    <section className="bg-slate-50 border-y border-slate-200/80 py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto" style={containerStyle}>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          {/* <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
            Keunggulan & Metodologi Belajar
          </div> */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Dirancang untuk Penguasaan Konsep Nyata
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Bukan sekadar hafalan teori. Platform ini menggabungkan studi kasus
            industri, simulasi ujian dengan pembahasan mendalam, dan rangkuman
            siap pakai.
          </p>
        </div>

        {/* Dynamic Feature Grid */}
        <div className="gap-6" style={gridStyle}>
          {featuresWithDynamicData.map((feature) => {
            const Icon = iconMap[feature.tone] || CheckCircle2;
            const bgClass = toneBgMap[feature.tone] || toneBgMap.blue;
            const linkClass = toneLinkMap[feature.tone] || toneLinkMap.blue;

            return (
              <div
                key={feature.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between min-h-[320px]"
              >
                <div>
                  <div
                    className={`w-10 h-10 rounded-xl ${bgClass} flex items-center justify-center mb-4 shrink-0`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mb-4 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Special interactive content for specific features */}
                  {feature.id === "soal-hots" && (
                    <div className="bg-slate-900 text-slate-100 rounded-xl p-4 sm:p-5 border border-slate-800 text-xs sm:text-sm font-sans mb-4">
                      <div className="flex items-center justify-between text-slate-400 pb-2 mb-3 border-b border-slate-800 text-[11px]">
                        <span className="font-mono text-sky-400 font-bold">
                          SOAL #28 · BASIS DATA & CONCURRENCY
                        </span>
                        <span className="text-emerald-400 font-medium">
                          Tingkat: HOTS Analisis
                        </span>
                      </div>

                      <p className="text-slate-200 mb-3 font-medium leading-relaxed">
                        Dua transaksi kasir memperbarui stok barang yang sama
                        secara bersamaan sehingga terjadi inkonsistensi saldo.
                        Konsep ACID apa yang harus diterapkan?
                      </p>

                      <div className="space-y-1.5 font-mono text-xs">
                        <div className="p-2 rounded bg-slate-800/80 border border-slate-700 text-slate-300">
                          A. Atomicity dengan Rollback manual
                        </div>
                        <div className="p-2 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 flex items-center justify-between font-semibold">
                          <span>B. Isolation Level Serializable / Locking</span>
                          <span className="text-[10px] bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded font-sans font-bold">
                            Jawaban Benar
                          </span>
                        </div>
                        <div className="p-2 rounded bg-slate-800/80 border border-slate-700 text-slate-300">
                          C. Durability pada Non-volatile memory
                        </div>
                      </div>

                      <div className="mt-3 p-2.5 rounded bg-blue-950/60 border border-blue-900/60 text-[11px] text-blue-200 leading-relaxed font-sans">
                        <strong>Pembahasan:</strong> Anomali lost update terjadi
                        karena transaksi tidak terisolasi. Mengatur Isolation
                        Level menjamin eksekusi konkruen berperilaku seperti
                        transaksi serial.
                      </div>
                    </div>
                  )}

                  {feature.id === "cheatsheet" && (
                    <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 text-xs font-mono text-slate-300 mb-4">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-400">
                        <span className="text-amber-400 font-bold">
                          BASH / GIT WORKFLOW
                        </span>
                        <button
                          onClick={handleCopySnippet}
                          className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          {copiedSnippet ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400 font-bold">
                                Disalin
                              </span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Salin</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-slate-300 leading-relaxed overflow-x-auto text-[11px]">
                        <code>
                          git checkout -b feature/auth git commit -m &apos;feat:
                          login&apos;
                        </code>
                      </pre>
                    </div>
                  )}

                  {feature.id === "pusmendik" && (
                    <div className="space-y-2 pt-2 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                        <span>Kesesuaian Capaian Pembelajaran Fase F</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                        <span>SOP Industri Rekayasa Perangkat Lunak</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                        <span>Standarisasi K3 dan Ergonomi Komputer</span>
                      </div>
                    </div>
                  )}

                  {feature.id === "akses-bebas" && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="text-xs font-bold text-slate-800">
                          Tanpa Registrasi
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Langsung akses 100% materi
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="text-xs font-bold text-slate-800">
                          Responsif Penuh
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Optimal di HP & laptop lab
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="text-xs font-bold text-slate-800">
                          Evaluasi Seketika
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Skor & pembahasan langsung muncul
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-4">
                  <span className="text-xs text-slate-400">
                    SMK Telekomunikasi Tunas Harapan
                  </span>
                  <Link
                    href={
                      feature.id === "soal-hots" ? "/tka/quiz" : "/tka/modul"
                    }
                    className={`inline-flex items-center gap-1.5 text-xs font-bold ${linkClass}`}
                  >
                    <span>
                      {feature.id === "soal-hots"
                        ? "Coba Simulator Soal Sekarang"
                        : feature.id === "cheatsheet"
                          ? "Eksplorasi Bank Sintaks"
                          : "Buka Katalog Modul"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
