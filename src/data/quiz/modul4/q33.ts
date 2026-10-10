import { HOTSQuestion } from '../../../types';

export const q33: HOTSQuestion = {
  id: 33,
  moduleNum: 4,
  caseText: "Kasus: Struktur perulangan manakah yang dijamin selalu mengeksekusi blok kodenya minimal SATU KALI sebelum kondisi penghentian diperiksa?",
  options: [
    "for loop",
    "while loop",
    "do-while loop",
    "for...in loop"
  ],
  correctIndex: 2,
  explanation: "Pada struktur do-while, evaluasi kondisi berada di bagian akhir perulangan setelah blok instruksi pertama kali dieksekusi."
};
