import { HOTSQuestion } from '../../../types';

export const q40: HOTSQuestion = {
  id: 40,
  moduleNum: 4,
  caseText: "Kasus: Manakah dari kompleksitas algoritma berikut yang paling efisien ketika volume data masukan (n) bertambah menjadi miliaran data?",
  options: [
    "O(n^2)",
    "O(2^n)",
    "O(1) - Waktu Konstan",
    "O(n!)"
  ],
  correctIndex: 2,
  explanation: `📌 Kunci Jawaban: O(1) - Waktu Konstan.

🔍 Konsep Dasar Notasi Asimtotik Kompleksitas Algoritma (Big-O Notation):
Notasi Big-O mengukur bagaimana waktu eksekusi atau penggunaan memori suatu algoritma bertumbuh seiring bertambahnya ukuran data masukan ($n$):
Urutan efisiensi dari yang PALING CEPAT (terbaik) hingga PALING LAMBAT (terburuk):
1. $O(1)$ - Waktu Konstan (*Constant Time*): Waktu eksekusi selalu instan dan sama, tidak peduli apakah data berjumlah 10 item atau 10 miliar item! Contoh: Mengakses elemen array berdasarkan indeks (\`arr[5]\`) atau lookup hash table / dictionary key. Ini adalah kompleksitas paling efisien.
2. $O(\\log n)$ - Waktu Logaritmik: Sangat efisien, waktu eksekusi bertambah sangat lambat. Contoh: Binary Search.
3. $O(n)$ - Waktu Linier: Waktu eksekusi berbanding lurus dengan jumlah data. Contoh: Linear Search atau perulangan for tunggal.
4. $O(n^2)$ - Waktu Kuadratik: Buruk untuk data besar karena memakai nested loop (perulangan bersarang bertingkat 2). Contoh: Bubble Sort.
5. $O(2^n)$ - Waktu Eksponensial: Sangat lambat dan membebani sistem. Contoh: Rekursif Fibonacci naif.
6. $O(n!)$ - Waktu Faktorial: Kompleksitas terburuk dan tidak praktis untuk $n > 20$. Contoh: Masalah Traveling Salesperson Problem (TSP) Brute-Force.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A ($O(n^2)$): Keliru. Jika $n = 1.000.000$, jumlah operasi menjadi $1.000.000^2 = 10^{12}$ operasi, komputer akan mengalami freeze.
• Pilihan B ($O(2^n)$): Keliru. Pertumbuhannya sangat eksponensial meledak.
• Pilihan C ($O(1)$ - Waktu Konstan): Tepat dan Benar. Algoritma $O(1)$ selalu membutuhkan waktu yang sama persis (instan) berapa pun besarnya data masukan $n$.
• Pilihan D ($O(n!)$): Keliru. Ini adalah kompleksitas paling lambat dari semua opsi.

💡 Tips Ujian:
Tingkat kecepatan algoritma: **$O(1) > O(\\log n) > O(n) > O(n \\log n) > O(n^2) > O(2^n) > O(n!)$**.`
};
