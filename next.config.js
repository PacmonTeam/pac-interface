/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "_static",
  images: {
    unoptimized: true,
  },
  transpilePackages: ["web3-eth-abi"],
};

module.exports = nextConfig;
