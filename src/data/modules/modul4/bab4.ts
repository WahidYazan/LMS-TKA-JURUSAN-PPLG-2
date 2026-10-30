import { ModuleSection } from '../../../types';

export const bab4: ModuleSection = {
  id: "bab4",
  numberPrefix: "4.",
  title: "Perulangan, Penelusuran, dan Efektivitas Algoritma",
  paragraphs: [
    "Perulangan mengulang langkah untuk setiap elemen atau selama suatu kondisi terpenuhi. For sering dipakai ketika jumlah pengulangan atau daftar elemen diketahui; while cocok ketika pengulangan berakhir setelah kondisi berubah. Beberapa bahasa menyediakan do-while, yang memeriksa kondisi setelah satu kali menjalankan blok.",
    "Saat menelusuri program, catat nilai variabel sebelum dan sesudah setiap iterasi. Perhatikan nilai awal, kondisi berhenti, langkah perubahan, dan apakah elemen terakhir ikut diproses. Penghitung dan akumulator umum digunakan untuk menghitung banyaknya kejadian atau jumlah nilai.",
    "Perulangan yang tidak mengubah kondisi berhenti dapat berjalan tanpa akhir. Periksa batas indeks dan gunakan jumlah pengulangan minimum yang menyelesaikan masalah. Efektivitas juga dipengaruhi banyaknya operasi saat ukuran data bertambah, sehingga pengulangan bersarang perlu ditinjau terhadap kebutuhan."
  ],
  bulletPoints: [
    {
      label: "For",
      description: "Memproses setiap nilai dalam rentang atau koleksi secara berurutan."
    },
    {
      label: "While",
      description: "Mengulang selama kondisi masih benar; pastikan ada langkah yang akhirnya membuat kondisi berhenti."
    },
    {
      label: "Penghitung dan akumulator",
      description: "Penghitung bertambah untuk mencatat kejadian; akumulator memperbarui hasil seperti total atau nilai maksimum."
    },
    {
      label: "Analisis alur",
      description: "Telusuri nilai awal, kondisi, pembaruan, jumlah iterasi, dan keluaran untuk menilai ketepatan serta efisiensi."
    }
  ],
  codeSnippet: {
    language: "python",
    code: "nilai = [70, 85, 60, 90]\njumlah_lulus = 0\nfor n in nilai:\n    if n >= 75:\n        jumlah_lulus += 1\nprint(jumlah_lulus)",
    explanation: "Perulangan memeriksa setiap nilai dan akumulator bertambah untuk nilai yang mencapai batas."
  }
};
