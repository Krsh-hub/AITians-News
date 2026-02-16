/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: [
      'images.unsplash.com',
      'source.unsplash.com',
      'techcrunch.com',
      'venturebeat.com',
      'technologyreview.com',
      'theverge.com',
      'i.guim.co.uk',
      'media.guim.co.uk',
    ],
  },
}

module.exports = nextConfig