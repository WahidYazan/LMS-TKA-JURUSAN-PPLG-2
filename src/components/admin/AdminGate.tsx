"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  AdminAuthProvider,
  useAdminAuth,
} from "../../contexts/AdminAuthContext";
import { AdminShell } from "./AdminShell";
import { FullscreenLoader } from "./AdminLoading";

function AdminGate({ children }: { children: React.ReactNode }) {
  const { status } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/tka/admin/login";

  useEffect(() => {
    if (status === "signedOut" && !isLogin) router.replace("/tka/admin/login");
    if (status === "signedIn" && isLogin) router.replace("/tka/admin");
  }, [status, isLogin, router]);

  if (status === "checking") {
    return <FullscreenLoader label="Memeriksa sesi admin..." />;
  }

  if (status === "signedOut") return isLogin ? children : null;

  if (isLogin) return null;
  return <AdminShell>{children}</AdminShell>;
}

export default function AdminGateClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminGate>{children}</AdminGate>
    </AdminAuthProvider>
  );
}
