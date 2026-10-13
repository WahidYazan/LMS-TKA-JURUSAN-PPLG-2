import React from "react";
import Link from "next/link";
import { BookOpen, ClipboardCheck, ArrowRight, Sparkles } from "lucide-react";

export const LandingCta: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0a1024] via-[#0f1b3b] to-[#090d1a] text-white p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl text-center">
        {/* Ambient radial glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 right-10 w-72 h-72 bg-amber-500/10 blur-[90px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-sky-200 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
            <span>Persiapan Terpadu Asesmen SMK 2026</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 tracking-tight leading-tight text-balance">
            Siap Uji Pemahaman & Taklukkan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-amber-300">
              Simulasi TKA PPLG?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed text-balance">
            Pelajari 5 modul terstruktur dari Wawasan Kerja hingga OOP & Pemrograman Gim, lalu uji kesiapan Anda lewat 50 butir simulasi studi kasus industri.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
            <Link
              href="/tka/modul"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-blue-900 font-bold text-sm shadow-lg active:scale-95 transition-all cursor-pointer min-h-[48px]"
            >
              <BookOpen className="w-4 h-4 text-blue-700" aria-hidden="true" />
              <span>Buka Modul Pembelajaran</span>
            </Link>

            <Link
              href="/tka/quiz"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg shadow-amber-400/20 active:scale-95 transition-all cursor-pointer min-h-[48px]"
            >
              <ClipboardCheck className="w-4 h-4 text-slate-950" aria-hidden="true" />
              <span>Mulai Ujian 50 Soal</span>
              <ArrowRight className="w-4 h-4 text-slate-950" aria-hidden="true" />
            </Link>
          </div>

          {/* Unboxed trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 text-xs font-medium text-slate-400">
            <span>100% Akses Terbuka</span>
            <span aria-hidden="true">·</span>
            <span>Tanpa Wajib Registrasi</span>
            <span aria-hidden="true">·</span>
            <span>Dilengkapi Kunci & Pembahasan</span>
            <span aria-hidden="true">·</span>
            <span>Standar Resmi Pusmendik</span>
          </div>
        </div>
      </div>
    </section>
  );
};
