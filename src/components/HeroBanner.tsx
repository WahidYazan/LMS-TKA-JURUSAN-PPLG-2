"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, ClipboardCheck, ArrowRight } from "lucide-react";
import { useSiteStats } from "../hooks/useSiteStats";

export const HeroBanner: React.FC = () => {
  const { totalModules, totalQuestions, totalChapters } = useSiteStats();
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-[#0c1328] via-[#0f1b3b] to-[#090d1a] text-white shadow-xl mb-8 sm:mb-10 p-6 sm:p-8 lg:p-10">

      {/* BACKGROUND - ini yang lu mau gradasi kayak logo-modul.png kemarin */}
      <div
        className="absolute right-0 top-0 bottom-0 w-full sm:w-[60%] pointer-events-none select-none"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 35%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 35%)",
        }}
        aria-hidden="true"
      >
        {/* kalo mau pake logo-modul.png lagi */}
        <Image
          src="/images/brands/logo-modul.png"
          alt=""
          fill
          className="object-cover object-right opacity-30 sm:opacity-40"
        />
      </div>

      {/* kalo mau double layer hero_workspace + logo-modul biar cakep */}
      {/* <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[60%] pointer-events-none">
        <Image src="/images/hero/hero_workspace.jpg" fill className="object-cover opacity-20" alt="" />
        <div
          className="absolute inset-0"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 30%)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 30%)",
          }}
        >
          <Image src="/images/brands/logo-modul.png" fill className="object-cover object-right opacity-30" alt="" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c1328] via-[#0c1328]/60 to-transparent" />
      </div> */}

      {/* overlay halus biar text kebaca */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c1328] via-[#0c1328]/80 to-transparent sm:w-[75%] pointer-events-none" />

      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold mb-4 border border-white/15 text-sky-200">
          <GraduationCap className="w-3.5 h-3.5 text-sky-300" aria-hidden="true" />
          <span>Kurikulum Pusmendik · SMK Telekomunikasi Tunas Harapan</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-3 leading-tight">
          Katalog Modul Pembelajaran TKA PPLG
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm max-w-xl font-normal leading-relaxed mb-6">
          Pelajari {totalModules} modul kejuruan secara bertahap dan mendalam. Setiap modul dilengkapi penjelasan konsep teoritis, studi kasus kode, serta rangkuman esensial.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/tka/quiz"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer min-h-"
          >
            <ClipboardCheck className="w-4 h-4" aria-hidden="true" />
            <span>Langsung ke Simulasi Ujian ({totalQuestions} Soal)</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
          <span className="text-xs text-slate-400 hidden sm:inline">
            {totalModules} Modul · {totalChapters} Bab Materi Lengkap
          </span>
        </div>
      </div>
    </div>
  );
};