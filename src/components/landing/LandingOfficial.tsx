import React from 'react';
import { ExternalLink, GraduationCap, ShieldCheck } from 'lucide-react';

const pusmendikUrl =
  'https://pusmendik.kemendikdasmen.go.id/tka/tka/view/mata-pelajaran-pilihan/sma/pengembangan-perangkat-lunak-dan-gim-smk-mak';

export const LandingOfficial: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="bg-gradient-to-r from-sky-50 via-blue-50/60 to-indigo-50/50 border border-sky-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-start gap-4 sm:gap-5 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-600/20">
            <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-700" aria-hidden="true" />
                Rujukan Kurikulum Resmi
              </span>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                Pusmendik Kemendikdasmen RI
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2 leading-snug">
              Asesmen Mata Pelajaran Pilihan SMK/MAK (PPLG)
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Materi pembelajaran, kisi-kisi modul, dan bank simulasi soal di portal ini dikurasi langsung berpedoman pada silabus resmi Pusat Asesmen Pendidikan Kemendikdasmen untuk kompetensi Pengembangan Perangkat Lunak dan Gim.
            </p>
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <a
            href={pusmendikUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-sky-700 font-bold text-sm border border-sky-300 shadow-sm transition-all min-h-[48px]"
          >
            <span>Verifikasi Silabus Resmi</span>
            <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};