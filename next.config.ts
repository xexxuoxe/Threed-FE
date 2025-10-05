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
      {
        protocol: "https",
        hostname: "via.placeholder.com"
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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