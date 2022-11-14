const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images: {
    domains: ['image.tmdb.org']
  },
  webpack: (config) => {
    // console.log(config)
    config.externals.push({
      sharp: 'commonjs sharp'
    })
    return config
  }
}

module.exports = withBundleAnalyzer(nextConfig)
