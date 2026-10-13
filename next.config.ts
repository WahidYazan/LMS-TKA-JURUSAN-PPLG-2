import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  allowedDevOrigins: ['127.0.0.1'],
  images: {
    remotePatterns: [],
  },
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Footer membacanya saat prerender, jadi tahun diambil dari konstanta build.
  env: {
    NEXT_PUBLIC_SITE_YEAR: String(new Date().getFullYear()),
  },
};

export default nextConfig;
