import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        pathname: "/api/character/**",
      },
    ],
  },
  reactStrictMode: true, // buena práctica
};

export default nextConfig;
