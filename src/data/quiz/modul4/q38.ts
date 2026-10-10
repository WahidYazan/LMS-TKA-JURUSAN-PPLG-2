import { HOTSQuestion } from '../../../types';

export const q38: HOTSQuestion = {
  id: 38,
  moduleNum: 4,
  caseText: "Kasus: Untuk mencegah program crash saat pengguna membagi angka dengan nol (Division by Zero), mekanisme penanganan yang tepat adalah...",
  options: [
    "Mematikan monitor",
    "Menggunakan blok penanganan eksepsi (Try - Catch / Except)",
    "Menghapus variabel pembagi",
    "Mengganti kabel keyboard"
  ],
  correctIndex: 1,
  explanation: "Blok Try-Catch menangkap runtime error dan mengeksekusi penanganan alternatif tanpa menghentikan aplikasi secara paksa."
};
