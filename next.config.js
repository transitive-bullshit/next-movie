const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: false
  },
  images: {
    domains: ['image.tmdb.org']
  }
}

module.exports = withBundleAnalyzer(nextConfig)
