/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,

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
        hostname: "api.techpaaila.info",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;


