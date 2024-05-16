/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer"

const nextConfig = {
  redirects: () => {
    return [
      {
        source:"/admin",
        destination:"/admin/dashboard",
        permanent: true
      }
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
