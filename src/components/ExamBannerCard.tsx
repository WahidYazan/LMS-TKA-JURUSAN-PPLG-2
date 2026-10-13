import React from 'react';
import Link from 'next/link';
import { Terminal, ArrowRight } from 'lucide-react';

export const ExamBannerCard: React.FC = () => {
  return (
    <Link
      href="/tka/quiz"
      className="relative rounded-3xl bg-[#0f172a] text-white p-7 flex flex-col justify-between shadow-xl shadow-slate-900/10 border border-slate-800 overflow-hidden group min-h-[280px] hover:-translate-y-1.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900"
      aria-label="Buka Simulasi TKA PPLG"
    >
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-blue-500 opacity-20 blur-xl" aria-hidden="true"></div>

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-slate-700/50 border border-slate-600 flex items-center justify-center text-blue-400 mb-4 flex-shrink-0">
          <Terminal className="w-6 h-6" aria-hidden="true" />
        </div>

        <h3 className="font-bold text-white text-xl mb-2 group-hover:text-blue-300 transition-colors">
          Simulasi TKA PPLG
        </h3>
        <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">
          Uji pemahaman akhir dengan studi kasus HOTS standar industri.
        </p>
      </div>

      <span className="relative z-10 w-full py-3 px-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all cursor-pointer min-h-[48px]">
        <span>Mulai Simulasi</span>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </span>
    </Link>
  );
};