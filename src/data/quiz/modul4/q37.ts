import { HOTSQuestion } from '../../../types';

export const q37: HOTSQuestion = {
  id: 37,
  moduleNum: 4,
  caseText: "Kasus: Kode program berulang kali melakukan hal yang sama tanpa pernah memenuhi kondisi terminasi keluar. Keadaan galat ini dinamakan...",
  options: [
    "Memory Leak",
    "Infinite Loop (Perulangan Tak Hingga)",
    "Syntax Exception",
    "Null Pointer Error"
  ],
  correctIndex: 1,
  explanation: "Infinite loop terjadi ketika ekspresi kondisional perulangan selalu bernilai true sehingga tidak pernah berhenti."
};
