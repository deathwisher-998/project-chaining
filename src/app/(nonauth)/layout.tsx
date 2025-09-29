"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function Nonprotectedlayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return <>{children}</>;
}
