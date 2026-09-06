import type { NextConfig } from "next";
//add  transpilePackages: ["@nextui-org/react"],เพื่อบังคับให้ Next.js แปลง NextUI ให้รองรับ Context อัตโนมัติ:
const nextConfig: NextConfig = {
  transpilePackages: ["@nextui-org/react"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      }
    ],
  },
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
// };

// export default nextConfig;
