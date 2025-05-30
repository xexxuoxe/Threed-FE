import path from "path";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      },
      {
        protocol: "http",
        hostname: "**"
      },
    ]
  },



  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@app": path.resolve(__dirname, "src/app"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@public": path.resolve(__dirname, "public"),
      "@session": path.resolve(__dirname, "src/session"),
    };
    return config;
  },
};

module.exports = nextConfig;