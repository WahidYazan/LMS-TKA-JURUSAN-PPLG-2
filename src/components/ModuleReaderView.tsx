import React from 'react';
import { ArrowBigLeft, ArrowBigRight, ArrowDown, ArrowRight, Home, HomeIcon } from 'lucide-react';
import { ModuleContent } from '../types';

interface ModuleReaderViewProps {
  module: ModuleContent;
  onBack: () => void;
  onNextModule: () => void;
  hasNextModule: boolean;
}

export const ModuleReaderView: React.FC<ModuleReaderViewProps> = ({
  module,
  onBack,
  onNextModule,
  hasNextModule,
}) => {
  return (
    <div className="flex-1 bg-[#f8fafc] text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-10 shadow-xs">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            {module.moduleBadge}
          </span>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            {module.title}
          </h1>

          <p className="text-xs sm:text-base text-slate-500 leading-relaxed mb-6 max-w-3xl">
            {module.shortDesc}
          </p>

          <div className="rounded-2xl overflow-hidden mb-8 sm:mb-10 border border-slate-200 shadow-xs">
            <img
              src={module.heroImage}
              alt={module.title}
              className="w-full h-48 sm:h-64 lg:h-96 object-cover"
            />
          </div>

          <div className="space-y-10 text-slate-700">
            {module.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 sm:scroll-mt-28"
              >
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 pb-2 border-b border-slate-100 mb-4">
                  {section.numberPrefix} {section.title}
                </h2>

                {section.paragraphs?.map((p, pIdx) => (
                  <p key={pIdx} className="text-xs sm:text-sm leading-relaxed mb-3 text-slate-700">
                    {p}
                  </p>
                ))}

                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="space-y-2.5 my-4">
                    {section.bulletPoints.map((bp, bIdx) => (
                      <li key={bIdx} className="text-xs sm:text-sm leading-relaxed flex items-start gap-2">
                        <span className="text-slate-400 font-bold select-none">•</span>
                        <div>
                          <strong className="text-slate-900 font-bold">{bp.label}: </strong>
                          <span className="text-slate-700">{bp.description}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 pt-6 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              onClick={onBack}
              className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer py-2"
            >
              <ArrowBigLeft className="w-4 h-4 text-slate-400" />
              <span>Ke Halaman Modul</span>
            </button>

            {hasNextModule && (
              <button
                onClick={onNextModule}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>Lanjut ke Modul {module.number + 1}</span>
                <ArrowBigRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
