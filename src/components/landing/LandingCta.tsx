import React from 'react';

interface LandingCtaProps {
  onEnterLMS: () => void;
}

export const LandingCta: React.FC<LandingCtaProps> = ({ onEnterLMS }) => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-7 sm:p-12 text-white text-center shadow-xl shadow-blue-800/20">
        <h2 className="text-2xl sm:text-4xl font-black mb-4">Siap Menghadapi Asesmen TKA PPLG?</h2>
        <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto mb-8">
          Pelajari modul terstruktur dan buktikan kemampuanmu di simulator soal HOTS berstandar Pusmendik.
        </p>
        <button
          onClick={onEnterLMS}
          className="px-8 py-3.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          Masuk ke LMS Sekarang
        </button>
      </div>
    </section>
  );
};
