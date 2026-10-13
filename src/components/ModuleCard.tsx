import React from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  HardHat, 
  Database, 
  Code2, 
  Gamepad2, 
  ArrowRight
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
    accentBorder: 'hover:border-sky-300',
    icon: Briefcase,
    topics: ['Industri 4.0', 'Profesi RPL', 'Budaya Kerja 5S']
  },
  2: {
    bgLight: 'bg-emerald-50',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    badgeText: 'text-emerald-600',
    accentBorder: 'hover:border-emerald-300',
    icon: HardHat,
    topics: ['K3LH Lab Komputer', 'Ergonomi Kerja', 'SOP Keamanan']
  },
  3: {
    bgLight: 'bg-amber-50',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    badgeText: 'text-amber-600',
    accentBorder: 'hover:border-amber-300',
    icon: Database,
    topics: ['Query SQL Relasional', 'Normalisasi 1NF-3NF', 'Client-Server']
  },
  4: {
    bgLight: 'bg-rose-50',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    badgeText: 'text-rose-600',
    accentBorder: 'hover:border-rose-300',
    icon: Code2,
    topics: ['Enkapsulasi & Inheritance', 'Polymorphism', 'Desain Objek']
  },
  5: {
    bgLight: 'bg-purple-50',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    badgeText: 'text-purple-600',
    accentBorder: 'hover:border-purple-300',
    icon: Gamepad2,
    topics: ['Game Loop & Update', 'Mekanik & Rules', 'Asset Pipeline']
  }
};

export const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const theme = moduleThemes[module.number] || moduleThemes[1];
  const Icon = theme.icon;
  const numberPadded = module.number.toString().padStart(2, '0');
  const chaptersCount = module.tableOfContents?.length || module.sections?.length || 5;

  return (
    <Link
      href={`/tka/module/${module.id}`}
      className={`group relative bg-white rounded-2xl p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 border border-slate-200/90 ${theme.accentBorder} transition-all duration-200 cursor-pointer select-none min-h-[310px] flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 overflow-hidden`}
      aria-label={`Buka Modul ${module.number}: ${module.cardTitle || module.title}`}
    >
      {/* Decorative top-right corner background */}
      <div className={`absolute top-0 right-0 w-32 h-32 ${theme.bgLight} rounded-bl-[120px] transition-opacity opacity-60 group-hover:opacity-100`} aria-hidden="true" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`h-12 w-12 rounded-xl ${theme.badgeBg} border flex items-center justify-center transition-all duration-200 shadow-2xs group-hover:scale-105`}>
            <Icon className="w-6 h-6" aria-hidden="true" />
          </div>
          <span className="font-mono text-2xl font-black text-slate-200 group-hover:text-slate-300 transition-colors">
            #{numberPadded}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1.5">
          <span className={`font-bold ${theme.badgeText}`}>MODUL {module.number}</span>
          <span aria-hidden="true">·</span>
          <span>{chaptersCount} Bab Pembelajaran</span>
        </div>

        <h3 className="font-bold text-slate-900 text-lg mb-2 leading-snug group-hover:text-blue-600 transition-colors">
          {module.cardTitle || module.title}
        </h3>

        <p className="text-slate-500 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
          {module.shortDesc}
        </p>

        {/* Topic tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {theme.topics.map((topic) => (
            <span
              key={topic}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
        <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${theme.badgeText} group-hover:underline`}>
          <span>Pelajari Modul</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </span>
        <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
          Standar Pusmendik
        </span>
      </div>
    </Link>
  );
};