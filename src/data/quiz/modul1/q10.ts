import { HOTSQuestion } from '../../../types';

export const q10: HOTSQuestion = {
  id: 10,
  moduleNum: 1,
  caseText: "Kasus: Tim arsitek software melakukan analisis estimasi kapasitas beban pengguna (concurrent users) dan throughput API sebelum membeli infrastruktur server. Tahap metodologi apakah yang sedang dikerjakan?",
  options: [
    "Inisiasi analisis kebutuhan & arsitektur (Requirement & Capacity Planning)",
    "Pembersihan ruangan server harian",
    "Pembuatan video promosi media sosial",
    "Penulisan dokumentasi pengguna akhir"
  ],
  correctIndex: 0,
  explanation: "Capacity Planning dan analisis kebutuhan non-fungsional dilakukan di awal untuk menentukan spesifikasi infrastruktur sistem."
};
