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
  const colorMap: Record<number, { bgLight: string; text: string; iconHover: string; icon: React.ReactNode }> = {
    1: {
      bgLight: 'bg-sky-50',
      text: 'text-sky-600',
      iconHover: 'group-hover:bg-sky-600 group-hover:text-white',
      icon: <Briefcase className="w-6 h-6" />
    },
    2: {
      bgLight: 'bg-emerald-50',
      text: 'text-emerald-600',
      iconHover: 'group-hover:bg-emerald-600 group-hover:text-white',
      icon: <HardHat className="w-6 h-6" />
    },
    3: {
      bgLight: 'bg-amber-50',
      text: 'text-amber-600',
      iconHover: 'group-hover:bg-amber-600 group-hover:text-white',
      icon: <Network className="w-6 h-6" />
    },
    4: {
      bgLight: 'bg-rose-50',
      text: 'text-rose-600',
      iconHover: 'group-hover:bg-rose-600 group-hover:text-white',
      icon: <Cpu className="w-6 h-6" />
    },
    5: {
      bgLight: 'bg-purple-50',
      text: 'text-purple-600',
      iconHover: 'group-hover:bg-purple-600 group-hover:text-white',
      icon: <Boxes className="w-6 h-6" />
    }
  };

  const theme = colorMap[module.number] || colorMap[1];
  const numberPadded = module.number.toString().padStart(2, '0');

  return (
    <Link
      href={`/tka/module/${module.id}`}
      className="group relative block bg-white rounded-3xl p-7 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer select-none min-h-[280px] flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 overflow-hidden"
      aria-label={`Buka Modul ${module.number}: ${module.cardTitle || module.title}`}
    >
      <div className={`absolute top-0 right-0 w-24 h-24 ${theme.bgLight} rounded-bl-[100px] transition-colors group-hover:opacity-70`} aria-hidden="true"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className={`h-14 w-14 rounded-2xl ${theme.bgLight} ${theme.iconHover} flex items-center justify-center ${theme.text} transition-colors duration-300 shadow-sm`}>
            {theme.icon}
          </div>
          <span className="text-4xl font-extrabold text-slate-100 group-hover:text-slate-200 transition-colors flex-shrink-0">
            {numberPadded}
          </span>
        </div>

        <h3 className="font-bold text-slate-800 text-xl mb-2 leading-snug group-hover:text-sky-600 transition-colors">
          {module.cardTitle || module.title}
        </h3>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">
          {module.shortDesc}
        </p>
      </div>

      <div className="relative z-10">
        <span className={`inline-flex items-center gap-2 text-sm font-bold ${theme.text}`}>
          <span>Mulai Belajar</span>
          <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
};