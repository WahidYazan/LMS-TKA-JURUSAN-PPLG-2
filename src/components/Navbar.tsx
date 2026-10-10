import React, { useEffect, useState } from 'react';
import { BookOpen, FileText, Globe, List, Menu, X } from 'lucide-react';
import { ModuleContent } from '../types';

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
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsModuleTocOpen(false);
    setActiveSectionId(selectedModule?.tableOfContents[0]?.id || '');
  }, [currentView, selectedModule?.id]);

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsModuleTocOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
        <div
          onClick={onGoHome}
          className="flex items-center gap-2 sm:gap-3.5 cursor-pointer group select-none min-w-0"
        >
          <div className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 p-0.5 shadow-md shadow-blue-500/20 flex items-center justify-center shrink-0">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-1.5 overflow-hidden">
              <svg viewBox="0 0 40 40" className="w-full h-full text-blue-700" fill="currentColor">
                <circle cx="20" cy="20" r="18" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
                <path d="M12 20 L17 14 L18.5 15.5 L15 20 L18.5 24.5 L17 26 Z" fill="#2563eb" />
                <path d="M28 20 L23 14 L21.5 15.5 L25 20 L21.5 24.5 L23 26 Z" fill="#2563eb" />
                <circle cx="20" cy="20" r="2.5" fill="#f59e0b" />
              </svg>
            </div>
            <span className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-900 text-[8px] sm:text-[9px] font-black px-1 rounded-sm shadow-xs border border-white">
              PPLG
            </span>
          </div>

          <div className="min-w-0">
            <div className="text-sm sm:text-base font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors truncate">
              TKA PPLG
            </div>
            <p className="hidden sm:block text-xs font-medium text-slate-500 leading-tight truncate">
              {currentView === 'module' && selectedModule
                ? `Modul ${selectedModule.number} • ${selectedModule.cardTitle}`
                : currentView === 'quiz'
                  ? 'Simulasi Ujian CBT'
                  : 'SMK Telekomunikasi Tunas Harapan'}
            </p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1 text-xs font-bold text-slate-600">
          <button
            onClick={onOpenLanding}
            className={`px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentView === 'landing'
                ? 'text-blue-600 bg-blue-50 font-extrabold shadow-2xs'
                : 'hover:text-blue-600 hover:bg-slate-100 text-slate-600'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>Landing Page</span>
          </button>

          <button
            onClick={onGoHome}
            className={`px-3 py-2 rounded-xl transition-colors cursor-pointer ${
              currentView === 'dashboard' || currentView === 'module'
                ? 'text-blue-600 bg-blue-50 font-extrabold shadow-2xs'
                : 'hover:text-blue-600 hover:bg-slate-100 text-slate-600'
            }`}
          >
            Modul Belajar
          </button>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          {currentView === 'module' && selectedModule && (
            <div className="relative">
              <button
                onClick={() => setIsModuleTocOpen(!isModuleTocOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50 text-[11px] sm:text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden xs:inline sm:inline">Daftar Isi</span>
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
                        className={`w-full text-left px-3 py-2 text-xs transition-colors cursor-pointer ${
                          activeSectionId === item.id
                            ? 'bg-blue-50 text-blue-700 font-semibold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
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

          {currentView === 'quiz' && onSelectQuizModule && (
            <div className="hidden md:flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => onSelectQuizModule(num)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer ${
                    quizModuleTab === num
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  M{num}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={onOpenCheatsheet}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Rangkuman TKA</span>
          </button>

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

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <nav className="px-4 py-3 space-y-1 max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => {
                onOpenLanding();
                setIsMobileMenuOpen(false);
              }}
              className={`w-full px-3 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-2 text-left ${
                currentView === 'landing'
                  ? 'text-blue-600 bg-blue-50 font-extrabold'
                  : 'hover:text-blue-600 hover:bg-slate-100 text-slate-600'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm">Landing Page</span>
            </button>

            <button
              onClick={() => {
                onGoHome();
                setIsMobileMenuOpen(false);
              }}
              className={`w-full px-3 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-2 text-left ${
                currentView === 'dashboard' || currentView === 'module'
                  ? 'text-blue-600 bg-blue-50 font-extrabold'
                  : 'hover:text-blue-600 hover:bg-slate-100 text-slate-600'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Modul Belajar</span>
            </button>

            {currentView === 'module' && selectedModule && (
              <div className="border-t border-slate-100 pt-2 mt-2">
                <div className="px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Daftar Isi Modul {selectedModule.number}
                </div>
                {selectedModule.tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-3 py-2 pl-6 text-xs transition-colors cursor-pointer ${
                      activeSectionId === item.id
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'hover:bg-slate-50 text-slate-700 hover:text-blue-600'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}

            {currentView === 'quiz' && onSelectQuizModule && (
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
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                        quizModuleTab === num
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Modul {num}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                onOpenCheatsheet();
                setIsMobileMenuOpen(false);
              }}
              className="w-full px-3 py-2.5 rounded-xl hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-2 text-left text-slate-600"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-sm">Rangkuman TKA</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
