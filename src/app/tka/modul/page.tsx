'use client';

import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { ModuleCard } from '@/components/ModuleCard';
import { ExamBannerCard } from '@/components/ExamBannerCard';
import { SiteFooter } from '@/components/SiteFooter';
import { loadModules } from '@/lib/content';
import { useContent } from '@/hooks/useContent';
import { usePathname } from 'next/navigation';

export default function DashboardPage() {
  const pathname = usePathname();
  const { data: modules, loading } = useContent(loadModules);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar currentPath={pathname} onOpenCheatsheet={() => {}} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <HeroBanner />

        <section className="mb-10 sm:mb-14">
          <div className="flex items-center justify-between mb-8 gap-3">
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              Materi Pembelajaran
            </h2>
            <span className="text-sm font-semibold text-slate-500 bg-slate-100 py-1 px-3 rounded-full">
              {modules?.length ?? '...'} Modul
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? [1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="rounded-3xl border border-slate-100 bg-white p-7 min-h-[280px] animate-pulse"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 mb-6" />
                    <div className="h-4 w-20 bg-slate-100 rounded mb-3" />
                    <div className="h-5 w-full bg-slate-100 rounded mb-2" />
                    <div className="h-3 w-3/4 bg-slate-100 rounded" />
                  </div>
                ))
              : modules?.map((mod) => (
                  <ModuleCard key={mod.id} module={mod} />
                ))}
            <ExamBannerCard />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}