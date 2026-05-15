import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://dapi.kakao.com https://*.kakao.com",
              "style-src 'self' 'unsafe-inline' https://dapi.kakao.com https://*.kakao.com https://cdn.jsdelivr.net",
              "img-src 'self' data: blob: https://*.kakao.com https://*.kakaocdn.net",
              "connect-src 'self' https://*.kakao.com https://*.kakaocdn.net",
              "font-src 'self' data: https://cdn.jsdelivr.net",
              "frame-src 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
