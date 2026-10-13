"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { SiteLogo } from "../SiteLogo";
import {
  LayoutDashboard,
  HelpCircle,
  BookOpen,
  ListChecks,
  Home,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/tka/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tka/admin/quiz", label: "Soal Quiz", icon: HelpCircle },
  { href: "/tka/admin/modules", label: "Modul", icon: BookOpen },
  { href: "/tka/admin/cheatsheet", label: "Cheatsheet", icon: ListChecks },
  { href: "/tka/admin/landing", label: "Landing", icon: Home },
];

const COLLAPSE_KEY = "tka-admin-sidebar-collapsed";

export const AdminShell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const { email, logout } = useAdminAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Pulihkan preferensi ciut dari localStorage setelah mount (hindari mismatch hidrasi).
  useEffect(() => {
    const run = async () => {
      await Promise.resolve();
      try {
        if (window.localStorage.getItem(COLLAPSE_KEY) === "1") {
          setCollapsed(true);
        }
      } catch {
        /* localStorage tidak tersedia — abaikan */
      }
    };
    void run();
  }, []);

  // Tutup drawer mobile otomatis saat berpindah halaman.
  useEffect(() => {
    const run = async () => {
      await Promise.resolve();
      setMobileOpen(false);
    };
    void run();
  }, [pathname]);

  // Kunci scroll latar belakang saat drawer mobile terbuka.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      } catch {
        /* abaikan */
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      <aside
        className={`hidden lg:flex fixed inset-y-0 flex-col bg-white border-r border-slate-200 p-4 z-40 transition-[width] duration-200 ease-in-out ${
          collapsed ? "lg:w-[76px]" : "lg:w-60"
        }`}
      >
        <button
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Perlebar sidebar" : "Ciutkan sidebar"}
          title={collapsed ? "Perlebar sidebar" : "Ciutkan sidebar"}
          className="absolute top-8 -right-3 z-50 h-7 w-7 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-500 hover:text-sky-600 hover:border-sky-300 cursor-pointer transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          ) : (
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          )}
        </button>

        <div
          className={`flex items-center py-3 ${
            collapsed ? "justify-center" : "gap-2.5 px-2"
          }`}
        >
          <Link
            href="/tka"
            className="flex items-center gap-3 cursor-pointer group select-none min-w-0"
            aria-label="Simulasi TKA PPLG - Beranda"
          >
            <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
              <SiteLogo width={48} height={48} priority />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-slate-900 leading-tight truncate">
                  Portal TKA PPLG
                </p>
                <p className="text-[10px] text-slate-400 font-semibold truncate">
                  Mode Admin
                </p>
              </div>
            )}
          </Link>
        </div>

        <div className="-mx-4 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent my-4" />

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const active =
              item.href === "/tka/admin"
                ? pathname === "/tka/admin"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`flex items-center rounded-xl text-sm font-bold transition-colors min-h-[44px] ${
                  collapsed ? "justify-center px-0" : "gap-2.5 px-3"
                } ${
                  active
                    ? "bg-sky-50 text-sky-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-slate-100">
          {!collapsed && (
            <p
              className="text-[11px] text-slate-400 px-3 mb-2 truncate"
              title={email ?? ""}
            >
              {email}
            </p>
          )}
          <button
            onClick={() => void logout()}
            title={collapsed ? "Keluar" : undefined}
            className={`w-full flex items-center rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer min-h-[44px] ${
              collapsed ? "justify-center px-0" : "gap-2.5 px-3"
            }`}
          >
            <LogOut className="w-5 h-5 shrink-0" aria-hidden="true" />
            {!collapsed && <span>Keluar</span>}
          </button>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="flex items-center gap-1.5 px-2 h-16">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
            aria-label="Buka menu admin"
            aria-expanded={mobileOpen}
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
          <Link
            href="/tka"
            className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer select-none"
            aria-label="Simulasi TKA PPLG - Beranda"
          >
            <div className="w-9 h-9 shrink-0">
              <SiteLogo width={40} height={40} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-slate-900 leading-tight truncate">
                Portal TKA PPLG
              </p>
              <p className="text-[10px] text-slate-400 font-semibold truncate">
                Mode Admin
              </p>
            </div>
          </Link>
          <button
            onClick={() => void logout()}
            className="p-2 rounded-xl hover:bg-rose-50 text-rose-600 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
            aria-label="Keluar"
          >
            <LogOut className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER — backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
        className={`lg:hidden fixed inset-0 z-40 bg-slate-900/40 transition-opacity duration-200 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      {/* MOBILE DRAWER — panel */}
      <aside
        aria-label="Menu admin mobile"
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[82%] bg-white border-r border-slate-200 shadow-xl flex flex-col p-4 transition-transform duration-200 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2 py-1 mb-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 shrink-0">
              <SiteLogo width={40} height={40} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-slate-900 leading-tight truncate">
                Portal TKA PPLG
              </p>
              <p className="text-[10px] text-slate-400 font-semibold truncate">
                Mode Admin
              </p>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center shrink-0"
            aria-label="Tutup menu"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent my-2" />

        <nav className="flex flex-col gap-1 mt-2 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const active =
              item.href === "/tka/admin"
                ? pathname === "/tka/admin"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 px-3 rounded-xl text-sm font-bold transition-colors min-h-[44px] ${
                  active
                    ? "bg-sky-50 text-sky-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-slate-100">
          {email && (
            <p
              className="text-[11px] text-slate-400 px-3 mb-2 truncate"
              title={email}
            >
              {email}
            </p>
          )}
          <button
            onClick={() => void logout()}
            className="w-full flex items-center gap-2.5 px-3 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer min-h-[44px]"
          >
            <LogOut className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      <main
        className={`pt-16 lg:pt-8 pb-16 px-4 sm:px-6 lg:px-8 transition-[margin] duration-200 ease-in-out ${
          collapsed ? "lg:ml-[76px]" : "lg:ml-60"
        }`}
      >
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
};
