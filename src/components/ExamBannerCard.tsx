import React from 'react';
import Link from 'next/link';
import { Terminal, ArrowRight } from 'lucide-react';

export const ExamBannerCard: React.FC = () => {
  return (
    <Link
      href="/quiz"
      className="relative rounded-2xl bg-[#0f172a] text-white p-5 sm:p-6 flex flex-col justify-between shadow-xl shadow-slate-900/10 border border-slate-800 overflow-hidden group min-h-[280px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
      aria-label="Buka Simulasi Ujian TKA"
    >
      <div>
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-blue-400 mb-4 sm:mb-5 flex-shrink-0">
          <Terminal className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
          Simulasi Ujian TKA
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-4 sm:mb-6 flex-1">
          Uji pemahaman akhir dengan studi kasus HOTS standar industri.
        </p>
      </div>

      <span className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 active:scale-[0.98] transition-all cursor-pointer min-h-[48px]">
        <span>Mulai Simulasi</span>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </span>
    </Link>
  );
};