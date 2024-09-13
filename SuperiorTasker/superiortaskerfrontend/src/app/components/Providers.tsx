"use client";
import { theme } from "@/commons/chakra-theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ColorModeScript initialColorMode={"light"} />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </SessionProvider>
  );
}