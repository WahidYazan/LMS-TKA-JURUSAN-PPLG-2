'use client';

import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { ModuleCard } from '@/components/ModuleCard';
import { ExamBannerCard } from '@/components/ExamBannerCard';
import { modulesList } from '@/data/modules';
import { usePathname } from 'next/navigation';

export default function DashboardPage() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar currentPath={pathname} onOpenCheatsheet={() => {}} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <HeroBanner />

        <section className="mb-10 sm:mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">
                Materi Pembelajaran TKA PPLG
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                Kurikulum Pusmendik Kemendikdasmen • Rekayasa Perangkat Lunak dan Gim
              </p>
            </div>
            <span className="text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 w-fit">
              {modulesList.length} Modul
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {modulesList.map((mod) => (
              <ModuleCard key={mod.id} module={mod} />
            ))}
            <ExamBannerCard />
          </div>
        </section>
      </main>
    </div>
  );
}