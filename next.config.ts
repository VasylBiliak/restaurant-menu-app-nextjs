import type { NextConfig } from "next";

const nextConfig = {
  output: "export",
  basePath: "/restaurant-menu-app-nextjs",
  assetPrefix: "/restaurant-menu-app-nextjs/",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;