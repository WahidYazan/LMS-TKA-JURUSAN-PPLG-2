"use client";
import { useEffect, useState } from "react";
export function useProbe<T>(loader: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    const t = window.setTimeout(() => {
      loader().then((r) => { if (mounted) { setData(r); setLoading(false); } });
    }, 0);
    return () => { mounted = false; window.clearTimeout(t); };
  }, [loader]);
  return { data, loading };
}
