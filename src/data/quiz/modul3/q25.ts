import { HOTSQuestion } from '../../../types';

export const q25: HOTSQuestion = {
  id: 25,
  moduleNum: 3,
  caseText: "Kasus: Seorang pengguna mencoba membuka halaman profil teman tanpa login terlebih dahulu. Server backend menolak dengan kode status...",
  options: [
    "401 Unauthorized",
    "200 OK",
    "502 Bad Gateway",
    "301 Moved Permanently"
  ],
  correctIndex: 0,
  explanation: `📌 Kunci Jawaban: 401 Unauthorized.

🔍 Konsep Dasar HTTP Client Error (Keluarga 4xx):
Kategori status 4xx menandakan bahwa kesalahan terjadi pada sisi pengirim permintaan (klien):
- 401 Unauthorized: Klien mencoba mengakses sumber daya yang dilindungi, namun KREDENSIAL AUTENTIKASI TIDAK DISERTAKAN ATAU TIDAK VALID (misalnya belum login, tidak menyertakan JWT token / Bearer token pada header Authorization, atau token sudah kedaluwarsa).
- 403 Forbidden: Klien SUDAH LOGIN dan identitasnya dikenali oleh server, namun klien TIDAK MEMILIKI HAK AKSES / OTORISASI untuk melihat halaman tersebut (misalnya akun siswa biasa mencoba mengakses menu admin kepala sekolah).
- 404 Not Found: Halaman/endpoint yang dituju tidak ada di server.
- 502 Bad Gateway: Server perantara (reverse proxy seperti Nginx) gagal menerima respons valid dari server upstream/aplikasi di belakangnya.
- 301 Moved Permanently: URL halaman telah dipindahkan secara permanen ke alamat baru (Redirection).

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (401 Unauthorized): Tepat dan Benar. Kasus "belum login sama sekali" adalah definisi klasik dari ketiadaan kredensial autentikasi (401).
• Pilihan B (200 OK): Keliru. 200 berarti permintaan berhasil dan data dibuka, padahal kasus menyatakan akses ditolak.
• Pilihan C (502 Bad Gateway): Keliru. 502 adalah masalah infrastruktur server proxy, bukan penolakan izin login pengguna.
• Pilihan D (301 Moved Permanently): Keliru. 301 adalah pengalihan rute domain/URL, bukan urusan otentikasi login.

💡 Tips Ujian:
- Belum login / butuh login -> **401 Unauthorized** (Kurang Autentikasi).
- Sudah login tapi dilarang karena bukan admin -> **403 Forbidden** (Kurang Otorisasi).`
};
