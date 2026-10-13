"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Globe,
  List,
  Menu,
  X,
  ChevronRight,
  LogIn,
  FileCode2,
  ClipboardCheck,
} from "lucide-react";
import { ModuleContent } from "../types";
import { SiteLogo } from "./SiteLogo";
import { CheatsheetModal } from "./CheatsheetModal";

interface NavbarProps {
  currentPath?: string;
  selectedModule?: ModuleContent | null;
  onOpenCheatsheet?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedModule,
  onOpenCheatsheet,
}) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModuleTocOpen, setIsModuleTocOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>(
    () => selectedModule?.tableOfContents[0]?.id || ""
  );
  const [internalCheatsheetOpen, setInternalCheatsheetOpen] = useState(false);

  // Close menus on route change without triggering cascading setState in useEffect
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setIsMobileMenuOpen(false);
    setIsModuleTocOpen(false);
  }

  const handleOpenCheatsheet = () => {
    onOpenCheatsheet?.();
    setInternalCheatsheetOpen(true);
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsModuleTocOpen(false);
    setIsMobileMenuOpen(false);
  };

  const isLanding = pathname === "/tka";
  const isModul = pathname === "/tka/modul";
  const isModule = pathname.startsWith("/tka/module/");
  const isQuiz = pathname.startsWith("/tka/quiz");
  const isAdmin = pathname.startsWith("/tka/admin");

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 sm:h-18 flex items-center justify-between gap-6">
          
          {/* ZONE 1: BRAND WORDMARK */}
          <Link
            href="/tka"
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
            aria-label="Simulasi TKA PPLG - Beranda"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
              <SiteLogo width={40} height={40} priority />
            </div>

            <div className="min-w-0">
              <div className="text-base sm:text-lg font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                Simulasi TKA PPLG
              </div>
              <p className="text-[11px] font-medium text-slate-500 leading-none truncate hidden sm:block">
                SMK Telekomunikasi Tunas Harapan
              </p>
            </div>
          </Link>

          {/* ZONE 2: DESKTOP NAVIGATION LINKS */}
          <nav
            className="hidden md:flex items-center gap-1 text-sm font-semibold text-slate-600"
            aria-label="Navigasi utama"
          >
            <Link
              href="/tka"
              className={`px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap min-h-[40px] ${
                isLanding
                  ? "text-blue-600 bg-blue-50/80 font-bold"
                  : "hover:text-blue-600 hover:bg-slate-50"
              }`}
              aria-current={isLanding ? "page" : undefined}
            >
              <span>Beranda</span>
            </Link>

            <Link
              href="/tka/modul"
              className={`px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap min-h-[40px] ${
                isModul || isModule
                  ? "text-blue-600 bg-blue-50/80 font-bold"
                  : "hover:text-blue-600 hover:bg-slate-50"
              }`}
              aria-current={isModul || isModule ? "page" : undefined}
            >
              <BookOpen className="w-4 h-4 text-slate-400" aria-hidden="true" />
              <span>Modul Belajar</span>
            </Link>

            <Link
              href="/tka/quiz"
              className={`px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap min-h-[40px] ${
                isQuiz
                  ? "text-blue-600 bg-blue-50/80 font-bold"
                  : "hover:text-blue-600 hover:bg-slate-50"
              }`}
              aria-current={isQuiz ? "page" : undefined}
            >
              <ClipboardCheck className="w-4 h-4 text-slate-400" aria-hidden="true" />
              <span>Simulasi Ujian</span>
            </Link>

            {/* <button
              onClick={handleOpenCheatsheet}
              className="px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap min-h-[40px] text-slate-600 hover:text-blue-600 hover:bg-slate-50"
            >
              <FileCode2 className="w-4 h-4 text-slate-400" aria-hidden="true" />
              <span>Cheatsheet</span>
            </button> */}
          </nav>

          {/* ZONE 3: ACTIONS */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Table of Contents button (if currently reading a module) */}
            {isModule && selectedModule && (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsModuleTocOpen(!isModuleTocOpen)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-blue-200 bg-blue-50 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer min-h-[40px]"
                  aria-expanded={isModuleTocOpen}
                  aria-haspopup="true"
                  aria-label={`Daftar isi Modul ${selectedModule.number}`}
                >
                  <List className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Daftar Isi #{selectedModule.number}</span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${isModuleTocOpen ? "rotate-90" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                {isModuleTocOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden animate-slide-down">
                    <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                      <div className="text-xs font-bold text-slate-900">
                        Daftar Isi Modul {selectedModule.number}
                      </div>
                      <button
                        onClick={() => setIsModuleTocOpen(false)}
                        className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 cursor-pointer"
                        aria-label="Tutup daftar isi"
                      >
                        <X className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                    <nav className="max-h-[60vh] overflow-y-auto py-1" aria-label="Navigasi bagian modul">
                      {selectedModule.tableOfContents.map((item, idx) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full text-left px-3.5 py-2.5 text-xs transition-colors cursor-pointer flex items-center gap-2 ${
                            activeSectionId === item.id
                              ? "bg-blue-50 text-blue-700 font-bold"
                              : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                          }`}
                        >
                          <span className="w-5 h-5 rounded bg-slate-100 text-slate-500 font-mono text-[10px] flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="truncate">{item.title}</span>
                        </button>
                      ))}
                    </nav>
                  </div>
                )}
              </div>
            )}

            {/* Quick action: Mulai Ujian button */}
            {!isQuiz && (
              <Link
                href="/tka/quiz"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer min-h-[40px]"
              >
                <ClipboardCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Mulai Ujian</span>
              </Link>
            )}

            {/* Admin Login button */}
            <Link
              href="/tka/admin"
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer min-h-[40px] ${
                isAdmin
                  ? "border-blue-300 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
              aria-current={isAdmin ? "page" : undefined}
            >
              <LogIn className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Admin</span>
            </Link>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md animate-slide-down">
          <nav className="px-4 py-4 space-y-1 max-h-[75vh] overflow-y-auto" aria-label="Menu mobile">
            <Link
              href="/tka"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`w-full px-3.5 py-3 rounded-xl transition-colors cursor-pointer flex items-center gap-3 min-h-[44px] text-sm font-semibold ${
                isLanding ? "text-blue-600 bg-blue-50 font-bold" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Globe className="w-4 h-4 text-slate-400" aria-hidden="true" />
              <span>Beranda</span>
            </Link>

            <Link
              href="/tka/modul"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`w-full px-3.5 py-3 rounded-xl transition-colors cursor-pointer flex items-center gap-3 min-h-[44px] text-sm font-semibold ${
                isModul || isModule ? "text-blue-600 bg-blue-50 font-bold" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <BookOpen className="w-4 h-4 text-slate-400" aria-hidden="true" />
              <span>Modul Belajar</span>
            </Link>

            <Link
              href="/tka/quiz"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`w-full px-3.5 py-3 rounded-xl transition-colors cursor-pointer flex items-center gap-3 min-h-[44px] text-sm font-semibold ${
                isQuiz ? "text-blue-600 bg-blue-50 font-bold" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <ClipboardCheck className="w-4 h-4 text-slate-400" aria-hidden="true" />
              <span>Simulasi Ujian TKA</span>
            </Link>

            <button
              onClick={handleOpenCheatsheet}
              className="w-full px-3.5 py-3 rounded-xl transition-colors cursor-pointer flex items-center gap-3 text-left min-h-[44px] text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <FileCode2 className="w-4 h-4 text-slate-400" aria-hidden="true" />
              <span>Cheatsheet / Rangkuman</span>
            </button>

            {/* If inside module, show quick TOC */}
            {isModule && selectedModule && (
              <div className="border-t border-slate-100 pt-3 mt-2">
                <div className="px-3.5 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Daftar Isi Modul {selectedModule.number}
                </div>
                {selectedModule.tableOfContents.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left px-3.5 py-2 text-xs text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2"
                  >
                    <span className="font-mono text-[10px] text-slate-400">{idx + 1}.</span>
                    <span className="truncate">{item.title}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Admin link */}
            <div className="border-t border-slate-100 pt-3 mt-2">
              <Link
                href="/tka/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full px-3.5 py-3 rounded-xl transition-colors cursor-pointer flex items-center gap-3 min-h-[44px] text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                <LogIn className="w-4 h-4 text-slate-400" aria-hidden="true" />
                <span>Portal Admin</span>
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Cheatsheet Modal */}
      {internalCheatsheetOpen && (
        <CheatsheetModal onClose={() => setInternalCheatsheetOpen(false)} />
      )}
    </header>
  );
};
