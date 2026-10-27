"use client";

import { loadSiteSettings } from "@/lib/content";
import { useContent } from "./useContent";

export function useSiteSettings() {
  const { data: settings } = useContent(loadSiteSettings, {
    logoUrl: null,
    landingHeroVisible: true,
    landingStatsVisible: true,
    landingCurriculumVisible: true,
    landingFeaturesVisible: true,
    landingOfficialVisible: true,
    landingCtaVisible: true,
    landingStatsWidth: "auto" as "auto" | "full",
    landingFeaturesWidth: "auto" as "auto" | "full",
  });

  return settings ?? {
    logoUrl: null,
    landingHeroVisible: true,
    landingStatsVisible: true,
    landingCurriculumVisible: true,
    landingFeaturesVisible: true,
    landingOfficialVisible: true,
    landingCtaVisible: true,
    landingStatsWidth: "auto" as "auto" | "full",
    landingFeaturesWidth: "auto" as "auto" | "full",
  };
}