import { HOTSQuestion } from '../../../types';

export const q50: HOTSQuestion = {
  id: 50,
  moduleNum: 5,
  caseText: "Kasus: Siklus utama sebuah gim yang bertugas membaca input, menghitung logika permainan, dan menggambar ulang grafis ke layar secara terus-menerus disebut...",
  options: [
    "Compilation Loop",
    "Game Loop (Update - Render Cycle)",
    "Infinite Stack",
    "Garbage Collector"
  ],
  correctIndex: 1,
  explanation: "Game Loop adalah detak jantung setiap aplikasi gim yang berjalan berulang kali (60 FPS) sepanjang gim aktif."
};
