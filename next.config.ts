import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: { unoptimized: true },  // This ensures correct image and asset paths
  // Disable trailing slashes for GitHub Pages compatibility 
  trailingSlash: false,
};

export default nextConfig;
