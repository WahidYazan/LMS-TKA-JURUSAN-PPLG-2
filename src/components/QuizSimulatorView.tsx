"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loadQuizQuestions } from "../lib/content";
import { quizQuestionsPPLG } from "../data/quiz";
import { shuffle } from "../lib/shuffle";
import { useContent } from "../hooks/useContent";
import type { QuizQuestion } from "../types";

const initialQuestions: QuizQuestion[] = quizQuestionsPPLG.map((q) => ({
  ...q,
  id: String(q.id),
}));
import {
  Check,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Trophy,
  AlertCircle,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

interface ShuffledQuestion {
  q: QuizQuestion;
  optionOrder: number[];
}

export const QuizSimulatorView: React.FC = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [tabsAtStart, setTabsAtStart] = useState(true);
  const [tabsAtEnd, setTabsAtEnd] = useState(false);
  const [tabsScrollable, setTabsScrollable] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: questions, loading } = useContent(loadQuizQuestions, initialQuestions);
  const activeQuestions = questions && questions.length > 0 ? questions : initialQuestions;
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({});
  const [evaluatedModules, setEvaluatedModules] = useState<
    Record<number, boolean>
  >({});

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
        })),
      );
    }
    return map;
  }, [activeQuestions]);

  const currentQuestions = shuffledByModule?.get(activeModuleTab) ?? [];
  const totalQuestions = activeQuestions?.length ?? 50;
  const isCurrentModuleEvaluated = evaluatedModules[activeModuleTab] || false;
  const totalAnswered = Object.keys(selectedAnswers).length;
  const correctCount = currentQuestions.filter(
    ({ q }) => selectedAnswers[q.id] === q.correctIndex,
  ).length;

  const firstUnanswered = currentQuestions.find(
    ({ q }) => selectedAnswers[q.id] === undefined,
  );
  const unansweredCount = currentQuestions.filter(
    ({ q }) => selectedAnswers[q.id] === undefined,
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
      (shuffledByModule?.get(modNum) ?? []).forEach(({ q }) =>
        delete next[q.id],
      );
      return next;
    });
    setEvaluatedModules((prev) => ({ ...prev, [modNum]: false }));
  };

  const scrollToFirstUnanswered = () => {
    if (!firstUnanswered) return;
    const el = document.getElementById(`question-${firstUnanswered.q.id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleTabChange = (num: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("module", num.toString());
    router.push(`/tka/quiz?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateTabNav = (s: SwiperType) => {
    setTabsAtStart(s.progress < 0.02);
    setTabsAtEnd(s.progress > 0.98);
    setTabsScrollable(s.wrapperEl.scrollWidth > s.width + 2);
  };

  useEffect(() => {
    const sync = async () => {
      if (swiperInstance && !swiperInstance.destroyed) {
        swiperInstance.slideTo(activeModuleTab - 1);
        updateTabNav(swiperInstance);
      }
    };
    void sync();
  }, [activeModuleTab, swiperInstance]);

  return (
    <div className="flex-1 bg-[#f8fafc] text-slate-800 font-['Plus_Jakarta_Sans',sans-serif] pb-24 lg:pb-16">
      <div className="max-w-4xl mx-auto px-4 pt-6 sm:pt-8 pb-4 sm:pb-6">
        <div className="flex flex-col items-center text-center mb-6 sm:mb-7">
          {/* <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 border border-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sky-600 mb-3">
            <Sparkles className="w-3 h-3" aria-hidden="true" />
            Simulasi TKA PPLG
          </span> */}
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-sky-600">
            Simulasi TKA PPLG
          </h1>
          <p className="max-w-xl text-sm text-slate-500 mt-2 leading-relaxed">
            50 soal studi kasus industri. Setiap modul memiliki 10 soal HOTS.
            Pilih jawaban yang paling tepat dan periksa jawabanmu.
          </p>
          <div className="flex items-center gap-2 mt-4 text-xs font-semibold">
            <span className="rounded-full bg-white border border-slate-200 px-3 py-1 text-slate-600 shadow-sm">
              {totalAnswered}/{totalQuestions} terjawab
            </span>
            <span className="rounded-full bg-white border border-slate-200 px-3 py-1 text-slate-600 shadow-sm">
              Modul {activeModuleTab} dari 5
            </span>
          </div>
        </div>

        {/* Module Tabs - clickable swiper with scroll indicators */}
        <div
          role="tablist"
          aria-label="Pilih modul ujian"
          className="relative -mx-4 px-4"
        >
          {tabsScrollable && !tabsAtStart && (
            <button
              onClick={() => swiperInstance?.slidePrev(250)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-sky-600 hover:border-sky-300 cursor-pointer transition-colors"
              aria-label="Geser tab modul ke kiri"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
          {tabsScrollable && !tabsAtEnd && (
            <button
              onClick={() => swiperInstance?.slideNext(250)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-sky-600 hover:border-sky-300 cursor-pointer transition-colors"
              aria-label="Geser tab modul ke kanan"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
          <Swiper
            modules={[FreeMode]}
            slidesPerView="auto"
            spaceBetween={10}
            freeMode={{ enabled: true, momentum: true, sticky: true }}
            slideToClickedSlide
            grabCursor
            onSwiper={setSwiperInstance}
            onAfterInit={updateTabNav}
            onProgress={updateTabNav}
            onTransitionEnd={updateTabNav}
            onResize={updateTabNav}
            className={`!py-1 ${tabsScrollable ? "px-9 sm:px-11" : ""}`}
          >
            {[1, 2, 3, 4, 5].map((num) => {
              const isActive = activeModuleTab === num;
              const isEvaluated = evaluatedModules[num];
              const moduleQuestions = shuffledByModule?.get(num) ?? [];
              const answeredCount = moduleQuestions.filter(
                ({ q }) => selectedAnswers[q.id] !== undefined,
              ).length;
              const progress =
                moduleQuestions.length > 0
                  ? Math.round((answeredCount / moduleQuestions.length) * 100)
                  : 0;

              return (
                <SwiperSlide key={num} className="!w-[46%] sm:!w-[150px]">
                  <button
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`quiz-panel-${num}`}
                    onClick={() => handleTabChange(num)}
                    className={`group w-full h-full rounded-2xl p-3 text-left transition-all duration-300 cursor-pointer min-h-[44px] flex flex-col gap-2
                    ${
                      isActive
                        ? "bg-blue-700 text-white shadow-lg shadow-sky-500/30 ring-1 ring-sky-400/50 scale-[1.02]"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-sky-300 hover:shadow-md hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-extrabold shrink-0 transition-colors
                        ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-sky-50 text-sky-600 group-hover:bg-sky-100"
                        }`}
                      >
                        {num}
                      </span>
                      {isEvaluated && (
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? "text-white" : "text-emerald-500"
                          }`}
                          aria-label="Modul sudah diperiksa"
                        />
                      )}
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span
                        className={`text-xs sm:text-sm font-bold ${
                          isActive ? "text-white" : "text-slate-800"
                        }`}
                      >
                        Modul {num}
                      </span>
                      <span
                        className={`text-xs mt-0.5 font-medium ${
                          isActive ? "text-sky-100" : "text-slate-400"
                        }`}
                      >
                        {answeredCount}/{moduleQuestions.length} dijawab
                      </span>
                    </div>
                    <div
                      className={`mt-auto h-1.5 w-full rounded-full overflow-hidden ${
                        isActive ? "bg-white/25" : "bg-slate-100"
                      }`}
                      aria-hidden="true"
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          progress === 100
                            ? "bg-emerald-400"
                            : isActive
                              ? "bg-white"
                              : "bg-sky-500"
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {tabsScrollable && (
            <p className="text-center text-xs sm:text-xs font-semibold text-slate-400 mt-2">
              Geser tab atau tekan panah untuk melihat modul lainnya
            </p>
          )}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs">
          <div
            className="mb-6 sm:mb-8 flex flex-col items-center text-center gap-2"
            role="heading"
            aria-level={2}
            id={`quiz-panel-${activeModuleTab}`}
          >
            <span className="rounded-full bg-blue-500 text-white text-xs sm:text-sm font-bold uppercase tracking-widest px-3 py-1 shadow-sm">
              Modul {activeModuleTab}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-800">
              Evaluasi Modul {activeModuleTab}
            </h2>
            <p className="text-sm text-slate-500 mt-0.5 max-w-md leading-relaxed">
              Analisis skenario studi kasus berikut dan pilih jawaban yang
              paling tepat.
            </p>
          </div>

          {loading && (
            <div className="space-y-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 sm:p-5 animate-pulse"
                >
                  <div className="h-4 w-24 bg-slate-200 rounded-lg mb-3" />
                  <div className="h-3 w-full bg-slate-200 rounded mb-1.5" />
                  <div className="h-3 w-2/3 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          )}

          <div className="space-y-6">
            {currentQuestions.map((sq, idx) => {
              const { q, optionOrder } = sq;
              const selectedOpt = selectedAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 sm:p-5 transition-colors hover:border-slate-200"
                  role="group"
                  aria-labelledby={`question-${q.id}`}
                >
                  <div className="flex items-start gap-2.5 mb-3">
                    <span
                      className="bg-sky-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-lg shrink-0 mt-0.5 shadow-sm shadow-sky-600/25"
                      id={`question-${q.id}`}
                    >
                      No.{idx + 1}
                    </span>
                    <p className="text-sm font-semibold text-slate-800 leading-relaxed whitespace-pre-line flex-1 min-w-0">
                      {q.caseText}
                    </p>
                  </div>
                  <div className="space-y-2 ml-0 sm:ml-8">
                    {optionOrder.map((origIdx, optIdx) => {
                      const opt = q.options[origIdx];
                      const isThisSelected = selectedOpt === origIdx;
                      const isCorrectOption = origIdx === q.correctIndex;
                      const isWrongSelected =
                        isThisSelected && !isCorrectOption;

                      const letter = String.fromCharCode(65 + optIdx);
                      let optionClass = "";
                      let badgeClass = "";

                      if (isCurrentModuleEvaluated) {
                        if (isCorrectOption) {
                          optionClass =
                            "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold shadow-sm shadow-emerald-500/10";
                          badgeClass =
                            "border-emerald-600 bg-emerald-600 text-white";
                        } else if (isWrongSelected) {
                          optionClass =
                            "border-rose-500 bg-rose-50 text-rose-900 font-semibold shadow-sm shadow-rose-500/10";
                          badgeClass = "border-rose-600 bg-rose-600 text-white";
                        } else {
                          optionClass = "border-slate-200 text-slate-400";
                          badgeClass =
                            "border-slate-200 bg-white text-slate-300";
                        }
                      } else {
                        optionClass = isThisSelected
                          ? "border-sky-500 bg-sky-50/60 text-slate-900 font-semibold shadow-sm shadow-sky-500/15 ring-1 ring-sky-500/20"
                          : "border-slate-200 bg-white hover:bg-slate-50 hover:border-sky-300 text-slate-700";
                        badgeClass = isThisSelected
                          ? "border-sky-600 bg-sky-600 text-white"
                          : "border-slate-300 bg-white text-slate-500 group-hover:border-sky-400 group-hover:text-sky-600";
                      }

                      return (
                        <div
                          key={origIdx}
                          onClick={() =>
                            !isCurrentModuleEvaluated &&
                            handleSelectOption(q.id, origIdx)
                          }
                          role="radio"
                          aria-checked={isThisSelected}
                          aria-disabled={isCurrentModuleEvaluated}
                          className={`group p-3 sm:p-3.5 rounded-xl border text-xs sm:text-sm flex items-center gap-3 transition-all duration-200 min-h-[48px] ${
                            isCurrentModuleEvaluated
                              ? "cursor-default"
                              : "cursor-pointer active:scale-[0.99]"
                          } ${optionClass}`}
                          tabIndex={isCurrentModuleEvaluated ? -1 : 0}
                          onKeyDown={(e) => {
                            if (
                              !isCurrentModuleEvaluated &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault();
                              handleSelectOption(q.id, origIdx);
                            }
                          }}
                        >
                          <div
                            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg border flex items-center justify-center shrink-0 text-xs sm:text-sm font-extrabold transition-colors ${badgeClass}`}
                            aria-hidden="true"
                          >
                            {letter}
                          </div>
                          <span className="leading-relaxed break-words flex-1 min-w-0">
                            {opt}
                          </span>
                          {isCurrentModuleEvaluated && isCorrectOption && (
                            <CheckCircle2
                              className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0"
                              aria-hidden="true"
                            />
                          )}
                          {isCurrentModuleEvaluated && isWrongSelected && (
                            <XCircle
                              className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 shrink-0"
                              aria-hidden="true"
                            />
                          )}
                          {!isCurrentModuleEvaluated && isThisSelected && (
                            <Check
                              className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 shrink-0"
                              aria-hidden="true"
                            />
                          )}
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
                                {optionOrder.indexOf(q.correctIndex) + 1}.{" "}
                                {q.explanation}
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

          <div className="mt-8 sm:mt-10 pt-6 border-t border-slate-100 space-y-4">
            {isCurrentModuleEvaluated && (
              <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4 sm:p-5 flex items-center gap-4 animate-fade-in">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-sky-500 flex items-center justify-center shrink-0 shadow-lg shadow-sky-500/25">
                  <Trophy
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base sm:text-lg font-extrabold text-slate-800">
                    {correctCount}/{currentQuestions.length} Benar
                  </p>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {correctCount === currentQuestions.length
                      ? "Sempurna! Kamu menguasai modul ini."
                      : correctCount >= 7
                        ? "Bagus! Sedikit lagi menuju sempurna."
                        : "Tingkatkan lagi, baca pembahasan tiap soal."}
                  </p>
                  <div className="mt-2 h-2 w-full rounded-full bg-white border border-sky-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-sky-500 transition-all duration-700"
                      style={{
                        width: `${Math.round((correctCount / currentQuestions.length) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {!isCurrentModuleEvaluated && !allAnswered && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-start gap-2.5 animate-fade-in">
                <AlertCircle
                  className="w-4 h-4 text-amber-600 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-xs sm:text-sm font-semibold text-amber-800 leading-relaxed">
                  Masih ada{" "}
                  <span className="font-extrabold">{unansweredCount}</span> soal
                  yang belum dijawab di Modul {activeModuleTab}. Jawab semua
                  soal dulu untuk memeriksa jawabanmu.
                  <button
                    type="button"
                    onClick={scrollToFirstUnanswered}
                    className="ml-1.5 underline underline-offset-2 text-amber-900 hover:text-amber-700 cursor-pointer font-bold"
                  >
                    Ke soal berikutnya
                  </button>
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleEvaluateModule(activeModuleTab)}
                className={`flex-1 py-3.5 sm:py-4 text-white font-bold text-sm rounded-xl min-h-[48px] flex items-center justify-center gap-2 transition-all ${
                  isCurrentModuleEvaluated || !allAnswered
                    ? "bg-slate-300 cursor-not-allowed shadow-none"
                    : "bg-sky-500 hover:bg-sky-600 shadow-lg shadow-sky-600/25 hover:shadow-sky-600/35 active:scale-[0.99] cursor-pointer"
                }`}
                disabled={isCurrentModuleEvaluated || !allAnswered}
                aria-disabled={isCurrentModuleEvaluated || !allAnswered}
              >
                {isCurrentModuleEvaluated || !allAnswered ? (
                  <AlertCircle className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Check className="w-4 h-4" aria-hidden="true" />
                )}
                {isCurrentModuleEvaluated
                  ? "Sudah Diperiksa"
                  : allAnswered
                    ? `Periksa Jawaban Modul ${activeModuleTab}`
                    : `Isi ${unansweredCount} Soal Lagi`}
              </button>

              {isCurrentModuleEvaluated && (
                <button
                  onClick={() => handleResetModule(activeModuleTab)}
                  className="sm:w-auto px-5 py-3.5 sm:py-4 bg-white border border-slate-200 hover:border-sky-300 hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl min-h-[48px] flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99]"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  Ulangi Modul
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-40 animate-slide-up">
        <div className="max-w-4xl mx-auto px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-between gap-3">
            {/*<Link
              href="/tka/modul"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer min-h-[44px] border border-slate-200"
            >
              <ArrowBigLeft
                className="w-4 h-4 text-slate-400"
                aria-hidden="true"
              />
              <span className="hidden">Menu</span>
            </Link>*/}

            <div className="flex items-center gap-3 flex-1">
              <button
                onClick={() => handleTabChange(activeModuleTab - 1)}
                disabled={activeModuleTab <= 1}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-xs min-h-[44px] transition-all cursor-pointer ${
                  activeModuleTab <= 1
                    ? "bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed"
                    : "bg-white border border-slate-200 hover:bg-slate-50 hover:border-sky-300 text-slate-700 shadow-sm active:scale-[0.98]"
                }`}
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                <span>Prev</span>
              </button>

              <div className="flex-none flex flex-col items-center gap-1.5 px-1">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                  Modul {activeModuleTab}/5
                </span>
                <div className="flex gap-1" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        n === activeModuleTab
                          ? "w-4 bg-sky-600"
                          : evaluatedModules[n]
                            ? "w-1.5 bg-emerald-400"
                            : "w-1.5 bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleTabChange(activeModuleTab + 1)}
                disabled={activeModuleTab >= 5}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-xs min-h-[44px] transition-all cursor-pointer ${
                  activeModuleTab >= 5
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-600/25 active:scale-[0.98]"
                }`}
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
