import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
} from "lucide-react";

export const LandingHero: React.FC = () => {
  return (
    <section className="relative flex flex-col justify-center px-5 py-14 sm:px-8 sm:py-16 lg:p-16 text-white bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 overflow-hidden select-none">
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-48 h-48 sm:w-80 sm:h-80 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-48 h-48 sm:w-80 sm:h-80 bg-sky-300 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <a
          // href={pusmendikUrl}
          target="_blank"
          // rel="noopener noreferrer"
          className="inline-flex max-w-full items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md text-xs font-semibold text-sky-200 border border-white/20 mb-5 sm:mb-7 transition-colors group min-h-[36px]"
          aria-label="Kunjungi laman Asesmen Nasional Pusmendik"
        >
          <span className="truncate max-w-[200px]"><strong className="text-white">Asesmen Nasional</strong></span>
          {/*<ExternalLink
            className="w-3.5 h-3.5 text-sky-300 group-hover:translate-x-0.5 transition-transform shrink-0"
            aria-hidden="true"
          />*/}
        </a>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 sm:mb-5 leading-tight">
          Simulasi TKA <br />
          <span className="text-sky-200">
            PPLG
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-base sm:text-lg text-sky-100/90 font-medium leading-relaxed mb-6 sm:mb-8">
          Platform persiapan Tes Kompetensi Akademik (TKA) bidang
          <strong className="text-white font-semibold">
            {" "}
            Pengembangan Perangkat Lunak dan Gim (PPLG)
          </strong>{" "}
          untuk siswa SMK Telekomunikasi Tunas Harapan.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/tka/modul"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-white hover:bg-sky-50 text-sky-600 font-bold text-sm shadow-xl shadow-sky-900/15 active:scale-95 transition-all cursor-pointer min-h-[52px]"
            aria-label="Buka modul pembelajaran"
          >
            <BookOpen className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            <span>Buka Modul Pembelajaran</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          </Link>

          <Link
            href="/tka/quiz"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-xl shadow-amber-400/20 active:scale-95 transition-all cursor-pointer min-h-[52px]"
            aria-label="Buka Simulasi TKA PPLG"
          >
            <ClipboardCheck
              className="w-5 h-5 text-slate-900 flex-shrink-0"
              aria-hidden="true"
            />
            <span>Simulasi TKA PPLG</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
