"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import Authlayout from "@/components/authlayout/layout";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { token, loading } = useAuth(); // your auth logic

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/");
    }
  }, [loading, token, router]);

  if (loading) {
    return <div>Loading...</div>; // spinner or skeleton
  }
  
  return (
    <Authlayout>
      {children}
    </Authlayout>
  );
}
