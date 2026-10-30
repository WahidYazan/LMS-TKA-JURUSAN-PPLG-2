import { HOTSQuestion } from '../../../types';

export const q22: HOTSQuestion = {
  id: 22,
  moduleNum: 3,
  caseText: "Kasus: Frontend React diakses pada domain `portal.sekolah.id` mencoba memanggil API backend di `api.sekolah.id`, namun browser memblokir permintaan dengan pesan error CORS. Penyebab utamanya adalah...",
  options: [
    "Komputer klien tidak terhubung kabel LAN",
    "Header Access-Control-Allow-Origin belum diizinkan oleh server backend",
    "Versi JavaScript browser terlalu baru",
    "Kabel fiber optik putus"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: Header Access-Control-Allow-Origin belum diizinkan oleh server backend.

🔍 Konsep Dasar Mekanisme Keamanan CORS (Cross-Origin Resource Sharing):
1. Kebijakan Asal Sama (Same-Origin Policy / SOP): Secara bawaan, browser membatasi skrip JavaScript (seperti fetch/axios pada aplikasi frontend React) untuk membaca respons dari domain/origin yang berbeda demi alasan keamanan data pengguna.
2. Definisi Cross-Origin: Dua URL dianggap berbeda asal (berbeda origin) jika berbeda salah satu dari tiga elemen: Protokol (http vs https), Domain/Subdomain (portal.sekolah.id vs api.sekolah.id), atau Port (localhost:3000 vs localhost:8000).
3. Mekanisme CORS: Agar browser mengizinkan frontend di domain A membaca data dari backend di domain B, server backend wajib mengirimkan header respons HTTP khusus:
   \`Access-Control-Allow-Origin: https://portal.sekolah.id\` (atau \`*\` untuk mengizinkan semua domain). Jika server backend tidak mengirimkan header ini, browser akan langsung memblokir data tersebut dan memunculkan error CORS di console inspeksi.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A & D (Kabel LAN tidak terhubung / Kabel FO putus): Keliru. Jika koneksi fisik terputus, pesan yang muncul adalah *ERR_CONNECTION_REFUSED* atau *ERR_NAME_NOT_RESOLVED*, bukan pesan spesifik CORS dari browser.
• Pilihan B (Header Access-Control-Allow-Origin belum diizinkan oleh server backend): Tepat dan Benar. Menambahkan izin origin pada header HTTP respons backend adalah satu-satunya solusi resmi untuk mengatasi isu CORS.
• Pilihan C (Versi JavaScript browser terlalu baru): Keliru. CORS adalah standar protokol keamanan web W3C yang sudah ada di semua versi browser modern.

💡 Tips Ujian:
Kapan pun ada masalah komunikasi beda domain/subdomain di browser bertuliskan "CORS", penyebab dan solusinya selalu berkaitan dengan konfigurasi header HTTP **Access-Control-Allow-Origin** di sisi server backend.`
};
