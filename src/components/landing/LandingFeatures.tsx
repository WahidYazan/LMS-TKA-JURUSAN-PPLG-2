"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Copy,
  Check,
  FileCode2,
  ShieldCheck,
  Zap,
  ArrowRight,
} from "lucide-react";

import { useSiteStats } from "../../hooks/useSiteStats";

export const LandingFeatures: React.FC = () => {
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const { totalQuestions } = useSiteStats();

  const handleCopySnippet = () => {
    navigator.clipboard.writeText("git checkout -b feature/tka-pplg\ngit commit -m 'feat: complete module 03'");
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section className="bg-slate-50 border-y border-slate-200/80 py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
            Keunggulan & Metodologi Belajar
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Dirancang untuk Penguasaan Konsep Nyata
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Bukan sekadar hafalan teori. Platform ini menggabungkan studi kasus industri, simulasi ujian dengan pembahasan mendalam, dan rangkuman siap pakai.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Bento Card 1: Wide (Span 2 on lg) - Interactive HOTS Question Mock */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {totalQuestions} Soal Studi Kasus HOTS & Pembahasan Instan
                  </h3>
                  <p className="text-xs text-slate-400">
                    Menganalisis arsitektur sistem, debugging kode, dan kalkulasi query
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                Setiap butir soal disusun dengan studi kasus dunia kerja yang relevan dengan kisi-kisi Asesmen Kemampuan Akademik Kejuruan PPLG.
              </p>

              {/* Interactive Mock Preview Box */}
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 sm:p-5 border border-slate-800 text-xs sm:text-sm font-sans mb-4">
                <div className="flex items-center justify-between text-slate-400 pb-2 mb-3 border-b border-slate-800 text-[11px]">
                  <span className="font-mono text-sky-400 font-bold">SOAL #28 · BASIS DATA & CONCURRENCY</span>
                  <span className="text-emerald-400 font-medium">Tingkat: HOTS Analisis</span>
                </div>
                
                <p className="text-slate-200 mb-3 font-medium leading-relaxed">
                  Dua transaksi kasir memperbarui stok barang yang sama secara bersamaan sehingga terjadi inkonsistensi saldo. Konsep ACID apa yang harus diterapkan?
                </p>

                <div className="space-y-1.5 font-mono text-xs">
                  <div className="p-2 rounded bg-slate-800/80 border border-slate-700 text-slate-300">
                    A. Atomicity dengan Rollback manual
                  </div>
                  <div className="p-2 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 flex items-center justify-between font-semibold">
                    <span>B. Isolation Level Serializable / Locking</span>
                    <span className="text-[10px] bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded font-sans font-bold">Jawaban Benar</span>
                  </div>
                  <div className="p-2 rounded bg-slate-800/80 border border-slate-700 text-slate-300">
                    C. Durability pada Non-volatile memory
                  </div>
                </div>

                <div className="mt-3 p-2.5 rounded bg-blue-950/60 border border-blue-900/60 text-[11px] text-blue-200 leading-relaxed font-sans">
                  <strong>Pembahasan:</strong> Anomali lost update terjadi karena transaksi tidak terisolasi. Mengatur Isolation Level menjamin eksekusi konkruen berperilaku seperti transaksi serial.
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <Link
                href="/tka/quiz"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                <span>Coba Simulator Soal Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Bento Card 2: Interactive Cheatsheet */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center mb-4 shrink-0">
                <FileCode2 className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Cheatsheet Cepat Siap Salin
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-4 leading-relaxed">
                Rangkuman sintaks esensial Git workflow, kode status HTTP, prinsip OOP, dan query SQL penting yang sering muncul pada ujian kejuruan.
              </p>

              {/* Code snippet interactive box */}
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 text-xs font-mono text-slate-300 mb-4">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-400">
                  <span className="text-amber-400 font-bold">BASH / GIT WORKFLOW</span>
                  <button
                    onClick={handleCopySnippet}
                    className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedSnippet ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Disalin</span>
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
                  <code>git checkout -b feature/auth
git commit -m &apos;feat: login&apos;</code>
                </pre>
              </div>
            </div>

            <Link
              href="/tka/modul"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700"
            >
              <span>Eksplorasi Bank Sintaks</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Bento Card 3: Kurikulum Pusmendik */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center mb-4 shrink-0">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Pedoman Resmi Pusmendik
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-4 leading-relaxed">
                Seluruh materi dan bank asesmen disusun berpedoman pada kurikulum resmi Kemendikdasmen untuk Mata Pelajaran Pilihan SMK/MAK bidang PPLG.
              </p>
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
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4">
              <span className="text-[11px] font-bold text-slate-400">
                Terverifikasi Kurikulum Merdeka
              </span>
            </div>
          </div>

          {/* Bento Card 4: Wide (Span 2 on lg) - Akses Bebas & Ringan */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Akses Ringan, Bebas Hambatan & Multi-Perangkat
                  </h3>
                  <p className="text-xs text-slate-400">
                    Langsung belajar di ponsel, tablet, atau komputer sekolah tanpa login berbelit
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                Dirancang dengan performa cepat dan navigasi bersih. Siswa dan guru dapat langsung membuka modul materi dan mengerjakan simulasi ujian tanpa perlu registrasi akun atau instalasi aplikasi tambahan.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-xs font-bold text-slate-800">Tanpa Registrasi</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Langsung akses 100% materi</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-xs font-bold text-slate-800">Responsif Penuh</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Optimal di HP & laptop lab</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-xs font-bold text-slate-800">Evaluasi Seketika</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Skor & pembahasan langsung muncul</div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-4">
              <span className="text-xs text-slate-400">
                SMK Telekomunikasi Tunas Harapan
              </span>
              <Link
                href="/tka/modul"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
              >
                <span>Buka Katalog Modul</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
