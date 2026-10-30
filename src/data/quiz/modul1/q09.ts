import { HOTSQuestion } from '../../../types';

export const q09: HOTSQuestion = {
  id: 9,
  moduleNum: 1,
  caseText: "Kasus: Tim QA menemukan bahwa fitur pembayaran gagal memproses transaksi ketika pengguna menggunakan mata uang selain Rupiah. Tahap SDLC di mana bug ini harus diperbaiki oleh programmer adalah...",
  options: [
    "Tahap Deployment Akhir",
    "Tahap Implementation / Bug Fixing",
    "Tahap Feasibility Study",
    "Tahap Penandatanganan Kontrak"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: Tahap Implementation / Bug Fixing.

🔍 Konsep Dasar Siklus Hidup Pengembangan Perangkat Lunak (SDLC):
Siklus SDLC standar umumnya terdiri dari:
1. Planning (Perencanaan & Studi Kelayakan).
2. Analysis (Analisis Kebutuhan Sistem & Pembuatan SRS).
3. Design (Perancangan Arsitektur, Basis Data, & Desain UI/UX).
4. Implementation / Coding (Penulisan Kode Program & Bug Fixing).
5. Testing (Pengujian Fungsionalitas & Kualitas oleh QA).
6. Deployment (Penyebaran / Rilis Aplikasi ke Server Produksi).
7. Maintenance (Pemeliharaan & Pembaruan Sistem).

Ketika tim QA melakukan pengujian (fase Testing) dan menemukan kecacatan program (*bug/defect*):
- QA mencatat laporan bug (bug report / issue tracker) lengkap dengan langkah mereproduksi bug (steps to reproduce).
- Laporan tersebut dikembalikan (*routed back*) kepada programmer pada tahap **Implementation / Bug Fixing** untuk diperbaiki baris kodenya, diuji kembali secara lokal, lalu diajukan re-test kepada QA sebelum diizinkan lanjut ke tahap Deployment.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (Tahap Deployment Akhir): Keliru. Tahap deployment adalah saat aplikasi dipublikasikan ke server produksi untuk pengguna nyata. Merilis aplikasi dengan bug fatal yang sudah diketahui adalah kesalahan fatal.
• Pilihan B (Tahap Implementation / Bug Fixing): Tepat dan Benar. Programmer menulis dan memodifikasi logika kode di tahap implementasi untuk memperbaiki kecacatan yang dilaporkan QA.
• Pilihan C (Tahap Feasibility Study): Keliru. Ini adalah studi kelayakan ekonomi, teknis, dan operasional yang dilakukan jauh di awal sebelum proyek disetujui.
• Pilihan D (Tahap Penandatanganan Kontrak): Keliru. Ini adalah proses administratif legal bisnis sebelum proyek dimulai.

💡 Tips Ujian:
Kapan pun ada bug hasil temuan QA, programmer akan memperbaikinya di fase **Implementation / Coding / Bug Fixing**.`
};
