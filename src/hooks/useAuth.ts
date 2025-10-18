"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [token, settoken] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      settoken(token);
    } else {
      settoken("");
    }
    setLoading(false);
  }, []);

  return { token, loading };
}
