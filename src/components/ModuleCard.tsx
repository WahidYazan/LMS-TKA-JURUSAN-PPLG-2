import React from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  HardHat, 
  Network, 
  Cpu, 
  Boxes, 
  ArrowRight 
} from 'lucide-react';
import { ModuleContent } from '../types';

interface ModuleCardProps {
  module: ModuleContent;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const colorMap: Record<number, { bgLight: string; text: string; icon: React.ReactNode }> = {
    1: {
      bgLight: 'bg-blue-50',
      text: 'text-blue-600',
      icon: <Briefcase className="w-6 h-6 text-blue-600" />
    },
    2: {
      bgLight: 'bg-emerald-50',
      text: 'text-emerald-600',
      icon: <HardHat className="w-6 h-6 text-emerald-600" />
    },
    3: {
      bgLight: 'bg-amber-50',
      text: 'text-amber-600',
      icon: <Network className="w-6 h-6 text-amber-600" />
    },
    4: {
      bgLight: 'bg-rose-50',
      text: 'text-rose-600',
      icon: <Cpu className="w-6 h-6 text-rose-600" />
    },
    5: {
      bgLight: 'bg-purple-50',
      text: 'text-purple-600',
      icon: <Boxes className="w-6 h-6 text-purple-600" />
    }
  };

  const theme = colorMap[module.number] || colorMap[1];
  const numberPadded = module.number.toString().padStart(2, '0');

  return (
    <Link
      href={`/module/${module.id}`}
      className="group relative bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer select-none min-h-[280px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={`Buka Modul ${module.number}: ${module.cardTitle || module.title}`}
    >
      <div>
        <div className="flex items-start justify-between mb-4 sm:mb-5">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${theme.bgLight} flex items-center justify-center transition-transform group-hover:scale-105 flex-shrink-0`}>
            {theme.icon}
          </div>

          <span className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-slate-200/80 group-hover:text-slate-300 transition-colors flex-shrink-0">
            {numberPadded}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug">
          {module.cardTitle || module.title}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4 sm:mb-6 flex-1">
          {module.shortDesc}
        </p>
      </div>

      <div className="pt-2">
        <span className={`flex items-center gap-1.5 text-xs sm:text-sm font-bold ${theme.text} group-hover:translate-x-1 transition-all cursor-pointer min-h-[40px] px-2 py-1.5 rounded-lg hover:bg-current/10`}>
          <span>Mulai Belajar</span>
          <ArrowRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
};