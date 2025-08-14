/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["cards.go4get.online"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cards.go4get.online",
        pathname: "/*",
      },
    ],
  },
  eslint: {
    // هذا السطر يخلي Vercel يتجاهل أخطاء ESLint أثناء البناء
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
