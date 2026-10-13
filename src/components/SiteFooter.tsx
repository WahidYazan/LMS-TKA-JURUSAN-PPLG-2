import React from 'react';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

const links = [
  { href: '/tka', label: 'Beranda' },
  { href: '/tka/modul', label: 'Modul Belajar' },
];

export const SiteFooter: React.FC = () => {
  const year = process.env.NEXT_PUBLIC_SITE_YEAR;

  return (
    <footer className="relative overflow-hidden mt-10 sm:mt-14 bg-gradient-to-r from-blue-950 via-blue-900/90 to-blue-950 text-white">
      <div
        className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 rounded-full bg-blue-400 opacity-10 blur-3xl"
        aria-hidden="true"
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start gap-4">
            <span className="h-12 w-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 text-sky-200" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-base font-extrabold tracking-tight">
                Simulasi TKA PPLG
              </p>
              <p className="text-sm text-blue-200/90 mt-1 leading-relaxed">
                SMK Telekomunikasi Tunas Harapan
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200/80 mb-3">
              Navigasi
            </p>
            <ul className="space-y-2">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm font-semibold text-blue-100/90 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200/80 mb-3">
              Tentang Konten
            </p>
            <p className="text-sm text-blue-100/90 leading-relaxed">
              Soal dan rangkuman disusun mengikuti kisi-kisi TKA untuk kompetensi
              keahlian Pengembangan Perangkat Lunak dan Gim.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-blue-200/80">
          <p>&copy; {year} SMK Telekomunikasi Tunas Harapan. Semua hak dilindungi.</p>
          <p>Platform latihan — bukan dokumen resmi negara.</p>
        </div>
      </div>
    </footer>
  );
};
