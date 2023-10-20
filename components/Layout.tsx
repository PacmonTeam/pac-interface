import type { ReactElement, ReactNode } from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
