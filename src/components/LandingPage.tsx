import React from "react";
import { LandingHero } from "./landing/LandingHero";
import { LandingStats } from "./landing/LandingStats";
import { LandingOfficial } from "./landing/LandingOfficial";
import { LandingCurriculum } from "./landing/LandingCurriculum";
import { LandingFeatures } from "./landing/LandingFeatures";
import { LandingCta } from "./landing/LandingCta";
import { LandingFooter } from "./landing/LandingFooter";

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      <LandingHero />
      {/*<LandingStats />*/}
      {/*<LandingOfficial />*/}
      <LandingCurriculum />
      {/*<LandingFeatures />*/}
      {/*<LandingCta />*/}
      <LandingFooter />
    </div>
  );
};
