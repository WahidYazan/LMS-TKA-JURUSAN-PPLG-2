import { HOTSQuestion } from '../../../types';

export const q32: HOTSQuestion = {
  id: 32,
  moduleNum: 4,
  caseText: "Kasus: Diberikan pseudocode:\nJIKA nilai >= 75 MAKA status = \"LULUS\"\nSELAIN ITU status = \"REMIDIAL\"\nJika input nilai adalah 75, maka nilai variabel status adalah...",
  options: [
    "REMIDIAL",
    "LULUS",
    "TIDAK DITENTUKAN",
    "ERROR KOMPILASI"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: LULUS.

🔍 Konsep Dasar Operator Relasional & Struktur Percabangan (If-Else):
Dalam logika pemrograman, operator perbandingan digunakan untuk menguji relasi antara dua nilai:
1. Operator Lebih Besar Dari (\`>\`): Hanya bernilai benar jika nilai sisi kiri secara mutlak lebih besar daripada nilai sisi kanan. Jika kondisi adalah \`nilai > 75\` dan input bernilai 75, maka hasilnya adalah False (Remidial) karena 75 tidak lebih besar dari 75.
2. Operator Lebih Besar Dari atau Sama Dengan (\`>=\`): Bernilai benar jika nilai sisi kiri lebih besar ATAU persis sama dengan nilai pembanding sisi kanan.
   - Evaluasi: Apakah 75 >= 75?
   - Jawaban: Ya, **BENAR (True)**.
3. Karena evaluasi kondisi boolean pada klausa \`JIKA\` menghasilkan nilai True, maka blok instruksi utama yang dijalankan adalah \`status = "LULUS"\`, sedangkan blok alternatif \`SELAIN ITU\` (Else) diabaikan.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (REMIDIAL): Keliru. Blok ini hanya akan dieksekusi jika nilai input kurang dari 75 (misal: 74 atau 60).
• Pilihan B (LULUS): Tepat dan Benar. Karena angka 75 memenuhi batas inklusif operator \`>=\`.
• Pilihan C (TIDAK DITENTUKAN): Keliru. Percabangan if-else bersifat deterministik dan selalu memiliki hasil pasti.
• Pilihan D (ERROR KOMPILASI): Keliru. Logika pseudocode di atas valid secara sintaksis dan semantik.

💡 Tips Ujian:
Perhatikan dengan teliti tanda kesamaan (\`=\`) pada operator perbandingan:
- \`n > 75\` -> angka 75 TIDAK LULUS.
- \`n >= 75\` -> angka 75 TERMASUK LULUS.`
};
