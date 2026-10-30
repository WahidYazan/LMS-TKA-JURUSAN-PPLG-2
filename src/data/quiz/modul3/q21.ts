import { HOTSQuestion } from '../../../types';

export const q21: HOTSQuestion = {
  id: 21,
  moduleNum: 3,
  caseText: "Kasus: Aplikasi mobile siswa mengirim data pengajuan izin ke endpoint server. Data berhasil disimpan di tabel database dan server ingin memberitahu bahwa entitas baru berhasil dibuat. HTTP status code yang wajib dikirim adalah...",
  options: [
    "200 OK",
    "201 Created",
    "204 No Content",
    "404 Not Found"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: 201 Created.

🔍 Konsep Dasar Standar HTTP Status Code (Keluarga 2xx Success):
Protokol HTTP (RFC 7231) mendefinisikan kode status angka 3 digit untuk menginformasikan hasil pemrosesan permintaan dari klien:
- 200 OK: Permintaan standar berhasil diproses (umumnya respons dari metode GET saat membaca data, atau PUT/POST yang tidak menghasilkan rekaman baru).
- 201 Created: Permintaan berhasil dan secara spesifik MENGHASILKAN SUMBER DAYA BARU (resource) di server. Respons ini adalah standar baku RESTful API ketika operasi POST berhasil menyisipkan rekaman baris baru ke dalam database, dan biasanya disertai header *Location* yang memuat URL entitas baru tersebut.
- 204 No Content: Permintaan berhasil diproses oleh server, namun server sengaja tidak mengembalikan konten/badan data apa pun (umumnya dipakai setelah operasi DELETE berhasil).
- 404 Not Found: Klien meminta URL/sumber daya yang tidak ada di server.

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (200 OK): Kurang Spesifik. Meski 200 menandakan sukses, konvensi resmi REST API mewajibkan kode 201 jika aksi tersebut berhasil membuat entitas/data baru.
• Pilihan B (201 Created): Tepat dan Benar. Menandakan entitas baru berhasil disimpan ke dalam basis data.
• Pilihan C (204 No Content): Keliru. 204 berarti tidak ada konten yang dikirim balik (biasanya untuk aksi hapus/DELETE).
• Pilihan D (404 Not Found): Keliru. 404 adalah kode kesalahan klien (*Client Error*) ketika endpoint atau halaman tidak ditemukan.

💡 Tips Ujian:
- Berhasil membaca/mengambil data -> **200 OK**
- Berhasil membuat/menyimpan data baru -> **201 Created**
- Berhasil menghapus tanpa kirim konten balik -> **204 No Content**`
};
