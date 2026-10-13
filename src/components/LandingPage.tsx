import React from "react";
import { LandingHero } from "./landing/LandingHero";
import { LandingStats } from "./landing/LandingStats";
import { LandingOfficial } from "./landing/LandingOfficial";
import { LandingCurriculum } from "./landing/LandingCurriculum";
import { LandingFeatures } from "./landing/LandingFeatures";
import { LandingCta } from "./landing/LandingCta";
import { SiteFooter } from "./SiteFooter";

interface LandingPageProps {
  onOpenCheatsheet?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenCheatsheet }) => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col">
      <main className="flex-1">
        <LandingHero onOpenCheatsheet={onOpenCheatsheet} />
        <LandingStats />
        <LandingCurriculum />
        <LandingFeatures />
        <LandingOfficial />
        <LandingCta />
      </main>
      <SiteFooter />
    </div>
  );
};
