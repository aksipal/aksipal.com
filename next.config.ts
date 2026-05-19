import type { NextConfig } from "next";

const LOCALELESS_TOP_LEVEL_PATHS = [
  "templates",
  "hizmetler",
  "isler",
  "blog",
  "hakkimda",
  "iletisim",
  "gizlilik-politikasi",
  "kvkk-aydinlatma",
  "cerez-politikasi",
] as const;

const nextConfig: NextConfig = {
  async redirects() {
    const localelessRedirects = LOCALELESS_TOP_LEVEL_PATHS.flatMap((slug) => [
      {
        source: `/${slug}`,
        destination: `/tr/${slug}`,
        permanent: true,
      },
      {
        source: `/${slug}/:path*`,
        destination: `/tr/${slug}/:path*`,
        permanent: true,
      },
    ]);

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
      ...localelessRedirects,
    ];
  },
};

export default nextConfig;
