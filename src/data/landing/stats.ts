import { modulesList } from '../modules';
import { quizQuestionsPPLG } from '../quiz';

export interface LandingStatItem {
  value: string;
  label: string;
  color: string;
}

// Nilai default dihitung otomatis dari data bundled — jangan hardcode.
// Saat modul/soal bertambah, angka ini ikut bertambah tanpa edit manual.
const totalModules = modulesList.length;
const totalQuestions = quizQuestionsPPLG.length;

export const landingStats: LandingStatItem[] = [
  { value: `${totalModules}`, label: 'Modul Kejuruan', color: 'text-sky-600' },
  { value: `${totalQuestions}+`, label: 'Soal Kasus HOTS', color: 'text-sky-500' },
  { value: '100%', label: 'Standar BSKAP 2026', color: 'text-amber-500' },
  { value: 'Free', label: 'Akses Tanpa Login', color: 'text-emerald-600' },
];
