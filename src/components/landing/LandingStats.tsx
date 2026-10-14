"use client";

import React, { useMemo } from 'react';
import { loadLandingStats } from '../../lib/content';
import { landingStats as defaultStats } from '../../data/landing/stats';
import { useContent } from '../../hooks/useContent';
import { useSiteStats } from '../../hooks/useSiteStats';

export const LandingStats: React.FC = () => {
  const { data: stats } = useContent(loadLandingStats, defaultStats);
  const { totalModules, totalQuestions } = useSiteStats();
  const base = stats && stats.length > 0 ? stats : defaultStats;

  // Angka modul & soal selalu otomatis — admin boleh ubah label/warna,
  // tapi nilai count-nya dihitung dari data aktual (lokal / Supabase).
  const displayStats = useMemo(
    () =>
      base.map((stat) => {
        const label = stat.label.toLowerCase();
        if (label.includes('soal')) {
          return { ...stat, value: `${totalQuestions}+` };
        }
        if (
          label.includes('modul') ||
          label.includes('elemen') ||
          label.includes('pusmendik')
        ) {
          return { ...stat, value: `${totalModules}` };
        }
        return stat;
      }),
    [base, totalModules, totalQuestions],
  );

  return (
    <section className="relative -mt-8 sm:-mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 p-5 sm:p-7 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
        {displayStats.map((stat, idx) => {
          const isHex = /^#|^rgb/.test(stat.color);
          return (
            <div key={stat.label} className={idx > 0 ? 'pt-4 md:pt-0' : ''}>
              <div
                className={`text-3xl sm:text-4xl font-black mb-1.5 tracking-tight font-mono tabular-nums ${
                  isHex ? '' : stat.color
                }`}
                style={isHex ? { color: stat.color } : undefined}
              >
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-700 tracking-wide uppercase">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                {idx === 0 && 'Materi Kejuruan PPLG'}
                {idx === 1 && 'Studi Kasus & Pembahasan'}
                {idx === 2 && 'Git, SQL, OOP, HTTP'}
                {idx === 3 && 'Langsung di Web Browser'}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
