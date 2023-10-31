/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/healthz",
        destination: "/api/health",
      },
    ];
  },
};

module.exports = nextConfig;
