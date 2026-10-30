"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { KerangkaAsesmenView } from "@/components/pusmendik/KerangkaAsesmenView";
import { usePathname } from "next/navigation";
import { ShieldCheck, ArrowLeft, BookOpen, ClipboardCheck } from "lucide-react";
import Link from "next/link";

export default function KerangkaAsesmenPage() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      <Navbar currentPath={pathname} onOpenCheatsheet={() => {}} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-6">
          <Link href="/tka" className="hover:text-blue-600 transition-colors">
            Beranda
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-blue-600 font-bold">Kerangka Asesmen TKA</span>
        </div>

        {/* Hero Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-700" />
              <span>Silabus Resmi Pusmendik Kemendikdasmen RI</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Kerangka Asesmen TKA PPLG
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Panduan lengkap kompetensi, muatan 5 modul pembelajaran, tabel level kognitif, dan bank contoh soal resmi standar BSKAP 2025.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/tka/modul"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold shadow-2xs transition-colors min-h-[44px]"
            >
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>5 Modul Belajar</span>
            </Link>
            <Link
              href="/tka/quiz"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors min-h-[44px]"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Mulai Simulasi</span>
            </Link>
          </div>
        </div>

        {/* Interactive Kerangka Asesmen Component */}
        <KerangkaAsesmenView />
      </main>

      <SiteFooter />
    </div>
  );
}
