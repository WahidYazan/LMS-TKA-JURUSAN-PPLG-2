import React from 'react';
import Link from 'next/link';
import { Terminal, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ExamBannerCard: React.FC = () => {
  return (
    <div
      className="relative rounded-3xl bg-gradient-to-br from-[#090e1a] via-[#0f1b3b] to-[#090d1a] text-white p-6 sm:p-7 flex flex-col justify-between shadow-xl border border-slate-800 overflow-hidden group min-h-[340px] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
    >
      {/* Decorative ambient lighting */}
      <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md shadow-amber-400/20 group-hover:scale-105 transition-transform">
            <Terminal className="w-6 h-6" aria-hidden="true" />
          </div>
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/10 text-amber-300 uppercase tracking-wider">
            50 SOAL HOTS
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-sky-200/90 font-medium mb-1.5">
          <span>Evaluasi Seketika</span>
          <span aria-hidden="true">·</span>
          <span>Standar Pusmendik</span>
        </div>

        <h3 className="font-black text-white text-lg sm:text-xl mb-2 group-hover:text-amber-200 transition-colors">
          Simulasi Ujian TKA PPLG
        </h3>
        
        <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
          Uji kesiapan Anda menghadapi asesmen kejuruan nasional. Menganalisis studi kasus industri nyata dari Modul 1 sampai Modul 5.
        </p>

        {/* Feature bullets */}
        <div className="space-y-1.5 text-xs text-slate-300 mb-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Timer & Stopwatch Real-time</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Pembahasan Mendalam Setiap Opsi</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-4 border-t border-white/10 mt-4">
        <Link
          href="/tka/quiz"
          className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs tracking-wide flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer min-h-[44px]"
        >
          <span>Mulai Simulasi Sekarang</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};