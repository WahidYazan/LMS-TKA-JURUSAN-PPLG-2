import { HOTSQuestion } from '../../../types';

export const q33: HOTSQuestion = {
  id: 33,
  moduleNum: 4,
  caseText: "Kasus: Struktur perulangan manakah yang dijamin selalu mengeksekusi blok kodenya minimal SATU KALI sebelum kondisi penghentian diperiksa?",
  options: [
    "for loop",
    "while loop",
    "do-while loop",
    "for...in loop"
  ],
  correctIndex: 2,
  explanation: `📌 Kunci Jawaban: do-while loop.

🔍 Konsep Dasar Struktur Perulangan (Pre-test Loop vs Post-test Loop):
Bahasa pemrograman membagi perulangan ke dalam dua kategori evaluasi waktu:
1. Entry-Controlled Loop / Pre-test Loop (Contoh: \`while\` dan \`for\`):
   - Kondisi boolean diuji di AWAL (pintu masuk perulangan).
   - Jika sejak awal kondisi sudah bernilai False, maka blok kode di dalamnya TIDAK AKAN PERNAH DIEKSEKUSI SAMA SEKALI (dieksekusi 0 kali).
2. Exit-Controlled Loop / Post-test Loop (Contoh: \`do-while\`):
   - Blok kode instruksi dijalankan terlebih dahulu di awal.
   - Pengecekan kondisi boolean baru dievaluasi di AKHIR blok perulangan (\`while (kondisi);\`).
   - Akibatnya, meskipun kondisi bernilai False sejak putaran pertama, blok kode di dalam \`do\` DIJAMIN TELAH DIJALANKAN MINIMAL SATU KALI.
   - Kasus penggunaan nyata: Menampilkan menu CLI atau formulir input yang harus tampil minimal 1 kali kepada pengguna sebelum meminta input validasi ulang.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A & B (for loop / while loop): Keliru. Keduanya mengevaluasi kondisi di awal; jika kondisi awal salah, kode tidak dijalankan sama sekali (0 kali eksekusi).
• Pilihan C (do-while loop): Tepat dan Benar. Menjamin minimal satu kali eksekusi tanpa memandang nilai kondisi awal.
• Pilihan D (for...in loop): Keliru. Jika kumpulan koleksi/objek kosong, loop ini tidak akan pernah dieksekusi.

💡 Tips Ujian:
- Uji kondisi di awal (bisa 0 kali eksekusi) -> **while** atau **for**
- Uji kondisi di akhir (pasti minimal 1 kali eksekusi) -> **do-while**`
};
