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

const isActive = (pathname: string, href: string) =>
  href === "/tka/admin" ? pathname === href : pathname.startsWith(href);

/** Brand block: logo + nama portal, dipakai di sidebar & drawer. */
const BrandBlock: React.FC<{ compact?: boolean }> = ({ compact }) => (
  <Link
    href="/tka"
    className={`flex items-center gap-3 min-w-0 group select-none ${compact ? "" : "px-2"}`}
    aria-label="Simulasi TKA PPLG - Beranda"
  >
    <span className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-xs group-hover:shadow-md transition-shadow">
      <SiteLogo width={40} height={40} />
    </span>
    {!compact && (
      <span className="min-w-0 leading-none text-left">
        <span className="block text-[13.5px] font-extrabold tracking-tight text-slate-900 truncate">
          Portal TKA PPLG
        </span>
        <span className="mt-1 block font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-sky-600 truncate">
          Mode Admin
        </span>
      </span>
    )}
  </Link>
);

/** Item navigasi: bar aksen kiri saat aktif, ikon + label. */
const NavItem: React.FC<{
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  active: boolean;
  collapsed: boolean;
  onClick?: () => void;
}> = ({ href, label, Icon, active, collapsed, onClick }) => (
  <Link
    key={href}
    href={href}
    onClick={onClick}
    title={collapsed ? label : undefined}
    aria-current={active ? "page" : undefined}
    className={`relative flex items-center rounded-xl text-[13px] font-bold transition-colors min-h-[44px] ${
      collapsed ? "justify-center px-0" : "gap-3 px-3"
    } ${
      active
        ? "bg-sky-50 text-sky-700"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`}
  >
    {active && (
      <span
        aria-hidden="true"
        className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-sky-500"
      />
    )}
    <Icon className="w-[18px] h-[18px] shrink-0" aria-hidden={true} />
    {!collapsed && <span className="truncate">{label}</span>}
  </Link>
);

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

  // Escape untuk menutup drawer mobile.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
    <div className="min-h-screen bg-[#f5f8fb] text-slate-800 font-sans">
      {/* ── SIDEBAR DESKTOP ─────────────────────────────────── */}
      <aside
        className={`hidden lg:flex fixed inset-y-0 flex-col bg-white border-r border-slate-200 z-40 transition-[width] duration-200 ease-in-out ${
          collapsed ? "lg:w-[84px]" : "lg:w-64"
        }`}
      >
        {/* pita aksen tipis di tepi atas sidebar */}
        <div
          className="h-1 bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 shrink-0"
          aria-hidden="true"
        />

        <button
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Perlebar sidebar" : "Ciutkan sidebar"}
          title={collapsed ? "Perlebar sidebar" : "Ciutkan sidebar"}
          className="absolute top-6 -right-3 z-50 h-7 w-7 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-500 hover:text-sky-600 hover:border-sky-300 cursor-pointer transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          ) : (
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          )}
        </button>

        <div className="pt-4 pb-2 px-2">
          <BrandBlock compact={collapsed} />
        </div>

        <nav
          className="flex flex-col gap-1 px-3 pt-3 mt-1 border-t border-slate-100"
          aria-label="Navigasi admin"
        >
          {!collapsed && (
            <p className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-400 px-3 mb-1">
              Konten
            </p>
          )}
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              Icon={item.icon}
              active={isActive(pathname, item.href)}
              collapsed={collapsed}
            />
          ))}
        </nav>

        <div className="mt-auto p-3 pt-4 border-t border-slate-100">
          {!collapsed ? (
            <div className="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5 mb-2">
              <p className="font-mono text-[9.5px] font-semibold tracking-[0.14em] uppercase text-slate-400">
                Masuk sebagai
              </p>
              <p
                className="text-xs font-bold text-slate-700 truncate mt-0.5"
                title={email ?? ""}
              >
                {email}
              </p>
            </div>
          ) : null}
          <button
            onClick={() => void logout()}
            title={collapsed ? "Keluar" : undefined}
            className={`w-full flex items-center rounded-xl text-[13px] font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer min-h-[44px] ${
              collapsed ? "justify-center px-0" : "gap-3 px-3"
            }`}
          >
            <LogOut className="w-[18px] h-[18px] shrink-0" aria-hidden="true" />
            {!collapsed && <span>Keluar</span>}
          </button>
        </div>
      </aside>

      {/* ── TOPBAR MOBILE ───────────────────────────────────── */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
        <div className="h-1 bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600" aria-hidden="true" />
        <div className="flex items-center gap-1.5 px-3 h-16">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl hover:bg-sky-50 text-slate-600 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
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
            <div className="w-9 h-9 shrink-0 rounded-lg overflow-hidden border border-slate-200">
              <SiteLogo width={40} height={40} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-slate-900 leading-tight truncate">
                Portal TKA PPLG
              </p>
              <p className="font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-sky-600 truncate">
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

      {/* ── DRAWER MOBILE ───────────────────────────────────── */}
      <div
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
        className={`lg:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        aria-label="Menu admin mobile"
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[82%] bg-white border-r border-slate-200 shadow-xl flex flex-col transition-transform duration-200 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-1 bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 shrink-0" aria-hidden="true" />
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <BrandBlock />
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center shrink-0"
            aria-label="Tutup menu"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-3 pt-3 mt-1 border-t border-slate-100 flex-1 overflow-y-auto">
          <p className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-400 px-3 mb-1">
            Konten
          </p>
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              Icon={item.icon}
              active={isActive(pathname, item.href)}
              collapsed={false}
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </nav>

        <div className="p-3 pt-4 border-t border-slate-100">
          {email && (
            <div className="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5 mb-2">
              <p className="font-mono text-[9.5px] font-semibold tracking-[0.14em] uppercase text-slate-400">
                Masuk sebagai
              </p>
              <p className="text-xs font-bold text-slate-700 truncate mt-0.5" title={email}>
                {email}
              </p>
            </div>
          )}
          <button
            onClick={() => void logout()}
            className="w-full flex items-center gap-3 px-3 rounded-xl text-[13px] font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer min-h-[44px]"
          >
            <LogOut className="w-[18px] h-[18px] shrink-0" aria-hidden="true" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* ── KONTEN ──────────────────────────────────────────── */}
      <main
        className={`pt-20 lg:pt-8 pb-10 px-4 sm:px-6 lg:px-8 transition-[margin] duration-200 ease-in-out ${
          collapsed ? "lg:ml-[84px]" : "lg:ml-64"
        }`}
      >
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
};
