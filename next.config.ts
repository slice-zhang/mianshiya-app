import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*", // 匹配前端所有 /api 开头的请求
        destination: "http://localhost:3002/api/:path*", // 转发到 Express 服务
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "inews.gtimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pic.code-nav.cn",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.githubassets.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
