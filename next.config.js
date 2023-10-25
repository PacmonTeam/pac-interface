/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "_static",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
