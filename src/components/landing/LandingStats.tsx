import React from 'react';
import { loadLandingStats } from '../../lib/content';
import { useContent } from '../../hooks/useContent';

export const LandingStats: React.FC = () => {
  const { data: stats } = useContent(loadLandingStats);

  return (
    <section className="relative -mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-200/80 p-5 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 text-center">
        {(stats ?? []).map((stat) => {
          const isHex = /^#|^rgb/.test(stat.color);
          return (
            <div key={stat.label}>
              <div
                className={`text-2xl sm:text-4xl font-black mb-1 ${
                  isHex ? '' : stat.color
                }`}
                style={isHex ? { color: stat.color } : undefined}
              >
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
