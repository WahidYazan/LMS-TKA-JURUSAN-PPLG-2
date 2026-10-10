import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Code2,
  CodeIcon,
  ExternalLink,
  ClipboardCheck,
} from "lucide-react";

const pusmendikUrl =
  "https://pusmendik.kemendikdasmen.go.id/tka/tka/view/mata-pelajaran-pilihan/sma/pengembangan-perangkat-lunak-dan-gim-smk-mak";

export const LandingHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-950 text-white pt-10 sm:pt-14 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-48 h-48 sm:w-80 sm:h-80 bg-blue-400 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-48 h-48 sm:w-80 sm:h-80 bg-indigo-400 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <a
          // href={pusmendikUrl}
          target="_blank"
          // rel="noopener noreferrer"
          className="inline-flex max-w-full items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-blue-200 border border-white/20 mb-5 sm:mb-7 transition-colors group min-h-[36px]"
          aria-label="Kunjungi laman Asesmen Nasional Pusmendik"
        >
          <span className="truncate max-w-[200px]">Asesmen Nasional</span>
          {/*<ExternalLink
            className="w-3.5 h-3.5 text-blue-300 group-hover:translate-x-0.5 transition-transform shrink-0"
            aria-hidden="true"
          />*/}
        </a>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 sm:mb-5 leading-tight">
          Portal Asesmen <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-400">
            TKA PPLG
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-sm sm:text-base lg:text-lg text-blue-100/90 font-normal leading-relaxed mb-6 sm:mb-8">
          Platform persiapan Tes Kompetensi Akademik (TKA) bidang
          <strong className="text-white font-semibold">
            {" "}
            Pengembangan Perangkat Lunak dan Gim (PPLG)
          </strong>{" "}
          untuk siswa SMK Telekomunikasi Tunas Harapan.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/modul"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm shadow-xl shadow-blue-500/30 active:scale-95 transition-all cursor-pointer min-h-[52px]"
            aria-label="Buka modul pembelajaran"
          >
            <BookOpen className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            <span>Buka Modul Pembelajaran</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          </Link>

          <Link
            href="/quiz"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-xl shadow-amber-400/20 active:scale-95 transition-all cursor-pointer min-h-[52px]"
            aria-label="Buka simulasi ujian TKA"
          >
            <ClipboardCheck
              className="w-5 h-5 text-slate-900 flex-shrink-0"
              aria-hidden="true"
            />
            <span>Simulasi Ujian TKA</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
