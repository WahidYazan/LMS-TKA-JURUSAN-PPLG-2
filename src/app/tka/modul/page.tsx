'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { ModuleCard } from '@/components/ModuleCard';
import { ExamBannerCard } from '@/components/ExamBannerCard';
import { SiteFooter } from '@/components/SiteFooter';
import { loadModules } from '@/lib/content';
import { modulesList } from '@/data/modules';
import { useContent } from '@/hooks/useContent';
import { usePathname } from 'next/navigation';
import { Search, X, BookOpen } from 'lucide-react';

export default function DashboardPage() {
  const pathname = usePathname();
  const { data: modules } = useContent(loadModules, modulesList);
  const displayModules = modules && modules.length > 0 ? modules : modulesList;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'wawasan' | 'k3' | 'db' | 'oop' | 'gim'>('all');

  const filteredModules = useMemo(() => {
    return displayModules.filter((mod) => {
      // Category filter
      if (selectedCategory === 'wawasan' && mod.number !== 1) return false;
      if (selectedCategory === 'k3' && mod.number !== 2) return false;
      if (selectedCategory === 'db' && mod.number !== 3) return false;
      if (selectedCategory === 'oop' && mod.number !== 4) return false;
      if (selectedCategory === 'gim' && mod.number !== 5) return false;

      // Search filter
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      const titleMatch = (mod.cardTitle || mod.title || '').toLowerCase().includes(query);
      const descMatch = (mod.shortDesc || '').toLowerCase().includes(query);
      const sectionMatch = mod.sections?.some((s) => s.title.toLowerCase().includes(query));
      return titleMatch || descMatch || sectionMatch;
    });
  }, [displayModules, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      <Navbar currentPath={pathname} onOpenCheatsheet={() => {}} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <HeroBanner />

        <section className="mb-10 sm:mb-14">
          {/* Controls: Search and Categories */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Materi Pembelajaran
              </h2>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 py-1 px-3 rounded-full">
                {filteredModules.length} Modul Ditampilkan
              </span>
            </div>

            {/* Search Input and Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Cari topik atau materi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-2xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 rounded-xl">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setSelectedCategory('wawasan')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === 'wawasan'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Wawasan
                </button>
                <button
                  onClick={() => setSelectedCategory('k3')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === 'k3'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  K3LH
                </button>
                <button
                  onClick={() => setSelectedCategory('db')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === 'db'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Basis Data
                </button>
                <button
                  onClick={() => setSelectedCategory('oop')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === 'oop'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  OOP
                </button>
                <button
                  onClick={() => setSelectedCategory('gim')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === 'gim'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Gim
                </button>
              </div>
            </div>
          </div>

          {/* Module Grid */}
          {filteredModules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map((mod) => (
                <ModuleCard key={mod.id} module={mod} />
              ))}
              {selectedCategory === 'all' && !searchQuery && <ExamBannerCard />}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Materi Tidak Ditemukan
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Tidak ada modul yang cocok dengan pencarian &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs hover:bg-blue-100 transition-colors cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}