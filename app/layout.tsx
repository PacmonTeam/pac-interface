import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.className} dark text-foreground bg-background`}
    >
      <body>
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
