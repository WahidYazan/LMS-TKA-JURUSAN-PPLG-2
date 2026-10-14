"use client";

import { useMemo } from "react";
import { loadModules, loadQuizQuestions } from "../lib/content";
import { computeStats, getLocalStats, type SiteStats } from "../lib/stats";
import { modulesList } from "../data/modules";
import { quizQuestionsPPLG } from "../data/quiz";
import { useContent } from "./useContent";
import type { QuizQuestion } from "../types";

/**
 * Hook tunggal untuk semua kebutuhan hitung modul & soal.
 * Otomatis mengikuti data Supabase bila tersedia, fallback ke data lokal.
 *
 * Pakai di semua komponen client yang sebelumnya menulis angka manual
 * ("5 Modul", "50 Soal", dst):
 *
 * ```tsx
 * const { totalModules, totalQuestions, totalChapters } = useSiteStats();
 * <span>{totalModules} Modul Kejuruan Lengkap</span>
 * <span>{totalQuestions} Soal Studi Kasus HOTS</span>
 * ```
 */
export function useSiteStats(): SiteStats & {
  modules: typeof modulesList;
  questions: QuizQuestion[];
  loading: boolean;
} {
  const { data: modules, loading: modulesLoading } = useContent(
    loadModules,
    modulesList,
  );

  const initialQuestions: QuizQuestion[] = useMemo(
    () => quizQuestionsPPLG.map((q) => ({ ...q, id: String(q.id) })),
    [],
  );
  const { data: questions, loading: questionsLoading } = useContent(
    loadQuizQuestions,
    initialQuestions,
  );

  const displayModules = modules && modules.length > 0 ? modules : modulesList;
  const displayQuestions =
    questions && questions.length > 0 ? questions : initialQuestions;

  const stats: SiteStats = useMemo(
    () => computeStats(displayModules, displayQuestions),
    [displayModules, displayQuestions],
  );

  // Fallback sinkron agar tidak pernah 0 saat first render
  const fallback = useMemo(() => getLocalStats(), []);
  const safe: SiteStats =
    stats.totalModules === 0 && stats.totalQuestions === 0 ? fallback : stats;

  return {
    ...safe,
    modules: displayModules,
    questions: displayQuestions,
    loading: modulesLoading || questionsLoading,
  };
}
