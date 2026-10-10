import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BookOpen, FileText, Globe, List, Menu, X } from "lucide-react";
import { ModuleContent } from "../types";

interface NavbarProps {
  currentView: string;
  selectedModule: ModuleContent | null;
  quizModuleTab?: number;
  onSelectQuizModule?: (num: number) => void;
  onOpenCheatsheet: () => void;
  onGoHome: () => void;
  onOpenLanding: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  selectedModule,
  quizModuleTab,
  onSelectQuizModule,
  onOpenCheatsheet,
  onGoHome,
  onOpenLanding,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModuleTocOpen, setIsModuleTocOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("");

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsModuleTocOpen(false);
    setActiveSectionId(selectedModule?.tableOfContents[0]?.id || "");
  }, [currentView, selectedModule?.id]);

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsModuleTocOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex lg:grid lg:grid-cols-3 items-center justify-between gap-2">
        <div
          onClick={onOpenLanding}
          className="flex items-center justify-start gap-2 sm:gap-3.5 cursor-pointer group select-none min-w-0"
        >
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
            <Image
              src="/images/brands/TTH-nobg.webp"
              alt="SMK Telekomunikasi Tunas Harapan"
              width={48}
              height={48}
              className="w-full h-full object-contain drop-shadow-lg"
              priority
            />
          </div>

          <div className="min-w-0">
            <div className="text-sm sm:text-base font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors truncate">
              TKA PPLG
            </div>
            <p className="hidden sm:block text-xs font-medium text-slate-500 leading-tight truncate">
              {currentView === "module" && selectedModule
                ? `Modul ${selectedModule.number} • ${selectedModule.cardTitle}`
                : currentView === "quiz"
                  ? "Simulasi Ujian CBT"
                  : "SMK Telekomunikasi Tunas Harapan"}
            </p>
          </div>
        </div>

        {/* DESKTOP NAVIGATION - hanya muncul di layar besar (lg ke atas) */}
        <nav className="hidden lg:flex items-center justify-center gap-1 text-xs font-bold text-slate-600">
          <button
            onClick={onOpenLanding}
            className={`px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${currentView === "landing"
                ? "text-blue-600 bg-blue-50 font-extrabold shadow-2xs"
                : "hover:text-blue-600 hover:bg-slate-100 text-slate-600"
              }`}
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>Landing Page</span>
          </button>

          <button
            onClick={onGoHome}
            className={`px-3 py-2 rounded-xl transition-colors cursor-pointer ${currentView === "dashboard" || currentView === "module"
                ? "text-blue-600 bg-blue-50 font-extrabold shadow-2xs"
                : "hover:text-blue-600 hover:bg-slate-100 text-slate-600"
              }`}
          >
            Modul Belajar
          </button>
        </nav>

        <div className="flex items-center justify-end gap-1.5 sm:gap-3">
          {/* DESKTOP: Dropdown daftar isi modul - hanya muncul di lg ke atas */}
          {currentView === "module" && selectedModule && (
            <div className="relative hidden lg:block">
              <button
                onClick={() => setIsModuleTocOpen(!isModuleTocOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50 text-[11px] sm:text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden xs:inline sm:inline">Daftar Isi Modul {selectedModule.number}</span>
              </button>

              {isModuleTocOpen && (
                <div className="absolute right-0 top-full mt-2 w-[min(18rem,calc(100vw-1.5rem))] bg-white rounded-xl border border-slate-200 shadow-lg z-50">
                  <div className="p-3 border-b border-slate-100">
                    <div className="text-xs font-bold text-slate-900">
                      Daftar Isi Modul {selectedModule.number}
                    </div>
                  </div>
                  <nav className="max-h-[70vh] overflow-y-auto py-1">
                    {selectedModule.tableOfContents.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-3 py-2 text-xs transition-colors cursor-pointer ${activeSectionId === item.id
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

          {/* DESKTOP: Tab pilihan modul quiz - hanya muncul di md ke atas */}
          {currentView === "quiz" && onSelectQuizModule && (
            <div className="hidden md:flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => onSelectQuizModule(num)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer ${quizModuleTab === num
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                >
                  M{num}
                </button>
              ))}
            </div>
          )}

          {/* DESKTOP: Tombol cheatsheet - hanya muncul di sm ke atas */}
          {/* <button
            onClick={onOpenCheatsheet}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Rangkuman TKA</span>
          </button> */}

          {/* MOBILE: Tombol hamburger menu - hanya muncul di lg ke bawah */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Buka menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-600" />
            ) : (
              <Menu className="w-5 h-5 text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU - hanya muncul di lg ke bawah saat menu dibuka */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <nav className="px-4 py-3 space-y-1 max-h-[80vh] overflow-y-auto">
            {/* MOBILE: Navigasi Landing Page */}
            <button
              onClick={() => {
                onOpenLanding();
                setIsMobileMenuOpen(false);
              }}
              className={`w-full px-3 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-2 text-left ${currentView === "landing"
                  ? "text-blue-600 bg-blue-50 font-extrabold"
                  : "hover:text-blue-600 hover:bg-slate-100 text-slate-600"
                }`}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm">Landing Page</span>
            </button>

            {/* MOBILE: Navigasi Modul Belajar */}
            <button
              onClick={() => {
                onGoHome();
                setIsMobileMenuOpen(false);
              }}
              className={`w-full px-3 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-2 text-left ${currentView === "dashboard" || currentView === "module"
                  ? "text-blue-600 bg-blue-50 font-extrabold"
                  : "hover:text-blue-600 hover:bg-slate-100 text-slate-600"
                }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Modul Belajar</span>
            </button>

            {/* MOBILE: Daftar isi modul - hanya muncul saat view modul */}
            {currentView === "module" && selectedModule && (
              <div className="border-t border-slate-100 pt-2 mt-2">
                <div className="px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Daftar Isi Modul {selectedModule.number}
                </div>
                {selectedModule.tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-3 py-2 pl-6 text-xs transition-colors cursor-pointer ${activeSectionId === item.id
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "hover:bg-slate-50 text-slate-700 hover:text-blue-600"
                      }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}

            {/* MOBILE: Tab pilihan modul quiz - hanya muncul saat view quiz */}
            {currentView === "quiz" && onSelectQuizModule && (
              <div className="border-t border-slate-100 pt-2 mt-2">
                <div className="px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Soal Per Modul
                </div>
                <div className="px-3 pb-2 flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        onSelectQuizModule(num);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${quizModuleTab === num
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600"
                        }`}
                    >
                      Modul {num}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* MOBILE: Tombol cheatsheet */}
            {/* <button
              onClick={() => {
                onOpenCheatsheet();
                setIsMobileMenuOpen(false);
              }}
              className="w-full px-3 py-2.5 rounded-xl hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-2 text-left text-slate-600"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-sm">Rangkuman TKA</span>
            </button> */}
          </nav>
        </div>
      )}
    </header>
  );
};
