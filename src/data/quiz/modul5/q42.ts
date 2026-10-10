import { HOTSQuestion } from '../../../types';

export const q42: HOTSQuestion = {
  id: 42,
  moduleNum: 5,
  caseText: "Kasus: Seorang programmer menyembunyikan variabel saldo rekening dengan kata kunci `private` dan hanya menyediakan method `getSaldo()` dan `setor()`. Pilar OOP yang diterapkan adalah...",
  options: [
    "Polimorfisme",
    "Enkapsulasi (Encapsulation)",
    "Inheritance",
    "Overriding"
  ],
  correctIndex: 1,
  explanation: "Enkapsulasi membungkus data internal dan membatasi akses langsung dari luar class demi integritas data."
};
