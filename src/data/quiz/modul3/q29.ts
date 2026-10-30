import { HOTSQuestion } from '../../../types';

export const q29: HOTSQuestion = {
  id: 29,
  moduleNum: 3,
  caseText: "Kasus: Server backend mengalami crash akibat memori RAM habis saat memproses data kueri besar. Klien web akan menerima balasan HTTP status code...",
  options: [
    "500 Internal Server Error",
    "200 OK",
    "404 Not Found",
    "201 Created"
  ],
  correctIndex: 0,
  explanation: `📌 Kunci Jawaban: 500 Internal Server Error.

🔍 Konsep Dasar HTTP Server Error (Keluarga 5xx):
Kategori status 5xx menandakan bahwa permintaan klien sebenarnya valid, namun SERVER MENGALAMI KEGAGALAN SISTEM atau tidak mampu memproses permintaan tersebut:
- 500 Internal Server Error: Kesalahan umum di mana server aplikasi mengalami kondisi darurat tak terduga (*unhandled exception*), seperti: kehabisan memori (*Out Of Memory / OOM*), runtime error pada kode backend (sintaks error, null pointer exception), atau crash pada proses worker aplikasi.
- 502 Bad Gateway: Server reverse proxy (Nginx) gagal berkomunikasi dengan daemon aplikasi backend.
- 503 Service Unavailable: Server kelebihan beban sementara (*overloaded*) atau sedang dalam mode pemeliharaan (*maintenance*).
- 504 Gateway Timeout: Server proxy tidak menerima respons tepat waktu dari backend database.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (500 Internal Server Error): Tepat dan Benar. Crash internal di sisi server akibat RAM habis atau exception tak tertangani selalu menghasilkan kode HTTP 500.
• Pilihan B & D (200 OK / 201 Created): Keliru. Ini adalah kode sukses, berlawanan dengan kondisi crash.
• Pilihan C (404 Not Found): Keliru. 404 adalah kesalahan klien ketika alamat endpoint tidak ditemukan, bukan kesalahan sistem internal server yang crash.

💡 Tips Ujian:
- Kesalahan berasal dari klien (salah password, salah URL, belum login) -> **Kepala 4xx** (401, 403, 404).
- Kesalahan berasal dari server (kode error, crash, database down, RAM habis) -> **Kepala 5xx** (500, 502, 503).`
};
