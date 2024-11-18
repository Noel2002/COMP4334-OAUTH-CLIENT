import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  redirects: async () => {
    const uri = process.env.NEXT_PUBLIC_OAUTH_AUTHORIZATION_URI || 'http://localhost:3000/api/oauth/authorize';
    return [
      {
        source: '/api/oauth/authorize',
        destination: uri,
        permanent: true,
      },
    ]
  }
};

export default nextConfig;
