import { ModuleSection } from '../../../types';

export const bab3: ModuleSection = {
  id: "bab3",
  numberPrefix: "3.",
  title: "Proses Bisnis Layanan Perangkat Lunak (SDLC)",
  paragraphs: [
    "Proses bisnis pengembangan perangkat lunak menjelaskan bagaimana kebutuhan diubah menjadi produk yang dapat digunakan dan dipelihara. Siklus kerja umumnya meliputi identifikasi masalah dan kebutuhan, analisis, perancangan, implementasi, pengujian, rilis, serta pemeliharaan. Hasil satu tahap menjadi masukan bagi tahap berikutnya, tetapi tim dapat kembali ke tahap sebelumnya ketika temuan baru muncul.",
    "Pada analisis, tim menyepakati siapa pengguna dan apa kriteria penerimaan fitur. Pada perancangan, tim menentukan alur, antarmuka, data, dan komponen. Implementasi menghasilkan kode atau aset, sedangkan pengujian memeriksa fungsi terhadap kriteria. Setelah rilis, laporan masalah dan penggunaan nyata menjadi bahan pemeliharaan.",
    "Waterfall mengatur tahapan secara berurutan dan cocok ketika kebutuhan relatif stabil serta dokumentasi dan persetujuan formal diperlukan. Agile mengembangkan produk secara bertahap, meminta umpan balik lebih sering, dan menyesuaikan prioritas. Scrum adalah salah satu kerangka kerja Agile; bukan sinonim untuk semua metode Agile."
  ],
  bulletPoints: [
    {
      label: "Kebutuhan",
      description: "Tentukan masalah, pengguna, fungsi yang dibutuhkan, batasan, dan kriteria penerimaan sebelum menilai apakah solusi sudah sesuai."
    },
    {
      label: "Perancangan dan implementasi",
      description: "Rencanakan struktur dan pengalaman pengguna, lalu kerjakan fitur dalam perubahan yang dapat ditinjau dan dilacak."
    },
    {
      label: "Pengujian dan rilis",
      description: "Periksa kasus normal, batas, dan kesalahan; dokumentasikan versi yang dirilis dan cara mengulang masalah."
    },
    {
      label: "Pemeliharaan",
      description: "Tanggapi bug, perubahan kebutuhan, kompatibilitas, dan masukan pengguna tanpa mengabaikan kualitas bagian yang sudah berjalan."
    }
  ]
};
