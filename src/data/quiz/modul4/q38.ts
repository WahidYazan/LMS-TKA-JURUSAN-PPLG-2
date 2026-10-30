import { HOTSQuestion } from '../../../types';

export const q38: HOTSQuestion = {
  id: 38,
  moduleNum: 4,
  caseText: "Kasus: Untuk mencegah program crash saat pengguna membagi angka dengan nol (Division by Zero), mekanisme penanganan yang tepat adalah...",
  options: [
    "Mematikan monitor",
    "Menggunakan blok penanganan eksepsi (Try - Catch / Except)",
    "Menghapus variabel pembagi",
    "Mengganti kabel keyboard"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: Menggunakan blok penanganan eksepsi (Try - Catch / Except).

🔍 Konsep Dasar Penanganan Kesalahan Runtime (Exception Handling):
Dalam eksekusi program komputer, kesalahan dibagi menjadi:
1. Syntax Error: Kesalahan tata bahasa penulisan kode, terdeteksi sebelum dijalankan.
2. Runtime Error / Exception: Galat yang terjadi saat program sedang berjalan, seperti pembagian angka dengan nol (*ZeroDivisionError*), file tidak ditemukan (*FileNotFoundError*), atau kegagalan koneksi socket jaringan.

Mekanisme Try-Catch (atau Try-Except pada Python):
- Blok \`try\`: Membungkus baris kode yang berisiko memicu galat runtime.
- Blok \`catch\` / \`except\`: Menangkap objek galat jika terjadi pengecualian (*exception*), lalu mengeksekusi kode mitigasi alternatif (misalnya menampilkan pesan peringatan ramah: "Angka pembagi tidak boleh 0, silakan masukkan angka lain") TANPA menyebabkan aplikasi langsung mati mendadak (*crash/abort*).
- Blok \`finally\`: Instruksi yang selalu dijalankan untuk membersihkan sumber daya (misal menutup koneksi database atau menutup file).

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A & D (Mematikan monitor / Mengganti kabel keyboard): Keliru dan tidak rasional. Masalah kesalahan logika matematika di memori tidak ada kaitannya dengan perangkat keras layar atau kabel.
• Pilihan B (Menggunakan blok penanganan eksepsi Try - Catch / Except): Tepat dan Benar. Ini adalah standar baku industri untuk menangani galat runtime secara elegan (*graceful error handling*).
• Pilihan C (Menghapus variabel pembagi): Keliru. Menghapus variabel justru akan memicu error baru (*NameError / Undefined Variable*).

💡 Tips Ujian:
Penanganan kegagalan tak terduga saat runtime (seperti pembagian nol atau koneksi putus) selalu menggunakan blok struktur **Try - Catch** (atau **Try - Except**).`
};
