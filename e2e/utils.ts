import { PACMON_CHAIN } from "@/config/url";
import { MockConnector } from "@wagmi/core/connectors/mock";
import { Chain, createWalletClient, http } from "viem";
import { configureChains, createConfig } from "wagmi";

import {
  connectorsForWallets,
  type Wallet as RainbowWallet,
} from "@rainbow-me/rainbowkit";
import { privateKeyToAccount } from "viem/accounts";
import { publicProvider } from "wagmi/providers/public";

const PRIVATE_KEY =
  "0x26e86e45f6fc45ec6e2ecd128cec80fa1d1505e5507dcd2ae58c3130a7a97b48";
const RPC = process.env.NEXT_PUBLIC_RPC || "http://localhost:8545";
const EXPLORER = process.env.NEXT_PUBLIC_EXPLORER || "http://localhost:5100";

export const CHAIN: Chain = {
  id: 1337,
  name: "Pacmon",
  network: "pacmon",
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

const { chains, publicClient } = configureChains(
  [PACMON_CHAIN],
  [publicProvider()]
);

const mockWallet = (): RainbowWallet => ({
  createConnector: () => ({
    connector: new MockConnector({
      chains,
      options: {
        walletClient: createWalletClient({
          account: privateKeyToAccount(PRIVATE_KEY),
          chain: CHAIN,
          transport: http(RPC),
          pollingInterval: 100,
        }),
        flags: {
          failConnect: false,
          failSwitchChain: false,
          isAuthorized: true,
          noSwitchChain: false,
        },
      },
    }),
  }),
  id: "mock",
  iconBackground: "tomato",
  iconUrl: async () => "<http://placekitten.com/100/100>",
  name: "Mock Wallet",
});

const connectors = connectorsForWallets([
  {
    groupName: "Testing",
    wallets: [mockWallet()],
  },
]);

export function createTestConfig() {
  return createConfig({
    connectors,
    publicClient,
  });
}
