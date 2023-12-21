import { Chain } from "@rainbow-me/rainbowkit";

const RPC = process.env.NEXT_PUBLIC_RPC || "https://o.pacmon.suijin.xyz/rpc/";
const EXPLORER =
  process.env.NEXT_PUBLIC_EXPLORER || "https://o.pacmon.suijin.xyz/explorer/";

export const BASE_API =
  process.env.NEXT_PUBLIC_API_URL || "https://o.pacmon.suijin.xyz/api";

export const PACMON_CHAIN: Chain = {
  id: 1337,
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
    public: { http: [RPC] },
    default: { http: [RPC] },
  },
  blockExplorers: {
    default: { name: "PacmonScan", url: EXPLORER },
    etherscan: { name: "PacmonScan", url: EXPLORER },
  },
  contracts: {},
  testnet: true,
};

// export const BASE_API = "http://localhost:3033";
// export const PACMON_CHAIN: Chain = {
//   id: 1337,
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
//     public: { http: ["http://localhost:8545"] },
//     default: { http: ["http://localhost:8545"] },
//   },
//   blockExplorers: {
//     default: { name: "PacmonScan", url: "http://localhost:5100" },
//     etherscan: { name: "PacmonScan", url: "http://localhost:5100" },
//   },
//   contracts: {},
//   testnet: true,
// };
