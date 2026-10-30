import { HOTSQuestion } from '../../../types';

export const q36: HOTSQuestion = {
  id: 36,
  moduleNum: 4,
  caseText: "Kasus: Algoritma pencarian yang bekerja dengan cara membagi dua ruang pencarian data terurut secara berulang (divide and conquer) adalah...",
  options: [
    "Linear Search",
    "Binary Search",
    "Bubble Search",
    "Random Search"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: Binary Search.

🔍 Konsep Dasar Algoritma Pencarian (Searching Algorithm):
1. Binary Search (Pencarian Biner):
   - Paradigma: *Divide and Conquer* (Bagi dan Taklukkan).
   - Syarat Mutlak: Kumpulan data WAJIB SUDAH TERURUT (sorted array).
   - Cara Kerja: Membandingkan elemen target dengan elemen yang berada tepat di tengah array (middle element). Jika target lebih kecil, pencarian berlanjut ke separuh kiri; jika lebih besar, berlanjut ke separuh kanan. Separuh lainnya langsung diabaikan.
   - Kompleksitas Waktu: $O(\\log n)$. Untuk 1.000.000 data, binary search hanya membutuhkan maksimal sekitar 20 kali perbandingan!
2. Linear Search (Pencarian Berurutan):
   - Memeriksa elemen satu per satu dari awal hingga akhir. Tidak mensyaratkan data terurut, namun lambat pada volume data besar ($O(n)$).

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (Linear Search): Keliru. Linear search menelusuri data secara sekuensial satu per satu dari indeks 0, bukan membagi dua (*divide and conquer*).
• Pilihan B (Binary Search): Tepat dan Benar. Membagi dua ruang pencarian terurut adalah definisi utama dari Binary Search.
• Pilihan C (Bubble Search): Keliru. Istilah ini rancu; yang ada adalah *Bubble Sort* (algoritma pengurutan data bertukar posisi), bukan pencarian.
• Pilihan D (Random Search): Keliru. Memilih elemen secara acak tanpa jaminan efisiensi atau kepastian menemukan data.

💡 Tips Ujian:
Kombinasi kata kunci "data terurut (*sorted*)" dan "membagi dua ruang pencarian (*divide and conquer / memangkas separuh*)" selalu menunjuk pada **Binary Search** dengan kompleksitas $O(\\log n)$.`
};
