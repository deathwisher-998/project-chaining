"use client";

import { ReactNode, useEffect } from "react";
import Authlayout from "@/components/authlayout/layout";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <Authlayout>{children}</Authlayout>;
}
