import React from 'react';
import { ArrowRight, Award, BookOpen, ExternalLink } from 'lucide-react';

const pusmendikUrl =
  'https://pusmendik.kemendikdasmen.go.id/tka/tka/view/mata-pelajaran-pilihan/sma/pengembangan-perangkat-lunak-dan-gim-smk-mak';

interface LandingHeroProps {
  onEnterLMS: () => void;
  onOpenExam: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onEnterLMS, onOpenExam }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-950 text-white pt-12 sm:pt-16 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-400 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-400 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <a
          // href={pusmendikUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex max-w-full items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-blue-200 border border-white/20 mb-6 sm:mb-8 transition-colors group"
        >
          <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
          <span className="truncate">Materi Resmi Kurikulum Asesmen Pusmendik Kemendikdasmen</span>
          {/* <ExternalLink className="w-3.5 h-3.5 text-blue-300 group-hover:translate-x-0.5 transition-transform shrink-0" /> */}
        </a>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-5 sm:mb-6 leading-tight">
          Portal & LMS Asesmen <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-blue-200 to-cyan-300">
            TKA PPLG SMK
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-sm sm:text-lg text-blue-100/90 font-normal leading-relaxed mb-8 sm:mb-10">
          Platform persiapan Tes Kompetensi Akademik (TKA) bidang
          <strong className="text-white font-semibold"> Pengembangan Perangkat Lunak dan Gim (PPLG)</strong> untuk
          siswa SMK Telekomunikasi Tunas Harapan modul per bab, rangkuman, dan simulasi soal tanpa login.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onEnterLMS}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm shadow-xl shadow-blue-500/30 active:scale-95 transition-all cursor-pointer"
          >
            <BookOpen className="w-5 h-5" />
            <span>Buka Modul Pembelajaran</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenExam}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-xl shadow-amber-400/20 active:scale-95 transition-all cursor-pointer"
          >
            <Award className="w-5 h-5 text-slate-900" />
            <span>Simulasi Ujian CBT</span>
          </button>
        </div>
      </div>
    </section>
  );
};
