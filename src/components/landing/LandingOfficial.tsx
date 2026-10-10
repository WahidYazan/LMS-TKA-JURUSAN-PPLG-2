import React from 'react';
import { ExternalLink, GraduationCap } from 'lucide-react';

const pusmendikUrl =
  'https://pusmendik.kemendikdasmen.go.id/tka/tka/view/mata-pelajaran-pilihan/sma/pengembangan-perangkat-lunak-dan-gim-smk-mak';

export const LandingOfficial: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-5 sm:p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4 min-w-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20 flex-shrink-0">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold mb-2 min-h-[28px]">
              Sumber Referensi Resmi
            </div>
            <h2 className="text-base sm:text-xl font-bold text-slate-900 mb-1">
              Pusmendik Kemendikdasmen - Mata Pelajaran Pilihan SMK/MAK
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Materi pembelajaran dan kisi-kisi asesmen di portal ini disusun berpedoman pada kurikulum resmi:
              <span className="font-mono text-[10px] sm:text-xs text-blue-900 block mt-2 break-all bg-white/70 p-2 rounded-lg border border-blue-200">
                {pusmendikUrl}
              </span>
            </p>
          </div>
        </div>

        <a
          href={pusmendikUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-blue-700 font-bold text-xs sm:text-sm border border-blue-200 shadow-sm shrink-0 transition-all min-h-[48px] min-w-[180px] justify-center"
        >
          <span>Kunjungi Laman Resmi</span>
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};