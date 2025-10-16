/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  images: {
    domains:['sdplapi.runasp.net'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to complete
    // even if your project has type errors.
    ignoreBuildErrors: true,
  },
  // distDir: 'build', 
};

module.exports = nextConfig;
