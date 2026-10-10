import React, { useState } from 'react';
import { quizQuestionsPPLG } from '../data/quiz';

interface QuizSimulatorViewProps {
  onBack: () => void;
  activeModuleTab: number;
  onTabChange: (num: number) => void;
}

export const QuizSimulatorView: React.FC<QuizSimulatorViewProps> = ({
  onBack,
  activeModuleTab,
  onTabChange,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [evaluatedModules, setEvaluatedModules] = useState<Record<number, boolean>>({});

  const currentQuestions = quizQuestionsPPLG.filter((q) => q.moduleNum === activeModuleTab);
  const isCurrentModuleEvaluated = evaluatedModules[activeModuleTab] || false;

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleEvaluateModule = (modNum: number) => {
    setEvaluatedModules((prev) => ({
      ...prev,
      [modNum]: true,
    }));
  };

  return (
    <div className="flex-1 bg-[#f8fafc] text-slate-800 font-['Plus_Jakarta_Sans',sans-serif] pb-16 sm:pb-20">
      <div className="max-w-4xl mx-auto px-4 pt-6 sm:pt-8 pb-4 sm:pb-6">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-2xl font-bold text-slate-900">Simulasi Ujian TKA PPLG</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            50 soal studi kasus industri. Pilih modul, jawab, lalu periksa penjelasan.
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {[1, 2, 3, 4, 5].map((num) => {
            const isActive = activeModuleTab === num;
            const isEvaluated = evaluatedModules[num];
            return (
              <button
                key={num}
                onClick={() => {
                  onTabChange(num);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>Modul {num}</span>
                {isEvaluated && <span className="text-[10px]">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-10 shadow-xs">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-2xl font-bold text-slate-900">
              Evaluasi Modul {activeModuleTab}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Analisis skenario studi kasus berikut dan pilih jawaban yang paling tepat.
            </p>
          </div>

          <div className="space-y-8">
            {currentQuestions.map((q, idx) => {
              const selectedOpt = selectedAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={q.id} className="pt-2">
                  <div className="flex items-start gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">
                      No.{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                      {q.caseText}
                    </p>
                  </div>
                  <div className="space-y-2.5 ml-0 sm:ml-9">
                    {q.options.map((opt, optIdx) => {
                      const isThisSelected = selectedOpt === optIdx;
                      const isCorrectOption = optIdx === q.correctIndex;
                      const isWrongSelected = isThisSelected && !isCorrectOption;

                      let optionClass = '';
                      let radioClass = '';

                      if (isCurrentModuleEvaluated) {
                        if (isCorrectOption) {
                          optionClass = 'border-emerald-600 bg-emerald-50/50 text-emerald-900 font-semibold';
                          radioClass = 'border-emerald-600 bg-emerald-600';
                        } else if (isWrongSelected) {
                          optionClass = 'border-rose-600 bg-rose-50/50 text-rose-900 font-semibold';
                          radioClass = 'border-rose-600 bg-rose-600';
                        } else {
                          optionClass = 'border-slate-200 text-slate-400 cursor-not-allowed';
                          radioClass = 'border-slate-300 bg-white';
                        }
                      } else {
                        optionClass = isThisSelected
                          ? 'border-blue-600 bg-blue-50/50 text-slate-900 font-semibold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700';
                        radioClass = isThisSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white';
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => !isCurrentModuleEvaluated && handleSelectOption(q.id, optIdx)}
                          className={`p-3 sm:p-3.5 rounded-xl border text-xs sm:text-sm flex items-center gap-3 transition-all ${
                            isCurrentModuleEvaluated ? 'cursor-default' : 'cursor-pointer'
                          } ${optionClass}`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${radioClass}`}
                          >
                            {(isThisSelected || isCorrectOption) && isCurrentModuleEvaluated ? (
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            ) : isThisSelected && !isCurrentModuleEvaluated ? (
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            ) : null}
                          </div>
                          <span className="leading-relaxed">{opt}</span>
                        </div>
                      );
                    })}

                    {isCurrentModuleEvaluated && isAnswered && (
                      <div className="pt-2">
                        {isCorrect ? (
                          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3.5 rounded-xl">
                            <span className="font-bold">Analisis benar. </span>
                            <span>{q.explanation}</span>
                          </div>
                        ) : (
                          <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3.5 rounded-xl">
                            <span className="font-bold">Analisis kurang tepat. </span>
                            <span>
                              Kunci yang benar adalah pilihan ke {q.correctIndex + 1}.  {q.explanation}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 sm:mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => handleEvaluateModule(activeModuleTab)}
              className="w-full sm:flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              Periksa Jawaban Modul {activeModuleTab}
            </button>
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-5 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
            >
              Kembali
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
