"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import Authlayout from "@/components/authlayout/layout";
import { Apploader } from "@/components/loader/loading";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { token, loading } = useAuth(); // your auth logic

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/");
    }
  }, [loading, token, router]);
  

  if (loading) {
    return <Apploader Loadingstate={1}>
      <div></div>
    </Apploader>; // spinner or skeleton
  }
  
  return (
    <Authlayout>
      {children}
    </Authlayout>
  );
}
