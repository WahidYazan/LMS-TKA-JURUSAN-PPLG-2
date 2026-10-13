"use client";

import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loadQuizQuestions } from "../lib/content";
import { quizQuestionsPPLG } from "../data/quiz";
import { shuffle } from "../lib/shuffle";
import { useContent } from "../hooks/useContent";
import type { QuizQuestion } from "../types";
import {
  Check,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  AlertCircle,
  Bookmark,
  ArrowRight,
  Layers,
  GraduationCap,
} from "lucide-react";

const initialQuestions: QuizQuestion[] = quizQuestionsPPLG.map((q) => ({
  ...q,
  id: String(q.id),
}));

const moduleTitles: Record<number, { title: string; category: string }> = {
  1: { title: "Wawasan Industri & Profesi PPLG", category: "Fondasi Industri" },
  2: { title: "K3LH & Ergonomi Developer", category: "Keselamatan & Budaya" },
  3: { title: "Git Workflow & Basis Data SQL", category: "Perkakas & Database" },
  4: { title: "Algoritma & Pemrograman Berorientasi Objek", category: "Pemrograman OOP" },
  5: { title: "Manajemen Aset & Dasar Pengembangan Gim", category: "Desain & Gim" },
};

interface ShuffledQuestion {
  q: QuizQuestion;
  optionOrder: number[];
}

