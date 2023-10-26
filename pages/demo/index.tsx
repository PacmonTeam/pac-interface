import "@rainbow-me/rainbowkit/styles.css";

import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { PACMON_CHAIN } from "@/config/url";

import DemoApp from "@/components/demo/DemoApp";

const { chains, publicClient } = configureChains(
  [PACMON_CHAIN],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "PACMON RainbowKit",
  projectId: "309458b43f1f93c51ffd76536a7ccb74",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <div className="flex w-full justify-center">
          <DemoApp />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
