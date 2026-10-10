import React from 'react';
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
  onSelect: (module: ModuleContent) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onSelect }) => {
  // Color configuration matching the exact original screenshot cards:
  // 01: Blue, 02: Green, 03: Orange, 04: Red, 05: Purple
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
    <div
      onClick={() => onSelect(module)}
      className="group relative bg-white rounded-2xl border border-slate-100 p-5 sm:p-7 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer select-none"
    >
      <div>
        {/* Top row: Icon container and Watermark Number matching screenshot */}
        <div className="flex items-start justify-between mb-4 sm:mb-5">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${theme.bgLight} flex items-center justify-center transition-transform group-hover:scale-105`}>
            {theme.icon}
          </div>

          <span className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-slate-200/80 group-hover:text-slate-300 transition-colors">
            {numberPadded}
          </span>
        </div>

        {/* Title & Short Description matching screenshot */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug">
          {module.cardTitle || module.title}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4 sm:mb-6">
          {module.shortDesc}
        </p>
      </div>

      {/* Action link matching screenshot: "Mulai Belajar ->" */}
      <div className="pt-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(module);
          }}
          className={`flex items-center gap-1.5 text-xs font-bold ${theme.text} group-hover:translate-x-1 transition-all cursor-pointer`}
        >
          <span>Mulai Belajar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
