import { HOTSQuestion } from '../../../types';

export const q03: HOTSQuestion = {
  id: 3,
  moduleNum: 1,
  caseText: "Kasus: Bank nasional menerapkan kebijakan keamanan di mana setiap perangkat komputer kantor, baik yang berada di dalam maupun di luar gedung, wajib melalui verifikasi identitas berlapis sebelum dapat mengakses data nasabah. Pendekatan keamanan siber ini dikenal sebagai...",
  options: [
    "Perimeter Security Tradisional",
    "Zero Trust Architecture (ZTA)",
    "Open Access Policy",
    "Disable All Firewall"
  ],
  correctIndex: 1,
  explanation: "Zero Trust mengasumsikan tidak ada tempat atau jaringan yang aman tanpa verifikasi identitas konstan (Never trust, always verify)."
};
