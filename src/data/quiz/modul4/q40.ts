import { HOTSQuestion } from '../../../types';

export const q40: HOTSQuestion = {
  id: 40,
  moduleNum: 4,
  caseText: "Kasus: Manakah dari kompleksitas algoritma berikut yang paling efisien ketika volume data masukan (n) bertambah menjadi miliaran data?",
  options: [
    "O(n^2)",
    "O(2^n)",
    "O(1) - Waktu Konstan",
    "O(n!)"
  ],
  correctIndex: 2,
  explanation: "O(1) berarti waktu eksekusi selalu instan dan tidak dipengaruhi oleh seberapa banyak data yang ada."
};
