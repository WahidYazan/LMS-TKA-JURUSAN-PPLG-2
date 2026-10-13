import React from "react";
import Image from "next/image";

export const HeroBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-blue-200 dark:border-zinc-200 bg-gradient-to-r from-blue-950 via-blue-900/90 to-blue-950 text-white shadow-xl mb-8 sm:mb-12 p-6 sm:p-8 min-h-[140px]">
      <div
        className="absolute right-0 top-0 h-full w-[55%] sm:w-[75%] md:w-[65%] opacity-80 sm:opacity-95 pointer-events-none select-none"
        style={{
          maskImage: "linear-gradient(to left, black 20%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to left, black 20%, transparent 100%)",
        }}
        aria-hidden="true"
      >
        <Image
          src="/images/brands/logo-modul.png"
          alt=""
          fill
          sizes="65vw"
          className="object-cover"
        />
      </div>

      <div className="relative z-10 max-w-xl">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-semibold mb-3 border border-white/30">
          <span>Asesmen Nasional</span>
        </div>

        {/* INI YANG GUA KECILIN */}
        <h1 className="text-2xl sm:text-[28px] lg:text-[32px] font-extrabold tracking-tight text-white mb-2.5 leading-[1.15]">
          Simulasi TKA PPLG
        </h1>

        <p className="text-blue-100/90 text-[13px] sm:text-sm max-w-[480px] font-medium leading-relaxed">
          Tingkatkan kompetensi keahlian Pengembangan Perangkat Lunak dan Gim
          dengan modul interaktif berstandar Pusmendik.
        </p>
      </div>
    </div>
  );
};
