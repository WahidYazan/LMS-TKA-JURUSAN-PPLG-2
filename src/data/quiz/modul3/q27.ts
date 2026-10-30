import { HOTSQuestion } from '../../../types';

export const q27: HOTSQuestion = {
  id: 27,
  moduleNum: 3,
  caseText: "Kasus: Endpoint REST API dirancang untuk memperbarui seluruh data profil pengguna. HTTP Method standar yang paling tepat digunakan adalah...",
  options: [
    "GET",
    "PUT atau PATCH",
    "DELETE",
    "HEAD"
  ],
  correctIndex: 1,
  explanation: `📌 Kunci Jawaban: PUT atau PATCH.

🔍 Konsep Dasar HTTP Request Methods (Kata Kerja RESTful API / CRUD Mapping):
Arsitektur REST mengikat operasi data CRUD (Create, Read, Update, Delete) ke metode standar HTTP:
1. GET (Read): Mengambil atau membaca data dari server tanpa mengubah keadaan server (*safe & idempotent*).
2. POST (Create): Mengirimkan data baru ke server untuk dibuatkan entitas baru di basis data.
3. PUT (Update / Replace): Memperbarui atau menimpa KESELURUHAN entitas sumber daya yang sudah ada dengan data baru yang dikirimkan.
4. PATCH (Update / Modify): Memperbarui SEBAGIAN atribut entitas (misal: hanya mengganti nomor telepon saja tanpa mengubah field lain).
5. DELETE (Delete): Menghapus sumber daya yang ditentukan di server.
6. HEAD: Mengambil header respons tanpa mengunduh isi badan pesan (*body*).

📊 Bedah Setiap Pilihan Jawaban:
• Pilihan A (GET): Keliru. GET hanya digunakan untuk membaca data, tidak boleh dipakai untuk mengubah status data.
• Pilihan B (PUT atau PATCH): Tepat dan Benar. Kedua metode ini adalah standar baku resmi dalam REST API untuk operasi pembaruan (*update*) data.
• Pilihan C (DELETE): Keliru. DELETE digunakan untuk menghapus entitas data.
• Pilihan D (HEAD): Keliru. HEAD hanya memeriksa status metadata header server tanpa mengembalikan konten.

💡 Tips Ujian:
Pemetaan Standar REST API:
- Create = **POST**
- Read = **GET**
- Update = **PUT** (ganti total) / **PATCH** (ubah sebagian)
- Delete = **DELETE**`
};
