const withMDX = require('@next/mdx')()
const removeImports = require('next-remove-imports')();
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        pathname: '/profile_images/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    // ppr: 'incremental',
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  webpack: (config, { isServer }) => {
    // Resolve the correct path for babel-plugin-transform-remove-imports
    config.resolve.alias['babel-plugin-transform-remove-imports'] = path.resolve(
      __dirname,
      'node_modules/babel-plugin-transform-remove-imports/lib/index.js'
    );

    return config;
  },
  publicRuntimeConfig: {
    basePath: process.env.BASE_PATH || '',
  },
};




module.exports = removeImports(withMDX(nextConfig));
