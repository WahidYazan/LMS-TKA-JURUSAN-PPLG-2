import React, { useEffect, useState } from 'react';

export const LandingFooter: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-white border-t border-slate-200 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 text-center text-xs sm:text-sm text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="font-extrabold text-slate-800">TKA PPLG</span>
          <span aria-hidden="true">•</span>
          <span>SMK Telekomunikasi Tunas Harapan</span>
        </div>
        <p>Kurikulum Asesmen Pusmendik Kemendikdasmen RI © {currentYear}</p>
      </div>
    </footer>
  );
};