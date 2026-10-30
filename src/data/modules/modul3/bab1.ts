import { ModuleSection } from '../../../types';

export const bab1: ModuleSection = {
  id: "bab1",
  numberPrefix: "1.",
  title: "Sistem Operasi dan Lingkungan Pengembangan",
  paragraphs: [
    "Lingkungan pengembangan adalah gabungan sistem operasi, berkas proyek, perangkat lunak, dan konfigurasi yang diperlukan untuk membuat serta menjalankan aplikasi. Sistem operasi mengatur berkas, proses, perangkat, pengguna, dan izin akses; karena itu pengembang perlu memahami cara proyek disimpan dan dijalankan.",
    "Direktori proyek sebaiknya memiliki pembagian yang dapat dipahami tim, misalnya source code, aset, dokumentasi, dan pengujian. Gunakan path relatif saat merujuk berkas di dalam proyek agar struktur tetap dapat dipindahkan, dan catat perintah instalasi atau menjalankan aplikasi dalam panduan proyek.",
    "Pesan permission denied menunjukkan proses tidak memiliki izin yang dibutuhkan pada berkas atau direktori. Periksa pemilik, izin baca/tulis/jalankan, dan proses yang menjalankan server; berikan izin minimum yang diperlukan sesuai kebijakan sistem, bukan membuka akses seluas-luasnya."
  ],
  bulletPoints: [
    {
      label: "Berkas dan direktori",
      description: "Berkas menyimpan kode, konfigurasi, dokumentasi, atau aset; direktori mengelompokkan berkas agar mudah ditemukan dan dipelihara."
    },
    {
      label: "Path dan ekstensi",
      description: "Path menunjukkan lokasi berkas; path relatif dihitung dari lokasi kerja proyek, sedangkan ekstensi sering membantu mengenali format."
    },
    {
      label: "Izin akses",
      description: "Hak baca, tulis, dan jalankan diberikan sesuai peran pengguna atau proses yang membutuhkan akses."
    },
    {
      label: "Konfigurasi",
      description: "Catat versi runtime, dependensi, dan perintah proyek agar anggota tim dapat menyiapkan lingkungan yang serupa."
    }
  ],
  codeSnippet: {
    language: "text",
    code: "proyek/\n  src/\n  assets/\n  tests/\n  docs/\n  README.md",
    explanation: "Contoh struktur yang memisahkan kode, aset, pengujian, dan dokumentasi."
  }
};
