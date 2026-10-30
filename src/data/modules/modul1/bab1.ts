import { ModuleSection, ModuleMedia } from "../../../types";

const bab1Media: ModuleMedia[] = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    alt: "Software engineer working on code",
    caption:
      "Gambar 1: Seorang Software Engineer sedang mengembangkan aplikasi web modern",
  },
  // {
  //   type: 'video',
  //   src: 'https://www.w3schools.com/html/mov_bbb.mp4',
  //   alt: 'Video pengenalan karier PPLG',
  //   caption: 'Video 1: Pengenalan prospek karier lulusan PPLG',
  // },
];

export const bab1: ModuleSection = {
  id: "bab1",
  numberPrefix: "1.",
  title: "Profil Pekerjaan dan Jabatan Kerja (Job Profile)",
  paragraphs: [
    "Pekerjaan PPLG mencakup kegiatan merancang, membuat, menguji, merilis, dan memelihara perangkat lunak atau gim. Produk dibuat oleh tim dengan peran yang saling melengkapi; ukuran tim dapat berubah sesuai tujuan dan skala proyek.",
    "Memahami tugas setiap profesi membantu tim membagi pekerjaan, memilih jalur karier, dan berkomunikasi dengan tepat. Satu orang dapat memegang beberapa peran pada proyek kecil, tetapi tanggung jawab tiap pekerjaan tetap perlu jelas.",
  ],
  bulletPoints: [
    {
      label: "Business Analyst / System Analyst",
      description:
        "Menggali kebutuhan pengguna dan pemilik produk, mendokumentasikan kebutuhan, serta menjelaskan alur dan aturan sistem agar dapat dipahami tim desain dan pengembang.",
    },
    {
      label: "UI/UX Designer",
      description:
        "Mempelajari kebutuhan pengguna, menyusun alur dan wireframe, membuat rancangan antarmuka, lalu mengevaluasi kemudahan penggunaan melalui prototipe atau uji pengguna.",
    },
    {
      label: "Frontend Developer",
      description:
        "Membangun bagian aplikasi yang berinteraksi langsung dengan pengguna dan menghubungkan tampilan dengan layanan atau API.",
    },
    {
      label: "Backend Developer",
      description:
        "Membuat logika bisnis dan layanan di sisi server, mengelola validasi serta akses data, dan menyediakan API untuk aplikasi klien.",
    },
    {
      label: "Quality Assurance (QA) / Software Tester",
      description:
        "Menyusun skenario uji, memeriksa kesesuaian fungsi dengan kebutuhan, mencatat langkah untuk mengulang bug, dan melaporkan hasil pengujian.",
    },
    {
      label: "Game Developer",
      description:
        "Menerapkan aturan dan interaksi gim, menghubungkan masukan pemain dengan perubahan keadaan permainan, serta bekerja bersama perancang dan pembuat aset.",
    },
    {
      label: "DevOps / System Administrator",
      description:
        "Membantu menyiapkan lingkungan pengembangan dan layanan, mengatur proses build atau rilis, serta memantau agar aplikasi dapat dijalankan sesuai kebutuhan.",
    },
    {
      label: "Project Manager / Product Owner",
      description:
        "Menjaga tujuan dan prioritas produk, mengatur koordinasi serta rencana kerja, dan membantu tim menyelesaikan hambatan dengan pemangku kepentingan.",
    },
  ],
  media: bab1Media,
};
