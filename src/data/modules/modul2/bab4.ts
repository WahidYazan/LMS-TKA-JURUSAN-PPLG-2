import { ModuleSection } from '../../../types';

export const bab4: ModuleSection = {
  id: "bab4",
  numberPrefix: "4.",
  title: "Manajemen Aset Fisik & Digital",
  paragraphs: [
    "Aset proyek mencakup barang fisik dan sumber daya digital. Contohnya komputer, perangkat jaringan, media penyimpanan, source code, dokumen kebutuhan, diagram, basis data, gambar, suara, font, akun layanan, dan hasil build. Setiap aset perlu memiliki tujuan, lokasi, penanggung jawab, dan aturan penggunaan yang jelas.",
    "Struktur folder yang konsisten memudahkan tim mencari sumber yang benar, meninjau perubahan, dan menyiapkan rilis. Gunakan nama yang menjelaskan isi, hindari beberapa salinan yang tidak diketahui mana yang terbaru, dan simpan keputusan penting dalam dokumentasi proyek.",
    "Simpan kredensial di pengelola rahasia atau konfigurasi yang tidak dibagikan ke repositori. Buat salinan cadangan sesuai tingkat kepentingan dan uji bahwa data dapat dipulihkan. Untuk aset milik pihak lain, pastikan izin dan lisensinya sesuai."
  ],
  bulletPoints: [
    {
      label: "Inventaris dan tanggung jawab",
      description: "Catat jenis aset, pemilik atau penanggung jawab, lokasi, kondisi, izin akses, dan kebutuhan pemeliharaan."
    },
    {
      label: "Aset fisik",
      description: "Gunakan perangkat sesuai peruntukan, jaga kebersihan dan keamanan penyimpanan, serta laporkan kerusakan atau peminjaman."
    },
    {
      label: "Aset digital",
      description: "Kelola source code, data, media, dokumentasi, dependensi, dan versi rilis agar perubahan dapat dilacak dan digunakan dengan benar."
    },
    {
      label: "Rahasia dan cadangan",
      description: "Batasi akses sesuai kebutuhan, jangan memasukkan kata sandi atau API key ke source code publik, dan siapkan cadangan untuk data penting."
    }
  ],
  codeSnippet: {
    language: "text",
    code: "proyek/\n  docs/\n  src/\n  assets/\n  tests/\n  README.md",
    explanation: "Contoh pembagian direktori sederhana. Nama dan struktur akhir harus mengikuti kebutuhan serta kesepakatan tim."
  }
};
