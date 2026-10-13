import React from "react";
import { BookOpen, Users } from "lucide-react";
import { loadLandingFeatures } from "../../lib/content";
import { useContent } from "../../hooks/useContent";

const icons = {
  "no-login": Users,
  practice: BookOpen,
};

export const LandingFeatures: React.FC = () => {
  const { data: features } = useContent(loadLandingFeatures);
  return (
    <section className="bg-white border-y border-slate-200 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight mb-3">
            Belajar tanpa hambatan
          </h2>
          <p className="text-sm text-slate-500">
            Semua materi, rangkuman, dan simulasi bisa dibuka langsung dari
            browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {(features ?? []).map((feature) => {
            const Icon = icons[feature.id as keyof typeof icons] ?? Users;
            const isHex = /^#|^rgb/.test(feature.tone);
            return (
              <div
                key={feature.id}
                className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 min-h-[160px] flex flex-col"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 flex-shrink-0 ${
                    isHex ? "" : "bg-sky-100 text-sky-700"
                  }`}
                  style={
                    isHex
                      ? {
                          color: feature.tone,
                          backgroundColor:
                            /^#[0-9a-fA-F]{6}$/.test(feature.tone)
                              ? `${feature.tone}1a`
                              : undefined,
                        }
                      : undefined
                  }
                >
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">
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
