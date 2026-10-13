import React from "react";
import Link from "next/link";

export const LandingCta: React.FC = () => {
  return (
    <section className="bg-white border-y border-slate-200 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 max-w-6xl mx-auto">
      {" "}
      <div className="bg-sky-500 rounded-3xl p-6 sm:p-10 text-white text-center shadow-xl shadow-sky-500/20">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 tracking-tight">
          Siap Taklukkan Simulasi TKA PPLG 2026?
        </h2>
        <p className="text-base sm:text-lg font-medium text-sky-100 max-w-2xl mx-auto mb-8 leading-relaxed">
          Pelajari 5 Modul Lengkap berbasis kisi-kisi Pusmendik terbaru. Dari
          Wawasan Kerja sampai OOP & Dasar Gim, plus 50+ Simulasi Soal HOTS
          industri.
        </p>
        <Link
          href="/tka/modul"
          className="inline-flex px-8 py-3.5 rounded-xl bg-white text-sky-700 hover:bg-sky-50 font-bold text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer min-h-[52px] min-w-[200px] justify-center"
        >
          Mulai Simulasi TKA PPLG
        </Link>
        <p className="text-sm text-sky-200 mt-4 opacity-80">
          Gratis • Tanpa Login • Materi Update Soal Resmi
        </p>
      </div>
    </section>
  );
};
