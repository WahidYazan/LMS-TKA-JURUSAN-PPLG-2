import { HOTSQuestion } from '../../../types';

export const q37: HOTSQuestion = {
  id: 37,
  moduleNum: 4,
  caseText: "Kasus: Kode program berulang kali melakukan hal yang sama tanpa pernah memenuhi kondisi terminasi keluar. Keadaan galat ini dinamakan...",
  options: [
    "Memory Leak",
    "Infinite Loop (Perulangan Tak Hingga)",
    "Syntax Exception",
    "Null Pointer Error"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: Infinite Loop (Perulangan Tak Hingga).

🔍 Konsep Dasar Kondisi Terminasi & Logika Perulangan (Looping Control):
Setiap struktur perulangan (while, for, do-while) membutuhkan tiga komponen dasar:
1. Inisialisasi: Menetapkan nilai awal variabel iterator (misal: \`i = 0\`).
2. Kondisi Terminasi / Uji Keluar: Ekspresi boolean penentu apakah loop boleh lanjut atau harus berhenti (misal: \`i < 10\`).
3. Pembaruan Variabel (*Increment / Decrement*): Langkah perubahan nilai variabel pada setiap putaran (misal: \`i++\`).

Penyebab Infinite Loop:
Jika programmer lupa menambahkan kenaikan nilai (\`i++\`), salah menulis tanda operator logika, atau kondisi terminasi selalu dievaluasi menghasilkan nilai True (misal: \`while (true)\` tanpa klausa \`break\`), maka perulangan tidak akan pernah berakhir (*never terminates*). Program akan mengalami *hang*, membekukan antarmuka pengguna (UI freeze), dan memakan 100% kapasitas inti CPU.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (Memory Leak): Keliru. Memory Leak adalah kegagalan membebaskan memori RAM yang sudah tidak terpakai sehingga penggunaan RAM terus membengkak perlahan, bukan perulangan kode yang terjebak tanpa henti.
• Pilihan B (Infinite Loop / Perulangan Tak Hingga): Tepat dan Benar. Ini adalah istilah baku untuk perulangan tanpa henti akibat ketiadaan kondisi terminasi yang valid.
• Pilihan C (Syntax Exception): Keliru. Kesalahan sintaks terjadi saat kode dikompilasi atau diparsing sebelum program dijalankan (misal kurang tanda titik koma atau kurung tutup).
• Pilihan D (Null Pointer Error): Keliru. Terjadi saat kode mencoba memanggil metode atau mengakses properti dari objek yang bernilai null/kosong.

💡 Tips Ujian:
Kondisi di mana perulangan "tidak pernah berhenti" atau "kondisi keluar tidak pernah terpenuhi" selalu disebut **Infinite Loop**.`
};
