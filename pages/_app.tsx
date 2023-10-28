import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";

import { Roboto_Mono } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import Layout from "@/components/Layout";

import "@rainbow-me/rainbowkit/styles.css";

import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { PACMON_CHAIN } from "@/config/url";

const inter = Roboto_Mono({ subsets: ["latin"] });

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

export default function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.className}`}>
      <Head>
        <title>PACMON : BKKBUIDL2023</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextUIProvider>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains} theme={darkTheme()}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ToastContainer position="bottom-right" theme="dark" />
          </RainbowKitProvider>
        </WagmiConfig>
      </NextUIProvider>
    </main>
  );
}
