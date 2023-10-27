import { Chain } from "@rainbow-me/rainbowkit";

// export const BASE_API = "https://o.pacmon.suijin.xyz/api";

// export const PACMON_CHAIN: Chain = {
//   id: 31337,
//   name: "Pacmon",
//   network: "pacmon",
//   iconUrl: "https://example.com/icon.svg",
//   iconBackground: "#fff",
//   nativeCurrency: {
//     decimals: 18,
//     name: "Pacmon Ether",
//     symbol: "PAC",
//   },
//   rpcUrls: {
//     public: { http: ["https://o.pacmon.suijin.xyz/rpc/"] },
//     default: { http: ["https://o.pacmon.suijin.xyz/rpc/"] },
//   },
//   blockExplorers: {
//     default: { name: "PacmonScan", url: "https://etherscan.io" },
//     etherscan: { name: "PacmonScan", url: "https://etherscan.io" },
//   },
//   contracts: {},
//   testnet: true,
// };

export const BASE_API = "http://localhost:3033";

export const PACMON_CHAIN: Chain = {
  id: 31337,
  name: "Pacmon",
  network: "pacmon",
  iconUrl: "https://example.com/icon.svg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Pacmon Ether",
    symbol: "PAC",
  },
  rpcUrls: {
    public: { http: ["http://localhost:8545/"] },
    default: { http: ["http://localhost:8545/"] },
  },
  blockExplorers: {
    default: { name: "PacmonScan", url: "https://etherscan.io" },
    etherscan: { name: "PacmonScan", url: "https://etherscan.io" },
  },
  contracts: {},
  testnet: true,
};
