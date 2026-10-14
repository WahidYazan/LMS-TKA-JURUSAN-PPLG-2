"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  FileCode2,
  GraduationCap,
} from "lucide-react";
import { useSiteStats } from "../../hooks/useSiteStats";

interface LandingHeroProps {
  onOpenCheatsheet?: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onOpenCheatsheet }) => {
  const { totalModules, totalQuestions } = useSiteStats();
  return (
    <section className="relative bg-[#090e1a] text-white pt-10 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 overflow-hidden border-b border-slate-800/80">
      {/* Decorative ambient illumination */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[400px] bg-blue-600/15 blur-[120px] rounded-full" />
        <div className="absolute top-1/3 -right-20 w-[500px] h-[450px] bg-sky-500/10 blur-[110px] rounded-full" />
        <div className="absolute -bottom-20 left-1/3 w-[500px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Editorial & Call to Action (7 cols) */}
          <div className="lg:col-span-7 text-left">
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-sky-300 mb-6 backdrop-blur-md">
              <GraduationCap className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
              <span>SMK Telekomunikasi Tunas Harapan · Jurusan PPLG</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tight text-white mb-5 leading-[1.12] text-balance">
              Kuasai Materi & Taklukkan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-300 to-blue-100">
                Simulasi TKA PPLG
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl text-balance">
              Portal belajar interaktif resmi siswa SMK Rekayasa Perangkat Lunak dan Gim. Pelajari {totalModules} modul kejuruan berbobot, uji kemampuan dengan {totalQuestions} studi kasus HOTS standar Pusmendik, dan manfaatkan cheatsheet kode siap pakai.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <Link
                href="/tka/modul"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-blue-900 font-bold text-sm shadow-lg shadow-white/5 active:scale-95 transition-all cursor-pointer min-h-[48px]"
              >
                <BookOpen className="w-4.5 h-4.5 text-blue-700 shrink-0" aria-hidden="true" />
                <span>Mulai Belajar Modul</span>
                <ArrowRight className="w-4 h-4 text-blue-700 shrink-0" aria-hidden="true" />
              </Link>

              <Link
                href="/tka/quiz"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg shadow-amber-400/20 active:scale-95 transition-all cursor-pointer min-h-[48px]"
              >
                <ClipboardCheck className="w-4.5 h-4.5 text-slate-950 shrink-0" aria-hidden="true" />
                <span>Simulasi Ujian ({totalQuestions} Soal)</span>
              </Link>

              {/* {onOpenCheatsheet && (
                <button
                  onClick={onOpenCheatsheet}
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-sm border border-white/15 active:scale-95 transition-all cursor-pointer min-h-[48px]"
                >
                  <FileCode2 className="w-4.5 h-4.5 text-sky-400 shrink-0" aria-hidden="true" />
                  <span>Cheatsheet</span>
                </button>
              )} */}
            </div>

            {/* Unboxed Metadata & Trust Indicators */}
            <div className="pt-6 border-t border-slate-800/90 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-sky-400" aria-hidden="true" />
                {totalModules} Modul Kejuruan Lengkap
              </span>
              {/* <span aria-hidden="true" className="text-slate-600">·</span> */}
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" aria-hidden="true" />
                {totalQuestions} Soal Studi Kasus HOTS
              </span>
              {/* <span aria-hidden="true" className="text-slate-600">·</span> */}
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
                Standar Pusmendik Kemendikdasmen
              </span>
              {/* <span aria-hidden="true" className="text-slate-600">·</span> */}
              {/* <span className="text-slate-400">Tanpa Login / Akses Bebas</span> */}
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Studio Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/80 shadow-2xl shadow-black/40 group">
              {/* Showcase Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <Image
                  src="/images/brands/logo-modul.png"
                  alt="Ruang Praktik Rekayasa Perangkat Lunak dan Gim"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 500px"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Floating Top Badge */}
                <div className="absolute top-3 right-3">
                  {/* <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/10 text-[11px] font-mono font-semibold text-sky-300">
                    <Terminal className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
                    <span>SMK TTH · PPLG LAB</span>
                  </div> */}
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-[11px] font-semibold text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Aktif 2026</span>
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 text-left">
                  {/* <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
                      5 Modul Kompetensi Kejuruan
                    </span>
                    <span className="text-[11px] font-mono text-amber-300 font-bold">50 Soal HOTS</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
                    Mulai dari Wawasan Industri, K3, Basis Data & Web, OOP Java/C#, hingga Dasar Engine Gim 2D/3D.
                  </p> */}
                  
                  {/* Topic mini tags */}
                  {/* <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-slate-800">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300">Git & CI/CD</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300">SQL & Relasional</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300">OOP & Polymorphism</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300">Game Loop & Physics</span>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Decorative background glow behind image card */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-sky-500/20 to-blue-600/20 blur-xl -z-10" aria-hidden="true" />
          </div>

        </div>
      </div>
    </section>
  );
};
