import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  // If deploying to a GitHub Pages project site (username.github.io/repo-name/)
  // you need to set the base path:
  basePath: 'kieranlo.github.io/notes_app', // Replace with your repo name
  // This ensures correct image and asset paths
  images: { unoptimized: true },
  // Disable trailing slashes for GitHub Pages compatibility 
  trailingSlash: false,
};

export default nextConfig;
