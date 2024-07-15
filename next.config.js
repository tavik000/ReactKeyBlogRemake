const withMDX = require('@next/mdx')()
const removeImports = require('next-remove-imports')();

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
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    // ppr: 'incremental',
  },
};

module.exports = removeImports({
  ...nextConfig,
});
