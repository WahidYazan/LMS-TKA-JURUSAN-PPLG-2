"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import {
  LayoutDashboard,
  HelpCircle,
  BookOpen,
  ListChecks,
  Home,
  LogOut,
  Settings2,
  ChevronLeft,
  ChevronRight,
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
              <Image
                src="/images/brands/TTH-nobg.webp"
                alt="SMK Telekomunikasi Tunas Harapan"
                width={48}
                height={48}
                className="w-full h-full object-contain drop-shadow-sm"
                priority
              />
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

      <div className="lg:hidden fixed top-0 inset-x-0 bg-white border-b border-slate-200 z-40 shadow-sm">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex-1 flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
            <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center shrink-0">
              <Settings2 className="w-4 h-4" aria-hidden="true" />
            </div>
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
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors min-h-[36px] ${
                    active
                      ? "bg-sky-50 text-sky-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </div>
          <button
            onClick={() => void logout()}
            className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 shrink-0 cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
            aria-label="Keluar"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

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
