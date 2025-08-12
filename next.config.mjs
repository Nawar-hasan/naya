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
};

export default nextConfig;
