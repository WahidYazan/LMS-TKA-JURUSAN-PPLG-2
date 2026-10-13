"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Code2,
  Gamepad2,
  HardHat,
  Laptop,
  Database,
  Briefcase,
} from "lucide-react";
import { loadModules } from "../../lib/content";
import { modulesList } from "../../data/modules";
import { useContent } from "../../hooks/useContent";

const moduleThemeMap: Record<
  number,
  {
    icon: React.ElementType;
    badgeBg: string;
    badgeText: string;
    topics: string[];
    category: string;
  }
> = {
  1: {
    icon: Briefcase,
    badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
    badgeText: "text-sky-600",
    topics: ["Revolusi Industri 4.0", "Profesi RPL & Gim", "Budaya Kerja 5S"],
    category: "wawasan",
  },
  2: {
    icon: HardHat,
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    badgeText: "text-emerald-600",
    topics: ["K3LH di Lab Komputer", "Ergonomi Developer", "SOP & Pencegahan Bahaya"],
    category: "k3",
  },
  3: {
    icon: Database,
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
    badgeText: "text-amber-600",
    topics: ["DDL & DML Query", "Normalisasi 1NF-3NF", "Client-Server Architecture"],
    category: "database",
  },
  4: {
    icon: Code2,
    badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
    badgeText: "text-rose-600",
    topics: ["Enkapsulasi & Pewarisan", "Polimorfisme OOP", "Desain Kelas & Objek"],
    category: "oop",
  },
  5: {
    icon: Gamepad2,
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
    badgeText: "text-purple-600",
    topics: ["Game Loop & Update", "Desain Mekanik & Rules", "2D/3D Asset Pipeline"],
    category: "gim",
  },
};

export const LandingCurriculum: React.FC = () => {
  const { data: modules } = useContent(loadModules, modulesList);
  const displayModules = modules && modules.length > 0 ? modules : modulesList;
  const [filter, setFilter] = useState<string>("all");

  const filteredModules = displayModules.filter((mod) => {
    if (filter === "all") return true;
    const theme = moduleThemeMap[mod.number];
    return theme?.category === filter;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
        <div>
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1.5">
            Kurikulum Kejuruan SMK TTH
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            5 Modul Pembelajaran Terstruktur
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mt-1.5 leading-relaxed">
            Disusun bertahap dari wawasan industri dan K3LH hingga pemrograman basis data, OOP, dan dasar pengembangan gim.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto shrink-0">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === "all"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Semua ({displayModules.length})
          </button>
          <button
            onClick={() => setFilter("wawasan")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === "wawasan"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Wawasan Industri
          </button>
          <button
            onClick={() => setFilter("k3")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === "k3"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            K3LH
          </button>
          <button
            onClick={() => setFilter("database")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === "database"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Basis Data
          </button>
          <button
            onClick={() => setFilter("oop")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === "oop"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            OOP
          </button>
          <button
            onClick={() => setFilter("gim")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === "gim"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Gim
          </button>
        </div>
      </div>

      {/* Grid of Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((mod) => {
          const theme = moduleThemeMap[mod.number] || moduleThemeMap[1];
          const Icon = theme.icon;
          const chaptersCount =
            mod.tableOfContents?.length || mod.sections?.length || 5;

          return (
            <Link
              key={mod.id}
              href={`/tka/module/${mod.id}`}
              className="group bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`Buka Modul ${mod.number}: ${mod.cardTitle || mod.title}`}
            >
              <div>
                {/* Header card */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${theme.badgeBg} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs font-extrabold text-slate-400 group-hover:text-blue-600 transition-colors">
                    MODUL {String(mod.number).padStart(2, "0")}
                  </span>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-2">
                  <span>{chaptersCount} Bab Materi</span>
                  <span aria-hidden="true">·</span>
                  <span>Standar Pusmendik</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug">
                  {mod.cardTitle || mod.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3 mb-4">
                  {mod.shortDesc}
                </p>

                {/* Topic tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {theme.topics.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 group-hover:text-blue-700 flex items-center gap-1.5">
                  <span>Pelajari Modul</span>
                  <ArrowRight
                    className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </span>
                <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                  Gratis
                </span>
              </div>
            </Link>
          );
        })}

        {/* Highlight Card: Simulasi Ujian TKA Lengkap */}
        {filter === "all" && (
          <Link
            href="/tka/quiz"
            className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-6 shadow-xl border border-blue-900/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            aria-label="Buka Simulasi Ujian TKA Lengkap"
          >
            {/* Background Image Mask */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <Image
                src="/images/showcase/tka_assessment.jpg"
                alt=""
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md shadow-amber-400/20 group-hover:scale-105 transition-transform">
                  <Laptop className="w-6 h-6" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">
                  SIMULASI RESMI
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-sky-200/80 font-medium mb-2">
                <span>50 Soal HOTS</span>
                <span aria-hidden="true">·</span>
                <span>Evaluasi Real-Time</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                Simulasi Ujian TKA Lengkap
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed mb-4">
                Uji kemampuan komprehensif Anda dari Modul 1 sampai Modul 5 dengan studi kasus industri nyata dan evaluasi skor instan.
              </p>

              {/* Micro specs */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/10 text-sky-200">
                  Timer & Navigasi Cepat
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/10 text-sky-200">
                  Pembahasan Setiap Opsi
                </span>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/10">
              <span className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold transition-all flex items-center justify-center gap-2 shadow-sm">
                <span>Mulai Latihan Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
};