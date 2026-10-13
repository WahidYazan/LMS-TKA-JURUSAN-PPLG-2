import React from 'react';
import Link from 'next/link';
import { Terminal, ArrowRight } from 'lucide-react';

export const ExamBannerCard: React.FC = () => {
  return (
    <Link
      href="/tka/quiz"
      className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 flex flex-col justify-between shadow-xl shadow-slate-900/10 border border-blue-900/60 overflow-hidden group min-h-[290px] hover:-translate-y-1 hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
      aria-label="Buka Simulasi TKA PPLG"
    >
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 rounded-full bg-blue-500/20 blur-2xl" aria-hidden="true" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md shadow-amber-400/20 group-hover:scale-105 transition-transform">
            <Terminal className="w-6 h-6" aria-hidden="true" />
          </div>
          <span className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider">
            50 SOAL HOTS
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-sky-200/80 font-medium mb-1.5">
          <span>Evaluasi Otomatis</span>
          <span aria-hidden="true">·</span>
          <span>Standar Pusmendik</span>
        </div>

        <h3 className="font-bold text-white text-lg mb-2 group-hover:text-amber-200 transition-colors">
          Simulasi Ujian TKA PPLG
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
          Uji pemahaman komprehensif Anda melalui studi kasus riil perangkat lunak dan gim berbobot analitis tinggi.
        </p>
      </div>

      <div className="relative z-10 pt-4 border-t border-white/10">
        <span className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs tracking-wide flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer min-h-[42px]">
          <span>Mulai Simulasi Sekarang</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
};