import "@/styles/globals.css";

import type { AppProps } from "next/app";

import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import Head from "next/head";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.className}`}>
      <Head>
        <title>PACMON : BKKBUIDL2023</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </main>
  );
}
