import React from 'react';

export const HeroBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#1d4ed8] text-white shadow-xl shadow-blue-900/10 mb-6 sm:mb-10 p-4 sm:p-6 lg:p-10">
      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/15 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-amber-200 mb-3 sm:mb-5 shadow-xs min-h-[28px]">
          <span aria-hidden="true">⭐</span>
          <span>Asesmen Nasional</span>
        </div>

        <h1 className="text-xl sm:text-2xl lg:text-4xl font-black tracking-tight text-white mb-3 sm:mb-4 leading-tight">
          Portal TKA PPLG
        </h1>

        <p className="text-xs sm:text-sm lg:text-base text-blue-100/90 font-normal leading-relaxed">
          Tingkatkan kompetensi keahlian Pengembangan Perangkat Lunak dan Gim dengan modul interaktif berstandar Pusmendik.
        </p>
      </div>
    </div>
  );
};