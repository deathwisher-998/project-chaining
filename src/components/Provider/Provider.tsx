"use client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Chakraprovider({
  children,
}: {
  children: ReactNode;
}) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
