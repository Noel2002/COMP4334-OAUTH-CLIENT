import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  async redirects(){
    return [
      {
        source: '/api/oauth/authorize',
        destination: process.env.NEXT_PUBLIC_OAUTH_AUTHORIZATION_URI || 'http://localhost:3000/api/oauth/authorize',
        permanent: false,
      },{
        source: '/api/oauth/token',
        destination: process.env.NEXT_PUBLIC_OAUTH_TOKEN_URI || 'http://localhost:3000/api/oauth/token',
        permanent: false,
      },

    ]
  },
};

export default nextConfig;
