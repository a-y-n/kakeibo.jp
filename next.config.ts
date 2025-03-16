import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    // Sanityのプロジェクトにあわせて変更
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/xxi0kcbl/production/**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@tailwindcss/oxide': false
    }
    return config
  }
}
 
export default nextConfig