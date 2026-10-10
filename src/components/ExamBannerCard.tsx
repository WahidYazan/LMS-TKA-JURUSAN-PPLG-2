import React from 'react';
import { Terminal } from 'lucide-react';

interface ExamBannerCardProps {
  onStartExam: () => void;
}

export const ExamBannerCard: React.FC<ExamBannerCardProps> = ({ onStartExam }) => {
  return (
    <div className="relative rounded-2xl bg-[#0f172a] text-white p-5 sm:p-7 flex flex-col justify-between shadow-xl shadow-slate-900/10 border border-slate-800 overflow-hidden group">
      <div>
        {/* Dark Icon Box matching screenshot */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-blue-400 mb-4 sm:mb-5">
          <Terminal className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        {/* Title & Desc matching screenshot */}
        <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
          Simulasi Ujian TKA
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-4 sm:mb-6">
          Uji pemahaman akhir dengan studi kasus HOTS standar industri.
        </p>
      </div>

      {/* Blue Button matching screenshot: "Mulai Simulasi" */}
      <button
        onClick={onStartExam}
        className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wide flex items-center justify-center shadow-lg shadow-blue-600/30 active:scale-[0.98] transition-all cursor-pointer"
      >
        Mulai Simulasi
      </button>
    </div>
  );
};
