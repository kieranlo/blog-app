import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: isProd ? '/blog-app' : '',
  images: { unoptimized: true },  // This ensures correct image and asset paths
  // Disable trailing slashes for GitHub Pages compatibility 
  trailingSlash: false,
};

export default nextConfig;
