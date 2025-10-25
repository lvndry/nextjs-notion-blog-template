import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.notion.so', pathname: '/images/**' },
      { protocol: 'https', hostname: 'www.notion.so', pathname: '/image/**' },
      { protocol: 'https', hostname: 'notion.so', pathname: '/images/**' },
      { protocol: 'https', hostname: 'notion.so', pathname: '/image/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 's3.us-west-2.amazonaws.com', pathname: '/secure.notion-static.com/**' },
      { protocol: 'https', hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;
