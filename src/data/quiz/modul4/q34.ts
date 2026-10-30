import { HOTSQuestion } from '../../../types';

export const q34: HOTSQuestion = {
  id: 34,
  moduleNum: 4,
  caseText: "Perhatikan koding berikut:\n\ndef hitung(a, b):\n    hasil = a + b\n    return hasil * 2\n\ndef proses(x):\n    return hitung(x, x + 1) - x\n\nnilai = ...\nprint(nilai)\n\nAgar output program menghasilkan angka 11, maka kode yang harus dilengkapi pada baris 8 adalah...",
  options: [
    "nilai = proses(3)",
    "nilai = hitung(5, 6)",
    "nilai = proses(11)",
    "nilai = proses(hitung(3, 0))"
  ],
  correctIndex: 0,
  explanation: `📌 Kunci Jawaban: nilai = proses(3).

🔍 Konsep Dasar & Pemecahan Masalah (Code Tracing Fungsi Bersarang):
Soal ini menguji kemampuan penalaran tingkat tinggi (HOTS) dalam menelusuri alur fungsi modular dan substitusi aljabar:
1. Fungsi \`hitung(a, b)\`:
   - Menerima dua nilai parameter \`a\` dan \`b\`.
   - Mengembalikan rumus: \`(a + b) * 2\`.
2. Fungsi \`proses(x)\`:
   - Menerima satu nilai parameter \`x\`.
   - Di dalamnya memanggil: \`hitung(x, x + 1) - x\`.
   - Target keluaran yang diinginkan: \`nilai = 11\`.

📊 Langkah Pembuktian Aljabar Cepat:
Substitusikan parameter fungsi \`hitung(x, x + 1)\`:
- a = x, b = x + 1
- hitung = (x + (x + 1)) * 2 = (2x + 1) * 2 = 4x + 2
Lalu kurangkan dengan x sesuai rumus fungsi \`proses(x)\`:
- proses(x) = (4x + 2) - x = 3x + 2
Kita mencari nilai x agar menghasilkan angka 11:
- 3x + 2 = 11
- 3x = 11 - 2 = 9
- x = 9 / 3 = 3
Maka kode pemanggilan yang benar adalah \`nilai = proses(3)\`.

📊 Bedah Uji Coba Setiap Pilihan Jawaban:
• Pilihan A (nilai = proses(3)): Tepat dan Benar.
  - hitung(3, 3 + 1) = hitung(3, 4) = (3 + 4) * 2 = 14.
  - proses(3) = 14 - 3 = 11. Sesuai target soal!
• Pilihan B (nilai = hitung(5, 6)): Keliru.
  - (5 + 6) * 2 = 11 * 2 = 22 (menghasilkan angka 22).
• Pilihan C (nilai = proses(11)): Keliru.
  - hitung(11, 12) = 23 * 2 = 46. Lalu 46 - 11 = 35 (menghasilkan angka 35).
• Pilihan D (nilai = proses(hitung(3, 0))): Keliru.
  - hitung(3, 0) = (3 + 0) * 2 = 6. Lalu proses(6) = 3(6) + 2 = 20 (menghasilkan angka 20).

💡 Tips Ujian:
Sederhanakan fungsi bersarang ke dalam bentuk aljabar matematika sederhana: \`proses(x) = 3x + 2\`. Lalu cari nilai x yang memenuhi persamaan.`
};
