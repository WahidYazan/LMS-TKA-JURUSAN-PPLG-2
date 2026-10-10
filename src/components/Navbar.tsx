import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Globe, List, Menu, X, ChevronRight } from "lucide-react";
import { ModuleContent } from "../types";

interface NavbarProps {
  currentPath: string;
  selectedModule?: ModuleContent | null;
  onOpenCheatsheet?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  selectedModule,
  onOpenCheatsheet = () => {},
}) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModuleTocOpen, setIsModuleTocOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("");

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsModuleTocOpen(false);
    setActiveSectionId(selectedModule?.tableOfContents[0]?.id || "");
  }, [pathname, selectedModule?.id]);

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsModuleTocOpen(false);
    setIsMobileMenuOpen(false);
  };

  const isLanding = pathname === "/";
  const ismodul = pathname === "/modul";
  const isModule = pathname.startsWith("/module/");
  const isQuiz = pathname.startsWith("/quiz");

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-14 sm:h-16 flex lg:grid lg:grid-cols-3 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center justify-start gap-2 sm:gap-3.5 cursor-pointer group select-none min-w-0"
            aria-label="TKA PPLG - Beranda"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
              <Image
                src="/images/brands/TTH-nobg.webp"
                alt="SMK Telekomunikasi Tunas Harapan"
                width={40}
                height={40}
                className="w-full h-full object-contain drop-shadow-lg"
                priority
              />
            </div>

            <div className="min-w-0 hidden sm:block">
              <div className="text-sm sm:text-base font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                TKA PPLG
              </div>
              <p className="text-[10px] sm:text-xs font-medium text-slate-500 leading-tight truncate max-w-[140px] sm:max-w-[180px]">
                {isModule && selectedModule
                  ? `Modul ${selectedModule.number} • ${selectedModule.cardTitle}`
                  : isQuiz
                    ? "Simulasi Ujian CBT"
                    : "SMK Telekomunikasi Tunas Harapan"}
              </p>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION - hanya muncul di layar besar (lg ke atas) */}
          <nav
            className="hidden lg:flex items-center justify-center gap-1 text-xs font-bold text-slate-600"
            aria-label="Navigasi utama"
          >
            <Link
              href="/"
              className={`px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 min-h-[44px] ${
                isLanding
                  ? "text-blue-600 bg-blue-50 font-extrabold shadow-2xs"
                  : "hover:text-blue-600 hover:bg-slate-100 text-slate-600"
              }`}
              aria-current={isLanding ? "page" : undefined}
            >
              <Globe
                className="w-3.5 h-3.5 text-slate-500"
                aria-hidden="true"
              />
              <span>Landing Page</span>
            </Link>

            <Link
              href="/modul"
              className={`px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 min-h-[44px] ${
                ismodul || isModule
                  ? "text-blue-600 bg-blue-50 font-extrabold shadow-2xs"
                  : "hover:text-blue-600 hover:bg-slate-100 text-slate-600"
              }`}
              aria-current={ismodul || isModule ? "page" : undefined}
            >
              Modul Belajar
            </Link>
          </nav>

          <div className="flex items-center justify-end gap-2 sm:gap-3">
            {/* DESKTOP: Dropdown daftar isi modul - hanya muncul di lg ke atas */}
            {isModule && selectedModule && (
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setIsModuleTocOpen(!isModuleTocOpen)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50 text-[11px] sm:text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer min-h-[40px]"
                  aria-expanded={isModuleTocOpen}
                  aria-haspopup="true"
                  aria-label={`Daftar isi Modul ${selectedModule.number}`}
                >
                  <List className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="hidden xs:inline sm:inline">
                    Daftar Isi Modul {selectedModule.number}
                  </span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${isModuleTocOpen ? "rotate-90" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                {isModuleTocOpen && (
                  <div className="absolute right-0 top-full mt-2 w-[min(20rem,calc(100vw-2rem))] bg-white rounded-xl border border-slate-200 shadow-lg z-50 overflow-hidden">
                    <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                      <div className="text-xs font-bold text-slate-900">
                        Daftar Isi Modul {selectedModule.number}
                      </div>
                      <button
                        onClick={() => setIsModuleTocOpen(false)}
                        className="p-1 rounded-lg hover:bg-slate-100 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                        aria-label="Tutup daftar isi"
                      >
                        <X
                          className="w-4 h-4 text-slate-500"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <nav
                      className="max-h-[60vh] overflow-y-auto py-1"
                      aria-label="Navigasi bagian modul"
                    >
                      {selectedModule.tableOfContents.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full text-left px-3 py-2.5 text-xs sm:text-sm transition-colors cursor-pointer min-h-[44px] flex items-center ${
                            activeSectionId === item.id
                              ? "bg-blue-50 text-blue-700 font-semibold"
                              : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                          }`}
                        >
                          {item.title}
                        </button>
                      ))}
                    </nav>
                  </div>
                )}
              </div>
            )}

            {/* MOBILE: Tombol hamburger menu - hanya muncul di lg ke bawah */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-600" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5 text-slate-600" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU - hanya muncul di lg ke bawah saat menu dibuka */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white animate-slide-down">
          <nav
            className="px-4 py-4 space-y-2 max-h-[70vh] overflow-y-auto"
            aria-label="Menu mobile"
          >
            {/* MOBILE: Navigasi Landing Page */}
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`w-full px-3 py-3 rounded-xl transition-colors cursor-pointer flex items-center gap-3 text-left min-h-[48px] text-base ${
                isLanding
                  ? "text-blue-600 bg-blue-50 font-extrabold"
                  : "hover:text-blue-600 hover:bg-slate-100 text-slate-600"
              }`}
              aria-current={isLanding ? "page" : undefined}
            >
              <Globe className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span>Landing Page</span>
            </Link>

            {/* MOBILE: Navigasi Modul Belajar */}
            <Link
              href="/modul"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`w-full px-3 py-3 rounded-xl transition-colors cursor-pointer flex items-center gap-3 text-left min-h-[48px] text-base ${
                ismodul || isModule
                  ? "text-blue-600 bg-blue-50 font-extrabold"
                  : "hover:text-blue-600 hover:bg-slate-100 text-slate-600"
              }`}
              aria-current={ismodul || isModule ? "page" : undefined}
            >
              <BookOpen className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span>Modul Belajar</span>
            </Link>

            {/* MOBILE: Daftar isi modul - hanya muncul saat view modul */}
            {isModule && selectedModule && (
              <div className="border-t border-slate-100 pt-2 mt-1">
                <div className="px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Daftar Isi Modul {selectedModule.number}
                </div>
                <nav className="space-y-0.5" aria-label="Navigasi bagian modul">
                  {selectedModule.tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2.5 pl-8 text-sm transition-colors cursor-pointer min-h-[44px] flex items-center ${
                        activeSectionId === item.id
                          ? "bg-blue-50 text-blue-700 font-semibold"
                          : "hover:bg-slate-50 text-slate-700 hover:text-blue-600"
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
