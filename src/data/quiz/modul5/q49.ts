import { HOTSQuestion } from '../../../types';

export const q49: HOTSQuestion = {
  id: 49,
  moduleNum: 5,
  caseText: "Kasus: Prinsip pertama dari SOLID (Single Responsibility Principle) menegaskan bahwa...",
  options: [
    "Setiap class hanya boleh memiliki satu method saja",
    "Sebuah class hanya boleh memiliki satu alasan untuk berubah (satu tanggung jawab spesifik)",
    "Program harus dijalankan oleh satu user",
    "Database hanya boleh memiliki satu tabel"
  ],
  correctIndex: 1,
  explanation: "SRP menuntut setiap class hanya fokus mengemban satu modul fungsionalitas agar kode modular dan mudah dirawat."
};
