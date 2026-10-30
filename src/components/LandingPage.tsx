"use client";

import React from "react";
import { LandingHero } from "./landing/LandingHero";
import { LandingStats } from "./landing/LandingStats";
import { LandingCurriculum } from "./landing/LandingCurriculum";
import { LandingFeatures } from "./landing/LandingFeatures";
import { LandingOfficial } from "./landing/LandingOfficial";
import { LandingCta } from "./landing/LandingCta";
import { SiteFooter } from "./SiteFooter";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface LandingPageProps {
  onOpenCheatsheet?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenCheatsheet,
}) => {
  const {
    landingHeroVisible,
    landingStatsVisible,
    landingFeaturesVisible,
    landingCurriculumVisible,
    landingOfficialVisible,
    landingCtaVisible,
  } = useSiteSettings();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col">
      <main className="flex-1">
        {landingHeroVisible && (
          <LandingHero onOpenCheatsheet={onOpenCheatsheet} />
        )}
        {landingStatsVisible && <LandingStats />}
        {landingCurriculumVisible && <LandingCurriculum />}
        {/* {landingFeaturesVisible && <LandingFeatures />} */}
        {/* {landingOfficialVisible && <LandingOfficial />} */}
        {landingCtaVisible && <LandingCta />}
      </main>
      <SiteFooter />
    </div>
  );
};
