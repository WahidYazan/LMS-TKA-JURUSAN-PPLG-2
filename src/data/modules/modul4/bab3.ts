import { ModuleSection } from '../../../types';

export const bab3: ModuleSection = {
  id: "bab3",
  numberPrefix: "3.",
  title: "Percabangan dan Logika Boolean",
  paragraphs: [
    "Percabangan memilih langkah yang dijalankan berdasarkan kondisi. Kondisi biasanya menghasilkan nilai boolean: benar atau salah. Operator perbandingan seperti sama dengan, lebih besar, atau tidak sama dengan dapat digabung menggunakan AND, OR, dan NOT.",
    "Gunakan if untuk satu kondisi, if-else untuk dua jalur, dan rangkaian elif atau bentuk setara untuk beberapa kondisi yang saling diprioritaskan. Urutan pemeriksaan penting: kondisi yang lebih khusus umumnya perlu diperiksa sebelum kondisi umum.",
    "Periksa nilai batas dan kombinasi kondisi. Jika aturan kelulusan adalah nilai minimal 75, maka nilai tepat 75 harus masuk jalur lulus. Uji juga masukan kosong, nilai di bawah batas, di batas, dan di atas batas agar kesalahan logika lebih mudah ditemukan."
  ],
  bulletPoints: [
    {
      label: "if dan else",
      description: "Menjalankan salah satu jalur berdasarkan hasil kondisi."
    },
    {
      label: "elif atau switch",
      description: "Memilih di antara beberapa kondisi atau nilai; gunakan bentuk yang paling jelas untuk aturan masalah."
    },
    {
      label: "AND",
      description: "Hasil benar hanya jika semua kondisi yang digabungkan benar."
    },
    {
      label: "OR dan NOT",
      description: "OR benar bila setidaknya satu kondisi benar; NOT membalik nilai benar atau salah."
    }
  ],
  codeSnippet: {
    language: "python",
    code: "nilai = 82\nif nilai >= 75:\n    status = \"Lulus\"\nelse:\n    status = \"Remedial\"\nprint(status)",
    explanation: "Nilai yang tepat 75 memenuhi kondisi >= 75; operator batas harus sesuai aturan soal."
  }
};
