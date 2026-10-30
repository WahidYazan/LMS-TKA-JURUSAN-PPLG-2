import { HOTSQuestion } from '../../../types';

export const q35: HOTSQuestion = {
  id: 35,
  moduleNum: 4,
  caseText: "Perhatikan potongan program berikut:\n\nnilai = [70, 85, 60, 90]\njumlah_lulus = 0\n\nfor n in nilai:\n    if n >= 75:\n        jumlah_lulus += 1\n\nprint(jumlah_lulus)\n\nBerdasarkan eksekusi program di atas, pada akhir program nilai dari variabel jumlah_lulus yang tercetak adalah...",
  options: [
    "1",
    "2",
    "3",
    "4"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: 2.

🔍 Konsep Dasar & Pemecahan Masalah (Code Tracing Loop & Kondisional):
Program ini menggunakan teknik akumulator untuk menghitung berapa banyak siswa yang nilainya memenuhi kriteria kelulusan (>= 75).
Struktur kode:
1. \`nilai = [70, 85, 60, 90]\` (Daftar 4 nilai)
2. \`jumlah_lulus = 0\` (Variabel pencacah awal)
3. \`for n in nilai:\` (Iterasi memeriksa setiap nilai satu demi satu)
4. \`if n >= 75: jumlah_lulus += 1\` (Jika nilai >= 75, tambahkan pencacah sebanyak 1)

📊 Tabel Pelacakan Eksekusi Lengkap (Execution Tracing):
- Awal: \`jumlah_lulus = 0\`
- Iterasi 1 (n = 70): Apakah 70 >= 75? -> False. \`jumlah_lulus\` tetap = 0.
- Iterasi 2 (n = 85): Apakah 85 >= 75? -> True. \`jumlah_lulus\` bertambah 1 menjadi = 1.
- Iterasi 3 (n = 60): Apakah 60 >= 75? -> False. \`jumlah_lulus\` tetap = 1.
- Iterasi 4 (n = 90): Apakah 90 >= 75? -> True. \`jumlah_lulus\` bertambah 1 menjadi = 2.

Loop selesai. Perintah \`print(jumlah_lulus)\` mencetak angka akhir: **2**.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan 1: Keliru. Hanya menghitung salah satu dari 85 atau 90.
• Pilihan 2: Tepat dan Benar. Ada tepat dua nilai yang lulus, yaitu 85 dan 90.
• Pilihan 3: Keliru. Pengecoh jika siswa salah mengira nilai 70 juga dianggap lulus.
• Pilihan 4: Keliru. Menganggap seluruh elemen dalam list lulus, padahal 70 dan 60 di bawah 75.

💡 Tips Ujian:
Buat coretan tabel iterasi kecil di kertas: catat nilai n, cek kondisi (True/False), dan update nilai akumulator.`
};
