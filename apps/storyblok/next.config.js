const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flowbite.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "a.storyblok.com",
      },
    ],
  },
  experimental: {
    inlineCss: true,
    reactCompiler: true,
  }
};

module.exports = nextConfig;
