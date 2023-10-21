import type { ReactElement, ReactNode } from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Navbar />
      <main className="flex w-full justify-center px-6 py-6">{children}</main>
    </>
  );
}
