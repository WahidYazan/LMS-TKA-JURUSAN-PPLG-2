import React from 'react';
import { LandingHero } from './landing/LandingHero';
import { LandingStats } from './landing/LandingStats';
import { LandingOfficial } from './landing/LandingOfficial';
import { LandingCurriculum } from './landing/LandingCurriculum';
import { LandingFeatures } from './landing/LandingFeatures';
import { LandingCta } from './landing/LandingCta';
import { LandingFooter } from './landing/LandingFooter';

interface LandingPageProps {
  onEnterLMS: () => void;
  onOpenExam: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterLMS, onOpenExam }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      <LandingHero onEnterLMS={onEnterLMS} onOpenExam={onOpenExam} />
      {/* <LandingStats /> */}
      {/* <LandingOfficial /> */}
      <LandingCurriculum onOpenExam={onOpenExam} />
      <LandingFeatures />
      <LandingCta onEnterLMS={onEnterLMS} />
      <LandingFooter />
    </div>
  );
};
