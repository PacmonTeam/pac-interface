import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { PACMON_CHAIN } from "@/config/url";

const { chains, publicClient } = configureChains(
  [PACMON_CHAIN],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "PACMON RainbowKit",
  projectId: "309458b43f1f93c51ffd76536a7ccb74",
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { chains };
