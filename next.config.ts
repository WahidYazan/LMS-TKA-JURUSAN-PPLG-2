import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
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
  async redirects() {
    return [
      {
        source: '/',
        destination: '/tka',
        permanent: false,
      },
      {
        source: '/modul',
        destination: '/tka/modul',
        permanent: false,
      },
      {
        source: '/module',
        destination: '/tka/modul',
        permanent: false,
      },
      {
        source: '/quiz',
        destination: '/tka/quiz',
        permanent: false,
      },
      {
        source: '/admin',
        destination: '/tka/admin',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
