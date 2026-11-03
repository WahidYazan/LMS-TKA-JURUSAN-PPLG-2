"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getDisplayName,
  getSessionOnce,
  onAuthChange,
  signOut,
  updateAdminDisplayName,
} from "../lib/auth";

type AuthStatus = "checking" | "signedIn" | "signedOut";

interface AdminAuthValue {
  status: AuthStatus;
  name: string | null;
  saveName: (name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthValue>({
  status: "checking",
  name: null,
  saveName: async () => {},
  logout: async () => {},
});

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] = useState<AuthStatus>("checking");
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    getSessionOnce().then((session) => {
      if (!mounted) return;
      setStatus(session ? "signedIn" : "signedOut");
      setName(getDisplayName(session?.user));
    });
    const unsubscribe = onAuthChange((signedIn, userName) => {
      if (!mounted) return;
      setStatus(signedIn ? "signedIn" : "signedOut");
      setName(userName);
    });
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const logout = useCallback(async () => {
    await signOut();
    setStatus("signedOut");
    setName(null);
  }, []);

  const saveName = useCallback(async (displayName: string) => {
    const updatedName = await updateAdminDisplayName(displayName);
    setName(updatedName);
  }, []);

  const value = useMemo(
    () => ({ status, name, saveName, logout }),
    [status, name, saveName, logout],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
