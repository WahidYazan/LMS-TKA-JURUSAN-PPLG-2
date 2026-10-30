import { ModuleSection } from '../../../types';

export const bab4: ModuleSection = {
  id: "bab4",
  numberPrefix: "4.",
  title: "Client-Server, HTTP/HTTPS, API, dan Dasar Basis Data",
  paragraphs: [
    "Pada model client-server, client mengirim permintaan melalui jaringan dan server memeriksa permintaan, menjalankan logika, lalu mengirim respons. Aplikasi web sering menggunakan HTTP atau HTTPS; HTTPS melindungi komunikasi melalui TLS. API menetapkan alamat layanan, metode, bentuk data, serta aturan akses yang dapat dipakai client.",
    "Metode HTTP umum meliputi GET untuk membaca, POST untuk mengirim atau membuat, PUT/PATCH untuk memperbarui, dan DELETE untuk menghapus sumber daya. Kode status membantu client memahami hasil, misalnya 200 untuk berhasil, 201 untuk sumber daya baru, 400 untuk permintaan tidak sesuai, 401/403 untuk masalah autentikasi atau izin, 404 untuk sumber daya yang tidak ditemukan, dan 500 untuk kegagalan di server.",
    "Basis data menyimpan data secara terstruktur. Dalam basis data relasional, tabel berisi baris dan kolom; primary key membedakan satu baris, sedangkan foreign key menghubungkan data antartabel. Operasi dasar CRUD berarti membuat, membaca, memperbarui, dan menghapus data. Aplikasi mengaksesnya melalui layanan server atau API; rahasia koneksi tidak boleh disimpan di kode client."
  ],
  bulletPoints: [
    {
      label: "Permintaan dan respons",
      description: "Permintaan memuat metode, alamat, header, dan bila diperlukan body; respons memuat status, header, dan data."
    },
    {
      label: "JSON",
      description: "Format teks terstruktur yang umum dipakai API untuk mengirim pasangan kunci-nilai, daftar, string, angka, boolean, atau null."
    },
    {
      label: "Tabel dan relasi",
      description: "Kolom menjelaskan jenis atribut, baris menyimpan satu rekaman, primary key mengidentifikasi rekaman, dan foreign key menghubungkan tabel."
    },
    {
      label: "Akses data",
      description: "Validasi permintaan dan izin di server; gunakan parameter untuk nilai SQL dan jangan mengirim kredensial basis data ke browser."
    }
  ],
  codeSnippet: {
    language: "sql",
    code: "SELECT nama, kelas\nFROM peserta\nWHERE kelas = 'XI-C';",
    explanation: "Contoh membaca kolom tertentu dari baris yang memenuhi kondisi."
  }
};