export const QuizSimulatorView: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: questions, loading } = useContent(loadQuizQuestions, initialQuestions);
  const activeQuestions = questions && questions.length > 0 ? questions : initialQuestions;

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [evaluatedModules, setEvaluatedModules] = useState<Record<number, boolean>>({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Record<string, boolean>>({});

  const activeModuleTab = parseInt(searchParams.get("module") || "1", 10);

  const shuffledByModule = useMemo(() => {
    if (!activeQuestions || activeQuestions.length === 0) return null;
    const map = new Map<number, ShuffledQuestion[]>();
    for (let m = 1; m <= 5; m++) {
      map.set(
        m,
        shuffle(activeQuestions.filter((q) => q.moduleNum === m)).map((q) => ({
          q,
          optionOrder: shuffle([0, 1, 2, 3]),
        }))
      );
    }
    return map;
  }, [activeQuestions]);

  const currentQuestions = shuffledByModule?.get(activeModuleTab) ?? [];
  const totalQuestions = activeQuestions?.length ?? 50;
  const isCurrentModuleEvaluated = evaluatedModules[activeModuleTab] || false;
  const totalAnswered = Object.keys(selectedAnswers).length;
  
  const correctCount = currentQuestions.filter(
    ({ q }) => selectedAnswers[q.id] === q.correctIndex
  ).length;

  const unansweredCount = currentQuestions.filter(
    ({ q }) => selectedAnswers[q.id] === undefined
  ).length;
  const allAnswered =
    currentQuestions.length > 0 &&
    currentQuestions.every(({ q }) => selectedAnswers[q.id] !== undefined);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const toggleBookmark = (questionId: string) => {
    setBookmarkedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleEvaluateModule = (modNum: number) => {
    const moduleQs = shuffledByModule?.get(modNum) ?? [];
    const ready =
      moduleQs.length > 0 &&
      moduleQs.every(({ q }) => selectedAnswers[q.id] !== undefined);
    if (!ready) return;
    setEvaluatedModules((prev) => ({
      ...prev,
      [modNum]: true,
    }));
  };

  const handleResetModule = (modNum: number) => {
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      (shuffledByModule?.get(modNum) ?? []).forEach(({ q }) => delete next[q.id]);
      return next;
    });
    setEvaluatedModules((prev) => ({ ...prev, [modNum]: false }));
  };

  const scrollToQuestion = (qId: string) => {
    const el = document.getElementById(`question-card-${qId}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleTabChange = (num: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("module", num.toString());
    router.push(`/tka/quiz?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentModuleInfo = moduleTitles[activeModuleTab] || {
    title: `Modul ${activeModuleTab}`,
    category: "Kejuruan",
  };

  return (
    <div className="flex-1 bg-[#f8fafc] text-slate-800 font-sans pb-24 lg:pb-16">
      
      {/* EXAM HUD TOP BAR */}
      <div className="bg-[#0b1329] text-white border-b border-slate-800 sticky top-16 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            
            {/* Title & info */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                TKA
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                    Simulasi Asesmen Kejuruan PPLG
                  </h1>
                  <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded font-mono font-bold hidden sm:inline">
                    Pusmendik 2026
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Modul {activeModuleTab}: {currentModuleInfo.title}
                </p>
              </div>
            </div>

            {/* Progress HUD */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              {/* Progress counter */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-sky-300">
                <span>{totalAnswered}/{totalQuestions} Soal</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        {/* MODULE SELECTOR TABS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
          {[1, 2, 3, 4, 5].map((num) => {
            const modInfo = moduleTitles[num];
            const modQs = shuffledByModule?.get(num) ?? [];
            const answeredInMod = modQs.filter(({ q }) => selectedAnswers[q.id] !== undefined).length;
            const isEval = evaluatedModules[num];
            const isActive = activeModuleTab === num;
            const modCorrect = modQs.filter(({ q }) => selectedAnswers[q.id] === q.correctIndex).length;

            return (
              <button
                key={num}
                onClick={() => handleTabChange(num)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[90px] ${
                  isActive
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/25 ring-2 ring-blue-600/30"
                    : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs text-slate-800"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[11px] font-mono font-extrabold uppercase ${isActive ? "text-sky-200" : "text-slate-400"}`}>
                      MODUL 0{num}
                    </span>
                    {isEval ? (
                      <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                        isActive ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"
                      }`}>
                        {modCorrect}/10 Skor
                      </span>
                    ) : (
                      <span className={`text-[10px] font-medium ${isActive ? "text-blue-100" : "text-slate-400"}`}>
                        {answeredInMod}/10
                      </span>
                    )}
                  </div>
                  <h3 className={`text-xs font-bold leading-tight line-clamp-1 ${isActive ? "text-white" : "text-slate-900"}`}>
                    {modInfo.title}
                  </h3>
                </div>

                {/* Micro progress line */}
                <div className={`mt-2 h-1.5 w-full rounded-full overflow-hidden ${isActive ? "bg-white/20" : "bg-slate-100"}`}>
                  <div
                    className={`h-full transition-all duration-300 ${
                      isEval ? "bg-emerald-400" : isActive ? "bg-white" : "bg-blue-600"
                    }`}
                    style={{ width: `${(answeredInMod / 10) * 100}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* TWO-COLUMN LAYOUT: QUESTION STREAM & QUICK JUMP MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* MAIN COLUMN (8 of 12): QUESTION LIST */}
          <main className="lg:col-span-8 space-y-6">
            
            {/* Module Overview Banner */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  {currentModuleInfo.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  Modul {activeModuleTab}: {currentModuleInfo.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Pilihlah salah satu opsi jawaban yang paling tepat berdasarkan studi kasus industri.
                </p>
              </div>

              {isCurrentModuleEvaluated && (
                <div className="flex items-center gap-2">
                  <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    Skor: {correctCount}/10 Benar ({correctCount * 10}%)
                  </div>
                </div>
              )}
            </div>

            {loading && (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="rounded-2xl border border-slate-100 bg-white p-6 animate-pulse space-y-3">
                    <div className="h-4 w-28 bg-slate-200 rounded" />
                    <div className="h-4 w-full bg-slate-200 rounded" />
                    <div className="h-12 w-full bg-slate-100 rounded-xl" />
                  </div>
                ))}
              </div>
            )}

            {/* Questions list */}
            <div className="space-y-6">
              {currentQuestions.map((sq, idx) => {
                const { q, optionOrder } = sq;
                const selectedOpt = selectedAnswers[q.id];
                const isAnswered = selectedOpt !== undefined;
                const isCorrect = selectedOpt === q.correctIndex;
                const isBookmarked = bookmarkedQuestions[q.id];

                return (
                  <div
                    key={q.id}
                    id={`question-card-${q.id}`}
                    className={`scroll-mt-32 rounded-2xl border p-5 sm:p-6 transition-all bg-white shadow-xs ${
                      isCurrentModuleEvaluated
                        ? isCorrect
                          ? "border-emerald-200 ring-1 ring-emerald-500/10"
                          : "border-rose-200 ring-1 ring-rose-500/10"
                        : isAnswered
                          ? "border-blue-200 ring-1 ring-blue-500/10"
                          : "border-slate-200/90 hover:border-slate-300"
                    }`}
                  >
                    {/* Question Card Header */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded-lg bg-slate-900 text-white">
                          No. {idx + 1}
                        </span>
                        <span className="text-xs font-medium text-slate-400">
                          Studi Kasus HOTS
                        </span>
                      </div>

                      <button
                        onClick={() => toggleBookmark(q.id)}
                        className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                          isBookmarked
                            ? "bg-amber-100 text-amber-800"
                            : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                        }`}
                        title="Tandai butir soal untuk review"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">
                          {isBookmarked ? "Ditandai" : "Tandai"}
                        </span>
                      </button>
                    </div>

                    {/* Question Scenario */}
                    <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed mb-5 whitespace-pre-line">
                      {q.caseText}
                    </p>

                    {/* Options list */}
                    <div className="space-y-2.5">
                      {optionOrder.map((origIdx, optIdx) => {
                        const opt = q.options[origIdx];
                        const isThisSelected = selectedOpt === origIdx;
                        const isCorrectOption = origIdx === q.correctIndex;
                        const isWrongSelected = isThisSelected && !isCorrectOption;

                        const letter = String.fromCharCode(65 + optIdx);

                        let optCardStyle = "";
                        let badgeStyle = "";

                        if (isCurrentModuleEvaluated) {
                          if (isCorrectOption) {
                            optCardStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500/20";
                            badgeStyle = "bg-emerald-600 text-white border-emerald-600";
                          } else if (isWrongSelected) {
                            optCardStyle = "border-rose-500 bg-rose-50 text-rose-950 font-semibold ring-1 ring-rose-500/20";
                            badgeStyle = "bg-rose-600 text-white border-rose-600";
                          } else {
                            optCardStyle = "border-slate-200 text-slate-400 bg-slate-50/50";
                            badgeStyle = "bg-slate-100 text-slate-400 border-slate-200";
                          }
                        } else {
                          if (isThisSelected) {
                            optCardStyle = "border-blue-600 bg-blue-50 text-slate-900 font-semibold shadow-xs ring-1 ring-blue-600/30";
                            badgeStyle = "bg-blue-600 text-white border-blue-600";
                          } else {
                            optCardStyle = "border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-700 bg-white";
                            badgeStyle = "bg-slate-100 text-slate-600 border-slate-200 group-hover:border-blue-300";
                          }
                        }

                        return (
                          <div
                            key={origIdx}
                            onClick={() => !isCurrentModuleEvaluated && handleSelectOption(q.id, origIdx)}
                            className={`group p-3 sm:p-3.5 rounded-xl border text-xs sm:text-sm flex items-center gap-3 transition-all min-h-[48px] ${
                              isCurrentModuleEvaluated ? "cursor-default" : "cursor-pointer active:scale-[0.99]"
                            } ${optCardStyle}`}
                          >
                            <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 font-mono text-xs font-extrabold transition-colors ${badgeStyle}`}>
                              {letter}
                            </div>
                            <span className="leading-relaxed break-words flex-1 min-w-0">
                              {opt}
                            </span>
                            {isCurrentModuleEvaluated && isCorrectOption && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
                            )}
                            {isCurrentModuleEvaluated && isWrongSelected && (
                              <XCircle className="w-5 h-5 text-rose-600 shrink-0" aria-hidden="true" />
                            )}
                            {!isCurrentModuleEvaluated && isThisSelected && (
                              <Check className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation Box when Evaluated */}
                    {isCurrentModuleEvaluated && isAnswered && (
                      <div className="mt-4 pt-4 border-t border-slate-100 animate-fade-in">
                        {isCorrect ? (
                          <div className="bg-emerald-50/80 border border-emerald-200 text-emerald-900 text-xs p-3.5 rounded-xl leading-relaxed">
                            <div className="flex items-center gap-1.5 font-bold mb-1">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Jawaban Tepat</span>
                            </div>
                            <p>{q.explanation}</p>
                          </div>
                        ) : (
                          <div className="bg-rose-50/80 border border-rose-200 text-rose-900 text-xs p-3.5 rounded-xl leading-relaxed">
                            <div className="flex items-center gap-1.5 font-bold mb-1">
                              <XCircle className="w-4 h-4 text-rose-600" />
                              <span>Analisis Kurang Tepat</span>
                            </div>
                            <p>
                              Opsi yang benar adalah{" "}
                              <strong>Pilihan {String.fromCharCode(65 + optionOrder.indexOf(q.correctIndex))}</strong>.{" "}
                              {q.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

            {/* Bottom Actions for current module */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              
              {/* Score card summary */}
              {isCurrentModuleEvaluated && (
                <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0 shadow-md shadow-blue-600/20 text-white">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-extrabold text-slate-900">
                      Hasil Evaluasi Modul {activeModuleTab}: {correctCount}/10 Benar
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {correctCount >= 8
                        ? "Luar biasa! Pemahaman konsep kejuruan Anda sudah di atas standar kelulusan asesmen."
                        : correctCount >= 6
                          ? "Bagus! Tinjau kembali beberapa butir soal dengan membaca pembahasan mendalam di atas."
                          : "Perlu penguatan konsep. Buka kembali materi modul pembelajaran terkait."}
                    </p>
                  </div>
                </div>
              )}

              {/* Warning if unanswered */}
              {!isCurrentModuleEvaluated && !allAnswered && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <p className="text-xs text-amber-900 leading-relaxed">
                    Masih ada <strong>{unansweredCount} soal</strong> yang belum dijawab di modul ini. Jawab seluruh 10 soal untuk membuka kunci evaluasi.
                  </p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => handleEvaluateModule(activeModuleTab)}
                  disabled={isCurrentModuleEvaluated || !allAnswered}
                  className={`w-full sm:flex-1 py-3.5 px-6 rounded-xl font-bold text-sm min-h-[48px] flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isCurrentModuleEvaluated || !allAnswered
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-95"
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {isCurrentModuleEvaluated
                      ? "Modul Selesai Diperiksa"
                      : allAnswered
                        ? `Periksa Jawaban Modul ${activeModuleTab}`
                        : `Jawab ${unansweredCount} Soal Lagi`}
                  </span>
                </button>

                {isCurrentModuleEvaluated && (
                  <button
                    onClick={() => handleResetModule(activeModuleTab)}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs min-h-[48px] flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Ulangi Modul</span>
                  </button>
                )}

                {activeModuleTab < 5 && (
                  <button
                    onClick={() => handleTabChange(activeModuleTab + 1)}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs min-h-[48px] flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                  >
                    <span>Lanjut ke Modul {activeModuleTab + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </main>

          {/* SIDEBAR COLUMN (4 of 12): INTERACTIVE QUESTION NAVIGATOR MATRIX */}
          <aside className="lg:col-span-4 sticky top-36 space-y-5">
            
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Navigasi Soal Modul {activeModuleTab}</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  10 Butir Soal
                </span>
              </div>

              {/* Question Number Matrix */}
              <div className="grid grid-cols-5 gap-2 mb-4">
                {currentQuestions.map((sq, idx) => {
                  const isAns = selectedAnswers[sq.q.id] !== undefined;
                  const isEval = isCurrentModuleEvaluated;
                  const isCor = isEval && selectedAnswers[sq.q.id] === sq.q.correctIndex;

                  let matrixBtnStyle = "";
                  if (isEval) {
                    matrixBtnStyle = isCor
                      ? "bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs"
                      : "bg-rose-600 text-white border-rose-600 font-bold shadow-xs";
                  } else {
                    matrixBtnStyle = isAns
                      ? "bg-blue-600 text-white border-blue-600 font-bold shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-blue-50";
                  }

                  return (
                    <button
                      key={sq.q.id}
                      onClick={() => scrollToQuestion(sq.q.id)}
                      className={`h-11 rounded-xl border font-mono text-xs flex items-center justify-center transition-all cursor-pointer ${matrixBtnStyle}`}
                      title={`Lompat ke Soal No. ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="space-y-1.5 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-blue-600 shrink-0" />
                  <span>Terjawab</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-slate-100 border border-slate-300 shrink-0" />
                  <span>Belum Terjawab</span>
                </div>
                {isCurrentModuleEvaluated && (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-emerald-600 shrink-0" />
                      <span>Jawaban Benar</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-rose-600 shrink-0" />
                      <span>Jawaban Kurang Tepat</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Quick Curriculum Alignment Box */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 text-xs">
              <div className="flex items-center gap-2 mb-2 font-bold text-sky-300">
                <GraduationCap className="w-4 h-4 text-sky-400" />
                <span>Standar Asesmen SMK</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Seluruh 50 soal dirancang berbasis studi kasus praktikal (HOTS) sesuai Keputusan Kepala BSKAP Nomor 046/H/KR/2025.
              </p>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
};
