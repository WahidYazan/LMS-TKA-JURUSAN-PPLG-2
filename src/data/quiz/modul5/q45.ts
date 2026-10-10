import { HOTSQuestion } from '../../../types';

export const q45: HOTSQuestion = {
  id: 45,
  moduleNum: 5,
  caseText: "Kasus: Karakter gim bergerak dua kali lebih cepat pada monitor 144 FPS dibanding 60 FPS. Untuk memastikan kecepatan gerak seragam di semua perangkat, pengembang wajib mengalikan perpindahan dengan...",
  options: [
    "Ukuran resolusi layar",
    "Time.deltaTime (Waktu interval antar frame)",
    "Jumlah RAM laptop",
    "Kecepatan download internet"
  ],
  correctIndex: 1,
  explanation: "Time.deltaTime menormalkan pergerakan objek berdasarkan satuan detik riil, bukan berdasarkan jumlah frame per detik."
};
