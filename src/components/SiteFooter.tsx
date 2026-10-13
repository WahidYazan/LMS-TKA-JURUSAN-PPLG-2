import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const links = [
  { href: '/tka', label: 'Beranda Utama' },
  { href: '/tka/modul', label: 'Modul Pembelajaran' },
  { href: '/tka/quiz', label: 'Simulasi Ujian (50 Soal)' },
  { href: '/tka/admin', label: 'Portal Admin' },
];

export const SiteFooter: React.FC = () => {
  const year = process.env.NEXT_PUBLIC_SITE_YEAR || new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#070b14] text-white border-t border-slate-800">
      {/* Subtle ambient light */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Col 1: Brand & School */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
                <Image
                  src="/images/brands/TTH-nobg.webp"
                  alt="SMK Telekomunikasi Tunas Harapan"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain drop-shadow-sm"
                  priority
                />
              </div>
              <div>
                <p className="text-base font-black tracking-tight text-white">
                  Simulasi TKA PPLG
                </p>
                <p className="text-xs text-sky-300 font-semibold">
                  SMK Telekomunikasi Tunas Harapan
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed mb-4">
              Portal edukasi resmi kejuruan Rekayasa Perangkat Lunak dan Gim. Mempersiapkan siswa menghadapi Asesmen Kemampuan Akademik Kejuruan dengan kurikulum terstruktur dan studi kasus berstandar industri.
            </p>

            <div className="text-[11px] text-slate-500">
              Jl. Raya Semarang - Surakarta, Jawa Tengah · Indonesia
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Navigasi Cepat
            </p>
            <ul className="space-y-2.5">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Kurikulum */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Standar & Akreditasi
            </p>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Berpedoman pada Capaian Pembelajaran Fase F Pusmendik Kemendikdasmen untuk Mata Pelajaran Pilihan SMK/MAK Konsentrasi Keahlian PPLG.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-sky-300 font-mono">
              Kurikulum Merdeka 2026
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>&copy; {year} SMK Telekomunikasi Tunas Harapan. Semua hak cipta dilindungi.</p>
          <p className="text-[11px] text-slate-500">
            Platform Belajar & Asesmen Mandiri Siswa
          </p>
        </div>
      </div>
    </footer>
  );
};
