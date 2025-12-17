/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5500",
        pathname: "/uploads/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "api.roboticainstitute.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;


