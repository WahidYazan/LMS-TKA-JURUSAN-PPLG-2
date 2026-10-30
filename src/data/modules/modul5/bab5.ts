import { ModuleSection } from '../../../types';

export const bab5: ModuleSection = {
  id: "bab5",
  numberPrefix: "5.",
  title: "Menerapkan OOP pada Proyek PPLG",
  paragraphs: [
    "Dalam proyek perangkat lunak atau gim, mulailah rancangan class dari kebutuhan dan data yang benar-benar digunakan. Kelompokkan keadaan dan perilaku yang selalu berubah bersama, beri setiap class tanggung jawab yang mudah dijelaskan, dan tentukan bagian yang boleh diakses pemanggil.",
    "Untuk suatu alur, gunakan class dasar dan inheritance ketika ada hubungan jenis yang jelas. Gunakan polymorphism bila beberapa object perlu merespons permintaan yang sama dengan cara berbeda. Jika object hanya memiliki atau menggunakan object lain, modelkan hubungan tersebut secara eksplisit daripada membuat pewarisan yang dipaksakan.",
    "Rancangan tidak berhenti pada diagram. Implementasikan contoh kecil, uji perilaku tiap class, dan telusuri pemanggilan method untuk memastikan state berubah sesuai aturan. Pada gim, class dapat mewakili karakter atau item; pada aplikasi layanan, class dapat mewakili pengguna, pesanan, atau pembayaran."
  ],
  bulletPoints: [
    {
      label: "Temukan konsep domain",
      description: "Gunakan kebutuhan atau skenario proyek untuk menentukan object yang relevan beserta data dan perilaku yang diperlukan."
    },
    {
      label: "Tentukan akses",
      description: "Lindungi keadaan internal dan sediakan operasi yang memvalidasi perubahan."
    },
    {
      label: "Pilih relasi",
      description: "Gunakan inheritance untuk relasi jenis yang tepat; gunakan object lain untuk mewakili bagian atau layanan yang dimiliki."
    },
    {
      label: "Uji perilaku",
      description: "Uji constructor, method, aturan validasi, implementasi subclass, dan hasil ketika kode memakai referensi tipe dasar."
    },
    {
      label: "Jaga modularitas",
      description: "Hindari class yang memikul terlalu banyak tanggung jawab dan hindari relasi yang membuat perubahan kecil merusak banyak bagian."
    }
  ]
};
