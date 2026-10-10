import React from 'react';
import { landingStats } from '../../data/landing';

export const LandingStats: React.FC = () => {
  return (
    <section className="relative -mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-200/80 p-5 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 text-center">
        {landingStats.map((stat) => (
          <div key={stat.label}>
            <div className={`text-2xl sm:text-4xl font-black ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
