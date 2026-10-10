import { HOTSQuestion } from '../../../types';

export const q48: HOTSQuestion = {
  id: 48,
  moduleNum: 5,
  caseText: "Kasus: Method khusus dalam class yang otomatis dipanggil saat sebuah objek pertama kali dibuat dengan kata kunci `new` adalah...",
  options: [
    "Destructor",
    "Constructor",
    "Finalizer",
    "Getter"
  ],
  correctIndex: 1,
  explanation: "Constructor menginisialisasi state awal atribut sebuah objek saat dilakukan instansiasi."
};
