"use client";

import { useEffect, useState } from "react";

export function useContent<T>(
  loader: () => Promise<T>,
): { data: T | null; loading: boolean; error: string | null } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    loader()
      .then((result) => {
        if (!mounted) return;
        setData(result);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [loader]);

  return { data, loading, error };
}
