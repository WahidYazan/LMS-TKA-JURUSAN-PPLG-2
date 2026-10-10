'use client';

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ModuleCard } from './components/ModuleCard';
import { ExamBannerCard } from './components/ExamBannerCard';
import { ModuleReaderView } from './components/ModuleReaderView';
import { QuizSimulatorView } from './components/QuizSimulatorView';
import { CheatsheetModal } from './components/CheatsheetModal';
import { LandingPage } from './components/LandingPage';
import { modulesList } from './data/modules';
import { ModuleContent } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'module' | 'quiz'>('landing');
  const [selectedModule, setSelectedModule] = useState<ModuleContent>(modulesList[0]);
  const [quizModuleTab, setQuizModuleTab] = useState(1);
  const [isCheatsheetOpen, setIsCheatsheetOpen] = useState(false);

  const handleOpenModule = (mod: ModuleContent) => {
    setSelectedModule(mod);
    setCurrentView('module');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextModule = () => {
    const currentIndex = modulesList.findIndex((m) => m.id === selectedModule.id);
    if (currentIndex < modulesList.length - 1) {
      setSelectedModule(modulesList[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const hasNextModule = () => {
    const currentIndex = modulesList.findIndex((m) => m.id === selectedModule.id);
    return currentIndex < modulesList.length - 1;
  };

  const goDashboard = () => {
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar
        currentView={currentView}
        selectedModule={currentView === 'module' ? selectedModule : null}
        quizModuleTab={quizModuleTab}
        onSelectQuizModule={setQuizModuleTab}
        onOpenCheatsheet={() => setIsCheatsheetOpen(true)}
        onGoHome={goDashboard}
        onOpenLanding={() => {
          setCurrentView('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {currentView === 'landing' && (
        <LandingPage
          onEnterLMS={goDashboard}
          onOpenExam={() => {
            setCurrentView('quiz');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentView === 'module' && (
        <ModuleReaderView
          module={selectedModule}
          onBack={goDashboard}
          onNextModule={handleNextModule}
          hasNextModule={hasNextModule()}
        />
      )}

      {currentView === 'quiz' && (
        <QuizSimulatorView
          onBack={goDashboard}
          activeModuleTab={quizModuleTab}
          onTabChange={setQuizModuleTab}
        />
      )}

      {currentView === 'dashboard' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <HeroBanner />

          <section className="mb-10 sm:mb-14">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">
                  Materi Pembelajaran TKA PPLG
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  Kurikulum Pusmendik Kemendikdasmen • Rekayasa Perangkat Lunak dan Gim
                </p>
              </div>
              <span className="text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 w-fit">
                {modulesList.length} Modul
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {modulesList.map((mod) => (
                <ModuleCard key={mod.id} module={mod} onSelect={handleOpenModule} />
              ))}
              <ExamBannerCard
                onStartExam={() => {
                  setCurrentView('quiz');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          </section>
        </main>
      )}

      {isCheatsheetOpen && <CheatsheetModal onClose={() => setIsCheatsheetOpen(false)} />}
    </div>
  );
};
