import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/favicon.png",
        permanent: true,
      },
      {
        source: "/:locale/ben-kimim",
        destination: "/:locale/hakkimda",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
