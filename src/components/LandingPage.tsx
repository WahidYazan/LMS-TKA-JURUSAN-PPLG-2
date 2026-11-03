"use client";

import React from "react";
import { LandingHero } from "./landing/LandingHero";
import { LandingStats } from "./landing/LandingStats";
import { LandingCurriculum } from "./landing/LandingCurriculum";
import { LandingCta } from "./landing/LandingCta";
import { SiteFooter } from "./SiteFooter";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export const LandingPage: React.FC = () => {
  const {
    landingHeroVisible,
    landingStatsVisible,
    landingCurriculumVisible,
    landingCtaVisible,
  } = useSiteSettings();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col">
      <main className="flex-1">
        {landingHeroVisible && <LandingHero />}
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
