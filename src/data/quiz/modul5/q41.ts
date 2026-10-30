import { HOTSQuestion } from '../../../types';

export const q41: HOTSQuestion = {
  id: 41,
  moduleNum: 5,
  caseText: "Kasus: Dalam pemrograman berorientasi objek (OOP), entitas yang berperan sebagai cetak biru (blueprint) pendefinisian atribut dan perilaku dinamakan...",
  options: [
    "Object",
    "Class",
    "Variable",
    "Package"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: Class.

🔍 Konsep Dasar Class vs Object dalam Paradigma OOP:
1. Class (Cetak Biru / Blueprint / Template):
   - Merupakan cetak biru konseptual yang mendefinisikan atribut (data/keadaan) dan method (fungsi/perilaku) yang akan dimiliki oleh objek.
   - Bersifat statis di dalam kode program dan belum mengalokasikan ruang memori heap data aktual.
   - Contoh analogi: Gambar arsitektur blueprint sebuah mobil (menentukan ada roda, mesin, warna, dan bisa berjalan).
2. Object (Wujud Nyata / Instansiasi):
   - Merupakan perwujudan konkret dari class yang dibuat di memori RAM melalui kata kunci \`new\` (misal: \`Mobil avanza = new Mobil()\`).
   - Memiliki nilai atribut spesifik (misal warna "Hitam", nomor plat "B 1234 CD").

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (Object): Keliru. Object adalah bentuk nyata hasil cetakan (instansi), bukan cetak birunya.
• Pilihan B (Class): Tepat dan Benar. Class adalah definisi resmi cetak biru (*blueprint*) dalam OOP.
• Pilihan C (Variable): Keliru. Variabel adalah wadah penyimpanan data sederhana di memori.
• Pilihan D (Package): Keliru. Package / Namespace adalah folder pembungkus untuk mengelompokkan beberapa class terkait.

💡 Tips Ujian:
- Cetak biru / rancangan awal -> **Class**
- Wujud konkret di memori -> **Object / Instance**`
};
