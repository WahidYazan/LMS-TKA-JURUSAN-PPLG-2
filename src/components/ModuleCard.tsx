"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  HardHat, 
  Database, 
  Code2, 
  Gamepad2, 
  ArrowRight,
  ChevronDown,
  BookOpen,
} from 'lucide-react';
import { ModuleContent } from '../types';

interface ModuleCardProps {
  module: ModuleContent;
}

const moduleThemes: Record<number, {
  bgLight: string;
  badgeBg: string;
  badgeText: string;
  accentBorder: string;
  icon: React.ElementType;
  topics: string[];
}> = {
  1: {
    bgLight: 'bg-sky-50',
    badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
    badgeText: 'text-sky-600',
    accentBorder: 'hover:border-sky-400',
    icon: Briefcase,
    topics: ['Industri 4.0', 'Profesi RPL & Gim', 'Budaya 5S']
  },
  2: {
    bgLight: 'bg-emerald-50',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    badgeText: 'text-emerald-600',
    accentBorder: 'hover:border-emerald-400',
    icon: HardHat,
    topics: ['K3LH Lab Komputer', 'Ergonomi Developer', 'SOP Keselamatan']
  },
  3: {
    bgLight: 'bg-amber-50',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    badgeText: 'text-amber-600',
    accentBorder: 'hover:border-amber-400',
    icon: Database,
    topics: ['Git Version Control', 'Normalisasi ERD', 'Kueri SQL']
  },
  4: {
    bgLight: 'bg-rose-50',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    badgeText: 'text-rose-600',
    accentBorder: 'hover:border-rose-400',
    icon: Code2,
    topics: ['Enkapsulasi & Objek', 'Pewarisan Kelas', 'Polimorfisme']
  },
  5: {
    bgLight: 'bg-purple-50',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    badgeText: 'text-purple-600',
    accentBorder: 'hover:border-purple-400',
    icon: Gamepad2,
    topics: ['Game Loop & Update', 'Mekanika & Rule', 'Asset Pipeline']
  }
};

export const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const [showChapters, setShowChapters] = useState(false);
  const theme = moduleThemes[module.number] || moduleThemes[1];
  const Icon = theme.icon;
  const numberPadded = module.number.toString().padStart(2, '0');
  const chaptersCount = module.tableOfContents?.length || module.sections?.length || 5;

  return (
    <div
      className={`group relative bg-white rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl hover:-translate-y-1 border border-slate-200/90 ${theme.accentBorder} transition-all duration-300 flex flex-col justify-between overflow-hidden`}
    >
      {/* Decorative top-right corner background */}
      <div className={`absolute top-0 right-0 w-36 h-36 ${theme.bgLight} rounded-bl-[140px] transition-opacity opacity-60 group-hover:opacity-100`} aria-hidden="true" />

      <div className="relative z-10">
        {/* Card header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`h-12 w-12 rounded-2xl ${theme.badgeBg} border flex items-center justify-center transition-all duration-200 shadow-2xs group-hover:scale-105`}>
            <Icon className="w-6 h-6" aria-hidden="true" />
          </div>
          <span className="font-mono text-2xl font-black text-slate-200 group-hover:text-slate-300 transition-colors">
            #{numberPadded}
          </span>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1.5">
          <span className={`font-bold ${theme.badgeText}`}>MODUL 0{module.number}</span>
          <span aria-hidden="true">·</span>
          <span>{chaptersCount} Bab Pembahasan</span>
        </div>

        {/* Title */}
        <Link href={`/tka/module/${module.id}`} className="block">
          <h3 className="font-bold text-slate-900 text-lg sm:text-xl mb-2 leading-snug group-hover:text-blue-600 transition-colors">
            {module.cardTitle || module.title}
          </h3>
        </Link>

        {/* Short description */}
        <p className="text-slate-500 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
          {module.shortDesc}
        </p>

        {/* Topic tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {theme.topics.map((topic) => (
            <span
              key={topic}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100"
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Quick peek chapters accordion button */}
        <button
          onClick={() => setShowChapters(!showChapters)}
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 hover:text-slate-800 py-1.5 border-t border-slate-100 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>{showChapters ? "Sembunyikan Daftar Bab" : `Lihat ${chaptersCount} Bab Materi`}</span>
          </span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showChapters ? "rotate-180" : ""}`} />
        </button>

        {/* Expandable chapter peek */}
        {showChapters && module.tableOfContents && (
          <div className="mt-2 space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] animate-slide-down">
            {module.tableOfContents.map((ch, idx) => (
              <div key={ch.id} className="text-slate-600 truncate flex items-center gap-1.5">
                <span className="font-mono text-slate-400 font-bold">{idx + 1}.</span>
                <span className="truncate">{ch.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between mt-5">
        <Link
          href={`/tka/module/${module.id}`}
          className={`inline-flex items-center gap-1.5 text-xs font-bold ${theme.badgeText} group-hover:underline cursor-pointer`}
        >
          <span>Mulai Belajar</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </Link>
        {/* <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
          Standar Pusmendik
        </span> */}
      </div>
    </div>
  );
};