/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/project",
        permanent: true,
      },
    ];
  },
  output: "export",
  distDir: "_static",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
