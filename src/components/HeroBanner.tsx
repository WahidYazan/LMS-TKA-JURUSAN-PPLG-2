import React from "react";
import Image from "next/image";

export const HeroBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-blue-200 dark:border-zinc-200 bg-gradient-to-r from-blue-950 via-blue-900/90 to-blue-950 text-white shadow-xl mb-8 sm:mb-12 p-6 sm:p-8 min-h-[140px]">
      <div
        className="absolute right-0 top-0 h-full w-[55%] sm:w-[75%] md:w-[65%] opacity-80 sm:opacity-95 pointer-events-none select-none"
        style={{
          maskImage: "linear-gradient(to left, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0) 100%)",
          WebkitMaskImage: "linear-gradient(to left, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0) 100%)",
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


      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold mb-4 border border-white/30">
          <span>Asesmen Nasional</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          Simulasi TKA PPLG
        </h1>

        <p className="text-blue-100 text-base sm:text-lg max-w-2xl font-medium leading-relaxed">
          Tingkatkan kompetensi keahlian Pengembangan Perangkat Lunak dan Gim
          dengan modul interaktif berstandar Pusmendik.
        </p>
      </div>
    </div>
  );
};
