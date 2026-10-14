import { modulesList } from "../data/modules";
import { quizQuestionsPPLG } from "../data/quiz";
import type { ModuleContent, QuizQuestion } from "../types";

export interface SiteStats {
  /** Jumlah modul (otomatis dari data modul, lokal maupun Supabase) */
  totalModules: number;
  /** Jumlah total soal (otomatis dari data quiz) */
  totalQuestions: number;
  /** Jumlah total bab (akumulasi tableOfContents / sections tiap modul) */
  totalChapters: number;
  /** Daftar nomor modul yang ada, terurut. Contoh: [1,2,3,4,5] */
  moduleNumbers: number[];
  /** Jumlah soal per modul. Contoh: { 1: 10, 2: 10 } */
  questionsByModule: Record<number, number>;
}

function chaptersOf(mod: Pick<ModuleContent, "tableOfContents" | "sections">): number {
  return mod.tableOfContents?.length || mod.sections?.length || 0;
}

/**
 * Hitung statistik dari data modul + soal yang diberikan.
 * Satu-satunya tempat logika "menghitung" berada — semua UI wajib pakai ini
 * agar tidak ada lagi angka hardcode seperti "5 Modul" / "50 Soal".
 */
export function computeStats(
  modules: Pick<ModuleContent, "number" | "tableOfContents" | "sections">[],
  questions: Pick<QuizQuestion, "moduleNum">[],
): SiteStats {
  const moduleNumbers = [...new Set(modules.map((m) => m.number))].sort(
    (a, b) => a - b,
  );
  const questionsByModule: Record<number, number> = {};
  for (const q of questions) {
    questionsByModule[q.moduleNum] = (questionsByModule[q.moduleNum] ?? 0) + 1;
  }
  // Pastikan setiap modul punya entri (0 bila belum ada soal)
  for (const n of moduleNumbers) {
    if (questionsByModule[n] === undefined) questionsByModule[n] = 0;
  }
  return {
    totalModules: modules.length,
    totalQuestions: questions.length,
    totalChapters: modules.reduce((sum, m) => sum + chaptersOf(m), 0),
    moduleNumbers,
    questionsByModule,
  };
}

/**
 * Versi sinkron untuk Server Component / fallback awal.
 * Dihitung langsung dari data bundled (src/data/...).
 */
export function getLocalStats(): SiteStats {
  return computeStats(modulesList, quizQuestionsPPLG);
}

/** Jumlah soal untuk satu modul tertentu (0 bila tidak ada). */
export function countQuestionsForModule(
  stats: SiteStats,
  moduleNum: number,
): number {
  return stats.questionsByModule[moduleNum] ?? 0;
}
