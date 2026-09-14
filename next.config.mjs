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
        destination: '/country-dialects',
        permanent: false,
      },
      {
        source: '/dialogues',
        destination: '/daily-conversations',
        permanent: false,
      },
      {
        source: '/ai-coach',
        destination: '/ai-voice-coach',
        permanent: false,
      },
      {
        source: '/emergency',
        destination: '/emergency-arabic',
        permanent: false,
      },
      {
        source: '/emergency-phrases',
        destination: '/emergency-arabic',
        permanent: false,
      },
      {
        source: '/audio-pack',
        destination: '/free-downloads',
        permanent: false,
      },
      {
        source: '/audio-downloads',
        destination: '/free-downloads',
        permanent: false,
      },
      {
        source: '/testimonials',
        destination: '/reviews',
        permanent: false,
      },
      {
        source: '/worker-rights',
        destination: '/labor-rights',
        permanent: false,
      },
      {
        source: '/airport-guide',
        destination: '/visa-airport-checklist',
        permanent: false,
      },
      {
        source: '/audio-demo',
        destination: '/audio-phrases',
        permanent: false,
      },
      {
        source: '/arabic-classes',
        destination: '/video-classes',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
