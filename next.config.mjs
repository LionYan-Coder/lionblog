/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer"

const nextConfig = {
  rewrites() {
    return [
      {
        source: '/privacy',
        destination: '/privacy.html',
      },
      {
        source: '/terms',
        destination: '/terms.html',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: `/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/**`,
      },
      {
        protocol:'https',
        hostname:"avatars.githubusercontent.com",
        pathname: '/**',
      }
    ],
  },
};

export default process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig
