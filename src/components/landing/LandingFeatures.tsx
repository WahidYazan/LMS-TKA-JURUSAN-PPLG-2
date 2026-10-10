import React from "react";
import { BookOpen, Users } from "lucide-react";
import { landingFeatures } from "../../data/landing";

const icons = {
  "no-login": Users,
  practice: BookOpen,
};

export const LandingFeatures: React.FC = () => {
  return (
    <section className="bg-white border-y border-slate-200 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 mb-3">
            Belajar tanpa hambatan
          </h2>
          <p className="text-sm text-slate-600">
            Semua materi, rangkuman, dan simulasi bisa dibuka langsung dari
            browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {landingFeatures.map((feature) => {
            const Icon = icons[feature.id as keyof typeof icons] ?? Users;
            return (
              <div
                key={feature.id}
                className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 min-h-[160px] flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 flex-shrink-0">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-1">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
