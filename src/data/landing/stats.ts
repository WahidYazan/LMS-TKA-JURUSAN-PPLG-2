import { modulesList } from '../modules';
import { quizQuestionsPPLG } from '../quiz';

export interface LandingStatItem {
  value: string;
  label: string;
  color: string;
  subtitle?: string;
}

// Nilai default dihitung otomatis dari data bundled — jangan hardcode.
// Saat modul/soal bertambah, angka ini ikut bertambah tanpa edit manual.
const totalModules = modulesList.length;
const totalQuestions = quizQuestionsPPLG.length;

export const landingStats: LandingStatItem[] = [
  { value: `${totalModules}`, label: 'Modul Kejuruan', color: 'text-sky-600', subtitle: 'Materi Kejuruan PPLG' },
  { value: `${totalQuestions}+`, label: 'Soal Kasus HOTS', color: 'text-sky-500', subtitle: 'Studi Kasus & Pembahasan' },
  { value: '100%', label: 'Standar BSKAP 2026', color: 'text-amber-500', subtitle: 'Git, SQL, OOP, HTTP' },
  { value: 'Free', label: 'Akses Tanpa Login', color: 'text-emerald-600', subtitle: 'Langsung di Web Browser' },
];
