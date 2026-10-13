"use client";

import React from "react";
import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import { loadSiteSettings, DEFAULT_LOGO } from "@/lib/content";

// Logo situs yang bisa diganti admin (site_settings.logo_url).
// URL remote dirender <img> agar tak perlu whitelist host di next.config;
// path lokal tetap pakai next/image.
export const SiteLogo: React.FC<{
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}> = ({
  alt = "SMK Telekomunikasi Tunas Harapan",
  className = "w-full h-full object-contain drop-shadow-sm",
  width = 48,
  height = 48,
  priority = false,
}) => {
  const { data } = useContent(loadSiteSettings);
  const src = data?.logoUrl || DEFAULT_LOGO;
  const isRemote = /^https?:\/\//.test(src);

  if (isRemote) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
};
