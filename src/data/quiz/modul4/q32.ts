import { HOTSQuestion } from '../../../types';

export const q32: HOTSQuestion = {
  id: 32,
  moduleNum: 4,
  caseText: "Kasus: Diberikan pseudocode:\nJIKA nilai >= 75 MAKA status = \"LULUS\"\nSELAIN ITU status = \"REMIDIAL\"\nJika input nilai adalah 75, maka nilai variabel status adalah...",
  options: [
    "REMIDIAL",
    "LULUS",
    "TIDAK DITENTUKAN",
    "ERROR KOMPILASI"
  ],
  correctIndex: 1,
  explanation: "Operator relasional `>=` (lebih besar sama dengan) mengevaluasi angka 75 sebagai kondisi bernilai benar (True)."
};
