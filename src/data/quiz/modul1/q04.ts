import { HOTSQuestion } from '../../../types';

export const q04: HOTSQuestion = {
  id: 4,
  moduleNum: 1,
  caseText: "Kasus: Tim pengembang perangkat lunak mengerjakan proyek rintisan dengan kebutuhan fitur yang kerap berubah setiap minggu. Mereka membagi waktu ke dalam siklus kerja 2 mingguan dan mengadakan rapat evaluasi harian 15 menit. Metodologi yang sedang diterapkan adalah...",
  options: [
    "Waterfall Sequential Model",
    "Agile Scrum Framework",
    "Big Bang Development",
    "Spiral Model 1988"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: Agile Scrum Framework.

🔍 Konsep Dasar & Karakteristik Metodologi Scrum:
Agile Scrum adalah kerangka kerja adaptif dan iteratif yang sangat populer di industri perangkat lunak modern untuk menangani proyek dengan kebutuhan dinamis.
Karakteristik utama Scrum yang terdapat pada kasus ini:
1. Sprint (Siklus Kerja Singkat): Membagi periode pengembangan ke dalam batasan waktu tetap (biasanya 1 hingga 4 minggu, di kasus ini 2 minggu) untuk menghasilkan fitur siap rilis (Potentially Shippable Increment).
2. Daily Standup / Daily Scrum: Rapat koordinasi harian singkat (maksimal 15 menit) di mana setiap anggota menjawab 3 pertanyaan: apa yang dikerjakan kemarin, apa yang akan dikerjakan hari ini, dan kendala apa yang sedang dihadapi (blockers).
3. Kemampuan Adaptasi Cepat: Menerima perubahan kebutuhan (requirements) di awal setiap Sprint baru tanpa merusak ritme tim.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (Waterfall Sequential Model): Keliru. Waterfall bersifat linier dan kaku (analisis -> desain -> koding -> pengujian -> pemeliharaan). Waterfall tidak cocok untuk kebutuhan yang sering berubah mingguan dan tidak menggunakan siklus sprint 2 mingguan atau daily standup harian.
• Pilihan B (Agile Scrum Framework): Tepat dan Benar. Karakteristik siklus 2 mingguan (Sprint) dan rapat harian 15 menit (Daily Standup) adalah ciri khas mutlak dari metodologi Scrum.
• Pilihan C (Big Bang Development): Keliru. Model Big Bang adalah pendekatan tanpa perencanaan terstruktur, di mana kode langsung ditulis sekaligus tanpa tahapan iteratif, sehingga sangat berisiko tinggi gagal total.
• Pilihan D (Spiral Model 1988): Keliru. Model Spiral berfokus pada analisis risiko berulang (Risk Analysis) untuk proyek berskala raksasa, bukan berfokus pada ritme sprint lincah dengan rapat harian 15 menit.

💡 Tips Ujian:
Kombinasi kata kunci "siklus kerja mingguan/Sprint", "rapat evaluasi harian 15 menit (Daily Standup)", dan "kebutuhan yang dinamis/berubah-ubah" adalah penanda pasti dari kerangka kerja Agile Scrum.`
};
