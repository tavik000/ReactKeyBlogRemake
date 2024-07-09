/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en-US', 'ja-JP', 'zh-HK', 'ko-KR'],
    defaultLocale: 'en-US',
  },
  experimental: {
    ppr: 'incremental',
  },
};

module.exports = nextConfig;
