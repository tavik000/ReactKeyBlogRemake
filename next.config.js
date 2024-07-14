/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en-US', 'ja-JP', 'zh-HK', 'ko-KR'],
    defaultLocale: 'en-US',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        pathname: '/profile_images/**',
      },
    ],
  },
  experimental: {
    // ppr: 'incremental',
  },
};

module.exports = nextConfig;
