import { ModuleSection } from '../../../types';

export const bab2: ModuleSection = {
  id: "bab2",
  numberPrefix: "2.",
  title: "Pencegahan Bahaya Kelistrikan di Laboratorium Komputer",
  paragraphs: [
    "Perangkat kerja adalah alat yang membantu pengembang menulis, menjalankan, meninjau, dan menguji solusi. Pilih alat berdasarkan tugas dan spesifikasi proyek; satu aplikasi tidak menggantikan pemahaman tentang alur kerja dan hasil yang diharapkan.",
    "Lingkungan pengembangan biasanya terdiri atas sistem operasi, editor atau IDE, runtime atau compiler, terminal, browser atau emulator, pengelola paket, alat kontrol versi, dan layanan pendukung. Pastikan versi dan dependensi dicatat agar anggota tim dapat menyiapkan lingkungan yang serupa.",
    "Gunakan perangkat dan akun sesuai kewenangan. Unduh perangkat lunak dari sumber tepercaya, periksa lisensi, lakukan pembaruan sesuai prosedur, dan jangan menyalin kata sandi atau kunci API ke kode yang dibagikan."
  ],
  bulletPoints: [
    {
      label: "Editor dan IDE",
      description: "Editor membantu menulis serta membaca kode; IDE biasanya menambahkan fasilitas seperti navigasi simbol, pemeriksaan kesalahan, dan proses build."
    },
    {
      label: "Runtime, compiler, dan terminal",
      description: "Runtime menjalankan program, compiler menerjemahkan kode sesuai bahasa dan toolchain, sedangkan terminal membantu menjalankan perintah proyek."
    },
    {
      label: "Git dan pengelola paket",
      description: "Git mencatat perubahan serta membantu kolaborasi; pengelola paket memasang dependensi yang dibutuhkan proyek."
    },
    {
      label: "Alat uji dan desain",
      description: "Browser developer tools, emulator, alat pengujian, dan aplikasi prototipe dipilih sesuai bagian produk yang sedang dibuat."
    }
  ]
};
