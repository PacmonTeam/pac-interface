import { NextUIProvider } from "@nextui-org/react";
import { SWRConfig } from "swr";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <SWRConfig>{children}</SWRConfig>
    </NextUIProvider>
  );
}
