"use client";

import React, { useMemo } from "react";
import { loadLandingStats } from "@/lib/content";
import { landingStats as defaultStats } from "@/data/landing/stats";
import { useContent } from "@/hooks/useContent";
import { useSiteStats } from "@/hooks/useSiteStats";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export const LandingStats: React.FC = () => {
  const { data: stats } = useContent(loadLandingStats, defaultStats);
  const { totalModules, totalQuestions } = useSiteStats();
  const { landingStatsWidth } = useSiteSettings();
  const base = stats && stats.length > 0 ? stats : defaultStats;

  const displayStats = useMemo(
    () =>
      base.map((stat) => {
        const label = stat.label.toLowerCase();
        if (label.includes("soal")) {
          return { ...stat, value: `${totalQuestions}+` };
        }
        if (
          label.includes("modul") ||
          label.includes("elemen") ||
          label.includes("pusmendik")
        ) {
          return { ...stat, value: `${totalModules}` };
        }
        return stat;
      }),
    [base, totalModules, totalQuestions],
  );

  const itemCount = displayStats.length;

  // Ukuran lebar yang jauh lebih lega dan proporsional
  const getAdaptiveMaxWidth = (count: number): string => {
    if (landingStatsWidth === "full") return "1152px"; // max-w-6xl - full tapi tetap ada margin kanan kiri
    if (count <= 1) return "360px";
    if (count === 2) return "680px";
    if (count === 3) return "960px";
    return "1152px"; // 4 item ke atas (setara max-w-6xl)
  };

  const adaptiveMaxWidth = getAdaptiveMaxWidth(itemCount);

  const containerStyle: React.CSSProperties = {
    maxWidth: adaptiveMaxWidth,
  };

  const gridStyle: React.CSSProperties =
    landingStatsWidth === "full"
      ? {
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
          gap: "1.5rem",
          justifyContent: "center",
        }
      : {
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          gap: "1.5rem",
          justifyContent: "center",
          overflowX: "auto",
        };

  return (
    <section
      className="relative -mt-10 sm:-mt-12 mx-auto px-4 sm:px-6 lg:px-8 z-20 w-full"
      style={containerStyle}
    >
      <div
        className="bg-white rounded-3xl shadow-xl shadow-slate-900/10 border border-slate-200/90 p-6 sm:p-8 lg:p-10 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100"
        style={gridStyle}
      >
        {displayStats.map((stat) => {
          const isHex = /^#|^rgb/.test(stat.color);
          return (
            <div
              key={stat.label}
              className="flex-1 py-4 sm:py-2 px-4 sm:px-6 flex flex-col items-center justify-center min-w-[150px]"
            >
              <div
                className={`text-4xl sm:text-5xl font-black mb-2 tracking-tight font-mono tabular-nums ${
                  isHex ? "" : stat.color
                }`}
                style={isHex ? { color: stat.color } : undefined}
              >
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-800 tracking-wide uppercase w-full">
                {stat.label}
              </div>
              {stat.subtitle && (
                <div className="text-xs text-slate-400 font-medium mt-1 w-full">
                  {stat.subtitle}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
