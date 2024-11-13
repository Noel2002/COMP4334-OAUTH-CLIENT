import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/api/oauth/authorize',
        destination: 'http://localhost:3000/api/oauth/authorize',
        permanent: true,
      },
    ]
  }
};

export default nextConfig;
