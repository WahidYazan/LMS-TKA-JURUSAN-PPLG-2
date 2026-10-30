import { HOTSQuestion } from '../../../types';

export const q03: HOTSQuestion = {
  id: 3,
  moduleNum: 1,
  caseText: "Kasus: Tim siswa ingin membuat aplikasi pengingat tugas, tetapi belum tahu apakah calon pengguna benar-benar membutuhkannya. Langkah paling tepat untuk menguji peluang usaha sebelum mengembangkan semua fitur adalah...",
  options: [
    "Membeli server berkapasitas besar agar aplikasi siap menampung semua pengguna",
    "Mewawancarai calon pengguna dan menguji prototipe sederhana terhadap masalah yang ditemukan",
    "Menambahkan sebanyak mungkin fitur sebelum meminta masukan",
    "Menentukan harga berdasarkan harga aplikasi yang paling populer"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: Mewawancarai calon pengguna dan menguji prototipe sederhana terhadap masalah yang ditemukan.

🔍 Konsep Dasar & Metodologi Kewirausahaan Digital (Lean Startup & MVP):
Dalam rekayasa perangkat lunak dan kewirausahaan teknologi modern (Lean Startup Framework), membangun produk tanpa validasi pasar adalah penyebab utama kegagalan startup.
1. Problem-Solution Fit: Tim harus memvalidasi terlebih dahulu apakah masalah yang diangkat benar-benar dirasakan oleh target pengguna (pain points).
2. Minimum Viable Product (MVP) & Prototyping: Daripada menghabiskan waktu dan biaya berbulan-bulan membangun aplikasi secara lengkap, tim cukup membuat prototipe sederhana (misalnya klik interaktif di Figma atau mockup sederhana) untuk diuji langsung kepada calon pengguna guna mendapatkan umpan balik nyata (feedback loop).

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (Membeli server berkapasitas besar...): Keliru. Ini adalah pemborosan modal (capital expense) yang sia-sia jika ternyata aplikasi tidak diminati pengguna. Infrastruktur komputasi awan saat ini dapat diskalakan secara elastis (scalable) saat pengguna sudah tumbuh.
• Pilihan B (Mewawancarai calon pengguna dan menguji prototipe sederhana...): Tepat dan Benar. Pendekatan ini meminimalkan risiko kerugian, menghemat waktu dan biaya, serta memastikan produk yang dikembangkan memang benar-benar memecahkan masalah nyata pengguna.
• Pilihan C (Menambahkan sebanyak mungkin fitur sebelum meminta masukan): Keliru. Fenomena ini disebut "feature bloat" atau asumsi sepihak, yang berujung pada aplikasi yang rumit dan tidak terpakai oleh pengguna.
• Pilihan D (Menentukan harga berdasarkan harga aplikasi yang paling populer): Keliru. Menetapkan harga tanpa mengetahui apakah produk itu sendiri bernilai atau dibutuhkan pengguna tidak menyelesaikan ketidakpastian kebutuhan pasar.

💡 Tips Ujian:
Prinsip validasi ide dalam rekayasa perangkat lunak selalu berfokus pada: "Cari tahu masalah pengguna terlebih dahulu, buat purwarupa (prototipe/MVP), lalu uji umpan balik secepat mungkin dengan biaya seminimal mungkin."`
};
