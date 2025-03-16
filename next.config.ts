import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/xxi0kcbl/production/**',
      },
    ],
  },
  experimental: {
    optimizeCss: false  // Oxideコンパイラーを無効化
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