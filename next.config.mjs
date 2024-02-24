/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['vastphotos.com'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: "vastphotos.com/",
          },
        ],
      },
};

export default nextConfig;
