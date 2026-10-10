import { HOTSQuestion } from '../../../types';

export const q36: HOTSQuestion = {
  id: 36,
  moduleNum: 4,
  caseText: "Kasus: Algoritma pencarian yang bekerja dengan cara membagi dua ruang pencarian data terurut secara berulang (divide and conquer) adalah...",
  options: [
    "Linear Search",
    "Binary Search",
    "Bubble Search",
    "Random Search"
  ],
  correctIndex: 1,
  explanation: "Binary Search memiliki kompleksitas waktu O(log n) yang sangat cepat dengan memangkas separuh data setiap langkah."
};
