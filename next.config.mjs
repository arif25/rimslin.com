/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'rimslin.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async redirects() {
    return [
      {
        source: '/dialects',
        destination: '/#country-dialects',
        permanent: false,
      },
      {
        source: '/emergency',
        destination: '/#emergency-phrases',
        permanent: false,
      },
      {
        source: '/audio-pack',
        destination: '/#audio-downloads',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
