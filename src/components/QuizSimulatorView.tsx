"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { quizQuestionsPPLG } from "../data/quiz";
import {
  ArrowBigLeft,
  Check,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const QuizSimulatorView: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [evaluatedModules, setEvaluatedModules] = useState<
    Record<number, boolean>
  >({});

  const activeModuleTab = parseInt(searchParams.get("module") || "1", 10);
  const currentQuestions = quizQuestionsPPLG.filter(
    (q) => q.moduleNum === activeModuleTab,
  );
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

  const handleTabChange = (num: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("module", num.toString());
    router.push(`/quiz?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex-1 bg-[#f8fafc] text-slate-800 font-['Plus_Jakarta_Sans',sans-serif] pb-16 sm:pb-20">
      <div className="max-w-4xl mx-auto px-4 pt-6 sm:pt-8 pb-4 sm:pb-6">
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-2xl font-bold text-slate-900">
            Simulasi Ujian TKA PPLG
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            50 soal studi kasus industri. Pilih modul, jawab.
          </p>
        </div>

        {/* Module Tabs - Horizontal scroll on mobile, flex on desktop */}
        <div
          className="flex items-center justify-center gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide"
          role="tablist"
          aria-label="Pilih modul ujian"
        >
          {[1, 2, 3, 4, 5].map((num) => {
            const isActive = activeModuleTab === num;
            const isEvaluated = evaluatedModules[num];
            const soalCount = quizQuestionsPPLG.filter(
              (q) => q.moduleNum === num,
            ).length;
            return (
              <button
                key={num}
                onClick={() => handleTabChange(num)}
                role="tab"
                aria-selected={isActive}
                aria-controls={`quiz-panel-${num}`}
                id={`quiz-tab-${num}`}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 min-h-[44px] min-w-[44px] justify-center ${
                  isActive
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex flex-col items-center text-center leading-none">
                  <span className="text-xs sm:text-sm font-bold flex items-center gap-1">
                    Modul {num}
                    {isEvaluated && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </span>
                  <span
                    className={`text- font-medium mt-1 ${isActive ? "text-blue-200" : "text-slate-400"}`}
                  >
                    Berisi {soalCount} Soal
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs">
          <div
            className="mb-6 sm:mb-8"
            role="heading"
            aria-level={2}
            id={`quiz-panel-${activeModuleTab}`}
          >
            <h2 className="text-lg sm:text-2xl font-bold text-slate-900">
              Evaluasi Modul {activeModuleTab}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Analisis skenario studi kasus berikut dan pilih jawaban yang
              paling tepat.
            </p>
          </div>

          <div className="space-y-6">
            {currentQuestions.map((q, idx) => {
              const selectedOpt = selectedAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="pt-2"
                  role="group"
                  aria-labelledby={`question-${q.id}`}
                >
                  <div className="flex items-start gap-2 mb-3">
                    <span
                      className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5 flex-shrink-0"
                      id={`question-${q.id}`}
                    >
                      No.{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed whitespace-pre-line flex-1 min-w-0">
                      {q.caseText}
                    </p>
                  </div>
                  <div className="space-y-2 ml-0 sm:ml-9">
                    {q.options.map((opt, optIdx) => {
                      const isThisSelected = selectedOpt === optIdx;
                      const isCorrectOption = optIdx === q.correctIndex;
                      const isWrongSelected =
                        isThisSelected && !isCorrectOption;

                      let optionClass = "";
                      let radioClass = "";

                      if (isCurrentModuleEvaluated) {
                        if (isCorrectOption) {
                          optionClass =
                            "border-emerald-600 bg-emerald-50/50 text-emerald-900 font-semibold";
                          radioClass = "border-emerald-600 bg-emerald-600";
                        } else if (isWrongSelected) {
                          optionClass =
                            "border-rose-600 bg-rose-50/50 text-rose-900 font-semibold";
                          radioClass = "border-rose-600 bg-rose-600";
                        } else {
                          optionClass =
                            "border-slate-200 text-slate-400 cursor-not-allowed";
                          radioClass = "border-slate-300 bg-white";
                        }
                      } else {
                        optionClass = isThisSelected
                          ? "border-blue-600 bg-blue-50/50 text-slate-900 font-semibold"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700";
                        radioClass = isThisSelected
                          ? "border-blue-600 bg-blue-600"
                          : "border-slate-300 bg-white";
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() =>
                            !isCurrentModuleEvaluated &&
                            handleSelectOption(q.id, optIdx)
                          }
                          role="radio"
                          aria-checked={isThisSelected}
                          aria-disabled={isCurrentModuleEvaluated}
                          className={`p-3 sm:p-3.5 rounded-xl border text-xs sm:text-sm flex items-center gap-3 transition-all min-h-[48px] ${
                            isCurrentModuleEvaluated
                              ? "cursor-default"
                              : "cursor-pointer"
                          } ${optionClass}`}
                          tabIndex={isCurrentModuleEvaluated ? -1 : 0}
                          onKeyDown={(e) => {
                            if (
                              !isCurrentModuleEvaluated &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault();
                              handleSelectOption(q.id, optIdx);
                            }
                          }}
                        >
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 flex-shrink-0 ${radioClass}`}
                            aria-hidden="true"
                          >
                            {(isThisSelected || isCorrectOption) &&
                            isCurrentModuleEvaluated ? (
                              <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                            ) : isThisSelected && !isCurrentModuleEvaluated ? (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            ) : isWrongSelected && isCurrentModuleEvaluated ? (
                              <XCircle className="w-2.5 h-2.5 text-rose-600" />
                            ) : null}
                          </div>
                          <span className="leading-relaxed break-words">
                            {opt}
                          </span>
                        </div>
                      );
                    })}

                    {isCurrentModuleEvaluated && isAnswered && (
                      <div className="pt-2 animate-fade-in">
                        {isCorrect ? (
                          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3.5 rounded-xl flex items-start gap-2">
                            <CheckCircle2
                              className="w-4 h-4 flex-shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <div>
                              <span className="font-bold">
                                Analisis benar.{" "}
                              </span>
                              <span>{q.explanation}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3.5 rounded-xl flex items-start gap-2">
                            <XCircle
                              className="w-4 h-4 flex-shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <div>
                              <span className="font-bold">
                                Analisis kurang tepat.{" "}
                              </span>
                              <span>
                                Kunci yang benar adalah pilihan ke{" "}
                                {q.correctIndex + 1}. {q.explanation}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 sm:mt-10 pt-6 border-t border-slate-100">
            <button
              onClick={() => handleEvaluateModule(activeModuleTab)}
              className="w-full py-3.5 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer min-h-[48px] flex items-center justify-center gap-2"
              disabled={isCurrentModuleEvaluated}
              aria-disabled={isCurrentModuleEvaluated}
            >
              <Check className="w-4 h-4" aria-hidden="true" />
              {isCurrentModuleEvaluated
                ? "Sudah Diperiksa"
                : `Periksa Jawaban Modul ${activeModuleTab}`}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
