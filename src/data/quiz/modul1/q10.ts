import { HOTSQuestion } from '../../../types';

export const q10: HOTSQuestion = {
  id: 10,
  moduleNum: 1,
  caseText: "Kasus: Tim arsitek software melakukan analisis estimasi kapasitas beban pengguna (concurrent users) dan throughput API sebelum membeli infrastruktur server. Tahap metodologi apakah yang sedang dikerjakan?",
  options: [
    "Inisiasi analisis kebutuhan & arsitektur (Requirement & Capacity Planning)",
    "Pembersihan ruangan server harian",
    "Pembuatan video promosi media sosial",
    "Penulisan dokumentasi pengguna akhir"
  ],
  correctIndex: 0,
  explanation: `📌 Kunci Jawaban: Inisiasi analisis kebutuhan & arsitektur (Requirement & Capacity Planning).

🔍 Konsep Dasar Kebutuhan Non-Fungsional & Capacity Planning:
Dalam rekayasa perangkat lunak, analisis kebutuhan dibagi menjadi dua:
1. Kebutuhan Fungsional (Functional Requirements): Fitur-fitur apa saja yang dapat dilakukan sistem (misal: user bisa login, menambah produk ke keranjang, cetak struk).
2. Kebutuhan Non-Fungsional (Non-Functional Requirements): Kualitas operasional sistem, seperti:
   - Performa & Throughput (berapa request per detik yang bisa dilayani).
   - Skalabilitas & Konkurensi (mampu menahan berapa ribu pengguna aktif bersamaan / concurrent users).
   - Ketersediaan (Availability 99.99%) dan Keamanan data.

Sebelum membeli atau menyewa klaster server, Software Architect dan System Analyst wajib melakukan *Capacity Planning* (perencanaan kapasitas daya tampung) pada fase analisis kebutuhan awal agar spesifikasi server (RAM, vCPU, bandwidth, IOPS disk) tidak *underpowered* (mengakibatkan server crash saat ramai) atau *overbudget* (terlalu boros biaya).

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (Inisiasi analisis kebutuhan & arsitektur / Requirement & Capacity Planning): Tepat dan Benar. Menghitung beban pengguna bersamaan dan throughput API adalah bagian integral dari analisis kebutuhan arsitektur non-fungsional.
• Pilihan B (Pembersihan ruangan server harian): Keliru. Ini adalah pemeliharaan kebersihan fasilitas fisik (janitorial/facility management).
• Pilihan C (Pembuatan video promosi media sosial): Keliru. Ini adalah aktivitas divisi pemasaran/marketing digital.
• Pilihan D (Penulisan dokumentasi pengguna akhir): Keliru. Dokumentasi petunjuk pengguna (User Manual) dibuat menjelang atau setelah aplikasi selesai dibangun.

💡 Tips Ujian:
Istilah teknis seperti "beban pengguna bersamaan (*concurrent users*)", "Throughput/RPS", "latensi", dan "estimasi kapasitas server" selalu tergolong dalam analisis kebutuhan non-fungsional arsitektur sistem.`
};
