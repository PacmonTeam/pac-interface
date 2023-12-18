import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";

import { Roboto_Mono } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import Layout from "@/components/Layout";

import "@rainbow-me/rainbowkit/styles.css";

import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { chains, wagmiConfig } from "@/lib/wagmi";

const inter = Roboto_Mono({ subsets: ["latin"] });

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
