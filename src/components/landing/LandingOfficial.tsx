"use client";

import React from "react";
import { KerangkaAsesmenView } from "@/components/pusmendik/KerangkaAsesmenView";

export const LandingOfficial: React.FC = () => {
  return (
    <section
      id="kerangka-asesmen"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14"
      aria-label="Kerangka Asesmen TKA PPLG Pusmendik"
    >
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-sky-700 uppercase tracking-wider block mb-1">
            Standar Kurikulum Nasional BSKAP 2025
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Pedoman & Kerangka Asesmen Resmi
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md">
          Diselaraskan dengan silabus Pusat Asesmen Pendidikan (Pusmendik)
          Kemendikdasmen RI untuk Program Keahlian PPLG.
        </p>
      </div>

      <KerangkaAsesmenView />
    </section>
  );
};
