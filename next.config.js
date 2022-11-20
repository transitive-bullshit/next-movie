const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  experimental: {
    appDir: true
  },
  images: {
    domains: ['image.tmdb.org']
  }
}

module.exports = withBundleAnalyzer(nextConfig)
