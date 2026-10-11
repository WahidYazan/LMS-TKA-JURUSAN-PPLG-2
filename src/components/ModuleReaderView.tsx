import React from 'react';
import Link from 'next/link';
import { ArrowBigLeft, ArrowBigRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { ModuleContent } from '../types';

interface ModuleReaderViewProps {
  module: ModuleContent;
  hasNextModule: boolean;
  nextModuleId?: string | null;
  hasPrevModule: boolean;
  prevModuleId?: string | null;
}

export const ModuleReaderView: React.FC<ModuleReaderViewProps> = ({
  module,
  hasNextModule,
  nextModuleId,
  hasPrevModule,
  prevModuleId,
}) => {
  return (
    <div className="flex-1 bg-[#f8fafc] text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 pb-20 lg:pb-0">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 lg:p-8 shadow-xs">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            {module.moduleBadge}
          </span>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            {module.title}
          </h1>

          <p className="text-xs sm:text-base text-slate-500 leading-relaxed mb-6 max-w-3xl">
            {module.shortDesc}
          </p>

          <div className="rounded-2xl overflow-hidden mb-6 sm:mb-8 border border-slate-200 shadow-xs">
            <img
              src={module.heroImage}
              alt={module.title}
              className="w-full h-40 sm:h-48 lg:h-64 xl:h-80 object-cover"
            />
          </div>

          <div className="space-y-8 text-slate-700">
            {module.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 sm:scroll-mt-28"
              >
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 pb-2 border-b border-slate-100 mb-4">
                  {section.numberPrefix} {section.title}
                </h2>

                {section.paragraphs?.map((p, pIdx) => (
                  <p key={pIdx} className="text-xs sm:text-sm leading-relaxed mb-3 text-slate-700">
                    {p}
                  </p>
                ))}

                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="space-y-2 my-4">
                    {section.bulletPoints.map((bp, bIdx) => (
                      <li key={bIdx} className="text-xs sm:text-sm leading-relaxed flex items-start gap-2">
                        <span className="text-slate-400 font-bold select-none flex-shrink-0 mt-0.5">•</span>
                        <div>
                          <strong className="text-slate-900 font-bold">{bp.label}: </strong>
                          <span className="text-slate-700">{bp.description}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {section.codeSnippet && (
                  <div className="relative mt-4">
                    <pre className="bg-slate-900 rounded-xl p-4 overflow-x-auto text-xs sm:text-sm text-slate-100">
                      <code className={`language-${section.codeSnippet.language}`}>
                        {section.codeSnippet.code}
                      </code>
                    </pre>
                    {section.codeSnippet.explanation && (
                      <p className="text-xs text-slate-500 mt-2 italic">
                        {section.codeSnippet.explanation}
                      </p>
                    )}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Navigation Buttons - Desktop only (hidden on mobile, sticky bottom nav used instead) */}
          <div className="hidden lg:flex lg:items-center lg:justify-between gap-3 mt-8 pt-6 border-t border-slate-200">
            <Link
              href="/modul"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer min-h-[48px] border border-slate-200"
            >
              <ArrowBigLeft className="w-4 h-4 text-slate-400" aria-hidden="true" />
              <span>Ke Halaman Modul</span>
            </Link>

            <div className="flex gap-3">
              {hasPrevModule && prevModuleId && (
                <Link
                  href={`/module/${prevModuleId}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer min-h-[48px]"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Modul {module.number - 1}</span>
                </Link>
              )}

              {hasNextModule && nextModuleId && (
                <Link
                  href={`/module/${nextModuleId}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer min-h-[48px]"
                >
                  <span>Lanjut ke Modul {module.number + 1}</span>
                  <ArrowBigRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              )}

              {!hasNextModule && (
                <Link
                  href="/quiz"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer min-h-[48px]"
                >
                  <span>Mulai Simulasi Ujian</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-40 animate-slide-up">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/modul"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer min-h-[44px] border border-slate-200"
            >
              <ArrowBigLeft className="w-4 h-4 text-slate-400" aria-hidden="true" />
              <span className="hidden">Menu</span>
            </Link>

            <div className="flex gap-2 flex-1">
              {hasPrevModule && prevModuleId && (
                <Link
                  href={`/module/${prevModuleId}`}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-sm transition-all cursor-pointer min-h-[44px]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Prev</span>
                </Link>
              )}

              {hasNextModule && nextModuleId && (
                <Link
                  href={`/module/${nextModuleId}`}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer min-h-[44px]"
                >
                  <span>Next</span>
                  <ArrowBigRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              )}

              {!hasNextModule && (
                <Link
                  href="/quiz"
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs shadow-md transition-all cursor-pointer min-h-[44px]"
                >
                  <span>Ujian</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};