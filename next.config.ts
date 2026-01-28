import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

console.log("----------------------------------------------------------------");
console.log("Build Configuration - BasePath:", basePath);
console.log("----------------------------------------------------------------");

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
