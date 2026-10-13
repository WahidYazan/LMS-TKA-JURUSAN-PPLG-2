"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getSessionOnce, onAuthChange, signOut } from "../lib/auth";

type AuthStatus = "checking" | "signedIn" | "signedOut";

interface AdminAuthValue {
  status: AuthStatus;
  email: string | null;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthValue>({
  status: "checking",
  email: null,
  logout: async () => {},
});

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] = useState<AuthStatus>("checking");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    getSessionOnce().then((session) => {
      if (!mounted) return;
      setStatus(session ? "signedIn" : "signedOut");
      setEmail(session?.user?.email ?? null);
    });
    const unsubscribe = onAuthChange((signedIn, userEmail) => {
      if (!mounted) return;
      setStatus(signedIn ? "signedIn" : "signedOut");
      setEmail(userEmail);
    });
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const logout = useCallback(async () => {
    await signOut();
    setStatus("signedOut");
    setEmail(null);
  }, []);

  const value = useMemo(
    () => ({ status, email, logout }),
    [status, email, logout],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
