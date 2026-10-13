import React from "react";
import { LandingHero } from "./landing/LandingHero";
import { LandingCurriculum } from "./landing/LandingCurriculum";
import { SiteFooter } from "./SiteFooter";

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      <LandingHero />
      {/*<LandingStats />*/}
      {/*<LandingOfficial />*/}
      <LandingCurriculum />
      {/*<LandingFeatures />*/}
      {/*<LandingCta />*/}
      <SiteFooter />
    </div>
  );
};
