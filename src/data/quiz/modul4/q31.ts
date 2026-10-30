import { HOTSQuestion } from '../../../types';

export const q31: HOTSQuestion = {
  id: 31,
  moduleNum: 4,
  caseText: "Kasus: Simbol flowchart berbentuk belah ketupat (diamond) dalam standar internasional ISO melambangkan proses...",
  options: [
    "Operasi perhitungan aritmatika",
    "Decision (Percabangan / Pengambilan Keputusan Boolean)",
    "Input data dari scanner",
    "Garis alur perpindahan"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: Decision (Percabangan / Pengambilan Keputusan Boolean).

🔍 Konsep Dasar Simbol Standar Diagram Alir (Flowchart ISO 5807):
Flowchart menggunakan bentuk-bentuk geometris terstandarisasi untuk memvisualisasikan algoritma:
1. Belah Ketupat (Diamond / Rhombus) = **Decision (Keputusan)**: Melambangkan titik evaluasi logika boolean yang menghasilkan dua atau lebih jalur keluaran (misalnya: Ya/Tidak atau Benar/Salah).
2. Persegi Panjang (Rectangle) = **Process**: Melambangkan instruksi pemrosesan data aritmatika atau manipulasi variabel (misal: \`hitung = a + b\`).
3. Jajar Genjang (Parallelogram) = **Input / Output**: Melambangkan operasi pembacaan data masukan (misal: \`input(nama)\`) atau penampilan data luaran (misal: \`print(hasil)\`).
4. Oval / Kapsul (Terminator) = **Start / End**: Menandai titik awal (Mulai) atau titik akhir (Selesai) dari suatu algoritma.
5. Garis Alir Berpanah (Flowline): Menunjukkan arah urutan eksekusi langkah instruksi.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (Operasi perhitungan aritmatika): Keliru. Dilambangkan oleh persegi panjang (*Process*).
• Pilihan B (Decision / Percabangan Boolean): Tepat dan Benar. Belah ketupat adalah simbol mutlak untuk pengambilan keputusan bersyarat (*if-else*).
• Pilihan C (Input data dari scanner): Keliru. Dilambangkan oleh jajar genjang (*Input/Output*).
• Pilihan D (Garis alur perpindahan): Keliru. Dilambangkan oleh garis berpanah (*Flowline*).

💡 Tips Ujian:
- Simbol Belah Ketupat = Percabangan / Logika If-Else (**Decision**)
- Simbol Persegi Panjang = Pemrosesan / Hitungan (**Process**)
- Simbol Jajar Genjang = Baca/Tulis Data (**Input/Output**)
- Simbol Kapsul = Titik Awal/Akhir (**Terminator**)`
};
